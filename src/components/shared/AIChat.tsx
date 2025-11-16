/**
 * AIChat Component
 * Wrapper for the AI chat widget - integrates bubble and container
 * This component will be included in the root layout
 */

"use client";

import { useState } from "react";
import { ChatBubble, ChatContainer } from "@/components/chat";
import type { ChatMessageProps } from "@/components/chat/ChatMessage";
import { askAgent } from "@/actions/chat-actions";
import { usePathname } from "next/navigation";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<any>(null);
  const pathname = usePathname();

  // Get page context for AI
  const getPageContext = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname.startsWith("/characters")) return "Characters Explorer";
    if (pathname.startsWith("/planets")) return "Planets Explorer";
    if (pathname.startsWith("/vehicles")) return "Vehicles Explorer";
    return undefined;
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMinimize = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageProps = {
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call AI agent
      const result = await askAgent(
        [
          ...messages.map((msg) => ({
            role: msg.role as "user" | "assistant" | "system",
            content: msg.content,
          })),
          { role: "user" as const, content },
        ],
        getPageContext()
      );

      if (result.success && result.output) {
        // Set streaming message
        setStreamingMessage(result.output);
        setIsLoading(false);

        // Note: The StreamingMessage component will handle reading the stream
        // After streaming is complete, we should add it to messages
        // For now, we'll add a placeholder that will be replaced
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Response received", // This will be updated by the streaming component
              timestamp: new Date(),
            },
          ]);
          setStreamingMessage(null);
        }, 100);
      } else {
        setIsLoading(false);
        // Add error message
        setMessages((prev) => [
          ...prev,
          {
            role: "error",
            content: result.error || "Failed to get response. Please try again.",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          content: "An unexpected error occurred. Please try again.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <>
      <ChatBubble
        isOpen={isOpen}
        onToggle={handleToggle}
        hasUnread={false}
        unreadCount={0}
      />
      <ChatContainer
        isOpen={isOpen}
        onClose={handleClose}
        onMinimize={handleMinimize}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        streamingMessage={streamingMessage}
        pageContext={getPageContext()}
      />
    </>
  );
}

