<template>
  <div class="login-container">
    <el-card class="login-box">
      <div class="header">注册</div>
      <el-form ref="loginForm" :model="loginForm" label-width="0px" :rules="loginRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.name" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" :show-password="true">
          </el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button :loading="loading" size="medium" type="primary" style="width: 100%" @click.native.prevent="handleRegister">
            <span v-if="!loading">注 册</span>
            <span v-else>注 册 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="msg">
        <router-link to="/login" style="margin-right: 10px">登录</router-link>
        <router-link to="/reset">修改密码</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        name: '',
        mobile: '',
        password: ''
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
        mobile: [{ required: true, trigger: 'blur', message: '手机号不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
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
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Register', this.loginForm)
            .then(data => {
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
