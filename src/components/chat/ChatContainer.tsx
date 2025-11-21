/**
 * ChatContainer Component
 * Main container for the chat interface with message list and input
 */

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { SuggestedPrompts } from "@/components/shared/SuggestedPrompts";
import { StreamingMessage } from "./StreamingMessage";
import { TypingIndicator } from "./TypingIndicator";
import type { ChatMessageProps } from "./ChatMessage";

export interface ChatContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  messages: ChatMessageProps[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  streamingMessage?: any; // Streamable value
  pageContext?: string;
}

export function ChatContainer({
  isOpen,
  onClose,
  onMinimize,
  messages,
  onSendMessage,
  isLoading = false,
  streamingMessage,
  pageContext,
}: ChatContainerProps) {
  const [showSuggestions, setShowSuggestions] = useState(messages.length === 0);

  const handleSendMessage = (message: string) => {
    setShowSuggestions(false);
    onSendMessage(message);
  };

  const handleSelectPrompt = (prompt: string) => {
    setShowSuggestions(false);
    onSendMessage(prompt);
  };

  const handleClearHistory = () => {
    // This would be handled by parent component
    setShowSuggestions(true);
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-[400px] h-[600px] flex flex-col shadow-2xl z-50 md:w-[450px] md:h-[650px]">
      {/* Header */}
      <ChatHeader
        onMinimize={onMinimize}
        onClose={onClose}
        onClearHistory={messages.length > 0 ? handleClearHistory : undefined}
        title={pageContext ? `AI Assistant - ${pageContext}` : "Star Wars AI Assistant"}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showSuggestions && messages.length === 0 ? (
          /* Welcome Screen with Suggested Prompts */
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">
                Welcome to Star Wars AI! 🌟
              </h2>
              <p className="text-muted-foreground mb-6">
                Ask me anything about the Star Wars universe. I have access to the
                complete SWAPI database.
              </p>
            </div>
            <SuggestedPrompts onSelect={handleSelectPrompt} />
          </div>
        ) : (
          /* Message List with streaming support */
          <MessageList 
            messages={messages} 
            isLoading={isLoading}
            streamingMessage={streamingMessage}
          />
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSendMessage}
        isLoading={isLoading}
        disabled={isLoading}
        placeholder="Ask about Star Wars..."
      />
    </Card>
  );
}

