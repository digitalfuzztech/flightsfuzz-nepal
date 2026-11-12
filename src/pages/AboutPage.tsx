import { Link } from 'react-router-dom'
import { ArrowRight, Check, Compass, HeartHandshake, MessageCircle, Plane, ShieldCheck } from 'lucide-react'
import { PageHero } from '../components/shared/PageHero'
import { Reveal } from '../components/shared/Reveal'
import { ScrollToContent } from '../components/shared/ScrollToContent'
import { SectionHeader } from '../components/shared/SectionHeader'

const PRINCIPLES = [
  {
    icon: Compass,
    title: 'Search should be clear',
    copy: 'Routes, dates, passengers and cabin class are visible up front. Demonstration data is labelled instead of dressed up as live inventory.',
  },
  {
    icon: HeartHandshake,
    title: 'A request should feel human',
    copy: 'The form is designed to hand context to a person, not to hide a checkout behind three clicks.',
  },
  {
    icon: ShieldCheck,
    title: 'Sensitive data needs care',
    copy: 'We do not pretend documents are securely uploaded. The demo keeps files local and marks secure storage as pending.',
  },
]

export function AboutPage() {
  return (
    <div className="about-page">
      <PageHero
        eyebrow="About Flash Flights"
        title={<>BUILT FOR THE<br />HUMAN SIDE OF<br /><span className="text-red">FLYING.</span></>}
        description="Flash Flights is a flight-booking request platform for travellers from Nepal. It combines a fast search experience with the thing search engines cannot replace: a person who can help with the details."
        image="/images/destinations/kathmandu.jpg"
        imageAlt="Himalayan mountains and a stupa near Kathmandu"
      >
        <ScrollToContent targetId="about-manifesto" label="Scroll to our story" />
      </PageHero>

      <section className="section about-manifesto" id="about-manifesto">
        <div className="container about-manifesto__grid">
          <Reveal className="about-manifesto__label">
            <span className="micro-label">Our position</span>
            <span className="about-manifesto__index">01</span>
          </Reveal>
          <Reveal className="about-manifesto__copy" delay={60}>
            <h2>
              BOOKING A FLIGHT IS NOT<br />
              JUST A SEARCH BOX.<br />
              <span>IT IS A DECISION.</span>
            </h2>
            <p>
              Which fare allows a refund? Does the transit airport need a visa? Is the passport valid
              long enough? Is the connection realistic? The answers matter, and they are rarely
              obvious from a list of prices.
            </p>
            <p>
              Flash Flights is designed around that gap. You can search and compare clearly labelled
              demonstration options, then send a structured booking request. In the production
              workflow, a Flash Flights team member reviews the request, discusses live availability
              and guides the final booking.
            </p>
            <div className="about-manifesto__signature">
              <span>FLASH FLIGHTS</span>
              <small>NEPAL · FLIGHT BOOKING DESK</small>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark about-principles">
        <div className="container">
          <SectionHeader
            index="02"
            eyebrow="What we believe"
            title={<>THREE THINGS WE<br />REFUSE TO FAKE.</>}
            description="This is a frontend demonstration. The principles still apply: clear information, human context and honest data boundaries."
            light
          />
          <div className="about-principles__grid">
            {PRINCIPLES.map((principle, index) => {
              const Icon = principle.icon
              return (
                <Reveal key={principle.title} delay={index * 80} className="principle-card">
                  <span className="principle-card__icon"><Icon size={22} /></span>
                  <span className="principle-card__number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section about-not">
        <div className="container about-not__grid">
          <Reveal>
            <SectionHeader
              index="03"
              eyebrow="Clear boundaries"
              title={<>WHAT WE ARE<br /><span className="text-red">NOT.</span></>}
              align="left"
            />
          </Reveal>
          <div className="about-not__list">
            {[
              'Not an airline. We do not operate aircraft or set airline schedules.',
              'Not an online payment processor. No payment is collected in this phase.',
              'Not a source of live fares. Every flight record here is demonstration data.',
              'Not a review site. We do not publish invented customer quotes or ratings.',
              'Not a document vault. Secure upload and retention are pending integrations.',
            ].map((item, index) => (
              <Reveal key={item} delay={index * 55} className="about-not__item">
                <span><Check size={14} /></span>
                <p>{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-process">
        <div className="container">
          <SectionHeader
            index="04"
            eyebrow="How we work"
            title={<>THE REQUEST IS<br />THE BEGINNING.</>}
            description="The frontend phase defines the experience. The future backend and integrations will do the operational work behind it."
          />
          <div className="about-process__track">
            {[
              { title: 'Structured request', copy: 'Passenger, contact, document and consent information captured in a deliberate sequence.' },
              { title: 'Human review', copy: 'A team member checks availability, fare rules and documents before discussing a booking.' },
              { title: 'Direct conversation', copy: 'Email and WhatsApp remain the primary channels, each with separate consent.' },
              { title: 'Final booking', copy: 'Payment and ticket issuance happen only after a quotation is accepted and confirmed by the team.' },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 80} className="about-process__item">
                <span className="about-process__number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta__inner">
          <Reveal>
            <Plane size={24} />
            <h2>THE NEXT JOURNEY<br />IS YOURS.</h2>
          </Reveal>
          <Reveal className="about-cta__actions" delay={80}>
            <Link to="/#search" className="btn btn--primary btn--lg">Search flights <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn btn--ghost-light btn--lg"><MessageCircle size={17} /> Talk to us</Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
