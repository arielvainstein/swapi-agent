/**
 * Server Actions for Dashboard
 * Handles fetching dashboard statistics
 */

"use server";

import { getDashboardStats } from "@/lib/api/dashboard";
import type { DashboardStats } from "@/lib/api/dashboard";

/**
 * Get Dashboard Statistics Server Action
 * Fetches all dashboard data with caching
 */
export async function fetchDashboardStats(): Promise<{
  data?: DashboardStats;
  error?: string;
}> {
  try {
    const stats = await getDashboardStats();
    return { data: stats };
  } catch (error) {
    console.error("Error in fetchDashboardStats:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard statistics",
    };
  }
}

