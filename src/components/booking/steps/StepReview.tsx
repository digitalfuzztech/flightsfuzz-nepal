import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Info, Pencil, Plane, Users } from 'lucide-react'
import type { FlightSearch, MockFlight } from '../../../types'
import { CABIN_LABELS } from '../../../lib/data/airlines'
import { formatDate } from '../../../lib/utils/date'
import { formatDuration, formatNPR, minutesToTime } from '../../../lib/utils/format'
import { buildSearchParams } from '../../../lib/utils/search'

interface StepReviewProps {
  search: FlightSearch
  flight: MockFlight | null
}

export function StepReview({ search, flight }: StepReviewProps) {
  const travellers = search.adults + search.children + search.infants
  const resultsLink = `/flights?${buildSearchParams(search).toString()}`

  return (
    <div className="booking-step">
      <div className="booking-review">
        <div className="booking-review__head">
          <div>
            <span className="micro-label">Trip summary</span>
            <h3>{search.tripType === 'multicity' ? 'Multi-city itinerary' : `${search.segments[0].from.city} to ${search.segments[0].to.city}`}</h3>
          </div>
          <Link to={resultsLink} className="text-link"><Pencil size={14} /> Change search</Link>
        </div>

        <div className="itinerary">
          {search.segments.map((segment, index) => (
            <div className="itinerary__leg" key={`${segment.from.code}-${segment.to.code}-${index}`}>
              <div className="itinerary__airport">
                <strong>{segment.from.code}</strong>
                <span>{segment.from.city}</span>
              </div>
              <div className="itinerary__path">
                <span>{search.tripType === 'multicity' ? `LEG ${index + 1}` : 'OUTBOUND'}</span>
                <i><Plane size={14} /></i>
                <small>{formatDate(segment.date, true)}</small>
              </div>
              <div className="itinerary__airport itinerary__airport--right">
                <strong>{segment.to.code}</strong>
                <span>{segment.to.city}</span>
              </div>
            </div>
          ))}
          {search.tripType === 'roundtrip' && search.returnDate && (
            <div className="itinerary__return">
              <CalendarDays size={15} /> Return date: {formatDate(search.returnDate, true)} · discussed with the team
            </div>
          )}
        </div>

        <div className="booking-review__meta">
          <span><Users size={15} /> {travellers} traveller{travellers > 1 ? 's' : ''} · {search.adults} adult{search.adults > 1 ? 's' : ''}{search.children ? `, ${search.children} child${search.children > 1 ? 'ren' : ''}` : ''}{search.infants ? `, ${search.infants} infant${search.infants > 1 ? 's' : ''}` : ''}</span>
          <span><Plane size={15} /> {CABIN_LABELS[search.cabin]}</span>
          <span><CalendarDays size={15} /> {search.tripType === 'oneway' ? 'One way' : search.tripType === 'roundtrip' ? 'Round trip' : `${search.segments.length} legs`}</span>
        </div>
      </div>

      <div className="selected-flight">
        <div className="selected-flight__head">
          <span className="micro-label">Selected flight</span>
          <span className="badge badge--demo">DEMO RECORD</span>
        </div>
        {flight ? (
          <>
            <div className="selected-flight__airline">
              <span className="airline-mark" style={{ backgroundColor: flight.airline.color }}>{flight.airline.initials}</span>
              <div>
                <strong>{flight.airline.name}</strong>
                <span>{flight.aircraft} · {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
              </div>
            </div>
            <div className="selected-flight__times">
              <div><strong>{minutesToTime(flight.departureMinutes)}</strong><span>{flight.from.code}</span></div>
              <div className="selected-flight__line">
                <span>{formatDuration(flight.durationMinutes)}</span>
                <i />
              </div>
              <div><strong>{minutesToTime(flight.arrivalMinutes)}</strong><span>{flight.to.code}</span></div>
            </div>
            <div className="selected-flight__fare">
              <span>Illustrative total · not a live fare</span>
              <strong>NPR {formatNPR(flight.priceNPR)}</strong>
            </div>
          </>
        ) : (
          <div className="selected-flight__none">
            <Info size={18} />
            <p>No specific flight was selected. Submit the request and the team will discuss route options with you.</p>
          </div>
        )}
        <p className="selected-flight__note">
          Demonstration schedules and fares are fictional. Availability is confirmed only in a
          conversation with the Flash Flights team.
        </p>
      </div>

      <div className="booking-tip">
        <Info size={16} />
        <p>
          You are submitting a <strong>booking request</strong>, not buying a ticket. No seat is held
          and no payment is taken at this stage.
        </p>
        <Link to={resultsLink} className="text-link">Back to results <ArrowRight size={14} /></Link>
      </div>
    </div>
  )
}
