<template>
  <div class="container">
    <el-tabs v-model="type" @tab-click="handleClick">
      <el-tab-pane :label="item.label" :name="item.value" v-for="item in typeList" :key="item.value">
        <Option :type="item.value"></Option>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Option from '@/views/options/Option.vue'

export default {
  name: 'Options',
  components: {
    Option
  },
  data() {
    return {
      type: 'flower_picker',
      typeList: [
        {
          value: 'flower_picker',
          label: '鲜花采摘人'
        },
        {
          value: 'flower_category',
          label: '鲜花品种'
        },
        {
          value: 'flower_specification',
          label: '鲜花规格'
        },
        {
          value: 'flower_damage_reason',
          label: '鲜花损坏原因'
        }
      ]
    }
  },
  mounted() {
    this.setContent()
  },
  methods: {
    setContent() {
      const title = this.$route.meta.title
      this.$store.dispatch('SetContent', title)
      this.type = this.$route.query.type || 'flower_picker'
    },
    handleClick(tab) {
      this.type = tab.name
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
