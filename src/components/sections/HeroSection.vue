<script setup lang="ts">
import { ref } from 'vue'
import { hero } from '../../data/profile'

// Calculate duration from a start date
const calculateDuration = (startDate: string) => {
  const start = new Date(startDate)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  return `${years}Y ${months}M`
}

// Split hero title into parts for highlighting
const splitTitle = (text: string, highlights: string[]) => {
  const escaped = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi")

  return text.split(pattern).map(part => ({
    text: part,
    highlight: highlights.includes(part.toLowerCase())
  }))
}

const heroTitleParts = splitTitle(hero.heroTitle.full, hero.heroTitle.highlight)
const systemAnalysisDuration = calculateDuration(hero.quickProfile.systemAnalysisJoinDate)

// Modal state
const showModal = ref(false)
const openModal = () => showModal.value = true
const closeModal = () => showModal.value = false
</script>

<template>
  <section id="hero" class="flex flex-col gap-12 lg:flex-row lg:items-center">
    <!-- LEFT: Hero intro -->
    <div class="max-w-xl space-y-6">
      <span
        class="inline-flex items-center gap-2 rounded-full bg-slate-800/10 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700/20 dark:text-slate-200">
        <span class="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
        {{ hero.status }}
      </span>

      <div class="space-y-3">
        <h1
          class="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-50">
          <template v-for="(part, i) in heroTitleParts" :key="i">
            <span v-if="part.highlight"
              class="text-transparent bg-clip-text bg-gradient-to-r from-[#6fffc2] to-[#3ee0a8]">{{ part.text }}</span>
            <span v-else>{{ part.text }}</span>
          </template>
        </h1>

        <p class="text-base leading-relaxed text-slate-600 dark:text-slate-300">{{ hero.description }}</p>
      </div>

      <div class="flex flex-wrap gap-3">
        <a href="#projects"
          class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF2D20] to-[#FF543E] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105">
          View projects
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6.75-6.75M19.5 12 12.75 18.75" />
          </svg>
        </a>

        <a href="#contact"
          class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-[#FF2D20] hover:text-[#FF2D20] dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100">
          Get in touch
        </a>
      </div>
    </div>

    <!-- RIGHT: Quick Profile card -->
    <div class="relative w-full max-w-xl mt-8 lg:mt-0">
      <div
        class="relative rounded-[2rem] bg-slate-900/90 dark:bg-slate-800/80 shadow-xl backdrop-blur-sm border border-slate-700/30 overflow-hidden">
        <div class="p-6 flex flex-col gap-6">
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Quick Profile</p>

          <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <!-- Profile Image with click popup -->
            <div class="flex-shrink-0 cursor-pointer" @click="openModal">
              <img :src="hero.profileImage" alt="Profile picture"
                class="w-32 h-32 rounded-full border-4 border-slate-700 shadow-lg object-cover transition-transform hover:scale-105" />
            </div>

            <!-- Stats -->
            <div class="flex-1 grid grid-cols-2 gap-4 items-center text-center sm:text-left">
              <div class="flex flex-col justify-center items-center sm:items-start">
                <p class="text-2xl font-bold text-white">{{ systemAnalysisDuration }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ hero.quickProfile.systemAnalysisLabel }}</p>
              </div>
              <div class="flex flex-col justify-center items-center sm:items-start">
                <p class="text-2xl font-bold text-white">{{ hero.quickProfile.countries }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ hero.quickProfile.countriesLabel }}</p>
              </div>
            </div>
          </div>

          <!-- small cards -->
          <div class="grid grid-cols-2 gap-3">
            <div v-for="card in hero.quickProfile.cards" :key="card.label"
              class="rounded-lg px-3 py-2 bg-slate-800/80 dark:bg-slate-700/70 flex flex-col items-center justify-center">
              <p class="text-[11px] text-slate-400">{{ card.label }}</p>
              <p class="text-sm font-semibold text-white">{{ card.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Modal: outside the card container -->
<transition name="fade">
  <div v-if="showModal" 
       class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
       @click.self="closeModal">
    <img :src="hero.profileImage" alt="Profile full"
         class="rounded-xl shadow-lg object-cover max-w-full max-h-[80vh]" />
  </div>
</transition>

  </section>
</template>

<style>
/* Overlay fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

</style>
