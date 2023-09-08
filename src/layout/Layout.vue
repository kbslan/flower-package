<template>
  <div class="container">
    <el-container>
      <el-header class="header">
        <el-page-header @back="goBack" content="详情页面" title="回到首页"></el-page-header>
        <span @click="logout">注销</span>

      </el-header>
      <el-main> <router-view /></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      if (this.$route.path === '/') return
      this.$router.push('/')
    },

    logout () {
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
    }
  }
}
</script>

<style lang="less">
.container {
  .header {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
