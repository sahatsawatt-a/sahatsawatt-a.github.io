<!-- src/components/sections/ExperienceSection.vue -->
<script setup>
import { experience } from '../../data/profile'
</script>

<template>
  <section id="experience" class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
      {{ experience.title }}
    </h2>

    <div class="space-y-8 text-slate-300">
      <div
        v-for="item in experience.items"
        :key="item.role"
        class="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 space-y-3"
      >
        <div class="flex items-center justify-between">
          <p class="text-base font-medium text-slate-100">
            {{ item.role }}
          </p>
          <p class="text-xs text-slate-400">
            {{ item.period }}
          </p>
        </div>
        <p class="text-xs text-slate-400">
          {{ item.company }}
        </p>
        <ul class="text-sm space-y-2 text-slate-200">
          <li
            v-for="bullet in item.bullets"
            :key="bullet"
          >
            • {{ bullet }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
