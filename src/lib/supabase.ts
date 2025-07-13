import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function saveToSupabase(data: {
  url: string;
  summary: string;
  urdu: string;
}) {
  const { error } = await supabase.from("summaries").insert([data]);
  if (error) {
    console.error("❌ Supabase Insert Error:");
    console.error("Message:", error.message);
    console.error("Details:", error.details);
    console.error("Hint:", error.hint);
    throw error;
  } else {
    console.log("✅ Supabase insert success");
  }
}
