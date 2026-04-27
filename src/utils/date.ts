/** Formats a DD/MM/YYYY date string to "Month YYYY", or "Present" if empty. */
export function formatDate(dateStr: string): string {
  if (!dateStr) return 'Present'
  const [day, month, year] = dateStr.split('/').map(Number)
  const date = new Date(year, month - 1, day)
  return `${date.toLocaleString('en-US', { month: 'long' })} ${year}`
}

/** Returns a human-readable duration between two DD/MM/YYYY dates. endStr defaults to today. */
export function diffDate(startStr: string, endStr?: string): string {
  const [sd, sm, sy] = startStr.split('/').map(Number)
  const start = new Date(sy, sm - 1, sd)

  const end = endStr
    ? (() => { const [ed, em, ey] = endStr.split('/').map(Number); return new Date(ey, em - 1, ed) })()
    : new Date()

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  if (months < 0) { years--; months += 12 }

  const y = years ? `${years} year${years > 1 ? 's' : ''}` : ''
  const m = months ? `${months} month${months > 1 ? 's' : ''}` : ''
  return [y, m].filter(Boolean).join(' ')
}
