import { ref, onMounted, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const theme = ref<Theme>('dark')

function applyTheme(t: Theme) {
  const root = document.documentElement
  if (t === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/** Initialise theme from storage / system preference. Call once on app boot. */
export function initTheme() {
  theme.value = readInitialTheme()
  applyTheme(theme.value)
}

/** Reactive theme handle + toggle. Components import this. */
export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  function set(next: Theme) {
    theme.value = next
  }
  return { theme, toggle, set }
}

watch(theme, (t) => {
  applyTheme(t)
  try { localStorage.setItem(STORAGE_KEY, t) } catch {}
})
