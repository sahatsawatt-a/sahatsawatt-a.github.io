<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { experiences, projects, type Experience, type Project } from '@/data/index'
import { formatDate, diffDate } from '@/utils/date'

const sorted: Experience[] = [...experiences].sort((a, b) => {
  if (a.end_date === '' && b.end_date !== '') return -1
  if (b.end_date === '' && a.end_date !== '') return 1
  return b.exp_id - a.exp_id
})

const isLatest = (exp: Experience): boolean => exp === sorted[0]

const projectsFor = (exp: Experience): Project[] =>
  projects.filter(p => p.exp_id === exp.exp_id)
</script>

<template>
  <section class="reveal">
    <div class="glass gradient-border relative overflow-hidden rounded-3xl p-6 md:p-10">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        ← Back to home
      </RouterLink>

      <div class="mt-6 flex flex-wrap items-end justify-between gap-4">
        <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">Experience</h1>
        <span
          class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
        >
          experience.ts
        </span>
      </div>

      <ol
        class="relative mt-10 space-y-10 border-l border-slate-900/10 pl-6 dark:border-white/10"
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
            <h2 class="text-lg font-semibold">{{ exp.role }}</h2>
            <span class="font-mono text-xs text-slate-500 dark:text-slate-400">
              {{ formatDate(exp.start_date) }} —
              {{ formatDate(exp.end_date) }} ·
              {{ diffDate(exp.start_date, exp.end_date ? exp.end_date : undefined) }}
            </span>
          </div>

          <div class="text-sm text-slate-600 dark:text-slate-300">
            {{ exp.company }}
          </div>

          <span
            v-if="isLatest(exp)"
            class="mt-2 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300"
          >
            latest
          </span>

          <ul
            v-if="exp.summary.length"
            class="mt-3 space-y-1.5 text-sm text-slate-600 md:text-base dark:text-slate-300"
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

          <div v-if="exp.tools_built?.length" class="mt-5">
            <div
              class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >
              Tools built
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tool in exp.tools_built"
                :key="tool"
                class="tag-chip"
              >
                {{ tool }}
              </span>
            </div>
          </div>

          <div v-if="projectsFor(exp).length" class="mt-5">
            <div
              class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >
              Related projects
            </div>
            <div class="flex flex-wrap gap-1.5">
              <RouterLink
                v-for="p in projectsFor(exp)"
                :key="p.slug"
                :to="`/projects/${p.slug}`"
                class="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-700 ring-1 ring-violet-500/20 transition hover:bg-violet-500/20 hover:translate-y-[-1px] dark:text-violet-300"
              >
                {{ p.title }}
                <span aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </div>
        </li>
      </ol>

      <div
        class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-900/5 pt-6 dark:border-white/10"
      >
        <RouterLink
          to="/projects"
          class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          View projects →
        </RouterLink>
      </div>
    </div>
  </section>
</template>
