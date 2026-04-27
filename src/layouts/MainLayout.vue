<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import AppBackground from '../components/backgrounds/AppBackground.vue'
</script>

<template>
  <div class="relative bg-gray-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">

    <AppBackground />

    <div class="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-10 pt-6 lg:px-10 lg:pt-8">

      <AppHeader/>
        
      
      <main class="my-10 flex-1 space-y-20 lg:mt-6">
        <slot />
      </main>

      <AppFooter/>

    </div>
  </div>
</template>