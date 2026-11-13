<script setup lang="ts">
import { computed, ref } from 'vue'
import { skills, type SkillItem } from '@/data/index'

interface SkillGroup {
  key: 'core' | 'technical' | 'interests'
  title: string
  subtitle: string
  accentDot: string
  spanClass: string
  items: SkillItem[]
}

const groups: SkillGroup[] = [
  {
    key: 'core',
    title: 'Core',
    subtitle: 'Architecture & Delivery',
    accentDot: 'bg-orange-400',
    spanClass: 'lg:col-span-5',
    items: skills.core,
  },
  {
    key: 'technical',
    title: 'Technical',
    subtitle: 'Frameworks, AI & Infra',
    accentDot: 'bg-sky-400',
    spanClass: 'lg:col-span-7',
    items: skills.technical,
  },
  {
    key: 'interests',
    title: 'Interests',
    subtitle: 'Hardware & Autonomous Systems',
    accentDot: 'bg-emerald-400',
    spanClass: 'lg:col-span-12',
    items: skills.interests,
  },
]

const activeFilter = ref<'all' | 'core' | 'technical' | 'interests'>('all')

const visibleGroups = computed(() =>
  activeFilter.value === 'all'
    ? groups
    : groups.filter((g) => g.key === activeFilter.value)
)

const totalCount = computed(
  () => skills.core.length + skills.technical.length + skills.interests.length
)
</script>

<template>
  <section id="skills" class="reveal">
    <div class="glass gradient-border lift relative overflow-hidden rounded-3xl p-6 md:p-8">
      <!-- Header & Filter Controls -->
      <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2.5">
          <h2 class="text-lg font-semibold tracking-tight">Skills</h2>
          <span class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            · {{ totalCount }} total
          </span>
        </div>

        <!-- Category Filter Tabs -->
        <div class="inline-flex w-fit flex-wrap items-center gap-1 rounded-xl border border-slate-900/10 bg-white/40 p-1 dark:border-white/10 dark:bg-white/[0.03]">
          <button
            v-for="tab in [
              { id: 'all', label: 'All' },
              { id: 'core', label: 'Core' },
              { id: 'technical', label: 'Technical' },
              { id: 'interests', label: 'Interests' },
            ]"
            :key="tab.id"
            @click="activeFilter = tab.id as typeof activeFilter"
            class="rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all"
            :class="
              activeFilter === tab.id
                ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900 font-medium'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            "
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Bento Group Panels -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div
          v-for="group in visibleGroups"
          :key="group.key"
          :class="activeFilter === 'all' ? group.spanClass : 'lg:col-span-12'"
          class="rounded-2xl border border-slate-900/5 bg-white/40 p-4 dark:border-white/[0.07] dark:bg-white/[0.02] md:p-5"
        >
          <div class="mb-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full" :class="group.accentDot"></span>
              <span class="text-[10px] font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                {{ group.title }}
              </span>
            </div>
            <span class="font-mono text-[10px] text-slate-400 dark:text-slate-500">
              {{ group.subtitle }}
            </span>
          </div>

          <div class="flex flex-wrap gap-2">
            <span v-for="item in group.items" :key="item.label" class="skill-chip">
              <span>{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
