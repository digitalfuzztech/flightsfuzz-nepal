import type { BookingDraft, FlightSearch, MockFlight, UploadedDocument } from '../../types'

/**
 * INTEGRATION BOUNDARY — BOOKING REQUEST API
 * ------------------------------------------
 * The function below is a frontend-only demonstration. It does NOT send data
 * anywhere. When the backend exists, replace the simulated delay with:
 *
 *   POST /api/booking-requests
 *   Content-Type: application/json
 *
 * The real endpoint must validate and sanitise every field, store the lead
 * securely, and return a server-generated reference. Documents must be sent
 * separately to secure object storage (never bundled into this JSON payload).
 */
export interface BookingRequestPayload {
  search: FlightSearch
  selectedFlightId: string | null
  contact: BookingDraft['contact']
  passengers: BookingDraft['passengers']
  additional: BookingDraft['additional']
  consent: BookingDraft['consent']
  documentManifest: Array<{
    passengerId: string
    documentType: string
    fileName: string
    mime: string
    size: number
  }>
}

export interface BookingRequestResult {
  reference: string
  submittedAt: string
  mode: 'frontend-demo'
}

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

const createReference = (): string => {
  const bytes = new Uint8Array(3)
  crypto.getRandomValues(bytes)
  const suffix = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase()
  return `FF-${suffix}`
}

export const submitBookingRequest = async (
  payload: BookingRequestPayload,
): Promise<BookingRequestResult> => {
  // Intentionally no fetch() call. The demonstration validates in the browser only.
  await wait(1500)
  // Keep sensitive payloads out of logs and storage.
  void payload
  return {
    reference: createReference(),
    submittedAt: new Date().toISOString(),
    mode: 'frontend-demo',
  }
}

export const documentManifestFrom = (
  documents: BookingDraft['documents'],
): BookingRequestPayload['documentManifest'] =>
  Object.entries(documents).flatMap(([passengerId, slots]) =>
    Object.entries(slots).flatMap(([documentType, files]) =>
      (files ?? []).map((file: UploadedDocument) => ({
        passengerId,
        documentType,
        fileName: file.name,
        mime: file.mime,
        size: file.size,
      })),
    ),
  )

export const BOOKING_API_STATUS = {
  connected: false,
  label: 'Frontend demonstration',
  detail: 'No request, email, WhatsApp message or document has been transmitted.',
} as const

export const planSelectedFlight = (flight: MockFlight | null): string | null => flight?.id ?? null
