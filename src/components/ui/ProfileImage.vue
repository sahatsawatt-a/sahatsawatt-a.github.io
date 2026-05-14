<script setup lang="ts">
import { info } from '@/data/index'

withDefaults(
  defineProps<{
    alt?: string
  }>(),
  { alt: 'Profile picture' },
)
</script>

<template>
  <img
    :src="info.profileImage"
    :alt="alt"
    class="rounded-2xl object-cover ring-1 ring-white/10"
  />
</template>
