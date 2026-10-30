export const cn = (...values: Array<string | false | null | undefined>): string =>
  values.filter(Boolean).join(' ')

export const formatNPR = (amount: number): string =>
  new Intl.NumberFormat('en-NP', { maximumFractionDigits: 0 }).format(amount)

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins.toString().padStart(2, '0')}m`
}

export const minutesToTime = (minutes: number): string => {
  const normalised = ((minutes % 1440) + 1440) % 1440
  const hours = Math.floor(normalised / 60)
  const mins = normalised % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

export const dayOffset = (minutes: number): number => Math.floor(minutes / 1440)

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const titleCase = (value: string): string =>
  value
    .split(/[\s-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

export const pluralise = (count: number, singular: string, plural?: string): string =>
  `${count} ${count === 1 ? singular : plural ?? `${singular}s`}`

export const makeId = (prefix = 'id'): string =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`
