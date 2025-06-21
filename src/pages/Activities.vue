<template>
  <div>
    <h1>个人动态信息列表</h1>
    <el-row :gutter="20">
    </el-row>
      <el-col :span="24" v-for="activity in activities" :key="activity.id">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>活动信息</span>
            </div>
          </template>
        <p><strong>ID:</strong> {{ activity.id || '无' }}</p>
        <p><strong>时间:</strong> {{ activity.time }}</p>
        <p><strong>描述:</strong> {{ activity.description }}</p>
        <p><strong>创建人:</strong> {{ activity.creator }}</p>
      </el-card>
      </el-col>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const activities = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:8080/activities');
    if (!response.ok) {
      throw new Error('网络响应失败');
    }
    activities.value = await response.json();
  } catch (error) {
    console.error('获取个人动态信息失败:', error);
  }
});
</script>

<style scoped>
/* 可以添加样式 */
</style>