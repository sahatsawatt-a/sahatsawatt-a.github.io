<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppBackground from '@/components/backgrounds/AppBackground.vue'
</script>

<template>
  <div
    class="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 antialiased transition-colors duration-500 dark:bg-[#0a0f1c] dark:text-slate-100"
  >
    <AppBackground />

    <div class="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
      <AppHeader />

      <main class="my-8 space-y-6 md:space-y-8">
        <slot />
      </main>

      <AppFooter />
    </div>
  </div>
</template>
