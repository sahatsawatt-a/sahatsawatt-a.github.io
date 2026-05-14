<script setup lang="ts">
import { footer } from '@/data/index'
</script>

<template>
  <footer
    class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-900/5 pt-6 text-xs text-slate-500 dark:border-white/5 dark:text-slate-400 sm:flex-row"
  >
    <div>{{ footer.text }}</div>
    <div class="font-mono">built with vue · vite · tailwind</div>
  </footer>
</template>
