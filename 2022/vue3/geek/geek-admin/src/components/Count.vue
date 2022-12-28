<template>
  <div @click="add">{{ count }} - {{ double }}</div>
  <button @click="asyncAdd">asyncAdd</button>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '../store/gvuex'

let store = useStore()
let count = computed(() => store.state.count)

let double = computed(() => store.getters.double)

function add() {
  store.commit('add')
}

function asyncAdd() {
  store.dispatch('asyncAdd')
}
</script>
