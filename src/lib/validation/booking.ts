import type { ContactDetails, PassengerDraft, CommunicationConsent } from '../../types'
import { ageInYears, isPastDate } from '../utils/date'

export type FormErrors = Record<string, string>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^[0-9][0-9\s-]{6,14}$/
const DOCUMENT_PATTERN = /^[A-Za-z0-9-]{4,24}$/

export const isValidEmail = (value: string): boolean => EMAIL_PATTERN.test(value.trim())
export const isValidPhone = (value: string): boolean => PHONE_PATTERN.test(value.trim())

export const validateContact = (contact: ContactDetails): FormErrors => {
  const errors: FormErrors = {}
  if (contact.fullName.trim().length < 3) errors['fullName'] = 'Enter your full name (at least 3 characters).'
  if (!isValidEmail(contact.email)) errors['email'] = 'Enter a valid email address.'
  if (!/^\+\d{1,4}$/.test(contact.countryCode)) errors['countryCode'] = 'Select a country code.'
  if (!isValidPhone(contact.mobile)) errors['mobile'] = 'Enter a valid mobile number (7–15 digits).'
  if (!contact.whatsappSame && !isValidPhone(contact.whatsapp)) {
    errors['whatsapp'] = 'Enter a valid WhatsApp number.'
  }
  if (contact.address.trim().length < 5) errors['address'] = 'Enter your current address.'
  if (contact.city.trim().length < 2) errors['city'] = 'Enter your city.'
  if (contact.country.trim().length < 2) errors['country'] = 'Enter your country.'
  return errors
}

export const validatePassengers = (passengers: PassengerDraft[]): FormErrors => {
  const errors: FormErrors = {}
  if (passengers.length === 0) {
    errors['passengers'] = 'Add at least one passenger.'
    return errors
  }
  if (!passengers.some((passenger) => passenger.type === 'adult')) {
    errors['passengers'] = 'At least one passenger must be an adult.'
  }

  passengers.forEach((passenger) => {
    const key = (field: string) => `${passenger.id}.${field}`
    if (passenger.fullName.trim().length < 3) {
      errors[key('fullName')] = 'Enter the full name exactly as on the travel document.'
    }
    if (!passenger.dob) {
      errors[key('dob')] = 'Select the date of birth.'
    } else {
      const age = ageInYears(passenger.dob)
      if (age === null || age < 0) {
        errors[key('dob')] = 'Enter a valid date of birth.'
      } else if (passenger.type === 'adult' && age < 12) {
        errors[key('dob')] = 'Adults must be 12 or older. Choose Child or Infant instead.'
      } else if (passenger.type === 'child' && (age < 2 || age >= 12)) {
        errors[key('dob')] = 'Children must be between 2 and 11 years old.'
      } else if (passenger.type === 'infant' && age >= 2) {
        errors[key('dob')] = 'Infants must be under 2 years old.'
      }
    }
    if (!passenger.gender) errors[key('gender')] = 'Select a gender option.'
    if (passenger.nationality.trim().length < 2) errors[key('nationality')] = 'Enter nationality.'
    if (!DOCUMENT_PATTERN.test(passenger.documentNumber.trim())) {
      errors[key('documentNumber')] = 'Enter a valid document number (4–24 letters or digits).'
    }
    if (passenger.documentType === 'passport') {
      if (!passenger.documentExpiry) {
        errors[key('documentExpiry')] = 'Select the passport expiry date.'
      } else if (isPastDate(passenger.documentExpiry)) {
        errors[key('documentExpiry')] = 'Passport expiry must be in the future.'
      }
    }
  })

  return errors
}

export const validateConsent = (consent: CommunicationConsent): FormErrors => {
  const errors: FormErrors = {}
  if (!consent.email) {
    errors['consentEmail'] = 'Email consent is required to submit this booking request.'
  }
  if (!consent.whatsapp) {
    errors['consentWhatsapp'] = 'WhatsApp consent is required to submit this booking request.'
  }
  return errors
}

export const hasErrors = (errors: FormErrors): boolean => Object.keys(errors).length > 0
