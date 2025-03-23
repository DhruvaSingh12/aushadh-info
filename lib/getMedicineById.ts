import { createClient } from "@supabase/supabase-js";
import { Medicine } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getMedicineById = async (id: string): Promise<Medicine | null> => {
  const { data, error } = await supabase
    .from("medicine")
    .select("*")
    .eq("id", id) 
    .single();

  if (error) {
    console.error("Error fetching medicine by ID:", error.message || error);
    return null;
  }

  return data as Medicine;
};