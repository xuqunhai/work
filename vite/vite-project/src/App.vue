<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld ref="hw" msg="Hello Vue 3 + Vite + rafer" @rxclick="rxclick" />
</template>

<script setup>
import HelloWorld from 'comps/HelloWorld.vue'
import {ref} from 'vue'
const hw=ref(null)
const rxclick = (argv) => {
  console.log('click from helloworld', argv)
  console.log(hw.value.someMethods())
}
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
