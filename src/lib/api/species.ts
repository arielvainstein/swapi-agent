/**
 * SWAPI Species Service
 */

import { swapiFetch, swapiFetchAll, swapiFetchSearch, swapiGetById } from './swapi-client';
import { SWAPI_ENDPOINTS } from './constants';
import type { Species, SWAPIResponse } from '@/lib/types';

/**
 * Get all species from all pages
 */
export async function getAllSpecies(): Promise<Species[]> {
  return swapiFetchAll<Species>(SWAPI_ENDPOINTS.SPECIES);
}

/**
 * Get a single species by ID
 */
export async function getSpeciesById(id: string | number): Promise<Species> {
  return swapiGetById<Species>(SWAPI_ENDPOINTS.SPECIES, id);
}

/**
 * Search species by name
 */
export async function searchSpecies(query: string): Promise<SWAPIResponse<Species>> {
  return swapiFetchSearch<Species>(SWAPI_ENDPOINTS.SPECIES, query);
}

/**
 * Get species with pagination
 */
export async function getSpeciesPage(page: number = 1): Promise<SWAPIResponse<Species>> {
  const endpoint = `${SWAPI_ENDPOINTS.SPECIES}?page=${page}`;
  return swapiFetch<SWAPIResponse<Species>>(endpoint);
}

/**
 * Get species by URL
 */
export async function getSpeciesByUrl(url: string): Promise<Species> {
  return swapiFetch<Species>(url);
}

