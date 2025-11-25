<!-- src/components/sections/ContactSection.vue -->
<script setup>
import { contact } from '../../data/profile'
</script>

<template>
  <section id="contact" class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
      {{ contact.title }}
    </h2>

    <p class="text-sm md:text-base text-slate-700 dark:text-slate-200 max-w-xl">
      {{ contact.intro }}
    </p>

    <div class="space-y-2 text-sm text-slate-700 dark:text-slate-200">
      <p>
        {{ contact.email.label }}:
        <a :href="`mailto:${contact.email.value}`"
          class="text-[#FF2D20] hover:text-[#ff543e] underline underline-offset-4">
          {{ contact.email.value }}
        </a>
      </p>

      <!-- Only show GitHub row if GitHub data exists -->
      <p v-if="contact.github?.url && contact.github?.handle">
        {{ contact.github.label }}:
        <a :href="contact.github.url" target="_blank"
          class="text-[#FF2D20] hover:text-[#ff543e] underline underline-offset-4">
          {{ contact.github.handle }}
        </a>
      </p>

    </div>
  </section>
</template>
