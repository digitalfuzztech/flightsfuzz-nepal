import {
  BadgeCheck,
  FileCheck2,
  Globe2,
  LockKeyhole,
  MessageSquareText,
  Route,
  Send,
} from 'lucide-react'
import { Reveal } from '../shared/Reveal'
import { SectionHeader } from '../shared/SectionHeader'

export function WhySection() {
  return (
    <section className="section section--dark why-section" aria-labelledby="why-title">
      <div className="why-section__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Why FlightsFuzz"
          title={<span id="why-title">BOOKING A FLIGHT<br />SHOULD FEEL HUMAN.</span>}
          description="A flight search is only the beginning. FlightsFuzz is built around the conversation that follows: checking options, explaining the rules and helping you make a confident decision."
          light
        />

        <div className="why-grid">
          <Reveal className="why-card why-card--lead">
            <span className="why-card__number">01</span>
            <div className="why-card__lead-copy">
              <h3>One request. A real person on the other side.</h3>
              <p>
                Start with a search, add your passenger details and tell us how you prefer to be
                contacted. Your request is prepared for a human review — not an automated checkout.
              </p>
            </div>
            <div className="request-illustration" aria-hidden="true">
              <div className="request-illustration__head">
                <span>BOOKING REQUEST</span>
                <span>FF / DRAFT</span>
              </div>
              <div className="request-illustration__row"><span>KATHMANDU</span><strong>KTM</strong></div>
              <div className="request-illustration__line"><i /><span>DXB</span><i /></div>
              <div className="request-illustration__row"><span>DUBAI</span><strong>DXB</strong></div>
              <div className="request-illustration__meta">
                <span>2 TRAVELLERS</span>
                <span>ECONOMY</span>
                <span className="request-illustration__status">READY TO REVIEW</span>
              </div>
            </div>
            <span className="why-card__tag"><BadgeCheck size={15} /> Human-reviewed</span>
          </Reveal>

          <Reveal className="why-card why-card--accent" delay={70}>
            <span className="why-icon"><MessageSquareText size={20} /></span>
            <h3>WhatsApp-first communication</h3>
            <p>Talk through the details on the channel you choose. Email and WhatsApp consent are separate decisions.</p>
            <div className="chat-illustration" aria-hidden="true">
              <div className="chat-illustration__bubble chat-illustration__bubble--in">
                <span>FLIGHTSFUZZ TEAM</span>
                <strong>We’re reviewing your request.</strong>
                <small>Illustration · no message has been sent</small>
              </div>
              <div className="chat-illustration__typing"><i /><i /><i /></div>
            </div>
          </Reveal>

          <Reveal className="why-card" delay={110}>
            <span className="why-icon"><FileCheck2 size={20} /></span>
            <h3>Document guidance</h3>
            <p>Know which identity document is relevant before the conversation starts.</p>
            <div className="doc-chips" aria-hidden="true">
              <span>PASSPORT</span><span>CITIZENSHIP</span><span>AADHAAR</span><span>NID</span>
            </div>
          </Reveal>

          <Reveal className="why-card" delay={150}>
            <span className="why-icon"><LockKeyhole size={20} /></span>
            <h3>Privacy by design</h3>
            <p>Documents stay in your browser tab in this demo. Secure storage is a clearly marked future integration.</p>
          </Reveal>

          <Reveal className="why-card why-card--route" delay={190}>
            <div className="why-card__route-copy">
              <span className="why-icon"><Globe2 size={20} /></span>
              <h3>An international flight desk</h3>
              <p>From Gulf connections to long-haul journeys, the request flow is built around routes travellers from Nepal actually ask for.</p>
            </div>
            <div className="route-map" aria-hidden="true">
              <span className="route-map__code route-map__code--ktm">KTM</span>
              <span className="route-map__code route-map__code--dxb">DXB</span>
              <span className="route-map__code route-map__code--lhr">LHR</span>
              <span className="route-map__code route-map__code--syd">SYD</span>
              <span className="route-map__code route-map__code--nrt">NRT</span>
              <svg viewBox="0 0 400 150" fill="none" preserveAspectRatio="none">
                <path d="M40 108C105 80 130 38 205 60S300 95 370 42" stroke="#ED1C2E" strokeWidth="1.4" strokeDasharray="4 6" />
                <circle cx="40" cy="108" r="3.5" fill="#ED1C2E" />
                <circle cx="205" cy="60" r="3.5" fill="#ED1C2E" />
                <circle cx="370" cy="42" r="3.5" fill="#ED1C2E" />
              </svg>
            </div>
          </Reveal>

          <Reveal className="why-card why-card--wide" delay={230}>
            <span className="why-icon"><Route size={20} /></span>
            <div>
              <h3>Guidance when the rules get complicated</h3>
              <p>Baggage, transit visas, passport validity, refund rules — we flag what needs checking before you commit.</p>
            </div>
            <span className="why-card__stamp"><Send size={16} /> NO AUTO-ISSUED TICKETS</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
