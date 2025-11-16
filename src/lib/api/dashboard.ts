/**
 * Dashboard API Functions
 * Aggregated data and statistics for the main dashboard
 */

import { getAllPeople, getAllPlanets, getAllStarships, getAllVehicles } from "./";
import type { Starship, Vehicle } from "@/lib/types";

/**
 * Get total count of all characters in the galaxy
 */
export async function getTotalCharacters(): Promise<number> {
  try {
    const people = await getAllPeople();
    return people.length;
  } catch (error) {
    console.error("Error fetching total characters:", error);
    return 0;
  }
}

/**
 * Get total count of all planets in the galaxy
 */
export async function getTotalPlanets(): Promise<number> {
  try {
    const planets = await getAllPlanets();
    return planets.length;
  } catch (error) {
    console.error("Error fetching total planets:", error);
    return 0;
  }
}

/**
 * Get total count of all starships
 */
export async function getTotalStarships(): Promise<number> {
  try {
    const starships = await getAllStarships();
    return starships.length;
  } catch (error) {
    console.error("Error fetching total starships:", error);
    return 0;
  }
}

/**
 * Get total count of all vehicles
 */
export async function getTotalVehicles(): Promise<number> {
  try {
    const vehicles = await getAllVehicles();
    return vehicles.length;
  } catch (error) {
    console.error("Error fetching total vehicles:", error);
    return 0;
  }
}

/**
 * Vehicle ranking item for top 3 display
 */
export interface VehicleRanking {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  vehicleClass: string;
  costInCredits: string;
  maxSpeed: string;
  passengers: string;
  cargoCapacity: string;
  rank: 1 | 2 | 3;
  score: number;
  type: "starship" | "vehicle";
}

/**
 * Calculate vehicle score based on multiple criteria
 */
function calculateVehicleScore(
  vehicle: Starship | Vehicle,
  type: "starship" | "vehicle"
): number {
  let score = 0;

  // Speed score (higher is better)
  const speed = parseInt(vehicle.max_atmosphering_speed) || 0;
  if (speed > 0 && speed !== Infinity) {
    score += speed / 10;
  }

  // Passenger capacity score
  const passengers = parseInt(vehicle.passengers) || 0;
  score += passengers * 5;

  // Cargo capacity score
  const cargo = parseInt(vehicle.cargo_capacity) || 0;
  if (cargo > 0 && cargo !== Infinity) {
    score += cargo / 1000;
  }

  // Cost efficiency (lower cost is better for same capabilities)
  const cost = parseInt(vehicle.cost_in_credits) || 0;
  if (cost > 0 && cost !== Infinity) {
    // Negative contribution for high cost
    score -= cost / 100000;
  }

  // Bonus for starships (hyperdrive capability)
  if (type === "starship") {
    const starship = vehicle as Starship;
    const hyperdriveRating = parseFloat(starship.hyperdrive_rating) || 0;
    if (hyperdriveRating > 0) {
      // Lower hyperdrive rating is better (closer to 1.0)
      score += (10 - hyperdriveRating) * 50;
    }

    // MGLT (megalights per hour) bonus
    const mglt = parseInt(starship.MGLT) || 0;
    score += mglt * 2;
  }

  return Math.max(0, score); // Ensure non-negative
}

/**
 * Extract ID from SWAPI URL
 */
function extractId(url: string): string {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : "";
}

/**
 * Get top 3 vehicles/starships ranked by performance metrics
 */
export async function getTopVehicles(): Promise<VehicleRanking[]> {
  try {
    const [starships, vehicles] = await Promise.all([
      getAllStarships(),
      getAllVehicles(),
    ]);

    // Calculate scores for all vehicles
    const rankedStarships = starships.map((ship) => ({
      id: extractId(ship.url),
      name: ship.name,
      model: ship.model,
      manufacturer: ship.manufacturer,
      vehicleClass: ship.starship_class,
      costInCredits: ship.cost_in_credits,
      maxSpeed: ship.max_atmosphering_speed,
      passengers: ship.passengers,
      cargoCapacity: ship.cargo_capacity,
      type: "starship" as const,
      score: calculateVehicleScore(ship, "starship"),
    }));

    const rankedVehicles = vehicles.map((vehicle) => ({
      id: extractId(vehicle.url),
      name: vehicle.name,
      model: vehicle.model,
      manufacturer: vehicle.manufacturer,
      vehicleClass: vehicle.vehicle_class,
      costInCredits: vehicle.cost_in_credits,
      maxSpeed: vehicle.max_atmosphering_speed,
      passengers: vehicle.passengers,
      cargoCapacity: vehicle.cargo_capacity,
      type: "vehicle" as const,
      score: calculateVehicleScore(vehicle, "vehicle"),
    }));

    // Combine and sort by score
    const allVehicles = [...rankedStarships, ...rankedVehicles];
    allVehicles.sort((a, b) => b.score - a.score);

    // Take top 3 and add rank
    const top3 = allVehicles.slice(0, 3).map((vehicle, index) => ({
      ...vehicle,
      rank: (index + 1) as 1 | 2 | 3,
    }));

    return top3;
  } catch (error) {
    console.error("Error fetching top vehicles:", error);
    return [];
  }
}

/**
 * Dashboard statistics interface
 */
export interface DashboardStats {
  totalCharacters: number;
  totalPlanets: number;
  totalStarships: number;
  totalVehicles: number;
  topVehicles: VehicleRanking[];
}

/**
 * Get all dashboard statistics in one call
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [
      totalCharacters,
      totalPlanets,
      totalStarships,
      totalVehicles,
      topVehicles,
    ] = await Promise.all([
      getTotalCharacters(),
      getTotalPlanets(),
      getTotalStarships(),
      getTotalVehicles(),
      getTopVehicles(),
    ]);

    return {
      totalCharacters,
      totalPlanets,
      totalStarships,
      totalVehicles,
      topVehicles,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard statistics");
  }
}

