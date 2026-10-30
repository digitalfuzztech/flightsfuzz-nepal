import { Check } from 'lucide-react'
import type { FlightSearch, MockFlight } from '../../types'
import { CABIN_LABELS } from '../../lib/data/airlines'
import { formatDate, formatDateShort } from '../../lib/utils/date'
import { formatDuration, formatNPR, minutesToTime } from '../../lib/utils/format'

interface BookingSummaryProps {
  search: FlightSearch
  flight: MockFlight | null
}

export function BookingSummary({ search, flight }: BookingSummaryProps) {
  const first = search.segments[0]
  const travellers = search.adults + search.children + search.infants
  if (!first) return null

  return (
    <aside className="booking-summary" aria-label="Selected itinerary summary">
      <div className="booking-summary__head">
        <span className="micro-label">Your request</span>
        <span className="booking-summary__status">Draft</span>
      </div>
      <div className="booking-summary__route">
        <div>
          <strong>{first.from.code}</strong>
          <span>{first.from.city}</span>
        </div>
        <span className="booking-summary__line">
          <i />
          <small>{flight ? formatDuration(flight.durationMinutes) : 'To be advised'}</small>
        </span>
        <div>
          <strong>{first.to.code}</strong>
          <span>{first.to.city}</span>
        </div>
      </div>
      <dl className="booking-summary__details">
        <div><dt>Departure</dt><dd>{formatDateShort(first.date)}</dd></div>
        {search.returnDate && <div><dt>Return</dt><dd>{formatDateShort(search.returnDate)}</dd></div>}
        <div><dt>Travellers</dt><dd>{travellers}</dd></div>
        <div><dt>Cabin</dt><dd>{CABIN_LABELS[search.cabin]}</dd></div>
        <div><dt>Trip</dt><dd>{search.tripType === 'oneway' ? 'One way' : search.tripType === 'roundtrip' ? 'Round trip' : 'Multi city'}</dd></div>
      </dl>

      {search.tripType === 'multicity' && (
        <ol className="booking-summary__legs">
          {search.segments.map((segment, index) => (
            <li key={`${segment.from.code}-${segment.to.code}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{segment.from.code} → {segment.to.code}</strong>
              <small>{formatDate(segment.date)}</small>
            </li>
          ))}
        </ol>
      )}

      {flight ? (
        <div className="booking-summary__flight">
          <span className="booking-summary__flight-head">
            <span className="airline-dot" style={{ backgroundColor: flight.airline.color }} />
            {flight.airline.name}
            <em>DEMO</em>
          </span>
          <div className="booking-summary__flight-times">
            <strong>{minutesToTime(flight.departureMinutes)}</strong>
            <span>{flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
            <strong>{minutesToTime(flight.arrivalMinutes)}</strong>
          </div>
          <div className="booking-summary__flight-foot">
            <span>Illustrative fare</span>
            <strong>NPR {formatNPR(flight.priceNPR)}</strong>
          </div>
        </div>
      ) : (
        <div className="booking-summary__flight booking-summary__flight--none">
          <span className="booking-summary__flight-head">No specific flight selected</span>
          <p>The team will suggest demonstration route options and check live availability with you.</p>
        </div>
      )}

      <div className="booking-summary__note">
        <Check size={14} />
        <span>No payment or ticket is issued in this demonstration.</span>
      </div>
    </aside>
  )
}
