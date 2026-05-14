<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { hero, experiences, skills } from '@/data/index'
import { diffDate } from '@/utils/date'

const splitTitle = (text: string, highlights: string[]) => {
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
  return text.split(pattern).map((part) => ({
    text: part,
    highlight: highlights.some((h) => h.toLowerCase() === part.toLowerCase()),
  }))
}

const heroTitleParts = splitTitle(hero.heroTitle.full, hero.heroTitle.highlight)
const techRibbon = computed(() => skills.technical.slice(0, 8).map((s) => s.label))

const totalExperience = computed(() => {
  if (!experiences.length) return ''
  const parse = (s: string) => {
    const [d, m, y] = s.split('/').map(Number)
    return new Date(y, m - 1, d).getTime()
  }
  const earliest = experiences.reduce((min, e) => Math.min(min, parse(e.start_date)), parse(experiences[0].start_date))
  const dt = new Date(earliest)
  const dd = String(dt.getDate()).padStart(2, '0')
  const mm = String(dt.getMonth() + 1).padStart(2, '0')
  return diffDate(`${dd}/${mm}/${dt.getFullYear()}`)
})
</script>

<template>
  <section class="reveal">
    <div class="glass gradient-border lift relative overflow-hidden rounded-3xl p-8 md:p-12">
      <div
        class="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/40 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
      >
        <span class="live-dot" :class="{ 'is-open': hero.status.state === 'open' }"></span>
        {{ hero.status.message }}
      </div>

      <h1 class="mt-8 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance leading-[1.05] max-w-4xl">
        <template v-for="(part, i) in heroTitleParts" :key="i">
          <span v-if="part.highlight" class="hl">{{ part.text }}</span>
          <span v-else>{{ part.text }}</span>
        </template>
      </h1>

      <p class="mt-6 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300">
        {{ hero.description }}
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:translate-y-[-1px] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          View work
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </a>
        <RouterLink
          to="/contact"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white/40 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:translate-y-[-1px] hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
        >
          Get in touch
        </RouterLink>
      </div>

      <div class="mt-10 border-t border-slate-900/5 pt-5 dark:border-white/10">
        <div class="flex flex-wrap gap-1.5">
          <span v-for="t in techRibbon" :key="t" class="tag-chip text-[11px]">{{ t }}</span>
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span class="font-mono uppercase tracking-widest text-[10px]">Bangkok</span>
          <span class="text-slate-300 dark:text-slate-600">·</span>
          <span class="font-mono uppercase tracking-widest text-[10px]">GMT+7</span>
          <span v-if="totalExperience" class="text-slate-300 dark:text-slate-600">·</span>
          <span v-if="totalExperience" class="font-mono uppercase tracking-widest text-[10px]">{{ totalExperience }} exp</span>
        </div>
      </div>
    </div>
  </section>
</template>
