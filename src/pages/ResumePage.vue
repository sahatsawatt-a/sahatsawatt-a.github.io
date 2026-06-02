<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import {
  info,
  skills,
  experiences,
  projects,
  type Experience,
  type Project,
} from '@/data/index'
import { formatDate } from '@/utils/date'

const PRINT_TITLE = 'sahatsawatt_a_resume'
let originalTitle = ''
const setPrintTitle = () => {
  originalTitle = document.title
  document.title = PRINT_TITLE
}
const restoreTitle = () => {
  document.title = originalTitle || document.title
}

onMounted(() => {
  window.addEventListener('beforeprint', setPrintTitle)
  window.addEventListener('afterprint', restoreTitle)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeprint', setPrintTitle)
  window.removeEventListener('afterprint', restoreTitle)
  restoreTitle()
})

const phone = '092-262-2870'
const email = 'sahatsawatt.a@outlook.com'
const address = '894/22 Waterford Sukhumvit 50, Sukhumvit Rd, Phra Khanong, Khlong Toei, Bangkok 10260'

const languages = [
  { name: 'Thai', level: 'Native' },
  { name: 'English', level: 'Intermediate' },
]

const softSkills = [
  'Problem-solving and analytical thinking',
  'Adaptability and continuous self-learning',
  'Attention to detail',
  'Cross-functional collaboration',
  'Process optimization mindset',
]

const technicalGroups = [
  { label: 'Programming Languages', value: 'Python, JavaScript, PHP, Bash' },
  { label: 'Database', value: 'PostgreSQL, MySQL' },
  { label: 'Framework', value: 'Laravel, Django, Vue' },
  { label: 'APIs & Automation', value: 'REST APIs, Webhooks, Apache Airflow, n8n' },
  { label: 'DevOps & Cloud', value: 'Docker, Linux, Networking, AWS (EC2, S3)' },
  { label: 'AI / ML', value: 'PyTorch, FastAPI, DINOv2, YOLO, Milvus, Ollama' },
]

const education = [
  {
    school: 'Assumption University of Thailand (ABAC)',
    period: '2019 – 2024',
    degree: 'Bachelor Degree of Business Administration',
    details: [
      { label: 'Major', value: 'Management Information System' },
      { label: 'Concentration', value: 'Accounting' },
    ],
    projects: [
      {
        title: 'Restaurant Ordering System',
        bullets: [
          'Led a team and solely developed the website for a restaurant ordering system using PHP Laravel 10, Inertia with VueJS 3, MySQL.',
          'Collaborated closely with the owner and stakeholders to tailor the requirements into a practical software implementation.',
          'Ensured efficient team communication and provided precise comprehensive reporting to external users.',
        ],
      },
      {
        title: 'Cyber Security Project',
        bullets: [
          'Led a team of 10 members.',
          'Deployed a WooCommerce WordPress website for a competition utilizing an AWS cloud server running Ubuntu 22.04.',
          'Enforced security protocols including firewall configurations, SSL certificate installations, HTTP header configurations, and routine system updates to safeguard web applications and data.',
          'Identified vulnerabilities, secured the server, and successfully resolved issues.',
        ],
      },
    ],
  },
]

const sortedExperiences: Experience[] = [...experiences].sort((a, b) => {
  if (a.end_date === '' && b.end_date !== '') return -1
  if (b.end_date === '' && a.end_date !== '') return 1
  return b.exp_id - a.exp_id
})

const projectsFor = (exp: Experience): Project[] =>
  projects.filter((p) => p.exp_id === exp.exp_id)

const formatPeriod = (exp: Experience): string => {
  const start = formatDate(exp.start_date)
  const end = exp.end_date ? formatDate(exp.end_date) : 'Present'
  return `${start} — ${end}`
}

const onPrint = () => window.print()
</script>

<template>
  <section class="reveal resume-page">
    <div class="glass gradient-border relative overflow-hidden rounded-3xl p-4 md:p-6 print:bg-transparent print:p-0 print:shadow-none">
      <div class="flex flex-wrap items-center justify-between gap-3 px-2 pt-2 md:px-4 md:pt-3 print:hidden">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          ← Back to home
        </RouterLink>

        <div class="flex items-center gap-3">
          <span
            class="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            resume.pdf
          </span>
          <button
            type="button"
            @click="onPrint"
            class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-medium text-white transition hover:translate-y-[-1px] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v7H6z"
              />
            </svg>
            Save PDF
          </button>
        </div>
      </div>

      <article
        class="resume-doc mt-4 grid grid-cols-1 overflow-hidden rounded-2xl ring-1 ring-slate-900/10 md:grid-cols-12 print:mt-0 print:rounded-none print:ring-0 dark:ring-white/10"
      >
        <!-- ── LEFT COLUMN (profile / contact / languages / skills) ── -->
        <aside
          class="resume-aside bg-gradient-to-b from-[#1f3b7a] via-[#1b3169] to-[#16264f] p-6 text-white md:col-span-4 md:p-8"
        >
          <div class="flex flex-col items-center">
            <div
              class="resume-avatar h-32 w-32 overflow-hidden rounded-full ring-4 ring-white/20 md:h-36 md:w-36"
            >
              <img
                :src="info.profileImage"
                :alt="info.full_name"
                loading="lazy"
                class="h-full w-full object-cover"
              />
            </div>
            <h1
              class="mt-6 text-center text-2xl font-bold leading-tight md:text-3xl"
            >
              {{ info.full_name }}
            </h1>
            <div class="mt-1 text-center text-xs text-white/70">
              {{ info.tagline }}
            </div>
          </div>

          <div class="mt-8 space-y-3 text-sm">
            <div class="flex items-start gap-3">
              <svg
                class="mt-0.5 h-4 w-4 shrink-0 text-white/70"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 5a2 2 0 012-2h2.3a1 1 0 01.97.76l1.2 4.5a1 1 0 01-.27.97L8 10.5a14 14 0 005.5 5.5l1.27-1.2a1 1 0 01.97-.27l4.5 1.2a1 1 0 01.76.97V19a2 2 0 01-2 2h-1A16 16 0 013 6V5z"
                />
              </svg>
              <span class="break-all">{{ phone }}</span>
            </div>
            <div class="flex items-start gap-3">
              <svg
                class="mt-0.5 h-4 w-4 shrink-0 text-white/70"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                :href="`mailto:${email}`"
                class="break-all transition hover:text-white/90 hover:underline"
              >
                {{ email }}
              </a>
            </div>
            <div class="flex items-start gap-3">
              <svg
                class="mt-0.5 h-4 w-4 shrink-0 text-white/70"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 22s7-7.58 7-13a7 7 0 10-14 0c0 5.42 7 13 7 13z"
                />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span class="leading-snug">{{ address }}</span>
            </div>
          </div>

          <div class="mt-8">
            <h2
              class="border-b-2 border-white/20 pb-1.5 text-base font-semibold uppercase tracking-wide"
            >
              Languages
            </h2>
            <ul class="mt-3 space-y-1.5 text-sm">
              <li
                v-for="lang in languages"
                :key="lang.name"
                class="flex items-center justify-between"
              >
                <span>{{ lang.name }}</span>
                <span class="text-xs text-white/60">{{ lang.level }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-8">
            <h2
              class="border-b-2 border-white/20 pb-1.5 text-base font-semibold uppercase tracking-wide"
            >
              Soft Skills
            </h2>
            <ul class="mt-3 space-y-1.5 text-sm leading-snug">
              <li
                v-for="item in softSkills"
                :key="item"
                class="flex gap-2"
              >
                <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/60"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-8">
            <h2
              class="border-b-2 border-white/20 pb-1.5 text-base font-semibold uppercase tracking-wide"
            >
              Technical Skills
            </h2>
            <ul class="mt-3 space-y-2.5 text-sm">
              <li v-for="group in technicalGroups" :key="group.label">
                <div class="font-semibold text-white">{{ group.label }}</div>
                <div class="text-white/80">{{ group.value }}</div>
              </li>
            </ul>
          </div>

          <div class="mt-8">
            <h2
              class="border-b-2 border-white/20 pb-1.5 text-base font-semibold uppercase tracking-wide"
            >
              Interests
            </h2>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="item in skills.interests"
                :key="item.label"
                class="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium leading-tight text-white ring-1 ring-white/30"
              >
                {{ item.label }}
              </span>
            </div>
          </div>

          <div class="resume-qr mt-8 hidden print:block">
            <h2
              class="border-b-2 border-white/20 pb-1.5 text-base font-semibold uppercase tracking-wide"
            >
              Online
            </h2>
            <div class="mt-3 flex items-center gap-3">
              <div class="qr-card rounded-md bg-white p-2">
                <img
                  src="/git_page_qr.png"
                  alt="Portfolio QR code"
                  class="block h-20 w-20"
                />
              </div>
              <div class="qr-label min-w-0 flex-1 leading-snug">
                <div class="text-[11px] font-semibold uppercase tracking-wide">
                  Scan to view
                </div>
                <div class="text-[10px] text-white/70">
                  Live portfolio &amp; latest projects
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- ── RIGHT COLUMN (experience + education) ── -->
        <div class="resume-main bg-white p-6 md:col-span-8 md:p-10 dark:bg-slate-950/40">
          <!-- Work Experience -->
          <section>
            <h2
              class="text-2xl font-bold text-[#1f3b7a] dark:text-sky-300"
            >
              Work Experience
            </h2>
            <div
              class="mt-1 h-0.5 w-16 rounded-full bg-[#1f3b7a]/70 dark:bg-sky-400/60"
            ></div>

            <div class="mt-6 space-y-8">
              <div
                v-for="exp in sortedExperiences"
                :key="exp.exp_id"
                class="relative"
              >
                <div class="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {{ exp.role }}
                  </h3>
                  <span
                    class="font-mono text-xs text-slate-500 dark:text-slate-400"
                  >
                    {{ formatPeriod(exp) }}
                  </span>
                </div>
                <div class="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                  {{ exp.company }}
                </div>

                <ul
                  v-if="exp.summary.length"
                  class="mt-3 space-y-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                >
                  <li
                    v-for="(bullet, i) in exp.summary"
                    :key="i"
                    :class="['flex gap-2', { 'print:hidden': i >= 2 }]"
                  >
                    <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                    <span>{{ bullet }}</span>
                  </li>
                </ul>

                <div v-if="projectsFor(exp).length" class="mt-4">
                  <h4
                    class="text-sm font-semibold text-[#1f3b7a] dark:text-sky-300"
                  >
                    Projects
                  </h4>
                  <ul class="mt-2 space-y-3">
                    <li
                      v-for="p in projectsFor(exp)"
                      :key="p.proj_id"
                    >
                      <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        <RouterLink
                          :to="`/projects/${p.slug}`"
                          class="transition hover:text-[#1f3b7a] hover:underline dark:hover:text-sky-300"
                        >
                          {{ p.title }}
                        </RouterLink>
                      </div>
                      <ul
                        class="mt-1 ml-4 space-y-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                      >
                        <li class="flex gap-2">
                          <span class="text-slate-400 dark:text-slate-500">◦</span>
                          <span>{{ p.description }}</span>
                        </li>
                        <li
                          v-for="(item, i) in p.impact || []"
                          :key="`impact-${i}`"
                          class="flex gap-2 print:hidden"
                        >
                          <span class="text-slate-400 dark:text-slate-500">◦</span>
                          <span>{{ item }}</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- Education -->
          <section class="mt-10">
            <h2
              class="text-2xl font-bold text-[#1f3b7a] dark:text-sky-300"
            >
              Education
            </h2>
            <div
              class="mt-1 h-0.5 w-16 rounded-full bg-[#1f3b7a]/70 dark:bg-sky-400/60"
            ></div>

            <div class="mt-6 space-y-8">
              <div v-for="edu in education" :key="edu.school">
                <div class="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {{ edu.school }}
                  </h3>
                  <span class="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {{ edu.period }}
                  </span>
                </div>
                <div class="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {{ edu.degree }}
                </div>
                <ul class="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  <li
                    v-for="detail in edu.details"
                    :key="detail.label"
                    class="flex gap-2"
                  >
                    <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                    <span>
                      <span class="font-semibold">{{ detail.label }}:</span>
                      {{ detail.value }}
                    </span>
                  </li>
                </ul>

                <div class="mt-4">
                  <h4
                    class="text-sm font-semibold text-[#1f3b7a] dark:text-sky-300"
                  >
                    Projects
                  </h4>
                  <ul class="mt-2 space-y-3">
                    <li v-for="proj in edu.projects" :key="proj.title">
                      <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {{ proj.title }}
                      </div>
                      <ul
                        class="mt-1 ml-4 space-y-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                      >
                        <li
                          v-for="(bullet, i) in proj.bullets"
                          :key="i"
                          class="flex gap-2"
                        >
                          <span class="text-slate-400 dark:text-slate-500">◦</span>
                          <span>{{ bullet }}</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      <div
        class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-900/5 pt-6 print:hidden dark:border-white/10"
      >
        <RouterLink
          to="/experience"
          class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          Full experience →
        </RouterLink>
        <RouterLink
          to="/projects"
          class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          See projects →
        </RouterLink>
        <RouterLink
          to="/contact"
          class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          Get in touch →
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style>
@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  html,
  body {
    background: #ffffff !important;
    color: #0f172a !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 210mm !important;
    height: 297mm !important;
    min-height: 0 !important;
    overflow: hidden !important;
  }

  /* Collapse every ancestor of the resume so nothing inherits a min-height that
     would push content onto a second page (Tailwind's min-h-screen, in particular). */
  body, body * {
    min-height: 0 !important;
  }
  #app {
    width: 210mm !important;
    height: 297mm !important;
    overflow: hidden !important;
  }

  /* Strip the page-level glass card so the document fills the sheet. */
  .resume-page,
  .resume-page > div {
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    height: 297mm !important;
    overflow: hidden !important;
  }
  .resume-page .gradient-border::before {
    display: none !important;
  }

  /* ── Print theme tokens ──────────────────────────────── */
  :root {
    --rc-navy: #1f3b7a;
    --rc-navy-deep: #14275a;
    --rc-ink: #0f172a;
    --rc-slate: #475569;
    --rc-slate-soft: #64748b;
    --rc-rule-light: rgba(255, 255, 255, 0.35);
  }

  /* Force the two columns to stay side-by-side at full A4 width.
     Hard-lock dimensions to A4 and clip anything that doesn't fit, so we
     never spill onto a second page. */
  .resume-doc {
    display: grid !important;
    grid-template-columns: 32% 68% !important;
    grid-template-rows: 297mm !important;
    width: 210mm !important;
    height: 297mm !important;
    max-height: 297mm !important;
    overflow: hidden !important;
    margin: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    color: var(--rc-ink) !important;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif !important;
    font-size: 8pt;
    line-height: 1.35;
    font-feature-settings: "ss01", "cv11", "kern";
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .resume-doc > * {
    min-width: 0 !important;
    overflow: hidden !important;
  }

  /* ── LEFT COLUMN ─────────────────────────────────────── */
  .resume-aside {
    background: var(--rc-navy) !important;
    color: #ffffff !important;
    padding: 10mm 7mm !important;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  .resume-aside * {
    color: inherit !important;
  }
  .resume-aside h1 {
    font-size: 15pt !important;
    font-weight: 700 !important;
    letter-spacing: -0.2pt !important;
    margin-top: 4mm !important;
    line-height: 1.1 !important;
  }
  /* Profile tagline directly under name */
  .resume-aside h1 + div {
    font-size: 7pt !important;
    margin-top: 1mm !important;
    letter-spacing: 0.5pt !important;
    text-transform: uppercase !important;
    color: rgba(255, 255, 255, 0.7) !important;
  }
  .resume-aside h2 {
    font-size: 9pt !important;
    font-weight: 700 !important;
    letter-spacing: 1.2pt !important;
    text-transform: uppercase !important;
    margin-top: 5.5mm !important;
    padding-bottom: 1.2mm !important;
    border-bottom: 0.4pt solid var(--rc-rule-light) !important;
  }
  .resume-avatar {
    width: 28mm !important;
    height: 28mm !important;
    margin: 0 auto !important;
    box-shadow: 0 0 0 0.6pt rgba(255, 255, 255, 0.5) inset !important;
  }
  .resume-avatar > img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
  }
  .resume-aside ul {
    margin-top: 2mm !important;
  }
  .resume-aside ul li,
  .resume-aside .text-sm {
    font-size: 7.5pt !important;
    line-height: 1.35 !important;
  }
  .resume-aside .text-xs,
  .resume-aside .text-\[11px\] {
    font-size: 6.5pt !important;
    color: rgba(255, 255, 255, 0.75) !important;
  }
  /* Contact icons get a subtle inset frame so they read on print */
  .resume-aside svg {
    color: rgba(255, 255, 255, 0.85) !important;
  }
  /* Soft skills bullets: small white dot inside the navy column.
     Scoped to spans that already have shrink-0 so we don't accidentally
     restyle the language name (which is also the first span in its <li>). */
  .resume-aside ul li > span[class*="shrink-0"]:first-child {
    background: rgba(255, 255, 255, 0.85) !important;
    width: 1mm !important;
    height: 1mm !important;
    margin-top: 1.4mm !important;
  }
  .resume-aside .mt-3 { margin-top: 1.8mm !important; }
  .resume-aside .mt-6 { margin-top: 3.5mm !important; }
  .resume-aside .mt-8 { margin-top: 4.5mm !important; }
  .resume-aside .space-y-3 > * + * { margin-top: 1.4mm !important; }
  .resume-aside .space-y-1\.5 > * + * { margin-top: 0.9mm !important; }
  .resume-aside .space-y-2\.5 > * + * { margin-top: 1.4mm !important; }

  /* Technical-skills group labels: emphasise the category, soften the value */
  .resume-aside .font-semibold {
    font-weight: 700 !important;
    letter-spacing: 0.2pt !important;
    color: #ffffff !important;
  }
  .resume-aside li > div + div {
    color: rgba(255, 255, 255, 0.78) !important;
  }

  /* Online QR block: QR on the left, label on the right; sized for scan */
  .resume-qr {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .resume-qr .qr-card {
    background: #ffffff !important;
    padding: 1mm !important;
    border-radius: 1mm !important;
    flex: 0 0 auto;
  }
  .resume-qr img {
    width: 20mm !important;
    height: 20mm !important;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
  .resume-qr .qr-label {
    line-height: 1.25 !important;
  }
  .resume-qr .qr-label > div:first-child {
    font-size: 7.5pt !important;
    color: #ffffff !important;
    letter-spacing: 0.2pt !important;
  }
  .resume-qr .qr-label > div:last-child {
    font-size: 6.5pt !important;
    color: rgba(255, 255, 255, 0.78) !important;
  }

  /* Interest chips: drop the pill in print and prepend a bullet so items separate */
  .resume-aside .flex-wrap {
    gap: 0.6mm 3mm !important;
  }
  .resume-aside .flex-wrap > span {
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
    font-size: 7pt !important;
    letter-spacing: 0.1pt !important;
    color: rgba(255, 255, 255, 0.88) !important;
  }
  .resume-aside .flex-wrap > span::before {
    content: "•";
    margin-right: 1mm;
    color: rgba(255, 255, 255, 0.7);
  }

  /* ── RIGHT COLUMN ────────────────────────────────────── */
  .resume-main {
    background: #ffffff !important;
    color: var(--rc-ink) !important;
    padding: 10mm 11mm !important;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  .resume-main * {
    color: var(--rc-ink) !important;
  }

  /* Section heading: navy label with a long accent rule under it */
  .resume-main h2 {
    font-size: 14pt !important;
    font-weight: 700 !important;
    letter-spacing: 0.3pt !important;
    color: var(--rc-navy) !important;
    margin-top: 0 !important;
    line-height: 1.1 !important;
    padding-bottom: 1.4mm !important;
    border-bottom: 0.6pt solid var(--rc-navy) !important;
  }
  /* The small `h-0.5 w-16 rounded-full bg-...` accent under the h2 is
     redundant once the h2 itself carries a navy underline, so hide it. */
  .resume-main h2 + div[class*="h-0.5"] {
    display: none !important;
  }

  /* Role title + company + date row */
  .resume-main h3 {
    font-size: 10.5pt !important;
    font-weight: 700 !important;
    letter-spacing: 0.1pt !important;
    line-height: 1.2 !important;
    color: var(--rc-ink) !important;
  }
  .resume-main h3 + div,
  .resume-main h3 ~ div:not([class*="mt-3"]):not([class*="mt-4"]) {
    color: var(--rc-slate) !important;
  }
  /* Company line directly below role */
  .resume-main .flex.flex-wrap.items-baseline + div {
    font-size: 8.5pt !important;
    font-style: italic !important;
    color: var(--rc-slate) !important;
    margin-top: 0.3mm !important;
  }

  /* Date pill on the right */
  .resume-main h4 {
    font-size: 8.5pt !important;
    font-weight: 700 !important;
    letter-spacing: 1pt !important;
    text-transform: uppercase !important;
    color: var(--rc-navy) !important;
    margin-top: 2.5mm !important;
    margin-bottom: 0.6mm !important;
  }
  .resume-main a {
    color: var(--rc-navy) !important;
    text-decoration: none !important;
    font-weight: 600 !important;
  }
  .resume-main .font-mono {
    color: var(--rc-slate) !important;
    font-size: 7.5pt !important;
    letter-spacing: 0.2pt !important;
  }
  .resume-main p,
  .resume-main li,
  .resume-main .text-sm {
    font-size: 8.5pt !important;
    line-height: 1.4 !important;
  }
  .resume-main ul {
    margin-top: 1.4mm !important;
  }
  .resume-main ul > li + li {
    margin-top: 0.8mm !important;
  }

  /* Filled navy dot for experience/education bullets (only spans that are
     already styled as dot markers via shrink-0). */
  .resume-main ul li > span[class*="shrink-0"]:first-child {
    background: var(--rc-navy) !important;
    width: 1.1mm !important;
    height: 1.1mm !important;
    margin-top: 1.6mm !important;
    flex-shrink: 0 !important;
  }
  /* Project description sub-bullets use the "◦" glyph: give it navy weight */
  .resume-main ul ul li > span:first-child {
    color: var(--rc-navy) !important;
    font-weight: 700 !important;
  }

  /* Compress the Tailwind vertical-rhythm utilities on the right column. */
  .resume-main .mt-1 { margin-top: 0.6mm !important; }
  .resume-main .mt-2 { margin-top: 1.2mm !important; }
  .resume-main .mt-3 { margin-top: 1.8mm !important; }
  .resume-main .mt-4 { margin-top: 2.4mm !important; }
  .resume-main .mt-6 { margin-top: 3.4mm !important; }
  .resume-main .mt-8 { margin-top: 4mm !important; }
  .resume-main .mt-10 { margin-top: 4.8mm !important; }
  .resume-main .space-y-8 > * + * { margin-top: 3.8mm !important; }
  .resume-main .space-y-3 > * + * { margin-top: 1.6mm !important; }
  .resume-main .space-y-1\.5 > * + * { margin-top: 0.9mm !important; }
  .resume-main .space-y-1 > * + * { margin-top: 0.5mm !important; }

  /* First section sits flush under the column padding. */
  .resume-main > section:first-child h2,
  .resume-aside > div:first-child {
    margin-top: 0 !important;
  }

  /* Keep section headings together with their first lines. */
  .resume-main section h2,
  .resume-main section h3,
  .resume-aside h2 {
    page-break-after: avoid;
    break-after: avoid;
  }
  .resume-main section,
  .resume-main li,
  .resume-aside ul,
  .resume-aside > div {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Drop the reveal-on-scroll opacity so content isn't hidden when printing. */
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }

  /* Square-off every rounded corner inside the resume document. */
  .resume-page,
  .resume-page *,
  .resume-doc,
  .resume-doc * {
    border-radius: 0 !important;
  }

  /* …then re-circle the profile photo. Chrome's print engine drops
     bitmap clipping from overflow:hidden + border-radius, so use
     clip-path on both the frame and the <img> so the circle prints. */
  .resume-avatar,
  .resume-avatar > img {
    border-radius: 9999px !important;
    clip-path: circle(50% at 50% 50%) !important;
    -webkit-clip-path: circle(50% at 50% 50%) !important;
  }
}
</style>
