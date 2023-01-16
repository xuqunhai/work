<template>
  <c-magazine
    class="magazine promotion"
    image="https://cn.vitejs.dev/logo.svg"
    radius4
    font-tertiary
  >
    <div class="promotion__span" fz14>测试一下</div>
  </c-magazine>
</template>

<style lang="scss" scoped>
@include b(promotion) {
  @include dimensions(82px);
  text-align: center;
  @include e(span) {
    padding-top: 50px;
  }
}
</style>
