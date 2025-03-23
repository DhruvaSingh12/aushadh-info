import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getTherapeuticClassInfo = async (
  therapeuticClass: string
): Promise<{ description: string | null; frequency: number | null } | null> => {
  const { data, error } = await supabase
    .from("therapeutic")
    .select("description, frequency")
    .ilike("therapeutic_class", `%${therapeuticClass}%`)
    .single();

  if (error) {
    console.error("Error fetching therapeutic class info:", error.message || error);
    return null;
  }

  return data || null;
};
