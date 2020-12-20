<template>
  <div class="home-content">
    <el-row class="home-content__row bottom-gutter" :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>开源应用</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="goAppList()">查看列表</el-button>
          </div>

          <div class="text-center">
            <el-progress type="circle" :percentage="80"></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.home-content {
  .home-content__row {
    .home-content__progress {
      margin-bottom: 20px;
    }
  }
}
</style>

<script>
export default {
  name: "home",
  
  methods: {
    goAppList() {
      this.$router.push('/modules/apps')
    },
  }

};
</script>
