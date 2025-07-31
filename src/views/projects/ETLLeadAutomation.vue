<template>
  <h1>ETL Lead Automation</h1>

  <img src="/src/assets/img/DLA_Diagram.jpg" alt="">
  <p>
    This project uses Apache Airflow to automate lead data transformation and uploading into ViciDial.
    It streamlines manual ETL tasks, ensures accurate lead delivery, and includes failover logic.
  </p>

  <h2>🎯 Purpose</h2>
  <ul>
    <li>Automate the selection of debtors based on campaign rules</li>
    <li>Transform and validate lead data</li>
    <li>Upload to ViciDial via its API</li>
    <li>Export summary to Excel for reporting or audit</li>
    <li>Notify stakeholders via email</li>
  </ul>

  <h2>⚙️ Programming Language</h2>
  <ul>
    <li>Python</li>
    <li>SQL</li>
  </ul>

  <h2>🤖 Tech Stack </h2>
  <ul>
    <li>Apache Airflow</li>
  </ul>

  <h2>📌 Features</h2>
  <ul>
    <li>Multiple campaigns per region (TH, ID, MY, PH)</li>
    <li>Grouped call frequency rules (e.g. avoid duplicate uploads)</li>
    <li>Flexible toggle for dry-run and upload</li>
    <li>Built-in feedback loop that compares system output with current ViciDial data</li>
    <li>Automatically adjusts logic if changes are detected in ViciDial's state</li>
    <li>Ensures consistent and accurate lead delivery over time</li>
  </ul>

  <h2>🧠 Concept Used</h2>
  <ul>
    <li>Object-Oriented Programming (OOP)</li>
  </ul>

  <h2>🌟 Feedback</h2>
  <ul>
    <li>
        <p>
          <i>"Our agents have successfully contacted 100% of users with outstanding debt."</i>
        </p>
    </li>
  </ul>


  <router-link to="/projects" class="back">← Back to Projects</router-link>
</template>
