import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css/normalize.css'
import '@/style/index.scss'
import App from './App.vue'
import router from './router'
import Mui from '@/components'
import '@/mock'
import 'lib-flexible/flexible.js'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Mui)

app.mount('#app')
