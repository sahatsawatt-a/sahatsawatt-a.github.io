<script setup lang="ts">
// Layered system diagram. Only the focused component's connections are drawn —
// with direction arrows and labels — so the picture stays readable. With nothing
// selected, all connections show faintly as an overview.
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { ArchLayer, ArchLink } from '@/data/caseStudies'

const props = defineProps<{
  layers: ArchLayer[]
  links: ArchLink[]
  /** Component selected on load */
  initial?: string
}>()

const uid = useId()
const TONES: Record<string, { dot: string; text: string; ring: string; box: string }> = {
  violet: { dot: 'bg-violet-400', text: 'text-violet-500', ring: 'ring-violet-400/70', box: 'bg-violet-500/[0.04] ring-violet-500/15' },
  slate: { dot: 'bg-slate-400', text: 'text-slate-500', ring: 'ring-slate-400/70', box: 'bg-slate-500/[0.04] ring-slate-500/15' },
  sky: { dot: 'bg-sky-400', text: 'text-sky-500', ring: 'ring-sky-400/70', box: 'bg-sky-500/[0.04] ring-sky-500/15' },
  indigo: { dot: 'bg-indigo-400', text: 'text-indigo-400', ring: 'ring-indigo-400/70', box: 'bg-indigo-500/[0.05] ring-indigo-500/20' },
  amber: { dot: 'bg-amber-400', text: 'text-amber-500', ring: 'ring-amber-400/70', box: 'bg-amber-500/[0.04] ring-amber-500/15' },
  emerald: { dot: 'bg-emerald-400', text: 'text-emerald-500', ring: 'ring-emerald-400/70', box: 'bg-emerald-500/[0.04] ring-emerald-500/15' },
}
const ORDER = ['violet', 'slate', 'sky', 'amber', 'emerald', 'indigo']
const tone = (li: number) => TONES[props.layers[li]?.tone ?? ''] ?? TONES[ORDER[li % ORDER.length]]

/** Layers sharing a `row` sit side by side */
const rows = computed(() => {
  const out: { key: number; items: { layer: ArchLayer; li: number }[] }[] = []
  props.layers.forEach((layer, li) => {
    const key = layer.row ?? 1000 + li
    const last = out[out.length - 1]
    if (last && last.key === key) last.items.push({ layer, li })
    else out.push({ key, items: [{ layer, li }] })
  })
  return out
})

/** Which visual row each node sits in */
const rowOf = computed(() => {
  const m = new Map<string, number>()
  rows.value.forEach((r, ri) => r.items.forEach(({ layer }) => layer.nodes.forEach(n => m.set(n.id, ri))))
  return m
})

const nodeIndex = computed(() => {
  const m = new Map<string, { layer: number; node: ArchLayer['nodes'][number] }>()
  props.layers.forEach((l, li) => l.nodes.forEach(n => m.set(n.id, { layer: li, node: n })))
  return m
})

const selected = ref<string | null>(props.initial ?? null)
const hovered = ref<string | null>(null)
const focus = computed(() => hovered.value ?? selected.value)
const touches = (l: ArchLink, id: string | null) => !!id && (l[0] === id || l[1] === id)
const related = computed(() => {
  const s = new Set<string>()
  for (const l of props.links) if (touches(l, focus.value)) s.add(l[0] === focus.value ? l[1] : l[0])
  return s
})

const detail = computed(() => (selected.value ? nodeIndex.value.get(selected.value) : undefined))
const outgoing = computed(() =>
  props.links.filter(l => l[0] === selected.value).map(l => ({ title: nodeIndex.value.get(l[1])!.node.title, label: l[2] })),
)
const incoming = computed(() =>
  props.links.filter(l => l[1] === selected.value).map(l => ({ title: nodeIndex.value.get(l[0])!.node.title, label: l[2] })),
)

// ── connector geometry ──────────────────────────────────────────────────────
const wrap = ref<HTMLElement | null>(null)
const els = new Map<string, HTMLElement>()
const size = ref({ w: 0, h: 0 })
/** Below this width tiers stack and lines would cross cards, so lines are hidden */
const narrow = ref(false)
type Path = { key: string; link: ArchLink; d: string; P: number[] }
const paths = ref<Path[]>([])
let ro: ResizeObserver | null = null

function setEl(id: string, el: unknown) {
  if (el instanceof HTMLElement) els.set(id, el)
  else els.delete(id)
}

/** Point on a cubic bezier */
function at(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

function layout() {
  const w = wrap.value
  if (!w) return
  const box = w.getBoundingClientRect()
  size.value = { w: box.width, h: box.height }
  narrow.value = box.width < 640
  const out: Path[] = []
  for (const link of props.links) {
    const ra = els.get(link[0])?.getBoundingClientRect()
    const rb = els.get(link[1])?.getBoundingClientRect()
    if (!ra || !rb) continue
    const a = { l: ra.left - box.left, r: ra.right - box.left, t: ra.top - box.top, b: ra.bottom - box.top }
    const b = { l: rb.left - box.left, r: rb.right - box.left, t: rb.top - box.top, b: rb.bottom - box.top }
    const acy = (a.t + a.b) / 2
    const bcy = (b.t + b.b) / 2
    const gapX = Math.max(b.l - a.r, a.l - b.r)
    const sameRow = rowOf.value.get(link[0]) === rowOf.value.get(link[1])
    // start/end points on facing edges, plus the axis the line leaves/enters along
    let sx: number, sy: number, ex: number, ey: number, ux: number, uy: number
    if (Math.abs(acy - bcy) < Math.max(a.b - a.t, b.b - b.t) / 2 || (sameRow && gapX > 0 && Math.abs(acy - bcy) < gapX * 2.5)) {
      // side by side: leave/enter horizontally
      const right = a.r <= b.l
      ;[sx, sy, ex, ey, ux, uy] = [right ? a.r : a.l, acy, right ? b.l : b.r, bcy, right ? 1 : -1, 0]
    } else {
      // stacked: leave/enter vertically
      const down = acy < bcy
      ;[sx, sy, ex, ey, ux, uy] = [(a.l + a.r) / 2, down ? a.b : a.t, (b.l + b.r) / 2, down ? b.t : b.b, 0, down ? 1 : -1]
    }
    // straight stubs at both ends so the arrowhead sits squarely on the line
    const span = Math.abs(ux ? ex - sx : ey - sy)
    const stub = Math.min(12, span / 4)
    const x0 = sx + ux * stub, y0 = sy + uy * stub
    const x3 = ex - ux * stub, y3 = ey - uy * stub
    const h = (Math.abs(ux ? x3 - x0 : y3 - y0)) / 2
    const P = [x0, y0, x0 + ux * h, y0 + uy * h, x3 - ux * h, y3 - uy * h, x3, y3]
    const [, , x1, y1, x2, y2] = P
    out.push({
      key: `${link[0]}-${link[1]}`,
      link,
      d: `M ${sx} ${sy} L ${x0} ${y0} C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3} L ${ex} ${ey}`,
      P,
    })
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
watch(() => [props.layers, props.links], async () => {
  selected.value = props.initial ?? null
  await nextTick()
  layout()
})

const shown = computed(() =>
  narrow.value ? [] : focus.value ? paths.value.filter(p => touches(p.link, focus.value)) : paths.value,
)
/** Label positions: near the spread-out end so labels of converging lines don't collide */
const labels = computed(() => {
  const intoCount = new Map<string, number>()
  for (const p of shown.value) intoCount.set(p.link[1], (intoCount.get(p.link[1]) ?? 0) + 1)
  return shown.value
    // short links have no room for a label; the detail panel still lists it
    .filter(p => p.link[2] && Math.hypot(p.P[6] - p.P[0], p.P[7] - p.P[1]) > 70)
    .map(p => {
      const t = (intoCount.get(p.link[1]) ?? 0) > 1 ? 0.32 : 0.62
      const [x0, y0, x1, y1, x2, y2, x3, y3] = p.P
      return { key: p.key, text: p.link[2]!, x: at(t, x0, x1, x2, x3), y: at(t, y0, y1, y2, y3) }
    })
})
/** A layer's `hub` node sits on its own line above the rest */
function groupsOf(layer: ArchLayer) {
  const hub = layer.hub ? layer.nodes.find(n => n.id === layer.hub) : undefined
  return hub ? [[hub], layer.nodes.filter(n => n !== hub)] : [layer.nodes]
}
const dim = (id: string) => !!focus.value && focus.value !== id && !related.value.has(id)
</script>

<template>
  <div>
    <div ref="wrap" class="relative" @mouseleave="hovered = null">
      <!-- connectors -->
      <svg class="pointer-events-none absolute inset-0 z-20 overflow-visible" :width="size.w" :height="size.h" aria-hidden="true">
        <defs>
          <marker :id="`${uid}-arrow`" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" class="fill-sky-400" />
          </marker>
        </defs>
        <template v-for="p in shown" :key="p.key">
          <path
            :d="p.d"
            fill="none"
            :stroke-width="focus ? 1.75 : 1.25"
            :class="focus ? 'stroke-sky-400' : 'stroke-slate-400/40 dark:stroke-white/15'"
            :marker-end="focus ? `url(#${uid}-arrow)` : undefined"
          />
          <circle v-if="focus" r="3.5" class="sys-dot fill-sky-500 dark:fill-sky-300">
            <animateMotion :path="p.d" dur="1.8s" repeatCount="indefinite" keyPoints="0;0.94" keyTimes="0;1" calcMode="linear" />
          </circle>
        </template>
      </svg>

      <!-- link labels -->
      <div class="pointer-events-none absolute inset-0 z-30">
        <template v-for="lb in labels" :key="`l-${lb.key}`">
          <span
            v-if="focus"
            class="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 font-mono text-[10px] text-sky-700 shadow-sm ring-1 ring-sky-400/40 dark:bg-[#0b1220] dark:text-sky-300"
            :style="{ left: `${lb.x}px`, top: `${lb.y}px` }"
          >
            {{ lb.text }}
          </span>
        </template>
      </div>

      <!-- rows -->
      <div class="relative space-y-12">
        <div
          v-for="row in rows"
          :key="row.key"
          :class="[
            'grid gap-4',
            row.items.length > 1 ? 'grid-cols-1 md:grid-cols-[1.6fr_1fr]' : 'grid-cols-1',
          ]"
        >
          <div
            v-for="{ layer, li } in row.items"
            :key="layer.name"
            :class="['rounded-2xl p-3 ring-1', tone(li).box]"
          >
            <div :class="['mb-2.5 flex items-center gap-2 px-1 font-mono text-[10px] uppercase tracking-widest', tone(li).text]">
              <span :class="['h-1.5 w-1.5 rounded-full', tone(li).dot]" />
              {{ layer.name }}
            </div>
            <div class="flex flex-col gap-9">
            <div
              v-for="(group, gi) in groupsOf(layer)"
              :key="gi"
              :class="[
                'flex flex-wrap gap-2.5',
                layer.wide ? 'sm:gap-x-16' : '',
                layer.align === 'start' ? 'justify-center sm:justify-start sm:pl-6' : 'justify-center',
              ]"
            >
              <button
                v-for="n in group"
                :key="n.id"
                :ref="el => setEl(n.id, el)"
                type="button"
                :class="[
                  'relative z-10 min-w-[9rem] flex-1 basis-[9rem] rounded-xl bg-white px-3.5 py-2.5 text-left ring-1 transition duration-300 sm:flex-none dark:bg-[#121a2b]',
                  selected === n.id ? ['ring-2 shadow-lg', tone(li).ring] : 'ring-slate-900/10 hover:ring-slate-900/25 dark:ring-white/10 dark:hover:ring-white/25',
                ]"
                @mouseenter="hovered = n.id"
                @focus="hovered = n.id"
                @blur="hovered = null"
                @click="selected = selected === n.id ? null : n.id"
              >
                <span :class="['block transition-opacity duration-300', dim(n.id) ? 'opacity-40' : '']">
                  <span class="flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <span :class="['h-2 w-2 shrink-0 rounded-sm', tone(li).dot]" />
                    {{ n.title }}
                  </span>
                  <span v-if="n.tech?.[0]" class="mt-0.5 block pl-4 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                    {{ n.tech[0] }}
                  </span>
                </span>
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- detail panel -->
    <div class="mt-8 min-h-[8rem] rounded-2xl bg-slate-900/[0.03] p-5 ring-1 ring-slate-900/5 dark:bg-white/[0.03] dark:ring-white/10">
      <Transition name="sys-fade" mode="out-in">
        <div v-if="detail" :key="selected!">
          <div class="flex flex-wrap items-center gap-2">
            <span :class="['font-mono text-[10px] uppercase tracking-widest', tone(detail.layer).text]">{{ layers[detail.layer].name }}</span>
            <span class="text-slate-400">/</span>
            <h3 class="text-base font-semibold tracking-tight">{{ detail.node.title }}</h3>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{{ detail.node.detail }}</p>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span v-for="t in detail.node.tech ?? []" :key="t" class="tag-chip">{{ t }}</span>
          </div>
          <div v-if="incoming.length || outgoing.length" class="mt-4 grid gap-2 text-xs text-slate-600 sm:grid-cols-2 dark:text-slate-300">
            <div v-if="incoming.length">
              <div class="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">Receives from</div>
              <div v-for="c in incoming" :key="c.title">← {{ c.title }}<span v-if="c.label" class="text-slate-400"> · {{ c.label }}</span></div>
            </div>
            <div v-if="outgoing.length">
              <div class="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">Sends to</div>
              <div v-for="c in outgoing" :key="c.title">→ {{ c.title }}<span v-if="c.label" class="text-slate-400"> · {{ c.label }}</span></div>
            </div>
          </div>
        </div>
        <p v-else key="hint" class="text-sm text-slate-500 dark:text-slate-400">
          Select a component to trace its connections and see what it does.
        </p>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.sys-dot {
  filter: drop-shadow(0 0 4px rgb(56 189 248 / 0.9));
}
.sys-fade-enter-active, .sys-fade-leave-active { transition: opacity 0.18s ease; }
.sys-fade-enter-from, .sys-fade-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .sys-dot { display: none; }
}
</style>
