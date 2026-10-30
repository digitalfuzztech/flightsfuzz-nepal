import { INSPIRATION_DESTINATIONS } from '../../lib/data/routes'
import { DestinationCard } from '../destinations/DestinationCard'
import { Reveal } from '../shared/Reveal'
import { SectionHeader } from '../shared/SectionHeader'

export function DestinationsSection() {
  return (
    <section className="section destinations-section" aria-labelledby="destinations-title">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="Travel inspiration"
          title={<span id="destinations-title">PLACES TO PUT<br />ON YOUR RADAR.</span>}
          description="Not a catalogue of packages — just a few cities that make a good reason to start searching. Every card leads to a flight request."
          actionLabel="Browse popular routes"
          actionTo="/popular-routes"
        />
        <div className="destination-grid">
          {INSPIRATION_DESTINATIONS.map((destination, index) => (
            <Reveal
              key={destination.id}
              delay={index * 60}
              className={`destination-grid__item destination-grid__item--${destination.size}`}
            >
              <DestinationCard {...destination} />
            </Reveal>
          ))}
        </div>
        <p className="demo-note demo-note--inline">
          Destination imagery is illustrative. Flight availability is not shown until live data is connected.
        </p>
      </div>
    </section>
  )
}
