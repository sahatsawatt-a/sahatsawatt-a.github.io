// ─── Case-study extension schema ─────────────────────────────────────────────
// Optional, richer content layered on top of `projects` in ./index.ts, keyed by
// slug. Every field is optional: the detail page falls back to the base
// Project fields (description, purpose, features, ...) when an entry is missing.
//
// Content below is restructured from the existing project text only. Fields that
// need facts not present in the repo (role, timeline, status, links, learnings)
// are left commented out — fill them in with real values.

export type CaseStudyStatus = 'Production' | 'In development' | 'Prototype' | 'Archived'

export interface CaseStudyMetric {
  /** Big, short value: "3", "768-d", "6h", "Dry-run" */
  value: string
  label: string
}

export interface CaseStudyStep {
  title: string
  detail?: string
  tech?: string[]
}

/** A component in a layered system diagram */
export interface ArchNode {
  id: string
  title: string
  detail: string
  tech?: string[]
}

export interface ArchLayer {
  name: string
  nodes: ArchNode[]
  /** Layers with the same row number sit side by side */
  row?: number
  /** Node id shown on its own line above the others (fan-out hub) */
  hub?: string
  /** 'start' packs nodes to the left, leaving a clear lane on the right for lines */
  align?: 'start'
  /** Wider gaps between nodes (room for sideways links) */
  wide?: boolean
  /** Colour: violet | slate | sky | indigo | amber | emerald */
  tone?: string
}

/** [from, to, label?] — label is a few words on what flows along the line */
export type ArchLink = [string, string, string?]

export interface CaseStudyFeature {
  title: string
  detail: string
  /** Optional `src` of a `media` item that shows this feature */
  media?: string
}

/** A concrete scenario walked through step by step */
export interface CaseStudyExample {
  title: string
  /** One-sentence situation */
  scenario: string
  steps: string[]
  /** Optional `src` of a `media` item that shows this example */
  media?: string
}

/** How a tool/practice was actually used — evidence of skill, not a count */
export interface CaseStudyPractice {
  area: string
  detail: string
  tools: string[]
}

export interface CaseStudyChallenge {
  problem: string
  solution: string
}

export interface CaseStudyMedia {
  /** Image (.png/.jpg/.webp/.svg) or video (.mp4/.webm) under /public */
  src: string
  caption: string
  /** Still frame shown before a video loads */
  poster?: string
  /** Chapter in the viewer, e.g. 'AI agents' — items with the same group sit together */
  group?: string
  /** One line on how it works, shown under the caption */
  how?: string
}

const VIDEO_RE = /\.(mp4|webm|mov)$/i
export const isVideo = (src: string) => VIDEO_RE.test(src)

export interface CaseStudyLink {
  label: string
  url: string
}

export interface CaseStudy {
  slug: string
  /** One-line hook shown under the title (falls back to description) */
  summary?: string
  /** Falls back to the linked experience's role */
  role?: string
  /** "Solo", "Team of 4", ... */
  team?: string
  /** Falls back to the linked experience's dates */
  timeline?: string
  status?: CaseStudyStatus
  /** Who used it / who it was built for */
  users?: string
  /** "What I did" — first-person, action-led, one line each */
  contributions?: string[]
  /** Skills a reader can map to a job description */
  skills?: string[]
  /**
   * Hero image or looping video (screenshot / mockup / clip), e.g.
   * '/projects/zyrenn/cover.png' or '/projects/zyrenn/board.webm' in /public.
   * Without it the hero shows a diagram built from `architecture`, or the stack.
   */
  cover?: string
  coverPoster?: string
  metrics?: CaseStudyMetric[]
  /** "The problem" paragraph */
  problem?: string
  architecture?: {
    /** Linear pipeline (rendered as a flow) */
    steps?: CaseStudyStep[]
    /** Layered system (rendered as an interactive diagram); used instead of steps */
    layers?: ArchLayer[]
    /** Connections between node ids */
    links?: ArchLink[]
    /** Node selected when the diagram loads */
    initial?: string
    note?: string
  }
  /** Overrides base `features` with titled entries */
  features?: CaseStudyFeature[]
  /** "Example cases" — how it is used, step by step */
  examples?: CaseStudyExample[]
  /** "How I build it" — tools shown in context */
  practices?: CaseStudyPractice[]
  challenges?: CaseStudyChallenge[]
  learnings?: string[]
  media?: CaseStudyMedia[]
  links?: CaseStudyLink[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'zyrenn-personal-workspace',
    // Facts verified against the zyrenn repo (main @ 2026-11-08) on 2026-11-13.
    summary:
      'One self-hosted workspace for notes, whiteboards, tables, files, workflows and more — where AI agents work inside, through about 155 MCP tools.',
    role: 'Creator & sole developer',
    team: 'Solo',
    timeline: 'Sep 2026 – present',
    status: 'In development',
    // Public repo exists — uncomment if you want it linked:
    // links: [{ label: 'GitHub', url: 'https://github.com/sahatsawatt-a/zyrenn' }],
    // Screens & clips: demo account with made-up content (captured 2026-11-13)
    cover: '/projects/zyrenn/cover.png',
    contributions: [
      'Designed and built the whole product solo, from first scaffold to a 25-service Docker stack',
      'Designed the AI layer: ~155 MCP tools that let agents edit content piece by piece, safely alongside people',
      'Built live co-editing for notes and boards, with safeguards so no content is lost',
      'Built a visual workflow engine that runs user code in a sandbox',
      'Set up end-to-end testing with Playwright and a CI pipeline with linting, type checks and tests',
    ],
    skills: ['Product & system design', 'Full-stack (Laravel + Vue)', 'AI agent integration (MCP)', 'Real-time collaboration', 'E2E testing (Playwright)', 'CI & Docker'],
    metrics: [
      { value: 'AI-native', label: 'agents work inside every part of the app through ~155 MCP tools' },
      { value: 'Real-time', label: 'notes and boards co-edited live, without losing content' },
      { value: 'E2E-tested', label: 'Playwright drives the whiteboard and editors in a real browser' },
    ],
    problem:
      'Knowledge gets scattered across notes apps, whiteboards, spreadsheets, drives, automation tools and ticket trackers — and none of them let an AI assistant work inside. ZyrenN brings them into one self-hosted app that AI agents can use as safely as people do.',
    examples: [
      {
        title: 'Plan a hardware project',
        scenario: 'Planning a greenhouse sensor network — the demo project in the screens above.',
        steps: [
          'Write the plan in a note, with a formula for the watering threshold and a sequence diagram written as text.',
          'Sketch the system on a whiteboard and embed it right inside the note.',
          'Try the electronics on a simulated breadboard and design the sensor case in 3D.',
          'Track every sensor in a table with typed columns: zone, reading, battery, install date.',
        ],
        media: '/projects/zyrenn/circuit.mp4',
      },
      {
        title: 'Let an AI assistant help',
        scenario: 'Connecting Claude Code or Cursor to take over the busywork.',
        steps: [
          'Create a token scoped to only what the assistant needs, then paste one command into the AI client.',
          'Ask it to draft a note, add rows to a table or lay out shapes on a board.',
          'It reads and edits only the parts it needs — a block, a frame, a page of rows.',
          'People keep editing at the same time; version checks stop either side overwriting the other.',
        ],
        media: '/projects/zyrenn/mcp-live.mp4',
      },
      {
        title: 'Automate a routine',
        scenario: 'Watering only the beds that are actually dry.',
        steps: [
          'A workflow reads the sensor table — on a schedule or with one click.',
          'A JavaScript step, sandboxed in WebAssembly, finds the dry beds.',
          'A branch decides what to do and logs the watering into a note.',
          'Every run shows each step\'s status, timing, input and output.',
        ],
        media: '/projects/zyrenn/workflow.mp4',
      },
      {
        title: 'Answer customers automatically',
        scenario: 'A project inbox that replies on LINE, Telegram, WhatsApp or Instagram.',
        steps: [
          'A customer message arrives in the project\'s inbox.',
          'A workflow triggers on the chat and drafts a reply grounded in the project\'s knowledge base.',
          'The team sees every conversation in one place and can turn requests into tickets.',
        ],
      },
    ],
    architecture: {
      // Verified against the zyrenn repo (docker-compose.yml, docker/nginx/app.conf,
      // routes/ai.php, collab/server.mjs) on 2026-11-13.
      initial: 'mcp',
      layers: [
        {
          name: 'Clients',
          tone: 'violet',
          nodes: [
            { id: 'browser', title: 'Web app', detail: 'Vue 3 + Inertia pages with editors for notes (Tiptap), boards (Konva), workflows (Vue Flow), 3D (three.js) and maps (MapLibre).', tech: ['Vue 3', 'Inertia', 'Tiptap', 'Konva'] },
            { id: 'ai', title: 'AI clients', detail: 'Claude Code, Cursor, VS Code and other MCP clients send JSON-RPC over HTTPS with a per-user token whose scopes decide which tools they see.', tech: ['MCP', 'JSON-RPC'] },
          ],
        },
        {
          name: 'Edge',
          tone: 'slate',
          nodes: [
            { id: 'proxy', title: 'Reverse proxy', detail: 'Traefik terminates HTTPS; nginx then routes /app to the websocket server, /collab to the collab server, and everything else — pages, API and /mcp — to Laravel.', tech: ['Traefik', 'nginx'] },
          ],
        },
        {
          name: 'Services',
          tone: 'sky',
          wide: true,
          nodes: [
            { id: 'collab', title: 'Collab server', detail: 'A Node server that syncs notes and boards as Yjs documents. It signs users in, loads and saves every document through Laravel — it never touches the database itself.', tech: ['Hocuspocus', 'Yjs', 'Node 22'] },
            { id: 'laravel', title: 'Laravel app', detail: 'The PHP-FPM application: pages, API, passkey sign-in, and the routes for the MCP servers. All feature logic lives here.', tech: ['Laravel 13', 'PHP 8.4', 'Fortify'] },
            { id: 'realtime', title: 'Websockets', detail: 'Laravel broadcasts events to Reverb, which pushes presence and live list updates to every open tab.', tech: ['Laravel Reverb', 'Echo'] },
          ],
        },
        {
          name: 'Inside the app',
          tone: 'indigo',
          align: 'start',
          nodes: [
            { id: 'mcp', title: 'MCP server', detail: 'Runs inside Laravel as the /mcp/user and /mcp/global routes. About 155 tools read and edit content by part — a note block, a board frame, a page of rows — with base versions so concurrent edits are never overwritten.', tech: ['laravel/mcp', 'Sanctum'] },
            { id: 'queue', title: 'Queues & scheduler', detail: 'Laravel processes (queue:work, schedule:work) that run background jobs, timed triggers and the workflow engine, handing heavy work to tool containers.', tech: ['Laravel queues'] },
          ],
        },
        {
          name: 'Tool containers',
          tone: 'amber',
          row: 5,
          nodes: [
            { id: 'sandbox', title: 'Code sandboxes', detail: 'User-written JavaScript (QuickJS compiled to WASM) and Python (Pyodide), each in its own container with run limits and no access to the app\'s secrets or files.', tech: ['QuickJS (WASM)', 'Pyodide'] },
            { id: 'media', title: 'Media', detail: 'An ffmpeg-based service that renders video and sound edits for the media queue.', tech: ['ffmpeg'] },
            { id: 'checks', title: 'Chrome', detail: 'Playwright\'s Chrome in its own container with read-only mounts. The checks queue drives it to replay browser checks and film the runs; the worker saves each film to the Drive.', tech: ['Playwright', 'Chrome'] },
          ],
        },
        {
          name: 'Data',
          tone: 'emerald',
          row: 5,
          nodes: [
            { id: 'drive', title: 'Drive', detail: 'Private files on disk, served only to their owner. Filmed browser checks are saved here too.', tech: ['Local disk'] },
            { id: 'pg', title: 'PostgreSQL', detail: 'All content as typed, linkable records — notes, boards, tables, projects, runs.', tech: ['PostgreSQL 17'] },
            { id: 'backup', title: 'Backups', detail: 'A database dump paired with the Drive files every 6 hours, rotated by age, so both restore to the same point.', tech: ['pg_dump'] },
          ],
        },
      ],
      links: [
        ['browser', 'proxy', 'HTTPS'],
        ['ai', 'proxy', 'MCP over HTTPS'],
        ['proxy', 'laravel', 'pages, API & /mcp'],
        ['proxy', 'collab', 'Yjs sync'],
        ['proxy', 'realtime', 'websocket'],
        ['collab', 'laravel', 'auth, load & save'],
        ['laravel', 'realtime', 'broadcasts'],
        ['laravel', 'mcp', '/mcp routes'],
        ['laravel', 'queue', 'jobs'],
        ['laravel', 'pg', 'SQL'],
        ['laravel', 'drive', 'files'],
        ['mcp', 'pg', 'reads & writes'],
        ['queue', 'sandbox', 'run code'],
        ['queue', 'media', 'render'],
        ['queue', 'checks', 'run check'],
        ['queue', 'drive', 'saves films'],
      ],
      note: 'Runs as 25 Docker Compose services — only Docker is needed on the host. Optional overlays add model services (picture similarity, transcription, OCR, local LLMs) and device toolchains.',
    },
    features: [
      { title: 'AI agents work inside', detail: 'Agents read and edit any note, board, table or file through MCP — without overwriting people\'s changes.', media: '/projects/zyrenn/mcp-live.mp4' },
      { title: 'Live co-edited notes', detail: 'Rich notes with Markdown, code, diagrams and maths, edited by several people at once with named carets.', media: '/projects/zyrenn/coedit.mp4' },
      { title: 'Endless whiteboards', detail: 'Shapes, sticky notes and connectors that follow when you drag; embed boards in notes or present frames as slides.', media: '/projects/zyrenn/board.mp4' },
      { title: 'Visual workflows', detail: 'Automations triggered by webhooks, schedules, email or chat, with sandboxed code steps and a step-by-step run log.', media: '/projects/zyrenn/workflow.mp4' },
      { title: 'Hardware lab', detail: 'Wire an Arduino on a simulated breadboard, compile real sketches, solve circuits written as text, and design 3D cases.', media: '/projects/zyrenn/circuit.mp4' },
      { title: 'Plan & present', detail: 'Trips with routed days and budgets, tables as kanban, calendar or chart, slide decks and clickable prototypes.', media: '/projects/zyrenn/trip.mp4' },
      { title: 'Built-in browser checks', detail: 'Tests written the way a person reads the page, run in a real Chrome and filmed for review.', media: '/projects/zyrenn/checks-film.mp4' },
      { title: 'Projects & teamwork', detail: 'Shared spaces with roles, tickets, a product tree and a customer inbox with AI replies.', media: '/projects/zyrenn/product.png' },
    ],
    practices: [
      {
        area: 'End-to-end testing',
        detail: 'Playwright suites drive the real app in Chromium — drawing on the whiteboard, typing in notes, connecting AI clients — alongside Pest for the server, Vitest for front-end logic and node:test for the collaboration server.',
        tools: ['Playwright', 'Pest', 'Vitest', 'node:test'],
      },
      {
        area: 'CI & code quality',
        detail: 'Every push and pull request runs on GitHub Actions against a real Postgres: formatting, PHPStan static analysis, TypeScript type checks and the parallel test suite.',
        tools: ['GitHub Actions', 'Pint', 'Larastan', 'vue-tsc'],
      },
      {
        area: 'Browser automation',
        detail: 'Playwright also powers an in-app feature: recorded browser checks replayed by headless Chrome in a container and filmed. The screenshots and clips on this page were captured with Playwright too.',
        tools: ['playwright-core', 'Docker', 'ffmpeg'],
      },
      {
        area: 'Real-time collaboration',
        detail: 'CRDT-based co-editing through a schema-aware sync server, with websockets for presence and live lists.',
        tools: ['Yjs', 'Hocuspocus', 'Laravel Reverb', 'Echo'],
      },
      {
        area: 'Security & sandboxing',
        detail: 'Passkey sign-in, per-key scoped tokens for AI clients, and user-written code isolated in WebAssembly runtimes in separate containers.',
        tools: ['Passkeys', 'Sanctum', 'QuickJS (WASM)', 'Pyodide'],
      },
      {
        area: 'Docker & operations',
        detail: 'The whole app runs from Docker Compose behind a reverse proxy, with scheduled backups that restore the database and files together.',
        tools: ['Docker Compose', 'nginx', 'Traefik', 'PostgreSQL'],
      },
    ],
    challenges: [
      {
        problem: 'Letting AI agents edit large documents is slow and risks overwriting someone else\'s changes.',
        solution: 'Agents read and write small parts by id instead of whole documents, and every edit is checked against the version it was based on.',
      },
      {
        problem: 'Live co-editing can silently lose content that arrives mid-sync or that the editor doesn\'t recognise.',
        solution: 'A collaboration server that understands the note format keeps unknown blocks, and editors wait for a full sync before typing.',
      },
      {
        problem: 'Workflows run code written by users, which must never touch the main server.',
        solution: 'JavaScript and Python run in WebAssembly sandboxes, each in its own container with run limits.',
      },
      {
        problem: 'The same rules (e.g. how a label fits a shape) must behave identically on the server and in the browser.',
        solution: 'Both PHP and TypeScript read shared JSON data and are tested against the same fixture files.',
      },
    ],
    // All footage: demo accounts ("Demo", "Mai") with made-up content. workflow.* had a
    // private hostname in one cell — redacted in these copies (2026-11-13).
    media: [
      {
        group: 'AI agents', src: '/projects/zyrenn/mcp-live.mp4', poster: '/projects/zyrenn/mcp-live.png',
        caption: 'An AI client draws a board through real MCP calls while it is open.',
        how: 'Each JSON-RPC tools/call goes to the MCP endpoint with a scoped token; shapes and pinned connectors appear as each call returns.',
      },
      {
        group: 'AI agents', src: '/projects/zyrenn/mcp.png',
        caption: 'Connecting an AI client (Claude Code, Cursor, VS Code…) with a scoped per-user token.',
      },
      {
        group: 'Notes & boards', src: '/projects/zyrenn/board.mp4', poster: '/projects/zyrenn/board.png',
        caption: 'Drawing a shape and dragging nodes — connectors re-route live.',
        how: 'Konva canvas; connectors are pinned to shapes, not to coordinates.',
      },
      {
        group: 'Notes & boards', src: '/projects/zyrenn/notes-focus.mp4', poster: '/projects/zyrenn/notes-focus.jpg',
        caption: 'Markdown becomes headings, checklists, quotes and maths as you type.',
        how: 'Tiptap / ProseMirror input rules, with KaTeX for maths.',
      },
      {
        group: 'Notes & boards', src: '/projects/zyrenn/notes.png',
        caption: 'A note with typeset maths and a sequence diagram written as text.',
      },
      {
        group: 'Real-time', src: '/projects/zyrenn/coedit.mp4', poster: '/projects/zyrenn/coedit.png',
        caption: 'Two people in one note: Mai writes while Demo ticks off the checklist.',
        how: 'Yjs CRDTs synced through a Hocuspocus server, with named carets and presence.',
      },
      {
        group: 'Automation', src: '/projects/zyrenn/workflow.mp4', poster: '/projects/zyrenn/workflow.png',
        caption: 'The "Water the dry beds" workflow, run with one click, step by step.',
        how: 'Read the sensor table → find dry beds in JavaScript → branch → log to a note. The code step runs sandboxed in QuickJS/WASM.',
      },
      {
        group: 'Hardware & 3D', src: '/projects/zyrenn/circuit.mp4', poster: '/projects/zyrenn/circuit.png',
        caption: 'An Arduino sketch uploaded to a breadboard — the LEDs blink from the code.',
        how: 'Compiled by a real Arduino toolchain container, then run on an emulated AVR (avr8js) in the browser.',
      },
      {
        group: 'Hardware & 3D', src: '/projects/zyrenn/circuit-note.png',
        caption: 'A circuit written as text, drawn as a schematic and solved — it flags an LED driven past its rating.',
      },
      {
        group: 'Hardware & 3D', src: '/projects/zyrenn/design.mp4', poster: '/projects/zyrenn/design.png',
        caption: 'A 3D sensor case written as text and resized with sliders.',
        how: 'Solid geometry with manifold-3d, rendered in three.js; reports size, volume and grams of PLA.',
      },
      {
        group: 'Planning', src: '/projects/zyrenn/trip.mp4', poster: '/projects/zyrenn/trip.png',
        caption: 'A three-day trip on a map, switched day by day.',
        how: 'Routes and arrival times from Valhalla on OpenStreetMap, drawn with MapLibre; costs tracked against a budget.',
      },
      {
        group: 'Planning', src: '/projects/zyrenn/table-views.mp4', poster: '/projects/zyrenn/table-board.png',
        caption: 'One table shown as kanban, calendar, chart and grid.',
      },
      {
        group: 'Present & prototype', src: '/projects/zyrenn/slides.mp4', poster: '/projects/zyrenn/slides.png',
        caption: 'A demo slide deck in present mode (figures are made up).',
        how: 'A deck is a board of 16:9 frames with a theme, header/footer and slide numbers — created in one MCP call.',
      },
      {
        group: 'Present & prototype', src: '/projects/zyrenn/prototype-play.mp4', poster: '/projects/zyrenn/prototype-play.png',
        caption: 'A clickable phone prototype in Play mode.',
        how: 'Screens are frames on a board; links and show/hide actions are set on items.',
      },
      {
        group: 'Quality', src: '/projects/zyrenn/checks-film.mp4',
        caption: 'A film the app made itself: a browser check adding and finishing to-dos on a public test site.',
        how: 'Checks are written by what a person reads on the page, run in containerised Chrome, and filmed into the Drive.',
      },
      {
        group: 'Quality', src: '/projects/zyrenn/checks.png',
        caption: 'A browser-check suite at 100% health, with its filmed run.',
      },
      {
        group: 'Projects', src: '/projects/zyrenn/dashboard.png',
        caption: 'Home: to-dos gathered from every note, project progress and recent work.',
      },
      {
        group: 'Projects', src: '/projects/zyrenn/tickets.png',
        caption: 'Project tickets — bugs and features by priority and status.',
      },
      {
        group: 'Projects', src: '/projects/zyrenn/product.png',
        caption: 'The product tree: components and capabilities with live status, linked to tickets.',
      },
    ],
  },

  {
    slug: 'document-image-kb-embedding',
    // Facts verified against the AcadeSK repo (main @ 2026-05-06) on 2026-11-13.
    // Repo is private — the catalogue domain is kept generic on purpose.
    summary:
      'From messy PDF catalogues to an LLM-ready knowledge base — images, text, metadata and visual search in one self-hosted toolkit.',
    // role / timeline fall back to the linked Avalant experience
    // team: 'Team of N',
    users: 'Teams building LLM and agentic-AI workflows on product catalogues',
    contributions: [
      'Built a PDF extractor that picks its own strategy — lossless, YOLO or circle detection — per document',
      'Trained a YOLO11 detection model in a repeatable Docker training job',
      'Designed a material-aware image search: DINOv2 embeddings re-ranked with a custom L*a*b* colour descriptor',
      'Parsed Thai and English page text into structured fields, including Buddhist-Era year conversion',
      'Wrapped every model as a FastAPI service behind a Laravel + Vue web app with sign-in and in-app docs',
      'Built a dataset tool for collecting corrected OCR text to train future models',
    ],
    skills: ['Computer vision', 'OCR (Thai & English)', 'Vector search', 'Model training (YOLO)', 'API design (FastAPI)', 'Full-stack (Laravel + Vue)', 'Docker'],
    metrics: [
      { value: '3', label: 'image-extraction strategies, picked automatically per PDF' },
      { value: '768 + 43', label: 'DINOv2 embedding + L*a*b* colour descriptor, blended at search time' },
      { value: '6', label: 'tools in one web app: extract, search, explore, OCR ×2 and label data' },
    ],
    problem:
      'Product catalogues arrived as a mix of digital and scanned PDFs, often in Thai, and turning them into usable data meant manual transcription. Downstream LLM and agentic-AI workflows needed structured fields, raw text and the images themselves — searchable by example, not just keyword — and look-alike items made in different materials had to stay distinguishable.',
    examples: [
      {
        title: 'Digitise a catalogue',
        scenario: 'A PDF catalogue — digital or scanned — needs to become searchable data.',
        steps: [
          'Upload the PDF in the web app; the extractor samples a few pages to decide whether it is digital or scanned.',
          'Digital pages: each image is pulled out losslessly, straight from the PDF, together with the page text.',
          'Scanned pages: the trained YOLO model finds each item on the rendered page (circle detection if no model is loaded).',
          'Material, year, size, weight and catalogue codes are parsed from the text; table columns are matched to images by page position.',
          'Download every crop as a ZIP, or index them all into image search with one click.',
        ],
      },
      {
        title: 'Find a look-alike',
        scenario: 'Someone has a photo of an item and wants to find similar ones.',
        steps: [
          'Upload the photo on the search page.',
          'DINOv2 embeds it and Milvus returns three times more candidates than needed.',
          'A colour descriptor re-ranks them, so the same design in gold, silver or copper is told apart.',
          'A slider sets how much colour matters versus shape.',
        ],
      },
      {
        title: 'Build an OCR training set',
        scenario: 'Thai OCR keeps misreading some labels and needs better training data.',
        steps: [
          'Upload an image; EasyOCR or Typhoon OCR suggests the text.',
          'Correct the suggestion and save the image–text pair.',
          'Export the growing dataset as CSV for training.',
        ],
      },
    ],
    architecture: {
      steps: [
        { title: 'Web app', detail: 'Laravel + Vue tools app; Laravel never touches images itself and delegates to Python services over HTTP.', tech: ['Laravel 13', 'Vue 3', 'Inertia'] },
        { title: 'Detect type', detail: 'Sample up to 3 pages and vote: digital, scanned or unknown.', tech: ['PyMuPDF'] },
        { title: 'Extract images', detail: 'Lossless embedded images, YOLO detection on rendered pages, or Hough-circle fallback.', tech: ['PyMuPDF', 'YOLO11', 'OpenCV'] },
        { title: 'Read text', detail: 'Structured page text (headings, body, tables) from digital PDFs; EasyOCR or Typhoon OCR for images and scans.', tech: ['PyMuPDF', 'EasyOCR', 'Typhoon OCR'] },
        { title: 'Parse metadata', detail: 'Regex for material, year (Buddhist Era → CE), diameter, weight and catalogue codes, mapped per image.', tech: ['Python'] },
        { title: 'Embed & index', detail: 'DINOv2 vectors plus a colour descriptor in Milvus Lite; results re-ranked by a blended score.', tech: ['DINOv2', 'Milvus Lite'] },
      ],
      note: 'Runs as 11 Docker Compose services plus on-demand OCR and training jobs — only DINOv2 needs a GPU. Works locally or behind Traefik with HTTPS.',
    },
    features: [
      { title: 'Self-choosing PDF extraction', detail: 'Lossless embedded images for digital PDFs, YOLO detection for scans, and Hough-circle detection when no model is available — chosen automatically.' },
      { title: 'Material-aware image search', detail: 'DINOv2 768-d embeddings in Milvus Lite, re-ranked with a 43-d CIE L*a*b* colour descriptor and an adjustable colour weight.' },
      { title: 'Thai-aware text & metadata', detail: 'Structured page text, keyword and regex parsing in Thai and English, and per-image mapping when a table lists several variants.' },
      { title: 'Two OCR engines', detail: 'Self-hosted EasyOCR (Thai + English, CPU-only) and Typhoon OCR, a Thai-tuned LLM, for hard documents — in the web app and as a batch CLI.' },
      { title: 'DINOv2 explorer', detail: 'Inspect embeddings, compare two images and visualise the model\'s attention heatmap per head.' },
      { title: 'OCR dataset builder', detail: 'Label image–text pairs from OCR suggestions and export them as CSV for model training.' },
    ],
    practices: [
      {
        area: 'Computer vision',
        detail: 'A YOLO11 model trained from a public dataset in a one-command Docker job, with Hough-circle detection and custom overlap-based de-duplication as a no-model fallback.',
        tools: ['YOLO11 (ultralytics)', 'OpenCV', 'PyMuPDF'],
      },
      {
        area: 'Vector search',
        detail: 'DINOv2 CLS embeddings stored in an embedded vector database; candidates are over-fetched and re-ranked with a hand-designed colour descriptor.',
        tools: ['DINOv2', 'Milvus Lite', 'transformers', 'NumPy'],
      },
      {
        area: 'OCR for Thai & English',
        detail: 'Digital text read straight from the PDF; self-hosted EasyOCR or the Typhoon OCR API for images and scans, plus a labelling tool to build training data.',
        tools: ['EasyOCR', 'Typhoon OCR', 'PyMuPDF'],
      },
      {
        area: 'Model serving',
        detail: 'Each model runs as its own FastAPI service with a health check; weights are baked into images so containers start without network access.',
        tools: ['FastAPI', 'Docker', 'PyTorch (CUDA)'],
      },
      {
        area: 'Web app & operations',
        detail: 'Laravel + Vue front end with two-factor sign-in, a Redis-backed queue worker, Postgres, and one compose file that runs locally or behind Traefik.',
        tools: ['Laravel', 'Vue 3', 'PostgreSQL', 'Redis', 'Nginx', 'Traefik'],
      },
    ],
    challenges: [
      {
        problem: 'Visually identical items in different materials collapse together in pure embedding space.',
        solution: 'Blend DINOv2 similarity with a CIE L*a*b* colour descriptor, with the colour weight adjustable per search.',
      },
      {
        problem: 'Background, glare and dark engravings skewed the colour histogram, and silver items showed random hue noise.',
        solution: 'Use only a central circle and the most colourful 25% of pixels, and treat near-neutral images as colourless so silver matches silver.',
      },
      {
        problem: 'On scanned PDFs, "extracting images" just returns one picture per page.',
        solution: 'Detect the PDF type first and switch to YOLO or circle detection on rendered pages.',
      },
      {
        problem: 'One table often describes several variants, each with its own image.',
        solution: 'Sort images by their position on the page and give each one its matching table column.',
      },
    ],
  },

  {
    slug: 'etl-lead-automation',
    summary: 'Campaign rules in, validated leads out — uploaded to ViciDial, reported and alerted without a human in the loop.',
    // role / timeline fall back to the linked Cartrack experience
    // team: 'Team of N',
    status: 'Production',
    users: 'Debt-collection teams in 4 ASEAN markets',
    contributions: [
      'Gathered requirements from the debt-collection team and turned them into developer-ready specs',
      'Built the Airflow pipeline from debtor selection to ViciDial upload and reporting',
      'Led the rollout to four ASEAN markets by making business rules configurable per country',
      'Added dry-run mode, audit exports and a reconciliation loop so errors were caught before campaigns',
    ],
    skills: ['Data engineering', 'Apache Airflow', 'Requirements analysis', 'API integration', 'Stakeholder communication'],
    metrics: [
      { value: '4', label: 'ASEAN markets served by one configurable pipeline' },
      { value: 'Dry-run', label: 'mode for safe testing before every execution' },
      { value: 'Audit-ready', label: 'Excel reports generated on every run' },
    ],
    problem:
      'Preparing lead data for the debt collection team was a manual, error-prone process: selecting debtors per campaign, cleaning data, uploading to ViciDial and reporting back. Mistakes meant duplicate calls and inconsistent campaigns across countries.',
    examples: [
      {
        title: 'A campaign run',
        scenario: 'The collection team needs fresh leads for a campaign in one of four markets.',
        steps: [
          'Airflow selects debtors using that country\'s campaign rules.',
          'Leads are cleaned and validated; anyone called too recently is skipped.',
          'A dry run shows exactly what would be uploaded.',
          'The real run uploads to ViciDial, then reconciles against live data.',
          'An audit-ready Excel report goes out and stakeholders get an alert.',
        ],
        media: '/DLA_Diagram.jpg',
      },
    ],
    architecture: {
      steps: [
        { title: 'Select', detail: 'Debtors chosen by campaign rules.', tech: ['SQL', 'PostgreSQL'] },
        { title: 'Transform & validate', detail: 'Clean, reshape and validate lead data; enforce call-frequency limits.', tech: ['pandas', 'numpy'] },
        { title: 'Upload', detail: 'Push leads into ViciDial, adapting to its live state.', tech: ['ViciDial API'] },
        { title: 'Reconcile', detail: 'Compare pipeline output against live ViciDial data.', tech: ['Python'] },
        { title: 'Report & alert', detail: 'Audit-ready Excel reports and stakeholder notifications.', tech: ['Airflow'] },
      ],
      note: 'Orchestrated end-to-end as Airflow DAGs.',
    },
    features: [
      { title: 'Call-frequency control', detail: 'Prevents the same debtor from being uploaded more often than the rules allow.' },
      { title: 'Dry-run mode', detail: 'Runs the full pipeline without side effects for safe testing before execution.' },
      { title: 'Feedback loop', detail: 'Compares pipeline output with live ViciDial data to catch drift.' },
      { title: 'Adaptive logic', detail: 'Responds to ViciDial state changes instead of assuming a fixed target.' },
    ],
    practices: [
      {
        area: 'Pipeline orchestration',
        detail: 'Airflow DAGs with business rules parameterised per country, so one pipeline served four markets.',
        tools: ['Apache Airflow', 'Python', 'PostgreSQL'],
      },
      {
        area: 'Safe releases',
        detail: 'Every production change shipped with a dry-run mode and a reconciliation loop against the live dialer.',
        tools: ['Dry-run mode', 'pandas'],
      },
      {
        area: 'Requirements & specs',
        detail: 'Turned stakeholder needs and third-party API documentation into developer-ready specifications.',
        tools: ['ViciDial API', 'SQL'],
      },
      {
        area: 'Reporting & alerting',
        detail: 'Audit-ready Excel exports and automated stakeholder notifications on every run.',
        tools: ['pandas', 'Excel', 'Airflow alerts'],
      },
    ],
    challenges: [
      {
        problem: 'Duplicate uploads led to repeated calls to the same debtor.',
        solution: 'Call-frequency control enforced inside the pipeline before upload.',
      },
      {
        problem: 'Testing against a live dialer is risky.',
        solution: 'A dry-run mode exercises every step without touching ViciDial.',
      },
      {
        problem: 'The dialer\'s state can change underneath the pipeline.',
        solution: 'A reconciliation loop and adaptive logic keep the output aligned with live data.',
      },
    ],
    media: [{ src: '/DLA_Diagram.jpg', caption: 'Pipeline overview — from campaign rules to ViciDial upload and reporting.' }],
  },

  {
    slug: 'internal-automation-tools',
    // role / timeline fall back to the linked Cartrack experience
    users: 'Support, infrastructure and non-technical operations teams',
    contributions: [
      'Built automation workflows with n8n, Airflow and Bash to cut manual operations',
      'Turned complex ViciDial configuration into guided forms and self-service tools',
      'Worked with infrastructure and presales teams to analyse and fix production issues',
    ],
    skills: ['Workflow automation (n8n)', 'Internal tooling', 'Issue analysis', 'SQL & Bash'],
    examples: [
      {
        title: 'Self-service setup',
        scenario: 'A non-technical teammate needs a routine ViciDial configuration change.',
        steps: [
          'They fill in a guided form instead of waiting on engineering.',
          'The tool validates the input before anything is applied.',
          'Monitoring alerts the team if sensitive data changes unexpectedly.',
        ],
      },
      {
        title: 'Investigate an incident',
        scenario: 'Support needs to know what went wrong on a customer call.',
        steps: [
          'The log parser pulls out the key events and summarises the issue.',
          'Support reviews the summary instead of reading raw logs.',
        ],
      },
    ],
  },
]

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(c => c.slug === slug)
}
