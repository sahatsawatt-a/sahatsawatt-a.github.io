import { experiences, type Project } from '@/data/index'

export interface CategoryBadge {
  label: string
  classes: string
}

const ML_TAGS = /yolo|dinov2|milvus|pytorch|ocr|embed|opencv/i
const ETL_TAGS = /airflow|etl|spark|dbt|kafka/i
const TOOLS_TAGS = /n8n|bash|cli|script/i

/** Pure tag/title-driven category for a project; no template field involved. */
export function categoryBadge(p: Project): CategoryBadge {
  if (p.tags.some(t => ML_TAGS.test(t))) {
    return {
      label: 'ML / CV',
      classes:
        'bg-fuchsia-500/15 text-fuchsia-700 ring-fuchsia-500/20 dark:text-fuchsia-300',
    }
  }
  if (p.tags.some(t => ETL_TAGS.test(t))) {
    return {
      label: 'ETL',
      classes:
        'bg-violet-500/15 text-violet-700 ring-violet-500/20 dark:text-violet-300',
    }
  }
  if (/tool/i.test(p.title) || p.tags.some(t => TOOLS_TAGS.test(t))) {
    return {
      label: 'Tools',
      classes:
        'bg-sky-500/15 text-sky-700 ring-sky-500/20 dark:text-sky-300',
    }
  }
  return {
    label: 'Web',
    classes:
      'bg-amber-500/15 text-amber-700 ring-amber-500/20 dark:text-amber-300',
  }
}

/** Linked experience's company name, or "Side project" if unlinked. */
export function companyFor(p: Project): string {
  if (p.exp_id) {
    return experiences.find(e => e.exp_id === p.exp_id)?.company ?? p.org ?? 'Side project'
  }
  return p.org ?? 'Side project'
}
