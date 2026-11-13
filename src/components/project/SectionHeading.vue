<script setup lang="ts">
defineProps<{
  num: string
  eyebrow: string
  title: string
  /** Tailwind text colour for the eyebrow, e.g. 'text-sky-500' */
  tone?: string
}>()
</script>

<template>
  <div class="mb-5 px-1">
    <div class="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest">
      <span class="text-slate-400 dark:text-slate-500">{{ num }}</span>
      <span class="h-px w-6 bg-slate-400/40" />
      <span :class="tone ?? 'text-slate-500'">{{ eyebrow }}</span>
    </div>
    <h2 class="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{{ title }}</h2>
  </div>
</template>
