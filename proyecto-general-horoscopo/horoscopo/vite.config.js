import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:4000', // El puerto donde corre tu back-end
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
