import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { Preloader } from './components/preloader/Preloader'
import { SiteLayout } from './components/layout/SiteLayout'
import { HomePage } from './pages/HomePage'
import { FlightsPage } from './pages/FlightsPage'
import { PopularRoutesPage } from './pages/PopularRoutesPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsPage } from './pages/TermsPage'
import { BookingRequestPage } from './pages/BookingRequestPage'
import { BookingSuccessPage } from './pages/BookingSuccessPage'
import { NoticesPage } from './pages/NoticesPage'
import { ArticlePage } from './pages/ArticlePage'
import { NotFoundPage } from './pages/NotFoundPage'

const PAGE_TITLES: Record<string, string> = {
  '/': 'Flash Flights — Flight Booking Requests from Nepal',
  '/flights': 'Flight Results — Flash Flights',
  '/popular-routes': 'Popular Routes — Flash Flights',
  '/notices': 'Notices & Articles — Flash Flights',
  '/about': 'About Flash Flights',
  '/contact': 'Contact — Flash Flights',
  '/privacy-policy': 'Privacy Policy — Flash Flights',
  '/terms-and-conditions': 'Terms & Conditions — Flash Flights',
  '/booking-request': 'Booking Request — Flash Flights',
  '/booking-success': 'Request Captured — Flash Flights',
}

function RouteEffects() {
  const location = useLocation()

  useEffect(() => {
    const articleTitle = location.pathname.startsWith('/notices/') ? 'Notice — Flash Flights' : undefined
    document.title = PAGE_TITLES[location.pathname] ?? articleTitle ?? 'Page Not Found — Flash Flights'
  }, [location.pathname])

  return null
}

function AppRoutes() {
  return (
    <SiteLayout>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/popular-routes" element={<PopularRoutesPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/notices/:slug" element={<ArticlePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/booking-request" element={<BookingRequestPage />} />
        <Route path="/booking-success" element={<BookingSuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  )
}

function App() {
  const [ready, setReady] = useState(false)
  const finishPreloader = useCallback(() => setReady(true), [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-preloading', !ready)
    return () => document.documentElement.classList.remove('is-preloading')
  }, [ready])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
        {!ready && <Preloader onFinish={finishPreloader} />}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
