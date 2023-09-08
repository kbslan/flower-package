<template>
  <div class="container">
    <el-button class="btn" type="primary">数据看板</el-button>
    <el-button class="btn" type="primary">PDA管理</el-button>
    <el-button class="btn" type="primary" @click="flower">包花提报</el-button>
    <el-button class="btn" type="primary">配置项管理</el-button>
    <el-button class="btn" type="primary" @click="account">账号管理</el-button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {}
  },
  methods: {
    flower () {
      this.$router.push('/flower')
    },
    account () {
      this.$router.push('/account')
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
