import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router' // 4 导入路由
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.use(store)
app.use(router) // 4 注册路由

app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import 'virtual:windi.css'

// import './permission'

app.mount('#app')
