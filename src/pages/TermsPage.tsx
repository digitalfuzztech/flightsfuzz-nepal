import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowUpRight, FileText, ShieldCheck } from 'lucide-react'
import { PageHero } from '../components/shared/PageHero'
import { Reveal } from '../components/shared/Reveal'

const SECTIONS = [
  { id: 'acceptance', label: 'Using this site' },
  { id: 'service', label: 'What this service is' },
  { id: 'demo-data', label: 'Demo flight data' },
  { id: 'request', label: 'Booking requests' },
  { id: 'documents', label: 'Documents & sensitive data' },
  { id: 'communication', label: 'Communication consent' },
  { id: 'payment', label: 'No payment or ticketing' },
  { id: 'conduct', label: 'Acceptable use' },
  { id: 'liability', label: 'Availability & liability' },
  { id: 'changes', label: 'Changes & contact' },
]

export function TermsPage() {
  return (
    <div className="legal-page">
      <PageHero
        eyebrow="Terms & conditions · demonstration"
        title={<>CLEAR TERMS.<br />NO <span className="text-red">SMALL PRINT.</span></>}
        description="These terms describe the limits of the current Flash Flights frontend demonstration. They are not the terms of a live travel agency or a completed booking service."
        compact
      >
        <div className="legal-meta">
          <span>Last updated · 30 October 2026</span>
          <span>Status · frontend demonstration</span>
        </div>
      </PageHero>

      <section className="section legal-body">
        <div className="container legal-layout">
          <aside className="legal-nav">
            <span className="micro-label">On this page</span>
            <nav aria-label="Terms and conditions sections">
              {SECTIONS.map((section, index) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {section.label}
                </a>
              ))}
            </nav>
            <div className="legal-nav__note">
              <FileText size={18} />
              <p>Plain-language demonstration terms. This page is not legal advice.</p>
            </div>
          </aside>

          <article className="legal-content">
            <Reveal className="legal-callout">
              <AlertTriangle size={21} />
              <div>
                <strong>The short version</strong>
                <p>
                  This is a demonstration interface. Flights shown are fictional, prices are
                  illustrative, no payment is taken and no ticket or reservation is created. A
                  booking request is a request for human follow-up — not a confirmed booking.
                </p>
              </div>
            </Reveal>

            <Reveal as="section" id="acceptance" className="legal-section">
              <span className="legal-section__number">01</span>
              <h2>Using this site</h2>
              <p>
                By using this website, you agree to these demonstration terms. If you do not accept
                them, please do not use the booking-request flow. You must be old enough to enter
                into a contract in your jurisdiction to submit a request for yourself; a parent or
                guardian should manage requests for children.
              </p>
              <p>
                These terms apply to the frontend prototype in this repository. They do not create a
                customer relationship with an airline, a travel agency, a payment provider or any
                future Flash Flights production entity.
              </p>
            </Reveal>

            <Reveal as="section" id="service" className="legal-section" delay={30}>
              <span className="legal-section__number">02</span>
              <h2>What this service is</h2>
              <p>
                Flash Flights is presented as a flight booking request platform for travellers from
                Nepal. The interface lets you search routes, review demonstration flight options and
                prepare a structured request with contact, passenger, document and communication
                information.
              </p>
              <p>
                The intended production workflow involves a human team member reviewing a request,
                checking live availability and fare rules, and discussing a quotation directly with
                you. That operational workflow is not active here. The current build demonstrates
                the interface only.
              </p>
            </Reveal>

            <Reveal as="section" id="demo-data" className="legal-section" delay={30}>
              <span className="legal-section__number">03</span>
              <h2>Demonstration flight data</h2>
              <p>
                All airline names in the results experience — including FuzzAir, Everest Wings,
                Himalayan Sky, Gulf Falcon, Nepal Connect and SkyBridge — are fictional. Flight
                numbers, schedules, aircraft, stopovers, baggage allowances, refund rules and fares
                are generated in the browser for illustration.
              </p>
              <p>
                Nothing on the flights page represents live availability, a real fare, a seat hold or
                a bookable product. Route cards and destination imagery are editorial inspiration,
                not a promise that a direct service or any particular schedule exists.
              </p>
              <div className="legal-inline-warning">
                <ShieldCheck size={17} />
                <p>
                  Real availability, pricing and fare conditions must be confirmed by the Flash Flights
                  team with a live flight-data provider before any booking decision.
                </p>
              </div>
            </Reveal>

            <Reveal as="section" id="request" className="legal-section" delay={30}>
              <span className="legal-section__number">04</span>
              <h2>Booking requests</h2>
              <p>
                Submitting the form creates a local demonstration confirmation in your browser. It
                does not send the request to Flash Flights, does not create a lead in a database and
                does not reserve a seat. The reference shown is generated locally and cannot be
                looked up later.
              </p>
              <p>
                You are responsible for the accuracy of the information you enter, including names
                exactly as they appear on travel documents, dates of birth, contact details and
                document numbers. In a production flow, incorrect details could cause a booking to
                be rejected or a passenger to be denied boarding.
              </p>
            </Reveal>

            <Reveal as="section" id="documents" className="legal-section" delay={30}>
              <span className="legal-section__number">05</span>
              <h2>Documents and sensitive data</h2>
              <p>
                The document step is a local preview only. Files are held in browser memory, are not
                uploaded and are discarded when you leave the flow. Please do not upload real
                passports, citizenship certificates, Aadhaar cards or national ID documents to this
                demonstration.
              </p>
              <p>
                Secure storage, server-side scanning, access controls and retention rules are not
                implemented. Any future document collection must meet those requirements before real
                documents are accepted.
              </p>
            </Reveal>

            <Reveal as="section" id="communication" className="legal-section" delay={30}>
              <span className="legal-section__number">06</span>
              <h2>Communication consent</h2>
              <p>
                The request flow asks for separate email and WhatsApp consent. Both choices are
                required to submit the demonstration form, and neither is preselected. The choices
                are recorded in the draft as separate values.
              </p>
              <p>
                No email or WhatsApp message is delivered by this build. In production, messages
                would be sent only through approved providers and only after consent has been
                recorded. You would be able to withdraw consent through the contact channel
                published at that time.
              </p>
            </Reveal>

            <Reveal as="section" id="payment" className="legal-section" delay={30}>
              <span className="legal-section__number">07</span>
              <h2>No payment or ticketing</h2>
              <p>
                This website does not collect payment, card details, bank details or wallet
                credentials. It does not issue tickets, hold seats or confirm fares. Any request to
                send money to an account presented as Flash Flights should be treated as suspicious
                until official channels are independently verified.
              </p>
              <p>
                The production flow is expected to involve a quotation, explicit acceptance and a
                separate payment process handled by the team. None of those steps exist in this
                demonstration.
              </p>
            </Reveal>

            <Reveal as="section" id="conduct" className="legal-section" delay={30}>
              <span className="legal-section__number">08</span>
              <h2>Acceptable use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>attempt to break, overload or interfere with the site or its security;</li>
                <li>submit unlawful, abusive, misleading or malicious content;</li>
                <li>upload files that you do not have the right to use, or files containing malware;</li>
                <li>impersonate another person or submit their personal data without authority;</li>
                <li>scrape or republish the interface in a way that misrepresents it as a live booking service.</li>
              </ul>
            </Reveal>

            <Reveal as="section" id="liability" className="legal-section" delay={30}>
              <span className="legal-section__number">09</span>
              <h2>Availability and liability</h2>
              <p>
                The demonstration is provided as-is for evaluation and design review. It may contain
                errors, may change without notice and may be unavailable. No warranty is given about
                accuracy, completeness, fitness for a particular purpose or uninterrupted access.
              </p>
              <p>
                To the extent permitted by applicable law, Flash Flights is not liable for losses
                arising from reliance on demonstration data, from the inability to use this
                prototype, or from any booking, payment or travel decision made outside a verified
                production channel. Nothing in these terms excludes liability that cannot lawfully
                be excluded.
              </p>
            </Reveal>

            <Reveal as="section" id="changes" className="legal-section" delay={30}>
              <span className="legal-section__number">10</span>
              <h2>Changes and contact</h2>
              <p>
                These terms will be replaced when the production service launches. The date at the
                top of the page identifies the current demonstration version. Continued use after an
                update means you accept the revised terms.
              </p>
              <p>
                Official contact channels are not yet active. The contact page documents the intended
                email and WhatsApp channels and their pending status so you can avoid unverified
                third parties.
              </p>
              <div className="legal-actions">
                <Link to="/contact" className="btn btn--primary">
                  <FileText size={16} /> Open contact page
                </Link>
                <Link to="/privacy-policy" className="text-link">
                  Read the privacy policy <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </article>
        </div>
      </section>
    </div>
  )
}
