import { useEffect, useRef } from 'react'

export const useOnClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  active = true,
) => {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    if (!active) return
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current
      if (!element || element.contains(event.target as Node)) return
      handlerRef.current()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener, { passive: true })
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [active, ref])
}
