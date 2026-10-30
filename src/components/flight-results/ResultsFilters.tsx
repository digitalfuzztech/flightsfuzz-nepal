import { Check, RotateCcw } from 'lucide-react'
import type { CabinClass, MockFlight } from '../../types'
import { CABIN_LABELS, DEMO_AIRLINES } from '../../lib/data/airlines'
import { cn } from '../../lib/utils/format'

export interface ResultFilters {
  airlines: string[]
  stops: string
  departure: string[]
  arrival: string[]
}

export const EMPTY_FILTERS: ResultFilters = {
  airlines: [],
  stops: 'any',
  departure: [],
  arrival: [],
}

export const TIME_BUCKETS = [
  { id: 'early', label: 'Before 06:00', start: 0, end: 360 },
  { id: 'morning', label: '06:00 – 12:00', start: 360, end: 720 },
  { id: 'afternoon', label: '12:00 – 18:00', start: 720, end: 1080 },
  { id: 'evening', label: 'After 18:00', start: 1080, end: 1440 },
]

export const matchesTime = (minutes: number, buckets: string[]): boolean => {
  if (buckets.length === 0) return true
  const normalised = minutes % 1440
  return buckets.some((bucket) => {
    const definition = TIME_BUCKETS.find((item) => item.id === bucket)
    return definition ? normalised >= definition.start && normalised < definition.end : true
  })
}

export const filterFlights = (flights: MockFlight[], filters: ResultFilters): MockFlight[] =>
  flights.filter((flight) => {
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline.code)) return false
    if (filters.stops === 'direct' && flight.stops !== 0) return false
    if (filters.stops === 'one' && flight.stops !== 1) return false
    if (filters.stops === 'two' && flight.stops < 2) return false
    if (!matchesTime(flight.departureMinutes, filters.departure)) return false
    if (!matchesTime(flight.arrivalMinutes, filters.arrival)) return false
    return true
  })

interface ResultsFiltersProps {
  flights: MockFlight[]
  filters: ResultFilters
  onChange: (filters: ResultFilters) => void
  cabin: CabinClass
  onCabinChange: (cabin: CabinClass) => void
  onClear: () => void
}

export function ResultsFilters({ flights, filters, onChange, cabin, onCabinChange, onClear }: ResultsFiltersProps) {
  const toggleArray = (key: 'airlines' | 'departure' | 'arrival', value: string) => {
    const current = filters[key]
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    onChange({ ...filters, [key]: next })
  }

  const countByAirline = (code: string) => flights.filter((flight) => flight.airline.code === code).length
  const countByStops = (predicate: (stops: number) => boolean) => flights.filter((flight) => predicate(flight.stops)).length

  return (
    <aside className="filters" aria-label="Filter flight results">
      <div className="filters__head">
        <h2>Filters</h2>
        <button type="button" className="text-button" onClick={onClear}>
          <RotateCcw size={13} /> Clear all
        </button>
      </div>

      <fieldset className="filter-group">
        <legend>Cabin class</legend>
        <div className="filter-chips filter-chips--vertical">
          {(Object.keys(CABIN_LABELS) as CabinClass[]).map((option) => (
            <button
              key={option}
              type="button"
              className={cn('filter-chip', cabin === option && 'is-active')}
              onClick={() => onCabinChange(option)}
              aria-pressed={cabin === option}
            >
              {CABIN_LABELS[option]}
              {cabin === option && <Check size={13} />}
            </button>
          ))}
        </div>
        <p className="filter-help">Changing cabin regenerates the demonstration fares.</p>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Airline</legend>
        <div className="filter-options">
          {DEMO_AIRLINES.map((airline) => {
            const count = countByAirline(airline.code)
            return (
              <label key={airline.code} className={cn('filter-check', count === 0 && 'is-disabled')}>
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline.code)}
                  onChange={() => toggleArray('airlines', airline.code)}
                  disabled={count === 0}
                />
                <span className="filter-check__box"><Check size={11} /></span>
                <span className="filter-check__label">{airline.name}</span>
                <span className="filter-check__count">{count}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Stops</legend>
        <div className="filter-chips filter-chips--vertical">
          {[
            { id: 'any', label: 'Any number of stops', count: flights.length },
            { id: 'direct', label: 'Direct only', count: countByStops((stops) => stops === 0) },
            { id: 'one', label: '1 stop', count: countByStops((stops) => stops === 1) },
            { id: 'two', label: '2+ stops', count: countByStops((stops) => stops >= 2) },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              className={cn('filter-chip', filters.stops === option.id && 'is-active')}
              onClick={() => onChange({ ...filters, stops: option.id })}
              aria-pressed={filters.stops === option.id}
            >
              {option.label}
              <span>{option.count}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Departure time</legend>
        <div className="filter-options">
          {TIME_BUCKETS.map((bucket) => (
            <label key={bucket.id} className="filter-check">
              <input
                type="checkbox"
                checked={filters.departure.includes(bucket.id)}
                onChange={() => toggleArray('departure', bucket.id)}
              />
              <span className="filter-check__box"><Check size={11} /></span>
              <span className="filter-check__label">{bucket.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Arrival time</legend>
        <div className="filter-options">
          {TIME_BUCKETS.map((bucket) => (
            <label key={bucket.id} className="filter-check">
              <input
                type="checkbox"
                checked={filters.arrival.includes(bucket.id)}
                onChange={() => toggleArray('arrival', bucket.id)}
              />
              <span className="filter-check__box"><Check size={11} /></span>
              <span className="filter-check__label">{bucket.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="filters__foot">
        <p>All flight records, carriers and fares on this page are fictional demonstration data.</p>
      </div>
    </aside>
  )
}
