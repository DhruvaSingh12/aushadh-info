import { createClient } from "@supabase/supabase-js";
import { Medicine } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getMedicinesByManufacturer = async (
  manufacturerName: string
): Promise<Medicine[]> => {
  const { data, error } = await supabase
    .from("medicine")
    .select("*")
    .eq("manufacturer_name", manufacturerName);

  if (error) {
    console.error("Error fetching medicines by manufacturer:", error.message || error);
    return [];
  }

  return data as Medicine[];
};