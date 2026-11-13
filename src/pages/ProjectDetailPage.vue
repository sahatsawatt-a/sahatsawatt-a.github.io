<script setup lang="ts">
// Case-study style project detail page. Base content comes from `projects`
// (data/index.ts); richer, optional content from `caseStudies` (data/caseStudies.ts).
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { projects, experiences } from '@/data/index'
import { formatDate } from '@/utils/date'
import { findCaseStudy, isVideo, type CaseStudyFeature, type CaseStudyMedia } from '@/data/caseStudies'
import { categoryBadge, companyFor } from '@/utils/projectMeta'
import FlowDiagram from '@/components/project/FlowDiagram.vue'
import SystemDiagram from '@/components/project/SystemDiagram.vue'
import SectionHeading from '@/components/project/SectionHeading.vue'

const route = useRoute()

const index = computed(() => projects.findIndex(p => p.slug === route.params.slug))
const project = computed(() => (index.value >= 0 ? projects[index.value] : undefined))
const cs = computed(() => (project.value ? findCaseStudy(project.value.slug) : undefined))

const prev = computed(() => (index.value > 0 ? projects[index.value - 1] : undefined))
const next = computed(() =>
  index.value >= 0 && index.value < projects.length - 1 ? projects[index.value + 1] : undefined,
)

const badge = computed(() => (project.value ? categoryBadge(project.value) : null))
const company = computed(() => (project.value ? companyFor(project.value) : ''))

/** Hero accent colours follow the category badge. */
const accent = computed(() => {
  switch (badge.value?.label) {
    case 'ML / CV': return { a: 'bg-fuchsia-400', b: 'bg-violet-400' }
    case 'ETL': return { a: 'bg-violet-400', b: 'bg-sky-400' }
    case 'Tools': return { a: 'bg-sky-400', b: 'bg-emerald-400' }
    default: return { a: 'bg-amber-400', b: 'bg-rose-400' }
  }
})

// ── merged content: case study first, base project as fallback ──────────────
const features = computed<CaseStudyFeature[]>(() => {
  if (cs.value?.features?.length) return cs.value.features
  return (project.value?.features ?? []).map(f => ({ title: '', detail: f }))
})

const media = computed(() => {
  if (cs.value?.media?.length) return cs.value.media
  return project.value?.img ? [{ src: project.value.img, caption: `${project.value.title} diagram` }] : []
})

const steps = computed(() => cs.value?.architecture?.steps ?? [])
const archLayers = computed(() => cs.value?.architecture?.layers ?? [])

const mediaIndex = ref(0)
const currentMedia = computed(() => media.value[Math.min(mediaIndex.value, media.value.length - 1)])
const exampleIndex = ref(0)
const currentExample = computed(() => cs.value?.examples?.[exampleIndex.value])
/** Jump the viewer to an example's media and scroll it into view */
function showMedia(src: string) {
  const i = media.value.findIndex(m => m.src === src)
  if (i < 0) return
  mediaIndex.value = i
  scrollTo('visuals')
}
/** Viewer chapters, in first-seen order */
const mediaGroups = computed(() => [...new Set(media.value.map(m => m.group).filter((g): g is string => !!g))])
const thumbs = computed(() =>
  media.value
    .map((m, i) => ({ m, i }))
    .filter(x => !mediaGroups.value.length || x.m.group === currentMedia.value?.group),
)
function openGroup(g: string) {
  const i = media.value.findIndex(m => m.group === g)
  if (i >= 0) mediaIndex.value = i
}
function stepMedia(d: number) {
  const n = media.value.length
  if (n) mediaIndex.value = (mediaIndex.value + d + n) % n
}

// role / timeline fall back to the linked experience entry
const exp = computed(() => {
  const id = project.value?.exp_id
  return id ? experiences.find(e => e.exp_id === id) : undefined
})
const shortDate = (d: string) => formatDate(d).replace(/^([A-Z][a-z]{2})[a-z]+/, '$1')
const role = computed(() => cs.value?.role ?? exp.value?.role)
const timeline = computed(
  () => cs.value?.timeline ?? (exp.value ? `${shortDate(exp.value.start_date)} – ${shortDate(exp.value.end_date)}` : undefined),
)

/** Hero facts: what a recruiter / team lead scans first. */
const facts = computed(() => {
  const p = project.value
  if (!p) return []
  const rows: { label: string; value: string }[] = []
  if (role.value) rows.push({ label: 'Role', value: role.value })
  if (cs.value?.team) rows.push({ label: 'Team', value: cs.value.team })
  if (timeline.value) rows.push({ label: 'Timeline', value: timeline.value })
  rows.push({ label: 'Organisation', value: company.value })
  rows.push({ label: 'Stack', value: p.tags.slice(0, 4).join(' · ') })
  return rows
})

// long lists collapse behind "show all"
const FEATURE_LIMIT = 8
const CHALLENGE_LIMIT = 3
const showAllFeatures = ref(false)
const showAllChallenges = ref(false)
const visibleFeatures = computed(() => (showAllFeatures.value ? features.value : features.value.slice(0, FEATURE_LIMIT)))
const challenges = computed(() => cs.value?.challenges ?? [])
const visibleChallenges = computed(() =>
  showAllChallenges.value ? challenges.value : challenges.value.slice(0, CHALLENGE_LIMIT),
)

const stackLayers = computed(() => {
  const p = project.value
  if (!p) return []
  const known = [...(p.prog_langs ?? []), ...(p.tools ?? [])]
  return [
    { key: 'languages', label: 'Languages', items: p.prog_langs ?? [] },
    { key: 'frameworks', label: 'Frameworks', items: p.tags.filter(t => !known.includes(t)) },
    { key: 'tools', label: 'Tools', items: p.tools ?? [] },
    { key: 'packages', label: 'Packages', items: p.packages ?? [] },
  ].filter(l => l.items.length)
})
const mainStack = computed(() => stackLayers.value.filter(l => l.key !== 'packages'))
const packages = computed(() => stackLayers.value.find(l => l.key === 'packages')?.items ?? [])

// ── section registry drives both TOCs ───────────────────────────────────────
const sections = computed(() => {
  const p = project.value
  if (!p) return []
  const s: { id: string; label: string }[] = [{ id: 'overview', label: 'Overview' }]
  if (media.value.length) s.push({ id: 'visuals', label: media.value.length > 1 ? 'Screens & demos' : 'Diagram' })
  if (cs.value?.contributions?.length) s.push({ id: 'role', label: 'My role' })
  if (cs.value?.problem || p.purpose?.length) s.push({ id: 'problem', label: cs.value?.problem ? 'Problem & goals' : 'Goals' })
  if (cs.value?.examples?.length) s.push({ id: 'examples', label: 'Example cases' })
  if (steps.value.length || archLayers.value.length) s.push({ id: 'architecture', label: 'How it works' })
  if (features.value.length) s.push({ id: 'features', label: 'Key features' })
  if (cs.value?.practices?.length) s.push({ id: 'practices', label: 'How I build' })
  if (challenges.value.length) s.push({ id: 'challenges', label: 'Challenges' })
  if (stackLayers.value.length) s.push({ id: 'stack', label: 'Tech stack' })
  if (cs.value?.learnings?.length) s.push({ id: 'learnings', label: 'Learnings' })
  if (p.feedback) s.push({ id: 'feedback', label: 'Feedback' })
  return s
})

const pad = (n: number) => String(n + 1).padStart(2, '0')
const num = (id: string) => pad(Math.max(0, sections.value.findIndex(s => s.id === id)))

// ── scroll spy, progress, lightbox ──────────────────────────────────────────
const active = ref('overview')
const progress = ref(0)
const zoom = ref<CaseStudyMedia | null>(null)
const mobileNav = ref<HTMLElement | null>(null)
let spy: IntersectionObserver | null = null

function scrollTo(id: string) {
  // hash-history router: use JS scrolling instead of #anchors
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onScroll() {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  progress.value = max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') zoom.value = null
}

async function setupSpy() {
  spy?.disconnect()
  await nextTick()
  spy = new IntersectionObserver(
    entries => {
      const visible = entries.filter(e => e.isIntersecting)
      if (visible.length) {
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        active.value = visible[0].target.id
      }
    },
    { rootMargin: '-25% 0px -60% 0px' },
  )
  sections.value.forEach(s => {
    const el = document.getElementById(s.id)
    if (el) spy?.observe(el)
  })
}

// keep the active chip visible in the mobile nav
watch(active, async id => {
  await nextTick()
  const chip = mobileNav.value?.querySelector<HTMLElement>(`[data-id="${id}"]`)
  const bar = mobileNav.value
  if (chip && bar) bar.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' })
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  onScroll()
  setupSpy()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  spy?.disconnect()
})
watch(() => route.params.slug, () => {
  active.value = 'overview'
  showAllFeatures.value = false
  mediaIndex.value = 0
  exampleIndex.value = 0
  showAllChallenges.value = false
  setupSpy()
})
</script>

<template>
  <!-- reading progress -->
  <div class="fixed inset-x-0 top-0 z-50 h-0.5">
    <div
      class="h-full bg-gradient-to-r from-violet-400 via-sky-400 to-rose-400 transition-[width] duration-150"
      :style="{ width: `${progress}%` }"
    />
  </div>

  <template v-if="project">
    <!-- ═══ HERO ═══════════════════════════════════════════════════════════ -->
    <header id="overview" class="glass grid-bg reveal relative scroll-mt-24 overflow-hidden rounded-3xl lg:scroll-mt-8">
      <div :class="['blob -top-24 -right-16 h-96 w-96', accent.a]" style="opacity: 0.22" />
      <div :class="['blob -bottom-40 left-1/4 h-96 w-96', accent.b]" style="opacity: 0.18" />

      <div
        :class="[
          'relative z-10 grid grid-cols-1 items-center gap-10 p-6 md:p-10 lg:p-12',
          cs?.cover ? '' : 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]',
        ]"
      >
        <!-- left: copy -->
        <div :class="['min-w-0', cs?.cover ? 'max-w-4xl' : '']">
          <nav class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <RouterLink to="/projects" class="hover:text-slate-900 dark:hover:text-white">← Projects</RouterLink>
            <span class="opacity-50">/</span>
            <span class="truncate">{{ String(index + 1).padStart(2, '0') }} of {{ String(projects.length).padStart(2, '0') }}</span>
          </nav>

          <div class="mt-8 flex flex-wrap items-center gap-2 text-xs">
            <span v-if="badge" :class="['rounded-md px-2 py-0.5 text-xs font-medium ring-1', badge.classes]">
              {{ badge.label }}
            </span>
            <span
              v-if="cs?.status"
              class="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300"
            >
              <span class="live-dot is-open" style="width: 6px; height: 6px" /> {{ cs.status }}
            </span>
          </div>

          <h1 :class="['mt-4 text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.08]', cs?.cover ? 'lg:text-6xl' : '']">
            {{ project.title }}
          </h1>

          <p class="mt-5 text-lg leading-relaxed text-slate-700 md:text-xl dark:text-slate-200">
            {{ cs?.summary ?? project.description }}
          </p>

          <div class="mt-7 flex flex-wrap gap-2">
            <a
              v-for="l in cs?.links ?? []"
              :key="l.url"
              :href="l.url"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-85 dark:bg-white dark:text-slate-900"
            >
              {{ l.label }} ↗
            </a>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-900/10 transition hover:bg-white/60 dark:ring-white/15 dark:hover:bg-white/10"
              @click="scrollTo(sections[1]?.id ?? 'overview')"
            >
              Read case study ↓
            </button>
          </div>
        </div>

        <!-- right: visual (no cover) -->
        <div v-if="!cs?.cover" class="min-w-0">
          <!-- 2) mini architecture diagram -->
          <div
            v-if="steps.length"
            class="overflow-hidden rounded-2xl bg-white/70 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur dark:bg-[#0d1322]/80 dark:shadow-black/40 dark:ring-white/10"
          >
            <div class="flex items-center gap-1.5 border-b border-slate-900/5 px-4 py-2.5 dark:border-white/10">
              <span class="h-2 w-2 rounded-full bg-rose-400/80" />
              <span class="h-2 w-2 rounded-full bg-amber-400/80" />
              <span class="h-2 w-2 rounded-full bg-emerald-400/80" />
              <span class="ml-2 font-mono text-[10px] text-slate-500 dark:text-slate-400">pipeline.svg</span>
            </div>
            <ol class="relative px-5 py-5">
              <span class="absolute top-8 bottom-8 left-[33px] w-px bg-gradient-to-b from-sky-400/70 via-violet-400/50 to-rose-400/40" />
              <span class="travel-dot absolute left-[30px] h-[7px] w-[7px] rounded-full bg-sky-300 shadow-[0_0_12px_3px_rgba(56,189,248,0.7)]" />
              <li v-for="(s, i) in steps" :key="s.title" class="relative flex items-center gap-4 py-1.5">
                <span class="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white font-mono text-[9px] font-semibold ring-1 ring-sky-400/40 dark:bg-[#0d1322]">
                  {{ pad(i) }}
                </span>
                <div class="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-lg bg-slate-900/[0.03] px-3 py-2 ring-1 ring-slate-900/5 dark:bg-white/[0.04] dark:ring-white/5">
                  <span class="truncate text-sm font-medium">{{ s.title }}</span>
                  <span v-if="s.tech?.[0]" class="hidden shrink-0 font-mono text-[10px] text-slate-500 sm:inline dark:text-slate-400">{{ s.tech[0] }}</span>
                </div>
              </li>
            </ol>
          </div>

          <!-- 3) stack as code -->
          <div
            v-else
            class="overflow-hidden rounded-2xl bg-[#0d1322] font-mono text-[13px] leading-6 text-slate-300 shadow-2xl shadow-slate-900/30 ring-1 ring-white/10"
          >
            <div class="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span class="h-2 w-2 rounded-full bg-rose-400/80" />
              <span class="h-2 w-2 rounded-full bg-amber-400/80" />
              <span class="h-2 w-2 rounded-full bg-emerald-400/80" />
              <span class="ml-2 text-[10px] text-slate-400">stack.ts</span>
            </div>
            <pre class="overflow-x-auto px-5 py-4"><span class="text-violet-300">export const</span> <span class="text-sky-300">stack</span> = {
<template v-for="l in stackLayers" :key="l.key">  <span class="text-slate-400">{{ l.key }}</span>: [<template v-for="(it, j) in l.items" :key="it"><span class="text-amber-300">'{{ it }}'</span><template v-if="j < l.items.length - 1">, </template></template>],
</template>}</pre>
          </div>
        </div>
      </div>

      <!-- showcase (cover) -->
      <div v-if="cs?.cover" class="showcase relative z-10 px-4 md:px-10 lg:px-16">
        <div class="pointer-events-none absolute inset-x-[15%] top-10 bottom-0 rounded-full bg-gradient-to-r from-violet-500/40 via-sky-500/40 to-rose-500/30 blur-3xl" />
        <button
          type="button"
          class="showcase-frame group relative block w-full overflow-hidden rounded-t-2xl bg-[#0d1117] text-left shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
          @click="zoom = { src: cs.cover, caption: project.title, poster: cs.coverPoster }"
        >
          <div class="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
            <span class="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span class="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span class="mx-auto rounded-md bg-white/5 px-10 py-0.5 font-mono text-[10px] text-slate-400">{{ project.slug.split('-')[0] }}.app</span>
          </div>
          <video
            v-if="isVideo(cs.cover)"
            :src="cs.cover"
            :poster="cs.coverPoster"
            autoplay
            muted
            loop
            playsinline
            class="block w-full"
          />
          <img v-else :src="cs.cover" :alt="project.title" class="block w-full" />
          <span class="absolute right-4 bottom-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs text-white opacity-0 backdrop-blur transition group-hover:opacity-100">Click to enlarge</span>
        </button>
      </div>

      <!-- quick facts -->
      <dl class="relative z-10 grid grid-cols-2 border-t border-slate-900/5 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] dark:border-white/10">
        <div
          v-for="f in facts"
          :key="f.label"
          class="border-slate-900/5 px-6 py-5 md:border-r md:px-8 md:last:border-r-0 lg:first:pl-12 dark:border-white/10"
        >
          <dt class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{{ f.label }}</dt>
          <dd class="mt-1 text-sm font-medium">{{ f.value }}</dd>
        </div>
      </dl>
    </header>

    <!-- ═══ AT A GLANCE ═══════════════════════════════════════════════════ -->
    <section v-if="cs?.metrics?.length || project.impact?.length" class="glass reveal overflow-hidden rounded-3xl">
      <div
        v-if="cs?.metrics?.length"
        class="grid grid-cols-1 divide-y divide-slate-900/5 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-white/10"
      >
        <div v-for="(m, i) in cs.metrics" :key="i" class="px-6 py-5 md:p-8">
          <div class="hl text-3xl font-bold tracking-tight md:text-5xl">{{ m.value }}</div>
          <p class="mt-2 max-w-[28ch] text-sm text-slate-600 dark:text-slate-300">{{ m.label }}</p>
        </div>
      </div>
      <div
        v-if="project.impact?.length"
        :class="[
          'grid grid-cols-1 gap-4 bg-emerald-500/[0.04] p-6 md:grid-cols-3 md:p-8',
          cs?.metrics?.length ? 'border-t border-slate-900/5 dark:border-white/10' : '',
        ]"
      >
        <div class="font-mono text-[10px] uppercase tracking-widest text-emerald-600 md:col-span-3 dark:text-emerald-400">Outcomes</div>
        <div v-for="(item, i) in project.impact" :key="i" class="flex gap-3">
          <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-xs text-emerald-600 dark:text-emerald-300">↗</span>
          <p class="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-200">{{ item }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ SHOWCASE VIEWER (full width) ════════════════════════════════════ -->
    <section v-if="media.length" id="visuals" class="reveal scroll-mt-24 lg:scroll-mt-8">
      <div class="mb-5 flex flex-wrap items-end justify-between gap-4 px-1">
        <SectionHeading
          class="!mb-0"
          :num="num('visuals')"
          eyebrow="See it in action"
          :title="media.length > 1 ? 'Screens & demos' : 'Diagram'"
          tone="text-fuchsia-500"
        />
        <div v-if="media.length > 1" class="flex items-center gap-2">
          <span class="font-mono text-xs text-slate-500 dark:text-slate-400">{{ mediaIndex + 1 }} / {{ media.length }}</span>
          <button type="button" class="viewer-btn" aria-label="Previous" @click="stepMedia(-1)">←</button>
          <button type="button" class="viewer-btn" aria-label="Next" @click="stepMedia(1)">→</button>
        </div>
      </div>

      <div class="glass rounded-3xl p-2 md:p-3">
        <!-- chapters -->
        <div v-if="mediaGroups.length > 1" class="no-scrollbar mb-2 flex gap-1 overflow-x-auto md:mb-3">
          <button
            v-for="g in mediaGroups"
            :key="g"
            type="button"
            :class="[
              'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition md:text-sm',
              g === currentMedia.group
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white',
            ]"
            @click="openGroup(g)"
          >
            {{ g }}
          </button>
        </div>

        <!-- stage -->
        <div
          :class="[
            'group relative overflow-hidden rounded-2xl',
            media.length > 1 ? 'aspect-[16/10] bg-[#0d1117]' : 'bg-white',
          ]"
        >
          <Transition name="fade" mode="out-in">
            <video
              v-if="isVideo(currentMedia.src)"
              :key="currentMedia.src"
              :src="currentMedia.src"
              :poster="currentMedia.poster"
              autoplay
              muted
              loop
              playsinline
              class="absolute inset-0 h-full w-full object-contain"
            />
            <img
              v-else
              :key="currentMedia.src"
              :src="currentMedia.src"
              :alt="currentMedia.caption"
              :class="media.length > 1 ? 'absolute inset-0 h-full w-full object-contain' : 'block w-full'"
            />
          </Transition>

          <button
            type="button"
            class="absolute top-3 right-3 rounded-full bg-slate-900/70 px-3 py-1 text-xs text-white opacity-0 backdrop-blur transition group-hover:opacity-100 focus:opacity-100"
            @click="zoom = currentMedia"
          >
            ⤢ Enlarge
          </button>
        </div>

        <!-- caption -->
        <div class="flex items-start gap-3 px-2 pt-3 md:px-3">
          <span
            v-if="isVideo(currentMedia.src)"
            class="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-rose-600 ring-1 ring-rose-400/30 dark:text-rose-300"
          >
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" /> Live
          </span>
          <div>
            <p class="text-sm font-medium text-slate-700 md:text-[15px] dark:text-slate-200">{{ currentMedia.caption }}</p>
            <p v-if="currentMedia.how" class="mt-1 text-xs leading-relaxed text-slate-500 md:text-sm dark:text-slate-400">
              <span class="font-mono text-[10px] uppercase tracking-widest text-sky-500">How it works</span>
              · {{ currentMedia.how }}
            </p>
          </div>
        </div>

        <!-- thumbnails -->
        <div v-if="thumbs.length > 1" class="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            v-for="{ m, i } in thumbs"
            :key="m.src"
            type="button"
            :class="[
              'relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-xl transition md:w-36',
              i === mediaIndex
                ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-transparent'
                : 'opacity-60 ring-1 ring-white/10 hover:opacity-100',
            ]"
            :aria-label="m.caption"
            @click="mediaIndex = i"
          >
            <img v-if="!isVideo(m.src) || m.poster" :src="m.poster ?? m.src" alt="" class="h-full w-full object-cover object-top" />
            <video v-else :src="m.src" muted preload="metadata" class="h-full w-full object-cover" />
            <span
              v-if="isVideo(m.src)"
              class="absolute inset-0 grid place-items-center bg-slate-950/30"
            >
              <span class="grid h-7 w-7 place-items-center rounded-full bg-white/90 pl-0.5 text-[10px] text-slate-900">▶</span>
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- mobile section nav (sticky) -->
    <div class="sticky top-2 z-30 lg:hidden">
      <div ref="mobileNav" class="glass no-scrollbar flex gap-1 overflow-x-auto rounded-2xl p-1.5">
        <button
          v-for="(s, i) in sections"
          :key="s.id"
          :data-id="s.id"
          type="button"
          :class="[
            'shrink-0 rounded-xl px-3 py-1.5 text-xs transition',
            active === s.id
              ? 'bg-slate-900 font-medium text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-500 dark:text-slate-400',
          ]"
          @click="scrollTo(s.id)"
        >
          <span class="mr-1 font-mono text-[9px] opacity-60">{{ pad(i) }}</span>{{ s.label }}
        </button>
      </div>
    </div>

    <!-- ═══ BODY: sticky TOC + content ════════════════════════════════════ -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
      <aside class="hidden lg:block">
        <div class="sticky top-8">
          <div class="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <span>On this page</span>
            <span>{{ Math.round(progress) }}%</span>
          </div>
          <ol class="border-l border-slate-900/10 dark:border-white/10">
            <li v-for="(s, i) in sections" :key="s.id">
              <button
                type="button"
                :class="[
                  '-ml-px flex w-full items-center gap-3 border-l-2 py-2 pl-4 text-left text-sm transition',
                  active === s.id
                    ? 'border-sky-400 font-medium text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 hover:border-slate-400/50 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                ]"
                @click="scrollTo(s.id)"
              >
                <span :class="['font-mono text-[10px]', active === s.id ? 'text-sky-500' : 'opacity-50']">{{ pad(i) }}</span>
                {{ s.label }}
              </button>
            </li>
          </ol>

          <RouterLink
            to="/contact"
            class="group mt-8 block overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/15 via-sky-500/10 to-rose-500/10 p-4 ring-1 ring-slate-900/5 transition hover:ring-violet-400/40 dark:ring-white/10"
          >
            <span class="block text-sm font-semibold">Building something similar?</span>
            <span class="mt-1 block text-xs text-slate-600 dark:text-slate-300">
              Let's talk <span class="inline-block transition group-hover:translate-x-1">→</span>
            </span>
          </RouterLink>
        </div>
      </aside>

      <div class="min-w-0 space-y-16">
        <!-- My role -->
        <section v-if="cs?.contributions?.length" id="role" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <SectionHeading :num="num('role')" eyebrow="Ownership" title="My role" tone="text-emerald-500" />
          <div class="glass grid grid-cols-1 overflow-hidden rounded-3xl md:grid-cols-[1.45fr_1fr]">
            <div class="p-6 md:p-8">
              <div class="font-mono text-[10px] uppercase tracking-widest text-emerald-500">What I did</div>
              <ol class="mt-4 space-y-3.5">
                <li v-for="(c, i) in cs.contributions" :key="i" class="flex gap-3 text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
                  <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-300">{{ i + 1 }}</span>
                  {{ c }}
                </li>
              </ol>
            </div>
            <div class="space-y-6 border-t border-slate-900/5 bg-slate-900/[0.02] p-6 md:border-t-0 md:border-l md:p-8 dark:border-white/10 dark:bg-white/[0.02]">
              <div v-if="cs.users">
                <div class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Built for</div>
                <p class="mt-1.5 text-sm font-medium">{{ cs.users }}</p>
              </div>
              <div v-if="cs.skills?.length">
                <div class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Skills shown</div>
                <div class="mt-2.5 flex flex-wrap gap-1.5">
                  <span v-for="sk in cs.skills" :key="sk" class="skill-chip">{{ sk }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Problem & goals -->
        <section v-if="cs?.problem || project.purpose?.length" id="problem" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <SectionHeading :num="num('problem')" eyebrow="Context" :title="cs?.problem ? 'Problem & goals' : 'Goals'" tone="text-rose-500" />
          <div class="glass grid grid-cols-1 overflow-hidden rounded-3xl" :class="cs?.problem ? 'md:grid-cols-[1.1fr_1fr]' : ''">
            <div v-if="cs?.problem" class="relative p-6 md:p-8">
              <div class="font-mono text-[10px] uppercase tracking-widest text-rose-500">The problem</div>
              <p class="mt-3 text-lg leading-relaxed text-slate-700 dark:text-slate-200">{{ cs.problem }}</p>
            </div>
            <div
              v-if="project.purpose?.length"
              :class="[
                'p-6 md:p-8',
                cs?.problem ? 'border-t border-slate-900/5 bg-emerald-500/[0.03] md:border-t-0 md:border-l dark:border-white/10' : '',
              ]"
            >
              <div class="font-mono text-[10px] uppercase tracking-widest text-emerald-500">Goals</div>
              <ul :class="['mt-4 grid gap-3', cs?.problem ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2']">
                <li v-for="(g, i) in project.purpose" :key="i" class="flex gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <span class="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-[10px] text-emerald-600 dark:text-emerald-300">✓</span>
                  {{ g }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Example cases -->
        <section v-if="cs?.examples?.length && currentExample" id="examples" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <SectionHeading :num="num('examples')" eyebrow="In practice" title="Example cases" tone="text-amber-500" />
          <div class="glass overflow-hidden rounded-3xl">
            <!-- tabs -->
            <div
              v-if="cs.examples.length > 1"
              class="no-scrollbar flex gap-1 overflow-x-auto border-b border-slate-900/5 p-2 dark:border-white/10"
              role="tablist"
            >
              <button
                v-for="(ex, i) in cs.examples"
                :key="ex.title"
                type="button"
                role="tab"
                :aria-selected="i === exampleIndex"
                :class="[
                  'flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition',
                  i === exampleIndex
                    ? 'bg-amber-500/10 font-medium text-slate-900 ring-1 ring-amber-500/25 dark:text-white'
                    : 'text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white',
                ]"
                @click="exampleIndex = i"
              >
                <span :class="['font-mono text-[10px]', i === exampleIndex ? 'text-amber-500' : 'opacity-50']">{{ String.fromCharCode(65 + i) }}</span>
                {{ ex.title }}
              </button>
            </div>

            <!-- panel -->
            <Transition name="fade" mode="out-in">
              <div :key="currentExample.title" class="p-6 md:p-8">
                <div class="flex flex-wrap items-start justify-between gap-4">
                  <div class="max-w-2xl">
                    <h3 v-if="cs.examples.length === 1" class="text-lg font-semibold tracking-tight">{{ currentExample.title }}</h3>
                    <p class="text-lg leading-relaxed text-slate-700 md:text-xl dark:text-slate-200">
                      <span class="font-mono text-[10px] uppercase tracking-widest text-amber-500">Scenario</span><br />
                      {{ currentExample.scenario }}
                    </p>
                  </div>
                  <button
                    v-if="currentExample.media && media.some(m => m.src === currentExample!.media)"
                    type="button"
                    class="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-85 dark:bg-white dark:text-slate-900"
                    @click="showMedia(currentExample.media!)"
                  >
                    ▶ See it
                  </button>
                </div>

                <ol class="relative mt-8 space-y-0">
                  <li v-for="(st, i) in currentExample.steps" :key="i" class="relative flex gap-4 pb-6 last:pb-0">
                    <span
                      v-if="i < currentExample.steps.length - 1"
                      class="absolute top-8 bottom-0 left-[15px] w-px bg-gradient-to-b from-amber-400/60 to-amber-400/10"
                    />
                    <span class="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-500/10 font-mono text-xs font-semibold text-amber-600 ring-1 ring-amber-500/30 dark:text-amber-300">
                      {{ i + 1 }}
                    </span>
                    <p class="pt-1 text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">{{ st }}</p>
                  </li>
                </ol>
              </div>
            </Transition>
          </div>
        </section>

        <!-- Architecture diagram -->
        <section v-if="steps.length || archLayers.length" id="architecture" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <SectionHeading
            :num="num('architecture')"
            eyebrow="How it works"
            :title="archLayers.length ? 'System architecture' : 'Pipeline'"
            tone="text-sky-500"
          />
          <p v-if="archLayers.length" class="-mt-2 mb-5 px-1 text-sm text-slate-500 dark:text-slate-400">
            Hover or tap a component to trace what it talks to — e.g. how an AI client's request reaches the database.
          </p>
          <div class="glass grid-bg relative overflow-hidden rounded-3xl p-6 md:p-8">
            <div class="blob -top-24 right-0 h-56 w-56 bg-sky-400" style="opacity: 0.15" />
            <SystemDiagram
              v-if="archLayers.length"
              :layers="archLayers"
              :links="cs?.architecture?.links ?? []"
              :initial="cs?.architecture?.initial"
              class="relative"
            />
            <FlowDiagram v-else :steps="steps" class="relative" />
            <p
              v-if="cs?.architecture?.note"
              class="relative mt-8 flex items-center gap-2 rounded-xl bg-sky-500/5 px-4 py-3 text-sm text-slate-600 ring-1 ring-sky-500/15 dark:text-slate-300"
            >
              <span class="text-sky-500">ⓘ</span> {{ cs.architecture.note }}
            </p>
          </div>
        </section>

        <!-- Features: bento -->
        <section v-if="features.length" id="features" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <SectionHeading :num="num('features')" eyebrow="What it does" title="Key features" tone="text-violet-500" />
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article
              v-for="(f, i) in visibleFeatures"
              :key="i"
              :class="[
                'glass gradient-border lift relative overflow-hidden rounded-3xl p-6',
                i === 0 && visibleFeatures.length % 2 === 1 ? 'md:col-span-2' : '',
                i === 0 ? 'bg-gradient-to-br from-violet-500/10 via-transparent to-sky-500/10' : '',
              ]"
            >
              <div class="relative flex items-center gap-3">
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-400/20 to-sky-400/20 font-mono text-[10px] font-semibold ring-1 ring-violet-400/25">{{ pad(i) }}</span>
                <h3 v-if="f.title" class="text-base font-semibold tracking-tight">{{ f.title }}</h3>
              </div>
              <p class="relative mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ f.detail }}</p>
              <button
                v-if="f.media && media.some(m => m.src === f.media)"
                type="button"
                class="relative mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 transition hover:gap-2.5 dark:text-violet-300"
                @click="showMedia(f.media)"
              >
                {{ isVideo(f.media) ? '▶ Watch it' : '⤢ See it' }} <span aria-hidden="true">→</span>
              </button>
            </article>
          </div>
          <button
            v-if="features.length > FEATURE_LIMIT"
            type="button"
            class="mx-auto mt-4 block rounded-full px-4 py-2 text-sm text-slate-600 ring-1 ring-slate-900/10 transition hover:bg-white/60 dark:text-slate-300 dark:ring-white/15 dark:hover:bg-white/10"
            @click="showAllFeatures = !showAllFeatures"
          >
            {{ showAllFeatures ? 'Show fewer' : `Show all ${features.length} features` }}
          </button>
        </section>

        <!-- Practices: tools in context -->
        <section v-if="cs?.practices?.length" id="practices" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <SectionHeading :num="num('practices')" eyebrow="Engineering" title="How I build it" tone="text-sky-500" />
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article
              v-for="pr in cs.practices"
              :key="pr.area"
              class="glass gradient-border lift flex flex-col rounded-3xl p-6"
            >
              <h3 class="flex items-center gap-2 text-base font-semibold tracking-tight">
                <span class="h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-violet-400" />
                {{ pr.area }}
              </h3>
              <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ pr.detail }}</p>
              <div class="mt-4 flex flex-wrap gap-1.5 border-t border-slate-900/5 pt-4 dark:border-white/10">
                <span
                  v-for="t in pr.tools"
                  :key="t"
                  class="rounded-md bg-sky-500/10 px-2 py-0.5 font-mono text-[11px] text-sky-700 ring-1 ring-sky-500/20 dark:text-sky-300"
                >{{ t }}</span>
              </div>
            </article>
          </div>
        </section>

        <!-- Challenges -->
        <section v-if="challenges.length" id="challenges" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <SectionHeading :num="num('challenges')" eyebrow="Trade-offs" title="Challenges & solutions" tone="text-amber-500" />
          <div class="space-y-3">
            <div
              v-for="(c, i) in visibleChallenges"
              :key="i"
              class="grid grid-cols-1 items-stretch gap-2 md:grid-cols-[1fr_auto_1fr] md:gap-0"
            >
              <div class="glass rounded-2xl p-5 md:rounded-r-none">
                <div class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-rose-500">
                  <span class="h-1.5 w-1.5 rounded-full bg-rose-400" /> Challenge
                </div>
                <p class="mt-2 text-sm text-slate-700 dark:text-slate-200">{{ c.problem }}</p>
              </div>
              <div class="hidden items-center md:flex">
                <span class="z-10 -mx-3 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-rose-400 to-emerald-400 text-xs text-white shadow-lg">→</span>
              </div>
              <div class="rounded-2xl bg-emerald-500/[0.07] p-5 ring-1 ring-emerald-500/20 md:rounded-l-none md:pl-7">
                <div class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Solution
                </div>
                <p class="mt-2 text-sm text-slate-700 dark:text-slate-200">{{ c.solution }}</p>
              </div>
            </div>
          </div>
          <button
            v-if="challenges.length > CHALLENGE_LIMIT"
            type="button"
            class="mx-auto mt-4 block rounded-full px-4 py-2 text-sm text-slate-600 ring-1 ring-slate-900/10 transition hover:bg-white/60 dark:text-slate-300 dark:ring-white/15 dark:hover:bg-white/10"
            @click="showAllChallenges = !showAllChallenges"
          >
            {{ showAllChallenges ? 'Show fewer' : `Show ${challenges.length - CHALLENGE_LIMIT} more` }}
          </button>
        </section>

        <!-- Tech stack -->
        <section v-if="stackLayers.length" id="stack" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <SectionHeading :num="num('stack')" eyebrow="Built with" title="Tech stack" tone="text-sky-500" />
          <div class="glass overflow-hidden rounded-3xl">
            <div class="divide-y divide-slate-900/5 dark:divide-white/10">
              <div
                v-for="layer in mainStack"
                :key="layer.key"
                class="grid grid-cols-1 gap-3 px-6 py-5 sm:grid-cols-[120px_1fr] md:px-8"
              >
                <div class="pt-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{{ layer.label }}</div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="item in layer.items" :key="item" class="skill-chip">{{ item }}</span>
                </div>
              </div>
            </div>
            <details v-if="packages.length" class="group border-t border-slate-900/5 dark:border-white/10">
              <summary class="flex cursor-pointer list-none items-center justify-between px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 md:px-8 dark:text-slate-400 dark:hover:text-white">
                Key packages ({{ packages.length }})
                <span class="transition group-open:rotate-180">⌄</span>
              </summary>
              <div class="flex flex-wrap gap-1.5 px-6 pb-5 md:px-8">
                <span v-for="pk in packages" :key="pk" class="tag-chip">{{ pk }}</span>
              </div>
            </details>
          </div>
        </section>

        <!-- Learnings -->
        <section v-if="cs?.learnings?.length" id="learnings" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <SectionHeading :num="num('learnings')" eyebrow="Reflection" title="What I learned" tone="text-violet-500" />
          <ul class="glass space-y-3 rounded-3xl p-6 text-sm text-slate-700 md:p-8 dark:text-slate-200">
            <li v-for="(l, i) in cs.learnings" :key="i" class="flex gap-3"><span class="text-violet-500">▸</span>{{ l }}</li>
          </ul>
        </section>

        <!-- Feedback -->
        <section v-if="project.feedback" id="feedback" class="reveal scroll-mt-24 lg:scroll-mt-8">
          <figure class="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div class="blob -top-20 -left-10 h-56 w-56 bg-violet-400" />
            <div class="blob -right-10 -bottom-24 h-56 w-56 bg-rose-400" />
            <span class="hl relative block font-serif text-8xl leading-none">“</span>
            <blockquote class="relative -mt-6 text-xl font-medium leading-relaxed md:text-2xl">
              {{ project.feedback }}
            </blockquote>
            <figcaption class="relative mt-6 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              — Feedback · {{ company }}
            </figcaption>
          </figure>
        </section>
      </div>
    </div>

    <!-- ═══ PREV / NEXT ═══════════════════════════════════════════════════ -->
    <nav class="reveal grid grid-cols-1 gap-4 md:grid-cols-2">
      <RouterLink
        v-if="prev"
        :to="`/projects/${prev.slug}`"
        class="glass gradient-border lift group block rounded-3xl p-6"
      >
        <div class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
          <span class="inline-block transition group-hover:-translate-x-1">←</span> Previous
        </div>
        <div class="mt-2 text-lg font-semibold tracking-tight">{{ prev.title }}</div>
      </RouterLink>
      <div v-else class="hidden md:block" />
      <RouterLink
        v-if="next"
        :to="`/projects/${next.slug}`"
        class="glass gradient-border lift group block rounded-3xl p-6 text-right"
      >
        <div class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Next <span class="inline-block transition group-hover:translate-x-1">→</span>
        </div>
        <div class="mt-2 text-lg font-semibold tracking-tight">{{ next.title }}</div>
      </RouterLink>
    </nav>

    <!-- lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="zoom"
          class="fixed inset-0 z-[100] flex cursor-zoom-out flex-col items-center justify-center gap-3 bg-slate-950/85 p-4 backdrop-blur-sm md:p-10"
          @click="zoom = null"
        >
          <video
            v-if="isVideo(zoom.src)"
            :src="zoom.src"
            :poster="zoom.poster"
            autoplay
            muted
            loop
            playsinline
            controls
            class="max-h-[85vh] max-w-full rounded-xl shadow-2xl"
            @click.stop
          />
          <img v-else :src="zoom.src" :alt="zoom.caption" class="max-h-[85vh] max-w-full rounded-xl bg-white object-contain shadow-2xl" />
          <p class="text-sm text-slate-300">{{ zoom.caption }} · <span class="opacity-60">Esc to close</span></p>
        </div>
      </Transition>
    </Teleport>
  </template>

  <section v-else class="glass reveal relative overflow-hidden rounded-3xl p-6 md:p-8">
    <RouterLink to="/projects" class="mb-4 inline-flex text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
      ← Back to projects
    </RouterLink>
    <p class="text-rose-400">Project not found.</p>
  </section>
</template>

<style scoped>
.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

.travel-dot {
  top: 2rem;
  animation: travel 3.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
@keyframes travel {
  0% { top: 2rem; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: calc(100% - 2.4rem); opacity: 0; }
}

.viewer-btn {
  display: grid;
  place-items: center;
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  border: 1px solid rgba(148, 163, 184, 0.3);
  transition: background 0.2s ease;
}
.viewer-btn:hover { background: rgba(148, 163, 184, 0.15); }

.showcase { perspective: 2200px; }
.showcase-frame {
  max-height: 36rem;
  transform: rotateX(7deg);
  transform-origin: 50% 0%;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  -webkit-mask-image: linear-gradient(to bottom, #000 70%, transparent);
  mask-image: linear-gradient(to bottom, #000 70%, transparent);
}
.showcase:hover .showcase-frame { transform: rotateX(0deg); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .travel-dot { animation: none; opacity: 0; }
  .showcase-frame { transform: none; transition: none; }
}
</style>
