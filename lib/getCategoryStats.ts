import { createClient } from "@supabase/supabase-js";
import { cacheData, getCachedData } from "./cacheUtils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type CategoryStats = {
  overall: number;
  [key: string]: number;
};
const CACHE_KEY = "aushadh_cache_category_stats_v3";

export const getCategoryStats = async (): Promise<CategoryStats> => {
  const cachedStats = getCachedData<CategoryStats>(CACHE_KEY);
  if (cachedStats) {
    return cachedStats;
  }
  try {
    const { count: totalCount, error: totalError } = await supabase
      .from("medicine")
      .select("*", { count: "exact", head: true });

    if (totalError) throw totalError;
    const { data: allClasses, error: classError } = await supabase
      .from("medicine")
      .select("therapeutic_class")
      .not("therapeutic_class", "is", null);

    if (classError) throw classError;
    const stats: CategoryStats = {
      overall: totalCount || 0
    };
    const categoryCounts: Record<string, {count: number, displayName: string}> = {};
    
    allClasses.forEach((item) => {
      if (!item.therapeutic_class) return;
      const normalizedKey = item.therapeutic_class.toLowerCase().trim();
      if (categoryCounts[normalizedKey]) {
        categoryCounts[normalizedKey].count++;
      } else {
        categoryCounts[normalizedKey] = {
          count: 1,
          displayName: item.therapeutic_class 
        };
      }
    });
    Object.entries(categoryCounts).forEach(([, data]) => {
      const { count, displayName } = data;
      stats[displayName] = count;
    });
    cacheData(CACHE_KEY, stats);

    return stats;
  } catch (error) {
    console.error("Error fetching category stats:", error);
    return {
      overall: 0
    };
  }
}; 