// src/data/index.ts
// Single source of truth for all portfolio content.
// Structural shape follows skye.ts (structured dates, typed status, relational IDs).
// Project detail depth follows profile.ts (slug, template, img, purpose, features).

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HeroStatus {
  state: 'open' | 'closed'
  message: string
}

export interface HeroTitle {
  full: string
  highlight: string[]
}

export interface QuickCard {
  label: string
  value: string
}

export interface SkillItem {
  icon: string
  label: string
}

export interface Experience {
  exp_id: number
  role: string
  company: string
  /** DD/MM/YYYY */
  start_date: string
  /** DD/MM/YYYY — empty string means Present */
  end_date: string
  summary: string[]
}

export interface Project {
  proj_id: number
  /** URL slug for the detail page route */
  slug: string
  /** Selects which detail template to render */
  template: 'etl' | 'default'
  /** Show in the homepage highlight grid */
  highlight: boolean
  title: string
  description: string
  tags: string[]
  tools: string[]
  prog_langs: string[]
  img?: string
  /** Links this project to an experience entry */
  exp_id?: number
  impact?: string[]
  purpose?: string[]
  features?: string[]
  packages?: string[]
  feedback?: string
}

export interface ContactLink {
  label: string
  value: string
  url?: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const info = {
  profileImage: '/profile_pic.jpg',
  full_name: 'Sahatsawatt Anankatham',
  nickname: 'Guy',
  initials: 'SA',
  tagline: 'Agentic AI · Automation Workflow',
}

export const hero = {
  status: {
    state: 'closed',
    message: 'Currently building Agentic AI Workflow',
  } as HeroStatus,
  heroTitle: {
    full: 'Designs systems and builds Automation and Agentic AI.',
    highlight: ['Systems', 'Automation', 'Agentic AI'],
  } as HeroTitle,
  description:
    'I improve system workflows through automation, integration design, and a deep understanding of how systems behave in real environments.',
  quickCards: [
    { label: 'Core', value: 'System Analysis · Integrations' },
    { label: 'Automation', value: 'n8n · Airflow · ETL' },
    { label: 'Tech', value: 'Laravel · Vue · Python' },
    { label: 'Data', value: 'PostgreSQL · MySQL' },
  ] as QuickCard[],
}

export const about = {
  title: "About Me",
  body: [
    `I'm a system analyst who thrives on breaking down complex requirements, clarifying vague problems, and translating them into structured, workable inputs for engineering teams. I focus on understanding system behavior, data flow, and where integrations typically fail under real-world conditions.`,
    `I analyze existing systems, generate practical integration ideas, and translate API documentation into clear, developer-friendly explanations that help engineers build solutions faster and with fewer misunderstandings.`,
    `When issues surface, I act as the first line of technical investigation by reproducing client-side problems, isolating root causes, and escalating only validated backend concerns. In parallel, I continuously explore new technologies and I am currently learning to deploy local AI models and build agentic AI to enhance my workflow and automation capabilities.`,
  ],
}

export const skills = {
  core: [
    { icon: '🧠', label: 'System Analysis' },
    { icon: '🔌', label: 'API Integration' },
    { icon: '📝', label: 'Requirement Gathering' },
    { icon: '🕵️', label: 'Root Cause Analysis & Debugging' },
    { icon: '⚡', label: 'Workflow Automation' },
    { icon: '📈', label: 'ETL Pipelines' },
    { icon: '👨🏻‍💼', label: 'Agentic AI' },
  ] as SkillItem[],
  technical: [
    { icon: '🖥️', label: 'Laravel · PHP' },
    { icon: '🎨', label: 'Vue 3 · Vite' },
    { icon: '🐍', label: 'Python' },
    { icon: '🗃️', label: 'PostgreSQL · MySQL' },
    { icon: '🐳', label: 'Docker · Traefik' },
    { icon: '🔄', label: 'n8n · Airflow' },
    { icon: '🤖', label: 'Ollama' },
  ] as SkillItem[],
  interests: [
    { icon: '🌍', label: 'System Integration' },
    { icon: '🛰️', label: 'Embedded System' },
    { icon: '🏭', label: 'Industrial Internet of Things' },
    { icon: '🚀', label: 'Robotics and Autonomous Systems' },
    { icon: '🤖', label: 'AI' },
  ] as SkillItem[],
}

export const experiences: Experience[] = [
  {
    exp_id: 2,
    role: 'Agentic AI Engineer',
    company: 'Avalant',
    start_date: '16/03/2026',
    end_date: '',
    summary: [],
  },
  {
    exp_id: 1,
    role: 'System Analyst',
    company: 'Cartrack Technologies (Thailand)',
    start_date: '13/08/2024',
    end_date: '13/03/2026',
    summary: [
      'Gather requirements from stakeholders and translate API documentation into clear developer-ready specifications, delivering 6 successful API integrations.',
      'Perform end-to-end issue analysis using deductive reasoning and hypothesis testing with infrastructure and engineering teams to resolve production and customer-facing issues.',
      'Build automation workflows using n8n, Apache Airflow and bash script to reduce manual operations and improve response time.',
      'Develop ETL pipelines for the debt collection team to improve data accuracy, reduce support investigation time, and enable 100% outreach to clients with outstanding debt.',
    ],
  },
]

export const projects: Project[] = [
  {
    proj_id: 1,
    slug: 'etl-lead-automation',
    template: 'etl',
    highlight: true,
    title: 'ETL Lead Automation',
    description:
      'Automated an end-to-end ETL pipeline that processes and uploads lead data into ViciDial, eliminating manual work and improving data reliability.',
    tags: ['Apache Airflow', 'Python', 'SQL'],
    tools: ['Airflow', 'PostgreSQL', 'ViciDial API'],
    prog_langs: ['Python', 'SQL'],
    img: '/DLA_Diagram.jpg',
    exp_id: 1,

    impact: [
      'Achieved 100% contact coverage for targeted debtors',
      'Reduced manual data processing and upload effort',
      'Improved data accuracy and consistency across campaigns',
    ],

    purpose: [
      'Automate debtor selection based on campaign rules',
      'Transform and validate lead data before upload',
      'Integrate seamlessly with ViciDial via API',
      'Generate audit-ready Excel reports',
      'Notify stakeholders with automated alerts',
      'Enable easy deployment across multiple countries',
    ],

    features: [
      'Call frequency control to prevent duplicate uploads',
      'Dry-run mode for safe testing before execution',
      'Feedback loop comparing pipeline output with live ViciDial data',
      'Adaptive logic that responds to ViciDial state changes',
    ],

    packages: ['numpy', 'pandas'],
    feedback:
      'Enabled agents to consistently reach all targeted users with outstanding debt.',
  },

  {
    proj_id: 2,
    slug: 'internal-automation-tools',
    template: 'etl',
    highlight: true,
    title: 'Internal Automation Tools',
    description:
      'Built a suite of internal tools to automate support workflows, reduce manual tasks, and accelerate incident investigation.',
    tags: ['n8n', 'Bash', 'SQL', 'JavaScript'],
    tools: ['n8n', 'Bash'],
    prog_langs: ['SQL', 'JavaScript'],
    exp_id: 1,

    impact: [
      'Reduced repetitive manual work for support teams',
      'Improved incident investigation speed and accuracy',
      'Enabled self-service tools for non-technical users',
    ],

    purpose: [
      'Automate log analysis and highlight relevant insights',
      'Provide self-service reporting tools for support teams',
      'Simplify complex ViciDial configuration workflows',
      'Detect and notify critical data changes early',
    ],

    features: [
      'Log parser that extracts key events and summarizes issues',
      'Self-service report system with validation and API integration',
      'Guided configuration tool for ViciDial setup via forms',
      'Automated monitoring and alerting for sensitive data changes',
    ],
  },

  {
    proj_id: 3,
    slug: 'restaurant-ordering-system',
    template: 'default',
    highlight: false,
    title: 'Restaurant Ordering System',
    description:
      'Developed a QR-based ordering system that improves customer experience and streamlines restaurant operations.',
    tags: ['Laravel', 'Vue', 'TypeScript', 'QR Code'],
    tools: ['Laravel', 'Vue 3'],
    prog_langs: ['PHP', 'TypeScript'],

    impact: [
      'Reduced customer wait times through self-service ordering',
      'Improved order accuracy with automated pricing',
      'Provided real-time operational insights for management',
    ],

    purpose: [
      'Enable QR-based self-service ordering',
      'Provide real-time order tracking and editing',
      'Ensure accurate and automated pricing calculation',
      'Deliver analytics dashboards for business insights',
    ],

    features: [
      'QR code ordering interface for customers',
      'Real-time order tracking and item updates',
      'Automated pricing and order validation',
      'Dashboard for sales and inventory analysis',
      'Optimized backend for smooth and scalable operations',
    ],
  },
];

export const contact = {
  intro: "If you'd like help analysing a system, designing an integration, or automating a workflow, feel free to reach out.",
  links: [
    { label: 'Email', value: 'sahatsawatt.a@outlook.com', url: 'mailto:sahatsawatt.a@outlook.com' },
    { label: 'GitHub', value: '@sahatsawatt-a', url: 'https://github.com/sahatsawatt-a' },
  ] as ContactLink[],
}

export const footer = {
  text: '© 2025 Sahatsawatt Anankatham · Portfolio',
}
