import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { FaqItem } from '../../lib/data/faq'
import { cn } from '../../lib/utils/format'

export function Accordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div className={cn('accordion__item', isOpen && 'is-open')} key={item.question}>
            <h3>
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="accordion__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="accordion__question">{item.question}</span>
                <span className="accordion__icon" aria-hidden="true"><Plus size={18} /></span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className="accordion__panel"
              hidden={!isOpen}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
