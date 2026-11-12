import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buildSearchUrl, createRouteSearch } from '../../lib/utils/search'
import { cn } from '../../lib/utils/format'
import { SmartImage } from '../shared/SmartImage'

interface DestinationCardProps {
  id: string
  city: string
  code: string
  country: string
  image: string
  blurb: string
  size?: string
}

export function DestinationCard({ city, code, country, image, blurb, size = 'normal' }: DestinationCardProps) {
  return (
    <Link
      to={buildSearchUrl(createRouteSearch(code))}
      className={cn('destination-card', `destination-card--${size}`)}
      aria-label={`Search flights to ${city}`}
    >
      <SmartImage
        src={image}
        alt={`${city}, ${country}`}
        loading="lazy"
        wrapperClassName="smart-image--fill destination-card__media"
        imgClassName="destination-card__image"
      />
      <span className="destination-card__shade" aria-hidden="true" />
      <span className="destination-card__meta">
        <span className="destination-card__code">{code}</span>
        <span>{country}</span>
      </span>
      <span className="destination-card__bottom">
        <span>
          <strong>{city}</strong>
          <small>{blurb}</small>
        </span>
        <span className="destination-card__arrow"><ArrowUpRight size={18} /></span>
      </span>
    </Link>
  )
}
