import { useEffect, useState } from 'react'
import { Logo } from '../brand/Logo'

interface PreloaderProps {
  onFinish: () => void
}

export function Preloader({ onFinish }: PreloaderProps) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = reduced ? 350 : 1250
    const exit = reduced ? 80 : 620
    const leaveTimer = window.setTimeout(() => setLeaving(true), hold)
    const doneTimer = window.setTimeout(onFinish, hold + exit)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
    }
  }, [onFinish])

  return (
    <div className={`preloader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="preloader__grid" aria-hidden="true" />
      <div className="preloader__inner">
        <Logo variant="light" />
        <div className="preloader__orbit-wrap" aria-hidden="true">
          <span className="preloader__ring" />
          <span className="preloader__ring preloader__ring--dashed" />
          <span className="preloader__orbit">
            <span className="preloader__plane">
              <svg viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 11.2 14 7.3V3.5a1.9 1.9 0 0 0-3.8 0v3.8l-7.6 3.9a.8.8 0 0 0-.4.7v1.5l8-2.3v4.1l-2.3 1.6v2l4.2-1.2 4.2 1.2v-2l-2.3-1.6v-4.1l8 2.3V12a.8.8 0 0 0-.4-.8Z" />
              </svg>
            </span>
          </span>
          <span className="preloader__orbit preloader__orbit--reverse">
            <span className="preloader__plane preloader__plane--small">
              <svg viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 11.2 14 7.3V3.5a1.9 1.9 0 0 0-3.8 0v3.8l-7.6 3.9a.8.8 0 0 0-.4.7v1.5l8-2.3v4.1l-2.3 1.6v2l4.2-1.2 4.2 1.2v-2l-2.3-1.6v-4.1l8 2.3V12a.8.8 0 0 0-.4-.8Z" />
              </svg>
            </span>
          </span>
        </div>
        <p className="preloader__label">PREPARING FOR TAKEOFF</p>
        <div className="preloader__progress" aria-hidden="true">
          <span />
        </div>
        <p className="preloader__note">Flight search · human assistance · Nepal</p>
      </div>
    </div>
  )
}
