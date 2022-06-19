<template>
  <div>
    <h2>后台首页</h2>
    <el-button @click="addCount">{{count}} - {{data.count}}</el-button>
    <!-- <hello-world></hello-world> -->
    <el-button @click="set">设置</el-button>
    <el-button @click="get">获取</el-button>
    <el-button @click="remove">删除</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
// import HelloWorld from '~/components/HelloWorld.vue';
import { useCookies } from '@vueuse/integrations/useCookies';
const cookie = useCookies();

let count = ref(1);
let data = reactive({
  count: 0
});
function addCount() {
  count.value++;
  data.count++;
}

function set() {
  cookie.set('admin-token', '456');
}
function get() {
  console.log(cookie.get('admin-token'));
}
function remove() {
  cookie.remove('admin-token');
}
</script>
