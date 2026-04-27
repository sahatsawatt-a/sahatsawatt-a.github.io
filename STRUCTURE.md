# Project Structure

Personal portfolio website for Sahatsawatt Anankatham, built with Vue 3 + Vite + Tailwind CSS and deployed to GitHub Pages.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 + Flowbite |
| Routing | Vue Router 4 (hash history) |
| Language | JS entry point, TypeScript for data/types |
| Dev environment | Docker + Docker Compose |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Directory Overview

```
sahatsawatt-a.github.io/
├── .github/workflows/
│   └── pages.yml           # CI/CD: build & deploy to GitHub Pages on push to main
├── public/                 # Static assets served as-is
│   ├── profile_pic.jpg
│   ├── logo.png
│   └── DLA_Diagram.jpg
├── src/
│   ├── main.js             # App entry point — mounts Vue app, registers router
│   ├── App.vue             # Root component — wraps RouterView in MainLayout, inits Flowbite
│   ├── style.css           # Global CSS
│   ├── assets/             # Bundled assets (imported inside components)
│   ├── layouts/
│   │   └── MainLayout.vue  # Shell: AppBackground + AppHeader + <slot> + AppFooter
│   ├── pages/              # Route-level components (one per route)
│   │   ├── HomePage.vue
│   │   ├── DashboardPage.vue
│   │   ├── ProjectsPage.vue
│   │   └── ProjectDetailPage.vue
│   ├── components/
│   │   ├── AppHeader.vue           # Top navigation bar
│   │   ├── AppFooter.vue           # Bottom footer
│   │   ├── backgrounds/
│   │   │   └── AppBackground.vue   # Decorative background layer (behind z-10 content)
│   │   ├── objects/
│   │   │   └── ProfileCard.vue     # Standalone profile card widget
│   │   ├── ui/
│   │   │   └── ProfileImage.vue    # Reusable profile image component
│   │   ├── sections/               # Page section components (used in pages)
│   │   │   ├── HeroSection.vue
│   │   │   ├── TimelineSection.vue
│   │   │   ├── AboutSection.vue
│   │   │   ├── SkillsSection.vue
│   │   │   ├── ExperienceSection.vue
│   │   │   ├── ProjectsSection.vue
│   │   │   ├── ProjectsCardSection.vue
│   │   │   └── ContactSection.vue
│   │   └── project/                # Project-specific components
│   │       ├── ProjectList.vue
│   │       └── detail/
│   │           ├── ProjectDetailDefault.vue
│   │           └── ProjectDetailEtl.vue
│   ├── data/                       # Static content data (no API calls)
│   │   ├── profile.ts              # Main portfolio content (hero, about, skills, experience, projects, contact, footer)
│   │   └── skye.ts                 # Newer data structure (experience + projects with IDs, relational shape)
│   ├── router/
│   │   └── index.ts                # Route definitions
│   └── types/
│       └── flowbite.d.ts           # TypeScript declaration for Flowbite
├── index.html                      # Vite HTML entry point
├── vite.config.js                  # Vite config — Vue plugin, Tailwind, path alias @→src
├── tailwind.config.js              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and npm scripts
├── Dockerfile                      # node:20-alpine image for dev/build containers
└── docker-compose.yml              # Three services: init, dev, build
```

---

## Routing

Defined in `src/router/index.ts` using hash history (`/#/`):

| Path | Page Component | Notes |
|---|---|---|
| `/` | `HomePage.vue` | Main portfolio page |
| `/dashboard` | `DashboardPage.vue` | Dashboard view |
| `/projects` | `ProjectsPage.vue` | Projects list |
| `/projects/:slug` | `ProjectDetailPage.vue` | Project detail, `slug` passed as prop |
| `/*` | — | Redirects to `/` |

---

## Page Composition

`HomePage.vue` assembles the full portfolio by stacking section components in order:

```
HeroSection → TimelineSection → ProjectsCardSection → ProjectsSection
→ AboutSection → SkillsSection → ExperienceSection → ContactSection
```

---

## Data Layer

All content lives in `src/data/` as exported TypeScript constants — no backend, no API calls.

### `profile.ts` — primary data file
| Export | Content |
|---|---|
| `header` | Name, initials, tagline, profile image |
| `hero` | Status, title, description, quick-profile cards |
| `about` | Bio paragraphs |
| `skills` | Core skills, technical tools, interests |
| `experience` | Work history with bullet points |
| `projects` | Project list with slug, template type, tags, images, detail content |
| `contact` | Email info |
| `footer` | Footer text |

### `skye.ts` — newer relational structure
Uses numeric IDs to link experiences and projects (`exp_id`, `proj_id`). Intended as a more structured replacement for the flat shape in `profile.ts`.

---

## Layout Structure

```
<div>                          ← MainLayout root (full page, dark-mode aware)
  <AppBackground />            ← Decorative layer (position: absolute, z-0)
  <div class="relative z-10"> ← Content wrapper (max-w-7xl, centered)
    <AppHeader />
    <main>
      <slot />                 ← RouterView renders here
    </main>
    <AppFooter />
  </div>
</div>
```

---

## Project Detail Templates

Each project in `profile.ts` has a `template` field. `ProjectDetailPage.vue` uses this to pick which detail component to render:

| Template value | Component |
|---|---|
| `"etl"` | `ProjectDetailEtl.vue` |
| _(default)_ | `ProjectDetailDefault.vue` |

---

## Development Workflow

### Local dev (Docker)

```bash
# Install dependencies
docker compose run --rm init

# Start dev server at http://localhost:5173
docker compose up dev
```

### Build

```bash
docker compose run --rm build
# Output goes to dist/
```

### Deploy

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/pages.yml`), which runs `npm ci && npm run build` and deploys `dist/` to GitHub Pages automatically.

---

## Path Alias

`@` resolves to `./src`, configured in `vite.config.js`:

```js
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

Used in imports like `import TimelineSection from '@/components/sections/TimelineSection.vue'`.
