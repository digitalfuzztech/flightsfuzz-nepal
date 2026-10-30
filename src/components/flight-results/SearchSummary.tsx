import { Link } from 'react-router-dom'
import { ArrowLeftRight, CalendarDays, Pencil, Users } from 'lucide-react'
import type { FlightSearch } from '../../types'
import { CABIN_LABELS } from '../../lib/data/airlines'
import { formatDateShort } from '../../lib/utils/date'

interface SearchSummaryProps {
  search: FlightSearch
  onEdit: () => void
}

export function SearchSummary({ search, onEdit }: SearchSummaryProps) {
  const first = search.segments[0]
  if (!first) return null
  const travellers = search.adults + search.children + search.infants
  const routeLabel =
    search.tripType === 'multicity'
      ? `${search.segments.length} legs`
      : `${first.from.city} → ${first.to.city}`

  return (
    <div className="search-summary">
      <div className="search-summary__route">
        <span className="search-summary__codes">
          {first.from.code}
          <ArrowLeftRight size={14} />
          {first.to.code}
        </span>
        <span className="search-summary__cities">{routeLabel}</span>
      </div>
      <div className="search-summary__item">
        <CalendarDays size={16} />
        <span>
          <small>{search.tripType === 'roundtrip' ? 'Departure' : 'Date'}</small>
          {formatDateShort(first.date)}
          {search.tripType === 'roundtrip' && search.returnDate ? ` – ${formatDateShort(search.returnDate)}` : ''}
        </span>
      </div>
      <div className="search-summary__item">
        <Users size={16} />
        <span>
          <small>Travellers</small>
          {travellers} · {CABIN_LABELS[search.cabin]}
        </span>
      </div>
      <button type="button" className="btn btn--outline btn--sm search-summary__edit" onClick={onEdit}>
        <Pencil size={14} /> Edit search
      </button>
      <Link to="/" className="search-summary__new">New search</Link>
    </div>
  )
}
