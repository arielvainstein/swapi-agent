/**
 * VehicleDetails Component
 * Displays comprehensive vehicle or starship information
 */

"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Car,
  Rocket,
  Users,
  DollarSign,
  Gauge,
  Package,
  Calendar,
  Film,
  UserCircle,
  Star,
} from "lucide-react";
import type { Vehicle, Starship } from "@/lib/types";

interface VehicleDetailsProps {
  item: (Vehicle | Starship) & { type: "vehicle" | "starship" };
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

export function VehicleDetails({ item }: VehicleDetailsProps) {
  const isStarship = item.type === "starship";

  // Helper to format numbers
  const formatNumber = (num: string): string => {
    if (num === "unknown" || num === "n/a") return "Unknown";
    const parsed = parseInt(num.replace(/,/g, ""), 10);
    if (isNaN(parsed)) return num;
    return parsed.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Icon */}
          <div className="flex justify-center md:justify-start">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20">
              {isStarship ? (
                <Rocket size={64} className="text-primary" />
              ) : (
                <Car size={64} className="text-primary" />
              )}
            </div>
          </div>

          {/* Header Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={
                    isStarship
                      ? "bg-purple-500/10 text-purple-700 dark:text-purple-400"
                      : "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                  }
                >
                  {isStarship ? "Starship" : "Vehicle"}
                </Badge>
                <Badge variant="outline">{item.vehicle_class || "Unknown Class"}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {item.crew !== "unknown" ? item.crew : "?"}
                </p>
                <p className="text-xs text-muted-foreground">Crew</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {item.passengers !== "unknown" ? formatNumber(item.passengers) : "?"}
                </p>
                <p className="text-xs text-muted-foreground">Passengers</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {item.films.length}
                </p>
                <p className="text-xs text-muted-foreground">Films</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {item.pilots.length}
                </p>
                <p className="text-xs text-muted-foreground">Pilots</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Technical Specifications */}
      <Card className="p-6">
        <InfoSection
          title="Technical Specifications"
          icon={<Package size={20} />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DetailRow
              icon={<Package size={18} />}
              label="Model"
              value={item.model !== "unknown" ? item.model : "Unknown"}
            />
            <DetailRow
              icon={<Package size={18} />}
              label="Manufacturer"
              value={item.manufacturer !== "unknown" ? item.manufacturer : "Unknown"}
            />
            <DetailRow
              icon={<DollarSign size={18} />}
              label="Cost"
              value={
                item.cost_in_credits !== "unknown"
                  ? `${formatNumber(item.cost_in_credits)} credits`
                  : "Unknown"
              }
            />
            <DetailRow
              icon={<Gauge size={18} />}
              label="Length"
              value={
                item.length !== "unknown"
                  ? `${item.length} meters`
                  : "Unknown"
              }
            />
          </div>
        </InfoSection>
      </Card>

      {/* Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <InfoSection title="Performance" icon={<Gauge size={20} />}>
            <DetailRow
              icon={<Gauge size={18} />}
              label="Max Atmosphering Speed"
              value={
                item.max_atmosphering_speed !== "unknown" &&
                item.max_atmosphering_speed !== "n/a"
                  ? item.max_atmosphering_speed
                  : "Unknown"
              }
            />
            {isStarship && "hyperdrive_rating" in item && (
              <>
                <DetailRow
                  icon={<Star size={18} />}
                  label="Hyperdrive Rating"
                  value={
                    item.hyperdrive_rating !== "unknown"
                      ? item.hyperdrive_rating
                      : "Unknown"
                  }
                />
                <DetailRow
                  icon={<Star size={18} />}
                  label="MGLT"
                  value={
                    item.MGLT !== "unknown" ? item.MGLT : "Unknown"
                  }
                />
              </>
            )}
          </InfoSection>
        </Card>

        <Card className="p-6">
          <InfoSection title="Capacity" icon={<Users size={20} />}>
            <DetailRow
              icon={<Users size={18} />}
              label="Crew Required"
              value={item.crew !== "unknown" ? item.crew : "Unknown"}
            />
            <DetailRow
              icon={<Users size={18} />}
              label="Passengers"
              value={
                item.passengers !== "unknown"
                  ? formatNumber(item.passengers)
                  : "Unknown"
              }
            />
            <DetailRow
              icon={<Package size={18} />}
              label="Cargo Capacity"
              value={
                item.cargo_capacity !== "unknown"
                  ? `${formatNumber(item.cargo_capacity)} kg`
                  : "Unknown"
              }
            />
            <DetailRow
              icon={<Calendar size={18} />}
              label="Consumables"
              value={item.consumables !== "unknown" ? item.consumables : "Unknown"}
            />
          </InfoSection>
        </Card>
      </div>

      {/* Starship-specific info */}
      {isStarship && "starship_class" in item && (
        <Card className="p-6">
          <InfoSection title="Starship Classification" icon={<Star size={20} />}>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Starship Class
              </p>
              <p className="font-semibold capitalize">{item.starship_class}</p>
            </div>
          </InfoSection>
        </Card>
      )}

      {/* Associations */}
      <Card className="p-6">
        <InfoSection title="Appearances & Associations" icon={<Film size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Film size={18} className="text-muted-foreground" />
                <span className="font-medium">Film Appearances</span>
              </div>
              <Badge>{item.films.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <UserCircle size={18} className="text-muted-foreground" />
                <span className="font-medium">Known Pilots</span>
              </div>
              <Badge>{item.pilots.length}</Badge>
            </div>
          </div>
        </InfoSection>
      </Card>

      <Separator />

      {/* Metadata */}
      <Card className="p-4 bg-muted/30">
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {new Date(item.created).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Last Modified:</span>{" "}
            {new Date(item.edited).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">URL:</span>{" "}
            <code className="text-xs">{item.url}</code>
          </div>
        </div>
      </Card>
    </div>
  );
}

