import { Check } from 'lucide-react'
import { cn } from '../../lib/utils/format'

export interface BookingStepItem {
  id: number
  label: string
  short: string
}

export const BOOKING_STEPS: BookingStepItem[] = [
  { id: 1, label: 'Review flight', short: 'Flight' },
  { id: 2, label: 'Contact details', short: 'Contact' },
  { id: 3, label: 'Passengers', short: 'Passengers' },
  { id: 4, label: 'Documents', short: 'Documents' },
  { id: 5, label: 'Additional info', short: 'Extra info' },
  { id: 6, label: 'Communication consent', short: 'Consent' },
  { id: 7, label: 'Review & submit', short: 'Submit' },
]

interface BookingStepperProps {
  current: number
  onGoTo: (step: number) => void
}

export function BookingStepper({ current, onGoTo }: BookingStepperProps) {
  const progress = ((current - 1) / (BOOKING_STEPS.length - 1)) * 100

  return (
    <nav className="booking-stepper" aria-label="Booking request steps">
      <div className="booking-stepper__head">
        <span className="micro-label">Request progress</span>
        <span>{String(current).padStart(2, '0')} / {String(BOOKING_STEPS.length).padStart(2, '0')}</span>
      </div>
      <div className="booking-stepper__bar" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <ol className="booking-stepper__list">
        {BOOKING_STEPS.map((step) => {
          const state = step.id < current ? 'complete' : step.id === current ? 'current' : 'upcoming'
          const canGo = step.id < current
          return (
            <li key={step.id} className={cn('booking-stepper__item', `is-${state}`)}>
              <button
                type="button"
                onClick={() => canGo && onGoTo(step.id)}
                disabled={!canGo}
                aria-current={state === 'current' ? 'step' : undefined}
              >
                <span className="booking-stepper__number">
                  {state === 'complete' ? <Check size={13} /> : String(step.id).padStart(2, '0')}
                </span>
                <span className="booking-stepper__label">{step.label}</span>
              </button>
            </li>
          )
        })}
      </ol>
      <p className="booking-stepper__note">
        Steps 1–3 are required. Documents are optional in this demo but will be needed before a real booking.
      </p>
    </nav>
  )
}
