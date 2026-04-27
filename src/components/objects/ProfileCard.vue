<script setup lang="ts">
import { info } from "@/data/index"
import ProfileImage from "@/components/ui/ProfileImage.vue"

defineProps<{
  onClick?: () => void
}>()
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="shrink-0 cursor-pointer" @click="onClick">
      <ProfileImage
        class="flex size-13 items-center justify-center rounded-2xl bg-white/80 shadow-md ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-700/80 hover:shadow-red-700 "
      />
    </div>

    <div class="space-y-0.5">
      <p class="text-sm font-medium tracking-[0.2em] text-slate-600 dark:text-slate-300">
        {{ info.full_name }} ({{ info.nickname }})
      </p>

      <p class="text-xs text-slate-500 dark:text-slate-400">
        {{ info.tagline }}
      </p>
    </div>
  </div>
</template>