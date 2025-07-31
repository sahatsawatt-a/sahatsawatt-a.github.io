<template>
  <footer class="site-footer">
    <div class="footer-content">
      <p>&copy; {{ year }} Skye Profile. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
