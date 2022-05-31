<template>
  <div>
    test
  </div>
</template>

<script>
import './main.js'
export default {
  created() {
    this.$message({
      type: 'success',
      content: '成功信息提示',
      duration: 3000
    })
  }
}
</script>

<style lang="scss" scoped>
</style>