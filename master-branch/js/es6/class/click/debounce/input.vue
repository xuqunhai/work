<template>
 <debounce time="300" :before="beforeFun">
  <input type="text" v-model="inpModel" @input="inputChange"/>
 </debounce>
</template>
 
<script>
import debounce from './click'
export default {
 data() {
  return {
   inpModel: 1
  }
 },
 methods: {
  inputChange(e){
   console.log(e.target.value, '防抖')
  },
  beforeFun(e){
   console.log(e.target.value, '不防抖')
  }
 },
 components: {
  debounce
 }
}
</script>