<script setup lang="ts">
import { hero } from "@/data/index";

const splitTitle = (text: string, highlights: string[]) => {
  const escaped = highlights.map((h) =>
    h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");

  return text.split(pattern).map((part) => ({
    text: part,
    highlight: highlights.some((h) => h.toLowerCase() === part.toLowerCase()),
  }));
};

const heroTitleParts = splitTitle(
  hero.heroTitle.full,
  hero.heroTitle.highlight,
);
</script>

<template>
  <section>
    <div class="py-8 px-4 mx-auto max-w-5xl text-center lg:py-16 z-10 relative">
      <div
        class="w-auto inline-flex items-center p-1 px-4 mb-8 text-xs rounded-full font-medium bg-slate-800/10 text-slate-700 dark:bg-slate-700/20 dark:text-slate-200"
        role="alert"
      >
        <span
          class="w-3 h-3 rounded-full"
          :class="{
            'bg-success': hero.status.state === 'open',
            'bg-danger': hero.status.state === 'closed',
          }"
        ></span>

        <div class="ms-2 text-sm">
          {{ hero.status.message }}
        </div>
      </div>
      <h1
        class="mb-12 text-3xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl text-slate-900 dark:text-slate-50"
      >
        <template v-for="(part, i) in heroTitleParts" :key="i">
          <span
            v-if="part.highlight"
            class="text-transparent bg-clip-text bg-linear-to-r from-[#6fffc2] to-[#3ee0a8]"
            >{{ part.text }}</span
          >
          <span v-else>{{ part.text }}</span>
        </template>
      </h1>
      <p
        class="mb-8 max-w-2xl mx-auto px-4 text-base md:text-lg text-slate-600 dark:text-slate-300"
      >
        {{ hero.description }}
      </p>
    </div>
    
  </section>
</template>

<style></style>
