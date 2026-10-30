import { useRef, useState } from 'react'
import { Baby, Minus, Plus, UserRound, Users } from 'lucide-react'
import type { CabinClass } from '../../types'
import { CABIN_LABELS } from '../../lib/data/airlines'
import { cn, pluralise } from '../../lib/utils/format'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

interface TravellersFieldProps {
  adults: number
  children: number
  infants: number
  cabin: CabinClass
  error?: string
  onChange: (next: { adults?: number; children?: number; infants?: number; cabin?: CabinClass }) => void
}

const COUNTERS = [
  { key: 'adults', label: 'Adults', hint: '12 years and above', icon: UserRound },
  { key: 'children', label: 'Children', hint: '2–11 years', icon: Users },
  { key: 'infants', label: 'Infants', hint: 'Under 2 years', icon: Baby },
] as const

export function TravellersField({ adults, children, infants, cabin, error, onChange }: TravellersFieldProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(wrapRef, () => setOpen(false), open)

  const total = adults + children + infants
  const summary = total === 1 ? '1 traveller' : `${total} travellers`
  const classLabel = CABIN_LABELS[cabin] ?? 'Economy'

  const update = (key: 'adults' | 'children' | 'infants', delta: number) => {
    const current = { adults, children, infants }
    const nextValue = Math.max(key === 'adults' ? 1 : 0, current[key] + delta)
    const next = { ...current, [key]: nextValue }
    if (next.adults + next.children + next.infants > 9) return
    if (next.infants > next.adults) return
    onChange({ [key]: nextValue })
  }

  return (
    <div ref={wrapRef} className={cn('search-field search-field--travellers', error && 'has-error', open && 'is-open')}>
      <span className="search-field__label" id="travellers-label">Passengers &amp; class</span>
      <button
        type="button"
        className="search-field__trigger"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby="travellers-label"
        aria-describedby={error ? 'travellers-error' : undefined}
      >
        <Users size={17} strokeWidth={1.8} className="search-field__icon" aria-hidden="true" />
        <span className="travellers-field__text">
          <span>{summary}</span>
          <span className="travellers-field__sub">{classLabel}</span>
        </span>
      </button>

      {open && (
        <div className="travellers-popover" role="dialog" aria-label="Passengers and cabin class">
          <div className="travellers-popover__head">
            <span className="micro-label">Travellers</span>
            <span>{pluralise(total, 'traveller')} · max 9</span>
          </div>
          <div className="travellers-popover__counters">
            {COUNTERS.map(({ key, label, hint, icon: Icon }) => {
              const count = key === 'adults' ? adults : key === 'children' ? children : infants
              const min = key === 'adults' ? 1 : 0
              const totalAfter = total + 1
              const disableMinus = count <= min
              const disablePlus =
                totalAfter > 9 ||
                (key === 'infants' && infants + 1 > adults) ||
                (key !== 'infants' && infants > adults)
              return (
                <div className="counter-row" key={key}>
                  <span className="counter-row__icon"><Icon size={17} /></span>
                  <span className="counter-row__body">
                    <strong>{label}</strong>
                    <span>{hint}</span>
                  </span>
                  <span className="counter">
                    <button type="button" onClick={() => update(key, -1)} disabled={disableMinus} aria-label={`Remove one ${label.toLowerCase()}`}>
                      <Minus size={14} />
                    </button>
                    <span aria-live="polite">{count}</span>
                    <button type="button" onClick={() => update(key, 1)} disabled={disablePlus} aria-label={`Add one ${label.toLowerCase()}`}>
                      <Plus size={14} />
                    </button>
                  </span>
                </div>
              )
            })}
          </div>
          <div className="travellers-popover__cabin">
            <span className="micro-label">Cabin class</span>
            <div className="cabin-options">
              {(Object.keys(CABIN_LABELS) as CabinClass[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={cn('cabin-option', cabin === option && 'is-selected')}
                  onClick={() => onChange({ cabin: option })}
                  aria-pressed={cabin === option}
                >
                  {CABIN_LABELS[option]}
                </button>
              ))}
            </div>
          </div>
          <div className="travellers-popover__foot">
            <p>Infants must travel with an adult. For 10+ travellers, contact our team.</p>
            <button type="button" className="btn btn--dark btn--sm" onClick={() => setOpen(false)}>Done</button>
          </div>
        </div>
      )}
      {error && <p className="field-error" id="travellers-error">{error}</p>}
    </div>
  )
}
