<script setup>
import { footer } from '@/data/index'

</script>

<template>
  <footer
    class="border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400"
  >
    {{ footer.text }}
  </footer>
</template>