/**
 * PlanetDetails Component
 * Displays comprehensive planet information
 */

"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  Users,
  Droplets,
  Mountain,
  Cloud,
  Gauge,
  Clock,
  Calendar,
  Film,
  UserCircle,
} from "lucide-react";
import type { Planet } from "@/lib/types";

interface PlanetDetailsProps {
  planet: Planet;
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  variant?: "default" | "highlight";
}

function DetailRow({ icon, label, value, variant = "default" }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p
          className={`text-base font-semibold ${
            variant === "highlight" ? "text-primary" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

interface InfoSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function InfoSection({ title, icon, children }: InfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-primary">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function PlanetDetails({ planet }: PlanetDetailsProps) {
  // Helper to format large numbers
  const formatNumber = (num: string): string => {
    if (num === "unknown") return "Unknown";
    const parsed = parseInt(num, 10);
    if (isNaN(parsed)) return num;
    return parsed.toString();
  };

  // Helper to get climate badge colors
  const getClimateBadges = (climate: string) => {
    return climate.split(",").map((c) => c.trim());
  };

  const getTerrainBadges = (terrain: string) => {
    return terrain.split(",").map((t) => t.trim());
  };

  return (
    <div className="space-y-6">
      {/* Planet Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Planet Icon */}
          <div className="flex justify-center md:justify-start">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20">
              <Globe size={64} className="text-primary" />
            </div>
          </div>

          {/* Header Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{planet.name}</h1>
              <div className="flex flex-wrap gap-2">
                {getClimateBadges(planet.climate).map((climate, index) => (
                  <Badge
                    key={index}
                    className="bg-blue-500/10 text-blue-700 dark:text-blue-400 capitalize"
                  >
                    {climate}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {planet.residents.length}
                </p>
                <p className="text-xs text-muted-foreground">Residents</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {planet.films.length}
                </p>
                <p className="text-xs text-muted-foreground">Films</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {planet.surface_water !== "unknown"
                    ? `${planet.surface_water}%`
                    : "?"}
                </p>
                <p className="text-xs text-muted-foreground">Water</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {formatNumber(planet.population)}
                </p>
                <p className="text-xs text-muted-foreground">Population</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Physical Characteristics */}
      <Card className="p-6">
        <InfoSection
          title="Physical Characteristics"
          icon={<Mountain size={20} />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DetailRow
              icon={<Gauge size={18} />}
              label="Diameter"
              value={
                planet.diameter !== "unknown"
                  ? `${formatNumber(planet.diameter)} km`
                  : "Unknown"
              }
            />
            <DetailRow
              icon={<Gauge size={18} />}
              label="Gravity"
              value={planet.gravity !== "unknown" ? planet.gravity : "Unknown"}
            />
            <DetailRow
              icon={<Droplets size={18} />}
              label="Surface Water"
              value={
                planet.surface_water !== "unknown"
                  ? `${planet.surface_water}%`
                  : "Unknown"
              }
            />
            <DetailRow
              icon={<Users size={18} />}
              label="Population"
              value={formatNumber(planet.population)}
            />
          </div>

          {/* Terrain Tags */}
          <div className="pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Terrain Types
            </p>
            <div className="flex flex-wrap gap-2">
              {getTerrainBadges(planet.terrain).map((terrain, index) => (
                <Badge key={index} variant="outline" className="capitalize">
                  {terrain}
                </Badge>
              ))}
            </div>
          </div>
        </InfoSection>
      </Card>

      {/* Orbital & Climate Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <InfoSection title="Orbital Data" icon={<Clock size={20} />}>
            <DetailRow
              icon={<Calendar size={18} />}
              label="Rotation Period"
              value={
                planet.rotation_period !== "unknown"
                  ? `${planet.rotation_period} hours`
                  : "Unknown"
              }
            />
            <DetailRow
              icon={<Calendar size={18} />}
              label="Orbital Period"
              value={
                planet.orbital_period !== "unknown"
                  ? `${planet.orbital_period} days`
                  : "Unknown"
              }
            />
          </InfoSection>
        </Card>

        <Card className="p-6">
          <InfoSection title="Climate & Environment" icon={<Cloud size={20} />}>
            <div className="space-y-2">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Climate
                </p>
                <div className="flex flex-wrap gap-2">
                  {getClimateBadges(planet.climate).map((climate, index) => (
                    <Badge key={index} variant="secondary" className="capitalize">
                      {climate}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Gravity
                </p>
                <p className="font-semibold">{planet.gravity}</p>
              </div>
            </div>
          </InfoSection>
        </Card>
      </div>

      {/* Residents & Films */}
      <Card className="p-6">
        <InfoSection title="Associations" icon={<Film size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <UserCircle size={18} className="text-muted-foreground" />
                <span className="font-medium">Notable Residents</span>
              </div>
              <Badge>{planet.residents.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Film size={18} className="text-muted-foreground" />
                <span className="font-medium">Film Appearances</span>
              </div>
              <Badge>{planet.films.length}</Badge>
            </div>
          </div>
        </InfoSection>
      </Card>

      {/* Remove the Separator and Metadata Card sections */}
    </div>
  );
}

