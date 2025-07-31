<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import './assets/styles/global.css'
</script>

<template>
  <div class="app-wrapper">
    <Header />
    <main class="page-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
