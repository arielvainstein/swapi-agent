/**
 * MessageList Component
 * Scrollable container for chat messages with auto-scroll
 */

"use client";

import { useEffect, useRef } from "react";
import { ChatMessage, type ChatMessageProps } from "./ChatMessage";
import { Loader } from "lucide-react";
import { StreamingMessage } from "./StreamingMessage";

export interface MessageListProps {
  messages: ChatMessageProps[];
  isLoading?: boolean;
  streamingMessage?: any; // Streamable value
}

export function MessageList({ 
  messages, 
  isLoading = false,
  streamingMessage 
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Simple auto-scroll to bottom when content changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.length === 0 && !streamingMessage ? (
        <div className="flex items-center justify-center h-full text-center">
          <div className="text-muted-foreground">
            <p className="text-lg font-medium mb-2">
              No messages yet
            </p>
            <p className="text-sm">
              Start a conversation about the Star Wars universe!
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
              isStreaming={message.isStreaming}
            />
          ))}
          
          {/* Streaming Message */}
          {streamingMessage && (
            <div className="mb-4">
              <StreamingMessage streamableValue={streamingMessage} />
            </div>
          )}
          
          {/* Typing Indicator */}
          {isLoading && !streamingMessage && (
            <div className="mb-4">
              <Loader className="animate-spin" />
            </div>
          )}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

