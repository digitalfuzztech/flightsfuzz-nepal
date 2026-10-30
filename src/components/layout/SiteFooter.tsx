import { Link } from 'react-router-dom'
import { ArrowUpRight, BriefcaseBusiness, Camera, Mail, MessageCircle, Play, Users } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { POPULAR_ROUTES } from '../../lib/data/routes'
import { buildSearchUrl, createRouteSearch } from '../../lib/utils/search'

const SOCIALS = [
  { label: 'Instagram', icon: Camera },
  { label: 'Facebook', icon: Users },
  { label: 'LinkedIn', icon: BriefcaseBusiness },
  { label: 'YouTube', icon: Play },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo variant="light" />
            <p>
              A modern flight-booking request desk built for travellers from Nepal. Search routes,
              share your documents securely and let a human team handle the details.
            </p>
            <div className="site-footer__actions">
              <Link to="/contact#whatsapp" className="btn btn--primary btn--sm">
                <MessageCircle size={16} />
                WhatsApp details
              </Link>
              <Link to="/contact#email" className="btn btn--ghost-light btn--sm">
                <Mail size={16} />
                Email us
              </Link>
            </div>
          </div>

          <div className="site-footer__col">
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/flights">Flight search</Link>
            <Link to="/popular-routes">Popular routes</Link>
            <Link to="/about">About FlightsFuzz</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="site-footer__col">
            <h3>Popular routes</h3>
            {POPULAR_ROUTES.slice(0, 5).map((route) => (
              <Link key={route.id} to={buildSearchUrl(createRouteSearch(route.code))}>
                Kathmandu → {route.city}
              </Link>
            ))}
          </div>

          <div className="site-footer__col site-footer__col--contact">
            <h3>Contact</h3>
            <p className="site-footer__placeholder">
              Official WhatsApp number
              <span>To be published</span>
            </p>
            <p className="site-footer__placeholder">
              Official email address
              <span>To be published</span>
            </p>
            <p className="site-footer__small">
              Contact placeholders only. No phone number or email address is active in this demonstration.
            </p>
            <Link to="/contact" className="text-link text-link--light">
              Open contact page <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="site-footer__middle">
          <div className="site-footer__socials" aria-label="Social media links coming soon">
            {SOCIALS.map(({ label, icon: Icon }) => (
              <span key={label} className="site-footer__social" title={`${label} link coming soon`} aria-label={`${label} — link coming soon`}>
                <Icon size={17} />
              </span>
            ))}
            <span className="site-footer__social-note">Social channels coming soon</span>
          </div>
          <p className="site-footer__demo">
            Demonstration build · No live flight inventory, bookings or payments
          </p>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} FlightsFuzz. All rights reserved.</p>
          <div>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
      <div className="site-footer__wordmark" aria-hidden="true">FLIGHTSFUZZ</div>
    </footer>
  )
}
