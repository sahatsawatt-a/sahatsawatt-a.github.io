<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useReveal } from './composables/useReveal'

useReveal()

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
