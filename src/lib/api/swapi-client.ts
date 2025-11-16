/**
 * SWAPI (Star Wars API) Client
 * Base fetch functions with error handling, retry logic, and caching
 */

import type { SWAPIResponse } from '@/lib/types';

// SWAPI Base URL
const SWAPI_BASE_URL = process.env.SWAPI_BASE_URL || 'https://swapi.dev/api/';

// Cache for API responses (simple in-memory cache)
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Custom error class for SWAPI API errors
 */
export class SWAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'SWAPIError';
  }
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check if cached data is still valid
 */
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}

/**
 * Get data from cache if available and valid
 */
function getFromCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data as T;
  }
  // Remove stale cache
  if (cached) {
    cache.delete(key);
  }
  return null;
}

/**
 * Save data to cache
 */
function saveToCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Clear all cache
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Base fetch function with retry logic and error handling
 */
async function fetchWithRetry(
  url: string,
  retries = MAX_RETRIES
): Promise<Response> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 300, // Cache for 5 minutes in Next.js
      },
    });

    // If rate limited (429) or server error (5xx), retry
    if (response.status === 429 || response.status >= 500) {
      if (retries > 0) {
        await sleep(RETRY_DELAY);
        return fetchWithRetry(url, retries - 1);
      }
    }

    // If not found, throw specific error
    if (response.status === 404) {
      throw new SWAPIError('Resource not found', 404, url);
    }

    // If other error, throw
    if (!response.ok) {
      throw new SWAPIError(
        `API request failed: ${response.statusText}`,
        response.status,
        url
      );
    }

    return response;
  } catch (error) {
    // Network errors or fetch failures
    if (retries > 0 && !(error instanceof SWAPIError)) {
      await sleep(RETRY_DELAY);
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}

/**
 * Main fetch function with caching
 */
export async function swapiFetch<T>(endpoint: string): Promise<T> {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${SWAPI_BASE_URL}${endpoint}`;

  // Check cache first
  const cached = getFromCache<T>(url);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetchWithRetry(url);
    const data = await response.json();

    // Save to cache
    saveToCache(url, data);

    return data as T;
  } catch (error) {
    if (error instanceof SWAPIError) {
      throw error;
    }
    throw new SWAPIError(
      `Failed to fetch from SWAPI: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      url
    );
  }
}

/**
 * Fetch paginated data (all pages)
 */
export async function swapiFetchAll<T>(
  endpoint: string
): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | null = endpoint.startsWith('http')
    ? endpoint
    : `${SWAPI_BASE_URL}${endpoint}`;

  while (nextUrl) {
    const response: SWAPIResponse<T> = await swapiFetch<SWAPIResponse<T>>(nextUrl);
    results.push(...response.results);
    nextUrl = response.next;
  }

  return results;
}

/**
 * Fetch single page of paginated data
 */
export async function swapiFetchPage<T>(
  endpoint: string,
  page: number = 1
): Promise<SWAPIResponse<T>> {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${SWAPI_BASE_URL}${endpoint}`;
  
  const urlWithPage = `${url}${url.includes('?') ? '&' : '?'}page=${page}`;
  const response: SWAPIResponse<T> = await swapiFetch<SWAPIResponse<T>>(urlWithPage);
  return response;
}

/**
 * Extract ID from SWAPI URL
 * Example: "https://swapi.dev/api/people/1/" => "1"
 */
export function extractIdFromUrl(url: string): string {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : '';
}

/**
 * Get resource type from URL
 * Example: "https://swapi.dev/api/people/1/" => "people"
 */
export function getResourceTypeFromUrl(url: string): string {
  const matches = url.match(/\/api\/(\w+)\//);
  return matches ? matches[1] : '';
}

/**
 * Build search URL with query parameter
 */
export function buildSearchUrl(endpoint: string, query: string): string {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${SWAPI_BASE_URL}${endpoint}`;
  return `${url}${url.includes('?') ? '&' : '?'}search=${encodeURIComponent(query)}`;
}

/**
 * Fetch with search query
 */
export async function swapiFetchSearch<T>(
  endpoint: string,
  query: string
): Promise<SWAPIResponse<T>> {
  const url = buildSearchUrl(endpoint, query);
  return swapiFetch<SWAPIResponse<T>>(url);
}

/**
 * Get resource by ID
 */
export async function swapiGetById<T>(
  resourceType: string,
  id: string | number
): Promise<T> {
  const endpoint = `${resourceType}/${id}/`;
  return swapiFetch<T>(endpoint);
}

/**
 * Batch fetch multiple resources by URLs
 */
export async function swapiBatchFetch<T>(urls: string[]): Promise<T[]> {
  const promises = urls.map((url) => swapiFetch<T>(url));
  return Promise.all(promises);
}

/**
 * Health check - verify SWAPI is accessible
 */
export async function swapiHealthCheck(): Promise<boolean> {
  try {
    const response = await fetch(SWAPI_BASE_URL, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

