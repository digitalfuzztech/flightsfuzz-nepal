import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  Info,
  Luggage,
  Plane,
  ShieldCheck,
} from 'lucide-react'
import type { FlightSearch, MockFlight } from '../../types'
import { CABIN_LABELS } from '../../lib/data/airlines'
import { buildSearchParams } from '../../lib/utils/search'
import { dayOffset, formatDuration, formatNPR, minutesToTime } from '../../lib/utils/format'
import { cn } from '../../lib/utils/format'

interface FlightCardProps {
  flight: MockFlight
  search: FlightSearch
}

export function FlightCard({ flight, search }: FlightCardProps) {
  const [expanded, setExpanded] = useState(false)
  const query = buildSearchParams(search)
  query.set('flight', flight.id)
  const arrivalOffset = dayOffset(flight.arrivalMinutes)
  const travellers = search.adults + search.children + search.infants
  const stopLabel = flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`

  return (
    <article className={cn('flight-card', expanded && 'is-expanded')}>
      <div className="flight-card__demo-strip">
        <span><Info size={12} /> DEMO FLIGHT RECORD</span>
        <span>NOT REAL AVAILABILITY</span>
      </div>
      <div className="flight-card__main">
        <div className="flight-card__airline">
          <span className="airline-mark" style={{ backgroundColor: flight.airline.color }}>
            {flight.airline.initials}
          </span>
          <div>
            <strong>{flight.airline.name}</strong>
            <span>{flight.aircraft} · Demo carrier</span>
          </div>
        </div>

        <div className="flight-card__route">
          <div className="flight-time">
            <strong>{minutesToTime(flight.departureMinutes)}</strong>
            <span>{flight.from.code}</span>
            <small>{flight.from.city}</small>
          </div>
          <div className="flight-path">
            <span className="flight-path__duration">{formatDuration(flight.durationMinutes)}</span>
            <span className="flight-path__line" aria-hidden="true">
              <i className="flight-path__dot" />
              {flight.stopCodes.map((code) => <i key={code} className="flight-path__stop" title={code} />)}
              <Plane size={14} />
            </span>
            <span className={cn('flight-path__stops', flight.stops === 0 && 'is-direct')}>{stopLabel}</span>
          </div>
          <div className="flight-time flight-time--right">
            <strong>
              {minutesToTime(flight.arrivalMinutes)}
              {arrivalOffset > 0 && <sup>+{arrivalOffset}</sup>}
            </strong>
            <span>{flight.to.code}</span>
            <small>{flight.to.city}</small>
          </div>
        </div>

        <div className="flight-card__fare">
          <span className="flight-card__fare-label">Illustrative total</span>
          <strong>NPR {formatNPR(flight.priceNPR)}</strong>
          <span>{travellers} traveller{travellers > 1 ? 's' : ''} · {CABIN_LABELS[flight.cabin]}</span>
          <Link
            to={`/booking-request?${query.toString()}`}
            className="btn btn--primary btn--sm flight-card__cta"
          >
            Request booking
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className="flight-card__meta">
        <span><Luggage size={15} /> Cabin {flight.baggage.cabin}</span>
        <span><BriefcaseBusiness size={15} /> Checked {flight.baggage.checked}</span>
        <span><ShieldCheck size={15} /> {flight.refundable ? 'Refundable (demo rule)' : 'Non-refundable (demo rule)'}</span>
        <button
          type="button"
          className="flight-card__details-toggle"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          Flight details <ChevronDown size={15} />
        </button>
      </div>

      {expanded && (
        <div className="flight-card__details">
          <div>
            <h4>Baggage allowance</h4>
            <p><Luggage size={14} /> Cabin: {flight.baggage.cabin}</p>
            <p><BriefcaseBusiness size={14} /> Checked: {flight.baggage.checked}</p>
          </div>
          <div>
            <h4>Route</h4>
            <p><Plane size={14} /> {flight.from.city} ({flight.from.code}) → {flight.to.city} ({flight.to.code})</p>
            <p>
              <BriefcaseBusiness size={14} /> {stopLabel}
              {flight.stopCodes.length > 0 ? ` via ${flight.stopCodes.join(' · ')}` : ''}
            </p>
          </div>
          <div>
            <h4>Fare basis</h4>
            <p>{CABIN_LABELS[flight.cabin]} · demonstration fare</p>
            <p className="flight-card__disclaimer">
              This card is generated from mock data. Price and availability are not verified and
              cannot be booked online. A Flash Flights team member will confirm live options.
            </p>
          </div>
        </div>
      )}
    </article>
  )
}
