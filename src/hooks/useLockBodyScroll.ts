import { useEffect } from 'react'

export const useLockBodyScroll = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = original
      document.body.style.paddingRight = ''
    }
  }, [locked])
}
