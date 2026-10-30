import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { PageHero } from '../components/shared/PageHero'
import { Reveal } from '../components/shared/Reveal'
import { TextAreaField, TextField } from '../components/forms/FormField'

interface MessageDraft {
  name: string
  email: string
  topic: string
  message: string
}

const EMPTY_MESSAGE: MessageDraft = {
  name: '',
  email: '',
  topic: 'Booking request',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function ContactPage() {
  const [draft, setDraft] = useState<MessageDraft>(EMPTY_MESSAGE)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [prepared, setPrepared] = useState(false)

  const update = (patch: Partial<MessageDraft>) => {
    setDraft((current) => ({ ...current, ...patch }))
    setPrepared(false)
    setErrors({})
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (draft.name.trim().length < 2) next['name'] = 'Enter your name.'
    if (!EMAIL_PATTERN.test(draft.email.trim())) next['email'] = 'Enter a valid email address.'
    if (draft.message.trim().length < 10) next['message'] = 'Add a little more detail (at least 10 characters).'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setPrepared(false)
      return
    }
    // This is a frontend demonstration. The message never leaves the browser.
    setPrepared(true)
  }

  return (
    <div className="contact-page">
      <PageHero
        eyebrow="Contact · FlightsFuzz"
        title={<>LET’S TALK<br />ABOUT YOUR <span className="text-red">TRIP.</span></>}
        description="Questions about a route, a passenger detail or the booking-request workflow? Start here. Official contact channels are being prepared and will be published on this page."
        image="/images/destinations/airport.jpg"
        imageAlt="Aircraft at an airport gate at dusk"
      >
        <div className="page-hero__chips">
          <span>KATHMANDU BASED</span><span>HUMAN SUPPORT</span><span>CHANNELS COMING SOON</span>
        </div>
      </PageHero>

      <section className="section contact-body">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <p className="section-kicker"><span>01</span> Official channels</p>
            <h2>REAL DETAILS.<br />NO PLACEHOLDERS <span className="text-red">PRETENDING.</span></h2>
            <p className="contact-info__lead">
              The contact details below are intentionally empty. We would rather show a clear
              “to be published” state than invent a phone number, email address or WhatsApp account.
            </p>

            <div className="contact-channels">
              <article id="whatsapp" className="contact-channel contact-channel--whatsapp">
                <span className="contact-channel__icon"><MessageCircle size={21} /></span>
                <div className="contact-channel__body">
                  <div className="contact-channel__head">
                    <h3>WhatsApp</h3>
                    <span className="badge badge--outline">To be published</span>
                  </div>
                  <p>
                    An official WhatsApp Business number is not active in this demonstration. No
                    message can be sent from this site yet.
                  </p>
                  <span className="contact-channel__placeholder">+977 &nbsp;•• &nbsp;••• &nbsp;••••</span>
                </div>
              </article>

              <article id="email" className="contact-channel contact-channel--email">
                <span className="contact-channel__icon"><Mail size={21} /></span>
                <div className="contact-channel__body">
                  <div className="contact-channel__head">
                    <h3>Email</h3>
                    <span className="badge badge--outline">To be published</span>
                  </div>
                  <p>
                    A verified FlightsFuzz email address is not connected. The form on this page
                    prepares a local draft; it does not send an email.
                  </p>
                  <span className="contact-channel__placeholder">official@ — pending</span>
                </div>
              </article>

              <article className="contact-channel">
                <span className="contact-channel__icon"><MapPin size={21} /></span>
                <div className="contact-channel__body">
                  <div className="contact-channel__head">
                    <h3>Where we are</h3>
                    <span className="badge badge--outline">Nepal</span>
                  </div>
                  <p>
                    FlightsFuzz is a Nepal-focused flight booking desk. A physical office address
                    will only be published once it can be verified.
                  </p>
                  <span className="contact-channel__placeholder">Kathmandu · Nepal</span>
                </div>
              </article>
            </div>

            <div className="contact-note">
              <ShieldCheck size={17} />
              <p>
                <strong>Protect yourself from fake agents.</strong> Never send money or identity
                documents to an unverified account. Confirm official channels directly before any
                real booking.
              </p>
            </div>
          </Reveal>

          <Reveal className="contact-form-card" delay={90}>
            <div className="contact-form-card__head">
              <span className="micro-label">Message desk</span>
              <h2>Draft a message.</h2>
              <p>
                This form is a frontend demonstration. It validates in your browser and keeps your
                draft in memory only — nothing is transmitted.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid form-grid--two">
                <TextField
                  id="contact-page-name"
                  label="Your name"
                  value={draft.name}
                  onChange={(event) => update({ name: event.target.value })}
                  error={errors['name']}
                  placeholder="Full name"
                  autoComplete="name"
                  required
                />
                <TextField
                  id="contact-page-email"
                  label="Email address"
                  type="email"
                  value={draft.email}
                  onChange={(event) => update({ email: event.target.value })}
                  error={errors['email']}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <label className="form-field form-grid__full" htmlFor="contact-page-topic">
                  <span>What is this about?</span>
                  <select
                    id="contact-page-topic"
                    className="form-input form-select"
                    value={draft.topic}
                    onChange={(event) => update({ topic: event.target.value })}
                  >
                    <option>Booking request</option>
                    <option>Existing request</option>
                    <option>Documents</option>
                    <option>Group travel</option>
                    <option>Something else</option>
                  </select>
                </label>
                <TextAreaField
                  id="contact-page-message"
                  label="Message"
                  value={draft.message}
                  onChange={(event) => update({ message: event.target.value })}
                  error={errors['message']}
                  placeholder="Tell us the route, dates or question you have in mind…"
                  rows={6}
                  hint="Do not include passport numbers or other sensitive documents in this demo."
                  className="form-grid__full"
                  required
                />
              </div>

              <button type="submit" className="btn btn--primary btn--block contact-form__submit">
                <Send size={17} /> Prepare message
              </button>

              <p className="contact-form__disclaimer">
                <Clock3 size={14} /> No email, WhatsApp message or support ticket is created by this
                action.
              </p>

              {prepared && (
                <div className="contact-form__result" role="status" aria-live="polite">
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>Your draft is ready in this browser.</strong>
                    <p>
                      It has not been sent. Email and WhatsApp delivery are pending integrations, so
                      no one at FlightsFuzz has received this message. Use the booking request flow
                      to prepare travel details while contact channels are being connected.
                    </p>
                    <Link to="/booking-request" className="text-link">
                      Start a booking request <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="section section--soft contact-next">
        <div className="container">
          <div className="contact-next__head">
            <p className="section-kicker"><span>02</span> How contact will work</p>
            <h2>THE CHANNEL YOU CHOOSE.<br /><span className="text-red">THE CONSENT YOU GIVE.</span></h2>
          </div>
          <div className="contact-next__grid">
            <Reveal className="contact-step">
              <span className="contact-step__number">01</span>
              <h3>Official details go live</h3>
              <p>A verified email address and WhatsApp Business number will be published here once they are configured and tested.</p>
            </Reveal>
            <Reveal className="contact-step" delay={70}>
              <span className="contact-step__number">02</span>
              <h3>You choose your channels</h3>
              <p>Email and WhatsApp consent remain separate decisions during the booking-request flow. Neither box is preselected.</p>
            </Reveal>
            <Reveal className="contact-step" delay={140}>
              <span className="contact-step__number">03</span>
              <h3>A person follows up</h3>
              <p>The production backend will store the request and the team will discuss live options, documents and fare rules with you.</p>
            </Reveal>
          </div>
          <div className="contact-next__actions">
            <Link to="/booking-request" className="btn btn--primary">
              Prepare a booking request <ArrowRight size={17} />
            </Link>
            <Link to="/popular-routes" className="btn btn--outline">
              Browse popular routes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
