/**
 * SWAPI Planets Service
 */

import { swapiFetch, swapiFetchAll, swapiFetchSearch, swapiGetById } from './swapi-client';
import { SWAPI_ENDPOINTS } from './constants';
import type { Planet, SWAPIResponse } from '@/lib/types';

/**
 * Get all planets from all pages
 */
export async function getAllPlanets(): Promise<Planet[]> {
  return swapiFetchAll<Planet>(SWAPI_ENDPOINTS.PLANETS);
}

/**
 * Get a single planet by ID
 */
export async function getPlanetById(id: string | number): Promise<Planet> {
  return swapiGetById<Planet>(SWAPI_ENDPOINTS.PLANETS, id);
}

/**
 * Search planets by name
 */
export async function searchPlanets(query: string): Promise<SWAPIResponse<Planet>> {
  return swapiFetchSearch<Planet>(SWAPI_ENDPOINTS.PLANETS, query);
}

/**
 * Get planets with pagination
 */
export async function getPlanetsPage(page: number = 1): Promise<SWAPIResponse<Planet>> {
  const endpoint = `${SWAPI_ENDPOINTS.PLANETS}?page=${page}`;
  return swapiFetch<SWAPIResponse<Planet>>(endpoint);
}

/**
 * Get planet by URL
 */
export async function getPlanetByUrl(url: string): Promise<Planet> {
  return swapiFetch<Planet>(url);
}

