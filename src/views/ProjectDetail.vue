<template>
  <div class="detail-wrapper">
    <aside class="sidebar">
      <h2>All Projects</h2>
      <ul>
        <li><router-link to="/projects/etl-lead-automation">🔄 ETL Lead Automation</router-link></li>
        <li><router-link to="/projects/smart-gardening">🌿 Smart Gardening</router-link></li>
        <li><router-link to="/projects/debt-collection-bot">🤖 Debt Collection Bot</router-link></li>
        <li><router-link to="/projects/restaurant-ordering">🍽 Restaurant Ordering SPA</router-link></li>
      </ul>
    </aside>

    <main class="main-panel">
      <div class="detail-content" v-if="projectComponent">
        <component :is="projectComponent" />
      </div>

      <div v-else class="detail-content">
        <h1>Project Not Found</h1>
        <router-link class="back-link" to="/projects">← Back to Projects</router-link>
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectComponent = ref<any>(null)

const components: Record<string, () => Promise<any>> = {
  'etl-lead-automation': () => import('./projects/ETLLeadAutomation.vue'),
  'smart-gardening': () => import('./projects/SmartGardening.vue'),
  'debt-collection-bot': () => import('./projects/DebtCollectionBot.vue'),
  'restaurant-ordering': () => import('./projects/RestaurantOrdering.vue'),
}

function loadComponent(slug: string) {
  projectComponent.value = components[slug]
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
