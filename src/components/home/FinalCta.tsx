import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../shared/Reveal'

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__grid" aria-hidden="true" />
      <div className="final-cta__glow" aria-hidden="true" />
      <img
        src="/images/hero-aircraft.png"
        alt=""
        aria-hidden="true"
        className="final-cta__plane"
        loading="lazy"
      />
      <div className="container final-cta__inner">
        <Reveal>
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__dot" aria-hidden="true" />
            Ready when you are
          </p>
          <h2 id="final-cta-title">READY FOR<br /><span>TAKEOFF?</span></h2>
          <p className="final-cta__lead">
            Search a route, send a request and let a human team take it from there.
            Your next journey starts with one small step.
          </p>
          <div className="final-cta__actions">
            <Link to="/#search" className="btn btn--primary btn--lg">
              Search flights <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn--ghost-light btn--lg">
              <MessageCircle size={17} /> Contact our team
            </Link>
          </div>
          <p className="final-cta__note">
            Demonstration experience · no live booking, payment or messaging is active.
          </p>
        </Reveal>
      </div>
      <div className="final-cta__strip" aria-hidden="true">
        <span>KATHMANDU</span><i /><span>DUBAI</span><i /><span>DOHA</span><i /><span>LONDON</span><i /><span>SYDNEY</span><i /><span>TOKYO</span>
      </div>
    </section>
  )
}
