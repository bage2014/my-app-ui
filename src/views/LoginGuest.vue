<template>
  <div class="login">
    <el-card class="login-card">
      <div slot="header">
        <span>游客访问</span>
        <!--<div class="pull-right">
          <a target="_blank" href="https://codetrial.github.io"></a>
        </div>
        -->
      </div>
      <div class="login-form">
        <el-form status-icon >
          <el-form-item class="pull-right">
            <el-button type="primary" @click="login()">游客访问</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-card {
    width: 480px;
    margin-bottom: 100px;

    .el-form-item {
      margin-bottom: 36px;

      & /deep/ .el-form-item__error {
        left: auto;
        right: 0;
      }
    }
  }
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',

  data() {
    return {
      
    }
  },

  methods: {
    ...mapActions(['getUser']),

    login() {
      // mock 登录
      const { usr } = {
        usr: 'guest',
        pwd: ''
      }

      return this.getUser(usr)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          this.$notify.error({
            title: '失败',
            message: err.message || '登录失败！'
          })
        })
    },
  },

  mounted() {

  }
}
</script>
