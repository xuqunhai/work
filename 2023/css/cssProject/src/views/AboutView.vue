<template>
  <div class="about">
    <h1>This is an about page</h1>
    <home theme="filled" />
    <camera theme="outline" size="24" fill="#bd10e0" />
    <star theme="filled" size="24" fill="#f8e71c" />
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

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
