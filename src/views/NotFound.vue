<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <router-link to="/" class="home-link">Go back home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1rem;
  max-width: 600px;
  margin: 0 auto;
  color: #1f2937;
}

.not-found h1 {
  font-size: 6rem;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.not-found p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.home-link:hover {
  background-color: #1e3a8a;
}
</style>
