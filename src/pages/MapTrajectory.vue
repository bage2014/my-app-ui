<template>
  <div>
    <h1>地图轨迹</h1>
    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const checkMapLoad = ref(null)

onMounted(() => {
  checkMapLoad.value = setInterval(() => {
    const mapElement = document.getElementById('map')
    if (window.BMapGL && mapElement) {
      clearInterval(checkMapLoad.value)
      // 初始化地图
      const map = new BMapGL.Map(mapElement)
      const point = new BMapGL.Point(116.404, 39.915)
      map.centerAndZoom(point, 15)
      
      // 添加缩放控件
      map.addControl(new BMapGL.ZoomControl())
    }
  }, 100)
})

onUnmounted(() => {
  if (checkMapLoad.value) {
    clearInterval(checkMapLoad.value)
  }
})
</script>

<style scoped>
#map {
  margin-top: 20px;
}
</style>