<template>
  <div>
    <video ref="videoPlayer" controls autoplay></video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Hls from 'hls.js';

const route = useRoute();
const videoPlayer = ref(null);

onMounted(() => {
  const videoUrl = route.query.videoUrl ? String(route.query.videoUrl) : '';
  if (videoPlayer.value && Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoUrl);
    hls.attachMedia(videoPlayer.value);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoPlayer.value.play();
    });
  } else if (videoPlayer.value && videoPlayer.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoPlayer.value.src = videoUrl;
    videoPlayer.value.addEventListener('loadedmetadata', () => {
      videoPlayer.value.play();
    });
  }
});
</script>