/**
 * AI Agent Tools for SWAPI Integration
 * Tool definitions using Zod schemas for the AI to interact with SWAPI
 */

import { tool } from "ai";
import { z } from "zod";
import {
  searchPeople,
  getPersonById,
  getAllPeople,
  searchPlanets,
  getPlanetById,
  getAllPlanets,
  searchStarships,
  getStarshipById,
  getAllStarships,
  searchVehicles,
  getVehicleById,
  getAllVehicles,
  searchFilms,
  getFilmById,
  getAllFilms,
  searchSpecies,
  getSpeciesById,
  getAllSpecies,
  extractIdFromUrl,
} from "@/lib/api";

/**
 * Tool: Search Characters
 * Search for Star Wars characters by name
 */
export const searchCharactersTool = tool({
  description:
    "Search for Star Wars characters by name. Use this when users ask about specific characters or want to find characters matching a name.",
  parameters: z.object({
    query: z.string().describe("The character name to search for"),
  }),
  execute: async ({ query }) => {
    const results = await searchPeople(query);
    return {
      count: results.count,
      characters: results.results.map((person) => ({
        name: person.name,
        height: person.height,
        mass: person.mass,
        hairColor: person.hair_color,
        eyeColor: person.eye_color,
        birthYear: person.birth_year,
        gender: person.gender,
        id: extractIdFromUrl(person.url),
      })),
    };
  },
});

/**
 * Tool: Get Character Details
 * Get detailed information about a specific character by ID
 */
export const getCharacterDetailsTool = tool({
  description:
    "Get detailed information about a specific Star Wars character by their ID. Use this after searching to get full details.",
  parameters: z.object({
    id: z.string().describe("The character ID"),
  }),
  execute: async ({ id }) => {
    const person = await getPersonById(id);
    return {
      name: person.name,
      height: `${person.height} cm`,
      mass: `${person.mass} kg`,
      hairColor: person.hair_color,
      skinColor: person.skin_color,
      eyeColor: person.eye_color,
      birthYear: person.birth_year,
      gender: person.gender,
      homeworld: person.homeworld,
      films: person.films,
      species: person.species,
      vehicles: person.vehicles,
      starships: person.starships,
    };
  },
});

/**
 * Tool: Search Planets
 * Search for planets by name
 */
export const searchPlanetsTool = tool({
  description:
    "Search for planets by name. Use this when users ask about specific planets or want to find planets.",
  parameters: z.object({
    query: z.string().describe("The planet name to search for"),
  }),
  execute: async ({ query }) => {
    const results = await searchPlanets(query);
    return {
      count: results.count,
      planets: results.results.map((planet) => ({
        name: planet.name,
        climate: planet.climate,
        terrain: planet.terrain,
        population: planet.population,
        diameter: `${planet.diameter} km`,
        id: extractIdFromUrl(planet.url),
      })),
    };
  },
});

/**
 * Tool: Get Planet Details
 * Get detailed information about a specific planet by ID
 */
export const getPlanetDetailsTool = tool({
  description:
    "Get detailed information about a specific planet by its ID. Use this after searching to get full details.",
  parameters: z.object({
    id: z.string().describe("The planet ID"),
  }),
  execute: async ({ id }) => {
    const planet = await getPlanetById(id);
    return {
      name: planet.name,
      rotationPeriod: `${planet.rotation_period} hours`,
      orbitalPeriod: `${planet.orbital_period} days`,
      diameter: `${planet.diameter} km`,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surfaceWater: planet.surface_water,
      population: planet.population,
      residents: planet.residents,
      films: planet.films,
    };
  },
});

/**
 * Tool: Search Starships
 * Search for starships by name or model
 */
export const searchStarshipsTool = tool({
  description:
    "Search for starships by name or model. Use this when users ask about specific starships.",
  parameters: z.object({
    query: z.string().describe("The starship name or model to search for"),
  }),
  execute: async ({ query }) => {
    const results = await searchStarships(query);
    return {
      count: results.count,
      starships: results.results.map((ship) => ({
        name: ship.name,
        model: ship.model,
        manufacturer: ship.manufacturer,
        class: ship.starship_class,
        cost: ship.cost_in_credits,
        speed: ship.max_atmosphering_speed,
        hyperdriveRating: ship.hyperdrive_rating,
        id: extractIdFromUrl(ship.url),
      })),
    };
  },
});

/**
 * Tool: Get Starship Details
 * Get detailed information about a specific starship by ID
 */
export const getStarshipDetailsTool = tool({
  description:
    "Get detailed information about a specific starship by its ID. Use this after searching to get full details.",
  parameters: z.object({
    id: z.string().describe("The starship ID"),
  }),
  execute: async ({ id }) => {
    const ship = await getStarshipById(id);
    return {
      name: ship.name,
      model: ship.model,
      manufacturer: ship.manufacturer,
      cost: `${ship.cost_in_credits} credits`,
      length: `${ship.length} meters`,
      maxSpeed: ship.max_atmosphering_speed,
      crew: ship.crew,
      passengers: ship.passengers,
      cargoCapacity: ship.cargo_capacity,
      consumables: ship.consumables,
      hyperdriveRating: ship.hyperdrive_rating,
      MGLT: ship.MGLT,
      starshipClass: ship.starship_class,
      pilots: ship.pilots,
      films: ship.films,
    };
  },
});

/**
 * Tool: Search Vehicles
 * Search for vehicles by name or model
 */
export const searchVehiclesTool = tool({
  description:
    "Search for vehicles by name or model. Use this when users ask about specific vehicles.",
  parameters: z.object({
    query: z.string().describe("The vehicle name or model to search for"),
  }),
  execute: async ({ query }) => {
    const results = await searchVehicles(query);
    return {
      count: results.count,
      vehicles: results.results.map((vehicle) => ({
        name: vehicle.name,
        model: vehicle.model,
        manufacturer: vehicle.manufacturer,
        class: vehicle.vehicle_class,
        cost: vehicle.cost_in_credits,
        speed: vehicle.max_atmosphering_speed,
        id: extractIdFromUrl(vehicle.url),
      })),
    };
  },
});

/**
 * Tool: Get Vehicle Details
 * Get detailed information about a specific vehicle by ID
 */
export const getVehicleDetailsTool = tool({
  description:
    "Get detailed information about a specific vehicle by its ID. Use this after searching to get full details.",
  parameters: z.object({
    id: z.string().describe("The vehicle ID"),
  }),
  execute: async ({ id }) => {
    const vehicle = await getVehicleById(id);
    return {
      name: vehicle.name,
      model: vehicle.model,
      manufacturer: vehicle.manufacturer,
      cost: `${vehicle.cost_in_credits} credits`,
      length: `${vehicle.length} meters`,
      maxSpeed: vehicle.max_atmosphering_speed,
      crew: vehicle.crew,
      passengers: vehicle.passengers,
      cargoCapacity: vehicle.cargo_capacity,
      consumables: vehicle.consumables,
      vehicleClass: vehicle.vehicle_class,
      pilots: vehicle.pilots,
      films: vehicle.films,
    };
  },
});

/**
 * Tool: Search Films
 * Search for films by title
 */
export const searchFilmsTool = tool({
  description:
    "Search for Star Wars films by title. Use this when users ask about specific movies.",
  parameters: z.object({
    query: z.string().describe("The film title to search for"),
  }),
  execute: async ({ query }) => {
    const results = await searchFilms(query);
    return {
      count: results.count,
      films: results.results.map((film) => ({
        title: film.title,
        episodeId: film.episode_id,
        director: film.director,
        producer: film.producer,
        releaseDate: film.release_date,
        id: extractIdFromUrl(film.url),
      })),
    };
  },
});

/**
 * Tool: Get Film Details
 * Get detailed information about a specific film by ID
 */
export const getFilmDetailsTool = tool({
  description:
    "Get detailed information about a specific Star Wars film by its ID. Use this after searching to get full details.",
  parameters: z.object({
    id: z.string().describe("The film ID"),
  }),
  execute: async ({ id }) => {
    const film = await getFilmById(id);
    return {
      title: film.title,
      episodeId: film.episode_id,
      openingCrawl: film.opening_crawl,
      director: film.director,
      producer: film.producer,
      releaseDate: film.release_date,
      characters: film.characters,
      planets: film.planets,
      starships: film.starships,
      vehicles: film.vehicles,
      species: film.species,
    };
  },
});

/**
 * Tool: Search Species
 * Search for species by name
 */
export const searchSpeciesTool = tool({
  description:
    "Search for species by name. Use this when users ask about different species in Star Wars.",
  parameters: z.object({
    query: z.string().describe("The species name to search for"),
  }),
  execute: async ({ query }) => {
    const results = await searchSpecies(query);
    return {
      count: results.count,
      species: results.results.map((species) => ({
        name: species.name,
        classification: species.classification,
        designation: species.designation,
        averageHeight: species.average_height,
        language: species.language,
        id: extractIdFromUrl(species.url),
      })),
    };
  },
});

/**
 * Tool: Get Species Details
 * Get detailed information about a specific species by ID
 */
export const getSpeciesDetailsTool = tool({
  description:
    "Get detailed information about a specific species by its ID. Use this after searching to get full details.",
  parameters: z.object({
    id: z.string().describe("The species ID"),
  }),
  execute: async ({ id }) => {
    const species = await getSpeciesById(id);
    return {
      name: species.name,
      classification: species.classification,
      designation: species.designation,
      averageHeight: `${species.average_height} cm`,
      skinColors: species.skin_colors,
      hairColors: species.hair_colors,
      eyeColors: species.eye_colors,
      averageLifespan: `${species.average_lifespan} years`,
      homeworld: species.homeworld,
      language: species.language,
      people: species.people,
      films: species.films,
    };
  },
});

/**
 * Tool: Get Galaxy Statistics
 * Get statistical information about the Star Wars galaxy
 */
export const getGalaxyStatisticsTool = tool({
  description:
    "Get statistics about the Star Wars galaxy including total counts of characters, planets, starships, vehicles, films, and species. Use this when users ask 'how many' questions.",
  parameters: z.object({}),
  execute: async () => {
    const [people, planets, starships, vehicles, films, species] =
      await Promise.all([
        getAllPeople(),
        getAllPlanets(),
        getAllStarships(),
        getAllVehicles(),
        getAllFilms(),
        getAllSpecies(),
      ]);

    return {
      totalCharacters: people.length,
      totalPlanets: planets.length,
      totalStarships: starships.length,
      totalVehicles: vehicles.length,
      totalFilms: films.length,
      totalSpecies: species.length,
      summary: `The Star Wars galaxy contains ${people.length} characters, ${planets.length} planets, ${starships.length} starships, ${vehicles.length} vehicles, ${films.length} films, and ${species.length} species.`,
    };
  },
});

/**
 * Export all tools as an object
 */
export const swapiTools = {
  searchCharacters: searchCharactersTool,
  getCharacterDetails: getCharacterDetailsTool,
  searchPlanets: searchPlanetsTool,
  getPlanetDetails: getPlanetDetailsTool,
  searchStarships: searchStarshipsTool,
  getStarshipDetails: getStarshipDetailsTool,
  searchVehicles: searchVehiclesTool,
  getVehicleDetails: getVehicleDetailsTool,
  searchFilms: searchFilmsTool,
  getFilmDetails: getFilmDetailsTool,
  searchSpecies: searchSpeciesTool,
  getSpeciesDetails: getSpeciesDetailsTool,
  getGalaxyStatistics: getGalaxyStatisticsTool,
};

