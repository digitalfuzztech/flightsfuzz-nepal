import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeftRight, ArrowRight, Plus, X } from 'lucide-react'
import type { Airport, CabinClass, FlightSearch, TripType } from '../../types'
import { addDaysISO, isPastDate, todayISO } from '../../lib/utils/date'
import { buildSearchUrl, createDefaultSearch } from '../../lib/utils/search'
import { cn } from '../../lib/utils/format'
import { AirportField } from './AirportField'
import { DateField } from './DateField'
import { TravellersField } from './TravellersField'

interface DraftSegment {
  from: Airport | null
  to: Airport | null
  date: string
}

interface DraftSearch {
  tripType: TripType
  segments: DraftSegment[]
  returnDate: string
  adults: number
  children: number
  infants: number
  cabin: CabinClass
}

interface FlightSearchFormProps {
  initialSearch?: FlightSearch
  onSearch?: (search: FlightSearch) => void
  variant?: 'hero' | 'compact'
  submitLabel?: string
}

const toDraft = (search: FlightSearch): DraftSearch => ({
  tripType: search.tripType,
  segments: search.segments.map((segment) => ({ from: segment.from, to: segment.to, date: segment.date })),
  returnDate: search.returnDate ?? addDaysISO(search.segments[0]?.date ?? todayISO(), 7),
  adults: search.adults,
  children: search.children,
  infants: search.infants,
  cabin: search.cabin,
})

const TRIP_TABS: Array<{ value: TripType; label: string }> = [
  { value: 'oneway', label: 'One Way' },
  { value: 'roundtrip', label: 'Round Trip' },
  { value: 'multicity', label: 'Multi City' },
]

export function FlightSearchForm({
  initialSearch,
  onSearch,
  variant = 'hero',
  submitLabel = 'Search flights',
}: FlightSearchFormProps) {
  const navigate = useNavigate()
  const [draft, setDraft] = useState<DraftSearch>(() => toDraft(initialSearch ?? createDefaultSearch()))
  const [errors, setErrors] = useState<Record<string, string>>({})

  const errorCount = useMemo(() => Object.keys(errors).length, [errors])
  const isMulti = draft.tripType === 'multicity'

  const patch = (next: Partial<DraftSearch>) => {
    setDraft((current) => ({ ...current, ...next }))
  }

  const setTripType = (tripType: TripType) => {
    if (tripType === draft.tripType) return
    setErrors({})
    if (tripType === 'multicity') {
      const first = draft.segments[0]
      const secondDate = addDaysISO(first?.date ?? todayISO(), 3)
      const fallbackTo = first?.from?.code === 'DXB' ? null : null
      patch({
        tripType,
        segments: [
          first,
          {
            from: first?.to ?? null,
            to: fallbackTo,
            date: secondDate,
          },
        ],
      })
    } else {
      patch({ tripType, segments: [draft.segments[0]] })
    }
  }

  const updateSegment = (index: number, next: Partial<DraftSegment>) => {
    setDraft((current) => {
      const segments = current.segments.map((segment, segmentIndex) => {
        if (segmentIndex !== index) return segment
        const updated = { ...segment, ...next }
        return updated
      })
      if (next.date) {
        for (let cursor = index + 1; cursor < segments.length; cursor += 1) {
          if (segments[cursor].date <= segments[cursor - 1].date) {
            segments[cursor] = { ...segments[cursor], date: addDaysISO(segments[cursor - 1].date, 2) }
          }
        }
      }
      let returnDate = current.returnDate
      const firstDate = segments[0]?.date
      if (firstDate && returnDate <= firstDate) returnDate = addDaysISO(firstDate, 7)
      return { ...current, segments, returnDate }
    })
  }

  const swapRoute = (index: number) => {
    setDraft((current) => ({
      ...current,
      segments: current.segments.map((segment, segmentIndex) =>
        segmentIndex === index ? { ...segment, from: segment.to, to: segment.from } : segment,
      ),
    }))
  }

  const addLeg = () => {
    setDraft((current) => {
      if (current.segments.length >= 5) return current
      const previous = current.segments[current.segments.length - 1]
      return {
        ...current,
        segments: [
          ...current.segments,
          {
            from: previous.to,
            to: null,
            date: addDaysISO(previous.date, 3),
          },
        ],
      }
    })
  }

  const removeLeg = (index: number) => {
    setDraft((current) => ({
      ...current,
      segments: current.segments.filter((_, segmentIndex) => segmentIndex !== index),
    }))
  }

  const validate = (): FlightSearch | null => {
    const nextErrors: Record<string, string> = {}

    draft.segments.forEach((segment, index) => {
      const prefix = isMulti ? `segment-${index}` : 'route'
      if (!segment.from) nextErrors[`${prefix}-from`] = 'Choose a departure airport.'
      if (!segment.to) nextErrors[`${prefix}-to`] = 'Choose a destination airport.'
      if (segment.from && segment.to && segment.from.code === segment.to.code) {
        nextErrors[`${prefix}-to`] = 'Origin and destination must differ.'
      }
      if (!segment.date) nextErrors[`${prefix}-date`] = 'Select a date.'
      else if (isPastDate(segment.date)) nextErrors[`${prefix}-date`] = 'Choose a future date.'
    })

    if (draft.tripType === 'roundtrip') {
      if (!draft.returnDate) nextErrors['return'] = 'Select a return date.'
      else if (draft.returnDate <= draft.segments[0].date) {
        nextErrors['return'] = 'Return must be after departure.'
      }
    }

    if (isMulti) {
      if (draft.segments.length < 2) nextErrors['segments'] = 'Add at least two legs.'
      if (draft.segments.some((segment, index) => index > 0 && segment.date < draft.segments[index - 1].date)) {
        nextErrors['segments'] = 'Keep legs in date order.'
      }
    }

    if (draft.infants > draft.adults) {
      nextErrors['passengers'] = 'Each infant must travel with an adult.'
    }
    if (draft.adults + draft.children + draft.infants > 9) {
      nextErrors['passengers'] = 'For 10 or more travellers, contact our team.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      window.requestAnimationFrame(() => {
        const firstInvalid = document.querySelector<HTMLElement>('.flight-search [aria-invalid="true"]')
        firstInvalid?.focus()
      })
      return null
    }

    return {
      tripType: draft.tripType,
      segments: draft.segments.map((segment) => ({
        from: segment.from as Airport,
        to: segment.to as Airport,
        date: segment.date,
      })),
      returnDate: draft.tripType === 'roundtrip' ? draft.returnDate : undefined,
      adults: draft.adults,
      children: draft.children,
      infants: draft.infants,
      cabin: draft.cabin,
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const result = validate()
    if (!result) return
    if (onSearch) onSearch(result)
    else navigate(buildSearchUrl(result))
  }

  return (
    <form
      id="search"
      className={cn('flight-search', `flight-search--${variant}`)}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flight-search__top">
        <div className="trip-tabs" role="tablist" aria-label="Trip type">
          {TRIP_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={draft.tripType === tab.value}
              className={cn('trip-tab', draft.tripType === tab.value && 'is-active')}
              onClick={() => setTripType(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="flight-search__demo">
          <span className="dot" aria-hidden="true" />
          Demo search · no live fares
        </p>
      </div>

      {errorCount > 0 && (
        <div className="form-error-banner" role="alert">
          <AlertCircle size={17} />
          <span>Please check the highlighted fields. This helps us prepare an accurate request.</span>
        </div>
      )}

      {!isMulti ? (
        <div className={cn('flight-search__row', draft.tripType === 'oneway' && 'flight-search__row--oneway')}>
          <AirportField
            id="search-from"
            label="From"
            value={draft.segments[0].from}
            onChange={(airport) => updateSegment(0, { from: airport })}
            excludeCode={draft.segments[0].to?.code}
            error={errors['route-from']}
          />
          <button
            type="button"
            className="swap-button"
            onClick={() => swapRoute(0)}
            aria-label="Swap origin and destination"
            title="Swap airports"
          >
            <ArrowLeftRight size={16} />
          </button>
          <AirportField
            id="search-to"
            label="To"
            value={draft.segments[0].to}
            onChange={(airport) => updateSegment(0, { to: airport })}
            excludeCode={draft.segments[0].from?.code}
            error={errors['route-to']}
          />
          <DateField
            id="search-depart"
            label="Departure"
            value={draft.segments[0].date}
            onChange={(date) => updateSegment(0, { date })}
            minDate={todayISO()}
            error={errors['route-date']}
          />
          {draft.tripType === 'roundtrip' && (
            <DateField
              id="search-return"
              label="Return"
              value={draft.returnDate}
              onChange={(returnDate) => patch({ returnDate })}
              minDate={addDaysISO(draft.segments[0].date, 1)}
              error={errors['return']}
            />
          )}
          <TravellersField
            adults={draft.adults}
            children={draft.children}
            infants={draft.infants}
            cabin={draft.cabin}
            error={errors['passengers']}
            onChange={(next) => patch(next)}
          />
          <button type="submit" className="search-submit">
            <span>{submitLabel}</span>
            <ArrowRight size={18} strokeWidth={2.2} />
          </button>
        </div>
      ) : (
        <div className="multicity">
          <div className="multicity__list">
            {draft.segments.map((segment, index) => (
              <div className="multicity__row" key={index}>
                <span className="multicity__index">LEG {String(index + 1).padStart(2, '0')}</span>
                <AirportField
                  id={`search-segment-${index}-from`}
                  label="From"
                  value={segment.from}
                  onChange={(airport) => updateSegment(index, { from: airport })}
                  excludeCode={segment.to?.code}
                  error={errors[`segment-${index}-from`]}
                />
                <button
                  type="button"
                  className="swap-button"
                  onClick={() => swapRoute(index)}
                  aria-label={`Swap airports on leg ${index + 1}`}
                >
                  <ArrowLeftRight size={16} />
                </button>
                <AirportField
                  id={`search-segment-${index}-to`}
                  label="To"
                  value={segment.to}
                  onChange={(airport) => updateSegment(index, { to: airport })}
                  excludeCode={segment.from?.code}
                  error={errors[`segment-${index}-to`]}
                />
                <DateField
                  id={`search-segment-${index}-date`}
                  label="Departure"
                  value={segment.date}
                  onChange={(date) => updateSegment(index, { date })}
                  minDate={index === 0 ? todayISO() : draft.segments[index - 1].date}
                  error={errors[`segment-${index}-date`]}
                />
                {draft.segments.length > 2 ? (
                  <button
                    type="button"
                    className="multicity__remove"
                    onClick={() => removeLeg(index)}
                    aria-label={`Remove leg ${index + 1}`}
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <span className="multicity__remove-placeholder" />
                )}
              </div>
            ))}
          </div>
          <div className="multicity__actions">
            <TravellersField
              adults={draft.adults}
              children={draft.children}
              infants={draft.infants}
              cabin={draft.cabin}
              error={errors['passengers']}
              onChange={(next) => patch(next)}
            />
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={addLeg}
              disabled={draft.segments.length >= 5}
            >
              <Plus size={16} /> Add another leg
            </button>
            <button type="submit" className="search-submit">
              <span>{submitLabel}</span>
              <ArrowRight size={18} />
            </button>
          </div>
          {errors['segments'] && <p className="field-error field-error--block">{errors['segments']}</p>}
        </div>
      )}

      {variant === 'hero' && (
        <div className="flight-search__foot">
          <p>
            <strong>How it works:</strong> search a route, choose a demonstration option, then send a
            booking request. A Flash Flights team member follows up personally.
          </p>
          <span className="flight-search__foot-mark">SEARCH → REQUEST → CONFIRM</span>
        </div>
      )}
    </form>
  )
}
