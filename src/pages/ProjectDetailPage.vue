<!-- src/pages/ProjectDetailPage.vue -->
<script setup lang="ts">
import { useProject } from '@/composables/useProject'

const { project, templateComponent } = useProject()
</script>

<template>
  <section v-if="project && templateComponent">
    <component :is="templateComponent" :project="project" />
  </section>

  <p v-else class="text-red-400">Project not found.</p>
</template>
