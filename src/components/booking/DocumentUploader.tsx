import { useRef, useState } from 'react'
import { FileText, Image, ShieldAlert, Trash2, UploadCloud } from 'lucide-react'
import type { DocumentType, PassengerDraft, UploadedDocument } from '../../types'
import { DOCUMENT_HINTS, DOCUMENT_LABELS } from '../../lib/data/reference'
import { formatFileSize } from '../../lib/utils/format'
import { cn } from '../../lib/utils/format'

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024
const MAX_FILES_PER_TYPE = 2

interface DocumentUploaderProps {
  passenger: PassengerDraft
  documents: Partial<Record<DocumentType, UploadedDocument[]>>
  onFiles: (type: DocumentType, files: File[]) => void
  onRemove: (type: DocumentType, fileId: string) => void
}

export function DocumentUploader({ passenger, documents, onFiles, onRemove }: DocumentUploaderProps) {
  const [activeType, setActiveType] = useState<DocumentType>(passenger.documentType)
  const [dragging, setDragging] = useState(false)
  const [localError, setLocalError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const types = Object.keys(DOCUMENT_LABELS) as DocumentType[]
  const files = documents[activeType] ?? []

  const handleFiles = (incoming: FileList | File[]) => {
    const list = Array.from(incoming)
    if (!list.length) return
    const valid: File[] = []
    let message = ''
    list.forEach((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        message = 'Only PDF, JPG, PNG or WebP files are accepted.'
        return
      }
      if (file.size > MAX_SIZE) {
        message = `${file.name} is larger than 5 MB.`
        return
      }
      valid.push(file)
    })
    if (files.length + valid.length > MAX_FILES_PER_TYPE) {
      message = `You can add up to ${MAX_FILES_PER_TYPE} files for ${DOCUMENT_LABELS[activeType].toLowerCase()}.`
    }
    const allowed = valid.slice(0, Math.max(0, MAX_FILES_PER_TYPE - files.length))
    if (allowed.length) onFiles(activeType, allowed)
    setLocalError(message)
    if (inputRef.current) inputRef.current.value = ''
  }

  const activeFiles = files.filter((file) => file.status !== 'error')

  return (
    <div className="document-uploader">
      <div className="document-uploader__types" role="tablist" aria-label={`Documents for ${passenger.fullName || 'passenger'}`}>
        {types.map((type) => {
          const count = documents[type]?.length ?? 0
          return (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={activeType === type}
              className={cn('document-type', activeType === type && 'is-active', type === passenger.documentType && 'is-preferred')}
              onClick={() => {
                setActiveType(type)
                setLocalError('')
              }}
            >
              {DOCUMENT_LABELS[type]}
              {type === passenger.documentType && <span className="document-type__tag">Selected type</span>}
              {count > 0 && <span className="document-type__count">{count}</span>}
            </button>
          )
        })}
      </div>

      <div
        className={cn('dropzone', dragging && 'is-dragging')}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          handleFiles(event.dataTransfer.files)
        }}
      >
        <input
          ref={inputRef}
          id={`upload-${passenger.id}-${activeType}`}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          multiple
          className="sr-only"
          onChange={(event) => event.target.files && handleFiles(event.target.files)}
        />
        <span className="dropzone__icon"><UploadCloud size={22} /></span>
        <div className="dropzone__copy">
          <strong>Drop {DOCUMENT_LABELS[activeType].toLowerCase()} here</strong>
          <span>or <label htmlFor={`upload-${passenger.id}-${activeType}`} className="text-link">browse files</label> · PDF, JPG, PNG or WebP · max 5 MB</span>
          <small>{DOCUMENT_HINTS[activeType]}</small>
        </div>
      </div>

      {localError && <p className="field-error" role="alert">{localError}</p>}

      {activeFiles.length > 0 && (
        <ul className="upload-list">
          {activeFiles.map((file) => (
            <li key={file.id} className={cn('upload-item', `is-${file.status}`)}>
              <span className="upload-item__preview">
                {file.previewUrl ? (
                  <img src={file.previewUrl} alt="" />
                ) : file.mime === 'application/pdf' ? (
                  <FileText size={19} />
                ) : (
                  <Image size={19} />
                )}
              </span>
              <span className="upload-item__body">
                <span className="upload-item__name">{file.name}</span>
                <span className="upload-item__meta">
                  {formatFileSize(file.size)} · {file.status === 'uploading' ? 'Preparing preview…' : 'Ready in this tab only'}
                </span>
                <span className="upload-item__progress" aria-hidden="true">
                  <span style={{ width: `${file.progress}%` }} />
                </span>
              </span>
              <span className="upload-item__status">
                {file.status === 'ready' ? 'LOCAL' : `${Math.round(file.progress)}%`}
              </span>
              <button type="button" className="upload-item__remove" onClick={() => onRemove(activeType, file.id)} aria-label={`Remove ${file.name}`}>
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="document-uploader__notice">
        <ShieldAlert size={15} />
        <p>
          <strong>Demonstration only.</strong> Files stay in temporary browser memory and are
          cleared when you leave this flow. Nothing is uploaded to a server. Secure document storage
          is a pending backend integration.
        </p>
      </div>
    </div>
  )
}
