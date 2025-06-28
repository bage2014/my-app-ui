<template>
  <div>
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="loadTrajectoryData"
      size="large"
    />
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="totalPages * pageSize"
      layout="prev, pager, next, sizes"
      :page-sizes="[10, 20, 50, 100]"
      @current-change="loadTrajectoryData"
      @size-change="loadTrajectoryData"
    />
    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ElPagination, ElDatePicker } from 'element-plus'
import API_BASE_URL from '../api/config'

const checkMapLoad = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const map = ref(null)
const dateRange = ref([])

// 移除随机生成坐标点函数

const createPoint = (item) => {
  return new window.BMap.Point(item.longitude, item.latitude)
}

const loadTrajectoryData = async () => {
  if (!map.value) return
  try {
    // 清除现有标记和折线
    map.value.clearOverlays()
    // 构建查询参数
    let queryParams = `page=${currentPage.value - 1}&size=${pageSize.value}`
    if (dateRange.value && dateRange.value.length === 2) {
      const startDate = new Date(dateRange.value[0]).toISOString()
      const endDate = new Date(dateRange.value[1]).toISOString()
      queryParams += `&startTime=${startDate}&endTime=${endDate}`
    }
    // 从后台请求数据
    const response = await fetch(`${API_BASE_URL}trajectorys/query?${queryParams}`)
    const data = await response.json()
    totalPages.value = data.totalPages
    // 倒序处理数据
    const reversedData = [...data.content].reverse()
    const trajectoryPoints = reversedData.map(createPoint)

    // 在地图上添加标记点
    reversedData.forEach((item, index) => {
      const point = createPoint(item)
      const label = new window.BMap.Label(`${index + 1}`, { offset: new window.BMap.Size(2, 2) })
      const marker = new window.BMap.Marker(point)
      marker.setLabel(label)
      const infoWindow = new window.BMap.InfoWindow(`地址： ${item.address} </br> 发生时间：${item.time}`)
      marker.addEventListener('mouseover', () => {
        map.value.openInfoWindow(infoWindow, point)
      })
      map.value.addOverlay(marker)
    })

    // 按时间倒序链接这些点
    const polyline = new window.BMap.Polyline(trajectoryPoints, {
      strokeColor: "blue",
      strokeWeight: 2,
      strokeOpacity: 1
    })
    map.value.addOverlay(polyline)

    // 调整地图视野以显示所有坐标点
    if (trajectoryPoints.length > 0) {
      map.value.setViewport(trajectoryPoints)
    }
  } catch (error) {
    console.error('请求轨迹数据失败:', error)
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
.el-input.is-active.el-input__inner, .el-input__inner:focus{
  border-color: #ABB3CC;
}
</style>