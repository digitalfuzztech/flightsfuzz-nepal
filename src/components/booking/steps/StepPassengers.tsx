import { Plus, Trash2, UserRound } from 'lucide-react'
import type { Gender, PassengerDraft, PassengerType } from '../../../types'
import { DOCUMENT_LABELS, NATIONALITIES } from '../../../lib/data/reference'
import { todayISO } from '../../../lib/utils/date'
import { SelectField, TextField } from '../../forms/FormField'

interface StepPassengersProps {
  passengers: PassengerDraft[]
  errors: Record<string, string>
  onChange: (id: string, patch: Partial<PassengerDraft>) => void
  onAdd: () => void
  onRemove: (id: string) => void
}

const TYPE_OPTIONS: Array<{ value: PassengerType; label: string }> = [
  { value: 'adult', label: 'Adult · 12+' },
  { value: 'child', label: 'Child · 2–11' },
  { value: 'infant', label: 'Infant · under 2' },
]

const GENDER_OPTIONS: Array<{ value: Gender; label: string }> = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

export function StepPassengers({ passengers, errors, onChange, onAdd, onRemove }: StepPassengersProps) {
  return (
    <div className="booking-step">
      <div className="step-action-row">
        <p className="step-intro">
          Enter every traveller exactly as their name appears on the travel document. You can add
          up to nine passengers here.
        </p>
        <button type="button" className="btn btn--outline btn--sm" onClick={onAdd} disabled={passengers.length >= 9}>
          <Plus size={15} /> Add passenger
        </button>
      </div>

      {errors['passengers'] && <p className="form-level-error">{errors['passengers']}</p>}

      <div className="passenger-list">
        {passengers.map((passenger, index) => {
          const field = (name: string) => errors[`${passenger.id}.${name}`]
          return (
            <section className="passenger-card" key={passenger.id} aria-labelledby={`passenger-${passenger.id}-title`}>
              <div className="passenger-card__head">
                <span className="passenger-card__index">{String(index + 1).padStart(2, '0')}</span>
                <div className="passenger-card__identity">
                  <h3 id={`passenger-${passenger.id}-title`}>
                    <UserRound size={15} /> {passenger.fullName || `Passenger ${index + 1}`}
                  </h3>
                  <span>Travel document name required</span>
                </div>
                <label className="passenger-card__type">
                  <span className="sr-only">Passenger type</span>
                  <select
                    value={passenger.type}
                    onChange={(event) => onChange(passenger.id, { type: event.target.value as PassengerType })}
                  >
                    {TYPE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </label>
                <button
                  type="button"
                  className="passenger-card__remove"
                  onClick={() => onRemove(passenger.id)}
                  disabled={passengers.length === 1}
                  aria-label={`Remove passenger ${index + 1}`}
                  title={passengers.length === 1 ? 'At least one passenger is required' : 'Remove passenger'}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="form-grid form-grid--two">
                <TextField
                  id={`pax-${passenger.id}-name`}
                  label="Full name as on document"
                  value={passenger.fullName}
                  onChange={(event) => onChange(passenger.id, { fullName: event.target.value })}
                  error={field('fullName')}
                  placeholder="Given name and surname"
                  autoComplete="off"
                  required
                  className="form-grid__full"
                />
                <TextField
                  id={`pax-${passenger.id}-dob`}
                  label="Date of birth"
                  type="date"
                  value={passenger.dob}
                  onChange={(event) => onChange(passenger.id, { dob: event.target.value })}
                  error={field('dob')}
                  max={todayISO()}
                  required
                />
                <SelectField
                  id={`pax-${passenger.id}-gender`}
                  label="Gender"
                  value={passenger.gender}
                  onChange={(event) => onChange(passenger.id, { gender: event.target.value as Gender })}
                  error={field('gender')}
                  options={GENDER_OPTIONS}
                  placeholder="Select gender"
                  required
                />
                <SelectField
                  id={`pax-${passenger.id}-nationality`}
                  label="Nationality"
                  value={passenger.nationality}
                  onChange={(event) => onChange(passenger.id, { nationality: event.target.value })}
                  error={field('nationality')}
                  options={NATIONALITIES.map((item) => ({ value: item, label: item }))}
                  placeholder="Select nationality"
                  required
                />
                <SelectField
                  id={`pax-${passenger.id}-doc-type`}
                  label="Document type"
                  value={passenger.documentType}
                  onChange={(event) => onChange(passenger.id, { documentType: event.target.value as PassengerDraft['documentType'] })}
                  options={(Object.keys(DOCUMENT_LABELS) as Array<keyof typeof DOCUMENT_LABELS>).map((key) => ({
                    value: key,
                    label: DOCUMENT_LABELS[key],
                  }))}
                />
                <TextField
                  id={`pax-${passenger.id}-doc-number`}
                  label={passenger.documentType === 'passport' ? 'Passport number' : `${DOCUMENT_LABELS[passenger.documentType]} number`}
                  value={passenger.documentNumber}
                  onChange={(event) => onChange(passenger.id, { documentNumber: event.target.value.toUpperCase() })}
                  error={field('documentNumber')}
                  placeholder="Document number"
                  autoComplete="off"
                  required
                />
                {passenger.documentType === 'passport' && (
                  <TextField
                    id={`pax-${passenger.id}-doc-expiry`}
                    label="Passport expiry date"
                    type="date"
                    value={passenger.documentExpiry}
                    onChange={(event) => onChange(passenger.id, { documentExpiry: event.target.value })}
                    error={field('documentExpiry')}
                    min={todayISO()}
                    required
                  />
                )}
              </div>

              {passenger.type === 'infant' && (
                <p className="passenger-card__hint">Infants must be accompanied by an adult on the same request.</p>
              )}
              {field('dob') && <span className="sr-only">{field('dob')}</span>}
            </section>
          )
        })}
      </div>

      {passengers.length < 9 && (
        <button type="button" className="add-passenger" onClick={onAdd}>
          <Plus size={17} />
          <span>
            <strong>Add another passenger</strong>
            <small>Adults, children and infants are all supported.</small>
          </span>
        </button>
      )}
    </div>
  )
}
