import { createClient } from "@supabase/supabase-js";
import { Medicine } from "@/types";
import { cacheData, getCachedData } from "./cacheUtils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type PopularMedicine = {
  id: number;
  name: string;
  type: string | null;
  manufacturer_name: string | null;
};

const CACHE_KEY = "aushadh_cache_popular_medicines";

export const getPopularMedicines = async (limit: number = 3): Promise<PopularMedicine[]> => {
  // Check for cached data first
  const cachedMedicines = getCachedData<PopularMedicine[]>(CACHE_KEY);
  if (cachedMedicines) {
    // If we have cached data but need a different limit, filter the cached data
    return cachedMedicines.slice(0, limit);
  }

  // If no cached data, fetch from Supabase
  try {
    // In a real application, this would be based on usage metrics
    // For now, we'll just get random medicines to simulate trending items
    const { data, error } = await supabase
      .from("medicine")
      .select("id, name, therapeutic_class, manufacturer_name")
      .order("name") // Replace with "views" or "recent_searches" in a real app
      .limit(20); // Get more than we need for caching

    if (error) throw error;

    const medicines = data.map(medicine => ({
      id: medicine.id,
      name: medicine.name,
      type: medicine.therapeutic_class,
      manufacturer_name: medicine.manufacturer_name
    }));
    
    // Cache all medicines data (not just the limited set)
    cacheData(CACHE_KEY, medicines);

    // Return the requested limit
    return medicines.slice(0, limit);
  } catch (error) {
    console.error("Error fetching popular medicines:", error);
    return [];
  }
}; 