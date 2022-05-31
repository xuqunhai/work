<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <div class="block">
      <span class="demonstration">默认不区分颜色</span>
      <el-rate v-model="value" :colors="colors" :allowHalf="true"></el-rate>
      <!-- :value="value" @input="value = $event.target.value" -->
    </div>
    <!-- <div>
      <el-rate
        v-model="value"
        disabled
        show-score
        score-template="{value}">
      </el-rate>
    </div> -->
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
// classes activeClass activeColor
// import { Rate } from 'element-ui';
// import Rate from '../node_modules/element-ui/packages/rate/index';
import Rate from './components/rate/index';

export default {
  name: 'app',
  components: {
    elRate: Rate,
  },
  data () {
    return {
      value: 3,
      colors: ['red', 'green', 'blue'],
      iconClasses: ['lowClass', 'midClass', 'highClass'],
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
