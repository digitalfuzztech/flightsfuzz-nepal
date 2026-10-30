import type { Airport } from '../../types'

/**
 * DEMO REFERENCE DATA.
 * Airport names and IATA codes are real-world reference points, but this list
 * is intentionally partial and is not connected to a live airline inventory.
 */
export const AIRPORTS: Airport[] = [
  { code: 'KTM', city: 'Kathmandu', country: 'Nepal', name: 'Tribhuvan International Airport', region: 'Nepal', popular: true },
  { code: 'PKR', city: 'Pokhara', country: 'Nepal', name: 'Pokhara International Airport', region: 'Nepal' },
  { code: 'BIR', city: 'Biratnagar', country: 'Nepal', name: 'Biratnagar Airport', region: 'Nepal' },
  { code: 'KEP', city: 'Nepalgunj', country: 'Nepal', name: 'Nepalgunj Airport', region: 'Nepal' },
  { code: 'LUA', city: 'Lukla', country: 'Nepal', name: 'Tenzing-Hillary Airport', region: 'Nepal' },
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates', name: 'Dubai International Airport', region: 'Middle East', popular: true },
  { code: 'AUH', city: 'Abu Dhabi', country: 'United Arab Emirates', name: 'Zayed International Airport', region: 'Middle East' },
  { code: 'DOH', city: 'Doha', country: 'Qatar', name: 'Hamad International Airport', region: 'Middle East', popular: true },
  { code: 'RUH', city: 'Riyadh', country: 'Saudi Arabia', name: 'King Khalid International Airport', region: 'Middle East' },
  { code: 'JED', city: 'Jeddah', country: 'Saudi Arabia', name: 'King Abdulaziz International Airport', region: 'Middle East' },
  { code: 'KWI', city: 'Kuwait City', country: 'Kuwait', name: 'Kuwait International Airport', region: 'Middle East' },
  { code: 'MCT', city: 'Muscat', country: 'Oman', name: 'Muscat International Airport', region: 'Middle East' },
  { code: 'BAH', city: 'Manama', country: 'Bahrain', name: 'Bahrain International Airport', region: 'Middle East' },
  { code: 'DEL', city: 'Delhi', country: 'India', name: 'Indira Gandhi International Airport', region: 'South Asia', popular: true },
  { code: 'BOM', city: 'Mumbai', country: 'India', name: 'Chhatrapati Shivaji Maharaj International Airport', region: 'South Asia' },
  { code: 'BLR', city: 'Bengaluru', country: 'India', name: 'Kempegowda International Airport', region: 'South Asia' },
  { code: 'MAA', city: 'Chennai', country: 'India', name: 'Chennai International Airport', region: 'South Asia' },
  { code: 'CCU', city: 'Kolkata', country: 'India', name: 'Netaji Subhas Chandra Bose International Airport', region: 'South Asia' },
  { code: 'VNS', city: 'Varanasi', country: 'India', name: 'Lal Bahadur Shastri International Airport', region: 'South Asia' },
  { code: 'DAC', city: 'Dhaka', country: 'Bangladesh', name: 'Hazrat Shahjalal International Airport', region: 'South Asia' },
  { code: 'CMB', city: 'Colombo', country: 'Sri Lanka', name: 'Bandaranaike International Airport', region: 'South Asia' },
  { code: 'ISB', city: 'Islamabad', country: 'Pakistan', name: 'Islamabad International Airport', region: 'South Asia' },
  { code: 'LHE', city: 'Lahore', country: 'Pakistan', name: 'Allama Iqbal International Airport', region: 'South Asia' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', name: 'Suvarnabhumi Airport', region: 'Southeast Asia', popular: true },
  { code: 'DMK', city: 'Bangkok', country: 'Thailand', name: 'Don Mueang International Airport', region: 'Southeast Asia' },
  { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia', name: 'Kuala Lumpur International Airport', region: 'Southeast Asia', popular: true },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Changi Airport', region: 'Southeast Asia' },
  { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong SAR', name: 'Hong Kong International Airport', region: 'East Asia' },
  { code: 'NRT', city: 'Tokyo', country: 'Japan', name: 'Narita International Airport', region: 'East Asia', popular: true },
  { code: 'HND', city: 'Tokyo', country: 'Japan', name: 'Haneda Airport', region: 'East Asia' },
  { code: 'ICN', city: 'Seoul', country: 'South Korea', name: 'Incheon International Airport', region: 'East Asia' },
  { code: 'PVG', city: 'Shanghai', country: 'China', name: 'Shanghai Pudong International Airport', region: 'East Asia' },
  { code: 'PEK', city: 'Beijing', country: 'China', name: 'Beijing Capital International Airport', region: 'East Asia' },
  { code: 'CAN', city: 'Guangzhou', country: 'China', name: 'Guangzhou Baiyun International Airport', region: 'East Asia' },
  { code: 'LHR', city: 'London', country: 'United Kingdom', name: 'Heathrow Airport', region: 'Europe', popular: true },
  { code: 'LGW', city: 'London', country: 'United Kingdom', name: 'Gatwick Airport', region: 'Europe' },
  { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle Airport', region: 'Europe' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany', name: 'Frankfurt Airport', region: 'Europe' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', name: 'Amsterdam Airport Schiphol', region: 'Europe' },
  { code: 'IST', city: 'Istanbul', country: 'Türkiye', name: 'Istanbul Airport', region: 'Europe' },
  { code: 'SYD', city: 'Sydney', country: 'Australia', name: 'Sydney Kingsford Smith Airport', region: 'Oceania', popular: true },
  { code: 'MEL', city: 'Melbourne', country: 'Australia', name: 'Melbourne Airport', region: 'Oceania' },
  { code: 'BNE', city: 'Brisbane', country: 'Australia', name: 'Brisbane Airport', region: 'Oceania' },
  { code: 'PER', city: 'Perth', country: 'Australia', name: 'Perth Airport', region: 'Oceania' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', name: 'Toronto Pearson International Airport', region: 'North America' },
  { code: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy International Airport', region: 'North America' },
]

export const findAirport = (code: string): Airport | undefined =>
  AIRPORTS.find((airport) => airport.code === code)

export const POPULAR_ORIGINS = AIRPORTS.filter((airport) => airport.code === 'KTM' || airport.country === 'Nepal')
export const POPULAR_DESTINATIONS = AIRPORTS.filter((airport) => airport.popular && airport.code !== 'KTM')

export const searchAirports = (query: string): Airport[] => {
  const term = query.trim().toLowerCase()
  if (!term) return AIRPORTS.filter((airport) => airport.popular).slice(0, 8)
  return AIRPORTS.filter((airport) => {
    const haystack = `${airport.city} ${airport.code} ${airport.country} ${airport.name}`.toLowerCase()
    return haystack.includes(term)
  }).slice(0, 12)
}
