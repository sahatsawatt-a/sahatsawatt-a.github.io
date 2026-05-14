<script setup lang="ts">
import { hero } from '@/data/index'

const splitTitle = (text: string, highlights: string[]) => {
  const escaped = highlights.map((h) =>
    h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  )
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')

  return text.split(pattern).map((part) => ({
    text: part,
    highlight: highlights.some((h) => h.toLowerCase() === part.toLowerCase()),
  }))
}

const heroTitleParts = splitTitle(
  hero.heroTitle.full,
  hero.heroTitle.highlight,
)
</script>

<template>
  <section class="grid grid-cols-12 gap-4 md:gap-5 reveal">
    <div
      class="glass gradient-border lift relative overflow-hidden rounded-3xl p-8 md:p-10 col-span-12 lg:col-span-8"
    >
      <div
        class="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/40 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
      >
        <span
          class="live-dot"
          :class="{ 'is-open': hero.status.state === 'open' }"
        ></span>
        {{ hero.status.message }}
      </div>

      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance leading-tight"
      >
        <template v-for="(part, i) in heroTitleParts" :key="i">
          <span v-if="part.highlight" class="hl">{{ part.text }}</span>
          <span v-else>{{ part.text }}</span>
        </template>
      </h1>

      <p
        class="mt-6 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300"
      >
        {{ hero.description }}
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:translate-y-[-1px] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          View work
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
        <a
          href="https://github.com/sahatsawatt-a"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white/40 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
        >
          <svg
            class="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M12 .5C5.7.5.7 5.5.7 11.8c0 5 3.3 9.2 7.8 10.7.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.7C23.3 5.5 18.3.5 12 .5z"
            />
          </svg>
          GitHub
        </a>
      </div>
    </div>

    <div class="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
      <div
        v-for="(card, i) in hero.quickCards"
        :key="i"
        class="glass gradient-border lift relative overflow-hidden rounded-2xl p-4"
      >
        <span
          :class="[
            'inline-grid h-8 w-8 place-items-center rounded-xl text-base bg-gradient-to-br ring-1 ring-inset ring-white/20',
            card.accent,
          ]"
          aria-hidden="true"
        >
          {{ card.icon }}
        </span>
        <div
          class="mt-3 text-[10px] uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400"
        >
          {{ card.label }}
        </div>
        <div class="mt-0.5 text-sm font-medium leading-tight">
          {{ card.value }}
        </div>
      </div>
    </div>
  </section>
</template>
