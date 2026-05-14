import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const VITE_HOST = process.env.VITE_HOST || 'localhost'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(),],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: [VITE_HOST],
    watch: {
      usePolling: true,  // Docker-friendly file watching
      interval: 100,
    },
    hmr: {
      host: VITE_HOST,
      protocol: 'wss',
      clientPort: 443,
    },
  },
  base: "/",
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
