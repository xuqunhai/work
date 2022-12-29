<template>
  <Count />
  <Heading :level="3">hello geekbang</Heading>
</template>
<script setup>
import Count from '../components/Count.vue'
import Heading from '../components/Heading.jsx'
</script>

<style scoped>
h1 {
  color: red;
}
</style>
