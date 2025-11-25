<script setup lang="ts">
import { projects } from '../../data/profile'
import ProjectList from '../project/ProjectList.vue'
import { computed } from 'vue'

// Only filter highlighted projects for this section
const highlightedProjects = computed(() =>
  projects.items.filter(project => project.highlight)
)
</script>

<template>
  <section id="projects" class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
      {{ projects.title }}
    </h2>

    <!-- Pass only highlighted projects -->
    <ProjectList :projects="highlightedProjects" />
  </section>
</template>
