<template>
  <hr />
  <h1 @click="loading">这是首页 {{ x }} - {{ y }}</h1>
  <TransitionDemo />
  <h1 @click="toggle">click</h1>
  <TodoList />
  <AddCount />

  <Rate :value="3"></Rate>

  <Rate :value="3.5"></Rate>
  <Rate :value="4" theme="red"></Rate>
  <Rate :value="1" theme="green"></Rate>

  <h1>你的评分是 {{ score }}</h1>
  <Rate :value="score" @update-rate="update"></Rate>

  <Rate v-model="score">课程评分</Rate>
  <Rate v-model="score">
    <img width="14" src="/favicon.ico" />
  </Rate>
</template>
<script setup>
import { useFullscreen } from '@vueuse/core'
import TodoList from '../components/TodoList.vue'
import AddCount from '../components/AddCount.vue'
import TransitionDemo from '../components/Transition.vue'

import { useMouse } from '../utils/mouse'
import useFavicon from '../utils/favicon'

import { ref } from 'vue'
import Rate from '../components/Rate.vue'
let score = ref(3.5)
function update(num) {
  score.value = num
}

let { x, y } = useMouse()
let { favicon } = useFavicon()
function loading() {
  favicon.value = '/2.ico'
}
const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>

<style scoped>
h1 {
  color: red;
}
</style>
>
