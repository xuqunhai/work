import { createApp } from 'vue'
import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElContainer from './components/container/Container.vue'

// createApp(App).use(router).mount('#app')

const app = createApp(App)
app.use(store).use(router).use(Element3).use(ElContainer).mount('#app')

// 注册一个全局自定义指令 `v-focus`
app.directive('focus', {
  // 当被绑定的元素挂载到 DOM 中时……
  mounted(el) {
    // 聚焦元素
    el.focus()
  }
})
