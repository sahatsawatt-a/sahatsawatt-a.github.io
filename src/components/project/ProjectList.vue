<script setup lang="ts">
import { computed } from 'vue'
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

interface Project {
  slug: string
  template: string
  highlight: boolean
  title: string
  description: string
  tags: string[]
}

const props = defineProps<{
  projects?: Project[] // optional, default to empty array
  limit?: number
}>()

// Ensure we always have an array to prevent missing prop warning
const items = computed(() => {
  const list = props.projects ?? []
  return props.limit && props.limit > 0 ? list.slice(0, props.limit) : list
})
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2">
    <RouterLink
      v-for="project in items"
      :key="project.slug"
      :to="`/projects/${project.slug}`"
      class="group block rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 space-y-3 hover:border-[#FF2D20]/60 transition"
    >
      <!-- Project title -->
      <h3
        class="inline-flex items-center gap-1 text-base md:text-lg font-medium text-slate-50 group-hover:text-[#FF2D20] transition"
      >
        {{ project.title }}
      </h3>

      <!-- Tags above description -->
      <div class="flex flex-wrap gap-2 text-[11px] text-slate-300">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-2.5 py-1 rounded-full border border-slate-700"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Project description -->
      <p class="text-xs md:text-sm text-slate-300">
        {{ project.description }}
      </p>
    </RouterLink>
  </div>
</template>
