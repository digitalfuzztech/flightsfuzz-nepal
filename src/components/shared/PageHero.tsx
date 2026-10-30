import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '../../lib/utils/format'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description: string
  image?: string
  imageAlt?: string
  children?: ReactNode
  compact?: boolean
}

export function PageHero({ eyebrow, title, description, image, imageAlt, children, compact = false }: PageHeroProps) {
  return (
    <header className={cn('page-hero', image && 'page-hero--image', compact && 'page-hero--compact')}>
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="page-hero__glow" aria-hidden="true" />
      <div className="container page-hero__inner">
        <Reveal className="page-hero__copy">
          <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> {eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero__lead">{description}</p>
          {children}
        </Reveal>
        {image && (
          <Reveal className="page-hero__media" delay={90}>
            <img src={image} alt={imageAlt ?? ''} />
            <span className="page-hero__media-frame" aria-hidden="true" />
            <span className="page-hero__media-caption" aria-hidden="true">FLIGHTSFUZZ / TRAVEL DESK</span>
          </Reveal>
        )}
      </div>
    </header>
  )
}
