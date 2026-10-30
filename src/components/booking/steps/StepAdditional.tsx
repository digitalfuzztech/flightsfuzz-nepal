import type { AdditionalInfo } from '../../../types'
import { TRAVEL_PURPOSES } from '../../../lib/data/reference'
import { SelectField, TextAreaField } from '../../forms/FormField'

interface StepAdditionalProps {
  additional: AdditionalInfo
  onChange: (patch: Partial<AdditionalInfo>) => void
}

export function StepAdditional({ additional, onChange }: StepAdditionalProps) {
  return (
    <div className="booking-step">
      <p className="step-intro">
        Optional context that helps the team shape your request. You can skip anything you are not
        sure about.
      </p>

      <div className="form-grid form-grid--two">
        <SelectField
          id="additional-time"
          label="Preferred departure time"
          value={additional.preferredTime}
          onChange={(event) => onChange({ preferredTime: event.target.value })}
          options={[
            { value: 'anytime', label: 'No preference' },
            { value: 'early-morning', label: 'Early morning (00:00 – 06:00)' },
            { value: 'morning', label: 'Morning (06:00 – 12:00)' },
            { value: 'afternoon', label: 'Afternoon (12:00 – 18:00)' },
            { value: 'evening', label: 'Evening (18:00 – 24:00)' },
          ]}
        />
        <SelectField
          id="additional-purpose"
          label="Travel purpose (optional)"
          value={additional.travelPurpose}
          onChange={(event) => onChange({ travelPurpose: event.target.value })}
          options={TRAVEL_PURPOSES.map((purpose) => ({ value: purpose, label: purpose }))}
          placeholder="Select a purpose"
        />
        <TextAreaField
          id="additional-special"
          label="Special requests"
          value={additional.specialRequests}
          onChange={(event) => onChange({ specialRequests: event.target.value })}
          placeholder="Meal preference, wheelchair assistance, extra baggage, seating needs…"
          hint="We will pass these requests to the team. They are not guaranteed until the airline confirms them."
          rows={4}
          className="form-grid__full"
        />
        <TextAreaField
          id="additional-notes"
          label="Anything else we should know?"
          value={additional.notes}
          onChange={(event) => onChange({ notes: event.target.value })}
          placeholder="Flexible dates, alternative airports, visa questions…"
          rows={4}
          className="form-grid__full"
        />
      </div>

      <div className="optional-note">
        All fields on this step are optional. They help a human advisor but do not affect whether
        the request can be submitted.
      </div>
    </div>
  )
}
