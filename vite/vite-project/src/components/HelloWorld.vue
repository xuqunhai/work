<template>
  <h1>{{ msg }}</h1>
  <Comp />

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>
  <A />
  <button type="button" @click="state.count++">count is: {{ state.count }}</button>
  <button @click="onclick">rxclick</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import Comp from './Comp.vue'
import A from './A.vue'
import axios from 'axios';

const props = defineProps({
  msg: String
})

const state = reactive({ count: 0 })
const emit = defineEmits(['rxclick'])
const onclick = () => {
  emit('rxclick', [state.count, props.msg])
}

defineExpose({
  someMethods() {
    console.log('hw expose fn')
  }
})

axios.get('/api/getUsers').then(({ data }) => {
  console.log(data)
});
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
