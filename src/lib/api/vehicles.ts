/**
 * SWAPI Vehicles Service
 */

import { swapiFetch, swapiFetchAll, swapiFetchSearch, swapiGetById } from './swapi-client';
import { SWAPI_ENDPOINTS } from './constants';
import type { Vehicle, SWAPIResponse } from '@/lib/types';

/**
 * Get all vehicles from all pages
 */
export async function getAllVehicles(): Promise<Vehicle[]> {
  return swapiFetchAll<Vehicle>(SWAPI_ENDPOINTS.VEHICLES);
}

/**
 * Get a single vehicle by ID
 */
export async function getVehicleById(id: string | number): Promise<Vehicle> {
  return swapiGetById<Vehicle>(SWAPI_ENDPOINTS.VEHICLES, id);
}

/**
 * Search vehicles by name or model
 */
export async function searchVehicles(query: string): Promise<SWAPIResponse<Vehicle>> {
  return swapiFetchSearch<Vehicle>(SWAPI_ENDPOINTS.VEHICLES, query);
}

/**
 * Get vehicles with pagination
 */
export async function getVehiclesPage(page: number = 1): Promise<SWAPIResponse<Vehicle>> {
  const endpoint = `${SWAPI_ENDPOINTS.VEHICLES}?page=${page}`;
  return swapiFetch<SWAPIResponse<Vehicle>>(endpoint);
}

/**
 * Get vehicle by URL
 */
export async function getVehicleByUrl(url: string): Promise<Vehicle> {
  return swapiFetch<Vehicle>(url);
}

