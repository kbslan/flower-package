<template>
  <div class="login-container">
    <el-card class="login-box">
      <div class="header">修改密码</div>
      <el-form ref="loginForm" :model="loginForm" label-width="0px" :rules="loginRules">
        <!-- 设置label-width为0px -->
        <el-form-item prop="mobile">
          <!-- 移除label属性 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="oldPassword">
          <!-- 移除label属性 -->
          <el-input type="oldPassword" v-model="loginForm.oldPassword" placeholder="请输入旧密码" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 移除label属性 -->
          <el-input type="password" v-model="loginForm.password" placeholder="请输入新密码" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button :loading="loading" size="medium" type="primary" style="width: 100%" @click.native.prevent="handlerReset">
            <span v-if="!loading">修改密码</span>
            <span v-else>修 改 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="msg">
        <router-link to="/login" style="margin-right: 10px">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMobile, getRememberMe } from '@/utils/auth'

export default {
  data() {
    return {
      loginForm: {
        mobile: '',
        oldPassword: '',
        password: ''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', message: '手机号不能为空' }],
        oldPassword: [{ required: true, trigger: 'blur', message: '旧密码不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  created() {
    this.getCookie()
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    getCookie() {
      const mobile = getMobile()
      this.loginForm = {
        mobile: mobile === undefined ? this.loginForm.mobile : mobile,
        oldPassword: '',
        password: ''
      }
    },
    handlerReset() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Reset', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/login' })
            })
            .catch(() => {
              this.loading = false
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
.el-button {
  background-color: transparent !important;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb) !important;
  color: #fff !important;
}

/* 如果需要修改链接颜色，可以添加以下样式 */
.msg a {
  color: #abc1ee;
}
</style>
