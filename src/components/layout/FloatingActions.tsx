import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { ChatbotWidget } from '../chatbot/ChatbotWidget'

/**
 * Shared floating dock. Both actions live in one column, so the assistant and
 * the WhatsApp link can never overlap each other.
 */
export function FloatingActions() {
  return (
    <div className="floating-dock">
      <ChatbotWidget />
      <Link
        to="/contact#whatsapp"
        className="floating-contact"
        aria-label="WhatsApp contact details"
        title="WhatsApp contact details"
      >
        <span className="floating-contact__pulse" aria-hidden="true" />
        <MessageCircle size={20} strokeWidth={1.9} />
        <span className="floating-contact__label">WhatsApp</span>
      </Link>
    </div>
  )
}
