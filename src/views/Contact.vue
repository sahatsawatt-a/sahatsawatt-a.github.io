<template>
  <section class="page">
    <h1>📬 Contact Me</h1>
    <div class="card">
      <p>If you'd like to connect, collaborate, or just say hi, feel free to reach out via any of the following:</p>
      <ul class="contact-list">
        <li><strong>Email:</strong> <a href="mailto:sahatsawatt.a@outlook.com">sahatsawatt.a@outlook.com</a></li>
      </ul>
    <p>I'm always open to learning new things, discussing projects, or exploring new ideas!</p>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  line-height: 1.8;
  color: #1f2937;
}

.contact-section h1 {
  font-size: 2rem;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.contact-section p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.contact-list li  {
  margin-bottom: 0.8rem;
  font-size: 1rem;
  position: relative;
  padding-left: 1.2rem;
}

.contact-list li:before  {
  content: "•";
  color: #93c5fd;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.contact-list a {
  color: #2563eb;
  text-decoration: none;
}

.contact-list a:hover {
  text-decoration: underline;
}
</style>
