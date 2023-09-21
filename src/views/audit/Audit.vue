<template>
  <h1>审核管理</h1>
</template>

<script>
export default {
  data() {
    return {
      a: 1
    }
  },
  mounted() {
    this.setContent()
  },
  methods: {
    setContent() {
      const title = this.$route.meta.title
      this.$store.dispatch('SetContent', title)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
