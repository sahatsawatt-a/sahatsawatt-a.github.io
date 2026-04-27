<!-- src/components/sections/ContactSection.vue -->
<script setup lang="ts">
import { contact } from '@/data/index'
</script>

<template>
  <section id="contact" class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold tracking-tight">Contact</h2>

    <p class="text-sm md:text-base text-slate-700 dark:text-slate-200 max-w-xl">
      {{ contact.intro }}
    </p>

    <div class="space-y-2 text-sm text-slate-700 dark:text-slate-200">
      <p v-for="link in contact.links" :key="link.label">
        {{ link.label }}:
        <a :href="link.url" target="_blank"
          class="text-[#FF2D20] hover:text-[#ff543e] underline underline-offset-4">
          {{ link.value }}
        </a>
      </p>
    </div>
  </section>
</template>
