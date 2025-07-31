<template>
  <section class="page">
    <h1>Learning Topics</h1>
    <p class="section-subtitle">A collection of topic I've learned.</p>

    <div class="grid-layout">
      <div class="card" v-for="topic in topics" :key="topic.title">
        <h2 class="card-title">{{ topic.name }}</h2>
        <router-link class="card-link" :to="`/topics/${topic.slug}`">View Topic →</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
const topics = [
  {
    name: 'Central pattern generators (CPGs)',
    slug: 'central-pattern-generators',
  }
]
</script>
  