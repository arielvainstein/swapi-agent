/**
 * StreamingMessage Component
 * Displays AI message as it's being streamed in real-time
 */

"use client";

import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { readStreamableValue } from "ai/rsc";

export interface StreamingMessageProps {
  streamableValue: any; // Streamable value from server action
}

export function StreamingMessage({ streamableValue }: StreamingMessageProps) {
  const [content, setContent] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        for await (const delta of readStreamableValue(streamableValue)) {
          if (delta) {
            setContent((prev) => prev + delta);
          }
        }
      } catch (error) {
        console.error("Error reading stream:", error);
      }
    })();
  }, [streamableValue]);

  // Auto-scroll when content updates
  useEffect(() => {
    if (contentRef.current) {
      // Find the scrollable parent container
      const scrollContainer = contentRef.current.closest('[class*="overflow-y-auto"]') as HTMLElement;
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [content]);

  return (
    <div ref={contentRef} className="flex gap-3 mb-4">
      {/* Avatar */}
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className="bg-muted text-muted-foreground">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className="flex flex-col max-w-[80%]">
        <Card className="bg-muted text-foreground px-4 py-3">
          <div className="text-sm whitespace-pre-wrap break-words">
            {content}
            {/* Cursor indicator */}
            <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
          </div>
        </Card>
      </div>
    </div>
  );
}

