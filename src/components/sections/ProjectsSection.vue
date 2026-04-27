<script setup lang="ts">
import { projects } from '@/data/index'
import ProjectList from '../project/ProjectList.vue'
import { computed } from 'vue'

const highlightedProjects = computed(() =>
  projects.filter(p => p.highlight)
)
</script>

<template>
  <section id="projects" class="space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold tracking-tight">Projects Highlight</h2>

    <!-- Pass only highlighted projects -->
    <ProjectList :projects="highlightedProjects" />
  </section>
</template>
