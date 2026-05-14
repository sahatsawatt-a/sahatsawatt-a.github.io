<script setup lang="ts">
import ProjectList from '@/components/project/ProjectList.vue'
import { projects } from '@/data/index'
</script>

<template>
  <section class="glass gradient-border reveal relative overflow-hidden rounded-3xl p-6 md:p-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold tracking-tight md:text-3xl">Projects</h1>
      <span
        class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
      >
        projects.ts
      </span>
    </div>

    <ProjectList :projects="projects" />
  </section>
</template>
