<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  experiences,
  education,
  projects,
  type Experience,
  type Education,
  type Project,
} from '@/data/index'
import { formatDate, diffDate } from '@/utils/date'

export type FilterType = 'all' | 'work' | 'study'
export type ViewMode = 'timeline' | 'grouped'

export interface TimelineItem {
  id: string
  itemType: 'work' | 'study'
  title: string
  organization: string
  startDate: string
  endDate: string
  dateDisplay: string
  duration: string
  isCurrent: boolean
  isLatest: boolean
  badgeLabel?: string
  summary: string[]
  tools?: string[]
  details?: { label: string; value: string }[]
  projects: Project[]
}

const activeFilter = ref<FilterType>('all')
const viewMode = ref<ViewMode>('timeline')

const workTimelineItems = computed<TimelineItem[]>(() => {
  const sortedWork = [...experiences].sort((a, b) => {
    if (a.end_date === '' && b.end_date !== '') return -1
    if (b.end_date === '' && a.end_date !== '') return 1
    return b.exp_id - a.exp_id
  })

  return sortedWork.map((exp, idx) => ({
    id: `work-${exp.exp_id}`,
    itemType: 'work' as const,
    title: exp.role,
    organization: exp.company,
    startDate: exp.start_date,
    endDate: exp.end_date,
    dateDisplay: `${formatDate(exp.start_date)} — ${formatDate(exp.end_date)}`,
    duration: diffDate(exp.start_date, exp.end_date ? exp.end_date : undefined),
    isCurrent: exp.end_date === '',
    isLatest: idx === 0,
    badgeLabel: exp.end_date === '' ? 'current' : idx === 0 ? 'most recent' : undefined,
    summary: exp.summary,
    tools: exp.tools_built,
    projects: projects.filter((p) => p.exp_id === exp.exp_id),
  }))
})

const studyTimelineItems = computed<TimelineItem[]>(() => {
  return education.map((edu) => ({
    id: `edu-${edu.edu_id}`,
    itemType: 'study' as const,
    title: edu.degree,
    organization: edu.school,
    startDate: edu.start_date,
    endDate: edu.end_date,
    dateDisplay: edu.period ? edu.period : `${formatDate(edu.start_date)} — ${formatDate(edu.end_date)}`,
    duration: diffDate(edu.start_date, edu.end_date),
    isCurrent: false,
    isLatest: false,
    badgeLabel: 'degree',
    details: edu.details,
    summary: edu.summary ?? [],
    projects: projects.filter(
      (p) => p.edu_id === edu.edu_id || p.org === 'University Project',
    ),
  }))
})

const filterOptions = computed(() => [
  {
    key: 'all' as FilterType,
    label: 'All',
    count: workTimelineItems.value.length + studyTimelineItems.value.length,
  },
  {
    key: 'work' as FilterType,
    label: 'Work',
    icon: '💼',
    count: workTimelineItems.value.length,
  },
  {
    key: 'study' as FilterType,
    label: 'Education',
    icon: '🎓',
    count: studyTimelineItems.value.length,
  },
])

const sortedTimelineItems = computed<TimelineItem[]>(() => {
  if (activeFilter.value === 'work') return workTimelineItems.value
  if (activeFilter.value === 'study') return studyTimelineItems.value

  // All: reverse-chronological by start date (with ongoing current on top)
  return [...workTimelineItems.value, ...studyTimelineItems.value].sort((a, b) => {
    if (a.isCurrent && !b.isCurrent) return -1
    if (b.isCurrent && !a.isCurrent) return 1
    const toTime = (d: string) => {
      const [day, m, y] = d.split('/').map(Number)
      return new Date(y, m - 1, day).getTime()
    }
    return toTime(b.startDate) - toTime(a.startDate)
  })
})
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
        <div>
          <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">Experience</h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A chronological timeline of professional roles and academic background.
          </p>
        </div>
        <span class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
          experience.ts
        </span>
      </div>

      <!-- Controls: Filter Pills & Grouping Toggle -->
      <div class="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-900/5 pb-4 dark:border-white/10">
        <!-- Filter Tabs -->
        <div class="inline-flex items-center rounded-xl bg-slate-900/5 p-1 dark:bg-white/5">
          <button
            v-for="opt in filterOptions"
            :key="opt.key"
            type="button"
            @click="activeFilter = opt.key"
            :class="[
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer',
              activeFilter === opt.key
                ? 'bg-white text-slate-900 shadow-sm dark:bg-white/15 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
            ]"
          >
            <span v-if="opt.icon" aria-hidden="true">{{ opt.icon }}</span>
            <span>{{ opt.label }}</span>
            <span
              class="rounded-full px-1.5 py-0.2 text-[10px] font-semibold"
              :class="
                activeFilter === opt.key
                  ? 'bg-slate-900/10 text-slate-900 dark:bg-white/20 dark:text-white'
                  : 'bg-slate-900/5 text-slate-500 dark:bg-white/10 dark:text-slate-400'
              "
            >
              {{ opt.count }}
            </span>
          </button>
        </div>

        <!-- Layout View Toggle (only relevant when All is selected) -->
        <div
          v-if="activeFilter === 'all'"
          class="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
        >
          <span class="text-[11px] uppercase tracking-wider font-mono">View:</span>
          <button
            type="button"
            @click="viewMode = 'timeline'"
            :class="[
              'rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer',
              viewMode === 'timeline'
                ? 'bg-slate-900/10 font-semibold text-slate-900 dark:bg-white/15 dark:text-white'
                : 'hover:text-slate-900 dark:hover:text-white',
            ]"
          >
            Timeline
          </button>
          <span>·</span>
          <button
            type="button"
            @click="viewMode = 'grouped'"
            :class="[
              'rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer',
              viewMode === 'grouped'
                ? 'bg-slate-900/10 font-semibold text-slate-900 dark:bg-white/15 dark:text-white'
                : 'hover:text-slate-900 dark:hover:text-white',
            ]"
          >
            Grouped
          </button>
        </div>
      </div>

      <!-- VIEW 1: UNIFIED TIMELINE (Timeline mode or filtered) -->
      <div v-if="viewMode === 'timeline' || activeFilter !== 'all'" class="mt-8">
        <ol class="relative space-y-10 border-l border-slate-900/10 pl-6 dark:border-white/10">
          <li v-for="item in sortedTimelineItems" :key="item.id" class="relative">
            <!-- Timeline Dot -->
            <span
              v-if="item.itemType === 'work' && item.isCurrent"
              class="pulse absolute -left-[34px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 dark:ring-emerald-400/10"
            ></span>
            <span
              v-else-if="item.itemType === 'work'"
              class="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-slate-400/60 ring-4 ring-slate-400/10"
            ></span>
            <span
              v-else
              class="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-sky-400 ring-4 ring-sky-400/20"
            ></span>

            <!-- Role/Degree Title & Date Range -->
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
                <!-- Category Tag in unified view -->
                <span
                  v-if="activeFilter === 'all'"
                  class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1"
                  :class="
                    item.itemType === 'work'
                      ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300'
                      : 'bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-300'
                  "
                >
                  <span aria-hidden="true">{{ item.itemType === 'work' ? '💼' : '🎓' }}</span>
                  <span>{{ item.itemType === 'work' ? 'Work' : 'Education' }}</span>
                </span>
              </div>

              <span class="font-mono text-xs text-slate-500 dark:text-slate-400">
                {{ item.dateDisplay }} · {{ item.duration }}
              </span>
            </div>

            <!-- Organization / School -->
            <div class="text-sm text-slate-600 dark:text-slate-300">
              {{ item.organization }}
            </div>

            <!-- Work Status Badge (current / most recent) -->
            <span
              v-if="item.badgeLabel && item.itemType === 'work'"
              class="mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ring-1"
              :class="
                item.isCurrent
                  ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300'
                  : 'bg-slate-500/10 text-slate-700 ring-slate-500/20 dark:text-slate-300'
              "
            >
              {{ item.badgeLabel }}
            </span>

            <!-- Study Details (Major & Concentration) -->
            <div v-if="item.details?.length" class="mt-3 flex flex-wrap gap-2 text-xs">
              <span
                v-for="d in item.details"
                :key="d.label"
                class="inline-flex items-center gap-1.5 rounded-lg border border-slate-900/5 bg-slate-900/5 px-2.5 py-1 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                <span class="text-slate-500 dark:text-slate-400">{{ d.label }}:</span>
                <span class="font-medium text-slate-800 dark:text-slate-100">{{ d.value }}</span>
              </span>
            </div>

            <!-- Bullet Summary -->
            <ul
              v-if="item.summary.length"
              class="mt-3 space-y-1.5 text-sm text-slate-600 md:text-base dark:text-slate-300"
            >
              <li v-for="(bullet, i) in item.summary" :key="i" class="flex gap-2">
                <span
                  class="font-bold"
                  :class="item.itemType === 'work' ? 'text-emerald-500' : 'text-sky-500'"
                >
                  ▸
                </span>
                <span>{{ bullet }}</span>
              </li>
            </ul>

            <!-- Tools built (Work only) -->
            <div v-if="item.tools?.length" class="mt-5">
              <div
                class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
              >
                Tools built
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tool in item.tools" :key="tool" class="tag-chip">
                  {{ tool }}
                </span>
              </div>
            </div>

            <!-- Related projects -->
            <div v-if="item.projects.length" class="mt-5">
              <div
                class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
              >
                Related projects
              </div>
              <div class="flex flex-wrap gap-1.5">
                <RouterLink
                  v-for="p in item.projects"
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
      </div>

      <!-- VIEW 2: GROUPED (Work Experience section + Education section) -->
      <div v-else class="mt-8 space-y-12">
        <!-- Work Section -->
        <section>
          <div class="mb-6 flex items-center gap-2">
            <span class="text-xl" aria-hidden="true">💼</span>
            <h2 class="text-xl font-semibold tracking-tight">Work Experience</h2>
            <span class="text-xs text-slate-500 dark:text-slate-400">
              ({{ workTimelineItems.length }})
            </span>
          </div>

          <ol class="relative space-y-10 border-l border-slate-900/10 pl-6 dark:border-white/10">
            <li v-for="item in workTimelineItems" :key="item.id" class="relative">
              <span
                v-if="item.isCurrent"
                class="pulse absolute -left-[34px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 dark:ring-emerald-400/10"
              ></span>
              <span
                v-else
                class="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-slate-400/60 ring-4 ring-slate-400/10"
              ></span>

              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h3 class="text-lg font-semibold">{{ item.title }}</h3>
                <span class="font-mono text-xs text-slate-500 dark:text-slate-400">
                  {{ item.dateDisplay }} · {{ item.duration }}
                </span>
              </div>

              <div class="text-sm text-slate-600 dark:text-slate-300">
                {{ item.organization }}
              </div>

              <span
                v-if="item.badgeLabel"
                class="mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ring-1"
                :class="
                  item.isCurrent
                    ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300'
                    : 'bg-slate-500/10 text-slate-700 ring-slate-500/20 dark:text-slate-300'
                "
              >
                {{ item.badgeLabel }}
              </span>

              <ul
                v-if="item.summary.length"
                class="mt-3 space-y-1.5 text-sm text-slate-600 md:text-base dark:text-slate-300"
              >
                <li v-for="(bullet, i) in item.summary" :key="i" class="flex gap-2">
                  <span class="text-emerald-500 font-bold">▸</span>
                  <span>{{ bullet }}</span>
                </li>
              </ul>

              <div v-if="item.tools?.length" class="mt-5">
                <div
                  class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
                >
                  Tools built
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="tool in item.tools" :key="tool" class="tag-chip">
                    {{ tool }}
                  </span>
                </div>
              </div>

              <div v-if="item.projects.length" class="mt-5">
                <div
                  class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
                >
                  Related projects
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <RouterLink
                    v-for="p in item.projects"
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
        </section>

        <!-- Education Section -->
        <section class="border-t border-slate-900/5 pt-10 dark:border-white/10">
          <div class="mb-6 flex items-center gap-2">
            <span class="text-xl" aria-hidden="true">🎓</span>
            <h2 class="text-xl font-semibold tracking-tight">Education</h2>
            <span class="text-xs text-slate-500 dark:text-slate-400">
              ({{ studyTimelineItems.length }})
            </span>
          </div>

          <ol class="relative space-y-10 border-l border-slate-900/10 pl-6 dark:border-white/10">
            <li v-for="item in studyTimelineItems" :key="item.id" class="relative">
              <span
                class="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-sky-400 ring-4 ring-sky-400/20"
              ></span>

              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h3 class="text-lg font-semibold">{{ item.title }}</h3>
                <span class="font-mono text-xs text-slate-500 dark:text-slate-400">
                  {{ item.dateDisplay }} · {{ item.duration }}
                </span>
              </div>

              <div class="text-sm text-slate-600 dark:text-slate-300">
                {{ item.organization }}
              </div>

              <div v-if="item.details?.length" class="mt-3 flex flex-wrap gap-2 text-xs">
                <span
                  v-for="d in item.details"
                  :key="d.label"
                  class="inline-flex items-center gap-1.5 rounded-lg border border-slate-900/5 bg-slate-900/5 px-2.5 py-1 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  <span class="text-slate-500 dark:text-slate-400">{{ d.label }}:</span>
                  <span class="font-medium text-slate-800 dark:text-slate-100">{{ d.value }}</span>
                </span>
              </div>

              <ul
                v-if="item.summary.length"
                class="mt-3 space-y-1.5 text-sm text-slate-600 md:text-base dark:text-slate-300"
              >
                <li v-for="(bullet, i) in item.summary" :key="i" class="flex gap-2">
                  <span class="text-sky-500 font-bold">▸</span>
                  <span>{{ bullet }}</span>
                </li>
              </ul>

              <div v-if="item.projects.length" class="mt-5">
                <div
                  class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
                >
                  Related projects
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <RouterLink
                    v-for="p in item.projects"
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
        </section>
      </div>

      <!-- Footer Navigation Links -->
      <div
        class="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-900/5 pt-6 dark:border-white/10"
      >
        <RouterLink
          to="/projects"
          class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          View projects →
        </RouterLink>
        <RouterLink
          to="/resume"
          class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          View full printable resume →
        </RouterLink>
      </div>
    </div>
  </section>
</template>
