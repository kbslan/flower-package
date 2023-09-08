<template>
  <div class="login-container">
    <el-card class="login-box">
      <div class="header">Login</div>
      <el-form ref="loginForm" :model="loginForm" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" :show-password="true">
          </el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;text-align: left">
          记住我
        </el-checkbox>
        <el-form-item style="width: 100%;">
          <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
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
import Cookies from 'js-cookie'
import Config from '@/settings'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false
    }
  },
  created () {
    // this.getCookie()
  },
  methods: {
    getCookie () {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid
        }

        if (valid) {
          this.loading = true
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: Config.passCookieExpires })
            Cookies.set('password', user.password, { expires: Config.passCookieExpires })
            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store.dispatch('Login', user).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
            this.getCode()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
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
