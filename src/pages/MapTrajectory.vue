<template>
  <div>
    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const checkMapLoad = ref(null)

// 生成随机坐标点函数，上海市长宁区大致经纬度范围
function generateRandomPoints(count) {
  const points = []
  const minLng = 121.36 // 长宁区大致最小经度
  const maxLng = 121.45 // 长宁区大致最大经度
  const minLat = 31.20 // 长宁区大致最小纬度
  const maxLat = 31.26 // 长宁区大致最大纬度
  
  for (let i = 0; i < count; i++) {
    const lng = minLng + Math.random() * (maxLng - minLng)
    const lat = minLat + Math.random() * (maxLat - minLat)
    points.push(new window.BMap.Point(lng, lat))
  }
  return points
}

onMounted(() => {
  checkMapLoad.value = setInterval(() => {
    const mapElement = document.getElementById('map')
    console.log('checkMapLoad', mapElement)
    if (mapElement && window.BMap) {
      clearInterval(checkMapLoad.value)
      // 初始化地图
      const map = new window.BMap.Map(mapElement)
      // 设置地图中心为长宁区大致中心位置
      const centerPoint = new window.BMap.Point(121.40, 31.23)
      map.centerAndZoom(centerPoint, 13)
      
      // 添加缩放控件
      // map.addControl(new window.BMap.ZoomControl())

      // 生成随机坐标点
      const randomPoints = generateRandomPoints(5)

      // 在地图上添加标记点
      randomPoints.forEach((point, index) => {
        const marker = new window.BMap.Marker(point)
        const time = new Date().toLocaleString()
        const infoWindow = new window.BMap.InfoWindow(`发生时间：${time}`)
        marker.addEventListener('mouseover', () => {
          map.openInfoWindow(infoWindow, point)
        })
        map.addOverlay(marker)
      })

      // 按时间顺序链接这些点
      const polyline = new window.BMap.Polyline(randomPoints, {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 1
      })
      map.addOverlay(polyline)
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