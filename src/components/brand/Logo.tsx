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
          aria-label="FlightsFuzz — home"
      >
        <img
            src="/images/logo-primary.png"
            alt="FlightsFuzz"
            className="logo__image"
            draggable={false}
        />
      </Link>
  )
}