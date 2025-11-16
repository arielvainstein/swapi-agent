/**
 * Vehicles & Starships Explorer Page
 * Browse all vehicles and starships from Star Wars
 */

import { Suspense } from "react";
import { getAllVehicles, getAllStarships } from "@/lib/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { VehicleList } from "@/components/explorers/VehicleList";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import type { Vehicle, Starship } from "@/lib/types";

interface VehiclesDisplayProps {
  vehicles: Vehicle[];
  starships: Starship[];
}

function VehiclesDisplay({ vehicles, starships }: VehiclesDisplayProps) {
  // Combine vehicles and starships
  const combined = [
    ...vehicles.map((v) => ({ ...v, type: "vehicle" as const })),
    ...starships.map((s) => ({ ...s, type: "starship" as const })),
  ];

  return (
    <div className="space-y-6">
      {/* Count Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className="text-sm">
          {combined.length} total items
        </Badge>
        <Badge variant="outline" className="text-sm">
          {vehicles.length} vehicles
        </Badge>
        <Badge variant="outline" className="text-sm">
          {starships.length} starships
        </Badge>
      </div>

      {/* Vehicles Grid */}
      <VehicleList items={combined} />
    </div>
  );
}

async function VehiclesContent() {
  let vehicles: Vehicle[];
  let starships: Starship[];
  let hasError = false;

  try {
    [vehicles, starships] = await Promise.all([
      getAllVehicles(),
      getAllStarships(),
    ]);
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <ErrorState
        message="Failed to load vehicles and starships. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <VehiclesDisplay vehicles={vehicles!} starships={starships!} />;
}

export default function VehiclesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Vehicles & Starships"
        description="Explore all vehicles and starships from the Star Wars universe"
      />

      {/* Vehicles Content with Loading State */}
      <Suspense fallback={<LoadingState variant="card" count={8} />}>
        <VehiclesContent />
      </Suspense>
    </div>
  );
}
