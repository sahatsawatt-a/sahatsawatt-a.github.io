<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { info } from '@/data/index'
import { useTheme } from '@/composables/useTheme'

const { toggle } = useTheme()
const route = useRoute()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Skills', to: '/skills' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]

const isMenuOpen = ref(false)
const closeMenu = () => (isMenuOpen.value = false)

watch(() => route.fullPath, closeMenu)
</script>

<template>
  <div class="relative">
    <header
      class="glass flex items-center justify-between rounded-2xl px-4 py-3"
    >
      <RouterLink to="/" class="flex min-w-0 items-center gap-3">
        <span
          class="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-400/30 to-sky-400/30 text-sm font-bold tracking-tight ring-1 ring-inset ring-white/20"
        >
          <img
            v-if="info.profileImage"
            :src="info.profileImage"
            :alt="info.full_name"
            class="h-full w-full object-cover"
          />
          <template v-else>{{ info.initials }}</template>
        </span>
        <div class="min-w-0 leading-tight">
          <div class="truncate text-sm font-semibold">{{ info.full_name }}</div>
          <div class="truncate text-xs text-slate-500 dark:text-slate-400">
            {{ info.tagline }}
          </div>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-1 text-sm md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-1.5 text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
          active-class="bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          aria-label="Toggle theme"
          title="Toggle theme"
          class="grid h-9 w-9 place-items-center rounded-xl border border-slate-900/10 bg-white/40 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          @click="toggle"
        >
          <svg
            class="hidden h-4 w-4 dark:block"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              stroke-linecap="round"
              d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"
            />
          </svg>
          <svg
            class="h-4 w-4 dark:hidden"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"
            />
          </svg>
        </button>

        <RouterLink
          to="/contact"
          class="hidden rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 sm:inline-block"
        >
          Get in touch
        </RouterLink>

        <button
          type="button"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          class="grid h-9 w-9 place-items-center rounded-xl border border-slate-900/10 bg-white/40 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 md:hidden dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg
            v-if="!isMenuOpen"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            v-else
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </header>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMenuOpen"
        id="mobile-nav"
        class="glass absolute left-0 right-0 top-full z-30 mt-2 flex flex-col gap-1 rounded-2xl p-2 text-sm md:hidden"
      >
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          active-class="bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white"
          @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </Transition>
  </div>
</template>
