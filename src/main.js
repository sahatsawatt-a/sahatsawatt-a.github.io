import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initTheme } from './composables/useTheme'

initTheme()

createApp(App)
  .use(router)
  .mount('#app')

// Long-lived caching for images and hashed assets (see public/sw.js).
// Production only: in dev it would serve stale files over Vite's.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
