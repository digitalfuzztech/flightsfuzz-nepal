import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FAQ_ITEMS } from '../../lib/data/faq'
import { Accordion } from '../shared/Accordion'
import { Reveal } from '../shared/Reveal'
import { SectionHeader } from '../shared/SectionHeader'

export function FaqSection() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-section__grid">
        <Reveal className="faq-section__intro">
          <SectionHeader
            index="06"
            eyebrow="Questions"
            title={<span id="faq-title">BEFORE<br />YOU FLY.</span>}
            description="Straight answers about the booking-request process, documents, consent and what this demonstration can — and cannot — do."
            align="left"
          />
          <div className="faq-contact">
            <span className="micro-label">Still unsure?</span>
            <p>Ask a person directly. Official contact channels will be published on the contact page.</p>
            <Link to="/contact" className="btn btn--outline btn--sm">
              Contact Flash Flights <ArrowUpRight size={16} />
            </Link>
            <Link to="/contact#whatsapp" className="text-link">
              <MessageCircle size={15} /> WhatsApp details
            </Link>
          </div>
        </Reveal>
        <Reveal className="faq-section__list" delay={80}>
          <Accordion items={FAQ_ITEMS} />
        </Reveal>
      </div>
    </section>
  )
}
