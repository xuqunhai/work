<template>
  <input type="text" v-focus />
  <Count />
  <Heading :level="3">hello geekbang</Heading>
  <Chart />
</template>
<script setup>
import Count from '../components/Count.vue'
import Chart from '../components/Chart.vue'
import Heading from '../components/Heading.jsx'
</script>

<style scoped>
h1 {
  color: red;
}
</style>
