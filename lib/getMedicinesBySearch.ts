import { createClient } from "@supabase/supabase-js";
import { Medicine } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getMedicinesBySearch = async (
  query: string,
  page: number = 1,
  pageSize: number = 24
): Promise<{ medicines: Medicine[]; total: number }> => {
  const offset = (page - 1) * pageSize;

  if (!query) {
    return { medicines: [], total: 0 };
  }

  const queryLower = `%${query.toLowerCase()}%`;

  const { data, error, count } = await supabase
    .from("medicine")
    .select("*", { count: "exact" }) 
    .or(
      `name.ilike.${queryLower},use.ilike.${queryLower},manufacturer_name.ilike.${queryLower},therapeutic_class.ilike.${queryLower},chemical_class.ilike.${queryLower},action_class.ilike.${queryLower}`
    )
    .order("name", { ascending: true })
    .range(offset, offset + pageSize - 1); 

  if (error) {
    console.error("Error fetching medicines:", error.message || error);
    return { medicines: [], total: 0 };
  }

  return { medicines: data as Medicine[], total: count || 0 };
};
