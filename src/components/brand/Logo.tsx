import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils/format'

interface LogoProps {
  variant?: 'default' | 'light'
  compact?: boolean
  className?: string
}

export function Logo({
                       variant = 'default',
                       compact = false,
                       className,
                     }: LogoProps) {
  return (
      <Link
          to="/"
          className={cn(
              'logo',
              variant === 'light' && 'logo--light',
              compact && 'logo--compact',
              className,
          )}
          aria-label="Flash Flights — home"
      >
        <img
            src="/images/flash-flights-logo.png"
            alt="Flash Flights"
            width={2224}
            height={1318}
            className="logo__image"
            draggable={false}
        />
      </Link>
  )
}