<template>
  <section class="page">
    <h1 class="section-title">👋 Welcome!</h1>
    <p class="section-subtitle decorated-intro">
      Hi, my name is <strong>Guy</strong> — a curious system analyst and hands-on full-stack developer. Whether it's crafting smart tools, automating the tedious, or turning wild ideas into reality, I thrive at the intersection of <span class="highlight">logic</span> and <span class="highlight">creativity</span>.
    </p>

    <div class="grid-layout">
      <div class="card">
        <h2 class="card-title">📚 Topics</h2>
        <p class="card-desc">Technical topics I’ve explored and documented along the way.</p>
        <router-link class="card-link" to="/topics">Learn More →</router-link>
      </div>

      <div class="card">
        <h2 class="card-title">💡 Projects</h2>
        <p class="card-desc">My real-world coding, robotics, and automation work.</p>
        <router-link class="card-link" to="/projects">View Projects →</router-link>
      </div>

      <div class="card">
        <h2 class="card-title">📄 CV</h2>
        <p class="card-desc">An overview of my background, work, and experiences.</p>
        <router-link class="card-link" to="/cv">See My CV →</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// Nothing needed yet
</script>
