export interface Announcement {
  id: string
  label: string
  message: string
  ctaLabel: string
  href: string
  active: boolean
}

/**
 * Central announcement source.
 *
 * These are editorial demonstration messages, not live offers. A future admin
 * panel or CMS can replace this array without changing the announcement bar.
 */
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'editorial-desk',
    label: 'Flash Flights update',
    message: 'Discover the latest travel notices, guides and platform updates.',
    ctaLabel: 'Explore updates',
    href: '/notices',
    active: true,
  },
  {
    id: 'notices-live',
    label: 'New editorial desk',
    message: 'Travel guides, route explainers and sample notices are now live.',
    ctaLabel: 'Read the notices',
    href: '/notices',
    active: true,
  },
  {
    id: 'request-desk',
    label: 'Booking requests',
    message: 'Prepare your trip details and send a human-assisted booking request.',
    ctaLabel: 'Start a request',
    href: '/booking-request',
    active: true,
  },
]

export const getActiveAnnouncements = (): Announcement[] =>
  ANNOUNCEMENTS.filter((announcement) => announcement.active)
