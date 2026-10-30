import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from '../shared/Reveal'

interface SectionHeaderProps {
  index: string
  eyebrow: string
  title: ReactNode
  description?: string
  actionLabel?: string
  actionTo?: string
  align?: 'left' | 'split'
  light?: boolean
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
  align = 'split',
  light = false,
}: SectionHeaderProps) {
  return (
    <Reveal className={`section-header section-header--${align} ${light ? 'is-light' : ''}`}>
      <div className="section-header__main">
        <p className="section-kicker">
          <span>{index}</span>
          {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {(description || (actionLabel && actionTo)) && (
        <div className="section-header__aside">
          {description && <p>{description}</p>}
          {actionLabel && actionTo && (
            <Link to={actionTo} className={`text-link ${light ? 'text-link--light' : ''}`}>
              {actionLabel}
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      )}
    </Reveal>
  )
}
