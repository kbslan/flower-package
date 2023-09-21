<template>
  <div class="container">
    <el-container>
      <el-header class="header">
        <el-page-header @back="goBack" :content="content" title="返回"></el-page-header>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <span class="el-dropdown-link">
            {{username}}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <span style="display:block;" @click="logout">
              <el-dropdown-item>
                刷新缓存
              </el-dropdown-item>
            </span>
            <router-link to="/reset">
              <el-dropdown-item>
                修改密码
              </el-dropdown-item>
            </router-link>
            <span style="display:block;" @click="logout">
              <el-dropdown-item divided>
                退出登录
              </el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['content', 'username']),
    title() {
      return this.$route.path === '/' ? '' : '回到首页'
    }
  },
  methods: {
    goBack() {
      if (this.$route.path === '/') return
      // this.$router.push('/')
      // 与 router.back() 相同
      // this.$router.go(-1)
      this.$router.back()
    },

    logout() {
      this.$confirm('您确认退出登入吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('Logout').then(() => {
            this.$router.push({ path: '/login' })
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .header {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main {
    margin:0;
  }
}
</style>
