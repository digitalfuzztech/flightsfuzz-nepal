import { useCallback } from 'react'
import { ArrowDown } from 'lucide-react'
import { cn } from '../../lib/utils/format'

interface ScrollToContentProps {
  targetId: string
  label?: string
  className?: string
  variant?: 'light' | 'dark'
}

/**
 * Scrolls to a real section by id, never to an arbitrary pixel offset.
 * The target section is responsible for providing the matching id.
 */
export function ScrollToContent({
  targetId,
  label = 'Scroll to explore',
  className,
  variant = 'light',
}: ScrollToContentProps) {
  const handleClick = useCallback(() => {
    const target = document.getElementById(targetId)
    if (!target) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })

    // Move keyboard focus to the section so assistive technology follows the jump.
    // The target is a landmark, not an interactive control, so it opts out of the
    // global focus ring via data-scroll-target.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.setAttribute('data-scroll-target', 'true')
    target.focus({ preventScroll: true })
  }, [targetId])

  return (
    <button
      type="button"
      className={cn('scroll-cue', `scroll-cue--${variant}`, className)}
      onClick={handleClick}
      aria-label={`${label}: jump to the next section`}
    >
      <span className="scroll-cue__text">{label}</span>
      <span className="scroll-cue__line" aria-hidden="true">
        <span />
      </span>
      <span className="scroll-cue__icon" aria-hidden="true">
        <ArrowDown size={15} strokeWidth={2.1} />
      </span>
    </button>
  )
}
