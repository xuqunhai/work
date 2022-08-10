<template>
  <h1>{{count}}</h1>
  <button @click="inc">++</button>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const count = ref(0); // 创建响应式数据
    const inc = () => {
      count.value++; // 修改响应式数据
    };
    return {
      // return对象用于template使用，即想要在template中使用的东西，必须return出去
      count,
      inc
    };
  }
};
</script>