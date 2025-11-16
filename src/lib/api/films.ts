/**
 * SWAPI Films Service
 */

import { swapiFetch, swapiFetchAll, swapiFetchSearch, swapiGetById } from './swapi-client';
import { SWAPI_ENDPOINTS } from './constants';
import type { Film, SWAPIResponse } from '@/lib/types';

/**
 * Get all films from all pages
 */
export async function getAllFilms(): Promise<Film[]> {
  return swapiFetchAll<Film>(SWAPI_ENDPOINTS.FILMS);
}

/**
 * Get a single film by ID
 */
export async function getFilmById(id: string | number): Promise<Film> {
  return swapiGetById<Film>(SWAPI_ENDPOINTS.FILMS, id);
}

/**
 * Search films by title
 */
export async function searchFilms(query: string): Promise<SWAPIResponse<Film>> {
  return swapiFetchSearch<Film>(SWAPI_ENDPOINTS.FILMS, query);
}

/**
 * Get films with pagination
 */
export async function getFilmsPage(page: number = 1): Promise<SWAPIResponse<Film>> {
  const endpoint = `${SWAPI_ENDPOINTS.FILMS}?page=${page}`;
  return swapiFetch<SWAPIResponse<Film>>(endpoint);
}

/**
 * Get film by URL
 */
export async function getFilmByUrl(url: string): Promise<Film> {
  return swapiFetch<Film>(url);
}

/**
 * Get films sorted by episode order
 */
export async function getFilmsByEpisodeOrder(): Promise<Film[]> {
  const films = await getAllFilms();
  return films.sort((a, b) => a.episode_id - b.episode_id);
}

