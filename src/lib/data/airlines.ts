import type { DemoAirline } from '../../types'

/**
 * These carriers are fictional and exist only inside the demonstration
 * results experience. They do not represent real airlines, schedules or fares.
 */
export const DEMO_AIRLINES: DemoAirline[] = [
  { code: 'FZ', name: 'FuzzAir', initials: 'FA', color: '#ED1C2E', isDemo: true },
  { code: 'EW', name: 'Everest Wings', initials: 'EW', color: '#1F3B73', isDemo: true },
  { code: 'HS', name: 'Himalayan Sky', initials: 'HS', color: '#0F6B5C', isDemo: true },
  { code: 'GF', name: 'Gulf Falcon', initials: 'GF', color: '#8A5A16', isDemo: true },
  { code: 'NC', name: 'Nepal Connect', initials: 'NC', color: '#3D3D3D', isDemo: true },
  { code: 'SB', name: 'SkyBridge', initials: 'SB', color: '#5B2A86', isDemo: true },
]

export const CABIN_LABELS: Record<string, string> = {
  economy: 'Economy',
  'premium-economy': 'Premium Economy',
  business: 'Business',
  first: 'First Class',
}

export const CABIN_MULTIPLIERS: Record<string, number> = {
  economy: 1,
  'premium-economy': 1.55,
  business: 2.8,
  first: 4.4,
}
