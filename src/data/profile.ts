// src/data/profile.ts

export const header = {
    initials: 'SA',
    name: 'Sahatsawatt Anankatham (Guy)',
    profileImage: '/profile_pic.jpg',
    tagline: 'Agentic AI · Automation Workflow',
};

export const hero = {
    
    status: 'Currently building Agentic AI Workflow',
    profileImage: '/profile_pic.jpg',
    heroTitle: {
        full: "Designs systems and builds Automation and Agentic AI.",
        highlight: ["Systems", "Automation", "Agentic AI"]
    },
    description: 'I improve system workflows through automation, integration design, and a deep understanding of how systems behave in real environments.',

    coreFocus: 'System analysis · Integrations · Automation · ETL',
    tooling: 'Laravel · Vue 3 · PostgreSQL · Docker · n8n · Airflow',
    quickProfile: {
        systemAnalysisJoinDate: '2024-08-13',
        systemAnalysisLabel: 'System Analysis Role',
        countries: '4 Countries',
        countriesLabel: 'ETL Integration',
        cards: [
            { label: 'Core', value: 'System Analysis · Integrations' },
            { label: 'Automation', value: 'n8n · Airflow · ETL' },
            { label: 'Tech', value: 'Laravel · Vue · Python' },
            { label: 'Data', value: 'PostgreSQL · MySQL' },
        ],
    },
};

export const about = {
    title: 'About',
    body: [
        `I’m a system analyst who thrives on breaking down complex requirements, clarifying vague problems, and translating them into structured, workable inputs for engineering teams. I focus on understanding system behavior, data flow, and where integrations typically fail under real-world conditions.`,
        `I analyze existing systems, generate practical integration ideas, and translate API documentation into clear, developer-friendly explanations that help engineers build solutions faster and with fewer misunderstandings.`,
        `When issues surface, I act as the first line of technical investigation by reproducing client-side problems, isolating root causes, and escalating only validated backend concerns. In parallel, I continuously explore new technologies and I am currently learning to deploy local AI models and build agentic AI to enhance my workflow and automation capabilities.`,
    ],
};


export const skills = {
    coreTitle: 'Core Skills',
    technicalTitle: 'Technical',
    interestsTitle: 'Interests',
    core: [
        { icon: '🧠', label: 'System Analysis' },
        { icon: '🔌', label: 'API Integration' },
        { icon: '📝', label: 'Requirement Gathering' },
        { icon: '🕵️', label: 'Root Cause Analysis & Debugging' },
        { icon: '⚡', label: 'Workflow Automation' },
        { icon: '📈', label: 'ETL Pipelines' },
        { icon: '👨🏻‍💼', label: 'Agentic AI' },
    ],
    technical: [
        { icon: '🖥️', label: 'Laravel · PHP' },
        { icon: '🎨', label: 'Vue 3 · Vite' },
        { icon: '🐍', label: 'Python' },
        { icon: '🗃️', label: 'PostgreSQL · MySQL' },
        { icon: '🐳', label: 'Docker · Traefik' },
        { icon: '🔄', label: 'n8n · Airflow' },
        { icon: '🤖', label: 'Ollama' },        
    ],
    interests: [
        { icon: '🌍', label: 'System Integration' },
        { icon: '🛰️', label: 'Embedded System' },
        { icon: '🏭', label: 'Industrial Internet of Things' },
        { icon: '🚀', label: 'Robotics and Autonomous Systems' },
        { icon: '🤖', label: 'AI' },        
    ],
};

export const experience = {
    title: 'Experience',
    items: [
        {
            role: 'System Analyst',
            period: 'Aug 2024 — Present',
            company: 'Cartrack Technology Thailand',
            bullets: [
                'Gather requirements from stakeholders and translate API documentation into clear developer-ready specifications, delivering 6 successful API integrations.',
                'Perform end-to-end issue analysis using deductive reasoning and hypothesis testing with infrastructure and engineering teams to resolve production and customer-facing issues.',
                'Build automation workflows using n8n, Apache Airflow and bash script to reduce manual operations and improve response time.',
                'Develop ETL pipelines for the debt collection team to improve data accuracy, reduce support investigation time, and enable 100% outreach to clients with outstanding debt.',
            ],
        },
    ],
};


export const projects = {
    title: 'Projects Highlight',
    items: [
        {
            slug: 'etl-lead-automation',
            template: 'etl',
            highlight: true,
            title: 'ETL Lead Automation',
            description:
                'Automates lead data transformation and uploading into ViciDial with validation, reporting, and failover logic.',
            tags: ['Apache Airflow', 'Python', 'SQL'],
            img: '/DLA_Diagram.jpg',
            purpose: [
                'Automate the selection of debtors based on campaign rules',
                'Transform and validate lead data',
                'Upload to ViciDial via its API',
                'Export summary to Excel for reporting or audit',
                'Notify stakeholders via email',
                'Able to implement the pipeline to new country easily'
            ],
            features: [
                'Grouped call frequency rules to avoid duplicate uploads',
                'Dry-run and upload mode toggle',
                'Feedback loop comparing output with live ViciDial data',
                'Auto-adjusts logic when ViciDial state changes',
                'Ensures consistent and accurate lead delivery',
            ],
            package: ['numpy', 'pandas'],
            feedback:
                'Our agents have successfully contacted 100% of users with outstanding debt.',
        },
        {
            slug: 'internal-automation-tools',
            template: 'etl',
            highlight: true,
            title: 'Internal Automation Tools',
            description:
                'A set of lightweight internal tools that automate investigation, report requests, complex configuration tasks, and data-change monitoring to reduce manual effort and support issues.',
            tags: ['n8n', 'Bash', 'SQL', 'JavaScript'],
            purpose: [
                'Speed up API front-line investigation by parsing and summarizing logs automatically',
                'Reduce manual workload on frequently requested reports by giving the support team self-service tools',
                'Simplify complex Vicidial configuration steps into a guided, template-based flow',
                'Detect critical data changes early and notify users before they become production issues',
            ],
            features: [
                'Log parser script that highlights only relevant log entries and provides a concise summary for faster incident investigation',
                'Self-service report form for the support team that validates user input, calls backend APIs, and returns results without manual queries',
                'Vicidial configuration helper that collects input via a form and automates multiple configuration steps through API calls',
                'Data-change detection flow that monitors key fields and alerts responsible users when follow-up actions are required',
            ],
        },
        {
            slug: 'restaurant-ordering-system',
            template: 'etl',
            highlight: false,
            title: 'Restaurant Ordering System - University Project',
            description:
                'A modern restaurant ordering system enhancing customer experience and backend efficiency, with self-service ordering, transparent tracking, and analytics dashboards.',
            tags: ['Web Development', 'Laravel', 'Vue', 'QR Code', 'TypeScript'],
            purpose: [
                'Improve customer flow and reduce wait times',
                'Enable self-service ordering via QR code',
                'Provide transparent order tracking and editable items',
                'Ensure accurate automated pricing',
                'Offer analytical dashboards for management to monitor patterns and optimize inventory',
            ],
            features: [
                'QR-code-based self-service ordering website',
                'Real-time order tracking and item management',
                'Automated and precise pricing calculation',
                'Analytics dashboards for sales, inventory, and decision-making',
                'Backend optimizations for smooth operations',
            ],
        },
    ],
};



export const contact = {
    title: 'Contact',
    intro:
        'If you’d like help analysing a system, designing an integration, or automating a workflow, feel free to reach out.',
    email: {
        label: 'Email',
        value: 'sahatsawatt.a@outlook.com',
    },
    // github: {
    //     label: 'GitHub',
    //     handle: '@sahatsawatt-a',
    //     url: 'https://github.com/sahatsawatt-a',
    // },
};

export const footer = {
    text: '© 2025 Sahatsawatt Anankatham · Portfolio',
};
