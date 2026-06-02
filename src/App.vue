<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue'
import { RouterView } from 'vue-router'
import { useReveal } from './composables/useReveal'

useReveal()
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
