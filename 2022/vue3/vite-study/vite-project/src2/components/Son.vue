<template>{{ res }}</template>
<script>
import { defineComponent } from '@vue/composition-api';
const get = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(666), 2000);
  });
export default defineComponent({
  async setup() {
    const res = await get();
    return { res };
  }
});
</script>
