/**
 * VehicleCard Component
 * Displays a vehicle or starship card with key information
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Rocket, Users, DollarSign, Gauge } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Vehicle, Starship } from "@/lib/types";
import { extractIdFromUrl } from "@/lib/api";

export interface VehicleCardProps {
  item: (Vehicle | Starship) & { type: "vehicle" | "starship" };
}

export function VehicleCard({ item }: VehicleCardProps) {
  const router = useRouter();
  const itemId = extractIdFromUrl(item.url);
  const isStarship = item.type === "starship";

  // Helper to format numbers
  const formatNumber = (num: string): string => {
    if (num === "unknown" || num === "n/a") return "Unknown";
    const parsed = parseInt(num.replace(/,/g, ""), 10);
    if (isNaN(parsed)) return num;
    return parsed.toLocaleString();
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
      onClick={() =>
        router.push(`/vehicles/${isStarship ? "starship" : "vehicle"}/${itemId}`)
      }
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            {isStarship ? (
              <Rocket className="h-6 w-6 text-primary" />
            ) : (
              <Car className="h-6 w-6 text-primary" />
            )}
          </div>

          {/* Name and Type */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{item.name}</CardTitle>
            <Badge
              variant={isStarship ? "default" : "secondary"}
              className="mt-1 capitalize"
            >
              {isStarship ? "Starship" : "Vehicle"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Model */}
        {item.model !== "unknown" && (
          <div className="text-sm">
            <span className="text-muted-foreground">Model:</span>
            <p className="font-medium truncate">{item.model}</p>
          </div>
        )}

        {/* Manufacturer */}
        {item.manufacturer !== "unknown" && (
          <div className="text-sm">
            <span className="text-muted-foreground">Manufacturer:</span>
            <p className="font-medium truncate">
              {item.manufacturer.split(",")[0].trim()}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="space-y-2">
          {/* Passengers */}
          {item.passengers !== "unknown" && item.passengers !== "0" && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Passengers:</span>
              <span className="font-medium">{formatNumber(item.passengers)}</span>
            </div>
          )}

          {/* Cost */}
          {item.cost_in_credits !== "unknown" && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-medium">
                {formatNumber(item.cost_in_credits)} credits
              </span>
            </div>
          )}

          {/* Max Speed */}
          {item.max_atmosphering_speed !== "unknown" &&
            item.max_atmosphering_speed !== "n/a" && (
              <div className="flex items-center gap-2 text-sm">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Max Speed:</span>
                <span className="font-medium">
                  {item.max_atmosphering_speed}
                </span>
              </div>
            )}
        </div>

        {/* Additional starship info */}
        {isStarship && "hyperdrive_rating" in item && (
          <div className="pt-2 border-t">
            {item.hyperdrive_rating !== "unknown" && (
              <Badge variant="outline" className="text-xs">
                Hyperdrive: {item.hyperdrive_rating}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

