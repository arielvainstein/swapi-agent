/**
 * PlanetCard Component
 * Displays a planet card with key information
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Droplets, Mountain } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Planet } from "@/lib/types";
import { extractIdFromUrl } from "@/lib/api";

export interface PlanetCardProps {
  planet: Planet;
}

export function PlanetCard({ planet }: PlanetCardProps) {
  const router = useRouter();
  const planetId = extractIdFromUrl(planet.url);

  // Helper to format large numbers
  const formatNumber = (num: string): string => {
    if (num === "unknown") return "Unknown";
    const parsed = parseInt(num, 10);
    if (isNaN(parsed)) return num;
    return parsed.toString();
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
      onClick={() => router.push(`/planets/${planetId}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {/* Planet Icon */}
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Globe className="h-6 w-6 text-primary" />
          </div>

          {/* Name and Climate */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{planet.name}</CardTitle>
            <Badge variant="secondary" className="mt-1 capitalize">
              {planet.climate.split(",")[0].trim()}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Population */}
        {planet.population !== "unknown" && (
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Population:</span>
            <span className="font-medium">{formatNumber(planet.population)}</span>
          </div>
        )}

        {/* Terrain */}
        {planet.terrain !== "unknown" && (
          <div className="flex items-center gap-2 text-sm">
            <Mountain className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Terrain:</span>
            <span className="font-medium capitalize truncate">
              {planet.terrain.split(",")[0].trim()}
            </span>
          </div>
        )}

        {/* Surface Water */}
        {planet.surface_water !== "unknown" && (
          <div className="flex items-center gap-2 text-sm">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Surface Water:</span>
            <span className="font-medium">{planet.surface_water}%</span>
          </div>
        )}

        {/* Orbital Period & Rotation */}
        <div className="flex flex-wrap gap-1 pt-2 border-t">
          {planet.orbital_period !== "unknown" && (
            <Badge variant="outline" className="text-xs">
              {planet.orbital_period} days orbit
            </Badge>
          )}
          {planet.rotation_period !== "unknown" && (
            <Badge variant="outline" className="text-xs">
              {planet.rotation_period}h rotation
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

