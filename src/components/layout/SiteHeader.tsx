import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { ThemeToggle } from '../theme/ThemeToggle'
import { AnnouncementBar } from '../announcements/AnnouncementBar'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { cn } from '../../lib/utils/format'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Flights', to: '/flights' },
  { label: 'Popular Routes', to: '/popular-routes' },
  { label: 'Notices', to: '/notices' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useLockBodyScroll(open)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <>
      <header className={cn('site-header', scrolled && 'is-scrolled', open && 'is-open')}>
        <AnnouncementBar />
        <div className="container site-header__inner">
          <Logo />
          <nav className="site-nav" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cn('site-nav__link', isActive && 'is-active')}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="site-header__actions">
            <ThemeToggle />
            <Link to="/#search" className="btn btn--primary btn--sm site-header__cta">
              Book a Flight
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </Link>
            <button
              type="button"
              className="site-header__menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((current) => !current)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={cn('mobile-nav', open && 'is-open')}
        aria-hidden={!open}
      >
        <div className="mobile-nav__inner">
          <p className="micro-label">MENU / FLASH FLIGHTS</p>
          <nav aria-label="Mobile navigation">
            {NAV_ITEMS.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="mobile-nav__link"
                style={{ '--item-index': index } as React.CSSProperties}
                tabIndex={open ? 0 : -1}
              >
                <span className="mobile-nav__index">0{index + 1}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-nav__footer">
            <Link to="/#search" className="btn btn--primary btn--block" tabIndex={open ? 0 : -1}>
              Start a flight search
            </Link>
            <p>Human-assisted bookings from Nepal. Official contact details will be published soon.</p>
            <div className="mobile-nav__meta">
              <Link to="/privacy-policy" tabIndex={open ? 0 : -1}>Privacy</Link>
              <Link to="/terms-and-conditions" tabIndex={open ? 0 : -1}>Terms</Link>
              <Link to="/contact" tabIndex={open ? 0 : -1}>Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
