import { Link } from 'react-router-dom'
import { Mail, MessageCircle, ShieldCheck } from 'lucide-react'
import type { CommunicationConsent } from '../../../types'

interface StepConsentProps {
  consent: CommunicationConsent
  errors: Record<string, string>
  onChange: (patch: Partial<CommunicationConsent>) => void
}

export function StepConsent({ consent, errors, onChange }: StepConsentProps) {
  return (
    <div className="booking-step">
      <div className="consent-intro">
        <ShieldCheck size={20} />
        <div>
          <strong>Two channels. Two separate choices.</strong>
          <p>
            FlightsFuzz needs permission to contact you about this request. Both consents are
            required for this initial workflow, but they remain separate records. Neither box is
            preselected.
          </p>
        </div>
      </div>

      <div className="consent-list">
        <label className={`consent-card ${errors['consentEmail'] ? 'has-error' : ''} ${consent.email ? 'is-checked' : ''}`}>
          <span className="consent-card__icon"><Mail size={20} /></span>
          <span className="consent-card__body">
            <span className="consent-card__channel">Email communication consent</span>
            <span className="consent-card__text">
              I agree to receive booking-related updates, quotations, confirmations, and other
              communication from FlightsFuzz through the email address provided.
            </span>
            <span className="consent-card__links">
              Read the <Link to="/privacy-policy" target="_blank">Privacy Policy</Link> and{' '}
              <Link to="/terms-and-conditions" target="_blank">Terms &amp; Conditions</Link>.
            </span>
          </span>
          <span className="consent-card__check">
            <input
              type="checkbox"
              checked={consent.email}
              onChange={(event) => onChange({ email: event.target.checked })}
            />
            <span aria-hidden="true" />
          </span>
        </label>
        {errors['consentEmail'] && <p className="field-error">{errors['consentEmail']}</p>}

        <label className={`consent-card ${errors['consentWhatsapp'] ? 'has-error' : ''} ${consent.whatsapp ? 'is-checked' : ''}`}>
          <span className="consent-card__icon"><MessageCircle size={20} /></span>
          <span className="consent-card__body">
            <span className="consent-card__channel">WhatsApp communication consent</span>
            <span className="consent-card__text">
              I agree to receive booking-related messages and updates from FlightsFuzz through
              WhatsApp on the number provided.
            </span>
            <span className="consent-card__links">
              Messaging is not active in this demonstration. In production, consent will be recorded
              before any WhatsApp Business API message is sent.
            </span>
          </span>
          <span className="consent-card__check">
            <input
              type="checkbox"
              checked={consent.whatsapp}
              onChange={(event) => onChange({ whatsapp: event.target.checked })}
            />
            <span aria-hidden="true" />
          </span>
        </label>
        {errors['consentWhatsapp'] && <p className="field-error">{errors['consentWhatsapp']}</p>}
      </div>

      <div className="consent-footnote">
        <p>
          You can withdraw consent later by contacting the team. Consent records, message logs and
          opt-out handling are pending backend integrations.
        </p>
      </div>
    </div>
  )
}
