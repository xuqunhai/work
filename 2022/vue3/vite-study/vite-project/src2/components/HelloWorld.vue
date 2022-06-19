<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

defineProps({
  msg: String
});

const count = ref(0);

const data = reactive({
  counter: 1,
  doubleCounter: computed(() => data.counter * 2)
});

onMounted(() => {
  let timer = setInterval(() => {
    data.counter++;
    count.value++;
    if (data.counter > 5) {
      clearInterval(timer);
    }
  }, 1000);
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}; counter: {{ data.counter }}; doubleCounter: {{ data.doubleCounter }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
