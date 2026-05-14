<script setup lang="ts">
import { about } from '@/data/index'
</script>

<template>
  <section id="about" class="reveal">
    <div class="glass gradient-border lift relative overflow-hidden rounded-3xl p-6 md:p-8">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold tracking-tight">{{ about.title }}</h2>
        <span class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">about.md</span>
      </div>
      <div class="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <p v-for="(paragraph, idx) in about.body" :key="idx">{{ paragraph }}</p>
      </div>
    </div>
  </section>
</template>
