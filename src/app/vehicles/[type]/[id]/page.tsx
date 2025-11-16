/**
 * Vehicle/Starship Detail Page
 * Display detailed information about a specific vehicle or starship
 */

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getVehicleById, getStarshipById } from "@/lib/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { VehicleDetails } from "@/components/explorers/VehicleDetails";
import { LoadingState } from "@/components/shared/LoadingState";
import type { Vehicle, Starship } from "@/lib/types";

interface VehicleDetailDisplayProps {
  item: (Vehicle | Starship) & { type: "vehicle" | "starship" };
}

function VehicleDetailDisplay({ item }: VehicleDetailDisplayProps) {
  return <VehicleDetails item={item} />;
}

async function VehicleDetailContent({
  type,
  id,
}: {
  type: string;
  id: string;
}) {
  let item: Vehicle | Starship;
  let hasError = false;

  try {
    if (type === "starship") {
      item = await getStarshipById(id);
    } else if (type === "vehicle") {
      item = await getVehicleById(id);
    } else {
      notFound();
    }
  } catch {
    hasError = true;
  }

  if (hasError) {
    notFound();
  }

  const itemWithType = {
    ...item!,
    type: type as "vehicle" | "starship",
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title={item!.name}
        description={`Explore the details of ${item!.name} from the Star Wars universe`}
        backButton={{
          label: "Back to Vehicles",
          href: "/vehicles",
        }}
      />

      {/* Vehicle Details */}
      <VehicleDetailDisplay item={itemWithType} />
    </>
  );
}

export default function VehicleDetailPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Vehicle Content with Loading State */}
      <Suspense fallback={<LoadingState variant="page" />}>
        <VehicleDetailContent type={params.type} id={params.id} />
      </Suspense>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { type: string; id: string };
}) {
  try {
    let item: Vehicle | Starship;
    if (params.type === "starship") {
      item = await getStarshipById(params.id);
    } else {
      item = await getVehicleById(params.id);
    }
    return {
      title: `${item.name} | SWAPI Agent`,
      description: `Detailed information about ${item.name} from the Star Wars universe`,
    };
  } catch {
    return {
      title: "Vehicle Not Found | SWAPI Agent",
      description: "The requested vehicle or starship could not be found",
    };
  }
}

