/**
 * QuickActions Component
 * Quick action buttons on stat cards (Ask AI about this)
 */

"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface QuickActionsProps {
  onAskAI: () => void;
  subject: string;
}

export function QuickActions({ onAskAI, subject }: QuickActionsProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onAskAI();
            }}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ask AI about {subject}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

