<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { projects, type Project } from '@/data/index'
import { categoryBadge, companyFor } from '@/utils/projectMeta'

const highlighted = computed(() =>
  projects.filter(p => p.highlight).sort((a, b) => b.proj_id - a.proj_id),
)

type Stat = { value: string; valueClass: string; label: string }

function statFor(item: string, index: number): Stat {
  const trimmed = item.trim()
  const numMatch = trimmed.match(/^([\d.]+%?|[↑↓✓])\s*(.*)$/)
  if (numMatch) {
    const value = numMatch[1]
    const rest = numMatch[2].trim()
    const isPct = /%/.test(value)
    return {
      value,
      valueClass: isPct
        ? 'text-emerald-500'
        : 'text-slate-900 dark:text-slate-100',
      label: rest || trimmed,
    }
  }
  const lower = trimmed.toLowerCase()
  let glyph = '✓'
  if (/(reduc|eliminat|cut|fewer|less|decrease|minimi[sz]e|↓)/.test(lower)) {
    glyph = '↓'
  } else if (
    /(improv|increase|enable|achiev|accelerat|enhanc|boost|expand|↑)/.test(
      lower,
    )
  ) {
    glyph = '↑'
  }
  return {
    value: glyph,
    valueClass: 'text-slate-900 dark:text-slate-100',
    label: shortLabel(trimmed, index),
  }
}

function shortLabel(item: string, index: number): string {
  const lower = item.toLowerCase()
  if (/manual/.test(lower) && /(effort|work|task|process)/.test(lower)) {
    return 'manual effort'
  }
  if (/(accuracy|consistenc)/.test(lower)) return 'data accuracy'
  if (/(speed|fast|accelerat)/.test(lower)) return 'investigation speed'
  if (/(coverage|outreach|contact)/.test(lower)) return 'contact coverage'
  if (/(repetitive)/.test(lower)) return 'repetitive work'
  if (/(self-service)/.test(lower)) return 'self-service tools'
  const words = item.split(/\s+/)
  if (words.length <= 4) return item.toLowerCase()
  return words.slice(0, 4).join(' ').toLowerCase() + (words.length > 4 ? '…' : '')
}

function colSpanFor(index: number, total: number): string {
  if (total === 1) return 'col-span-12'
  if (total >= 3 && index === 0) return 'col-span-12'
  return 'col-span-12 md:col-span-6'
}
</script>

<template>
  <section id="work" class="reveal">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold tracking-tight">Selected Work</h2>
      <span
        class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
      >projects.ts</span>
    </div>

    <div class="grid grid-cols-12 gap-4 md:gap-5">
      <RouterLink
        v-for="(p, idx) in highlighted"
        :key="p.proj_id"
        :to="`/projects/${p.slug}`"
        :class="['glass gradient-border lift relative overflow-hidden rounded-3xl p-6 block', colSpanFor(idx, highlighted.length)]"
      >
        <div class="mb-3 flex items-center gap-2 text-xs">
          <span
            :class="['rounded-md px-2 py-0.5 ring-1 text-xs font-medium', categoryBadge(p).classes]"
          >{{ categoryBadge(p).label }}</span>
          <span class="text-slate-500 dark:text-slate-400">{{ companyFor(p) }}</span>
        </div>

        <h3 class="text-lg font-semibold tracking-tight">{{ p.title }}</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ p.description }}</p>

        <div class="mt-4 flex flex-wrap gap-1.5">
          <span v-for="tag in p.tags" :key="tag" class="tag-chip">{{ tag }}</span>
        </div>

        <div
          v-if="idx === 0 && p.impact?.length"
          class="mt-5 grid grid-cols-3 gap-3 border-t border-slate-900/5 dark:border-white/10 pt-4"
        >
          <div v-for="(item, i) in p.impact.slice(0, 3)" :key="item">
            <div :class="['text-xl font-semibold', statFor(item, i).valueClass]">
              {{ statFor(item, i).value }}
            </div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">
              {{ statFor(item, i).label }}
            </div>
          </div>
        </div>

        <ul
          v-else-if="p.features?.length"
          class="mt-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300"
        >
          <li v-for="bullet in p.features.slice(0, 3)" :key="bullet" class="flex gap-2">
            <span class="text-sky-500">▸</span>
            <span>{{ bullet }}</span>
          </li>
        </ul>

        <div
          v-else-if="p.impact?.length"
          class="mt-5 grid grid-cols-3 gap-3 border-t border-slate-900/5 dark:border-white/10 pt-4"
        >
          <div v-for="(item, i) in p.impact.slice(0, 3)" :key="item">
            <div :class="['text-xl font-semibold', statFor(item, i).valueClass]">
              {{ statFor(item, i).value }}
            </div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">
              {{ statFor(item, i).label }}
            </div>
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="mt-6 flex justify-end">
      <RouterLink
        to="/projects"
        class="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition"
      >
        View all projects →
      </RouterLink>
    </div>
  </section>
</template>
