/**
 * SWAPI People (Characters) Service
 */

import { swapiFetch, swapiFetchAll, swapiFetchSearch, swapiGetById } from './swapi-client';
import { SWAPI_ENDPOINTS } from './constants';
import type { Person, SWAPIResponse } from '@/lib/types';

/**
 * Get all people (characters) from all pages
 */
export async function getAllPeople(): Promise<Person[]> {
  return swapiFetchAll<Person>(SWAPI_ENDPOINTS.PEOPLE);
}

/**
 * Get a single person by ID
 */
export async function getPersonById(id: string | number): Promise<Person> {
  return swapiGetById<Person>(SWAPI_ENDPOINTS.PEOPLE, id);
}

/**
 * Search people by name
 */
export async function searchPeople(query: string): Promise<SWAPIResponse<Person>> {
  return swapiFetchSearch<Person>(SWAPI_ENDPOINTS.PEOPLE, query);
}

/**
 * Get people with pagination
 */
export async function getPeoplePage(page: number = 1): Promise<SWAPIResponse<Person>> {
  const endpoint = `${SWAPI_ENDPOINTS.PEOPLE}?page=${page}`;
  return swapiFetch<SWAPIResponse<Person>>(endpoint);
}

/**
 * Get person by URL
 */
export async function getPersonByUrl(url: string): Promise<Person> {
  return swapiFetch<Person>(url);
}

