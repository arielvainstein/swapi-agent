/**
 * TopVehiclesCard Component
 * Displays top 3 ranked vehicles/starships
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Rocket, Zap, Users, Package } from "lucide-react";
import type { VehicleRanking } from "@/lib/api/dashboard";
import { useRouter } from "next/navigation";

export interface TopVehiclesCardProps {
  vehicles: VehicleRanking[];
}

const rankColors = {
  1: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/50",
  2: "bg-slate-400/20 text-slate-700 dark:text-slate-400 border-slate-500/50",
  3: "bg-amber-600/20 text-amber-700 dark:text-amber-400 border-amber-600/50",
};

const rankLabels = {
  1: "1st Place",
  2: "2nd Place",
  3: "3rd Place",
};

export function TopVehiclesCard({ vehicles }: TopVehiclesCardProps) {
  const router = useRouter();

  if (vehicles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle>Top 3 Vehicles</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No vehicle rankings available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <CardTitle>Top 3 Vehicles & Starships</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Ranked by performance, capacity, and efficiency
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {vehicles.map((vehicle, index) => (
          <div key={vehicle.id}>
            <div
              className="space-y-3 p-4 rounded-lg border bg-card hover:shadow-md transition-all cursor-pointer"
              onClick={() =>
                router.push(`/vehicles/${vehicle.type}/${vehicle.id}`)
              }
            >
              {/* Rank Badge */}
              <div className="flex items-center justify-between">
                <Badge className={rankColors[vehicle.rank]} variant="outline">
                  <Trophy className="h-3 w-3 mr-1" />
                  {rankLabels[vehicle.rank]}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {vehicle.type === "starship" ? "Starship" : "Vehicle"}
                </Badge>
              </div>

              {/* Vehicle Name and Model */}
              <div>
                <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground">{vehicle.model}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Max Speed</p>
                    <p className="font-medium">{vehicle.maxSpeed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Passengers</p>
                    <p className="font-medium">{vehicle.passengers}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Cargo</p>
                    <p className="font-medium">
                      {parseInt(vehicle.cargoCapacity) > 0
                        ? `${parseInt(vehicle.cargoCapacity).toString()} kg`
                        : "Unknown"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Class</p>
                    <p className="font-medium">{vehicle.vehicleClass}</p>
                  </div>
                </div>
              </div>

              {/* Manufacturer */}
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Manufactured by{" "}
                  <span className="font-medium text-foreground">
                    {vehicle.manufacturer}
                  </span>
                </p>
              </div>
            </div>
            {index < vehicles.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

