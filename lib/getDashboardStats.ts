import { createClient } from "@supabase/supabase-js";
import { cacheData, getCachedData } from "./cacheUtils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type DashboardStats = {
  medicineCount: number;
  manufacturerCount: number;
  therapeuticClassCount: number;
};

const CACHE_KEY = "aushadh_cache_dashboard_stats";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Check for cached data first
  const cachedStats = getCachedData<DashboardStats>(CACHE_KEY);
  if (cachedStats) {
    return cachedStats;
  }

  // If no cached data, fetch from Supabase
  try {
    // Get medicine count
    const { count: medicineCount, error: medicineError } = await supabase
      .from("medicine")
      .select("*", { count: "exact", head: true });

    if (medicineError) throw medicineError;

    // Get unique manufacturers count
    const { data: manufacturers, error: manufacturerError } = await supabase
      .from("medicine")
      .select("manufacturer_name")
      .not("manufacturer_name", "is", null);

    if (manufacturerError) throw manufacturerError;

    // Get unique therapeutic classes count
    const { data: therapeuticClasses, error: therapeuticError } = await supabase
      .from("medicine")
      .select("therapeutic_class")
      .not("therapeutic_class", "is", null);

    if (therapeuticError) throw therapeuticError;

    // Count unique values
    const uniqueManufacturers = new Set(
      manufacturers.map((item) => item.manufacturer_name)
    );
    const uniqueTherapeuticClasses = new Set(
      therapeuticClasses.map((item) => item.therapeutic_class)
    );

    const stats = {
      medicineCount: medicineCount || 0,
      manufacturerCount: uniqueManufacturers.size,
      therapeuticClassCount: uniqueTherapeuticClasses.size,
    };

    // Cache the results
    cacheData(CACHE_KEY, stats);

    return stats;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      medicineCount: 0,
      manufacturerCount: 0,
      therapeuticClassCount: 0,
    };
  }
}; 