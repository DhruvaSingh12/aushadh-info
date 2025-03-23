import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getMedicinesCountByManufacturer = async (manufacturer: string): Promise<number> => {
  const { count, error } = await supabase
    .from("medicine")
    .select("*", { count: "exact" })
    .ilike("manufacturer_name", `%${manufacturer}%`);

  if (error) {
    console.error("Error fetching medicine count:", error.message || error);
    return 0;
  }

  return count || 0;
};
