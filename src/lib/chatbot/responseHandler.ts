export interface ChatAction {
  label: string
  to?: string
  href?: string
}

export interface AssistantReply {
  text: string
  actions?: ChatAction[]
  intent: string
}

interface IntentRule {
  id: string
  keywords: string[]
  compose: (input: string) => AssistantReply
}

const link = {
  search: { label: 'Search Flights', to: '/flights' },
  request: { label: 'Request a Booking', to: '/booking-request' },
  contact: { label: 'Contact Our Team', to: '/contact' },
  notices: { label: 'View Notices', to: '/notices' },
  whatsapp: { label: 'WhatsApp Details', to: '/contact#whatsapp' },
  documents: { label: 'Open Document Step', to: '/booking-request' },
} satisfies Record<string, ChatAction>

const reply = (intent: string, text: string, actions?: ChatAction[]): AssistantReply => ({
  intent,
  text,
  actions,
})

const escapePattern = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Match whole words and phrases so short keywords such as "hi" or "ok" do not
 * fire inside words like "which" or "look". A trailing plural is allowed for
 * keywords long enough to make that safe.
 */
const hasAny = (input: string, keywords: string[]): boolean =>
  keywords.some((keyword) => {
    const plural = keyword.length >= 3 ? '(?:s|es)?' : ''
    return new RegExp(`(?:^|\\s)${escapePattern(keyword)}${plural}(?:\\s|$)`, 'u').test(input)
  })

const RULES: IntentRule[] = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'namaste'],
    compose: () =>
      reply(
        'greeting',
        'Namaste — I’m the FlightsFuzz assistant. I can explain the booking-request flow, point you to flight search, or help you find the right page. What are you planning?',
        [link.search, link.request, link.notices],
      ),
  },
  {
    id: 'request-help',
    keywords: ['help with my booking', 'existing request', 'my request', 'reference', 'booking status', 'status of my', 'modify', 'change my booking'],
    compose: () =>
      reply(
        'request-help',
        'I can’t look up or change a request in this demo. A booking reference only exists inside the browser session that created it, and no request data is stored. Please use the Contact page for anything related to an existing booking, and a team member can help once the real support channels are connected.',
        [link.contact, link.request],
      ),
  },
  {
    id: 'booking-process',
    keywords: ['request a booking', 'how do i request', 'booking request', 'how does flightsfuzz work', 'how it works', 'start a request'],
    compose: () =>
      reply(
        'booking-process',
        'A booking request is a structured conversation, not an instant purchase. Search for a route, choose a demonstration option, then complete the seven steps: flight review, contact details, passengers, documents, extra information, consent and final review. A team member would then verify live availability and fare rules with you.',
        [link.search, link.request, link.contact],
      ),
  },
  {
    id: 'book-flight',
    keywords: ['book a flight', 'want to book', 'book flight', 'buy a ticket', 'find a flight', 'search a flight'],
    compose: () =>
      reply(
        'book-flight',
        'Start with the flight search. Choose one-way, round trip or multi-city, set your route and dates, and review the clearly labelled demonstration options. From there you can send a booking request for human follow-up.',
        [link.search, link.request],
      ),
  },
  {
    id: 'documents',
    keywords: ['document', 'passport', 'visa', 'id card', 'citizenship', 'aadhaar', 'paperwork'],
    compose: () =>
      reply(
        'documents',
        'International travel commonly needs a valid passport, and some itineraries may require a visa or transit permission. The exact requirements depend on your nationality, destination and airline. In the booking request you can attach document previews; in this demo the files stay in your browser tab and are never uploaded. The team would confirm the real requirements before any booking.',
        [link.request, link.contact, link.notices],
      ),
  },
  {
    id: 'international',
    keywords: ['international', 'abroad', 'foreign', 'outside nepal', 'long haul'],
    compose: () =>
      reply(
        'international',
        'Yes — FlightsFuzz is designed around international travel from Nepal, including the Gulf, South Asia, Southeast Asia, East Asia, Europe and Australia. Search any supported airport pair, or describe the itinerary to the team if it is more complex.',
        [link.search, link.contact],
      ),
  },
  {
    id: 'contact',
    keywords: ['contact', 'whatsapp', 'email', 'talk to a human', 'human', 'agent', 'support', 'phone'],
    compose: () =>
      reply(
        'contact',
        'Human support is the right place for anything specific to your booking. The Contact page explains the official channel status; email and WhatsApp details are marked “to be published” in this demonstration. I can’t send a WhatsApp or email message from this chat.',
        [link.contact, link.whatsapp],
      ),
  },
  {
    id: 'payment',
    keywords: ['payment', 'pay', 'price', 'fare', 'cost', 'quote', 'quotation', 'refund', 'card'],
    compose: () =>
      reply(
        'payment',
        'There is no online payment in this demonstration. In the real workflow, a quotation would come from the team after a request is reviewed, with fare rules, baggage and payment instructions. Never send money to an unverified account. For fare or refund questions, speak to a person.',
        [link.contact, link.request],
      ),
  },
  {
    id: 'notices',
    keywords: ['notice', 'article', 'news', 'update', 'guide', 'blog', 'read', 'deal'],
    compose: () =>
      reply(
        'notices',
        'The Notices desk collects demonstration travel guides, product notes and sample updates. Everything there is clearly marked editorial content — not an official airline statement or live travel advisory.',
        [link.notices, link.search],
      ),
  },
  {
    id: 'baggage',
    keywords: ['baggage', 'luggage', 'bag', 'carry on', 'checked bag'],
    compose: () =>
      reply(
        'baggage',
        'Baggage allowances depend on the airline and fare family, so I can’t confirm one here. Add your preference in the booking request’s additional-information step, and a team member can verify the allowance with the live fare.',
        [link.request, link.contact],
      ),
  },
  {
    id: 'confirmation',
    keywords: ['confirmed', 'confirmation', 'ticket issued', 'seat held', 'guarantee'],
    compose: () =>
      reply(
        'confirmation',
        'Submitting a request does not confirm a booking, hold a seat or issue a ticket. Those steps happen only after a team member reviews availability, fare rules and documents with you and a quotation is accepted.',
        [link.request, link.contact],
      ),
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'great', 'perfect', 'ok', 'okay'],
    compose: () =>
      reply(
        'thanks',
        'You’re welcome. If you want to keep going, start a flight search or open the notices desk. For anything specific, the contact page is the right place.',
        [link.search, link.contact],
      ),
  },
]

const FALLBACK: AssistantReply = reply(
  'fallback',
  'I’m a guided demo assistant, so I can’t check live availability, confirm a booking or look up personal details. I can explain the request flow, documents, payments and where to find things. For anything specific, please contact the team.',
  [link.contact, link.search, link.notices],
)

const normalise = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/**
 * Deterministic, frontend-only assistant.
 *
 * Replace this function with a call to a backend/AI endpoint when one exists.
 * The UI already treats the return value as an async-friendly structure.
 */
export const getAssistantReply = (input: string): AssistantReply => {
  const normalised = normalise(input)
  if (!normalised) return FALLBACK

  for (const rule of RULES) {
    if (hasAny(normalised, rule.keywords)) {
      return rule.compose(normalised)
    }
  }

  return FALLBACK
}

export const SUGGESTED_PROMPTS: string[] = [
  'I want to book a flight.',
  'How do I request a booking?',
  'What documents do I need?',
  'How does FlightsFuzz work?',
  'Can I book an international flight?',
  'How do I contact your team?',
  'How does payment work?',
  'I need help with my booking request.',
]
