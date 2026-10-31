import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Send, Sparkles, X } from 'lucide-react'
import type { ChatMessageModel } from './types'
import { ChatMessage } from './ChatMessage'
import { ChatSuggestions } from './ChatSuggestions'
import { cn } from '../../lib/utils/format'

interface ChatbotPanelProps {
  open: boolean
  messages: ChatMessageModel[]
  typing: boolean
  onSend: (text: string) => void
  onClose: () => void
  onMinimize: () => void
}

export function ChatbotPanel({ open, messages, typing, onSend, onClose, onMinimize }: ChatbotPanelProps) {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 260)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, open])

  useEffect(() => {
    if (!open) return
    const log = logRef.current
    if (!log) return
    log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' })
  }, [messages, open, typing])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const text = input.trim()
    if (!text || typing) return
    onSend(text)
    setInput('')
    setShowSuggestions(false)
  }

  const selectSuggestion = (prompt: string) => {
    if (typing) return
    onSend(prompt)
    setShowSuggestions(false)
  }

  return (
    <section
      id="flightsfuzz-chat-panel"
      className={cn('chatbot-panel', open && 'is-open')}
      role="dialog"
      aria-modal="false"
      aria-label="FlightsFuzz virtual assistant"
      inert={!open}
    >
      <header className="chatbot-panel__head">
        <span className="chatbot-panel__avatar" aria-hidden="true">
          <Sparkles size={19} strokeWidth={2.1} />
          <i className="chatbot-panel__status" />
        </span>
        <div className="chatbot-panel__identity">
          <strong>FlightsFuzz Assistant</strong>
          <span>
            <i aria-hidden="true" /> Demo assistant · not a live agent
          </span>
        </div>
        <div className="chatbot-panel__controls">
          <button type="button" className="chatbot-control" onClick={onMinimize} aria-label="Minimize chat">
            <ChevronDown size={17} />
          </button>
          <button type="button" className="chatbot-control" onClick={onClose} aria-label="Close chat">
            <X size={17} />
          </button>
        </div>
      </header>

      <div className="chatbot-panel__log" ref={logRef} aria-live="polite" aria-relevant="additions">
        <div className="chatbot-panel__intro">
          <span className="chatbot-panel__intro-badge">GUIDED HELP</span>
          <p>
            I can explain the booking-request flow, documents, payments and where to find things.
            I cannot check live fares or confirm a booking.
          </p>
        </div>

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} onNavigate={onClose} />
        ))}

        {typing ? (
          <div className="chat-message chat-message--assistant chat-typing" aria-label="Assistant is typing">
            <span className="chat-message__avatar" aria-hidden="true">
              <Sparkles size={14} strokeWidth={2.1} />
            </span>
            <span className="chat-typing__bubble" aria-hidden="true">
              <i /><i /><i />
            </span>
          </div>
        ) : null}

        {showSuggestions && messages.length <= 1 ? (
          <ChatSuggestions onSelect={selectSuggestion} disabled={typing} />
        ) : null}
      </div>

      <form className="chatbot-panel__composer" onSubmit={submit}>
        <label className="sr-only" htmlFor="chatbot-input">Ask the FlightsFuzz assistant</label>
        <div className="chatbot-panel__input-wrap">
          <input
            id="chatbot-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about routes, documents or the request…"
            autoComplete="off"
            maxLength={280}
          />
          <button
            type="submit"
            className="chatbot-panel__send"
            disabled={!input.trim() || typing}
            aria-label="Send message"
          >
            <Send size={17} strokeWidth={2.1} />
          </button>
        </div>
        <p className="chatbot-panel__footnote">
          Demo assistant · no live AI, booking or payment access. No message is sent to WhatsApp or email.
        </p>
      </form>
    </section>
  )
}
