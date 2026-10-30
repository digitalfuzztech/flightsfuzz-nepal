const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const pad = (value: number) => value.toString().padStart(2, '0')

export const toISODate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const parseISODate = (value: string): Date | null => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day, 12, 0, 0, 0)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null
  return date
}

export const todayISO = (): string => toISODate(new Date())

export const addDaysISO = (iso: string, days: number): string => {
  const date = parseISODate(iso)
  if (!date) return iso
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

export const formatDate = (iso: string, withWeekday = false): string => {
  const date = parseISODate(iso)
  if (!date) return 'Select date'
  const weekday = withWeekday ? `${WEEKDAYS_LONG[date.getDay()]}, ` : ''
  return `${weekday}${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`
}

export const formatDateShort = (iso: string): string => {
  const date = parseISODate(iso)
  if (!date) return '—'
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`
}

export const formatMonth = (year: number, month: number): string => `${MONTHS[month]} ${year}`

export const getMonthMatrix = (year: number, month: number): Array<Array<string | null>> => {
  const first = new Date(year, month, 1, 12)
  const daysInMonth = new Date(year, month + 1, 0, 12).getDate()
  const startIndex = (first.getDay() + 6) % 7 // Monday-first
  const cells: Array<string | null> = Array(startIndex).fill(null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(toISODate(new Date(year, month, day, 12)))
  }
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks: Array<Array<string | null>> = []
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7))
  }
  return weeks
}

export const weekDayLabels = WEEKDAYS

export const isPastDate = (iso: string): boolean => {
  const date = parseISODate(iso)
  if (!date) return true
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date.getTime() < today.getTime()
}

export const ageInYears = (dobISO: string, referenceISO = todayISO()): number | null => {
  const dob = parseISODate(dobISO)
  const reference = parseISODate(referenceISO)
  if (!dob || !reference) return null
  let age = reference.getFullYear() - dob.getFullYear()
  const month = reference.getMonth() - dob.getMonth()
  if (month < 0 || (month === 0 && reference.getDate() < dob.getDate())) age -= 1
  return age
}

export const formatTimeRange = (start: string, end: string, sameDay: boolean): string =>
  `${start} — ${end}${sameDay ? '' : ' (+1)'}`
