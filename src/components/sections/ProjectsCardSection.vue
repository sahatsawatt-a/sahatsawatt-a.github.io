<script setup lang="ts">
import { projects } from "@/data/index";
import { RouterLink } from "vue-router";
const highlighted = projects.filter(p => p.highlight);
</script>

<template>
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold text-heading">Projects</h2>

    <div class="grid gap-6 sm:grid-cols-2">
      <RouterLink
        v-for="proj in highlighted"
        :key="proj.proj_id"
        :to="`/projects/${proj.slug}`"
        class="group block rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 space-y-3 hover:border-[#FF2D20]/60 transition"
      >
        <h5
          class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8 group-hover:text-[#FF2D20] transition"
        >
          {{ proj.title }}
        </h5>
        <div class="flex flex-wrap gap-2 text-[11px] text-slate-300">
          <span
            v-for="tool in proj.tools"
            :key="tool"
            class="px-2.5 py-1 rounded-full border border-slate-700"
          >
            {{ tool }}
          </span>
          <span
            v-for="prog_lang in proj.prog_langs"
            :key="prog_lang"
            class="px-2.5 py-1 rounded-full border border-slate-700"
          >
            {{ prog_lang }}
          </span>
        </div>
        <p class="text-body mb-4">
          {{ proj.description }}
        </p>
      </RouterLink>
    </div>
  </section>
</template>
