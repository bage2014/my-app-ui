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
    const url = 'https://fl3.moveonjoy.com/DISNEY_JR/index.m3u8';
    if (Hls.isSupported()) {
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
        video.play();
      });
    }
  }
});
</script>

<style scoped>
/* 可添加样式 */
</style>