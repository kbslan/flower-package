<template>
  <div class="login-container">
    <el-card class="login-box">
      <div class="header">登录</div>
      <el-form ref="loginForm" :model="loginForm" label-width="0px">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" :show-password="true">
          </el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0; text-align: left">
          记住我
        </el-checkbox>
        <el-form-item style="width: 100%">
          <el-button :loading="loading" size="medium" type="primary" style="width: 100%" @click.native.prevent="handleLogin">
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="msg">
        <router-link to="/register" style="margin-right: 10px">注册</router-link>
        <router-link to="/reset">修改密码</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMobile, getPassword, getRememberMe } from '@/utils/auth'
import { optionsList } from '@/api/options'
import localStorageManager from '@/utils/localFlowerRecord'
import Config from '@/settings'
import { accountList } from '@/api/user'

export default {
  data() {
    return {
      loginForm: {
        mobile: '',
        password: '',
        rememberMe: false
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
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
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    getCookie() {
      const mobile = getMobile()
      let password = getPassword()
      const rememberMe = getRememberMe()
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        mobile: mobile === undefined ? this.loginForm.mobile : mobile,
        password: password === undefined ? this.loginForm.password : password,
        rememberMe: rememberMe === undefined ? this.loginForm.rememberMe : Boolean(rememberMe)
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
            .then(data => {
              // 包花人
              if (data.admin) {
                accountList({ yn: 1 }).then(data => {
                  const records = data.records || []
                  const packages = records.map(item => ({
                    label: item.name,
                    value: item.id
                  }))
                  localStorageManager.save(Config.PackagesKey, packages)
                })
              } else {
                localStorageManager.save(Config.PackagesKey, [{ lable: data.name, value: data.id }])
              }

              // 采花人
              optionsList({ type: 'flower_picker', yn: 1, page: 1, size: 100 }).then(data => {
                const records = data.records || []
                const pickers = records.map(item => ({
                  label: item.label,
                  value: item.id
                }))
                localStorageManager.save(Config.PickersKey, pickers)
              })
              // 品种
              optionsList({ type: 'flower_category', yn: 1, page: 1, size: 100 }).then(data => {
                const records = data.records || []
                const categorys = records.map(item => ({
                  label: item.label,
                  value: item.id
                }))
                localStorageManager.save(Config.CategorysKey, categorys)
              })
              // 规格
              optionsList({ type: 'flower_specification', yn: 1, page: 1, size: 100 }).then(data => {
                const records = data.records || []
                const specifications = records.map(item => ({
                  label: item.label,
                  value: item.id
                }))
                localStorageManager.save(Config.SpecificationsKey, specifications)
              })
              // 报损原因
              optionsList({ type: 'flower_damage_reason', yn: 1, page: 1, size: 100 }).then(data => {
                const records = data.records || []
                const damageReasons = records.map(item => ({
                  label: item.label,
                  value: item.id
                }))
                localStorageManager.save(Config.DamageReasonsKey, damageReasons)
              })
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
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
  /* background-image: linear-gradient(to right, #fbc2eb, #a6c1ee); */
  background-image: url("~@/assets/images/background-image.jpg"); /* 使用相对路径引用图片 */
  background-size: cover; /* 背景图尺寸适应容器 */
  background-repeat: no-repeat; /* 防止背景图重复 */
  background-attachment: fixed; /* 固定背景图 */
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
