import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { join, replace, resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '@': join(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: () => replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue(), WindiCSS()]
})
