/**
 * Central export point for all types
 */

export * from './swapi';
export * from './chat';

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Dashboard statistics
export interface DashboardStats {
  totalCharacters: number;
  totalPlanets: number;
  totalStarships: number;
  totalVehicles: number;
}

// Top vehicle for ranking
export interface TopVehicle {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  vehicleClass: string;
  costInCredits: string;
  speed: string;
  passengers: string;
  rank: 1 | 2 | 3;
}

// Search/Filter parameters
export interface FilterParams {
  search?: string;
  page?: number;
  limit?: number;
  [key: string]: any;
}

