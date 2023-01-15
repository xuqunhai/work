<template>
  <div class="c-box-center">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CBoxCenter',
  props: {
    text: {
      type: String,
      require: true
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(c-box-center) {
  @include box-center;
}
</style>
