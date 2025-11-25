<!-- src/components/sections/AboutSection.vue -->
<script setup>
import { about } from '../../data/profile'
</script>

<template>
  <section id="about" class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
      {{ about.title }}
    </h2>

    <div class="grid gap-8 md:grid-cols-[1.5fr,1fr] text-sm md:text-base text-slate-300">
      <p class="text-slate-700 dark:text-slate-200">
        <span
          v-for="(paragraph, idx) in about.body"
          :key="idx"
        >
          {{ paragraph }}
          <br v-if="idx < about.body.length - 1" />
          <br v-if="idx < about.body.length - 1" />
        </span>
      </p>

    </div>
  </section>
</template>
