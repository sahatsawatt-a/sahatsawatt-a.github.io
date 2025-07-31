<template>
    <h1>Smart Gardening System</h1>
    <p>
      This project automates irrigation by using soil moisture sensors to control AC-powered pumps via a solid-state relay (SSR).
      It is designed to integrate safely with home electrical systems and can be monitored via an optional dashboard.
    </p>

    <h2>🎯 Purpose</h2>
    <ul>
      <li>Automate irrigation based on real-time soil moisture levels</li>
      <li>Enable safe integration of AC-powered pumps for home gardens</li>
      <li>Reduce water waste and improve plant health through consistent care</li>
    </ul>

    <h2>⚙️ Programming Language</h2>
    <ul>
      <li>Arduino C++ (for sensor logic and relay control)</li>
      <!-- <li>Optional: Python or JavaScript (for dashboard/monitoring)</li> -->
    </ul>

    <h2>🤖 Tech Stack</h2>
    <ul>
      <li>Arduino UNO / ESP32</li>
      <li>Soil Moisture Sensors</li>
      <li>Solid-State Relay (SSR)</li>
      <li>AC Water Pump (home electric supply)</li>
      <!-- <li>Optional: Web dashboard with Flask or Vue</li> -->
    </ul>

    <h2>📌 Features</h2>
    <ul>
      <li>Safe switching of AC pump using SSR controlled by Arduino</li>
      <li>Watering triggers based on calibrated soil moisture thresholds</li>
      <li>Modular design for multiple plants/zones</li>
      <!-- <li>Optional dashboard for monitoring sensor data and manual control</li> -->
    </ul>

    <!-- <h2>🧠 Concept Used</h2>
    <ul>
      <li>Sensor data acquisition and threshold logic</li>
      <li>Solid-state switching of AC power (relay as electrical gate)</li>
      <li>Safe low-voltage microcontroller triggering high-voltage devices</li>
      <li>IoT and embedded automation concepts</li>
    </ul> -->

    <router-link to="/projects" class="back">← Back to Projects</router-link>
</template>
