/**
 * SWAPI Starships Service
 */

import { swapiFetch, swapiFetchAll, swapiFetchSearch, swapiGetById } from './swapi-client';
import { SWAPI_ENDPOINTS } from './constants';
import type { Starship, SWAPIResponse } from '@/lib/types';

/**
 * Get all starships from all pages
 */
export async function getAllStarships(): Promise<Starship[]> {
  return swapiFetchAll<Starship>(SWAPI_ENDPOINTS.STARSHIPS);
}

/**
 * Get a single starship by ID
 */
export async function getStarshipById(id: string | number): Promise<Starship> {
  return swapiGetById<Starship>(SWAPI_ENDPOINTS.STARSHIPS, id);
}

/**
 * Search starships by name or model
 */
export async function searchStarships(query: string): Promise<SWAPIResponse<Starship>> {
  return swapiFetchSearch<Starship>(SWAPI_ENDPOINTS.STARSHIPS, query);
}

/**
 * Get starships with pagination
 */
export async function getStarshipsPage(page: number = 1): Promise<SWAPIResponse<Starship>> {
  const endpoint = `${SWAPI_ENDPOINTS.STARSHIPS}?page=${page}`;
  return swapiFetch<SWAPIResponse<Starship>>(endpoint);
}

/**
 * Get starship by URL
 */
export async function getStarshipByUrl(url: string): Promise<Starship> {
  return swapiFetch<Starship>(url);
}

