import type { FlightSearch } from '../../types'
import { isPastDate } from '../utils/date'

export type SearchErrors = Record<string, string>

export const validateSearch = (search: FlightSearch): SearchErrors => {
  const errors: SearchErrors = {}

  search.segments.forEach((segment, index) => {
    const prefix = search.tripType === 'multicity' ? `segment-${index}` : 'route'
    if (!segment.from) errors[`${prefix}-from`] = 'Choose a departure airport.'
    if (!segment.to) errors[`${prefix}-to`] = 'Choose a destination airport.'
    if (segment.from && segment.to && segment.from.code === segment.to.code) {
      errors[`${prefix}-to`] = 'Origin and destination must be different.'
    }
    if (!segment.date) errors[`${prefix}-date`] = 'Select a departure date.'
    else if (isPastDate(segment.date)) errors[`${prefix}-date`] = 'Departure cannot be in the past.'
  })

  if (search.tripType === 'roundtrip') {
    if (!search.returnDate) errors['return'] = 'Select a return date.'
    else if (isPastDate(search.returnDate)) errors['return'] = 'Return cannot be in the past.'
    else if (search.segments[0]?.date && search.returnDate <= search.segments[0].date) {
      errors['return'] = 'Return must be after departure.'
    }
  }

  if (search.tripType === 'multicity') {
    if (search.segments.length < 2) errors['segments'] = 'Add at least two flight legs.'
    if (search.segments.some((segment, index) => index > 0 && segment.date < search.segments[index - 1].date)) {
      errors['segments'] = 'Keep the legs in date order.'
    }
  }

  if (search.infants > search.adults) {
    errors['passengers'] = 'Each infant must travel with an adult.'
  }

  const total = search.adults + search.children + search.infants
  if (total > 9) errors['passengers'] = 'For groups larger than 9, please contact our team.'

  return errors
}
