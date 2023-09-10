<template>
  <div class="container">
    <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane label="本地缓存" name="local">
        <FlowerTab type="local"></FlowerTab>
      </el-tab-pane>
      <el-tab-pane label="远端数据" name="server">
        <FlowerTab type="server"></FlowerTab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FlowerTab from '@/views/flower/FlowerTab'

export default {
  name: 'Flower',
  components: {
    FlowerTab
  },
  data() {
    return {
      tab: 'local'
    }
  },
  mounted() {
    this.setContent()
  },
  methods: {
    setContent() {
      const title = this.$route.meta.title
      this.$store.dispatch('SetContent', title)
    },
    handleClick(tab) {
      this.tab = tab.name
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
