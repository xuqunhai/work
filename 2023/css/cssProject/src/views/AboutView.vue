<template>
  <div class="about">
    <h1>This is an about page</h1>
    <home theme="filled" />
  </div>
</template>

<script>
import { Home } from '@icon-park/vue-next'

export default {
  components: {
    Home
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
