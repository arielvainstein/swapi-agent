/**
 * Characters Explorer Page
 * Browse and search Star Wars characters
 */

import { Suspense } from "react";
import { getAllPeople } from "@/lib/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { CharacterList } from "@/components/explorers/CharacterList";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import type { Person } from "@/lib/types";

interface CharactersDisplayProps {
  characters: Person[];
}

function CharactersDisplay({ characters }: CharactersDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Count Badge */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-sm">
          {characters.length} characters found
        </Badge>
      </div>

      {/* Characters Grid */}
      <CharacterList characters={characters} />
    </div>
  );
}

async function CharactersContent() {
  let characters: Person[];
  let hasError = false;

  try {
    characters = await getAllPeople();
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <ErrorState
        message="Failed to load characters. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <CharactersDisplay characters={characters!} />;
}

export default function CharactersPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Characters"
        description="Explore all characters from the Star Wars universe"
      />

      {/* Characters Content with Loading State */}
      <Suspense fallback={<LoadingState variant="card" count={8} />}>
        <CharactersContent />
      </Suspense>
    </div>
  );
}

