<template>
  <div class="home-content">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="7" v-for="(o, index) in 5" :key="o" :offset="index % 3 > 0 ? 1 : 0" style="margin-bottom:16px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination
          align="right"
          style="margin-top: 10px;"
          @current-change="handleCurrentChange"
          :current-page="pagination.targetPage"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      pagination: {
        targetPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      var that = this;
      that.pagination.targetPage = val;
    }
  }
};
</script>