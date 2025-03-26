import { createClient } from "@supabase/supabase-js";
import { cacheData, getCachedData } from "./cacheUtils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type ManufacturerStat = {
  name: string;
  count: number;
};

const CACHE_KEY = "aushadh_cache_top_manufacturers_v2";
const THRESHOLD_CACHE_KEY = "aushadh_cache_threshold_manufacturers";

export const getTopManufacturers = async (limit: number = 5): Promise<ManufacturerStat[]> => {
  // Check for cached data first
  const cachedManufacturers = getCachedData<ManufacturerStat[]>(CACHE_KEY);
  if (cachedManufacturers) {
    // If we have cached data but need a different limit, filter the cached data
    return cachedManufacturers.slice(0, limit);
  }

  // If no cached data, fetch from Supabase
  try {
    const { data, error } = await supabase
      .from("medicine")
      .select("manufacturer_name")
      .not("manufacturer_name", "is", null);

    if (error) throw error;

    // Count medicines by manufacturer
    const manufacturerCounts: Record<string, number> = {};
    data.forEach((item) => {
      const name = item.manufacturer_name;
      if (name) {
        manufacturerCounts[name] = (manufacturerCounts[name] || 0) + 1;
      }
    });

    // Convert to array and sort by count
    const manufacturers = Object.entries(manufacturerCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    // Cache all manufacturers data (not just the limited set)
    cacheData(CACHE_KEY, manufacturers);

    // Return the requested limit
    return manufacturers.slice(0, limit);
  } catch (error) {
    console.error("Error fetching top manufacturers:", error);
    return [];
  }
};

/**
 * Get manufacturers with product count over a specified threshold
 */
export const getManufacturersAboveThreshold = async (threshold: number = 1000): Promise<ManufacturerStat[]> => {
  // Create a cache key specific to this threshold
  const specificCacheKey = `${THRESHOLD_CACHE_KEY}_${threshold}`;
  
  // Check for cached data first
  const cachedManufacturers = getCachedData<ManufacturerStat[]>(specificCacheKey);
  if (cachedManufacturers) {
    return cachedManufacturers;
  }

  // If no cached data, fetch from Supabase
  try {
    const { data, error } = await supabase
      .from("medicine")
      .select("manufacturer_name")
      .not("manufacturer_name", "is", null);

    if (error) throw error;

    // Count medicines by manufacturer
    const manufacturerCounts: Record<string, number> = {};
    data.forEach((item) => {
      const name = item.manufacturer_name;
      if (name) {
        manufacturerCounts[name] = (manufacturerCounts[name] || 0) + 1;
      }
    });

    // Convert to array, filter by threshold, and sort by count
    const manufacturers = Object.entries(manufacturerCounts)
      .map(([name, count]) => ({ name, count }))
      .filter(manufacturer => manufacturer.count >= threshold)
      .sort((a, b) => b.count - a.count);
    
    // Cache the filtered manufacturers
    cacheData(specificCacheKey, manufacturers);

    return manufacturers;
  } catch (error) {
    console.error(`Error fetching manufacturers with more than ${threshold} products:`, error);
    return [];
  }
}; 