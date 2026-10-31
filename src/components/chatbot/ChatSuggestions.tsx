import { ArrowUpRight } from 'lucide-react'
import { SUGGESTED_PROMPTS } from '../../lib/chatbot/responseHandler'

interface ChatSuggestionsProps {
  onSelect: (prompt: string) => void
  disabled?: boolean
}

const PRIMARY_PROMPTS = SUGGESTED_PROMPTS.slice(0, 5)

export function ChatSuggestions({ onSelect, disabled = false }: ChatSuggestionsProps) {
  return (
    <div className="chat-suggestions" aria-label="Suggested questions">
      <p className="chat-suggestions__label">Suggested questions</p>
      <div className="chat-suggestions__list">
        {PRIMARY_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="chat-suggestion"
            onClick={() => onSelect(prompt)}
            disabled={disabled}
          >
            {prompt}
            <ArrowUpRight size={12} strokeWidth={2.2} />
          </button>
        ))}
      </div>
    </div>
  )
}
