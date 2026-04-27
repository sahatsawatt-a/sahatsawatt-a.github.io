import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(),],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: ["port.skye.pc"],
    watch: {
      usePolling: true,  // Docker-friendly file watching
      interval: 100,
    },
    hmr: {
      host: "port.skye.pc",
      port: 5173,
    },
  },
  base: "/",
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
