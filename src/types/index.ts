export type TripType = 'oneway' | 'roundtrip' | 'multicity'

export type CabinClass = 'economy' | 'premium-economy' | 'business' | 'first'

export type PassengerType = 'adult' | 'child' | 'infant'

export type DocumentType = 'passport' | 'citizenship' | 'aadhaar' | 'nid'

export type Gender = 'female' | 'male' | 'other' | 'prefer-not-to-say'

export interface Airport {
  code: string
  city: string
  country: string
  name: string
  region: string
  popular?: boolean
}

export interface SearchSegment {
  from: Airport
  to: Airport
  date: string
}

export interface FlightSearch {
  tripType: TripType
  segments: SearchSegment[]
  returnDate?: string
  adults: number
  children: number
  infants: number
  cabin: CabinClass
}

export interface DemoAirline {
  code: string
  name: string
  initials: string
  color: string
  isDemo: true
}

export interface MockFlight {
  id: string
  airline: DemoAirline
  from: Airport
  to: Airport
  date: string
  departureMinutes: number
  arrivalMinutes: number
  durationMinutes: number
  stops: number
  stopCodes: string[]
  aircraft: string
  priceNPR: number
  baggage: {
    cabin: string
    checked: string
  }
  refundable: boolean
  cabin: CabinClass
  isDemo: true
}

export interface ContactDetails {
  fullName: string
  email: string
  countryCode: string
  mobile: string
  whatsappSame: boolean
  whatsapp: string
  address: string
  city: string
  country: string
}

export interface PassengerDraft {
  id: string
  type: PassengerType
  fullName: string
  dob: string
  gender: Gender | ''
  nationality: string
  documentType: DocumentType
  documentNumber: string
  documentExpiry: string
}

export type UploadStatus = 'uploading' | 'ready' | 'error'

export interface UploadedDocument {
  id: string
  name: string
  size: number
  mime: string
  progress: number
  status: UploadStatus
  previewUrl?: string
  error?: string
}

export type DocumentSlots = Partial<Record<DocumentType, UploadedDocument[]>>

export interface AdditionalInfo {
  specialRequests: string
  preferredTime: string
  travelPurpose: string
  notes: string
}

export interface CommunicationConsent {
  email: boolean
  whatsapp: boolean
}

export interface BookingDraft {
  contact: ContactDetails
  passengers: PassengerDraft[]
  documents: Record<string, DocumentSlots>
  additional: AdditionalInfo
  consent: CommunicationConsent
}

export interface BookingSubmission {
  reference: string
  search: FlightSearch
  flight: MockFlight | null
  contactName: string
  email: string
  whatsapp: string
  passengerCount: number
  submittedAt: string
}
