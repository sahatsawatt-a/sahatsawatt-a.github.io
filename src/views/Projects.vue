<template>
  <section class="page">
    <h1>My Projects</h1>
    <p class="section-subtitle">A collection of things I've built and contributed to.</p>

    <div class="grid-layout">
      <div class="card" v-for="project in projects" :key="project.title">
        <h2 class="card-title">{{ project.title }}</h2>
        <p class="card-desc">{{ project.description }}</p>
        <router-link class="card-link" :to="`/projects/${project.slug}`">View Project →</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'ETL Lead Automation',
    slug: 'etl-lead-automation',
    description: 'Airflow-based pipeline for ViciDial lead upload, transforming campaign data.'
  },
  {
    title: 'Smart Gardening System',
    slug: 'smart-gardening',
    description: 'An Arduino-based automatic irrigation system with sensor-driven logic.'
  },
  {
    title: 'Debt Collection Chatbot',
    slug: 'debt-collection-bot',
    description: 'A WhatsApp bot built with GoLang that assists with customer responses.'
  },
  {
    title: 'Restaurant Ordering SPA',
    slug: 'restaurant-ordering',
    description: 'A Vue + Laravel project for online menu browsing and order placement.'
  },
]
</script>
  