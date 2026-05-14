<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { about, hero, info } from '@/data/index'
</script>

<template>
  <section class="reveal">
    <div class="glass gradient-border relative overflow-hidden rounded-3xl p-6 md:p-10">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        ← Back to home
      </RouterLink>

      <div class="mt-6 flex flex-wrap items-end justify-between gap-4">
        <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
          {{ about.title }}
        </h1>
        <span
          class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
        >
          about.md
        </span>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        <div class="space-y-5 md:col-span-7">
          <p
            v-for="(paragraph, idx) in about.body"
            :key="idx"
            class="text-base leading-relaxed text-slate-700 md:text-lg dark:text-slate-200"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="md:col-span-5">
          <div
            class="group relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl ring-1 ring-slate-900/10 dark:ring-white/10"
          >
            <img
              :src="info.profileImage"
              :alt="info.full_name"
              loading="lazy"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent dark:from-black/50"
            ></div>
            <div
              class="pointer-events-none absolute bottom-3 left-3 right-3 flex items-end justify-between text-xs text-white/90"
            >
              <span class="rounded-full bg-black/30 px-2 py-0.5 backdrop-blur-sm">
                {{ info.nickname }}
              </span>
              <span
                class="font-mono text-[10px] uppercase tracking-widest text-white/70"
              >
                {{ info.initials }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t border-slate-900/5 pt-8 dark:border-white/10">
        <h2
          class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
        >
          Identity
        </h2>
        <div class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div
            v-for="card in hero.quickCards"
            :key="card.label"
            class="rounded-2xl bg-white/40 p-4 ring-1 ring-slate-900/5 dark:bg-white/5 dark:ring-white/10"
          >
            <span
              :class="[
                'inline-grid h-8 w-8 place-items-center rounded-xl text-base bg-gradient-to-br ring-1 ring-inset ring-white/20',
                card.accent,
              ]"
              aria-hidden="true"
            >
              {{ card.icon }}
            </span>
            <div
              class="mt-3 text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >
              {{ card.label }}
            </div>
            <div class="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-100">
              {{ card.value }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-900/5 pt-6 dark:border-white/10"
      >
        <RouterLink
          to="/skills"
          class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          Skills →
        </RouterLink>
        <RouterLink
          to="/contact"
          class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          Get in touch →
        </RouterLink>
      </div>
    </div>
  </section>
</template>
