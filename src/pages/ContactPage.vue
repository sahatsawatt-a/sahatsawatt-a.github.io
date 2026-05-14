<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { contact, hero, info, type ContactLink } from '@/data/index'

type Channel = 'email' | 'github' | 'other'

function channelOf(link: ContactLink): Channel {
  const label = link.label.toLowerCase()
  if (label === 'email' || link.url?.startsWith('mailto:')) return 'email'
  if (label === 'github' || link.url?.includes('github.com')) return 'github'
  return 'other'
}

const accent: Record<Channel, string> = {
  email: 'from-rose-400/40 to-pink-400/40',
  github: 'from-slate-400/40 to-zinc-500/40',
  other: 'from-violet-400/40 to-sky-400/40',
}

const bestFor: Record<Channel, string> = {
  email: 'long-form questions, project briefs, anything async',
  github: 'code, prior work, side projects',
  other: 'quick pings and casual hellos',
}
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
          Let's <span class="hl">build</span> something together.
        </h1>
        <span
          class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
        >
          contact.md
        </span>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        <div class="space-y-5 md:col-span-7">
          <p
            class="text-base leading-relaxed text-slate-700 md:text-lg dark:text-slate-200"
          >
            {{ contact.intro }}
          </p>
          <p class="text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300">
            I usually reply within a day. The more context you can share — system,
            constraints, what success looks like — the sharper the answer.
          </p>

          <div
            class="mt-2 inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1.5 ring-1 ring-slate-900/5 dark:bg-white/5 dark:ring-white/10"
          >
            <span
              :class="['live-dot', { 'is-open': hero.status.state === 'open' }]"
              aria-hidden="true"
            ></span>
            <span class="text-xs font-medium text-slate-700 dark:text-slate-200">
              Open to new work
            </span>
            <span class="text-slate-300 dark:text-slate-600">·</span>
            <span class="text-xs text-slate-500 dark:text-slate-400">Bangkok</span>
            <span class="text-slate-300 dark:text-slate-600">·</span>
            <span class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              GMT+7
            </span>
          </div>

          <div class="pt-2">
            <div
              class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >
              Good fits
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="tag-chip">ML/CV pipelines</span>
              <span class="tag-chip">Agentic AI workflows</span>
              <span class="tag-chip">FastAPI services</span>
              <span class="tag-chip">System integration</span>
              <span class="tag-chip">Automation</span>
            </div>
          </div>
        </div>

        <div class="md:col-span-5">
          <div class="flex flex-col gap-4">
            <component
              :is="link.url ? 'a' : 'div'"
              v-for="link in contact.links"
              :key="link.label"
              :href="link.url || undefined"
              :target="link.url ? '_blank' : undefined"
              :rel="link.url ? 'noopener noreferrer' : undefined"
              class="glass lift group relative flex items-start gap-4 rounded-2xl p-5 ring-1 ring-slate-900/5 dark:ring-white/10"
            >
              <div
                :class="[
                  'grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-inset ring-white/20',
                  accent[channelOf(link)],
                ]"
              >
                <svg
                  v-if="channelOf(link) === 'email'"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <svg
                  v-else-if="channelOf(link) === 'github'"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 .5C5.7.5.7 5.5.7 11.8c0 5 3.3 9.2 7.8 10.7.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.7C23.3 5.5 18.3.5 12 .5z"
                  />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 14a5 5 0 007.07 0l3-3a5 5 0 10-7.07-7.07l-1 1M14 10a5 5 0 00-7.07 0l-3 3a5 5 0 107.07 7.07l1-1"
                  />
                </svg>
              </div>

              <div class="min-w-0 flex-1">
                <div
                  class="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
                >
                  {{ link.label }}
                </div>
                <div class="mt-0.5 break-all text-sm font-medium">{{ link.value }}</div>
                <div
                  class="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
                >
                  <span class="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">Best for</span>
                  · {{ bestFor[channelOf(link)] }}
                </div>
              </div>

              <span
                v-if="link.url"
                aria-hidden="true"
                class="self-center text-slate-400 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 dark:text-slate-500"
              >
                →
              </span>
            </component>
          </div>
        </div>
      </div>

      <div
        class="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-slate-900/5 pt-6 dark:border-white/10"
      >
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Built and maintained in Bangkok.
          </p>
          <span class="font-mono text-[10px] text-slate-400 dark:text-slate-500">
            // signed, {{ info.nickname }}
          </span>
        </div>
        <RouterLink
          to="/"
          class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          ← Back to home
        </RouterLink>
      </div>
    </div>
  </section>
</template>
