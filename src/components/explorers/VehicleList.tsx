/**
 * VehicleList Component
 * Displays a grid of vehicle and starship cards
 */

import { VehicleCard } from "./VehicleCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Vehicle, Starship } from "@/lib/types";

export interface VehicleListProps {
  items: ((Vehicle | Starship) & { type: "vehicle" | "starship" })[];
}

export function VehicleList({ items }: VehicleListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No vehicles or starships found"
        description="No items match your search criteria."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <VehicleCard key={item.url} item={item} />
      ))}
    </div>
  );
}

