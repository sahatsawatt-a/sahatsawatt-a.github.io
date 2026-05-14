<script setup lang="ts">
import { experiences, type Experience } from '@/data/index'
import { formatDate, diffDate } from '@/utils/date'

const sorted: Experience[] = [...experiences].sort((a, b) => {
  if (a.end_date === '' && b.end_date !== '') return -1
  if (b.end_date === '' && a.end_date !== '') return 1
  return b.exp_id - a.exp_id
})

const isLatest = (exp: Experience): boolean => exp === sorted[0]
</script>

<template>
  <section class="reveal">
    <div
      class="glass gradient-border lift relative overflow-hidden rounded-3xl p-6 md:p-8"
    >
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-lg font-semibold tracking-tight">Experience</h2>
        <span
          class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >timeline.ts</span
        >
      </div>

      <ol
        class="relative space-y-6 border-l border-slate-900/10 pl-6 dark:border-white/10"
      >
        <li v-for="exp in sorted" :key="exp.exp_id" class="relative">
          <span
            v-if="isLatest(exp)"
            class="pulse absolute -left-[34px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 dark:ring-emerald-400/10"
          ></span>
          <span
            v-else
            class="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-slate-400/60 ring-4 ring-slate-400/10"
          ></span>

          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h3 class="text-base font-semibold">{{ exp.role }}</h3>
            <span
              class="font-mono text-xs text-slate-500 dark:text-slate-400"
            >
              {{ formatDate(exp.start_date) }} —
              {{ formatDate(exp.end_date) }} ·
              {{ diffDate(exp.start_date, exp.end_date || undefined) }}
            </span>
          </div>

          <div class="text-sm text-slate-600 dark:text-slate-300">
            {{ exp.company }}
          </div>

          <span
            v-if="isLatest(exp)"
            class="mt-2 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300"
            >latest</span
          >

          <ul
            v-if="exp.summary.length"
            class="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300"
          >
            <li
              v-for="(bullet, i) in exp.summary"
              :key="i"
              class="flex gap-2"
            >
              <span class="text-emerald-500">▸</span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>
