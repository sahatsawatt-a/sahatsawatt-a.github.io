<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppBackground from '@/components/backgrounds/AppBackground.vue'
</script>

<template>
  <div
    class="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 antialiased transition-colors duration-500 print:min-h-0 print:overflow-hidden print:bg-white print:text-black dark:bg-[#0a0f1c] dark:text-slate-100"
  >
    <div class="print:hidden">
      <AppBackground />
    </div>

    <div class="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8 print:max-w-none print:px-0 print:py-0">
      <div class="print:hidden">
        <AppHeader />
      </div>

      <main class="my-8 space-y-6 md:space-y-8 print:my-0 print:space-y-0">
        <slot />
      </main>

      <div class="print:hidden">
        <AppFooter />
      </div>
    </div>
  </div>
</template>
