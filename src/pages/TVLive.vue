<template>
    <el-table :data="content" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="title" label="视频标题" />
      <el-table-column label="Logo">
        <template #default="{ row }">
          <img :src="row.logo" alt="Logo" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="navigateToVideoPlayer(row.url)">播放</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="fetchData"
      :current-page="number + 1"
      :page-size="size"
      :total="totalElements"
      layout="prev, pager, next"
    />
    <el-dialog v-model="dialogVisible" title="视频播放" :modal-append-to-body="true">
      <video ref="videoPlayer" controls :src="currentVideoUrl"></video>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Hls from 'hls.js';
import API_BASE_URL from '../api/config';
import { ElDialog, ElTable, ElTableColumn, ElPagination, ElButton } from 'element-plus';

const videoPlayer = ref(null);
const content = ref([]);
const pageable = ref({});
const totalPages = ref(0);
const totalElements = ref(0);
const last = ref(false);
const size = ref(0);
const number = ref(0);
const currentVideoUrl = ref('');
const dialogVisible = ref(false);

const fetchData = async (page = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}m3u/query?size=10&keyword=&page=${page - 1}`);
    const data = await response.json();
    content.value = data.content;
    pageable.value = data.pageable;
    totalPages.value = data.totalPages;
    totalElements.value = data.totalElements;
    last.value = data.last;
    size.value = data.size;
    number.value = data.number;
  } catch (error) {
    console.error('数据获取失败:', error);
  }
};

const playVideo = (url) => {
  currentVideoUrl.value = url;
  dialogVisible.value = true;
  if (videoPlayer.value && Hls.isSupported()) {
    const video = videoPlayer.value;
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play();
    });
  } else if (videoPlayer.value && videoPlayer.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoPlayer.value.src = url;
    videoPlayer.value.addEventListener('loadedmetadata', () => {
      videoPlayer.value.play();
    });
  }
};

onMounted(() => {
  fetchData();
});

const navigateToVideoPlayer = (url) => {
  console.log('传入的视频 URL:', url);
  playVideo(url);
};
</script>

<style scoped>
el-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 0 !important;
}

</style>