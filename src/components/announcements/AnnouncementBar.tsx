import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Megaphone } from 'lucide-react'
import { getActiveAnnouncements } from '../../lib/data/announcements'

const ROTATE_MS = 7200

export function AnnouncementBar() {
  const announcements = useMemo(() => getActiveAnnouncements(), [])
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (announcements.length < 2) return
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcements.length)
    }, ROTATE_MS)

    return () => window.clearInterval(timer)
  }, [announcements.length, paused])

  if (announcements.length === 0) return null

  const announcement = announcements[index] ?? announcements[0]
  const accessibleLabel = `${announcement.label}: ${announcement.message} ${announcement.ctaLabel}`

  return (
    <div className="announcement-bar">
      <Link
        to={announcement.href}
        className="announcement-bar__link"
        aria-label={accessibleLabel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <span className="announcement-bar__accent" aria-hidden="true" />
        <span className="announcement-bar__inner container">
          <span className="announcement-bar__badge" aria-hidden="true">
            <span className="announcement-bar__ping" />
            <Megaphone size={13} strokeWidth={2.1} />
          </span>
          <span className="announcement-bar__message" key={announcement.id}>
            <span className="announcement-bar__label">{announcement.label}</span>
            <span className="announcement-bar__divider" aria-hidden="true" />
            <span className="announcement-bar__copy">{announcement.message}</span>
          </span>
          <span className="announcement-bar__cta">
            <span className="announcement-bar__cta-long">{announcement.ctaLabel}</span>
            <span className="announcement-bar__cta-short" aria-hidden="true">Updates</span>
            <ArrowRight size={13} className="announcement-bar__arrow" />
          </span>
        </span>
      </Link>
      {announcements.length > 1 ? (
        <span className="announcement-bar__dots" aria-hidden="true">
          {announcements.map((item, dotIndex) => (
            <i key={item.id} className={dotIndex === index ? 'is-active' : ''} />
          ))}
        </span>
      ) : null}
    </div>
  )
}
