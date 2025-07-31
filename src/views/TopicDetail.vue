<template>
  <div class="detail-wrapper">
    <aside class="sidebar">
      <h2>All Topics</h2>
      <ul>
        <li><router-link to="/topics/central-pattern-generators">Central pattern generators (CPGs)</router-link></li>
      </ul>
    </aside>

    <main class="main-panel">
      <div class="detail-content" v-if="topicComponent">
        <component :is="topicComponent" />
      </div>

      <div v-else class="detail-content">
        <h1>Topic Not Found</h1>
        <router-link class="back-link" to="/topics">← Back to Topics</router-link>
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const topicComponent = ref<any>(null)

const components: Record<string, () => Promise<any>> = {
  'central-pattern-generators': () => import('./topics/CentralPatternGenerators.vue'),
}

function loadComponent(slug: string) {
  topicComponent.value = components[slug]
    ? defineAsyncComponent(components[slug])
    : null
}

// Initial load
loadComponent(route.params.slug as string)

// Watch for slug changes (when clicking sidebar links)
watch(
  () => route.params.slug,
  (newSlug) => {
    loadComponent(newSlug as string)
  }
)
</script>
