<template>
  <div class="login-container">
    <el-card class="login-box">
      <div class="header">Login</div>
      <el-form ref="loginForm" :model="loginForm" label-width="0px"> <!-- 设置label-width为0px -->
        <el-form-item prop="username"> <!-- 移除label属性 -->
          <el-input v-model="loginForm.username" placeholder="请输入用户名或手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password"> <!-- 移除label属性 -->
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="msg">
        <router-link to="/register" style="margin-right:10px">注册</router-link>
        <router-link to="/reset" >忘记密码</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // 实现登录逻辑，可以向后端发送登录请求
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to right, #52667a, #409EFF);
}

.login-box {
  width: 350px;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  background-color: #fff;
}

.header {
  font-size: 38px;
  font-weight: bold;
  line-height: 200px;
}

.msg {
  text-align: right;
  line-height: 38px;
}

/* 移除按钮的默认背景色，设置按钮的颜色为渐变色 */
/* .el-button {
  background-color: transparent !important;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb) !important;
  color: #fff !important;
} */

/* 如果需要修改链接颜色，可以添加以下样式 */
.msg a {
  color: #abc1ee;
}
</style>
