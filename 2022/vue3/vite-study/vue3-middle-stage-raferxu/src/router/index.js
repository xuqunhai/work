// 1 初始化VueRouter实例
import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileTerminalRoutes from './modules/mobile-routes'
import pcTerminalRoutes from './modules/pc-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerminal.value ? mobileTerminalRoutes : pcTerminalRoutes
})

export default router
