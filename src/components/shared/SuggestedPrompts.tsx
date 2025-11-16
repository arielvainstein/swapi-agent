/**
 * SuggestedPrompts Component
 * Displays example questions users can click to start conversations
 */

"use client";

import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
  prompts?: string[];
}

const DEFAULT_PROMPTS = [
  "Tell me about Luke Skywalker",
  "What planets have desert climates?",
  "Show me the fastest starships",
  "How many characters are in the Star Wars universe?",
  "Compare the Millennium Falcon and X-wing",
  "What species is Chewbacca?",
];

export function SuggestedPrompts({
  onSelect,
  prompts = DEFAULT_PROMPTS,
}: SuggestedPromptsProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4" />
        <span>Suggested questions</span>
      </div>

      <div className="grid gap-2">
        {prompts.map((prompt, index) => (
          <Card
            key={index}
            className="p-3 hover:bg-accent cursor-pointer transition-colors"
            onClick={() => onSelect(prompt)}
          >
            <p className="text-sm">{prompt}</p>
          </Card>
        ))}
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Click any question above or type your own!
      </div>
    </div>
  );
}

