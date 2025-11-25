// src/data/profile.ts

export const header = {
    initials: 'SA',
    name: 'Sahatsawatt Anankatham (Guy)',
    tagline: 'System Analyst · Integrations · Automation',
};

export const hero = {
    status: 'Open for new opportunity',
    profileImage: '/profile_pic.jpg',
    heroTitle: {
        full: "A system analyst with hands-on programming and automation skills",
        highlight: ["system analyst", "programming", "automation"]
    },
    description: 'I improve system workflows through automation, integration design, and a deep understanding of how systems behave in real environments.',
    coreFocus: 'System analysis · Integrations · Automation · ELT',
    tooling: 'Laravel · Vue 3 · PostgreSQL · Docker · n8n · Airflow',
    quickProfile: {
        systemAnalysisJoinDate: '2024-08-13',
        systemAnalysisLabel: 'System Analysis Role',
        countries: '4 Countries',
        countriesLabel: 'ELT Integration',
        cards: [
            { label: 'Core', value: 'System Analysis · Integrations' },
            { label: 'Automation', value: 'n8n · Airflow · ELT' },
            { label: 'Tech', value: 'Laravel · Vue · Python' },
            { label: 'Data', value: 'PostgreSQL · MySQL' },
        ],
    },
};

export const about = {
    title: 'About',
    body: [
        `I’m a system analyst with a strong ability to dive into complex requirements,
clarify vague problems, and turn them into structured, workable solutions.
Beyond analyzing behavior and mapping systems, I also bring hands-on development
understanding that helps me design integrations that aren’t just theoretically correct,
but practical, resilient, and grounded in real-world constraints.`,
        `I translate API documentation into clear, developer-friendly explanations
and design end-to-end integration flows that allow systems to communicate reliably.
When issues surface, I serve as the first line of technical investigation — reproducing and
isolating client-side issues, identifying root causes, and escalating only validated backend concerns
to developers.`,
        `My growing experience with how systems interact outside controlled environments
helps me anticipate edge cases, reduce integration friction, and contribute to solutions
that scale smoothly in actual usage.`,
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
    ],
    technical: [
        { icon: '🖥️', label: 'Laravel · PHP' },
        { icon: '🎨', label: 'Vue 3 · Vite' },
        { icon: '🐍', label: 'Python' },
        { icon: '🗃️', label: 'PostgreSQL · MySQL' },
        { icon: '🐳', label: 'Docker · Traefik' },
        { icon: '🔄', label: 'n8n · Airflow' },
    ],
    interests: [
        { icon: '🌍', label: 'System Integration' },
        { icon: '🛰️', label: 'Embedded System' },
        { icon: '🤖', label: 'Industrial Internet of Things' },
        { icon: '🚀', label: 'Robotics and Autonomous Systems' },
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
                'Work closely with stakeholders to gather and clarify requirements.',
                'Translate API documentation into clear developer-friendly specifications.',
                'Design integration flows and ensure systems communicate reliably.',
                'Act as first-line debugger, isolating client-side issues.',
                'Provide structured, reproducible reports to developers.',
            ],
        },
        {
            role: 'Automation & Integration Developer',
            period: '2025 — Present',
            company: 'Side Projects / Internal Tools',
            bullets: [
                'Built automation workflows using n8n and Apache Airflow.',
                'Developed ETL pipelines to integrate internal systems.',
                'Improved data accuracy and reduced manual operations.',
                'Reduce ticket wait time for support team to investigate the issues.',
                'Help collection team reach out 100% of client with outstanding debt.',
            ],
        }
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
            ],
            features: [
                'Multiple campaigns per region (TH, ID, MY, PH)',
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
            slug: 'ordering-management-system',
            template: 'etl',
            highlight: false,
            title: 'Ordering Management System',
            description:
                'A modern ordering management system enhancing customer experience and backend efficiency, with self-service ordering, transparent tracking, and analytics dashboards.',
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
        }

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
