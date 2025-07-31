<template>
  <section class="page">
    <h1>About Me</h1>
    
    <p class="section-subtitle">
      A glimpse into my journey—combining analytical thinking with hands-on creativity across software, systems, and automation.
    </p>


    <div class="skills card">
      <h2>What I Do</h2>
      <ul>
        <li>✅ Build full-stack apps with Vue, Laravel, and SQL</li>
        <li>🧠 Automate workflows with Python & Airflow</li>
        <li>📊 Analyze systems, APIs, and user requirements</li>
        <li>🤖 Tinker with Arduino & smart automation</li>
      </ul>
    </div>

    <div class="timeline card">
      <h2>🕒 Timeline</h2>
      <ul class="timeline-list">
        <li>
          <div class="dot"></div>
          <div class="timeline-content">
            <h3>2024 – Present</h3>
            <p><strong>System Analyst</strong> – Cartrack Technologies</p>
            <p>API troubleshooting, internal automation, and DevOps with Docker & Airflow.</p>
          </div>
        </li>
        <li>
          <div class="dot"></div>
          <div class="timeline-content">
            <h3>2019 – 2024</h3>
            <p><strong>BBA</strong> – Assumption University of Thailand</p>
            <p>Major in Management Information System (MIS), Minor in Accounting (ACT).</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="interests card">
      <h2>🎯 My Interests</h2>
      <ul>
        <li>🌱 IoT and Smart Gardening</li>
        <li>🧪 Robotics </li>
        <li>📈 Data-driven automation</li>
        <li>🚀 Building useful tools from scratch</li>
      </ul>
    </div>
  </section>
</template>


<style scoped>


.nickname {
  color: #6b7280;
  font-style: italic;
}


/* Timeline Section */
.timeline-list {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  border-left: 3px solid #93c5fd;
  margin-left: 1rem;
}

.timeline-list li {
  position: relative;
  padding: 1rem 1rem 1rem 2rem;
  margin-bottom: 2rem;
}

.timeline-list .dot {
  width: 14px;
  height: 14px;
  background-color: #2563eb;
  border: 3px solid white;
  border-radius: 50%;
  position: absolute;
  left: -10px;
  top: 1.1rem;
  box-shadow: 0 0 0 2px #93c5fd;
}

.timeline-content h3 {
  margin: 0 0 0.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: #6b7280;
}

.timeline-content p {
  margin: 0.2rem 0;
  font-size: 0.95rem;
  color: #1f2937;
  line-height: 1.6;
}

.timeline-content p strong {
  color: #1e3a8a;
}

</style>
