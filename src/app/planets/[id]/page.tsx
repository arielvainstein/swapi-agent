/**
 * Planet Detail Page
 * Display detailed information about a specific planet
 */

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlanetById } from "@/lib/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { PlanetDetails } from "@/components/explorers/PlanetDetails";
import { LoadingState } from "@/components/shared/LoadingState";
import type { Planet } from "@/lib/types";

interface PlanetDetailDisplayProps {
  planet: Planet;
}

function PlanetDetailDisplay({ planet }: PlanetDetailDisplayProps) {
  return <PlanetDetails planet={planet} />;
}

async function PlanetDetailContent({ id }: { id: string }) {
  let planet: Planet;
  let hasError = false;

  try {
    planet = await getPlanetById(id);
  } catch {
    hasError = true;
  }

  if (hasError) {
    notFound();
  }

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title={planet!.name}
        description={`Explore the details of ${planet!.name} from the Star Wars universe`}
        backButton={{
          label: "Back to Planets",
          href: "/planets",
        }}
      />

      {/* Planet Details */}
      <PlanetDetailDisplay planet={planet!} />
    </>
  );
}

export default async function PlanetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Planet Content with Loading State */}
      <Suspense fallback={<LoadingState variant="page" />}>
        <PlanetDetailContent id={id} />
      </Suspense>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const planet = await getPlanetById(id);
    return {
      title: `${planet.name} | SWAPI Agent`,
      description: `Detailed information about ${planet.name} from the Star Wars universe`,
    };
  } catch {
    return {
      title: "Planet Not Found | SWAPI Agent",
      description: "The requested planet could not be found",
    };
  }
}

