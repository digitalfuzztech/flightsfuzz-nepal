import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, BadgeCheck, Headset, MessageCircle, ShieldCheck } from 'lucide-react'
import { FlightSearchForm } from '../flight-search/FlightSearchForm'

const ROUTE_TICKER = [
  'KTM → DXB', 'KTM → DOH', 'KTM → DEL', 'KTM → BKK', 'KTM → KUL',
  'KTM → SYD', 'KTM → LHR', 'KTM → NRT', 'KTM → SIN', 'KTM → HKG',
]

export function Hero() {
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 900px)').matches) return
    let frame = 0
    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY, 600)
        visualRef.current?.style.setProperty('--parallax', `${offset * 0.045}px`)
        frame = 0
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__atmosphere" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow" />
        <div className="hero__ring hero__ring--one" />
        <div className="hero__ring hero__ring--two" />
        <svg className="hero__route" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          <path d="M-40 470C210 320 390 410 620 300S1040 140 1480 210" stroke="currentColor" strokeOpacity=".18" strokeDasharray="3 9" />
          <circle cx="1084" cy="166" r="4" fill="#ED1C2E" />
          <circle cx="300" cy="396" r="3" fill="#ED1C2E" />
        </svg>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            Flight booking desk · Nepal
          </p>
          <h1 id="hero-title" className="hero__title">
            <span>YOUR NEXT</span>
            <span>JOURNEY</span>
            <span className="hero__title-accent">STARTS HERE.</span>
          </h1>
          <p className="hero__lead">
            Search international and domestic flights from Nepal, choose a route and send a
            booking request. A real person helps with the fare, the documents and the details.
          </p>
          <div className="hero__actions">
            <a href="#search" className="btn btn--primary btn--lg">
              Find my flight
              <ArrowDownRight size={18} strokeWidth={2.2} />
            </a>
            <Link to="/contact" className="btn btn--ghost-light btn--lg">
              <MessageCircle size={17} />
              Talk to a human
            </Link>
          </div>
          <ul className="hero__points">
            <li><BadgeCheck size={16} /> Human-reviewed requests</li>
            <li><Headset size={16} /> Personal support</li>
            <li><ShieldCheck size={16} /> Document guidance</li>
          </ul>
        </div>

        <div className="hero__visual" ref={visualRef}>
          <div className="hero__orbit" aria-hidden="true">
            <span className="hero__orbit-line" />
            <span className="hero__orbit-dot hero__orbit-dot--one" />
            <span className="hero__orbit-dot hero__orbit-dot--two" />
          </div>
          <img
            src="/images/hero-aircraft.png"
            alt="Commercial passenger aircraft rising into the sky"
            className="hero__plane"
            width="2000"
            height="1007"
            fetchPriority="high"
          />
          <span className="hero__code-chip hero__code-chip--origin" aria-hidden="true">KTM</span>
          <span className="hero__code-chip hero__code-chip--destination" aria-hidden="true">DXB</span>
          <span className="hero__vertical-note" aria-hidden="true">NEPAL · TO THE WORLD</span>

          <div className="boarding-slip" aria-hidden="true">
            <div className="boarding-slip__top">
              <span>FLIGHTSFUZZ</span>
              <span>DEMO PASS</span>
            </div>
            <div className="boarding-slip__route">
              <strong>KTM</strong>
              <span className="boarding-slip__line"><ArrowRight size={14} /></span>
              <strong>DXB</strong>
            </div>
            <div className="boarding-slip__meta">
              <span>GATE <b>07</b></span>
              <span>SEAT <b>1A</b></span>
              <span>STATUS <b>DEMO</b></span>
            </div>
            <div className="boarding-slip__barcode" />
          </div>
        </div>
      </div>

      <div className="container hero__search">
        <FlightSearchForm />
      </div>

      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-track">
          {[...ROUTE_TICKER, ...ROUTE_TICKER].map((route, index) => (
            <span key={`${route}-${index}`}>
              {route}
              <i />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
