import { FileLock2, Info } from 'lucide-react'
import type { DocumentType, PassengerDraft, UploadedDocument } from '../../../types'
import { DOCUMENT_LABELS } from '../../../lib/data/reference'
import { DocumentUploader } from '../DocumentUploader'

interface StepDocumentsProps {
  passengers: PassengerDraft[]
  documents: Record<string, Partial<Record<DocumentType, UploadedDocument[]>>>
  onFiles: (passengerId: string, type: DocumentType, files: File[]) => void
  onRemove: (passengerId: string, type: DocumentType, fileId: string) => void
}

export function StepDocuments({ passengers, documents, onFiles, onRemove }: StepDocumentsProps) {
  const totalFiles = Object.values(documents).reduce(
    (count, slots) => count + Object.values(slots).reduce((sum, files) => sum + (files?.length ?? 0), 0),
    0,
  )

  return (
    <div className="booking-step">
      <div className="step-action-row">
        <p className="step-intro">
          Upload the documents relevant to each traveller. In this demonstration every upload is
          optional and stays inside your browser tab.
        </p>
        <span className="document-total"><FileLock2 size={15} /> {totalFiles} local file{totalFiles === 1 ? '' : 's'}</span>
      </div>

      <div className="security-banner">
        <Info size={17} />
        <div>
          <strong>No secure document storage is connected yet.</strong>
          <p>
            Do not upload real identity documents to this demo. Files are held in memory only,
            never transmitted, and cleared when you leave the flow. A production release requires
            encrypted storage, malware scanning and a retention policy.
          </p>
        </div>
      </div>

      <div className="document-passengers">
        {passengers.map((passenger, index) => {
          const slots = documents[passenger.id] ?? {}
          const count = Object.values(slots).reduce((sum, files) => sum + (files?.length ?? 0), 0)
          return (
            <section className="document-passenger" key={passenger.id}>
              <div className="document-passenger__head">
                <span className="document-passenger__index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{passenger.fullName || `Passenger ${index + 1}`}</h3>
                  <span>
                    {passenger.type} · selected document: {DOCUMENT_LABELS[passenger.documentType]}
                  </span>
                </div>
                <span className="badge badge--outline">{count} file{count === 1 ? '' : 's'}</span>
              </div>
              <DocumentUploader
                passenger={passenger}
                documents={slots}
                onFiles={(type, files) => onFiles(passenger.id, type, files)}
                onRemove={(type, fileId) => onRemove(passenger.id, type, fileId)}
              />
            </section>
          )
        })}
      </div>

      <p className="privacy-inline">
        Accepted in this demo: PDF, JPG, PNG and WebP, up to 5 MB per file. The selected document
        type does not make an upload mandatory here.
      </p>
    </div>
  )
}
