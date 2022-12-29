import { createRouter, createWebHashHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from './grouter/index'
import Home from '../pages/home.vue'
import About from '../pages/about.vue'
import Login from '../components/Login.vue'
import NProgress from 'nprogress' // progress bar

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  { path: '/login', component: Login, hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach(async (to, from, next) => {
//   // canUserAccess() 返回 `true` 或 `false`
//   let token = getToken()
//   if (!token) {
//     next('/login')
//   }
//   return true
// })

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
