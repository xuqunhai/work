<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <c-box-center class="btn" bg-tertiary radius4>打开APP</c-box-center>
    <div
      style="width: 100px; height: 100px; background-color: pink"
      circle
    ></div>
    <TheWelcome />
  </main>
</template>

<style lang="scss" scoped>
.btn {
  @include dimensions(75px, 25px);
  background-color: $background-color-primary;
  color: $color-white;
}
</style>
