<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { hero, experiences, skills } from '@/data/index'
import { diffDate } from '@/utils/date'

const splitTitle = (text: string, highlights: string[]) => {
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
  return text.split(pattern).map((part) => ({
    text: part,
    highlight: highlights.some((h) => h.toLowerCase() === part.toLowerCase()),
  }))
}

const heroTitleParts = splitTitle(hero.heroTitle.full, hero.heroTitle.highlight)
const techRibbon = computed(() => skills.technical.slice(0, 8).map((s) => s.label))

const totalExperience = computed(() => {
  if (!experiences.length) return ''

  const toTime = (s: string) => {
    const [d, m, y] = s.split('/').map(Number)
    return new Date(y, m - 1, d).getTime()
  }

  const earliest = experiences.reduce((min, curr) =>
    toTime(curr.start_date) < toTime(min.start_date) ? curr : min
  )

  const years = Math.floor((Date.now() - toTime(earliest.start_date)) / (1000 * 60 * 60 * 24 * 365.25))
  return years > 0 ? `${years}+ years` : diffDate(earliest.start_date)
})

// Cycles through what you're currently exploring from hero.exploring
const exploringTopics = computed(() => hero.exploring?.topics ?? [])
const activeIndex = ref(0)
const currentTopic = computed(() => exploringTopics.value[activeIndex.value] ?? null)

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (exploringTopics.value.length > 1) {
    timer = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % exploringTopics.value.length
    }, 3200)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section class="reveal">
    <div class="glass gradient-border lift relative overflow-hidden rounded-3xl p-8 md:p-12">
      <!-- Top Status Badge -->
      <div
        class="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/40 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
        <span class="live-dot" :class="{ 'is-open': hero.status.state === 'open' }"></span>
        {{ hero.status.message }}
      </div>

      <!-- Two-Column Main Grid (Centered on Mobile/Tablet, Split on Desktop) -->
      <div class="mt-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">

        <!-- Zone 1: Left Copy & CTA (Centered below lg, Left-aligned on lg+) -->
        <div class="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
          <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-balance leading-[1.05]">
            {{ hero.heroTitle.pre }}
          </h3>
          <h1 class="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance leading-[1.05]">
            <template v-for="(part, i) in heroTitleParts" :key="i">
              <span v-if="part.highlight" class="hl">{{ part.text }}</span>
              <span v-else>{{ part.text }}</span>
            </template>
          </h1>

          <p class="mt-6 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300">
            {{ hero.description }}
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#work"
              class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:translate-y-[-1px] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
              View work
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <RouterLink to="/contact"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-900/10 bg-white/40 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:translate-y-[-1px] hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10">
              Get in touch
            </RouterLink>
          </div>
        </div>

        <!-- Zone 2: Integrated Avatar & Exploring Stage -->
        <div class="relative flex flex-col items-center justify-center lg:col-span-5">
          <!-- Studio Radial Spotlight -->
          <div
            class="pointer-events-none absolute inset-0 -m-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(254,215,170,0.35)_45%,transparent_72%)] dark:bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.22)_0%,rgba(244,63,94,0.08)_48%,transparent_72%)]">
          </div>

          <!-- Frameless Illustration -->
          <div v-if="hero.exploring?.avatarUrl" class="avatar-float relative z-10 w-56 sm:w-64 md:w-72 lg:w-80">
            <img :src="hero.exploring.avatarUrl"
              :alt="currentTopic ? `Skye exploring ${currentTopic.title}` : 'Skye exploring new tech'"
              class="h-auto w-full object-contain drop-shadow-[0_10px_20px_rgba(15,23,42,0.08)] dark:drop-shadow-[0_0_28px_rgba(251,146,60,0.18)]" />
          </div>

          <!-- Compact Docked Exploring Pill -->
          <div v-if="currentTopic"
            class="relative z-10 mt-2 flex w-fit min-w-[220px] max-w-[280px] items-center justify-between gap-4 rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-2.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/[0.05]">
            <div class="min-w-0 flex-1">
              <div
                class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-orange-500 dark:text-orange-400">
                <span class="h-1.5 w-1.5 animate-ping rounded-full bg-orange-500 dark:bg-orange-400"></span>
                {{ hero.exploring?.label || 'Currently Exploring' }}
              </div>
              <Transition name="fade-slide" mode="out-in">
                <div :key="activeIndex" class="mt-0.5">
                  <p class="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                    {{ currentTopic.title }}
                  </p>
                  <p class="truncate font-mono text-[10px] text-slate-500 dark:text-slate-400">
                    {{ currentTopic.tag }}
                  </p>
                </div>
              </Transition>
            </div>

            <!-- Subtle Progress Dots -->
            <div v-if="exploringTopics.length > 1" class="flex flex-col gap-1">
              <button v-for="(_, idx) in exploringTopics" :key="idx" @click="activeIndex = idx"
                :aria-label="`Topic ${idx + 1}`" class="h-1.5 w-1.5 rounded-full transition-all"
                :class="idx === activeIndex ? 'bg-orange-500 dark:bg-orange-400 scale-125' : 'bg-slate-900/20 hover:bg-slate-900/40 dark:bg-white/20 dark:hover:bg-white/40'" />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Tech Ribbon & Metadata -->
      <div class="mt-12 border-t border-slate-900/5 pt-5 dark:border-white/10">
        <div class="flex flex-wrap gap-1.5">
          <span v-for="t in techRibbon" :key="t" class="tag-chip text-[11px]">{{ t }}</span>
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span class="font-mono uppercase tracking-widest text-[10px]">Bangkok</span>
          <span class="text-slate-300 dark:text-slate-600">·</span>
          <span class="font-mono uppercase tracking-widest text-[10px]">GMT+7</span>
          <span v-if="totalExperience" class="text-slate-300 dark:text-slate-600">·</span>
          <span v-if="totalExperience" class="font-mono uppercase tracking-widest text-[10px]">{{ totalExperience }}
            exp</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-8px);
  }
}

.avatar-float {
  animation: float 4.5s ease-in-out infinite;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes blink {

  0%,
  92%,
  100% {
    transform: scaleY(1);
  }

  95% {
    transform: scaleY(0.1);
  }
}

@keyframes pulseNodes {

  0%,
  100% {
    transform: translateY(0px);
    opacity: 0.95;
  }

  50% {
    transform: translateY(-4px);
    opacity: 0.55;
  }
}

.avatar-float {
  animation: float 4.5s ease-in-out infinite;
}

.avatar-blink {
  transform-origin: 100px 90px;
  animation: blink 4.2s infinite;
}

.orbit-slow {
  animation: pulseNodes 3.5s ease-in-out infinite;
}
</style>
