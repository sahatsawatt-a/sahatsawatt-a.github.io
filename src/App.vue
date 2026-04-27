<!-- src/App.vue -->
<script setup>
import MainLayout from './layouts/MainLayout.vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
