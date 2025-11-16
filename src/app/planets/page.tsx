/**
 * Planets Explorer Page
 * Browse and search Star Wars planets
 */

import { Suspense } from "react";
import { getAllPlanets } from "@/lib/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { PlanetList } from "@/components/explorers/PlanetList";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import type { Planet } from "@/lib/types";

interface PlanetsDisplayProps {
  planets: Planet[];
}

function PlanetsDisplay({ planets }: PlanetsDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Count Badge */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-sm">
          {planets.length} planets found
        </Badge>
      </div>

      {/* Planets Grid */}
      <PlanetList planets={planets} />
    </div>
  );
}

async function PlanetsContent() {
  let planets: Planet[];
  let hasError = false;

  try {
    planets = await getAllPlanets();
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <ErrorState
        message="Failed to load planets. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <PlanetsDisplay planets={planets!} />;
}

export default function PlanetsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Planets"
        description="Explore all planets from the Star Wars universe"
      />

      {/* Planets Content with Loading State */}
      <Suspense fallback={<LoadingState variant="card" count={8} />}>
        <PlanetsContent />
      </Suspense>
    </div>
  );
}
