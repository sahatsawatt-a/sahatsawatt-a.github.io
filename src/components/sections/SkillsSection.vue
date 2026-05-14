<script setup lang="ts">
import { skills, type SkillItem } from '@/data/index'

const groups: { title: string; items: SkillItem[] }[] = [
  { title: 'Core', items: skills.core },
  { title: 'Technical', items: skills.technical },
  { title: 'Interests', items: skills.interests },
]
</script>

<template>
  <section id="skills" class="reveal">
    <div class="glass gradient-border lift relative overflow-hidden rounded-3xl p-6 md:p-8">
      <div class="mb-5 flex items-center justify-between">
        <h2 class="text-lg font-semibold tracking-tight">Skills</h2>
        <span class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">skills.ts</span>
      </div>

      <div class="space-y-5">
        <div v-for="group in groups" :key="group.title">
          <div class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {{ group.title }}
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="item in group.items" :key="item.label" class="skill-chip">
              {{ item.icon }} {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
