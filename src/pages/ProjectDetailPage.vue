<!-- src/pages/ProjectDetailPage.vue -->
<script setup>
import { useRoute } from 'vue-router'
import { projects } from '../data/profile'
import { computed } from 'vue'

import ProjectDetailEtl from '../components/project/detail/ProjectDetailEtl.vue'
import ProjectDetailDefault from '../components/project/detail/ProjectDetailDefault.vue'

const route = useRoute()
const slug = route.params.slug

const project = computed(() =>
  projects.items.find(p => p.slug === slug)
)

// map template key → component
const templateComponent = computed(() => {
  if (!project.value) return null

  switch (project.value.template) {
    case 'etl':
      return ProjectDetailEtl
    // add more templates as needed:
    // case 'dashboard':
    //   return ProjectDetailDashboard
    default:
      return ProjectDetailDefault
  }
})
</script>

<template>
  <section v-if="project && templateComponent">
    <component :is="templateComponent" :project="project" />
  </section>

  <p v-else class="text-red-400">Project not found.</p>
</template>
