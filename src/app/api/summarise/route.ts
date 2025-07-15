import { scrapeBlog } from "@/lib/scraper";
import { summarise } from "@/lib/summariser";
import { translateToUrdu } from "@/lib/translator";
import { saveToSupabase } from "@/lib/supabase";
import { saveToMongo } from "@/lib/mongo";

export async function POST(req: Request) {
  try {
    const { url }: { url: string } = await req.json();

    console.log("📥 Received blog URL:", url);

    // Step 1: Scrape blog content from the URL
    const blogText = await scrapeBlog(url);

    console.log("📄 Raw blog content (start):", blogText.slice(0, 200));

    // Step 2: Get a static summary (first 3 clean lines)
    const summary = summarise(blogText);

    console.log("📝 English Summary:", summary);

    // Step 3: Translate to Urdu using static dictionary
    const urdu = translateToUrdu(summary);

    console.log("📘 Urdu Summary:", urdu);

    // Step 4: Save to Supabase and MongoDB
    await saveToSupabase({ url, summary, urdu });
    await saveToMongo({ url, fullText: blogText });

    // Return summary
    return Response.json({ urdu });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("❌ API Error:", message);
    return new Response("Failed to summarise", { status: 500 });
  }
}
