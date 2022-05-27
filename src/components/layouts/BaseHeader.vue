<script lang="ts" setup>
import { toggleDark } from '~/composables';
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1"><router-link to="/">Tutorials</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/demo">Demo</router-link></el-menu-item>
  </el-menu>
</template>
