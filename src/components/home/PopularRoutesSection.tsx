import { POPULAR_ROUTES } from '../../lib/data/routes'
import { RouteCard } from '../destinations/RouteCard'
import { Reveal } from '../shared/Reveal'
import { SectionHeader } from '../shared/SectionHeader'

export function PopularRoutesSection() {
  return (
    <section className="section home-routes" aria-labelledby="popular-routes-title">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="Popular from Nepal"
          title={<span id="popular-routes-title">ROUTES WORTH<br />TAKING OFF FOR.</span>}
          description="A starting point for your next trip. Choose a city, adjust the dates and send a request — our team checks the live options behind the scenes."
          actionLabel="View all popular routes"
          actionTo="/popular-routes"
        />
        <div className="route-grid">
          {POPULAR_ROUTES.map((route, index) => (
            <Reveal key={route.id} delay={index * 55} className={route.featured ? 'route-grid__featured' : ''}>
              <RouteCard route={route} />
            </Reveal>
          ))}
        </div>
        <p className="demo-note demo-note--inline">
          Route suggestions are editorial. We do not display live prices until a flight-data provider is connected.
        </p>
      </div>
    </section>
  )
}
