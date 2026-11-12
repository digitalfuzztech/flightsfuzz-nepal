import { Link } from 'react-router-dom'
import { ArrowUpRight, Plane } from 'lucide-react'
import type { PopularRoute } from '../../lib/data/routes'
import { buildSearchUrl, createRouteSearch } from '../../lib/utils/search'
import { cn } from '../../lib/utils/format'
import { SmartImage } from '../shared/SmartImage'

export function RouteCard({ route }: { route: PopularRoute }) {
  return (
    <Link
      to={buildSearchUrl(createRouteSearch(route.code))}
      className={cn('route-card', route.featured && 'route-card--featured')}
      aria-label={`Search flights from Kathmandu to ${route.city}`}
    >
      <SmartImage
        src={route.image}
        alt={`${route.city}, ${route.country}`}
        loading="lazy"
        wrapperClassName="smart-image--fill route-card__media"
        imgClassName="route-card__image"
      />
      <span className="route-card__shade" aria-hidden="true" />
      <span className="route-card__top">
        <span className="route-card__code">KTM</span>
        <span className="route-card__line"><Plane size={14} /></span>
        <span className="route-card__code">{route.code}</span>
      </span>
      <span className="route-card__body">
        <span className="route-card__region">{route.region}</span>
        <span className="route-card__title">{route.city}</span>
        <span className="route-card__country">{route.country}</span>
        <span className="route-card__blurb">{route.blurb}</span>
        <span className="route-card__cta">
          Search this route
          <ArrowUpRight size={16} />
        </span>
      </span>
    </Link>
  )
}
