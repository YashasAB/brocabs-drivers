import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8082,
    allowedHosts: [
      '7ebea616-407f-499d-b41b-5e5df1c60984-00-jbpz1r7h4pfr.janeway.replit.dev',
      '50729b13-d84a-45ad-a845-c8ca4141bb29-00-3it3ldl6wnmh3.kirk.replit.dev'
    ]
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  base: '/',
  publicDir: 'public'
})

