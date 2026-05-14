<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HeroSection from '@/components/sections/HeroSection.vue'
import TopicGridSection from '@/components/sections/TopicGridSection.vue'
import ProjectsCardSection from '@/components/sections/ProjectsCardSection.vue'
import { contact } from '@/data/index'
</script>

<template>
  <HeroSection />
  <TopicGridSection />
  <ProjectsCardSection />

  <section class="reveal">
    <div
      class="glass gradient-border lift relative overflow-hidden rounded-3xl p-8 md:p-10"
    >
      <div class="grid items-center gap-6 md:grid-cols-2">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
            Let's <span class="hl">work</span> together.
          </h2>
          <p class="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">
            {{ contact.intro }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2 md:justify-end">
          <RouterLink
            to="/contact"
            class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:translate-y-[-1px] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Get in touch
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </RouterLink>
          <RouterLink
            to="/projects"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white/40 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            See projects
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
