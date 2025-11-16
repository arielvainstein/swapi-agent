/**
 * ChatBubble Component
 * Floating chat button that opens the chat interface
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ChatBubbleProps {
  isOpen: boolean;
  onToggle: () => void;
  hasUnread?: boolean;
  unreadCount?: number;
}

export function ChatBubble({
  isOpen,
  onToggle,
  hasUnread = false,
  unreadCount = 0,
}: ChatBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
              "fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-2xl z-40 transition-all",
              isOpen && "scale-0 opacity-0 pointer-events-none"
            )}
            size="icon"
          >
            {/* Icon */}
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}

            {/* Unread Badge */}
            {hasUnread && unreadCount > 0 && !isOpen && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}

            {/* Pulse Effect for New Messages */}
            {hasUnread && !isOpen && (
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{isOpen ? "Close chat" : "Open Star Wars AI Assistant"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

