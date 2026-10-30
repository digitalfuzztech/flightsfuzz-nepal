import type { FlightSearch, MockFlight } from '../../types'
import { generateDemoFlights } from '../data/mockFlights'

/**
 * INTEGRATION BOUNDARY — FLIGHT AVAILABILITY API
 * ----------------------------------------------
 * There is no live flight-data provider in this phase. The results screen is
 * powered by deterministic demonstration records only.
 *
 * When integrating, replace searchFlights with a call to your backend (which
 * should own the provider credentials) and map the response into MockFlight or
 * a shared Flight type. Never call a provider with secret keys from the browser.
 */
export const FLIGHT_API_STATUS = {
  connected: false,
  label: 'Demonstration data',
  detail: 'Fictional carriers, schedules and illustrative fares only.',
} as const

export const searchFlights = async (search: FlightSearch): Promise<MockFlight[]> => {
  return generateDemoFlights(search)
}
