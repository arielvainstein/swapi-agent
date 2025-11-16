/**
 * SWAPI API Constants
 */

// SWAPI Endpoints
export const SWAPI_ENDPOINTS = {
  PEOPLE: 'people/',
  PLANETS: 'planets/',
  STARSHIPS: 'starships/',
  VEHICLES: 'vehicles/',
  FILMS: 'films/',
  SPECIES: 'species/',
} as const;

// Resource Types
export type SWAPIResourceType = keyof typeof SWAPI_ENDPOINTS;

// Endpoint values type
export type SWAPIEndpoint = (typeof SWAPI_ENDPOINTS)[SWAPIResourceType];

