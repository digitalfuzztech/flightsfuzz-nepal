import { useLocation } from 'react-router-dom'
import { FloatingActions } from './FloatingActions'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { ScrollToTop } from './ScrollToTop'

const floatingContactHiddenOn = new Set([
  '/flights',
  '/booking-request',
  '/booking-success',
  '/privacy-policy',
  '/terms-and-conditions',
])

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const showFloatingContact = !floatingContactHiddenOn.has(location.pathname)

  return (
    <div className="site">
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader />
      <main id="main-content" key={location.pathname} className="page-shell">
        {children}
      </main>
      {showFloatingContact ? <FloatingActions /> : null}
      <SiteFooter />
    </div>
  )
}
