import { useEffect, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  formatDate,
  formatMonth,
  getMonthMatrix,
  parseISODate,
  todayISO,
  weekDayLabels,
} from '../../lib/utils/date'
import { cn } from '../../lib/utils/format'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

interface DateFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  minDate?: string
  error?: string
  placeholder?: string
}

export function DateField({
  id,
  label,
  value,
  onChange,
  minDate = todayISO(),
  error,
  placeholder = 'Select date',
}: DateFieldProps) {
  const [open, setOpen] = useState(false)
  const initial = parseISODate(value) ?? parseISODate(minDate) ?? new Date()
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())
  const wrapRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(wrapRef, () => setOpen(false), open)

  useEffect(() => {
    if (!value) return
    const date = parseISODate(value)
    if (date) {
      setViewYear(date.getFullYear())
      setViewMonth(date.getMonth())
    }
  }, [value])

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const min = parseISODate(minDate) ?? new Date()
  const weeks = getMonthMatrix(viewYear, viewMonth)
  const canGoPrevious =
    viewYear > min.getFullYear() || (viewYear === min.getFullYear() && viewMonth > min.getMonth())
  const monthStart = new Date(viewYear, viewMonth, 1, 12)
  const display = value ? formatDate(value, true) : placeholder

  const changeMonth = (direction: number) => {
    const next = new Date(viewYear, viewMonth + direction, 1, 12)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
  }

  return (
    <div ref={wrapRef} className={cn('search-field search-field--date', error && 'has-error', open && 'is-open')}>
      <label htmlFor={id} className="search-field__label">{label}</label>
      <button
        type="button"
        id={id}
        className={cn('search-field__trigger', !value && 'is-placeholder')}
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <CalendarDays size={17} strokeWidth={1.8} className="search-field__icon" aria-hidden="true" />
        <span className="date-field__text">
          <span className="date-field__value">{display}</span>
          {value && <span className="date-field__weekday">{formatDate(value)}</span>}
        </span>
      </button>

      {open && (
        <div className="calendar-popover" role="dialog" aria-label={`Choose ${label.toLowerCase()}`} aria-modal="false">
          <div className="calendar-popover__head">
            <button type="button" onClick={() => changeMonth(-1)} disabled={!canGoPrevious} aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <strong>{formatMonth(viewYear, viewMonth)}</strong>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="calendar-grid calendar-grid--labels" aria-hidden="true">
            {weekDayLabels.map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="calendar-grid">
            {weeks.flat().map((iso, index) => {
              if (!iso) return <span key={`empty-${index}`} className="calendar-day calendar-day--empty" />
              const date = parseISODate(iso)
              if (!date) return null
              const disabled = iso < minDate
              const selected = iso === value
              const today = iso === todayISO()
              const inCurrentMonth = date.getMonth() === viewMonth
              return (
                <button
                  key={iso}
                  type="button"
                  className={cn(
                    'calendar-day',
                    selected && 'is-selected',
                    today && 'is-today',
                    !inCurrentMonth && 'is-outside',
                  )}
                  disabled={disabled}
                  aria-label={formatDate(iso, true)}
                  aria-pressed={selected}
                  onClick={() => {
                    onChange(iso)
                    setOpen(false)
                  }}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
          <div className="calendar-popover__foot">
            <button
              type="button"
              className="text-button"
              onClick={() => {
                onChange(minDate)
                setOpen(false)
              }}
            >
              Earliest available
            </button>
            <span>{monthStart.getFullYear()}</span>
          </div>
        </div>
      )}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
