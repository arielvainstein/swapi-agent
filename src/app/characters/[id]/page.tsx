/**
 * Character Detail Page
 * Display detailed information about a specific character
 */

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPersonById } from "@/lib/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { CharacterDetails } from "@/components/explorers/CharacterDetails";
import { LoadingState } from "@/components/shared/LoadingState";
import type { Person } from "@/lib/types";

interface CharacterDetailDisplayProps {
  character: Person;
}

function CharacterDetailDisplay({ character }: CharacterDetailDisplayProps) {
  return <CharacterDetails character={character} />;
}

async function CharacterDetailContent({ id }: { id: string }) {
  let character: Person;
  let hasError = false;

  try {
    character = await getPersonById(id);
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
        title={character!.name}
        description={`Learn more about ${character!.name} from the Star Wars universe`}
        backButton={{
          label: "Back to Characters",
          href: "/characters",
        }}
      />

      {/* Character Details */}
      <CharacterDetailDisplay character={character!} />
    </>
  );
}

export default function CharacterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Character Content with Loading State */}
      <Suspense fallback={<LoadingState variant="page" />}>
        <CharacterDetailContent id={params.id} />
      </Suspense>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  try {
    const character = await getPersonById(params.id);
    return {
      title: `${character.name} | SWAPI Agent`,
      description: `Detailed information about ${character.name} from the Star Wars universe`,
    };
  } catch {
    return {
      title: "Character Not Found | SWAPI Agent",
      description: "The requested character could not be found",
    };
  }
}

