import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { ChatMessageModel } from './types'
import { ChatbotLauncher } from './ChatbotLauncher'
import { ChatbotPanel } from './ChatbotPanel'
import { getAssistantReply } from '../../lib/chatbot/responseHandler'
import { makeId } from '../../lib/utils/format'

type ChatState = 'closed' | 'open' | 'minimized'

const WELCOME: ChatMessageModel = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hi — I’m the FlightsFuzz assistant. Ask me how the booking-request process works, what documents you may need, or where to find notices and human support.',
  createdAt: Date.now(),
  actions: [
    { label: 'Search Flights', to: '/flights' },
    { label: 'Request a Booking', to: '/booking-request' },
    { label: 'View Notices', to: '/notices' },
  ],
}

export function ChatbotWidget() {
  const [state, setState] = useState<ChatState>('closed')
  const [messages, setMessages] = useState<ChatMessageModel[]>([WELCOME])
  const [typing, setTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const timerRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    },
    [],
  )

  const open = useCallback(() => {
    setState('open')
    setHasUnread(false)
  }, [])

  const returnFocusToLauncher = useCallback(() => {
    document.getElementById('flightsfuzz-chat-launcher')?.focus()
  }, [])

  const close = useCallback(() => {
    returnFocusToLauncher()
    setState('closed')
  }, [returnFocusToLauncher])

  const minimize = useCallback(() => {
    returnFocusToLauncher()
    setState('minimized')
  }, [returnFocusToLauncher])

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      setMessages((current) => [
        ...current,
        { id: makeId('msg'), role: 'user', text: trimmed, createdAt: Date.now() },
      ])
      setTyping(true)
      setHasUnread(false)

      const delay = 620 + Math.min(trimmed.length * 6, 420)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        const answer = getAssistantReply(trimmed)
        setMessages((current) => [
          ...current,
          {
            id: makeId('msg'),
            role: 'assistant',
            text: answer.text,
            createdAt: Date.now(),
            actions: answer.actions,
          },
        ])
        setTyping(false)
        setState((current) => {
          if (current !== 'open') setHasUnread(true)
          return current
        })
      }, delay)
    },
    [],
  )

  const lastAssistant = [...messages].reverse().find((message) => message.role === 'assistant')
  const lastPreview = lastAssistant?.text ?? 'Continue the conversation'

  return (
    <div className="chatbot-widget">
      <ChatbotPanel
        open={state === 'open'}
        messages={messages}
        typing={typing}
        onSend={send}
        onClose={close}
        onMinimize={minimize}
      />

      {state === 'minimized' ? (
        <button type="button" className="chatbot-resume" onClick={open} aria-label="Resume the FlightsFuzz assistant">
          <span className="chatbot-resume__icon" aria-hidden="true">
            <Sparkles size={15} />
          </span>
          <span className="chatbot-resume__copy">
            <strong>Continue chat</strong>
            <small>{lastPreview}</small>
          </span>
          <ArrowUpRight size={14} className="chatbot-resume__arrow" aria-hidden="true" />
        </button>
      ) : null}

      <ChatbotLauncher
        open={state === 'open'}
        hasUnread={hasUnread}
        onClick={() => (state === 'open' ? close() : open())}
      />
    </div>
  )
}
