<script lang="ts" setup>

</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1"><router-link to="/"><el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
 /></router-link></el-menu-item>
    <el-menu-item index="1"><router-link to="/">Tutorials</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/demo">Demo</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/test">Test</router-link></el-menu-item>
    <el-menu-item index="4"><router-link to="/activities">活动列表</router-link></el-menu-item>
  </el-menu>
</template>
