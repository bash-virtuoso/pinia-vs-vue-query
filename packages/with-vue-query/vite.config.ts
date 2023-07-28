import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = {
    ...loadEnv(mode, __dirname, ''),
    ...loadEnv(mode, resolve(__dirname, '../..'), ''),
  }

  return {
    plugins: [vue()],
    server: {
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: env.API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${env.API_KEY}`)
            })
          },
        },
      },
    },
  }
})
