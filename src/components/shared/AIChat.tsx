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
import { StreamableValue } from "ai/rsc";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<StreamableValue<string> | null>(null);
  const pathname = usePathname();

  // Get page context for AI
  const getPageContext = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname.startsWith("/characters")) return "Characters Explorer";
    if (pathname.startsWith("/planets")) return "Planets Explorer";
    if (pathname.startsWith("/vehicles")) return "Vehicles Explorer";
    return undefined;
  };

  // Helper: Add message to chat
  const addMessage = (message: ChatMessageProps) => {
    setMessages((prev) => [...prev, message]);
  };

  // Helper: Add error message
  const addErrorMessage = (content: string) => {
    addMessage({
      role: "error",
      content,
      timestamp: new Date(),
    });
  };

  // Helper: Read stream and add final message
  const handleStreamComplete = async (streamableValue: StreamableValue<string>) => {
    try {
      // Lazy import here avoid bundling server-only code into client bundle
      const { readStreamableValue } = await import("ai/rsc");
      let fullContent = "";

      for await (const delta of readStreamableValue(streamableValue)) {
        if (delta) {
          fullContent += delta;
        }
      }

      // Stream is complete, add the actual content to messages
      addMessage({
        role: "assistant",
        content: fullContent,
        timestamp: new Date(),
      });
      setStreamingMessage(null);
    } catch (error) {
      console.error("Error reading stream:", error);
      addErrorMessage("Failed to read stream. Please try again.");
      setStreamingMessage(null);
    }
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
    addMessage({
      role: "user",
      content,
      timestamp: new Date(),
    });
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
        // Set streaming message and handle completion
        setStreamingMessage(result.output);
        setIsLoading(false);
        handleStreamComplete(result.output);
      } else {
        setIsLoading(false);
        addErrorMessage(
          result.error || "Failed to get response. Please try again."
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending message:", error);
      addErrorMessage("An unexpected error occurred. Please try again.");
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
        streamingMessage={streamingMessage ?? undefined}
        pageContext={getPageContext()}
      />
    </>
  );
}

