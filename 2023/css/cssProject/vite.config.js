import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "src/style/settings/var.scss";@import "src/style/tools/_sassMagic.scss";'
      },
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 37.5,
            exclude: /node_modules/,
            minPixelValue: 3
          })
        ]
      }
    }
  }
})
