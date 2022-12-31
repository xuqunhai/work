<template>
  <section class="el-container" :class="{ 'is-vertical': isVertical }">
    <slot />
  </section>
</template>
<script lang="ts">
// 什么会有两个 script 标签？
// 因为开发组件库的时候，我们要确保每个组件都有自己的名字，
// script setup 中没法返回组件的名字，所以我们需要一个单独的标签，使用 options 的语法设置组件的 name 属性。
export default {
  name: 'ElContainer'
}
</script>
<script setup lang="ts">
import { useSlots, computed, VNode, Component } from 'vue'
// 使用 interface 去定义传递的属性类型即可。
interface Props {
  direction?: string
}
// 使用 defineProps() 实现参数类型校验后，
const props = defineProps<Props>()

const slots = useSlots()

// 我们再使用 computed 去判断 container 的方向是否为垂直，
// 手动指定 direction 和子元素中有 el-header 或者 el-footer 的时候是垂直布局，其他情况是水平布局。
const isVertical = computed(() => {
  if (slots && slots.default) {
    return slots.default().some((vn: VNode) => {
      const tag = (vn.type as Component).name
      return tag === 'ElHeader' || tag === 'ElFooter'
    })
  } else {
    return props.direction === 'vertical'
  }
})
</script>

<style lang="scss">
@import '../styles/mixin';
@include b(container) {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  @include when(vertical) {
    flex-direction: column;
  }
}

// .el-container {
//   display: flex;
//   flex-direction: row;
//   flex: 1;
//   flex-basis: auto;
//   box-sizing: border-box;
//   min-width: 0;
// }
// .el-container.is-vertical {
//   flex-direction: column;
// }
</style>
