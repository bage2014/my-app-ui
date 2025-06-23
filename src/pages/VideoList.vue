<template>
  <div>
    <h1>视频列表</h1>
    <el-table :data="videoList" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column label="Logo">
        <template #default="{ row }">
          <img :src="row.logo.trim()" alt="Logo" style="width: 50px; height: 50px;">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="openDetail(row)">查看详情</el-button>
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
    <el-dialog v-model="dialogVisible" title="视频详情" width="50%" center>
      <div class="detail-container">
        <video ref="videoPlayer" controls :src="currentVideo.url.trim()"></video>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API_BASE_URL from '../api/config';
import Hls from 'hls.js';

const videoList = ref([]);
const pageable = ref({});
const totalPages = ref(0);
const totalElements = ref(0);
const last = ref(false);
const size = ref(0);
const number = ref(0);
const dialogVisible = ref(false);
const currentVideo = ref({});
const videoPlayer = ref(null);

const fetchData = async (page = 1) => {
  try {
    // 这里需要替换为实际的视频列表接口
    const response = await fetch(`${API_BASE_URL}m3u/query?size=5&keyword=&page=${page - 1}`);
    const data = await response.json();
    videoList.value = data.content;
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

const openDetail = (row) => {
  currentVideo.value = {
    ...row,
    logo: row.logo.trim(),
    url: row.url.trim()
  };
  dialogVisible.value = true;
  if (videoPlayer.value && Hls.isSupported()) {
    const video = videoPlayer.value;
    const hls = new Hls();
    hls.loadSource(currentVideo.value.url.trim());
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play();
    });
  } else if (videoPlayer.value && videoPlayer.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoPlayer.value.src = currentVideo.value.url.trim();
    videoPlayer.value.addEventListener('loadedmetadata', () => {
      videoPlayer.value.play();
    });
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.detail-container {
  padding: 10px;
  margin: 0 auto;
  text-align: center;
}
.el-dialog__header {
  background-color: #f0f2f5;
}
.el-dialog__title {
  font-weight: bold;
}
</style>