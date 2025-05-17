import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcssPlugin from '@tailwindcss/vite'
import { logger } from './src/shared/lib/logger'
import type { IncomingMessage } from 'http'

interface ExtendedIncomingMessage extends IncomingMessage {
    startTime?: number
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const API_URL = env.VITE_API_URL || 'http://localhost:8000'

  logger.info('API URL configured', { url: API_URL })

  return {
    plugins: [react(), tailwindcssPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy) => {
            proxy.on('error', (err) => {
              logger.error('Proxy Error', { 
                message: err.message,
                target: API_URL
              })
            })

            proxy.on('proxyReq', (proxyReq, req: ExtendedIncomingMessage) => {
              req.startTime = Date.now()
              const targetUrl = `${API_URL}${req.url}`
              logger.request(req.method || 'UNKNOWN', targetUrl)
            })

            proxy.on('proxyRes', (proxyRes, req: ExtendedIncomingMessage) => {
              const duration = req.startTime ? Date.now() - req.startTime : 0
              const status = proxyRes.statusCode || 500
              const targetUrl = `${API_URL}${req.url}`
              
              logger.response(
                req.method || 'UNKNOWN',
                targetUrl,
                status,
                duration
              )
            })
          },
        },
      },
    },
  }
})


