<template>
  <div class="container1">
    <el-button class="btn" type="primary" v-if="permissions.includes('admin')" @click="dashboard">数据看板</el-button>
    <el-button class="btn" type="primary" v-if="permissions.includes('admin')" @click="audit">审核管理</el-button>
    <el-button class="btn" type="primary" v-if="permissions.includes('admin')" @click="account">账号管理</el-button>
    <el-button class="btn" type="primary" v-if="permissions.includes('admin')" @click="options">配置项管理</el-button>
    <el-button class="btn" type="primary" v-if="permissions.includes('normal')" @click="flower">包花提报</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  mounted() {
    this.setContent()
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    setContent() {
      const title = this.$route.meta.title
      this.$store.dispatch('SetContent', title)
    },
    dashboard() {
      this.$router.push('/dashboard')
    },
    flower() {
      this.$router.push('/flower')
    },
    account() {
      this.$router.push('/account')
    },
    options() {
      this.$router.push('/options')
    },
    audit() {
      this.$router.push('/audit')
    }
  }
}
</script>

<style lang="less" scoped>
.container1 {
  // height: 100vh;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("~@/assets/images/background-image.jpg"); /* 使用相对路径引用图片 */
  // background-image: linear-gradient(to right, #fbc2eb, #a6c1ee); /* 使用相对路径引用图片 */
  background-size: cover; /* 背景图尺寸适应容器 */
  background-repeat: no-repeat; /* 防止背景图重复 */
  background-attachment: fixed; /* 固定背景图 */

  .btn {
    margin: 0;
    margin-top: 20px;
    font-size: 18px; /* 放大字体 */
    width: 250px;
    padding: 20px 20px; /* 放大按钮尺寸，根据需要调整 */
  }
}
</style>
