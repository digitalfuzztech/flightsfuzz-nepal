import type { Airport, CabinClass, FlightSearch, MockFlight } from '../../types'
import { CABIN_MULTIPLIERS, DEMO_AIRLINES } from '../data/airlines'

/**
 * DEMO FLIGHT GENERATOR — NOT A FLIGHT API.
 * Every record produced here is fictional. Replace this module with a real
 * availability search once a flight-data provider is connected.
 */

const REGION_BASE_FARE: Record<string, number> = {
  'Nepal': 8500,
  'South Asia': 24000,
  'Middle East': 58000,
  'Southeast Asia': 62000,
  'East Asia': 76000,
  'Europe': 112000,
  'Oceania': 128000,
  'North America': 148000,
}

const REGION_DURATION: Record<string, number> = {
  'Nepal': 55,
  'South Asia': 155,
  'Middle East': 320,
  'Southeast Asia': 390,
  'East Asia': 470,
  'Europe': 660,
  'Oceania': 760,
  'North America': 880,
}

const STOP_AIRPORTS = ['DXB', 'DOH', 'DEL', 'BKK', 'SIN', 'IST', 'KUL', 'HKG']

const hashString = (value: string): number => {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const mulberry32 = (seed: number) => {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

const pickStops = (random: () => number, from: Airport, to: Airport): { stops: number; codes: string[] } => {
  const roll = random()
  const stops = roll < 0.48 ? 0 : roll < 0.87 ? 1 : 2
  const options = STOP_AIRPORTS.filter((code) => code !== from.code && code !== to.code)
  const codes: string[] = []
  while (codes.length < stops) {
    const candidate = options[Math.floor(random() * options.length)]
    if (!codes.includes(candidate)) codes.push(candidate)
  }
  return { stops, codes }
}

export const generateDemoFlights = (search: FlightSearch): MockFlight[] => {
  const segment = search.segments[0]
  if (!segment || segment.from.code === segment.to.code) return []

  const seed = hashString(
    `${segment.from.code}|${segment.to.code}|${segment.date}|${search.cabin}|${search.adults}|${search.children}|${search.infants}`,
  )
  const random = mulberry32(seed)
  const region = segment.to.region
  const base = REGION_BASE_FARE[region] ?? 60000
  const baseDuration = REGION_DURATION[region] ?? 300
  const cabinMultiplier = CABIN_MULTIPLIERS[search.cabin] ?? 1
  const passengers = search.adults + search.children + search.infants

  const flights: MockFlight[] = DEMO_AIRLINES.flatMap((airline, airlineIndex) => {
    const departures = [2, 2, 2]
    return departures.map((_, variant) => {
      const { stops, codes } = pickStops(random, segment.from, segment.to)
      const departureMinutes = Math.floor(random() * 23.5 * 60)
      const layover = stops * (75 + Math.floor(random() * 155))
      const durationMinutes = Math.round(
        (baseDuration + (stops === 0 ? 0 : 90) + (random() * 70 - 35)) * (search.cabin === 'economy' ? 1 : 1.02),
      )
      const pricePerPassenger = Math.round(
        ((base + random() * base * 0.42) * cabinMultiplier * (1 - stops * 0.045)) / 50,
      ) * 50
      return {
        id: `${airline.code}-${segment.from.code}${segment.to.code}-${segment.date}-${airlineIndex}-${variant}-${search.cabin}`,
        airline,
        from: segment.from,
        to: segment.to,
        date: segment.date,
        departureMinutes,
        arrivalMinutes: departureMinutes + durationMinutes + layover,
        durationMinutes: durationMinutes + layover,
        stops,
        stopCodes: codes,
        aircraft: stops === 0 ? 'Airbus A320neo' : 'Boeing 737-800',
        priceNPR: pricePerPassenger * Math.max(passengers, 1),
        baggage: {
          cabin: search.cabin === 'economy' ? '7 kg' : '2 × 8 kg',
          checked: search.cabin === 'economy' ? '20 kg' : '2 × 23 kg',
        },
        refundable: random() > 0.55,
        cabin: search.cabin as CabinClass,
        isDemo: true,
      }
    })
  })

  return flights.sort((a, b) => a.departureMinutes - b.departureMinutes)
}

export const findDemoFlight = (search: FlightSearch, flightId: string): MockFlight | null =>
  generateDemoFlights(search).find((flight) => flight.id === flightId) ?? null

export const demoFlightCount = (search: FlightSearch): number => generateDemoFlights(search).length
