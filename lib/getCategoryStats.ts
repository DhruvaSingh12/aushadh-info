import { createClient } from "@supabase/supabase-js";
import { cacheData, getCachedData } from "./cacheUtils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type CategoryStats = {
  overall: number;
  [key: string]: number;
};

// Updated cache key to force refresh
const CACHE_KEY = "aushadh_cache_category_stats_v3";

export const getCategoryStats = async (): Promise<CategoryStats> => {
  // Check for cached data first
  const cachedStats = getCachedData<CategoryStats>(CACHE_KEY);
  if (cachedStats) {
    return cachedStats;
  }

  // If no cached data, fetch from Supabase
  try {
    // Get total medicine count
    const { count: totalCount, error: totalError } = await supabase
      .from("medicine")
      .select("*", { count: "exact", head: true });

    if (totalError) throw totalError;

    // Get all therapeutic classes
    const { data: allClasses, error: classError } = await supabase
      .from("medicine")
      .select("therapeutic_class")
      .not("therapeutic_class", "is", null);

    if (classError) throw classError;

    // Initialize stats object with overall count
    const stats: CategoryStats = {
      overall: totalCount || 0
    };

    // Normalize and count medicines by therapeutic class
    // This will handle case differences by standardizing the category names
    const categoryCounts: Record<string, {count: number, displayName: string}> = {};
    
    allClasses.forEach((item) => {
      if (!item.therapeutic_class) return;
      
      // Normalize the category name for comparison (lowercase for keys)
      const normalizedKey = item.therapeutic_class.toLowerCase().trim();
      
      // Either use existing display name or set this one as display name
      if (categoryCounts[normalizedKey]) {
        categoryCounts[normalizedKey].count++;
      } else {
        // Store both count and original display name
        categoryCounts[normalizedKey] = {
          count: 1,
          displayName: item.therapeutic_class // Keep original display case
        };
      }
    });

    // Convert to stats object
    Object.entries(categoryCounts).forEach(([normalizedKey, data]) => {
      const { count, displayName } = data;
      
      // Add the category with proper display name to stats
      stats[displayName] = count;
    });

    // Cache the results
    cacheData(CACHE_KEY, stats);

    return stats;
  } catch (error) {
    console.error("Error fetching category stats:", error);
    return {
      overall: 0
    };
  }
}; 