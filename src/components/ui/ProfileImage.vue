<script setup lang="ts">
// Profile photo at the right resolution for where it's shown.
// Variants are imported (not in /public) so Vite gives them content-hashed
// URLs: they change only when the image does, which makes them safe to cache.
import p96 from '@/assets/profile/profile-96.webp'
import p192 from '@/assets/profile/profile-192.webp'
import p384 from '@/assets/profile/profile-384.webp'
import p768 from '@/assets/profile/profile-768.webp'

const props = withDefaults(
  defineProps<{
    /** Largest width (CSS px) the image is displayed at — picks the variant */
    size: number
    alt?: string
    /** Above the fold: load immediately and with high priority */
    eager?: boolean
  }>(),
  { alt: 'Profile picture', eager: false },
)

const srcset = `${p96} 96w, ${p192} 192w, ${p384} 384w, ${p768} 768w`
// smallest variant that still looks sharp on a 2x screen
const fallback = props.size * 2 <= 192 ? p192 : props.size * 2 <= 384 ? p384 : p768
</script>

<template>
  <img
    :src="fallback"
    :srcset="srcset"
    :sizes="`${size}px`"
    :width="size"
    :height="size"
    :alt="alt"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : 'auto'"
    decoding="async"
  />
</template>
