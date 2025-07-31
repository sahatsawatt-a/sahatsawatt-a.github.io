<template>
  <header class="app-header">
    <nav class="nav-bar" aria-label="Main navigation">
      <div class="logo">
        <router-link to="/">
          Sahatsawatt <span class="accent">A.</span>
        </router-link>
      </div>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        ☰
      </button>

      <ul class="nav-links" :class="{ open: isMenuOpen }">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/topics">Topics</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
