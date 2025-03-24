import { createClient } from "@supabase/supabase-js";
import { cacheData, getCachedData } from "./cacheUtils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type TherapeuticCategory = {
  name: string;
  count: number;
};

const CACHE_KEY = "aushadh_cache_therapeutic_categories";

export const getTherapeuticCategories = async (limit: number = 8): Promise<TherapeuticCategory[]> => {
  // Check for cached data first
  const cachedCategories = getCachedData<TherapeuticCategory[]>(CACHE_KEY);
  if (cachedCategories) {
    // If we have cached data but need a different limit, filter the cached data
    return cachedCategories.slice(0, limit);
  }

  // If no cached data, fetch from Supabase
  try {
    const { data, error } = await supabase
      .from("medicine")
      .select("therapeutic_class")
      .not("therapeutic_class", "is", null);

    if (error) throw error;

    // Count medicines by therapeutic class
    const categoryCounts: Record<string, number> = {};
    data.forEach((item) => {
      const category = item.therapeutic_class;
      if (category) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });

    // Convert to array and sort by count
    const categories = Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    // Cache all categories data (not just the limited set)
    cacheData(CACHE_KEY, categories);

    // Return the requested limit
    return categories.slice(0, limit);
  } catch (error) {
    console.error("Error fetching therapeutic categories:", error);
    return [];
  }
}; 