export const COUNTRY_CODES = [
  { code: '+977', country: 'Nepal' },
  { code: '+91', country: 'India' },
  { code: '+971', country: 'United Arab Emirates' },
  { code: '+974', country: 'Qatar' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+965', country: 'Kuwait' },
  { code: '+968', country: 'Oman' },
  { code: '+973', country: 'Bahrain' },
  { code: '+66', country: 'Thailand' },
  { code: '+60', country: 'Malaysia' },
  { code: '+65', country: 'Singapore' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+81', country: 'Japan' },
  { code: '+82', country: 'South Korea' },
  { code: '+86', country: 'China' },
  { code: '+61', country: 'Australia' },
  { code: '+64', country: 'New Zealand' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+31', country: 'Netherlands' },
  { code: '+90', country: 'Türkiye' },
  { code: '+1', country: 'United States / Canada' },
]

export const NATIONALITIES = [
  'Nepali', 'Indian', 'Bangladeshi', 'Sri Lankan', 'Pakistani', 'Bhutanese',
  'Emirati', 'Qatari', 'Saudi', 'Kuwaiti', 'Omani', 'Bahraini',
  'Thai', 'Malaysian', 'Singaporean', 'Japanese', 'South Korean', 'Chinese',
  'Australian', 'British', 'American', 'Canadian', 'German', 'French', 'Other',
]

export const TRAVEL_PURPOSES = [
  'Tourism', 'Visiting family', 'Business', 'Study', 'Work', 'Medical', 'Other',
]

export const DOCUMENT_LABELS = {
  passport: 'Passport',
  citizenship: 'Citizenship certificate',
  aadhaar: 'Aadhaar card',
  nid: 'National ID (NID)',
} as const

export const DOCUMENT_HINTS = {
  passport: 'Photo page with passport number and expiry.',
  citizenship: 'Citizenship certificate issued by the Government of Nepal.',
  aadhaar: 'Front and back of the Aadhaar card.',
  nid: 'National identity card showing the document number.',
} as const
