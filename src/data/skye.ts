// src/data/profile.ts

export const info = {
  profileImage: "/profile_pic.jpg",
  full_name: "Sahatsawatt A.",
  nickname: "Guy",
  tagline: "Agentic AI · Automation Workflow",
};

export const hero = {
  status: {
    state: "closed",
    message: "Currently building Agentic AI Workflow",
  },
  heroTitle: {
    full: "Designs systems and builds Automation and Agentic AI.",
    highlight: ["Systems", "Automation", "Agentic AI"],
  },
  description:
    "I improve system workflows through automation, integration design, and a deep understanding of how systems behave in real environments.",
};

export const exp = {
  items: [
    {
      exp_id: 2,
      role: "Agentic AI Developer",
      company: "Avalant",
      start_date: "16/03/2026",
      end_date: "",
      summary: [],
    },
    {
      exp_id: 1,
      role: "System Analyst",
      company: "Cartrack Technologies (Thailand)",
      start_date: "13/08/2024",
      end_date: "13/03/2026",
      summary: [
        "Gather requirements from stakeholders and translate API documentation into clear developer-ready specifications, delivering 6 successful API integrations.",
        "Perform end-to-end issue analysis using deductive reasoning and hypothesis testing with infrastructure and engineering teams to resolve production and customer-facing issues.",
        "Build automation workflows using n8n, Apache Airflow and bash script to reduce manual operations and improve response time.",
        "Develop ETL pipelines for the debt collection team to improve data accuracy, reduce support investigation time, and enable 100% outreach to clients with outstanding debt.",
      ],
    },
  ],
};

export const projects = {
    items: [
      {
        proj_id: 1,
        proj_name: "Debtor Lead Automation",
        description: "Automates lead data transformation and uploading into ViciDial with validation, reporting, and failover logic.",
        tools: ["Airflow", "PostgreSQL", "ViciDial API"],
        prog_langs: ["Python", "SQL"],
        exp_id: 1
      }
    ]
};

export const about = {
  title: "About",
  body: [
    `I’m a system analyst who thrives on breaking down complex requirements, clarifying vague problems, and translating them into structured, workable inputs for engineering teams. I focus on understanding system behavior, data flow, and where integrations typically fail under real-world conditions.`,
    `I analyze existing systems, generate practical integration ideas, and translate API documentation into clear, developer-friendly explanations that help engineers build solutions faster and with fewer misunderstandings.`,
    `When issues surface, I act as the first line of technical investigation by reproducing client-side problems, isolating root causes, and escalating only validated backend concerns. In parallel, I continuously explore new technologies and I am currently learning to deploy local AI models and build agentic AI to enhance my workflow and automation capabilities.`,
  ],
};

export const skills = {
  coreTitle: "Core Skills",
  technicalTitle: "Technical",
  interestsTitle: "Interests",
  core: [
    { icon: "🧠", label: "System Analysis" },
    { icon: "🔌", label: "API Integration" },
    { icon: "📝", label: "Requirement Gathering" },
    { icon: "🕵️", label: "Root Cause Analysis & Debugging" },
    { icon: "⚡", label: "Workflow Automation" },
    { icon: "📈", label: "ETL Pipelines" },
    { icon: "👨🏻‍💼", label: "Agentic AI" },
  ],
  technical: [
    { icon: "🖥️", label: "Laravel · PHP" },
    { icon: "🎨", label: "Vue 3 · Vite" },
    { icon: "🐍", label: "Python" },
    { icon: "🗃️", label: "PostgreSQL · MySQL" },
    { icon: "🐳", label: "Docker · Traefik" },
    { icon: "🔄", label: "n8n · Airflow" },
    { icon: "🤖", label: "Ollama" },
  ],
  interests: [
    { icon: "🌍", label: "System Integration" },
    { icon: "🛰️", label: "Embedded System" },
    { icon: "🏭", label: "Industrial Internet of Things" },
    { icon: "🚀", label: "Robotics and Autonomous Systems" },
    { icon: "🤖", label: "AI" },
  ],
};




export const contact = {
  title: "Contact",
  intro:
    "If you’d like help analysing a system, designing an integration, or automating a workflow, feel free to reach out.",
  email: {
    label: "Email",
    value: "sahatsawatt.a@outlook.com",
  },
  // github: {
  //     label: 'GitHub',
  //     handle: '@sahatsawatt-a',
  //     url: 'https://github.com/sahatsawatt-a',
  // },
};

export const footer = {
  text: "© 2025 Sahatsawatt Anankatham · Portfolio",
};
