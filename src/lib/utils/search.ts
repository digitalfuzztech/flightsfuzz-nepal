import type { FlightSearch, TripType } from '../../types'
import { findAirport } from '../data/airports'
import { addDaysISO, isPastDate, todayISO } from './date'

export const buildSearchParams = (search: FlightSearch): URLSearchParams => {
  const params = new URLSearchParams()
  params.set('trip', search.tripType)
  const first = search.segments[0]
  if (first) {
    params.set('from', first.from.code)
    params.set('to', first.to.code)
    params.set('depart', first.date)
  }
  if (search.tripType === 'roundtrip' && search.returnDate) {
    params.set('return', search.returnDate)
  }
  if (search.tripType === 'multicity') {
    params.set(
      'segments',
      search.segments.map((segment) => `${segment.from.code},${segment.to.code},${segment.date}`).join('|'),
    )
  }
  params.set('adults', String(search.adults))
  params.set('children', String(search.children))
  params.set('infants', String(search.infants))
  params.set('cabin', search.cabin)
  return params
}

export const buildSearchUrl = (search: FlightSearch): string => `/flights?${buildSearchParams(search).toString()}`

const toInt = (value: string | null, fallback: number): number => {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const parseSearchFromParams = (params: URLSearchParams): FlightSearch | null => {
  const trip = (params.get('trip') ?? 'oneway') as TripType
  if (!['oneway', 'roundtrip', 'multicity'].includes(trip)) return null

  const adults = Math.min(9, Math.max(1, toInt(params.get('adults'), 1)))
  const children = Math.min(8, Math.max(0, toInt(params.get('children'), 0)))
  const infants = Math.min(adults, Math.max(0, toInt(params.get('infants'), 0)))
  const cabinParam = params.get('cabin') ?? 'economy'
  const cabin = ['economy', 'premium-economy', 'business', 'first'].includes(cabinParam)
    ? (cabinParam as FlightSearch['cabin'])
    : 'economy'

  let segments: FlightSearch['segments'] = []
  if (trip === 'multicity') {
    const raw = params.get('segments') ?? ''
    segments = raw
      .split('|')
      .map((chunk) => {
        const [fromCode, toCode, date] = chunk.split(',')
        const from = findAirport(fromCode)
        const to = findAirport(toCode)
        if (!from || !to || !date || from.code === to.code) return null
        return { from, to, date }
      })
      .filter((segment): segment is FlightSearch['segments'][number] => segment !== null)
  } else {
    const from = findAirport(params.get('from') ?? '')
    const to = findAirport(params.get('to') ?? '')
    const date = params.get('depart') ?? ''
    if (from && to && from.code !== to.code && date) {
      segments = [{ from, to, date }]
    }
  }

  if (!segments.length) return null
  if (segments.some((segment) => isPastDate(segment.date))) return null

  const returnDate = params.get('return') ?? undefined
  if (trip === 'roundtrip' && (!returnDate || isPastDate(returnDate))) return null

  return { tripType: trip, segments, returnDate, adults, children, infants, cabin }
}

export const createDefaultSearch = (): FlightSearch => {
  const from = findAirport('KTM')
  const to = findAirport('DXB')
  if (!from || !to) throw new Error('Demo airports are unavailable')
  const depart = addDaysISO(todayISO(), 21)
  return {
    tripType: 'roundtrip',
    segments: [{ from, to, date: depart }],
    returnDate: addDaysISO(depart, 7),
    adults: 1,
    children: 0,
    infants: 0,
    cabin: 'economy',
  }
}

export const createRouteSearch = (toCode: string): FlightSearch => {
  const search = createDefaultSearch()
  const to = findAirport(toCode)
  if (to) {
    search.tripType = 'oneway'
    search.segments = [{ from: search.segments[0].from, to, date: search.segments[0].date }]
    search.returnDate = undefined
  }
  return search
}
