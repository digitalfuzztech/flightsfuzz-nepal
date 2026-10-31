export type NoticeCategoryId =
  | 'exclusive-deals'
  | 'flightsfuzz-announcements'
  | 'travel-updates'
  | 'travel-guides'
  | 'important-notices'
  | 'airline-destination-news'

export type NoticeStatus = 'published' | 'draft' | 'archived'

export interface NoticeCategory {
  id: NoticeCategoryId
  label: string
  description: string
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }

export interface NoticeArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: ArticleBlock[]
  category: NoticeCategoryId
  coverImage: string
  coverAlt: string
  publishedAt: string
  updatedAt?: string
  featured: boolean
  tags: string[]
  readingTime: number
  status: NoticeStatus
  /** Marks content written for the demonstration build. */
  demo: true
}

export const NOTICE_CATEGORIES: NoticeCategory[] = [
  {
    id: 'exclusive-deals',
    label: 'Exclusive Deals',
    description: 'Sample fare-watch entries. No live discount is offered.',
  },
  {
    id: 'flightsfuzz-announcements',
    label: 'FlightsFuzz Announcements',
    description: 'Product notes about how the request desk works.',
  },
  {
    id: 'travel-updates',
    label: 'Travel Updates',
    description: 'Editorial updates about routes, seasons and planning.',
  },
  {
    id: 'travel-guides',
    label: 'Travel Guides',
    description: 'Practical explainers for travellers from Nepal.',
  },
  {
    id: 'important-notices',
    label: 'Important Notices',
    description: 'Checklist-style reminders. Not official government advice.',
  },
  {
    id: 'airline-destination-news',
    label: 'Airline & Destination News',
    description: 'Context about destinations and connecting regions.',
  },
]

/**
 * Every article in this file is demonstration content written for the
 * FlightsFuzz frontend. Nothing here is an official FlightsFuzz announcement,
 * live deal, airline statement or real-world travel advisory.
 *
 * Draft and archived records are included deliberately so the public pages can
 * prove that only published content is exposed. A future CMS can replace this
 * module without changing the page components.
 */
export const NOTICES: NoticeArticle[] = [
  {
    id: 'notice-booking-request',
    slug: 'how-a-booking-request-works',
    title: 'How a FlightsFuzz booking request actually works',
    excerpt:
      'Search is only the first step. Here is what happens between choosing a route and holding a real ticket — and why the request is deliberately reviewed by a person.',
    category: 'travel-guides',
    coverImage: '/images/destinations/airport.jpg',
    coverAlt: 'Aircraft parked at an airport gate at dusk',
    publishedAt: '2026-10-24',
    updatedAt: '2026-10-29',
    featured: true,
    tags: ['Booking request', 'Process', 'Human review'],
    readingTime: 6,
    status: 'published',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'A flight search answers a narrow question: which options exist for a route and a date? A booking request answers a wider one: what should you actually confirm, with which fare rules, and with which documents ready?',
      },
      {
        type: 'paragraph',
        text: 'FlightsFuzz is built around that second question. The demonstration frontend lets you search, compare clearly labelled sample flights and then send a structured request. The production workflow adds a human review layer between the request and any real ticket.',
      },
      { type: 'heading', text: 'Step one: search and shortlist' },
      {
        type: 'paragraph',
        text: 'Choose one-way, round trip or multi-city travel, then set your route, dates, travellers and cabin. The results in this build are generated illustrations. They are useful for understanding the interface, but they are not live availability.',
      },
      { type: 'heading', text: 'Step two: send the request' },
      {
        type: 'paragraph',
        text: 'The seven-step request captures the itinerary, your contact details, each passenger, optional documents, travel preferences and your communication consent. Nothing is charged and no seat is held at this point.',
      },
      {
        type: 'list',
        items: [
          'Contact details are used so a team member can discuss the request.',
          'Passenger names should match the travel document exactly.',
          'Documents stay in the browser tab in this demo and are never uploaded.',
          'Email and WhatsApp consent are separate and never preselected.',
        ],
      },
      { type: 'heading', text: 'Step three: human review' },
      {
        type: 'paragraph',
        text: 'In the finished product, a team member would check live availability, fare conditions, baggage, transit rules and document validity. Only then would a quotation and payment instruction be discussed directly.',
      },
      {
        type: 'quote',
        text: 'A request is a conversation starter, not a confirmation. That distinction protects travellers from surprises later.',
      },
      { type: 'heading', text: 'What this demo will never pretend' },
      {
        type: 'paragraph',
        text: 'The interface does not claim to hold seats, issue tickets, process payments or message you automatically. Those integrations are explicitly pending, and the success screen says so.',
      },
    ],
  },
  {
    id: 'notice-long-haul',
    slug: 'planning-a-long-haul-trip-from-kathmandu',
    title: 'A calmer way to plan a long-haul trip from Kathmandu',
    excerpt:
      'Long-haul planning is less about finding the single cheapest row and more about balancing connections, transit rules and the time you actually arrive.',
    category: 'travel-guides',
    coverImage: '/images/destinations/kathmandu.jpg',
    coverAlt: 'Himalayan mountains and a stupa near Kathmandu',
    publishedAt: '2026-10-21',
    featured: false,
    tags: ['Long haul', 'Planning', 'Connections'],
    readingTime: 5,
    status: 'published',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'A long-haul itinerary from Nepal usually involves at least one connection. The cheapest combination is not automatically the most sensible one once you account for layover length, terminal changes and the hour you land.',
      },
      { type: 'heading', text: 'Start with the arrival, not the fare' },
      {
        type: 'paragraph',
        text: 'Think about what happens after landing: immigration queues, onward transport, whether you can check into accommodation, and whether you are travelling with children or older passengers. A slightly later arrival can be worth more than a small saving.',
      },
      { type: 'heading', text: 'Give connections room' },
      {
        type: 'paragraph',
        text: 'A tight connection looks efficient on paper. It leaves little room for a delayed first leg. When a route requires a self-transfer or a change of airport, the buffer matters even more.',
      },
      {
        type: 'list',
        items: [
          'Prefer a single ticket where possible rather than two unrelated bookings.',
          'Check whether baggage is checked through to the final destination.',
          'Confirm whether a transit visa is needed for your nationality.',
          'Keep the first and last legs of a long trip simple.',
        ],
      },
      { type: 'heading', text: 'Write the request down' },
      {
        type: 'paragraph',
        text: 'A structured request is useful because it records constraints instead of leaving them in a chat thread. Note your preferred arrival window, any mobility needs and whether the dates are flexible.',
      },
      {
        type: 'quote',
        text: 'The best long-haul itinerary is the one you can still manage on the day you land.',
      },
    ],
  },
  {
    id: 'notice-demo-fares',
    slug: 'why-we-label-demonstration-fares',
    title: 'Why we label demonstration fares instead of hiding them',
    excerpt:
      'Fake live prices would make the interface feel finished for a moment and unreliable forever. Labelling sample data is a product decision, not a disclaimer afterthought.',
    category: 'flightsfuzz-announcements',
    coverImage: '/images/destinations/dubai.jpg',
    coverAlt: 'Dubai skyline at sunset',
    publishedAt: '2026-10-18',
    featured: false,
    tags: ['Product', 'Transparency', 'Demo data'],
    readingTime: 4,
    status: 'published',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'A polished flight interface can create a strong assumption: the numbers on screen are real. In a frontend-only build, that assumption would be false. The honest response is to design the demo state as a first-class part of the product.',
      },
      { type: 'heading', text: 'What we show' },
      {
        type: 'paragraph',
        text: 'Every result carries a demonstration strip. The results page repeats the notice above the list and again underneath it. Carriers are fictional, and the fares are generated illustrations for the selected travellers and cabin.',
      },
      { type: 'heading', text: 'What we do not show' },
      {
        type: 'list',
        items: [
          'No invented “live” availability countdowns.',
          'No fabricated customer reviews or ratings.',
          'No fake airline partnerships or official schedules.',
          'No claim that a request has been sent when it has not.',
        ],
      },
      {
        type: 'quote',
        text: 'Trust is easier to keep when the interface is honest about what it does not know.',
      },
      {
        type: 'paragraph',
        text: 'When a flight-data provider is connected, the same components can display live inventory. Until then, the demo labels stay visible.',
      },
    ],
  },
  {
    id: 'notice-itinerary',
    slug: 'reading-a-flight-itinerary',
    title: 'Reading a flight itinerary: stops, layovers and timing',
    excerpt:
      'A row of times and a small “1 stop” label hides a lot. This short guide explains what to check before you treat an itinerary as comparable.',
    category: 'travel-guides',
    coverImage: '/images/destinations/singapore.jpg',
    coverAlt: 'Singapore skyline and waterfront',
    publishedAt: '2026-10-14',
    featured: false,
    tags: ['Itinerary', 'Airports', 'Layovers'],
    readingTime: 5,
    status: 'published',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'Two flights can share a departure city, an arrival city and a similar price while being very different journeys. The details that separate them live in the middle of the itinerary.',
      },
      { type: 'heading', text: 'Departure and arrival are local times' },
      {
        type: 'paragraph',
        text: 'Airline schedules are shown in local time at each airport. A flight that leaves at 23:40 and lands at 06:10 may cross several time zones. The small “+1” marker means the arrival is on the following day.',
      },
      { type: 'heading', text: 'A stop is not always a simple stop' },
      {
        type: 'list',
        items: [
          'A through-checked connection keeps your bag on the same ticket.',
          'A self-transfer may require collecting baggage and checking in again.',
          'An airport change is a different journey altogether.',
          'Overnight layovers can add hotel and transit costs.',
        ],
      },
      { type: 'heading', text: 'Compare total door-to-door time' },
      {
        type: 'paragraph',
        text: 'Add the time needed to reach the departure airport and the time from the arrival airport to your accommodation. A journey with a short flight but a long connection can still be the slower option overall.',
      },
      {
        type: 'quote',
        text: 'The itinerary is not just the flight. It is the whole transition between two places.',
      },
    ],
  },
  {
    id: 'notice-departure-checklist',
    slug: 'before-an-international-departure',
    title: 'What to check before an international departure',
    excerpt:
      'A practical pre-departure checklist covering passports, names, documents and the details travellers most often leave until the last morning.',
    category: 'important-notices',
    coverImage: '/images/destinations/airport.jpg',
    coverAlt: 'Airport terminal walkway at dusk',
    publishedAt: '2026-10-11',
    featured: false,
    tags: ['Documents', 'Checklist', 'Airport'],
    readingTime: 4,
    status: 'published',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'This is a general editorial checklist, not official immigration or airline advice. Requirements depend on your nationality, destination and carrier, and they can change. Always confirm with the airline and official authorities.',
      },
      { type: 'heading', text: 'The passport itself' },
      {
        type: 'list',
        items: [
          'Check the expiry date against the destination’s entry rules.',
          'Make sure the name matches the ticket exactly.',
          'Look for damage that could affect machine reading.',
          'Keep a separate copy of the photo page.',
        ],
      },
      { type: 'heading', text: 'The booking details' },
      {
        type: 'paragraph',
        text: 'Confirm the spelling of every passenger name, the travel dates and the terminal. If a middle name is part of the passport, decide consistently how it should appear on the ticket.',
      },
      { type: 'heading', text: 'The day itself' },
      {
        type: 'paragraph',
        text: 'Leave more time than you think you need for check-in, security and immigration. Keep medication, valuables and essential documents in your cabin bag rather than checked luggage.',
      },
      {
        type: 'quote',
        text: 'A calm departure is usually the result of boring checks done early.',
      },
    ],
  },
  {
    id: 'notice-gulf-routing',
    slug: 'gulf-connections-from-nepal',
    title: 'Gulf connections from Nepal: how to think about routing',
    excerpt:
      'The Gulf is one of the most familiar connecting regions for travellers from Kathmandu. Here is how to compare routings without treating them as interchangeable.',
    category: 'airline-destination-news',
    coverImage: '/images/destinations/doha.jpg',
    coverAlt: 'Doha waterfront skyline',
    publishedAt: '2026-10-07',
    featured: false,
    tags: ['Gulf', 'Connections', 'Routing'],
    readingTime: 5,
    status: 'published',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'Dubai, Doha and other Gulf hubs appear frequently in itineraries from Nepal because they connect a large number of onward destinations. The airport code alone does not tell you how convenient the connection will be.',
      },
      { type: 'heading', text: 'Compare the connection, not just the hub' },
      {
        type: 'list',
        items: [
          'How long is the layover, and does it fall overnight?',
          'Do you stay in the same terminal?',
          'Is baggage checked through to the final destination?',
          'Does your nationality need a transit visa for this routing?',
        ],
      },
      { type: 'heading', text: 'Think about the total journey' },
      {
        type: 'paragraph',
        text: 'A Gulf hub can add distance but improve connection choice. For some destinations that trade-off is excellent; for others a different region may be more direct. Compare the whole itinerary rather than ranking airports in isolation.',
      },
      {
        type: 'quote',
        text: 'A hub is useful because of the connection it enables, not because of its name.',
      },
      {
        type: 'paragraph',
        text: 'Route notes like this are editorial context. They do not describe a live schedule or imply an airline partnership.',
      },
    ],
  },
  {
    id: 'notice-sample-deal',
    slug: 'what-a-sample-fare-watch-means',
    title: 'What a “sample fare watch” actually means here',
    excerpt:
      'This is a demonstration of the deals layout, not a discount. It explains how the editorial module will work once verified fare data exists.',
    category: 'exclusive-deals',
    coverImage: '/images/destinations/bangkok.jpg',
    coverAlt: 'Bangkok skyline at night',
    publishedAt: '2026-10-03',
    featured: false,
    tags: ['Sample', 'Deals', 'Editorial'],
    readingTime: 3,
    status: 'published',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'A deals section is only trustworthy if the fare behind it can be verified. This demonstration article exists to show the layout and the writing style, not to advertise a real price.',
      },
      { type: 'heading', text: 'No hidden number' },
      {
        type: 'paragraph',
        text: 'There is no fare, promo code or expiry date in this article because inventing one would mislead the reader. When a verified data source is connected, deals will show their source, date checked and conditions.',
      },
      { type: 'heading', text: 'What a real deal entry should include' },
      {
        type: 'list',
        items: [
          'The route and travel window.',
          'The fare conditions and baggage allowance.',
          'The date the fare was last verified.',
          'A clear statement of availability limits.',
        ],
      },
      {
        type: 'quote',
        text: 'A deal without a verification date is just a number with good typography.',
      },
    ],
  },
  {
    id: 'notice-travel-updates',
    slug: 'where-travel-updates-will-live',
    title: 'Where travel updates will live once a source is connected',
    excerpt:
      'Official travel updates need an official source. Until that integration exists, this category explains the editorial standard rather than inventing alerts.',
    category: 'travel-updates',
    coverImage: '/images/destinations/london.jpg',
    coverAlt: 'London skyline along the river',
    publishedAt: '2026-09-29',
    featured: false,
    tags: ['Travel updates', 'Sources', 'Standards'],
    readingTime: 3,
    status: 'published',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'Travel updates are different from travel guides. They are time-sensitive, and getting them wrong can affect someone’s journey. That is why this demonstration does not invent an urgent advisory.',
      },
      { type: 'heading', text: 'The standard we would apply' },
      {
        type: 'list',
        items: [
          'Link to the official authority or airline statement.',
          'Record when the update was last checked.',
          'Separate confirmed facts from guidance.',
          'Remove or archive updates that no longer apply.',
        ],
      },
      {
        type: 'paragraph',
        text: 'When an official feed is connected, this category can become a genuine updates desk. Until then, it remains a clearly marked editorial placeholder.',
      },
      {
        type: 'quote',
        text: 'An update without a source is a rumour with a timestamp.',
      },
    ],
  },
  {
    id: 'notice-draft-seasonal',
    slug: 'seasonal-fare-watch-draft',
    title: 'Seasonal fare watch (draft)',
    excerpt: 'A draft entry used internally to test that unpublished content never reaches the public pages.',
    category: 'exclusive-deals',
    coverImage: '/images/destinations/tokyo.jpg',
    coverAlt: 'Tokyo street at night',
    publishedAt: '2026-10-27',
    featured: false,
    tags: ['Draft'],
    readingTime: 2,
    status: 'draft',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'This draft should never appear on the public notices page or be reachable by URL.',
      },
    ],
  },
  {
    id: 'notice-archived-sample',
    slug: 'archived-sample-notice',
    title: 'Archived sample notice',
    excerpt: 'An archived entry used to verify that retired content is excluded from public listings.',
    category: 'flightsfuzz-announcements',
    coverImage: '/images/destinations/cabin.jpg',
    coverAlt: 'Aircraft cabin interior',
    publishedAt: '2026-08-12',
    featured: false,
    tags: ['Archived'],
    readingTime: 2,
    status: 'archived',
    demo: true,
    content: [
      {
        type: 'paragraph',
        text: 'This archived entry is retained in the data layer only to demonstrate status filtering.',
      },
    ],
  },
]

const byNewest = (a: NoticeArticle, b: NoticeArticle) => b.publishedAt.localeCompare(a.publishedAt)

export const getPublishedNotices = (): NoticeArticle[] =>
  NOTICES.filter((notice) => notice.status === 'published').sort(byNewest)

export const getFeaturedNotice = (): NoticeArticle | null =>
  getPublishedNotices().find((notice) => notice.featured) ?? getPublishedNotices()[0] ?? null

export const getNoticeBySlug = (slug: string): NoticeArticle | null =>
  getPublishedNotices().find((notice) => notice.slug === slug) ?? null

export const getNoticeCategory = (id: NoticeCategoryId): NoticeCategory | undefined =>
  NOTICE_CATEGORIES.find((category) => category.id === id)

export const getCategoryCounts = (): Record<NoticeCategoryId, number> => {
  const counts = {} as Record<NoticeCategoryId, number>
  NOTICE_CATEGORIES.forEach((category) => {
    counts[category.id] = 0
  })
  getPublishedNotices().forEach((notice) => {
    counts[notice.category] += 1
  })
  return counts
}

export const getRelatedNotices = (article: NoticeArticle, limit = 3): NoticeArticle[] => {
  const published = getPublishedNotices().filter((notice) => notice.id !== article.id)
  const sameCategory = published.filter((notice) => notice.category === article.category)
  const others = published.filter((notice) => notice.category !== article.category)
  return [...sameCategory, ...others].slice(0, limit)
}
