import { ArrowRight, Check, MessageCircle, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../shared/Reveal'
import { SectionHeader } from '../shared/SectionHeader'

const REASONS = [
  {
    number: '01',
    title: 'A request — not an instant charge',
    copy: 'There is no online payment or automatic ticket issuance. You start a conversation; you do not accidentally buy a seat.',
  },
  {
    number: '02',
    title: 'Human review before anything moves',
    copy: 'A FlightsFuzz team member checks availability, fare rules and the details you provided before discussing a booking.',
  },
  {
    number: '03',
    title: 'Communication on your terms',
    copy: 'Email and WhatsApp consent are separate. You decide which channels the team may use to contact you.',
  },
  {
    number: '04',
    title: 'Guidance with the paperwork',
    copy: 'Passport validity, identity documents and itinerary-specific requirements are flagged before you commit.',
  },
  {
    number: '05',
    title: 'Built around travel from Nepal',
    copy: 'Routes, context and support are shaped around the journeys Nepali travellers actually ask about.',
  },
]

export function TrustSection() {
  return (
    <section className="section trust-section" aria-labelledby="trust-title">
      <div className="container trust-section__grid">
        <Reveal className="trust-section__intro">
          <SectionHeader
            index="05"
            eyebrow="Why book with us"
            title={<span id="trust-title">THE DETAILS<br />MATTER.</span>}
            description="FlightsFuzz is designed for the part of flight booking that search engines often leave you to figure out alone."
            align="left"
          />
          <div className="trust-ticket" aria-hidden="true">
            <div className="trust-ticket__head">
              <span>FLIGHTSFUZZ</span>
              <span>ASSISTED BOOKING</span>
            </div>
            <div className="trust-ticket__body">
              <span className="trust-ticket__label">PASSENGER</span>
              <strong>YOUR NAME</strong>
              <div className="trust-ticket__route">
                <span><b>KTM</b><small>KATHMANDU</small></span>
                <span className="trust-ticket__flight"><ArrowRight size={15} /></span>
                <span><b>TO</b><small>THE WORLD</small></span>
              </div>
              <div className="trust-ticket__meta">
                <span>CLASS <b>HUMAN</b></span>
                <span>REVIEW <b>REQUIRED</b></span>
                <span>CHARGE <b>NONE</b></span>
              </div>
            </div>
            <div className="trust-ticket__foot">
              <span className="trust-ticket__barcode" />
              <span>NO AUTO-ISSUE · NO HIDDEN CHECKOUT</span>
            </div>
          </div>
          <div className="trust-section__actions">
            <Link to="/#search" className="btn btn--primary">
              Start a booking request <ArrowRight size={17} />
            </Link>
            <Link to="/contact#whatsapp" className="text-link">
              <MessageCircle size={16} /> Contact details
            </Link>
          </div>
        </Reveal>

        <div className="trust-list">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.number} delay={index * 70} className="trust-item">
              <span className="trust-item__number">{reason.number}</span>
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.copy}</p>
              </div>
              <span className="trust-item__check"><Check size={14} /></span>
            </Reveal>
          ))}
          <Reveal className="trust-list__note" delay={380}>
            <ShieldCheck size={18} />
            <p>
              We do not publish invented reviews, awards, traveller counts or airline partnerships.
              Any future social proof will be verifiable before it appears here.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
