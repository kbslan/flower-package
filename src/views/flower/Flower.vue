<template>
  <div class="container">
    <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane label="本地缓存" name="local">
        <FlowerTab
          type="local"
          tab="local"
          :packages="packages"
          :pickers="pickers"
          :categorys="categorys"
          :specifications="specifications"
          :damageReasons="damageReasons"
        >
        </FlowerTab>
      </el-tab-pane>
      <el-tab-pane label="远端数据" name="server">
        <FlowerTab
          type="server"
          tab="server"
          :packages="packages"
          :pickers="pickers"
          :categorys="categorys"
          :specifications="specifications"
          :damageReasons="damageReasons"
        >
        </FlowerTab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FlowerTab from '@/views/flower/FlowerTab'
import localStorageManager from '@/utils/localFlowerRecord'
import Config from '@/settings'

export default {
  name: 'Flower',
  components: {
    FlowerTab
  },
  created() {
    this.packages = localStorageManager.queryAll(Config.PackagesKey)
    this.pickers = localStorageManager.queryAll(Config.PickersKey)
    this.categorys = localStorageManager.queryAll(Config.CategorysKey)
    this.specifications = localStorageManager.queryAll(Config.SpecificationsKey)
    this.damageReasons = localStorageManager.queryAll(Config.DamageReasonsKey)
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
