<script setup>
import { ref } from 'vue';

let refValue = ref('Chris1993');
let setRefValue = () => {
  refValue.value = 'Hello Chris1993';
};
let refObj = ref({ name: 'Chris1993' });
let setRefObj = () => {
  refObj.value.name = 'Hello Chris1993';
};
</script>
<template>
  <h2>Vue3 ref API Base</h2>
  <div>
    String:{{refValue}}
    <span @click="setRefValue">Update</span>
  </div>
  <div>
    Object:{{refObj.name}}
    <span @click="setRefObj">Update</span>
  </div>
</template>