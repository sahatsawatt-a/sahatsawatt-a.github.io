<!-- src/components/project/detail/ProjectDetailDefault.vue -->
<script setup lang="ts">
import type { Project } from '@/data/index'

const props = defineProps<{ project: Project }>()
</script>

<template>
  <div class="space-y-12">

    <!-- BACK -->
    <RouterLink
      to="/projects"
      class="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-100 transition"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Projects
    </RouterLink>

    <!-- HEADER -->
    <header class="space-y-5 pb-8 border-b border-slate-800">
      <h1 class="text-3xl md:text-4xl font-semibold text-slate-50 tracking-tight">
        {{ props.project.title }}
      </h1>

      <p class="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
        {{ props.project.description }}
      </p>

      <div class="flex flex-wrap gap-6 pt-1">
        <div v-if="props.project.tags.length" class="space-y-1.5">
          <p class="text-2xs font-medium uppercase tracking-widest text-slate-500">Stack</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in props.project.tags" :key="tag"
              class="text-xs px-2.5 py-1 rounded-full border border-slate-700 text-slate-300"
            >{{ tag }}</span>
          </div>
        </div>
        <div v-if="props.project.tools.length" class="space-y-1.5">
          <p class="text-2xs font-medium uppercase tracking-widest text-slate-500">Tools</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tool in props.project.tools" :key="tool"
              class="text-xs px-2.5 py-1 rounded-full border border-slate-700 text-slate-300"
            >{{ tool }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- IMPACT -->
    <section v-if="props.project.impact?.length" class="space-y-4">
      <p class="text-2xs font-medium uppercase tracking-widest text-slate-500">Impact</p>
      <div class="grid gap-3 sm:grid-cols-3">
        <div
          v-for="item in props.project.impact" :key="item"
          class="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300 leading-snug"
        >
          <span class="text-[#FF2D20] font-bold mr-2">—</span>{{ item }}
        </div>
      </div>
    </section>

    <!-- PURPOSE + FEATURES -->
    <div
      v-if="props.project.purpose?.length || props.project.features?.length"
      class="grid gap-8 md:grid-cols-2"
    >
      <section v-if="props.project.purpose?.length" class="space-y-4">
        <p class="text-2xs font-medium uppercase tracking-widest text-slate-500">Purpose</p>
        <ul class="space-y-2.5">
          <li
            v-for="item in props.project.purpose" :key="item"
            class="flex gap-2.5 text-sm text-slate-300"
          >
            <svg class="w-4 h-4 mt-0.5 shrink-0 text-[#FF2D20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ item }}
          </li>
        </ul>
      </section>

      <section v-if="props.project.features?.length" class="space-y-4">
        <p class="text-2xs font-medium uppercase tracking-widest text-slate-500">Features</p>
        <ul class="space-y-2.5">
          <li
            v-for="item in props.project.features" :key="item"
            class="flex gap-2.5 text-sm text-slate-300"
          >
            <svg class="w-4 h-4 mt-0.5 shrink-0 text-[#FF2D20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ item }}
          </li>
        </ul>
      </section>
    </div>

  </div>
</template>
