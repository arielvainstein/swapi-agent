/**
 * StatsOverview Component
 * Displays statistics cards for the dashboard
 */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, Rocket, Ship } from "lucide-react";
import { useRouter } from "next/navigation";
import { QuickActions } from "./QuickActions";
import type { LucideIcon } from "lucide-react";

export interface StatsOverviewProps {
  totalCharacters: number;
  totalPlanets: number;
  totalStarships: number;
  totalVehicles: number;
  onAskAI?: (subject: string, query: string) => void;
}

interface StatItemProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  onClick: () => void;
  onAskAI?: () => void;
  subject: string;
}

function StatItem({
  title,
  value,
  icon: Icon,
  description,
  onClick,
  onAskAI,
  subject,
}: StatItemProps) {
  return (
    <Card
      className="transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              {onAskAI && (
                <QuickActions onAskAI={onAskAI} subject={subject} />
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{value}</p>
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsOverview({
  totalCharacters,
  totalPlanets,
  totalStarships,
  totalVehicles,
  onAskAI,
}: StatsOverviewProps) {
  const router = useRouter();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatItem
        title="Total Characters"
        value={totalCharacters}
        icon={Users}
        description="In the galaxy"
        onClick={() => router.push("/characters")}
        onAskAI={
          onAskAI
            ? () =>
                onAskAI(
                  "characters",
                  `Tell me about the ${totalCharacters} characters in the Star Wars database`
                )
            : undefined
        }
        subject="characters"
      />
      <StatItem
        title="Total Planets"
        value={totalPlanets}
        icon={Globe}
        description="Across the universe"
        onClick={() => router.push("/planets")}
        onAskAI={
          onAskAI
            ? () =>
                onAskAI(
                  "planets",
                  `Tell me about the ${totalPlanets} planets in the Star Wars galaxy`
                )
            : undefined
        }
        subject="planets"
      />
      <StatItem
        title="Starships"
        value={totalStarships}
        icon={Rocket}
        description="Space vessels"
        onClick={() => router.push("/vehicles")}
        onAskAI={
          onAskAI
            ? () =>
                onAskAI(
                  "starships",
                  `What are the most notable starships among the ${totalStarships} in the database?`
                )
            : undefined
        }
        subject="starships"
      />
      <StatItem
        title="Vehicles"
        value={totalVehicles}
        icon={Ship}
        description="Ground & atmospheric"
        onClick={() => router.push("/vehicles")}
        onAskAI={
          onAskAI
            ? () =>
                onAskAI(
                  "vehicles",
                  `Tell me about the ${totalVehicles} vehicles in Star Wars`
                )
            : undefined
        }
        subject="vehicles"
      />
    </div>
  );
}

