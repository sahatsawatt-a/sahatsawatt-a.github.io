<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { skills, type SkillItem } from '@/data/index'

interface SkillGroup {
  title: string
  description: string
  emoji: string
  accent: string
  items: SkillItem[]
}

const groups: SkillGroup[] = [
  {
    title: 'Core',
    description:
      'The mental moves I rely on — breaking down problems, mapping integrations, and picking the right fallback when a model is uncertain.',
    emoji: '🧠',
    accent: 'from-emerald-400/40 to-teal-400/40',
    items: skills.core,
  },
  {
    title: 'Technical',
    description:
      'The tools I reach for to ship pipelines, FastAPI services, and ML/CV systems that other teams can plug into.',
    emoji: '⚙️',
    accent: 'from-violet-400/40 to-fuchsia-400/40',
    items: skills.technical,
  },
  {
    title: 'Interests',
    description:
      'Adjacent fields I keep tabs on — where I want these pipelines to drive themselves next.',
    emoji: '🧭',
    accent: 'from-amber-400/40 to-orange-400/40',
    items: skills.interests,
  },
]
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
        <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">Skills</h1>
        <span
          class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
        >
          skills.ts
        </span>
      </div>

      <p
        class="mt-8 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
      >
        {{ skills.technical.length }} technical · {{ skills.core.length }} core ·
        {{ skills.interests.length }} interests
      </p>

      <div class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        <div
          v-for="group in groups"
          :key="group.title"
          class="glass lift rounded-2xl p-5 ring-1 ring-slate-900/5 dark:ring-white/10"
        >
          <span
            :class="[
              'inline-grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br text-base ring-1 ring-inset ring-white/20',
              group.accent,
            ]"
            aria-hidden="true"
          >
            {{ group.emoji }}
          </span>

          <div class="mt-3 flex items-center gap-2">
            <h2 class="text-base font-semibold tracking-tight">{{ group.title }}</h2>
            <span
              class="inline-flex items-center rounded-full bg-slate-900/5 px-2 py-0.5 font-mono text-[10px] dark:bg-white/10"
            >
              {{ group.items.length }}
            </span>
          </div>

          <p class="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {{ group.description }}
          </p>

          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="item in group.items"
              :key="item.label"
              class="skill-chip px-3 py-1.5 text-[12px] hover:bg-white hover:border-slate-900/15 dark:hover:bg-white/10 dark:hover:border-white/20"
            >
              {{ item.icon }} {{ item.label }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-900/5 pt-8 dark:border-white/10"
      >
        <RouterLink
          to="/projects"
          class="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          See how I've applied these →
        </RouterLink>
        <RouterLink
          to="/contact"
          class="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          Or get in touch →
        </RouterLink>
      </div>
    </div>
  </section>
</template>

