import { useEffect, useId, useRef, useState } from 'react'
import { MapPin, Search, X } from 'lucide-react'
import type { Airport } from '../../types'
import { searchAirports } from '../../lib/data/airports'
import { cn } from '../../lib/utils/format'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

interface AirportFieldProps {
  id: string
  label: string
  value: Airport | null
  onChange: (airport: Airport | null) => void
  placeholder?: string
  error?: string
  excludeCode?: string
  disabled?: boolean
}

const displayValue = (airport: Airport) => `${airport.city} (${airport.code})`

export function AirportField({
  id,
  label,
  value,
  onChange,
  placeholder = 'City or airport',
  error,
  excludeCode,
  disabled = false,
}: AirportFieldProps) {
  const [query, setQuery] = useState(value ? displayValue(value) : '')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  useOnClickOutside(wrapRef, () => setOpen(false), open)

  useEffect(() => {
    if (value) setQuery(displayValue(value))
  }, [value])

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const results = searchAirports(query).filter((airport) => airport.code !== excludeCode)
  const visibleResults = results.length ? results : searchAirports('')
  const showNoResults = query.trim().length > 0 && results.length === 0
  const activeOption = visibleResults[activeIndex]

  const selectAirport = (airport: Airport) => {
    onChange(airport)
    setQuery(displayValue(airport))
    setOpen(false)
    setActiveIndex(0)
  }

  const handleInput = (next: string) => {
    setQuery(next)
    setOpen(true)
    setActiveIndex(0)
    if (value && next !== displayValue(value)) onChange(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((current) => Math.min(current + 1, visibleResults.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => Math.max(current - 1, 0))
    } else if (event.key === 'Enter' && open && activeOption) {
      event.preventDefault()
      selectAirport(activeOption)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div
      ref={wrapRef}
      className={cn('search-field search-field--airport', error && 'has-error', open && 'is-open')}
    >
      <label htmlFor={id} className="search-field__label">{label}</label>
      <div className="search-field__control">
        <MapPin size={17} strokeWidth={1.8} className="search-field__icon" aria-hidden="true" />
        <input
          ref={inputRef}
          id={id}
          className="search-field__input"
          value={query}
          onChange={(event) => handleInput(event.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && activeOption ? `${listId}-${activeOption.code}` : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="off"
          disabled={disabled}
        />
        {query && !disabled ? (
          <button
            type="button"
            className="search-field__clear"
            aria-label={`Clear ${label.toLowerCase()}`}
            onClick={() => {
              setQuery('')
              onChange(null)
              inputRef.current?.focus()
            }}
          >
            <X size={14} />
          </button>
        ) : null}
        {value && (
          <span className="search-field__code" aria-hidden="true">{value.code}</span>
        )}
      </div>

      {open && (
        <div className="airport-popover" id={listId} role="listbox" aria-label={`${label} suggestions`}>
          <div className="airport-popover__head">
            <span>{query.trim() ? 'Matching airports' : 'Popular airports'}</span>
            <span className="airport-popover__hint">DEMO DATA</span>
          </div>
          {showNoResults ? (
            <div className="airport-popover__empty">
              <Search size={18} />
              <p>No airport matches “{query}”. Try a city or IATA code.</p>
            </div>
          ) : (
            <ul className="airport-popover__list">
              {visibleResults.map((airport, index) => (
                <li key={airport.code}>
                  <button
                    type="button"
                    id={`${listId}-${airport.code}`}
                    role="option"
                    aria-selected={value?.code === airport.code}
                    className={cn('airport-option', index === activeIndex && 'is-active')}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectAirport(airport)}
                  >
                    <span className="airport-option__code">{airport.code}</span>
                    <span className="airport-option__body">
                      <strong>{airport.city}</strong>
                      <span>{airport.name}</span>
                    </span>
                    <span className="airport-option__country">{airport.country}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="airport-popover__foot">Airport reference data only · no live schedules</p>
        </div>
      )}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
