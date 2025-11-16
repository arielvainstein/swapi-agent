/**
 * CharacterList Component
 * Displays a grid of character cards
 */

"use client";

import { CharacterCard } from "./CharacterCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Person } from "@/lib/types";
import { Users } from "lucide-react";

export interface CharacterListProps {
  characters: Person[];
}

export function CharacterList({ characters }: CharacterListProps) {
  if (characters.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No characters found"
        description="Try adjusting your search or filters to find what you're looking for."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.url} character={character} />
      ))}
    </div>
  );
}

