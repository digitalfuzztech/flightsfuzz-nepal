import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Home, Plane } from 'lucide-react'
import { Reveal } from '../components/shared/Reveal'

export function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__grid" aria-hidden="true" />
      <div className="not-found__glow" aria-hidden="true" />
      <div className="container not-found__inner">
        <Reveal className="not-found__copy">
          <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Off the flight path</p>
          <h1><span>404</span> TURBULENCE<br />ON THIS ROUTE.</h1>
          <p>
            The page you were looking for does not exist, has moved, or was never part of this
            demonstration. Let’s get you back to a known airport.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn--primary btn--lg"><Home size={17} /> Back to home</Link>
            <Link to="/flights" className="btn btn--ghost-light btn--lg">Search flights <ArrowRight size={17} /></Link>
          </div>
          <div className="not-found__links">
            <Link to="/popular-routes" className="text-link text-link--light"><Compass size={15} /> Popular routes</Link>
            <Link to="/contact" className="text-link text-link--light">Contact the team <ArrowRight size={14} /></Link>
          </div>
        </Reveal>

        <Reveal className="not-found__visual" delay={100}>
          <span className="not-found__ring" aria-hidden="true" />
          <span className="not-found__ring not-found__ring--two" aria-hidden="true" />
          <span className="not-found__plane" aria-hidden="true"><Plane size={54} /></span>
          <span className="not-found__code">FF / 404</span>
          <div className="not-found__ticket" aria-hidden="true">
            <div><span>ORIGIN</span><strong>WHEREVER</strong></div>
            <div><span>DESTINATION</span><strong>NOT FOUND</strong></div>
            <div><span>STATUS</span><strong>REROUTE</strong></div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
