import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  type Env = Record<'API_BASE_URL' | 'API_KEY' | 'VITE_API_BASE_URL', string>
  const env: Env = loadEnv(mode, __dirname, '')

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
