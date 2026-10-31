import type { ChatAction } from '../../lib/chatbot/responseHandler'

export interface ChatMessageModel {
  id: string
  role: 'assistant' | 'user'
  text: string
  createdAt: number
  actions?: ChatAction[]
}

export const formatChatTime = (timestamp: number): string =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(timestamp)
