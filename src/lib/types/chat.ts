/**
 * TypeScript types for chat functionality
 */

// Message roles
export type MessageRole = 'user' | 'assistant' | 'system' | 'error';

// Chat message
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: {
    context?: string; // Current page context
    toolCalls?: string[]; // AI tool calls made
    error?: string; // Error message if any
  };
}

// Conversation
export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Chat state
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

// Tool call result
export interface ToolCallResult {
  toolName: string;
  result: unknown;
  success: boolean;
  error?: string;
}

