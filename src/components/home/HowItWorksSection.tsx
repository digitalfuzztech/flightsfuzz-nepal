import { ArrowUpRight, BadgeCheck, MailCheck, Search, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../shared/Reveal'
import { SectionHeader } from '../shared/SectionHeader'

const STEPS = [
  {
    number: '01',
    title: 'Search your flight',
    copy: 'Choose your route, dates, passengers and cabin class. The search uses clearly labelled demonstration data.',
    icon: Search,
    tag: '2 minutes',
  },
  {
    number: '02',
    title: 'Submit your request',
    copy: 'Add contact details, passenger information and communication consent. Nothing is charged or issued here.',
    icon: Send,
    tag: 'Secure form',
  },
  {
    number: '03',
    title: 'Receive confirmation & contact',
    copy: 'In the production flow, the backend acknowledges your request by email and WhatsApp before a team member follows up.',
    icon: MailCheck,
    tag: 'Human follow-up',
  },
  {
    number: '04',
    title: 'Complete booking with our team',
    copy: 'Discuss live options, fare rules, documents and payment directly with FlightsFuzz. The final ticket is issued only after confirmation.',
    icon: BadgeCheck,
    tag: 'Direct conversation',
  },
]

export function HowItWorksSection() {
  return (
    <section className="section how-section" aria-labelledby="how-title">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="The process"
          title={<span id="how-title">FROM SEARCH<br />TO BOARDING PASS.</span>}
          description="A clear four-stage journey. No mystery checkout, no instant charge and no pretending that a request is a confirmed ticket."
        />

        <div className="how-journey">
          <div className="how-journey__line" aria-hidden="true">
            <span />
          </div>
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal key={step.number} className="how-step" delay={index * 100}>
                <div className="how-step__top">
                  <span className="how-step__number">{step.number}</span>
                  <span className="how-step__icon"><Icon size={20} /></span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <span className="how-step__tag">{step.tag}</span>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="how-section__foot">
          <p>
            <strong>Important:</strong> this demonstration does not send emails, WhatsApp
            messages, booking requests or documents. Those integrations are pending.
          </p>
          <Link to="/contact" className="text-link">
            Ask about the process <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
