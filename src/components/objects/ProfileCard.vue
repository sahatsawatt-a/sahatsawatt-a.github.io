<script setup lang="ts">
import { info } from '@/data/index'

defineProps<{
  onClick?: () => void
}>()
</script>

<template>
  <div
    class="glass gradient-border lift flex items-center gap-3 rounded-2xl p-3"
    :class="onClick ? 'cursor-pointer' : ''"
    @click="onClick?.()"
  >
    <span
      class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-400/40 via-fuchsia-400/30 to-sky-400/40 text-base font-semibold ring-1 ring-inset ring-white/30"
      aria-hidden="true"
    >
      {{ info.initials }}
    </span>

    <div class="leading-tight">
      <p class="text-sm font-semibold">
        {{ info.full_name }}
        <span class="text-slate-500 dark:text-slate-400">
          ({{ info.nickname }})
        </span>
      </p>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        {{ info.tagline }}
      </p>
    </div>
  </div>
</template>
