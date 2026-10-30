import { Pencil } from 'lucide-react'
import type { BookingDraft, DocumentType, FlightSearch, MockFlight } from '../../../types'
import { CABIN_LABELS } from '../../../lib/data/airlines'
import { DOCUMENT_LABELS } from '../../../lib/data/reference'
import { formatDate } from '../../../lib/utils/date'
import { formatNPR, minutesToTime, titleCase } from '../../../lib/utils/format'

interface StepFinalProps {
  draft: BookingDraft
  search: FlightSearch
  flight: MockFlight | null
  onEditStep: (step: number) => void
}

const maskDocument = (value: string): string => {
  if (!value) return '—'
  return value.length <= 4 ? value : `••••${value.slice(-4)}`
}

const EditButton = ({ step, onClick }: { step: number; onClick: (step: number) => void }) => (
  <button type="button" className="review-edit" onClick={() => onClick(step)}>
    <Pencil size={13} /> Edit
  </button>
)

export function StepFinal({ draft, search, flight, onEditStep }: StepFinalProps) {
  const { contact, passengers, documents, additional, consent } = draft
  const totalDocuments = Object.values(documents).reduce(
    (count, slots) => count + Object.values(slots).reduce((sum, files) => sum + (files?.length ?? 0), 0),
    0,
  )

  return (
    <div className="booking-step booking-final">
      <div className="final-notice">
        <strong>This is a booking request, not a confirmed ticket.</strong>
        <p>
          Submitting will not charge you, reserve a seat or send an email or WhatsApp message in
          this demonstration. In the production flow, the backend stores the request and the team
          follows up using your consented channels.
        </p>
      </div>

      <section className="review-block" aria-labelledby="review-trip">
        <div className="review-block__head">
          <h3 id="review-trip"><span>01</span> Trip &amp; flight</h3>
          <EditButton step={1} onClick={onEditStep} />
        </div>
        <div className="review-grid">
          <div><span>Trip type</span><strong>{search.tripType === 'oneway' ? 'One way' : search.tripType === 'roundtrip' ? 'Round trip' : 'Multi city'}</strong></div>
          <div><span>Cabin</span><strong>{CABIN_LABELS[search.cabin]}</strong></div>
          <div><span>Travellers</span><strong>{search.adults + search.children + search.infants}</strong></div>
          <div><span>Departure</span><strong>{formatDate(search.segments[0].date)}</strong></div>
        </div>
        <ul className="review-legs">
          {search.segments.map((segment, index) => (
            <li key={`${segment.from.code}-${segment.to.code}-${index}`}>
              <span>{segment.from.code} → {segment.to.code}</span>
              <span>{segment.from.city} → {segment.to.city}</span>
              <span>{formatDate(segment.date)}</span>
            </li>
          ))}
        </ul>
        {flight ? (
          <div className="review-flight-line">
            <span className="airline-mark" style={{ backgroundColor: flight.airline.color }}>{flight.airline.initials}</span>
            <span><strong>{flight.airline.name}</strong> · {flight.aircraft}</span>
            <span>{minutesToTime(flight.departureMinutes)} – {minutesToTime(flight.arrivalMinutes)}</span>
            <span>Demo total NPR {formatNPR(flight.priceNPR)}</span>
          </div>
        ) : (
          <p className="review-empty">No specific flight selected — the team will discuss route options.</p>
        )}
      </section>

      <section className="review-block" aria-labelledby="review-contact">
        <div className="review-block__head">
          <h3 id="review-contact"><span>02</span> Contact details</h3>
          <EditButton step={2} onClick={onEditStep} />
        </div>
        <div className="review-grid">
          <div><span>Full name</span><strong>{contact.fullName}</strong></div>
          <div><span>Email</span><strong>{contact.email}</strong></div>
          <div><span>Mobile</span><strong>{contact.countryCode} {contact.mobile}</strong></div>
          <div><span>WhatsApp</span><strong>{contact.whatsappSame ? `${contact.countryCode} ${contact.mobile}` : contact.whatsapp}</strong></div>
          <div className="review-grid__wide"><span>Address</span><strong>{contact.address}, {contact.city}, {contact.country}</strong></div>
        </div>
      </section>

      <section className="review-block" aria-labelledby="review-passengers">
        <div className="review-block__head">
          <h3 id="review-passengers"><span>03</span> Passengers</h3>
          <EditButton step={3} onClick={onEditStep} />
        </div>
        <div className="review-passengers">
          {passengers.map((passenger, index) => (
            <div className="review-passenger" key={passenger.id}>
              <span className="review-passenger__index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{passenger.fullName}</strong>
                <span>{titleCase(passenger.type)} · {passenger.nationality} · {passenger.gender || '—'}</span>
              </div>
              <div>
                <span>{DOCUMENT_LABELS[passenger.documentType]} {maskDocument(passenger.documentNumber)}</span>
                {passenger.documentType === 'passport' && <span>Expires {passenger.documentExpiry ? formatDate(passenger.documentExpiry) : '—'}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="review-block" aria-labelledby="review-documents">
        <div className="review-block__head">
          <h3 id="review-documents"><span>04</span> Documents</h3>
          <EditButton step={4} onClick={onEditStep} />
        </div>
        <p className="review-documents__count">{totalDocuments} local file{totalDocuments === 1 ? '' : 's'} attached in this tab</p>
        <div className="review-documents">
          {passengers.map((passenger) => {
            const slots = documents[passenger.id] ?? {}
            const entries = Object.entries(slots) as Array<[DocumentType, NonNullable<typeof slots[DocumentType]>]>
            return (
              <div key={passenger.id}>
                <strong>{passenger.fullName || 'Passenger'}</strong>
                {entries.length === 0 ? (
                  <span className="review-documents__none">No files (optional in demo)</span>
                ) : (
                  entries.flatMap(([type, files]) =>
                    files.map((file) => (
                      <span key={file.id} className="review-documents__file">
                        {DOCUMENT_LABELS[type]} · {file.name}
                      </span>
                    )),
                  )
                )}
              </div>
            )
          })}
        </div>
        <p className="review-block__note">
          Files are not uploaded or persisted. Secure storage, virus scanning and retention controls
          must be implemented before real documents are accepted.
        </p>
      </section>

      <section className="review-block" aria-labelledby="review-extra">
        <div className="review-block__head">
          <h3 id="review-extra"><span>05</span> Additional information</h3>
          <EditButton step={5} onClick={onEditStep} />
        </div>
        <div className="review-grid">
          <div><span>Preferred time</span><strong>{additional.preferredTime ? titleCase(additional.preferredTime) : 'No preference'}</strong></div>
          <div><span>Travel purpose</span><strong>{additional.travelPurpose || 'Not provided'}</strong></div>
          <div className="review-grid__wide"><span>Special requests</span><strong>{additional.specialRequests || 'None provided'}</strong></div>
          <div className="review-grid__wide"><span>Notes</span><strong>{additional.notes || 'None provided'}</strong></div>
        </div>
      </section>

      <section className="review-block" aria-labelledby="review-consent">
        <div className="review-block__head">
          <h3 id="review-consent"><span>06</span> Communication consent</h3>
          <EditButton step={6} onClick={onEditStep} />
        </div>
        <div className="review-consents">
          <span className={consent.email ? 'is-on' : ''}>Email consent · {consent.email ? 'Granted' : 'Not granted'}</span>
          <span className={consent.whatsapp ? 'is-on' : ''}>WhatsApp consent · {consent.whatsapp ? 'Granted' : 'Not granted'}</span>
        </div>
        <p className="review-block__note">
          Consent is recorded separately in production. No message is sent by this demonstration.
        </p>
      </section>
    </div>
  )
}
