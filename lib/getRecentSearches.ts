import { createClient } from "@supabase/supabase-js";
import { cacheData, getCachedData } from "./cacheUtils";
import { Medicine } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type RecentSearch = {
  id: number;
  name: string;
  type: string | null;
  manufacturer_name: string | null;
};

const CACHE_KEY = "aushadh_cache_recent_searches";

export const getRecentSearches = async (limit: number = 5): Promise<RecentSearch[]> => {
  // Check for cached data first
  const cachedSearches = getCachedData<RecentSearch[]>(CACHE_KEY);
  if (cachedSearches) {
    // If we have cached data but need a different limit, filter the cached data
    return cachedSearches.slice(0, limit);
  }

  // If no cached data, fetch from Supabase
  try {
    // In a real application, this would be based on user search history
    // For now, we'll just get random diverse medicines to simulate recent searches
    const { data, error } = await supabase
      .from("medicine")
      .select("id, name, therapeutic_class, manufacturer_name")
      .order("id", { ascending: false }) // Newest first
      .limit(20); // Get more than we need for caching

    if (error) throw error;

    const searches = data.map(medicine => ({
      id: medicine.id,
      name: medicine.name,
      type: medicine.therapeutic_class,
      manufacturer_name: medicine.manufacturer_name
    }));
    
    // Cache all searches data (not just the limited set)
    cacheData(CACHE_KEY, searches);

    // Return the requested limit
    return searches.slice(0, limit);
  } catch (error) {
    console.error("Error fetching recent searches:", error);
    return [];
  }
}; 