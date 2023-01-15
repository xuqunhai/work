<template>
  <div class="about">
    <h1>This is an about page</h1>
    <home theme="filled" />
    <camera theme="outline" size="24" fill="#bd10e0" />
    <star theme="filled" size="24" fill="#f8e71c" />
    <div class="box">
      <div class="box__item box__item--bg1"></div>
      <div class="box__item box__item--bg2"></div>
      <div class="box__item box__item--bg3"></div>
      <div class="box__item box__item--bg4"></div>
    </div>
  </div>
</template>

<script>
import { Home, Camera, Star } from '@icon-park/vue-next'

export default {
  components: {
    Home,
    Camera,
    Star
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.box {
  scroll-snap-type: x mandatory;
  overflow: auto;
  white-space: nowrap;
  &__item {
    display: inline-block;
    width: 100%;
    height: 100px;
    scroll-snap-align: center;
    scroll-snap-stop: always;
    &--bg1 {
      background-color: pink;
    }
    &--bg2 {
      background-color: red;
    }
    &--bg3 {
      background-color: green;
    }
    &--bg4 {
      background-color: blue;
    }
  }
}
</style>
