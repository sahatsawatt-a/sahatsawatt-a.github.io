<!-- src/components/sections/SkillsSection.vue -->
<script setup>
import { skills } from '../../data/profile'
</script>

<template>
  <section id="skills" class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
      Skills
    </h2>

    <div class="grid md:grid-cols-3 gap-8 text-slate-300 text-sm">
      <div class="space-y-3">
        <p class="text-slate-500 font-medium text-xs uppercase tracking-[0.2em]">
          {{ skills.coreTitle }}
        </p>
        <ul class="space-y-1.5 text-slate-700 dark:text-slate-200">
          <li
            v-for="item in skills.core"
            :key="item.label"
            class="flex items-center gap-2"
          >
            <span aria-hidden="true">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>

      <div class="space-y-3">
        <p class="text-slate-500 font-medium text-xs uppercase tracking-[0.2em]">
          {{ skills.technicalTitle }}
        </p>
        <ul class="space-y-1.5 text-slate-700 dark:text-slate-200">
          <li
            v-for="item in skills.technical"
            :key="item.label"
            class="flex items-center gap-2"
          >
            <span aria-hidden="true">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>

      <div class="space-y-3">
        <p class="text-slate-500 font-medium text-xs uppercase tracking-[0.2em]">
          {{ skills.interestsTitle }}
        </p>
        <ul class="space-y-1.5 text-slate-700 dark:text-slate-200">
          <li
            v-for="item in skills.interests"
            :key="item.label"
            class="flex items-center gap-2"
          >
            <span aria-hidden="true">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
