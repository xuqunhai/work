import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {viteMockServe} from 'vite-plugin-mock'
import path from 'path'

// https://vitejs.dev/config/
export default ({ command }) => {
  let prodMock = false;
  console.log('command', command)
  return {
    // css: {},
    // esbuild: {},
    server: {
      fs: {
        strict: false,
        allow: ['..']
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'comps': path.resolve(__dirname, 'src/components'),
        'views': path.resolve(__dirname, 'src/views'),
      }
    },
    plugins: [vue(), vueJsx(), viteMockServe({
      mockPath: 'mock',
      localEnabled: command === 'serve',
      prodEnabled: command !== 'serve' && prodMock,
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
      supportTs: false
    })]
  }
}
