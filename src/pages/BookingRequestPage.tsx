import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Lock,
  MessageCircle,
  Plane,
} from 'lucide-react'
import type {
  AdditionalInfo,
  BookingDraft,
  CommunicationConsent,
  ContactDetails,
  DocumentSlots,
  DocumentType,
  FlightSearch,
  PassengerDraft,
  PassengerType,
  UploadedDocument,
} from '../types'
import { FlightSearchForm } from '../components/flight-search/FlightSearchForm'
import { BookingStepper } from '../components/booking/BookingStepper'
import { BookingSummary } from '../components/booking/BookingSummary'
import { StepReview } from '../components/booking/steps/StepReview'
import { StepContact } from '../components/booking/steps/StepContact'
import { StepPassengers } from '../components/booking/steps/StepPassengers'
import { StepDocuments } from '../components/booking/steps/StepDocuments'
import { StepAdditional } from '../components/booking/steps/StepAdditional'
import { StepConsent } from '../components/booking/steps/StepConsent'
import { StepFinal } from '../components/booking/steps/StepFinal'
import { createDefaultSearch, parseSearchFromParams } from '../lib/utils/search'
import { findDemoFlight } from '../lib/data/mockFlights'
import { makeId } from '../lib/utils/format'
import { formatDate } from '../lib/utils/date'
import { validateConsent, validateContact, validatePassengers } from '../lib/validation/booking'
import { documentManifestFrom, submitBookingRequest } from '../lib/integrations/bookingApi'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'

const STEP_META = [
  { title: 'Review your flight', eyebrow: 'The itinerary', description: 'Check the route, dates and demonstration flight before adding your details.' },
  { title: 'How can we reach you?', eyebrow: 'Primary contact', description: 'Add the contact details our team should use when discussing this request.' },
  { title: 'Who is travelling?', eyebrow: 'Passenger information', description: 'Add each traveller exactly as their name appears on their travel document.' },
  { title: 'Document preview', eyebrow: 'Identity documents', description: 'Attach the documents relevant to each passenger. Files stay in this browser tab only.' },
  { title: 'A little more context', eyebrow: 'Additional information', description: 'Optional details that help the team understand your preferences and constraints.' },
  { title: 'Your communication choices', eyebrow: 'Consent', description: 'Choose how FlightsFuzz may contact you. Both consents are required for this workflow.' },
  { title: 'One last look', eyebrow: 'Review & submit', description: 'Confirm every detail before submitting the booking request to the demonstration.' },
]

const newPassenger = (type: PassengerType = 'adult'): PassengerDraft => ({
  id: makeId('pax'),
  type,
  fullName: '',
  dob: '',
  gender: '',
  nationality: '',
  documentType: 'passport',
  documentNumber: '',
  documentExpiry: '',
})

const createDraft = (search: FlightSearch): BookingDraft => {
  const passengers: PassengerDraft[] = []
  for (let index = 0; index < search.adults; index += 1) passengers.push(newPassenger('adult'))
  for (let index = 0; index < search.children; index += 1) passengers.push(newPassenger('child'))
  for (let index = 0; index < search.infants; index += 1) passengers.push(newPassenger('infant'))
  if (passengers.length === 0) passengers.push(newPassenger('adult'))

  return {
    contact: {
      fullName: '',
      email: '',
      countryCode: '+977',
      mobile: '',
      whatsappSame: true,
      whatsapp: '',
      address: '',
      city: '',
      country: 'Nepal',
    },
    passengers,
    documents: {},
    additional: {
      specialRequests: '',
      preferredTime: 'anytime',
      travelPurpose: '',
      notes: '',
    },
    consent: { email: false, whatsapp: false },
  }
}

const hasUploading = (documents: Record<string, DocumentSlots>): boolean =>
  Object.values(documents).some((slots) =>
    Object.values(slots).some((files) => files?.some((file) => file.status === 'uploading')),
  )

export function BookingRequestPage() {
  const [searchParams] = useSearchParams()
  const searchKey = searchParams.toString()
  const search = useMemo(
    () => parseSearchFromParams(new URLSearchParams(searchKey)),
    [searchKey],
  )
  const flightId = searchParams.get('flight')
  const flight = useMemo(() => (search && flightId ? findDemoFlight(search, flightId) : null), [search, flightId])
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [draft, setDraft] = useState<BookingDraft>(() => createDraft(search ?? createDefaultSearch()))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formMessage, setFormMessage] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [documents, setDocuments] = useState<Record<string, DocumentSlots>>({})
  const documentsRef = useRef(documents)
  documentsRef.current = documents
  const timersRef = useRef<Map<string, number>>(new Map())
  const formRef = useRef<HTMLFormElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  useLockBodyScroll(submitting)

  const revokeDocument = (file: UploadedDocument) => {
    if (file.previewUrl) URL.revokeObjectURL(file.previewUrl)
  }

  useEffect(() => () => {
    timersRef.current.forEach((timer) => window.clearInterval(timer))
    timersRef.current.clear()
    Object.values(documentsRef.current).forEach((slots) => {
      Object.values(slots).forEach((files) => files?.forEach(revokeDocument))
    })
  }, [])

  const clearDocuments = () => {
    timersRef.current.forEach((timer) => window.clearInterval(timer))
    timersRef.current.clear()
    Object.values(documentsRef.current).forEach((slots) => {
      Object.values(slots).forEach((files) => files?.forEach(revokeDocument))
    })
    setDocuments({})
  }

  if (!search) {
    return (
      <div className="booking-page booking-page--empty">
        <header className="booking-hero booking-hero--compact">
          <div className="container">
            <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Booking request</p>
            <h1>START WITH<br /><span>A SEARCH.</span></h1>
            <p>A booking request needs a route and travel date. Search below, then choose a demonstration flight.</p>
          </div>
        </header>
        <div className="container booking-empty-search">
          <FlightSearchForm initialSearch={createDefaultSearch()} submitLabel="Search flights" />
          <p className="privacy-inline">
            You can also <Link to="/contact">contact the team</Link> if you would rather describe the trip in a message.
          </p>
        </div>
      </div>
    )
  }

  const meta = STEP_META[step - 1]
  const first = search.segments[0]
  const travellers = search.adults + search.children + search.infants

  const clearErrors = (keys: string[]) => {
    if (!keys.length) return
    setErrors((current) => {
      const next = { ...current }
      keys.forEach((key) => delete next[key])
      return next
    })
    setFormMessage('')
  }

  const updateContact = (patch: Partial<ContactDetails>) => {
    setDraft((current) => {
      const contact = { ...current.contact, ...patch }
      if (patch.whatsappSame === true) contact.whatsapp = contact.mobile
      if (patch.whatsappSame === false && !current.contact.whatsapp) contact.whatsapp = ''
      if (patch.mobile !== undefined && contact.whatsappSame) contact.whatsapp = patch.mobile
      return { ...current, contact }
    })
    clearErrors([...Object.keys(patch), 'whatsapp'])
  }

  const updatePassenger = (id: string, patch: Partial<PassengerDraft>) => {
    setDraft((current) => ({
      ...current,
      passengers: current.passengers.map((passenger) =>
        passenger.id === id ? { ...passenger, ...patch } : passenger,
      ),
    }))
    clearErrors(Object.keys(patch).map((field) => `${id}.${field}`))
  }

  const addPassenger = () => {
    setDraft((current) => {
      const total = current.passengers.length
      if (total >= 9) return current
      return { ...current, passengers: [...current.passengers, newPassenger('adult')] }
    })
  }

  const removePassengerDocuments = (passengerId: string) => {
    const slots = documentsRef.current[passengerId]
    if (slots) {
      Object.values(slots).forEach((files) => {
        files?.forEach((file) => {
          revokeDocument(file)
          const timer = timersRef.current.get(file.id)
          if (timer) {
            window.clearInterval(timer)
            timersRef.current.delete(file.id)
          }
        })
      })
    }
    setDocuments((current) => {
      const next = { ...current }
      delete next[passengerId]
      return next
    })
  }

  const removePassenger = (id: string) => {
    const target = draft.passengers.find((passenger) => passenger.id === id)
    if (!target || draft.passengers.length === 1) return
    if (target.type === 'adult' && draft.passengers.filter((passenger) => passenger.type === 'adult').length === 1) {
      setFormMessage('At least one adult must remain on the request.')
      return
    }
    setDraft((current) => ({ ...current, passengers: current.passengers.filter((passenger) => passenger.id !== id) }))
    setErrors((current) => {
      const next = { ...current }
      Object.keys(next).forEach((key) => {
        if (key.startsWith(`${id}.`)) delete next[key]
      })
      return next
    })
    removePassengerDocuments(id)
  }

  const updateAdditional = (patch: Partial<AdditionalInfo>) => {
    setDraft((current) => ({ ...current, additional: { ...current.additional, ...patch } }))
  }

  const updateConsent = (patch: Partial<CommunicationConsent>) => {
    setDraft((current) => ({ ...current, consent: { ...current.consent, ...patch } }))
    clearErrors([patch.email !== undefined ? 'consentEmail' : '', patch.whatsapp !== undefined ? 'consentWhatsapp' : ''].filter(Boolean))
  }

  const addFiles = (passengerId: string, type: DocumentType, files: File[]) => {
    const existing = documents[passengerId]?.[type] ?? []
    const room = Math.max(0, 2 - existing.length)
    const accepted = files.slice(0, room)
    if (accepted.length === 0) return
    const created: UploadedDocument[] = accepted.map((file) => ({
      id: makeId('doc'),
      name: file.name,
      size: file.size,
      mime: file.type,
      progress: 4,
      status: 'uploading',
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }))
    setDocuments((current) => ({
      ...current,
      [passengerId]: {
        ...current[passengerId],
        [type]: [...(current[passengerId]?.[type] ?? []), ...created],
      },
    }))
    created.forEach((document) => {
      let progress = 4
      const timer = window.setInterval(() => {
        progress = Math.min(100, progress + 9 + Math.random() * 12)
        setDocuments((current) => {
          const active = current[passengerId]?.[type]
          if (!active) return current
          return {
            ...current,
            [passengerId]: {
              ...current[passengerId],
              [type]: active.map((file) =>
                file.id === document.id
                  ? { ...file, progress, status: progress >= 100 ? 'ready' : 'uploading' }
                  : file,
              ),
            },
          }
        })
        if (progress >= 100) {
          window.clearInterval(timer)
          timersRef.current.delete(document.id)
        }
      }, 130)
      timersRef.current.set(document.id, timer)
    })
  }

  const removeFile = (passengerId: string, type: DocumentType, fileId: string) => {
    const target = documentsRef.current[passengerId]?.[type]?.find((file) => file.id === fileId)
    if (target) revokeDocument(target)
    const timer = timersRef.current.get(fileId)
    if (timer) {
      window.clearInterval(timer)
      timersRef.current.delete(fileId)
    }
    setDocuments((current) => {
      const slots = { ...current[passengerId] }
      const files = (slots[type] ?? []).filter((file) => file.id !== fileId)
      if (files.length) slots[type] = files
      else delete slots[type]
      return { ...current, [passengerId]: slots }
    })
  }

  const focusStep = () => {
    window.setTimeout(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      formRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      headingRef.current?.focus({ preventScroll: true })
    }, 30)
  }

  const validateStep = (targetStep: number): Record<string, string> => {
    if (targetStep === 2) return validateContact(draft.contact)
    if (targetStep === 3) return validatePassengers(draft.passengers)
    if (targetStep === 4 && hasUploading(documents)) {
      return { documents: 'Please wait until the local previews finish preparing.' }
    }
    if (targetStep === 6) return validateConsent(draft.consent)
    return {}
  }

  const goNext = () => {
    const nextErrors = validateStep(step)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setFormMessage('Some details need your attention before continuing.')
      focusStep()
      return
    }
    setFormMessage('')
    setStep((current) => Math.min(7, current + 1))
    focusStep()
  }

  const goBack = () => {
    setErrors({})
    setFormMessage('')
    setSubmitError('')
    setStep((current) => Math.max(1, current - 1))
    focusStep()
  }

  const goToStep = (target: number) => {
    if (target >= step) return
    setErrors({})
    setFormMessage('')
    setStep(target)
    focusStep()
  }

  const handleSubmit = async () => {
    if (submitting) return
    const contactErrors = validateContact(draft.contact)
    const passengerErrors = validatePassengers(draft.passengers)
    const consentErrors = validateConsent(draft.consent)
    const documentErrors: Record<string, string> = hasUploading(documents)
      ? { documents: 'Please wait until the local document previews finish before submitting.' }
      : {}
    const allErrors = { ...contactErrors, ...passengerErrors, ...consentErrors, ...documentErrors }
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      const target = Object.keys(documentErrors).length
        ? 4
        : Object.keys(contactErrors).length
          ? 2
          : Object.keys(passengerErrors).length
            ? 3
            : 6
      setStep(target)
      setFormMessage('Some details need your attention before the request can be submitted.')
      setSubmitError('')
      focusStep()
      return
    }

    setSubmitting(true)
    setSubmitError('')
    setFormMessage('')
    try {
      const result = await submitBookingRequest({
        search,
        selectedFlightId: flight?.id ?? null,
        contact: draft.contact,
        passengers: draft.passengers,
        additional: draft.additional,
        consent: draft.consent,
        documentManifest: documentManifestFrom(documents),
      })
      const submission = {
        reference: result.reference,
        search,
        flight,
        contactName: draft.contact.fullName,
        email: draft.contact.email,
        whatsapp: draft.contact.whatsappSame ? `${draft.contact.countryCode} ${draft.contact.mobile}` : draft.contact.whatsapp,
        passengerCount: draft.passengers.length,
        submittedAt: result.submittedAt,
      }
      clearDocuments()
      navigate('/booking-success', { state: { submission }, replace: true })
    } catch {
      setSubmitError('Something went wrong while preparing the request. No data was sent. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (step < 7) goNext()
    else void handleSubmit()
  }

  const hasErrorSummary = Object.keys(errors).length > 0 || formMessage

  return (
    <div className="booking-page">
      <header className="booking-hero">
        <div className="booking-hero__grid" aria-hidden="true" />
        <div className="container booking-hero__inner">
          <div>
            <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Booking request · demonstration</p>
            <h1>REQUEST<br /><span>A FLIGHT.</span></h1>
            <p className="booking-hero__lead">
              Tell us who is flying and how to reach you. A real team member reviews the request
              before any ticket, payment or confirmation.
            </p>
          </div>
          <div className="booking-hero__ticket" aria-hidden="true">
            <div className="booking-hero__ticket-head"><span>FLIGHTSFUZZ</span><span>FF / REQUEST</span></div>
            <div className="booking-hero__ticket-route">
              <span><b>{first.from.code}</b><small>{first.from.city}</small></span>
              <span className="booking-hero__ticket-line"><Plane size={16} /></span>
              <span><b>{first.to.code}</b><small>{first.to.city}</small></span>
            </div>
            <div className="booking-hero__ticket-meta">
              <span><CalendarDays size={13} /> {formatDate(first.date)}</span>
              <span>{travellers} PAX</span>
            </div>
            <div className="booking-hero__ticket-foot">
              <span className="trust-ticket__barcode" />
              <span>NO PAYMENT · NO AUTO-ISSUE</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container booking-layout">
        <div className="booking-layout__aside">
          <BookingStepper current={step} onGoTo={goToStep} />
          <BookingSummary search={search} flight={flight} />
          <div className="booking-help">
            <span className="booking-help__icon"><MessageCircle size={18} /></span>
            <div>
              <strong>Prefer to talk first?</strong>
              <p>Official contact details will be published on the contact page. No WhatsApp number is active in this demo.</p>
              <Link to="/contact" className="text-link">Contact page <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          className="booking-form"
          onSubmit={handleFormSubmit}
          noValidate
          aria-labelledby="booking-step-title"
        >
          <div className="booking-form__head">
            <span className="booking-form__step">{meta.eyebrow} · Step {String(step).padStart(2, '0')}</span>
            <h2 id="booking-step-title" ref={headingRef} tabIndex={-1}>{meta.title}</h2>
            <p>{meta.description}</p>
            <div className="booking-form__progress" aria-hidden="true">
              <span style={{ width: `${((step - 1) / 6) * 100}%` }} />
            </div>
          </div>

          {hasErrorSummary && (
            <div className="form-error-banner form-error-banner--booking" role="alert">
              <AlertCircle size={18} />
              <span>{formMessage || 'Please review the highlighted fields before continuing.'}</span>
            </div>
          )}
          {submitError && (
            <div className="form-error-banner form-error-banner--booking" role="alert">
              <AlertCircle size={18} /><span>{submitError}</span>
            </div>
          )}
          {errors['documents'] && <p className="form-level-error">{errors['documents']}</p>}

          {step === 1 && <StepReview search={search} flight={flight} />}
          {step === 2 && <StepContact contact={draft.contact} errors={errors} onChange={updateContact} />}
          {step === 3 && (
            <StepPassengers
              passengers={draft.passengers}
              errors={errors}
              onChange={updatePassenger}
              onAdd={addPassenger}
              onRemove={removePassenger}
            />
          )}
          {step === 4 && (
            <StepDocuments
              passengers={draft.passengers}
              documents={documents}
              onFiles={addFiles}
              onRemove={removeFile}
            />
          )}
          {step === 5 && <StepAdditional additional={draft.additional} onChange={updateAdditional} />}
          {step === 6 && <StepConsent consent={draft.consent} errors={errors} onChange={updateConsent} />}
          {step === 7 && (
            <StepFinal draft={draft} search={search} flight={flight} onEditStep={goToStep} />
          )}

          <div className="booking-form__nav">
            <button type="button" className="btn btn--ghost" onClick={goBack} disabled={step === 1 || submitting}>
              <ArrowLeft size={16} /> Back
            </button>
            <div className="booking-form__nav-right">
              <span className="booking-form__nav-note">
                {step === 7 ? (
                  <><Lock size={13} /> Frontend demonstration only</>
                ) : (
                  <>Step {step} of 7</>
                )}
              </span>
              <button type="submit" className="btn btn--primary booking-form__next" disabled={submitting}>
                {submitting ? (
                  <><Loader2 size={17} className="spin" /> Preparing request…</>
                ) : step === 7 ? (
                  <>Submit booking request <ArrowRight size={17} /></>
                ) : (
                  <>Continue <ArrowRight size={17} /></>
                )}
              </button>
            </div>
          </div>

          {step === 7 && (
            <p className="booking-form__submit-note">
              <CheckCircle2 size={14} /> By submitting, you confirm the information is accurate and
              understand that this is a booking request, not a confirmed ticket.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
