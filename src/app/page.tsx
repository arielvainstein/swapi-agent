/**
 * Dashboard Page
 * Main landing page with galaxy statistics and top vehicles
 */

import { Suspense } from "react";
import { fetchDashboardStats } from "@/actions/dashboard-actions";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { TopVehiclesCard } from "@/components/dashboard/TopVehiclesCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";

async function DashboardContent() {
  const result = await fetchDashboardStats();

  if (result.error || !result.data) {
    return (
      <ErrorState
        message={result.error || "Failed to load dashboard data"}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const { totalCharacters, totalPlanets, totalStarships, totalVehicles, topVehicles } =
    result.data;

  return (
    <div className="space-y-8">
      {/* Statistics Overview */}
      <StatsOverview
        totalCharacters={totalCharacters}
        totalPlanets={totalPlanets}
        totalStarships={totalStarships}
        totalVehicles={totalVehicles}
      />

      {/* Top Vehicles */}
      <TopVehiclesCard vehicles={topVehicles} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Star Wars Galaxy Dashboard"
        description="Explore the complete SWAPI database with real-time statistics and rankings"
      />

      {/* Dashboard Content with Loading State */}
      <Suspense fallback={<LoadingState variant="page" />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
