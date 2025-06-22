<template>
  <div>
    <video ref="videoPlayer" controls></video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Hls from 'hls.js';

const videoPlayer = ref(null);

onMounted(() => {
  if (videoPlayer.value) {
    const video = videoPlayer.value;
    const hls = new Hls();
    const url = 'https://live-hls-5rxy.livepush.io/live_cdn/em_LJ5aZjqp0LdiQ/index.m3u8';
    if (Hls.isSupported()) {
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    }
  }
});
</script>

<style scoped>
/* 可添加样式 */
</style>