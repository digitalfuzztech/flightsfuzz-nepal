import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { ChatMessageModel } from './types'
import { formatChatTime } from './types'
import { cn } from '../../lib/utils/format'

interface ChatMessageProps {
  message: ChatMessageModel
  onNavigate: () => void
}

export function ChatMessage({ message, onNavigate }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant'

  return (
    <article className={cn('chat-message', `chat-message--${message.role}`)} aria-label={`${isAssistant ? 'FlightsFuzz assistant' : 'You'} at ${formatChatTime(message.createdAt)}`}>
      {isAssistant ? (
        <span className="chat-message__avatar" aria-hidden="true">
          <Sparkles size={14} strokeWidth={2.1} />
        </span>
      ) : null}
      <div className="chat-message__body">
        <p className="chat-message__text">{message.text}</p>
        {message.actions && message.actions.length > 0 ? (
          <div className="chat-message__actions">
            {message.actions.map((action) =>
              action.to ? (
                <Link
                  key={action.label}
                  to={action.to}
                  className="chat-action"
                  onClick={onNavigate}
                >
                  {action.label}
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </Link>
              ) : (
                <a
                  key={action.label}
                  href={action.href}
                  className="chat-action"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {action.label}
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </a>
              ),
            )}
          </div>
        ) : null}
        <time className="chat-message__time" dateTime={new Date(message.createdAt).toISOString()}>
          {formatChatTime(message.createdAt)}
        </time>
      </div>
    </article>
  )
}
