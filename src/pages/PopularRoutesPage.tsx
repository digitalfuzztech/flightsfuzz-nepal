import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { POPULAR_ROUTES } from '../lib/data/routes'
import { RouteCard } from '../components/destinations/RouteCard'
import { PageHero } from '../components/shared/PageHero'
import { Reveal } from '../components/shared/Reveal'
import { cn } from '../lib/utils/format'

const REGIONS = ['All routes', 'Middle East', 'South Asia', 'Southeast Asia', 'East Asia', 'Europe', 'Oceania']

export function PopularRoutesPage() {
  const [region, setRegion] = useState('All routes')
  const filtered = useMemo(
    () => (region === 'All routes' ? POPULAR_ROUTES : POPULAR_ROUTES.filter((route) => route.region === region)),
    [region],
  )

  return (
    <div className="routes-page">
      <PageHero
        eyebrow="Popular routes · from Nepal"
        title={<>EVERY ROUTE<br />HAS A <span className="text-red">REASON.</span></>}
        description="Gulf connections, South Asian neighbours and long-haul journeys — explore the routes travellers from Nepal ask for most, then start a request with your own dates."
        image="/images/destinations/dubai.jpg"
        imageAlt="Dubai skyline at sunset"
      >
        <div className="page-hero__chips">
          <span>KATHMANDU BASED</span><span>INTERNATIONAL + DOMESTIC</span><span>HUMAN ASSISTANCE</span>
        </div>
      </PageHero>

      <section className="section routes-page__body">
        <div className="container">
          <div className="routes-toolbar">
            <div>
              <span className="micro-label">Filter by region</span>
              <h2>Choose a direction.</h2>
            </div>
            <div className="route-tabs" role="tablist" aria-label="Filter routes by region">
              {REGIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={region === item}
                  className={cn('route-tab', region === item && 'is-active')}
                  onClick={() => setRegion(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="route-grid route-grid--page">
            {filtered.map((route, index) => (
              <Reveal key={route.id} delay={index * 45} className={route.featured ? 'route-grid__featured' : ''}>
                <RouteCard route={route} />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state empty-state--small">
              <h2>No routes in this region yet.</h2>
              <p>Try another region or search any airport pair directly.</p>
              <Link to="/#search" className="btn btn--primary">Search a custom route</Link>
            </div>
          )}

          <Reveal className="routes-custom">
            <div>
              <span className="micro-label">Somewhere else?</span>
              <h2>THE MAP IS<br />NOT THE LIMIT.</h2>
              <p>
                These cards are a starting point, not a fixed inventory. Search any supported airport
                pair or describe your itinerary to the team.
              </p>
            </div>
            <div className="routes-custom__actions">
              <Link to="/#search" className="btn btn--primary">Search a custom route <ArrowRight size={17} /></Link>
              <Link to="/contact" className="btn btn--outline"><MessageCircle size={16} /> Contact the team</Link>
            </div>
          </Reveal>

          <p className="demo-note demo-note--inline">
            Route cards are editorial suggestions. No live schedule, direct-service guarantee or fare is shown.
          </p>
        </div>
      </section>
    </div>
  )
}
