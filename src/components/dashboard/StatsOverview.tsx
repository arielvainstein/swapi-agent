/**
 * StatsOverview Component
 * Displays statistics cards for the dashboard
 */

"use client";

import { StatCard } from "@/components/shared/StatCard";
import { Users, Globe, Rocket, Ship } from "lucide-react";
import { useRouter } from "next/navigation";

export interface StatsOverviewProps {
  totalCharacters: number;
  totalPlanets: number;
  totalStarships: number;
  totalVehicles: number;
}

export function StatsOverview({
  totalCharacters,
  totalPlanets,
  totalStarships,
  totalVehicles,
}: StatsOverviewProps) {
  const router = useRouter();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Characters"
        value={totalCharacters}
        icon={Users}
        description="In the galaxy"
        onClick={() => router.push("/characters")}
      />
      <StatCard
        title="Total Planets"
        value={totalPlanets}
        icon={Globe}
        description="Across the universe"
        onClick={() => router.push("/planets")}
      />
      <StatCard
        title="Starships"
        value={totalStarships}
        icon={Rocket}
        description="Space vessels"
        onClick={() => router.push("/vehicles")}
      />
      <StatCard
        title="Vehicles"
        value={totalVehicles}
        icon={Ship}
        description="Ground & atmospheric"
        onClick={() => router.push("/vehicles")}
      />
    </div>
  );
}

