import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpDown,
  CalendarDays,
  Info,
  MapPin,
  PlaneTakeoff,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import type { CabinClass, FlightSearch } from '../types'
import { FlightSearchForm } from '../components/flight-search/FlightSearchForm'
import { FlightCard } from '../components/flight-results/FlightCard'
import {
  EMPTY_FILTERS,
  ResultsFilters,
  filterFlights,
  type ResultFilters,
} from '../components/flight-results/ResultsFilters'
import { SearchSummary } from '../components/flight-results/SearchSummary'
import { ScrollToContent } from '../components/shared/ScrollToContent'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { generateDemoFlights } from '../lib/data/mockFlights'
import { CABIN_LABELS } from '../lib/data/airlines'
import { formatDate } from '../lib/utils/date'
import { buildSearchParams, createDefaultSearch, parseSearchFromParams } from '../lib/utils/search'

type SortKey = 'recommended' | 'price' | 'duration' | 'departure' | 'arrival'

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price', label: 'Lowest demo fare' },
  { value: 'duration', label: 'Shortest duration' },
  { value: 'departure', label: 'Earliest departure' },
  { value: 'arrival', label: 'Earliest arrival' },
]

const sortFlights = (flights: ReturnType<typeof generateDemoFlights>, sort: SortKey) => {
  const copy = [...flights]
  switch (sort) {
    case 'price':
      return copy.sort((a, b) => a.priceNPR - b.priceNPR)
    case 'duration':
      return copy.sort((a, b) => a.durationMinutes - b.durationMinutes)
    case 'departure':
      return copy.sort((a, b) => a.departureMinutes - b.departureMinutes)
    case 'arrival':
      return copy.sort((a, b) => a.arrivalMinutes - b.arrivalMinutes)
    default:
      return copy.sort((a, b) => a.stops - b.stops || a.priceNPR - b.priceNPR)
  }
}

export function FlightsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchKey = searchParams.toString()
  const search = useMemo(() => parseSearchFromParams(new URLSearchParams(searchKey)), [searchKey])
  const [filters, setFilters] = useState<ResultFilters>(EMPTY_FILTERS)
  const [sort, setSort] = useState<SortKey>('recommended')
  const [editing, setEditing] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  useLockBodyScroll(filtersOpen)

  useEffect(() => {
    setFilters(EMPTY_FILTERS)
    setSort('recommended')
    setEditing(false)
    setFiltersOpen(false)
  }, [searchKey])

  const flights = useMemo(() => (search ? generateDemoFlights(search) : []), [search])
  const filtered = useMemo(() => sortFlights(filterFlights(flights, filters), sort), [flights, filters, sort])

  const handleSearch = (next: FlightSearch) => {
    setEditing(false)
    setSearchParams(buildSearchParams(next))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCabinChange = (cabin: CabinClass) => {
    if (!search || search.cabin === cabin) return
    setSearchParams(buildSearchParams({ ...search, cabin }))
  }

  if (!search) {
    const fallback = createDefaultSearch()
    return (
      <div className="results-page results-page--empty">
        <header className="results-hero results-hero--empty">
          <div className="container">
            <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Flight search</p>
            <h1>LET’S FIND<br /><span>YOUR FLIGHT.</span></h1>
            <p>Choose a route and dates to see clearly labelled demonstration options. Nothing is live yet.</p>
          </div>
        </header>
        <div className="container results-empty-search">
          <FlightSearchForm initialSearch={fallback} submitLabel="Search flights" />
          <div className="results-empty-search__note">
            <Info size={18} />
            <div>
              <strong>Why is there no result yet?</strong>
              <p>
                This page needs a route and date. Search above, or browse the popular routes for a
                quick starting point. We never show invented “live” availability.
              </p>
            </div>
            <Link to="/popular-routes" className="text-link">Popular routes <ArrowRight size={15} /></Link>
          </div>
        </div>
      </div>
    )
  }

  const first = search.segments[0]
  const travellers = search.adults + search.children + search.infants
  const isMulti = search.tripType === 'multicity'
  const query = buildSearchParams(search)

  return (
    <div className="results-page">
      <header className="results-hero">
        <div className="results-hero__grid" aria-hidden="true" />
        <img src="/images/hero-aircraft.png" alt="" aria-hidden="true" className="results-hero__plane" loading="lazy" />
        <div className="container results-hero__inner">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__dot" /> Flight results · demo data
          </p>
          <h1>
            {first.from.city.toUpperCase()}
            <span className="results-hero__arrow"><PlaneTakeoff size={30} /></span>
            {isMulti ? `${search.segments.length} LEGS` : first.to.city.toUpperCase()}
          </h1>
          <div className="results-hero__meta">
            <span><CalendarDays size={15} /> {formatDate(first.date, true)}{search.returnDate ? ` → ${formatDate(search.returnDate)}` : ''}</span>
            <span><MapPin size={15} /> {travellers} traveller{travellers > 1 ? 's' : ''} · {CABIN_LABELS[search.cabin]}</span>
          </div>
          <ScrollToContent targetId="results-content" label="Scroll to results" />
        </div>
      </header>

      <div className="data-notice">
        <div className="container data-notice__inner">
          <Info size={17} />
          <p>
            <strong>Demonstration data.</strong> Carriers, schedules and fares below are fictional
            illustrations generated in the browser. They are not real availability and cannot be booked online.
          </p>
          <span className="data-notice__badge">NO LIVE API</span>
        </div>
      </div>

      <section className="results-content" id="results-content">
        <div className="container">
          <SearchSummary search={search} onEdit={() => setEditing((current) => !current)} />

          {editing && (
            <div className="results-edit">
              <div className="results-edit__head">
                <div>
                  <span className="micro-label">Modify search</span>
                  <h2>Change the route or dates</h2>
                </div>
                <button type="button" className="icon-button" onClick={() => setEditing(false)} aria-label="Close search editor">
                  <X size={18} />
                </button>
              </div>
              <FlightSearchForm
                key={searchKey}
                initialSearch={search}
                onSearch={handleSearch}
                variant="compact"
                submitLabel="Update search"
              />
            </div>
          )}

          {search.tripType === 'roundtrip' && (
            <div className="return-note">
              <CalendarDays size={17} />
              <p>
                <strong>Return leg noted.</strong> This demo generates outbound options only. Your
                return date ({search.returnDate ? formatDate(search.returnDate) : 'not set'}) is included
                in the booking request and discussed with the team.
              </p>
            </div>
          )}

          {isMulti ? (
            <div className="multicity-desk">
              <div className="multicity-desk__head">
                <span className="multicity-desk__icon"><Sparkles size={22} /></span>
                <div>
                  <span className="micro-label">Multi-city desk</span>
                  <h2>This itinerary deserves a human.</h2>
                  <p>
                    Multi-city pricing and routing are reviewed manually. Send the legs below and a
                    FlightsFuzz team member can assemble the request with you.
                  </p>
                </div>
              </div>
              <ol className="multicity-desk__legs">
                {search.segments.map((segment, index) => (
                  <li key={`${segment.from.code}-${segment.to.code}-${segment.date}`}>
                    <span>LEG {String(index + 1).padStart(2, '0')}</span>
                    <strong>{segment.from.code} → {segment.to.code}</strong>
                    <span>{segment.from.city} → {segment.to.city}</span>
                    <span>{formatDate(segment.date)}</span>
                  </li>
                ))}
              </ol>
              <div className="multicity-desk__actions">
                <Link to={`/booking-request?${query.toString()}`} className="btn btn--primary">
                  Request this multi-city itinerary <ArrowRight size={17} />
                </Link>
                <button type="button" className="btn btn--outline" onClick={() => setEditing(true)}>
                  Edit the legs
                </button>
              </div>
              <p className="multicity-desk__note">
                Demonstration only. No multi-city fare or live connection is being shown.
              </p>
            </div>
          ) : (
            <div className="results-layout">
              <div className="results-layout__filters">
                <ResultsFilters
                  flights={flights}
                  filters={filters}
                  onChange={setFilters}
                  cabin={search.cabin}
                  onCabinChange={handleCabinChange}
                  onClear={() => setFilters(EMPTY_FILTERS)}
                />
              </div>

              <div className="results-layout__main">
                <div className="results-toolbar">
                  <div>
                    <span className="results-toolbar__count">{filtered.length} demo option{filtered.length === 1 ? '' : 's'}</span>
                    <span className="results-toolbar__sub">Illustrative fares · not bookable online</span>
                  </div>
                  <div className="results-toolbar__actions">
                    <button type="button" className="btn btn--outline btn--sm results-toolbar__filter" onClick={() => setFiltersOpen(true)}>
                      <SlidersHorizontal size={15} /> Filters
                    </button>
                    <label className="sort-control">
                      <ArrowUpDown size={15} />
                      <span className="sr-only">Sort flights</span>
                      <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
                        {SORT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="flight-list" aria-live="polite">
                  {filtered.map((flight) => (
                    <FlightCard key={`${sort}-${flight.id}`} flight={flight} search={search} />
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="empty-state">
                    <span className="empty-state__icon"><SlidersHorizontal size={24} /></span>
                    <h2>No demo flights match these filters.</h2>
                    <p>
                      Try clearing a filter or widening the time range. You can also send a request
                      without selecting a flight and let the team find options.
                    </p>
                    <div className="empty-state__actions">
                      <button type="button" className="btn btn--primary" onClick={() => setFilters(EMPTY_FILTERS)}>
                        Clear filters
                      </button>
                      <Link to={`/booking-request?${query.toString()}`} className="btn btn--outline">
                        Request assistance
                      </Link>
                    </div>
                  </div>
                )}

                <div className="results-footnote">
                  <Info size={16} />
                  <p>
                    Fares are illustrative totals for the selected travellers and cabin. Real fares,
                    baggage rules and schedules must be confirmed by the FlightsFuzz team before payment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {filtersOpen && (
        <div className="filter-drawer" role="dialog" aria-modal="true" aria-label="Filter flight results">
          <button type="button" className="filter-drawer__overlay" onClick={() => setFiltersOpen(false)} aria-label="Close filters" />
          <div className="filter-drawer__panel">
            <div className="filter-drawer__head">
              <h2>Filter results</h2>
              <button type="button" className="icon-button" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            <div className="filter-drawer__scroll">
              <ResultsFilters
                flights={flights}
                filters={filters}
                onChange={setFilters}
                cabin={search.cabin}
                onCabinChange={handleCabinChange}
                onClear={() => setFilters(EMPTY_FILTERS)}
              />
            </div>
            <div className="filter-drawer__foot">
              <button type="button" className="btn btn--primary btn--block" onClick={() => setFiltersOpen(false)}>
                Show {filtered.length} option{filtered.length === 1 ? '' : 's'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
