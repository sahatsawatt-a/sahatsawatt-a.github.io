<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProject } from '@/composables/useProject'
import { categoryBadge, companyFor } from '@/utils/projectMeta'

const { project } = useProject()

const badge = computed(() => (project.value ? categoryBadge(project.value) : null))
const company = computed(() => (project.value ? companyFor(project.value) : ''))
const hasMeta = computed(
  () =>
    !!project.value &&
    ((project.value.prog_langs?.length ?? 0) > 0 ||
      (project.value.tools?.length ?? 0) > 0 ||
      (project.value.packages?.length ?? 0) > 0),
)
</script>

<template>
  <section v-if="project" class="reveal">
    <article
      class="glass gradient-border relative overflow-hidden rounded-3xl p-6 md:p-10"
    >
      <RouterLink
        to="/projects"
        class="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        ← Back to projects
      </RouterLink>

      <div class="mt-6 flex flex-wrap items-center gap-2 text-xs">
        <span
          v-if="badge"
          :class="[
            'rounded-md px-2 py-0.5 ring-1 text-xs font-medium',
            badge.classes,
          ]"
        >
          {{ badge.label }}
        </span>
        <span class="text-slate-500 dark:text-slate-400">{{ company }}</span>
      </div>

      <h1 class="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        {{ project.title }}
      </h1>

      <p
        class="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg dark:text-slate-200"
      >
        {{ project.description }}
      </p>

      <div v-if="project.tags?.length" class="mt-5 flex flex-wrap gap-1.5">
        <span v-for="tag in project.tags" :key="tag" class="tag-chip">
          {{ tag }}
        </span>
      </div>

      <img
        v-if="project.img"
        :src="project.img"
        :alt="`${project.title} diagram`"
        loading="lazy"
        class="mt-8 w-full rounded-2xl object-cover ring-1 ring-slate-900/5 dark:ring-white/10"
      />

      <section v-if="project.impact?.length" class="mt-10">
        <h2 class="text-lg font-semibold tracking-tight">Impact</h2>
        <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div
            v-for="(item, i) in project.impact"
            :key="i"
            class="rounded-2xl bg-white/40 p-4 ring-1 ring-slate-900/5 dark:bg-white/5 dark:ring-white/10"
          >
            <p class="text-sm text-slate-700 dark:text-slate-200">{{ item }}</p>
          </div>
        </div>
      </section>

      <section v-if="project.purpose?.length" class="mt-10">
        <h2 class="text-lg font-semibold tracking-tight">Purpose</h2>
        <ul
          class="mt-3 space-y-1.5 text-sm text-slate-600 md:text-base dark:text-slate-300"
        >
          <li
            v-for="(item, i) in project.purpose"
            :key="i"
            class="flex gap-2"
          >
            <span class="text-emerald-500">▸</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <section v-if="project.features?.length" class="mt-10">
        <h2 class="text-lg font-semibold tracking-tight">Features</h2>
        <ul
          class="mt-3 space-y-1.5 text-sm text-slate-600 md:text-base dark:text-slate-300"
        >
          <li
            v-for="(item, i) in project.features"
            :key="i"
            class="flex gap-2"
          >
            <span class="text-sky-500">▸</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <section
        v-if="hasMeta"
        class="mt-10 grid grid-cols-1 gap-6 border-t border-slate-900/5 pt-8 md:grid-cols-3 dark:border-white/10"
      >
        <div v-if="project.prog_langs?.length">
          <div
            class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            Languages
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="lang in project.prog_langs"
              :key="lang"
              class="tag-chip"
            >
              {{ lang }}
            </span>
          </div>
        </div>

        <div v-if="project.tools?.length">
          <div
            class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            Tools
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tool in project.tools"
              :key="tool"
              class="tag-chip"
            >
              {{ tool }}
            </span>
          </div>
        </div>

        <div v-if="project.packages?.length">
          <div
            class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            Packages
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="pkg in project.packages"
              :key="pkg"
              class="tag-chip"
            >
              {{ pkg }}
            </span>
          </div>
        </div>
      </section>

      <blockquote
        v-if="project.feedback"
        class="mt-10 border-l-2 border-emerald-400 pl-4 italic text-slate-700 dark:text-slate-200"
      >
        "{{ project.feedback }}"
      </blockquote>
    </article>
  </section>

  <section
    v-else
    class="glass reveal relative overflow-hidden rounded-3xl p-6 md:p-8"
  >
    <RouterLink
      to="/projects"
      class="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    >
      ← Back to projects
    </RouterLink>
    <p class="text-rose-400">Project not found.</p>
  </section>
</template>
