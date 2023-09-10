<template>
  <div class="container">
    <el-button class="btn" type="primary" v-if="permissions.includes('admin')" @click="dashboard">数据看板</el-button>
    <el-button class="btn" type="primary" v-if="permissions.includes('admin')">PDA管理</el-button>
    <el-button class="btn" type="primary" v-if="permissions.includes('normal')" @click="flower">包花提报</el-button>
    <el-button class="btn" type="primary" v-if="permissions.includes('admin')" @click="options">配置项管理</el-button>
    <el-button class="btn" type="primary" v-if="permissions.includes('admin')" @click="account">账号管理</el-button>
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
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .btn {
    margin: 0;
    margin-top: 20px;
    width: 250px;
  }
}
</style>
