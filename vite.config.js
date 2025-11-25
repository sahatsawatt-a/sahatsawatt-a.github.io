import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(),],
  server: {
    host: "0.0.0.0",     // makes Vite available outside the container
    port: 5173,          // match your compose mapping
    strictPort: true,
    watch: {
      usePolling: true,  // Docker-friendly file watching
      interval: 100,     // optional but helps
    },
    hmr: {
      host: "localhost", // your host machine
      port: 5173,
    },
  },
  base: "/"
})
