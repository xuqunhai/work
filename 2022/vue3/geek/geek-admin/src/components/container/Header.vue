<template>
  <header class="el-header" :style="{ height }">
    <slot />
  </header>
</template>

<script lang="ts">
export default {
  name: 'ElHeader'
}
</script>
<script setup lang="ts">
import { withDefaults } from 'vue'
interface Props {
  height?: string
}

// 通过 defineProps 定义传入的属性 height，
// 并且通过 withDefaults 设置 height 的默认值为 60px，
withDefaults(defineProps<Props>(), {
  height: '60px'
})
</script>

<style lang="scss">
@import '../styles/mixin';
// 通过 b(header) 的方式实现样式
@include b(header) {
  padding: $--header-padding;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
