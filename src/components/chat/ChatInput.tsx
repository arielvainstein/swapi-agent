/**
 * ChatInput Component
 * Message input field with send button and keyboard shortcuts
 */

"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export function ChatInput({
  onSend,
  disabled = false,
  isLoading = false,
  placeholder = "Ask about Star Wars...",
  maxLength = 1000,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || disabled || isLoading) return;

    onSend(trimmedInput);
    setInput("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setInput(value);
    }

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const isDisabled = disabled || isLoading;
  const canSend = input.trim().length > 0 && !isDisabled;

  return (
    <div className="border-t bg-background p-4">
      <div className="flex gap-2 max-w-4xl mx-auto">
        {/* Input Field */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isDisabled}
            className={cn(
              "min-h-[44px] max-h-[200px] resize-none pr-12",
              "focus-visible:ring-1"
            )}
            rows={1}
          />

          {/* Character Count */}
          {input.length > maxLength * 0.8 && (
            <span
              className={cn(
                "absolute bottom-2 right-2 text-xs",
                input.length >= maxLength
                  ? "text-destructive"
                  : "text-muted-foreground"
              )}
            >
              {input.length}/{maxLength}
            </span>
          )}
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!canSend}
          size="icon"
          className="h-[44px] w-[44px] shrink-0"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Helper Text */}
      <div className="flex justify-between items-center mt-2 px-1 max-w-4xl mx-auto">
        <p className="text-xs text-muted-foreground">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to
          send, <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Shift+Enter</kbd>{" "}
          for new line
        </p>
      </div>
    </div>
  );
}

