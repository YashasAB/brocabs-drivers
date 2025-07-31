import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8082,
    allowedHosts: ['7ebea616-407f-499d-b41b-5e5df1c60984-00-jbpz1r7h4pfr.janeway.replit.dev']
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  base: './',
  publicDir: 'public'
})

