export interface PopularRoute {
  id: string
  city: string
  country: string
  code: string
  image: string
  blurb: string
  region: string
  featured?: boolean
}

/**
 * Popular-route cards are editorial suggestions only. They do not imply that
 * a direct service or any particular schedule exists.
 */
export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    code: 'DXB',
    image: '/images/destinations/dubai.jpg',
    blurb: 'Skyline views, desert evenings and a global connection hub.',
    region: 'Middle East',
    featured: true,
  },
  {
    id: 'doha',
    city: 'Doha',
    country: 'Qatar',
    code: 'DOH',
    image: '/images/destinations/doha.jpg',
    blurb: 'A modern Gulf stopover with a waterfront corniche.',
    region: 'Middle East',
  },
  {
    id: 'delhi',
    city: 'Delhi',
    country: 'India',
    code: 'DEL',
    image: '/images/destinations/delhi.jpg',
    blurb: 'History, food and one of South Asia’s busiest aviation hubs.',
    region: 'South Asia',
  },
  {
    id: 'bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    code: 'BKK',
    image: '/images/destinations/bangkok.jpg',
    blurb: 'Street food, temples and a gateway to Southeast Asia.',
    region: 'Southeast Asia',
  },
  {
    id: 'kuala-lumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    code: 'KUL',
    image: '/images/destinations/kualalumpur.jpg',
    blurb: 'A skyline framed by towers and easy onward connections.',
    region: 'Southeast Asia',
  },
  {
    id: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    code: 'SYD',
    image: '/images/destinations/sydney.jpg',
    blurb: 'Harbour mornings and long-haul journeys from Nepal.',
    region: 'Oceania',
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    code: 'LHR',
    image: '/images/destinations/london.jpg',
    blurb: 'One of the most requested long-haul routes for Nepali travellers.',
    region: 'Europe',
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    code: 'NRT',
    image: '/images/destinations/tokyo.jpg',
    blurb: 'Neon streets, quiet temples and a completely different rhythm.',
    region: 'East Asia',
  },
]

export const INSPIRATION_DESTINATIONS = [
  {
    id: 'singapore',
    city: 'Singapore',
    code: 'SIN',
    country: 'Singapore',
    image: '/images/destinations/singapore.jpg',
    blurb: 'A compact city of gardens, hawker centres and connections across Asia.',
    size: 'wide',
  },
  {
    id: 'bangkok',
    city: 'Bangkok',
    code: 'BKK',
    country: 'Thailand',
    image: '/images/destinations/bangkok.jpg',
    blurb: 'Late-night markets, river boats and a city that never quite slows down.',
    size: 'tall',
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    code: 'NRT',
    country: 'Japan',
    image: '/images/destinations/tokyo.jpg',
    blurb: 'Hyper-modern districts beside centuries-old traditions.',
    size: 'normal',
  },
  {
    id: 'kathmandu',
    city: 'Kathmandu',
    code: 'KTM',
    country: 'Nepal',
    image: '/images/destinations/kathmandu.jpg',
    blurb: 'Home base. Mountain views, heritage squares and warm hospitality.',
    size: 'normal',
  },
  {
    id: 'hong-kong',
    city: 'Hong Kong',
    code: 'HKG',
    country: 'Hong Kong SAR',
    image: '/images/destinations/hongkong.jpg',
    blurb: 'Harbour lights, hill trails and a dense, energetic cityscape.',
    size: 'wide',
  },
  {
    id: 'sydney',
    city: 'Sydney',
    code: 'SYD',
    country: 'Australia',
    image: '/images/destinations/sydney.jpg',
    blurb: 'Coastal walks, harbour ferries and a relaxed pace of life.',
    size: 'normal',
  },
]
