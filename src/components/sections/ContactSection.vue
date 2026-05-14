<script setup lang="ts">
import { contact, type ContactLink } from '@/data/index'

const primaryClass =
  'inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:translate-y-[-1px] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'

const secondaryClass =
  'inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white/40 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10'

function isEmail(link: ContactLink): boolean {
  return link.label.toLowerCase() === 'email' || !!link.url?.startsWith('mailto:')
}

function isGithub(link: ContactLink): boolean {
  return link.label.toLowerCase() === 'github' || !!link.url?.includes('github.com')
}

function buttonClass(link: ContactLink): string {
  return isEmail(link) ? primaryClass : secondaryClass
}
</script>

<template>
  <section id="contact" class="reveal">
    <div class="glass gradient-border lift relative overflow-hidden rounded-3xl p-8">
      <div class="grid items-center gap-6 md:grid-cols-2">
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">
            Let's <span class="hl">build</span> something.
          </h2>
          <p class="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">
            {{ contact.intro }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2 md:justify-end">
          <template v-for="link in contact.links" :key="link.label">
            <a
              v-if="link.url"
              :href="link.url"
              :class="buttonClass(link)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                v-if="isEmail(link)"
                class="h-4 w-4"
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
                v-else-if="isGithub(link)"
                class="h-4 w-4"
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
                class="h-4 w-4"
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
              {{ link.value }}
            </a>

            <span v-else :class="buttonClass(link)">
              <svg
                v-if="isEmail(link)"
                class="h-4 w-4"
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
                v-else-if="isGithub(link)"
                class="h-4 w-4"
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
                class="h-4 w-4"
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
              {{ link.value }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
