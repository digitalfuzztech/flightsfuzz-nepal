/**
 * INTEGRATION BOUNDARIES — COMMUNICATION & DOCUMENT STORAGE
 * ---------------------------------------------------------
 * These are deliberately inert placeholders. They document exactly what must
 * be connected later without pretending that it already works.
 */

export const EMAIL_AUTOMATION = {
  provider: null,
  configured: false,
  purpose: 'Booking-request acknowledgement and quotation emails',
  endpoint: '/api/notifications/email',
  templateId: 'booking-request-received',
  note: 'Requires a transactional email provider and verified sending domain.',
} as const

export const WHATSAPP_AUTOMATION = {
  provider: null,
  configured: false,
  purpose: 'Consent-based booking-request acknowledgement via WhatsApp',
  endpoint: '/api/notifications/whatsapp',
  templateId: 'booking_request_received',
  note: 'Requires an approved WhatsApp Business API template and opt-in record.',
} as const

export const SECURE_DOCUMENT_STORAGE = {
  configured: false,
  purpose: 'Encrypted storage for passport and identity documents',
  note:
    'No document is uploaded or persisted in this demonstration. Files stay in browser memory and are discarded when the flow ends.',
  requirements: [
    'Private encrypted object storage with short-lived signed URLs',
    'Server-side malware and file-type scanning',
    'Access logging and least-privilege retention policy',
    'Automatic deletion after the booking-request lifecycle',
  ],
} as const

export const FUTURE_COMMUNICATION_FLOW = [
  'Booking request is submitted to the secured API.',
  'Backend stores the lead and passenger details.',
  'Transactional email sends an acknowledgement to the provided address.',
  'WhatsApp Business API sends an approved acknowledgement, subject to consent.',
  'A Flash Flights team member takes over the conversation.',
  'Flight options, quotation, payment and final booking are handled by the team.',
] as const
