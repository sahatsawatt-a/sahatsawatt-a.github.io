<!-- src/components/sections/ExperienceSection.vue -->
<script setup>
import { experiences } from '@/data/index'
</script>

<template>
  <section id="experience" class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold tracking-tight">Experience</h2>

    <div class="space-y-8 text-slate-300">
      <div
        v-for="item in experiences"
        :key="item.exp_id"
        class="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 space-y-3"
      >
        <div class="flex items-center justify-between">
          <p class="text-base font-medium text-slate-100">{{ item.role }}</p>
          <p class="text-xs text-slate-400">{{ item.company }}</p>
        </div>
        <ul class="text-sm space-y-2 text-slate-200">
          <li v-for="point in item.summary" :key="point">• {{ point }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
