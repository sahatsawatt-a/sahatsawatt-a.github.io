<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { type Project } from '@/data/index'
import { categoryBadge, companyFor } from '@/utils/projectMeta'

const props = defineProps<{
  projects?: Project[]
  limit?: number
}>()

const items = computed(() => {
  const list = props.projects ?? []
  return props.limit && props.limit > 0 ? list.slice(0, props.limit) : list
})
</script>

<template>
  <section class="reveal">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      <RouterLink
        v-for="p in items"
        :key="p.slug"
        :to="`/projects/${p.slug}`"
        class="glass gradient-border lift relative overflow-hidden rounded-3xl p-6 block"
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
      </RouterLink>
    </div>
  </section>
</template>
