import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'


// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://suggestions.dadata.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/suggestions/api/4_1/rs')
      }
    }
  },
  plugins: [
    vue(),
    svgLoader(),
    vueJsx(),
    vueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  resolve: {
    alias: {
//     '@': fileURLToPath(new URL('./src', import.meta.url))
//'@': path.resolve(__dirname, './src')
'@': '/src'
    },
  },
})
