import { useEffect, useRef } from 'react'

interface ReadingProgressProps {
  /** Element whose scroll span defines the reading progress. */
  targetId: string
  label?: string
}

/**
 * Fixed reading-progress bar for long-form pages. Uses a rAF-throttled scroll
 * listener and updates a CSS variable so the bar never triggers layout.
 */
export function ReadingProgress({ targetId, label = 'Article reading progress' }: ReadingProgressProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      const target = document.getElementById(targetId)
      const bar = barRef.current
      if (!target || !bar) return

      const rect = target.getBoundingClientRect()
      const viewport = window.innerHeight
      const scrollable = rect.height - viewport
      const raw = scrollable > 0 ? (-rect.top) / scrollable : rect.top <= 0 ? 1 : 0
      const progress = Math.min(1, Math.max(0, raw))
      bar.style.setProperty('--reading-progress', progress.toFixed(4))
    }

    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        update()
        frame = 0
      })
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [targetId])

  return (
    <div
      ref={barRef}
      className="reading-progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span />
    </div>
  )
}
