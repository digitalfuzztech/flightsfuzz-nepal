import { Link } from 'react-router-dom'
import { ArrowUpRight, Database, Eye, FileLock2, Mail, ShieldCheck } from 'lucide-react'
import { PageHero } from '../components/shared/PageHero'
import { Reveal } from '../components/shared/Reveal'

const SECTIONS = [
  { id: 'scope', label: 'Scope of this policy' },
  { id: 'information', label: 'Information you enter' },
  { id: 'documents', label: 'Documents' },
  { id: 'storage', label: 'Local storage & cookies' },
  { id: 'sharing', label: 'Sharing & third parties' },
  { id: 'consent', label: 'Communication consent' },
  { id: 'retention', label: 'Retention' },
  { id: 'production', label: 'Before production' },
  { id: 'choices', label: 'Your choices' },
  { id: 'changes', label: 'Changes & contact' },
]

export function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <PageHero
        eyebrow="Privacy policy · demonstration"
        title={<>YOUR DATA.<br />STATED <span className="text-red">PLAINLY.</span></>}
        description="This policy describes what the Flash Flights frontend demonstration actually does with information. It is written for the current prototype, not for a live booking service."
        compact
      >
        <div className="legal-meta">
          <span>Last updated · 30 October 2026</span>
          <span>Applies to · this frontend demonstration</span>
        </div>
      </PageHero>

      <section className="section legal-body">
        <div className="container legal-layout">
          <aside className="legal-nav">
            <span className="micro-label">On this page</span>
            <nav aria-label="Privacy policy sections">
              {SECTIONS.map((section, index) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {section.label}
                </a>
              ))}
            </nav>
            <div className="legal-nav__note">
              <ShieldCheck size={18} />
              <p>No analytics, advertising or tracking scripts are included in this build.</p>
            </div>
          </aside>

          <article className="legal-content">
            <Reveal className="legal-callout">
              <FileLock2 size={21} />
              <div>
                <strong>The short version</strong>
                <p>
                  This is a frontend-only demonstration. Information entered in the booking request
                  is not sent to a server, not saved in a database and not shared with anyone.
                  Uploaded documents stay in temporary browser memory. The only value stored in your
                  browser is your light or dark theme preference.
                </p>
              </div>
            </Reveal>

            <Reveal as="section" id="scope" className="legal-section">
              <span className="legal-section__number">01</span>
              <h2>Scope of this policy</h2>
              <p>
                This policy applies to the Flash Flights website and its pages for flight search,
                popular routes, about, contact, booking requests and booking confirmation. It
                describes the behaviour of this demonstration build.
              </p>
              <p>
                Flash Flights is presented as a Nepal-focused flight booking request desk. This
                frontend does not operate as a live travel agency, does not issue tickets and does
                not collect payment. The policy is demonstration copy and is not legal advice.
              </p>
            </Reveal>

            <Reveal as="section" id="information" className="legal-section" delay={30}>
              <span className="legal-section__number">02</span>
              <h2>Information you can enter</h2>
              <p>The interface may ask you to enter the following information:</p>
              <ul>
                <li>Flight search details such as routes, dates, passenger counts and cabin class.</li>
                <li>Contact details such as name, email address, mobile number, WhatsApp number and postal address.</li>
                <li>Passenger details such as full name, date of birth, gender, nationality and document number.</li>
                <li>Optional travel preferences, special requests and free-text notes.</li>
                <li>Communication consent choices for email and WhatsApp.</li>
              </ul>
              <p>
                In this build, that information is held only in React state in your current browser
                tab. It is not transmitted by a network request. When the tab is closed or refreshed,
                it is lost. The final confirmation screen receives a summary through temporary
                in-browser navigation state, not a database or cookie.
              </p>
            </Reveal>

            <Reveal as="section" id="documents" className="legal-section" delay={30}>
              <span className="legal-section__number">03</span>
              <h2>Identity documents</h2>
              <p>
                The document step accepts PDF, JPG, PNG and WebP files for local preview. Files are
                read in your browser, and image previews use temporary object URLs. They are never
                uploaded, never written to localStorage or sessionStorage and never added to a
                network payload.
              </p>
              <p>
                The interface is deliberately explicit that secure document storage, malware
                scanning, access logging and a retention policy are not implemented. Please do not
                upload real identity documents to this demonstration.
              </p>
              <div className="legal-inline-warning">
                <Eye size={17} />
                <p>
                  A future production service would require encrypted storage, short-lived signed
                  access, server-side file scanning and a defined deletion schedule before accepting
                  real documents.
                </p>
              </div>
            </Reveal>

            <Reveal as="section" id="storage" className="legal-section" delay={30}>
              <span className="legal-section__number">04</span>
              <h2>Local storage and cookies</h2>
              <p>
                The site stores one preference in your browser&apos;s localStorage: the key{' '}
                <code>flightsfuzz-theme</code>, with a value of <code>light</code> or{' '}
                <code>dark</code>. This keeps your chosen theme between visits. You can clear it by
                clearing site data in your browser.
              </p>
              <p>
                This demonstration does not use advertising cookies, analytics cookies, tracking
                pixels, fingerprinting or session-recording tools. Fonts and interface assets are
                bundled with the site rather than loaded from a third-party font or analytics
                service.
              </p>
            </Reveal>

            <Reveal as="section" id="sharing" className="legal-section" delay={30}>
              <span className="legal-section__number">05</span>
              <h2>Sharing and third parties</h2>
              <p>
                Because form data is not transmitted, there is no sharing of booking-request data
                with airlines, payment providers, messaging platforms or marketing services in this
                build.
              </p>
              <p>
                The interface documents future integration points for a booking-request API, a
                transactional email provider, a WhatsApp Business API provider and encrypted
                document storage. Those integrations are not configured. When they are connected,
                this policy must be replaced with a production policy that names providers, lawful
                bases, retention periods and international transfer arrangements.
              </p>
              <p>
                The site may link to external websites such as airlines or travel resources in
                future. This build does not currently publish external partner links, reviews,
                awards or airline partnerships.
              </p>
            </Reveal>

            <Reveal as="section" id="consent" className="legal-section" delay={30}>
              <span className="legal-section__number">06</span>
              <h2>Communication consent</h2>
              <p>
                Email and WhatsApp are two separate consent choices. Both are required to submit the
                demonstration request, but neither checkbox is preselected. The interface records
                them as separate fields in the request draft.
              </p>
              <p>
                No email or WhatsApp message is sent by this demonstration. In a production service,
                consent records would be stored with the request, and opt-out or withdrawal
                instructions would be included in every message.
              </p>
            </Reveal>

            <Reveal as="section" id="retention" className="legal-section" delay={30}>
              <span className="legal-section__number">07</span>
              <h2>Retention</h2>
              <p>
                Demo form data is retained only while the booking-request page remains open. Leaving
                the flow, refreshing the page or closing the tab discards it. Object URLs for image
                previews are revoked when files are removed or the page unmounts.
              </p>
              <p>
                The confirmation page can display a locally generated reference for the current
                navigation session. It is not stored on a server and cannot be looked up later.
              </p>
            </Reveal>

            <Reveal as="section" id="production" className="legal-section" delay={30}>
              <span className="legal-section__number">08</span>
              <h2>What must change before production</h2>
              <p>A production release would need, at minimum:</p>
              <ul>
                <li>A documented lawful basis for processing contact and passenger data.</li>
                <li>Secure server-side storage, access control and audit logging.</li>
                <li>Encrypted document storage with scanning and automatic deletion.</li>
                <li>Clear provider disclosures for email, WhatsApp and flight-data services.</li>
                <li>Data-subject request handling, complaint routes and breach procedures.</li>
                <li>A review against applicable Nepali and international privacy requirements.</li>
              </ul>
              <div className="legal-inline-warning">
                <Database size={17} />
                <p>
                  The booking-request API and secure document storage are both marked as pending in
                  the interface. No production data store exists in this repository.
                </p>
              </div>
            </Reveal>

            <Reveal as="section" id="choices" className="legal-section" delay={30}>
              <span className="legal-section__number">09</span>
              <h2>Your choices</h2>
              <p>
                You can avoid entering personal information into this demo. Do not upload real
                identity documents. You can clear the stored theme preference through your browser
                settings, and you can leave the booking flow at any time without creating a record.
              </p>
              <p>
                Because no request reaches Flash Flights in this build, there is no stored record to
                access, correct or delete. For questions about this demonstration, use the contact
                page. Official contact channels are not yet active.
              </p>
            </Reveal>

            <Reveal as="section" id="changes" className="legal-section" delay={30}>
              <span className="legal-section__number">10</span>
              <h2>Changes and contact</h2>
              <p>
                This policy will change when booking, messaging, analytics or document-storage
                integrations are added. The date at the top of the page identifies the current
                version.
              </p>
              <p>
                For now, the contact page shows the intended channels and their pending status. No
                email address, phone number or WhatsApp account is active.
              </p>
              <div className="legal-actions">
                <Link to="/contact" className="btn btn--primary">
                  <Mail size={16} /> Open contact page
                </Link>
                <Link to="/terms-and-conditions" className="text-link">
                  Read the terms &amp; conditions <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </article>
        </div>
      </section>
    </div>
  )
}
