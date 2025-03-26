import { createClient } from "@supabase/supabase-js";
import { cacheData, getCachedData } from "./cacheUtils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type ActionClass = {
  name: string;
  count: number;
};

const CACHE_KEY = "aushadh_cache_action_classes";

export const getActionClasses = async (limit: number = 12): Promise<ActionClass[]> => {
  // Check for cached data first
  const cachedClasses = getCachedData<ActionClass[]>(CACHE_KEY);
  if (cachedClasses) {
    // If we have cached data but need a different limit, filter the cached data
    return cachedClasses.slice(0, limit);
  }

  // If no cached data, fetch from Supabase
  try {
    const { data, error } = await supabase
      .from("medicine")
      .select("action_class")
      .not("action_class", "is", null);

    if (error) throw error;

    // Count medicines by action class
    const classCounts: Record<string, number> = {};
    data.forEach((item) => {
      const actionClass = item.action_class;
      if (actionClass) {
        classCounts[actionClass] = (classCounts[actionClass] || 0) + 1;
      }
    });

    // Convert to array and sort by count
    const actionClasses = Object.entries(classCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    // Cache all action classes data (not just the limited set)
    cacheData(CACHE_KEY, actionClasses);

    // Return the requested limit
    return actionClasses.slice(0, limit);
  } catch (error) {
    console.error("Error fetching action classes:", error);
    return [];
  }
}; 