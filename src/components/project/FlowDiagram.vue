<script setup lang="ts">
// Data-driven pipeline diagram: step cards in a responsive grid, with SVG
// connectors measured from the rendered cards (straight within a row, elbow
// between rows) and an animated "data flow" dash on top.
import { nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { CaseStudyStep } from '@/data/caseStudies'

const props = defineProps<{ steps: CaseStudyStep[] }>()

const uid = useId()
const wrap = ref<HTMLElement | null>(null)
const nodes: HTMLElement[] = []
const paths = ref<string[]>([])
const size = ref({ w: 0, h: 0 })
let ro: ResizeObserver | null = null

function setNode(el: unknown, i: number) {
  if (el instanceof HTMLElement) nodes[i] = el
}

function layout() {
  const w = wrap.value
  if (!w) return
  const box = w.getBoundingClientRect()
  size.value = { w: box.width, h: box.height }
  const r = nodes.slice(0, props.steps.length).map(n => {
    const b = n.getBoundingClientRect()
    return { x: b.left - box.left, y: b.top - box.top, w: b.width, h: b.height }
  })
  const out: string[] = []
  for (let i = 0; i < r.length - 1; i++) {
    const a = r[i]
    const b = r[i + 1]
    if (Math.abs(a.y - b.y) < 4) {
      const y = a.y + Math.min(a.h, b.h) / 2
      out.push(`M ${a.x + a.w} ${y} L ${b.x - 2} ${y}`)
    } else {
      const x1 = a.x + a.w / 2
      const y1 = a.y + a.h
      const x2 = b.x + b.w / 2
      const y2 = b.y
      const my = (y1 + y2) / 2
      out.push(
        Math.abs(x1 - x2) < 2
          ? `M ${x1} ${y1} L ${x2} ${y2 - 2}`
          : `M ${x1} ${y1} L ${x1} ${my} L ${x2} ${my} L ${x2} ${y2 - 2}`,
      )
    }
  }
  paths.value = out
}

onMounted(async () => {
  await nextTick()
  layout()
  ro = new ResizeObserver(() => layout())
  if (wrap.value) ro.observe(wrap.value)
})
onBeforeUnmount(() => ro?.disconnect())
watch(() => props.steps, async () => {
  nodes.length = 0
  await nextTick()
  layout()
})

const pad = (n: number) => String(n + 1).padStart(2, '0')
</script>

<template>
  <div ref="wrap" class="relative">
    <svg
      class="pointer-events-none absolute inset-0 overflow-visible"
      :width="size.w"
      :height="size.h"
      aria-hidden="true"
    >
      <defs>
        <marker :id="`${uid}-arrow`" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" class="fill-sky-400" />
        </marker>
      </defs>
      <path
        v-for="(d, i) in paths"
        :key="`b${i}`"
        :d="d"
        fill="none"
        stroke-width="1.5"
        stroke-linejoin="round"
        class="stroke-slate-300 dark:stroke-white/15"
        :marker-end="`url(#${uid}-arrow)`"
      />
      <path
        v-for="(d, i) in paths"
        :key="`f${i}`"
        :d="d"
        fill="none"
        stroke-width="2"
        stroke-linejoin="round"
        class="flow-dash stroke-sky-400"
      />
    </svg>

    <ol class="relative grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
      <li
        v-for="(s, i) in steps"
        :key="s.title"
        :ref="el => setNode(el, i)"
        class="group relative rounded-2xl bg-white/80 p-4 ring-1 ring-slate-900/5 backdrop-blur transition hover:ring-sky-400/50 dark:bg-[#111827]/90 dark:ring-white/10"
      >
        <div class="flex items-center gap-2.5">
          <span
            class="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-400/25 to-violet-400/25 font-mono text-[10px] font-semibold ring-1 ring-sky-400/30"
          >{{ pad(i) }}</span>
          <h3 class="text-sm font-semibold tracking-tight">{{ s.title }}</h3>
        </div>
        <p v-if="s.detail" class="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{{ s.detail }}</p>
        <div v-if="s.tech?.length" class="mt-3 flex flex-wrap gap-1">
          <span v-for="t in s.tech" :key="t" class="tag-chip">{{ t }}</span>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.flow-dash {
  stroke-dasharray: 2 10;
  stroke-linecap: round;
  animation: flow 0.9s linear infinite;
}
@keyframes flow {
  to { stroke-dashoffset: -12; }
}
@media (prefers-reduced-motion: reduce) {
  .flow-dash { animation: none; }
}
</style>
