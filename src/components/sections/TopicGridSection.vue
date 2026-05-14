<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { about, experiences, skills, contact } from '@/data/index'
import { diffDate } from '@/utils/date'

function firstSentence(text: string): string {
  const match = text.match(/^(.+?[.!?])(\s|$)/)
  return (match ? match[1] : text).trim()
}

function truncate(text: string, max = 130): string {
  if (text.length <= max) return text
  const slice = text.slice(0, max)
  const lastSpace = slice.lastIndexOf(' ')
  const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice
  return cut.replace(/[,;:.\s]+$/, '') + '…'
}

// "1 year 9 months" → "1y 9m" to keep the teaser compact and on-brand with timeline.ts
function shortDuration(d: string): string {
  return d
    .replace(/\s*years?/g, 'y')
    .replace(/\s*months?/g, 'm')
    .replace(/\s+/g, ' ')
    .trim()
}

const aboutTeaser = computed(() =>
  truncate(firstSentence(about.body[0] ?? ''), 130),
)

const sortedExperiences = computed(() =>
  [...experiences].sort((a, b) => {
    const [ad, am, ay] = a.start_date.split('/').map(Number)
    const [bd, bm, by] = b.start_date.split('/').map(Number)
    return new Date(ay, am - 1, ad).getTime() - new Date(by, bm - 1, bd).getTime()
  }),
)

const experienceTeaser = computed(() => {
  const earliest = sortedExperiences.value[0]
  const latest = sortedExperiences.value[sortedExperiences.value.length - 1]
  const roles = sortedExperiences.value.map(e => e.role)
  const arrow = roles.length > 1 ? roles.join(' → ') : roles[0]
  const duration = earliest ? shortDuration(diffDate(earliest.start_date)) : ''
  return {
    line: `${arrow}${duration ? ` · ${duration}` : ''}`,
    latest,
  }
})

const skillsTeaser = computed(() => {
  const counts = `${skills.core.length} core · ${skills.technical.length} technical · ${skills.interests.length} interests`
  const featured = [
    skills.core[0],
    skills.core[1],
    skills.technical[1],
    skills.core[6] ?? skills.core[skills.core.length - 1],
  ].filter(Boolean)
  return { counts, featured }
})

const contactTeaser = computed(() => ({
  intro: truncate(firstSentence(contact.intro), 130),
  links: contact.links.slice(0, 2).map(l => l.label),
}))

const Arrow = `
  <svg
    class="h-4 w-4 transition group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    viewBox="0 0 24 24"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
  </svg>
`
</script>

<template>
  <section class="reveal">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold tracking-tight">Explore</h2>
      <span
        class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
        >index.ts</span
      >
    </div>

    <div class="grid grid-cols-12 gap-4 md:gap-5">
      <!-- About -->
      <RouterLink
        to="/about"
        class="group col-span-12 md:col-span-6 lg:col-span-3 glass gradient-border lift relative overflow-hidden rounded-3xl p-6 flex flex-col"
      >
        <div class="flex items-center justify-between">
          <span
            class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 text-lg ring-1 ring-inset ring-white/20"
            aria-hidden="true"
            >👤</span
          >
          <span
            class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >about.md</span
          >
        </div>
        <h3 class="mt-5 text-xl font-semibold tracking-tight">About</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {{ aboutTeaser }}
        </p>
        <div
          class="mt-auto flex items-center justify-end pt-4 text-slate-500 dark:text-slate-400"
        >
          <span class="font-mono text-[11px]">read more</span>
          <span v-html="Arrow" class="ml-1.5 inline-flex"></span>
        </div>
      </RouterLink>

      <!-- Experience -->
      <RouterLink
        to="/experience"
        class="group col-span-12 md:col-span-6 lg:col-span-3 glass gradient-border lift relative overflow-hidden rounded-3xl p-6 flex flex-col"
      >
        <div class="flex items-center justify-between">
          <span
            class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400/30 to-sky-400/30 text-lg ring-1 ring-inset ring-white/20"
            aria-hidden="true"
            >💼</span
          >
          <span
            class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >experience.ts</span
          >
        </div>
        <h3 class="mt-5 text-xl font-semibold tracking-tight">Experience</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {{ experienceTeaser.line }}
        </p>
        <p
          v-if="experienceTeaser.latest"
          class="mt-1 text-xs text-slate-500 dark:text-slate-400"
        >
          Currently at {{ experienceTeaser.latest.company }}
        </p>
        <div
          class="mt-auto flex items-center justify-end pt-4 text-slate-500 dark:text-slate-400"
        >
          <span class="font-mono text-[11px]">timeline</span>
          <span v-html="Arrow" class="ml-1.5 inline-flex"></span>
        </div>
      </RouterLink>

      <!-- Skills -->
      <RouterLink
        to="/skills"
        class="group col-span-12 md:col-span-6 lg:col-span-3 glass gradient-border lift relative overflow-hidden rounded-3xl p-6 flex flex-col"
      >
        <div class="flex items-center justify-between">
          <span
            class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-400/30 to-cyan-400/30 text-lg ring-1 ring-inset ring-white/20"
            aria-hidden="true"
            >🛠️</span
          >
          <span
            class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >skills.ts</span
          >
        </div>
        <h3 class="mt-5 text-xl font-semibold tracking-tight">Skills</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {{ skillsTeaser.counts }}
        </p>
        <div class="mt-3 flex flex-wrap gap-1.5">
          <span
            v-for="s in skillsTeaser.featured"
            :key="s.label"
            class="skill-chip"
          >
            {{ s.icon }} {{ s.label }}
          </span>
        </div>
        <div
          class="mt-auto flex items-center justify-end pt-4 text-slate-500 dark:text-slate-400"
        >
          <span class="font-mono text-[11px]">full stack</span>
          <span v-html="Arrow" class="ml-1.5 inline-flex"></span>
        </div>
      </RouterLink>

      <!-- Contact -->
      <RouterLink
        to="/contact"
        class="group col-span-12 md:col-span-6 lg:col-span-3 glass gradient-border lift relative overflow-hidden rounded-3xl p-6 flex flex-col"
      >
        <div class="flex items-center justify-between">
          <span
            class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400/30 to-rose-400/30 text-lg ring-1 ring-inset ring-white/20"
            aria-hidden="true"
            >✉️</span
          >
          <span
            class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >contact.md</span
          >
        </div>
        <h3 class="mt-5 text-xl font-semibold tracking-tight">Contact</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {{ contactTeaser.intro }}
        </p>
        <p class="mt-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
          {{ contactTeaser.links.join(' · ') }}
        </p>
        <div
          class="mt-auto flex items-center justify-end pt-4 text-slate-500 dark:text-slate-400"
        >
          <span class="font-mono text-[11px]">say hi</span>
          <span v-html="Arrow" class="ml-1.5 inline-flex"></span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
