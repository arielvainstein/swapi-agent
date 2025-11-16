/**
 * PlanetList Component
 * Displays a grid of planet cards
 */

import { PlanetCard } from "./PlanetCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Planet } from "@/lib/types";

export interface PlanetListProps {
  planets: Planet[];
}

export function PlanetList({ planets }: PlanetListProps) {
  if (planets.length === 0) {
    return (
      <EmptyState
        title="No planets found"
        description="No planets match your search criteria."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {planets.map((planet) => (
        <PlanetCard key={planet.url} planet={planet} />
      ))}
    </div>
  );
}

