import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Database,
  FileLock2,
  Home,
  Mail,
  MessageCircle,
  Plane,
  Printer,
  ShieldCheck,
} from 'lucide-react'
import type { BookingSubmission } from '../types'
import { CABIN_LABELS } from '../lib/data/airlines'
import { formatDate } from '../lib/utils/date'
import { BOOKING_API_STATUS } from '../lib/integrations/bookingApi'
import {
  EMAIL_AUTOMATION,
  FUTURE_COMMUNICATION_FLOW,
  SECURE_DOCUMENT_STORAGE,
  WHATSAPP_AUTOMATION,
} from '../lib/integrations/communication'
import { Reveal } from '../components/shared/Reveal'

interface SuccessState {
  submission?: BookingSubmission
}

export function BookingSuccessPage() {
  const location = useLocation()
  const submission = (location.state as SuccessState | null)?.submission
  const submittedLabel = submission
    ? new Date(submission.submittedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
    : null

  return (
    <div className="success-page">
      <header className="success-hero">
        <div className="success-hero__grid" aria-hidden="true" />
        <div className="success-hero__glow" aria-hidden="true" />
        <div className="container success-hero__inner">
          <div className="success-hero__copy">
            <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Request captured · demonstration</p>
            <h1>YOUR JOURNEY<br />STARTS <span>WITH US.</span></h1>
            <p>
              Your booking request has been captured in this frontend demonstration. No email,
              WhatsApp message or document has been sent — the next screen explains exactly what is
              still pending.
            </p>
            <div className="success-hero__actions">
              <Link to="/" className="btn btn--primary btn--lg"><Home size={17} /> Back to home</Link>
              <Link to="/contact" className="btn btn--ghost-light btn--lg"><MessageCircle size={17} /> Contact the team</Link>
            </div>
          </div>
          <div className="success-hero__visual">
            <div className="success-mark">
              <span className="success-mark__ring" />
              <span className="success-mark__ring success-mark__ring--two" />
              <span className="success-mark__core"><Check size={34} strokeWidth={2.4} /></span>
              <Plane size={20} className="success-mark__plane" />
            </div>
            <div className="success-reference">
              <span>REQUEST REFERENCE</span>
              <strong>{submission?.reference ?? 'FRONTEND DEMO'}</strong>
              <small>{submittedLabel ?? 'No request summary in this browser session'}</small>
            </div>
            <p className="success-hero__visual-note">
              Keep the reference for your records. It is generated locally and is not stored on a server.
            </p>
          </div>
        </div>
      </header>

      <section className="success-content">
        <div className="container">
          {!submission && (
            <Reveal className="success-missing">
              <CheckCircle2 size={20} />
              <div>
                <strong>No request summary is available after a refresh.</strong>
                <p>
                  This demonstration keeps the submitted summary only in temporary navigation state.
                  Nothing was saved to a database. You can start another request or contact the team.
                </p>
              </div>
              <Link to="/#search" className="btn btn--outline btn--sm">Start another request</Link>
            </Reveal>
          )}

          <div className="success-grid">
            <Reveal className="success-main">
              <div className="success-status">
                <span className="success-status__icon"><CheckCircle2 size={22} /></span>
                <div>
                  <span className="micro-label">Status</span>
                  <h2>Captured locally — not transmitted.</h2>
                  <p>
                    The form passed browser validation and produced this confirmation screen. A
                    backend booking-request API is not connected, so Flash Flights has not actually
                    received this lead.
                  </p>
                </div>
                <span className="badge badge--demo">{BOOKING_API_STATUS.label}</span>
              </div>

              {submission && (
                <div className="success-summary">
                  <div className="success-summary__head">
                    <div>
                      <span className="micro-label">Request summary</span>
                      <h3>
                        {submission.search.segments[0].from.code}
                        <Plane size={16} />
                        {submission.search.tripType === 'multicity'
                          ? `${submission.search.segments.length} LEGS`
                          : submission.search.segments[0].to.code}
                      </h3>
                    </div>
                    <button type="button" className="btn btn--outline btn--sm" onClick={() => window.print()}>
                      <Printer size={15} /> Print
                    </button>
                  </div>
                  <div className="success-summary__grid">
                    <div><span>Passenger</span><strong>{submission.contactName}</strong></div>
                    <div><span>Email</span><strong>{submission.email}</strong></div>
                    <div><span>WhatsApp</span><strong>{submission.whatsapp}</strong></div>
                    <div><span>Travellers</span><strong>{submission.passengerCount}</strong></div>
                    <div><span>Departure</span><strong>{formatDate(submission.search.segments[0].date)}</strong></div>
                    <div><span>Cabin</span><strong>{CABIN_LABELS[submission.search.cabin]}</strong></div>
                    <div><span>Flight</span><strong>{submission.flight ? submission.flight.airline.name : 'Team to advise'}</strong></div>
                    <div><span>Reference</span><strong>{submission.reference}</strong></div>
                  </div>
                  <p className="success-summary__note">
                    Demonstration record only. No ticket, seat, payment or live fare exists.
                  </p>
                </div>
              )}

              <div className="success-next">
                <div className="success-next__head">
                  <span className="micro-label">What happens next</span>
                  <h2>The production flow, step by step.</h2>
                  <p>Steps marked “pending” are not implemented in this frontend phase.</p>
                </div>
                <ol className="success-timeline">
                  {FUTURE_COMMUNICATION_FLOW.map((step, index) => {
                    const active = index === 0
                    return (
                      <li key={step} className={active ? 'is-done' : 'is-pending'}>
                        <span className="success-timeline__dot">{active ? <Check size={13} /> : String(index + 1).padStart(2, '0')}</span>
                        <div>
                          <strong>{step}</strong>
                          <span>{active ? 'Captured in the browser demonstration' : 'Pending backend / provider integration'}</span>
                        </div>
                        {active ? <span className="badge badge--demo">DEMO</span> : <Clock3 size={15} />}
                      </li>
                    )
                  })}
                </ol>
                <div className="success-warning">
                  <ShieldCheck size={18} />
                  <p>
                    <strong>No automated message has been delivered.</strong> Once email and WhatsApp
                    integrations are activated, the customer will receive an acknowledgement only
                    after the backend has securely stored the request and consent record.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="success-aside" delay={110}>
              <div className="integration-card">
                <span className="micro-label">Integration status</span>
                <h3>What is still pending?</h3>
                <ul>
                  <li>
                    <span className="integration-card__icon"><Database size={17} /></span>
                    <div><strong>Booking-request API</strong><span>Not connected · no lead stored</span></div>
                  </li>
                  <li>
                    <span className="integration-card__icon"><Mail size={17} /></span>
                    <div><strong>Email automation</strong><span>{EMAIL_AUTOMATION.configured ? 'Configured' : 'Not configured · no email sent'}</span></div>
                  </li>
                  <li>
                    <span className="integration-card__icon"><MessageCircle size={17} /></span>
                    <div><strong>WhatsApp Business API</strong><span>{WHATSAPP_AUTOMATION.configured ? 'Configured' : 'Not configured · no message sent'}</span></div>
                  </li>
                  <li>
                    <span className="integration-card__icon"><FileLock2 size={17} /></span>
                    <div><strong>Secure document storage</strong><span>{SECURE_DOCUMENT_STORAGE.configured ? 'Configured' : 'Not configured · files discarded'}</span></div>
                  </li>
                </ul>
                <p className="integration-card__note">
                  These boundaries are intentionally visible. Nothing on this page pretends to be a
                  working backend or messaging service.
                </p>
              </div>

              <div className="success-contact-card">
                <span className="micro-label">Next contact</span>
                <h3>Official contact details are coming soon.</h3>
                <p>
                  The contact page holds the current placeholders. No phone number, email address or
                  WhatsApp account is active in this demonstration.
                </p>
                <Link to="/contact" className="btn btn--dark btn--block">
                  Open contact page <ArrowRight size={16} />
                </Link>
              </div>

              <div className="success-small-links">
                <Link to="/#search" className="text-link">Start another request <ArrowRight size={14} /></Link>
                <Link to="/privacy-policy" className="text-link">Privacy policy <ArrowRight size={14} /></Link>
                <Link to="/terms-and-conditions" className="text-link">Terms &amp; conditions <ArrowRight size={14} /></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
