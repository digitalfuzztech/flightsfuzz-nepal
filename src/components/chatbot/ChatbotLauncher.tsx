import { Sparkles } from 'lucide-react'
import { cn } from '../../lib/utils/format'

interface ChatbotLauncherProps {
  open: boolean
  hasUnread: boolean
  onClick: () => void
}

export function ChatbotLauncher({ open, hasUnread, onClick }: ChatbotLauncherProps) {
  return (
    <button
      id="flightsfuzz-chat-launcher"
      type="button"
      className={cn('chatbot-launcher', open && 'is-open')}
      onClick={onClick}
      aria-label={
        open
          ? 'Close the FlightsFuzz assistant'
          : hasUnread
            ? 'Open the FlightsFuzz assistant, new message'
            : 'Open the FlightsFuzz assistant'
      }
      aria-expanded={open}
      aria-controls="flightsfuzz-chat-panel"
    >
      <span className="chatbot-launcher__glow" aria-hidden="true" />
      <span className="chatbot-launcher__icon" aria-hidden="true">
        <Sparkles size={22} strokeWidth={2} />
      </span>
      {hasUnread ? <span className="chatbot-launcher__dot" aria-hidden="true" /> : null}
      <span className="chatbot-launcher__tooltip" role="tooltip">
        Need help? Ask FlightsFuzz
      </span>
    </button>
  )
}
