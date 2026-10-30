import { Mail, MessageCircle } from 'lucide-react'
import type { ContactDetails } from '../../../types'
import { COUNTRY_CODES } from '../../../lib/data/reference'
import { FieldShell, TextField } from '../../forms/FormField'

interface StepContactProps {
  contact: ContactDetails
  errors: Record<string, string>
  onChange: (patch: Partial<ContactDetails>) => void
}

export function StepContact({ contact, errors, onChange }: StepContactProps) {
  const whatsappValue = contact.whatsappSame ? contact.mobile : contact.whatsapp

  return (
    <div className="booking-step">
      <div className="form-section-label">
        <Mail size={16} />
        <span>Primary contact</span>
      </div>
      <p className="step-intro">
        We use these details to discuss your booking request. They are not shared with third
        parties in this demonstration.
      </p>

      <div className="form-grid form-grid--two">
        <TextField
          id="contact-full-name"
          label="Full name"
          value={contact.fullName}
          onChange={(event) => onChange({ fullName: event.target.value })}
          error={errors['fullName']}
          placeholder="e.g. Aashish Risal"
          autoComplete="name"
          required
        />
        <TextField
          id="contact-email"
          label="Email address"
          type="email"
          value={contact.email}
          onChange={(event) => onChange({ email: event.target.value })}
          error={errors['email']}
          placeholder="you@example.com"
          autoComplete="email"
          inputMode="email"
          required
        />

        <FieldShell id="contact-mobile" label="Mobile number" error={errors['mobile']} required>
          <div className="phone-group">
            <select
              className="form-input form-select phone-group__code"
              value={contact.countryCode}
              onChange={(event) => onChange({ countryCode: event.target.value })}
              aria-label="Country calling code"
              aria-invalid={Boolean(errors['countryCode'])}
            >
              {COUNTRY_CODES.map((item) => (
                <option key={item.code} value={item.code}>{item.code} · {item.country}</option>
              ))}
            </select>
            <input
              id="contact-mobile"
              className="form-input phone-group__number"
              type="tel"
              value={contact.mobile}
              onChange={(event) => onChange({ mobile: event.target.value })}
              placeholder="98XXXXXXXX"
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={Boolean(errors['mobile'])}
              aria-describedby={errors['mobile'] ? 'contact-mobile-error' : undefined}
              required
            />
          </div>
        </FieldShell>

        <div className="form-field">
          <label htmlFor="contact-whatsapp">WhatsApp number</label>
          <label className="inline-check">
            <input
              type="checkbox"
              checked={contact.whatsappSame}
              onChange={(event) => onChange({ whatsappSame: event.target.checked, whatsapp: event.target.checked ? contact.mobile : contact.whatsapp })}
            />
            <span>Same as my mobile number</span>
          </label>
          <input
            id="contact-whatsapp"
            className="form-input"
            type="tel"
            value={whatsappValue}
            onChange={(event) => onChange({ whatsapp: event.target.value })}
            placeholder={contact.whatsappSame ? 'Uses your mobile number' : 'Enter WhatsApp number'}
            disabled={contact.whatsappSame}
            aria-invalid={Boolean(errors['whatsapp'])}
            aria-describedby={errors['whatsapp'] ? 'contact-whatsapp-error' : undefined}
          />
          {errors['whatsapp'] && <p className="field-error" id="contact-whatsapp-error">{errors['whatsapp']}</p>}
        </div>
      </div>

      <div className="form-section-label form-section-label--spaced">
        <MessageCircle size={16} />
        <span>Where you are based</span>
      </div>

      <div className="form-grid form-grid--two">
        <TextField
          id="contact-address"
          label="Current address"
          value={contact.address}
          onChange={(event) => onChange({ address: event.target.value })}
          error={errors['address']}
          placeholder="Street, area, ward"
          autoComplete="street-address"
          className="form-grid__full"
          required
        />
        <TextField
          id="contact-city"
          label="City"
          value={contact.city}
          onChange={(event) => onChange({ city: event.target.value })}
          error={errors['city']}
          placeholder="Kathmandu"
          autoComplete="address-level2"
          required
        />
        <TextField
          id="contact-country"
          label="Country"
          value={contact.country}
          onChange={(event) => onChange({ country: event.target.value })}
          error={errors['country']}
          placeholder="Nepal"
          autoComplete="country-name"
          required
        />
      </div>

      {errors['countryCode'] && <p className="field-error">{errors['countryCode']}</p>}

      <p className="privacy-inline">
        Your contact information stays in this browser tab in the demonstration. No API, email
        provider or WhatsApp integration is connected yet.
      </p>
    </div>
  )
}
