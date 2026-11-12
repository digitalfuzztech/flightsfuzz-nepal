import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '../../lib/utils/format'

interface SmartImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'onLoad' | 'onError'> {
  src: string
  alt: string
  wrapperClassName?: string
  imgClassName?: string
}

type ImageStatus = 'loading' | 'loaded' | 'error'

/**
 * Shared image frame: reserves the existing image box, shows a quiet skeleton,
 * fades the image in once decoded, and swaps to a fallback if it fails.
 *
 * The loaded state is held until the frame approaches the viewport so images
 * that finish downloading early still get their entrance when the card appears.
 */
export function SmartImage({
  src,
  alt,
  wrapperClassName,
  imgClassName,
  className,
  decoding = 'async',
  ...imgProps
}: SmartImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const frameRef = useRef<HTMLSpanElement>(null)
  const status: ImageStatus = failedSrc === src ? 'error' : loadedSrc === src ? 'loaded' : 'loading'

  useEffect(() => {
    const node = frameRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: '180px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const showImage = status === 'loaded' && isNearViewport
  const state = status === 'error' ? 'error' : showImage ? 'loaded' : 'loading'

  return (
    <span
      ref={frameRef}
      className={cn('smart-image', `is-${state}`, wrapperClassName)}
      data-smart-status={status}
      data-smart-near={String(isNearViewport)}
    >
      <span className="smart-image__skeleton" aria-hidden="true" />
      {status === 'error' ? (
        <span className="smart-image__fallback" role="img" aria-label={alt || 'Image unavailable'}>
          <ImageOff size={22} strokeWidth={1.7} aria-hidden="true" />
        </span>
      ) : (
        <img
          {...imgProps}
          src={src}
          alt={alt}
          decoding={decoding}
          className={cn('smart-image__img', imgClassName, className)}
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
        />
      )}
    </span>
  )
}
