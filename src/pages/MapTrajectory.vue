<template>
  <div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="totalPages * pageSize"
      layout="prev, pager, next"
      @current-change="loadTrajectoryData"
      @size-change="loadTrajectoryData"
    />
    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ElPagination } from 'element-plus'
import API_BASE_URL from '../api/config'

const checkMapLoad = ref(null)
const currentPage = ref(1)
const pageSize = ref(5)
const totalPages = ref(1)
const map = ref(null)

// 移除随机生成坐标点函数

const loadTrajectoryData = async () => {
  if (!map.value) return
  try {
    // 清除现有标记和折线
    map.value.clearOverlays()
    // 从后台请求数据
    const response = await fetch(`${API_BASE_URL}trajectorys/query?page=${currentPage.value - 1}&size=${pageSize.value}`)
    const data = await response.json()
    totalPages.value = data.totalPages
    const trajectoryPoints = data.content.map(item => {
      return new window.BMap.Point(item.longitude, item.latitude)
    })

    // 在地图上添加标记点
    data.content.forEach((item, index) => {
      const point = new window.BMap.Point(item.longitude, item.latitude)
      const label = new window.BMap.Label(`${index + 1}`, { offset: new window.BMap.Size(2, 2) })
      const marker = new window.BMap.Marker(point)
      marker.setLabel(label)
      const infoWindow = new window.BMap.InfoWindow(`发生时间：${item.time}`)
      marker.addEventListener('mouseover', () => {
        map.value.openInfoWindow(infoWindow, point)
      })
      map.value.addOverlay(marker)
    })

    // 按时间顺序链接这些点
    const polyline = new window.BMap.Polyline(trajectoryPoints, {
      strokeColor: "blue",
      strokeWeight: 2,
      strokeOpacity: 1
    })
    map.value.addOverlay(polyline)
  } catch (error) {
    console.error('请求轨迹数据失败:', error)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    loadTrajectoryData()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    loadTrajectoryData()
  }
}

onMounted(async () => {
  checkMapLoad.value = setInterval(async () => {
    const mapElement = document.getElementById('map')
    console.log('checkMapLoad', mapElement)
    if (mapElement && window.BMap) {
      clearInterval(checkMapLoad.value)
      // 初始化地图
      map.value = new window.BMap.Map(mapElement)
      // 设置地图中心为长宁区大致中心位置
      const centerPoint = new window.BMap.Point(121.40, 31.23)
      map.value.centerAndZoom(centerPoint, 13)

      // 添加缩放控件
      // map.value.addControl(new window.BMap.ZoomControl())
      
      loadTrajectoryData()
      
      // 移除地图点击事件监听
      // map.value.addEventListener('click', (e) => {
      //   const now = new Date().toISOString()
      //   savePointToBackend(e.point, now)
      // })
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