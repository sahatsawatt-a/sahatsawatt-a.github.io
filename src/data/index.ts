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
  icon: string
  label: string
  value: string
  /** Tailwind gradient classes for the icon tile (e.g. 'from-violet-400/40 to-sky-400/40'). */
  accent: string
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
  /** DD/MM/YYYY format. Empty string means Present */
  end_date: string
  summary: string[]
  /** Internal tools / services built during this role. Rendered as flat chips on /experience. */
  tools_built?: string[]
}

export interface Project {
  proj_id: number
  /** URL slug for the detail page route */
  slug: string
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
  /** Overrides the company/attribution label when no exp_id applies (e.g. "University Project"). */
  org?: string
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
    state: 'open',
    message: 'Open to work · Currently building Agentic AI Workflow',
  } as HeroStatus,
  heroTitle: {
    full: 'Designs systems. Builds Automation & Agentic AI.',
    highlight: ['systems', 'Automation', 'Agentic AI'],
  } as HeroTitle,
  description:
    'I turn ML/CV research into production pipelines, OCR services, and agentic workflows other teams can rely on day to day.',
  quickCards: [
    {
      icon: '🧠',
      label: 'Core',
      value: 'ML/CV · System Analysis',
      accent: 'from-emerald-400/40 to-teal-400/40',
    },
    {
      icon: '👁️',
      label: 'Vision',
      value: 'YOLO · DINOv2 · OCR',
      accent: 'from-violet-400/40 to-fuchsia-400/40',
    },
    {
      icon: '⚙️',
      label: 'Stack',
      value: 'Python · FastAPI · Vue 3',
      accent: 'from-sky-400/40 to-blue-400/40',
    },
    {
      icon: '🗄️',
      label: 'Data',
      value: 'Milvus · PostgreSQL',
      accent: 'from-amber-400/40 to-orange-400/40',
    },
  ] as QuickCard[],
}

export const about = {
  title: "About Me",
  body: [
    `I build automation pipelines around ML and computer vision models. I take research tools like YOLO detectors, DINOv2 embeddings, and OCR engines and turn them into FastAPI services, CLI tools, and Docker-based pipelines that other teams can use directly in their own workflows.`,
    `I started my career as a system analyst, so I think about ML systems the same way I think about any integration. Where does the data come from? Where can it break? What is the fallback when a model is not confident? This way of thinking shapes every pipeline I build. Most of the time, I prefer multi-strategy approaches (for example, embedded extraction first, then YOLO detection, then Hough-Circle as a fallback) instead of relying on only one model.`,
    `I also test and verify the data at every step of a pipeline. A model running without error does not always mean the output is correct, so I check the results against expected behaviour before passing them on. This way, other teams can rely on the data without having to clean or debug it first.`,
    `Right now, my main focus is visual retrieval and document understanding. I combine DINOv2 embeddings with CIE L*a*b* colour histograms to do material-aware image similarity, set up Thai-aware OCR stacks (Tesseract, EasyOCR, and Typhoon), and package everything as microservices. At the same time, I am also exploring agentic AI patterns so these pipelines can run by themselves instead of waiting for an orchestrator.`,
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
    { icon: '🔥', label: 'PyTorch' },
    { icon: '⚡', label: 'FastAPI' },
    { icon: '🗃️', label: 'PostgreSQL · MySQL' },
    { icon: '🐳', label: 'Docker · Traefik' },
    { icon: '🔄', label: 'n8n · Airflow' },
    { icon: '🎯', label: 'YOLO' },
    { icon: '🧬', label: 'DINOv2 · Milvus' },
    { icon: '👁️', label: 'OpenCV' },
    { icon: '📝', label: 'EasyOCR · Tesseract · Typhoon OCR' },
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
    summary: [
      'Engaged as a consultant and expanded into hands-on implementation across multiple projects, designing automation pipelines that bring ML/CV models into production workflows.',
      'Build a Thai-aware PDF text extraction pipeline combining pdftotext with a Tesseract OCR fallback (high-DPI rasterisation, quality scoring, character-encoding repair) to handle both digital and scanned documents.',
      'Implement multi-strategy image extraction from PDFs (lossless embedded extraction via PyMuPDF, YOLO detection on rendered pages, and Hough-Circle fallback), with regex-driven metadata parsing from structured page text.',
      'Develop image-similarity retrieval that blends DINOv2 768-d embeddings (Milvus Lite vector store) with a CIE L*a*b* colour histogram so visually-identical items in different materials remain separable; serve DINOv2 (CLS embeddings, cosine similarity, attention-map viz) and YOLO behind FastAPI.',
      'Stand up OCR services (EasyOCR with CRAFT detector and CRNN recogniser, Tesseract for general extraction, plus Typhoon OCR, a Thai-tuned API by SCB, for high-accuracy Thai text), delivered behind FastAPI and CLI interfaces.',
    ],
    tools_built: [
      'pdf_extractor',
      'coin_extractor',
      'image_similarity_search',
    ],
  },
  {
    exp_id: 1,
    role: 'System Analyst',
    company: 'Cartrack Technologies (Thailand)',
    start_date: '13/08/2024',
    end_date: '13/03/2026',
    summary: [
      'Gather requirements from stakeholders and translate API documentation into clear developer-ready specifications, delivering 6 successful API integrations.',
      'Develop ETL pipelines that support the debt collection team across four ASEAN markets, improving data accuracy, reducing support investigation time, and enabling 100% outreach to clients with outstanding debt.',
      'Perform end-to-end issue analysis using deductive reasoning and hypothesis testing with infrastructure and engineering teams to resolve production and customer-facing issues.',
      'Build automation workflows using n8n, Apache Airflow and bash script to reduce manual operations and improve response time.',
      'Own day-to-day ViciDial platform work, encoding complex configuration into guided forms and self-service tools so non-technical teams can run routine setup without pulling in engineering.',
      'Lead multi-country rollout of the lead-automation pipeline, parameterising business rules so the same Airflow DAGs served regional debt-collection teams under different jurisdictions.',
      'Ship every production change with dry-run mode, audit-ready Excel exports, and a feedback loop that reconciled pipeline output against the live system, so silent drift was caught before it reached campaigns.',
    ],
  },
]

export const projects: Project[] = [
  {
    proj_id: 4,
    slug: 'document-image-kb-embedding',
    highlight: true,
    title: 'Document & Image Extraction for Knowledge Base Embedding',
    description:
      'A microservice pipeline that extracts structured text and visual content from PDFs and prepares them as embeddings for retrieval-augmented knowledge bases, feeding downstream LLM and agentic-AI workflows.',
    tags: ['Python', 'PyTorch', 'YOLO', 'DINOv2', 'Milvus', 'OCR'],
    tools: ['FastAPI', 'Docker', 'PyMuPDF', 'OpenCV'],
    prog_langs: ['Python'],
    exp_id: 2,

    impact: [
      'Replaced manual transcription with a single API call',
      'Produces LLM-ready knowledge bases combining structured fields, raw text, and visual references',
      'Material-aware similarity surfaces near-duplicates that pure embeddings miss',
    ],

    purpose: [
      'Turn mixed digital and scanned PDFs into structured, queryable data',
      'Extract images alongside their surrounding text context for downstream RAG',
      'Provide visual similarity search so users can find by example, not just keyword',
      'Package extraction, embedding, and retrieval as composable HTTP services',
    ],

    features: [
      'Multi-strategy PDF extraction: lossless embedded images (PyMuPDF), YOLO detection on rendered pages, and Hough-Circle fallback for untrained domains.',
      'PDF-type auto-detection picks the right strategy (digital vs. scanned vs. unknown) without user input.',
      'Image-similarity retrieval blending DINOv2 768-d embeddings (Milvus Lite) with CIE L*a*b* colour histograms so visually-identical items in different materials remain separable.',
      'Thai-aware OCR triad: pdftotext + Tesseract for fast digital extraction, EasyOCR (CRAFT + CRNN) for general use, Typhoon OCR (Thai-tuned LLM API) for high-accuracy Thai.',
      'Regex-driven metadata parsing (dimensions, weight, year, reference codes) from structured page text; mapped per-image when table-column count matches image count.',
      'All services exposed as FastAPI endpoints behind Docker Compose with shared volumes and health checks.',
    ],

    packages: ['PyMuPDF', 'opencv-python', 'ultralytics', 'transformers', 'pymilvus', 'easyocr', 'pytesseract', 'typhoon-ocr', 'fastapi'],

    feedback:
      'Turned manual data entry into a self-serve extraction + embedding pipeline that downstream teams can query for both text and visual matches.',
  },

  {
    proj_id: 1,
    slug: 'etl-lead-automation',
    highlight: true,
    title: 'ETL Lead Automation',
    description:
      'Automated an end-to-end ETL pipeline that prepares lead data for the debt collection team and uploads into ViciDial, eliminating manual work and improving data reliability.',
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
    highlight: false,
    title: 'Restaurant Ordering System',
    org: 'University Project',
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
    // { label: 'GitHub', value: '@sahatsawatt-a', url: 'https://github.com/sahatsawatt-a' },
  ] as ContactLink[],
}

export const footer = {
  text: '© 2025 Sahatsawatt Anankatham · Portfolio',
}
