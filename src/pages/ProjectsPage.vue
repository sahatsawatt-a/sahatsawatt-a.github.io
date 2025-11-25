<script setup lang="ts">
import ProjectList from '../components/project/ProjectList.vue'
import { projects } from '../data/profile' // import the full projects list
</script>

<template>

<RouterLink to="/"
  class="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-slate-900/80 text-sm text-[#FF2D20] font-medium shadow-sm transition hover:bg-[#FF2D20]/10 hover:text-[#FF543E] mb-5">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  Back to Profile
</RouterLink>


  <section class="space-y-6">
    <h1 class="text-2xl md:text-3xl font-semibold text-slate-50">
      All Projects
    </h1>

    <!-- Pass the full list of projects -->
    <ProjectList :projects="projects.items" />
  </section>
</template>
