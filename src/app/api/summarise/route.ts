import { scrapeBlog } from "@/lib/scraper";
import { summarise } from "@/lib/summariser";
import { translateToUrdu } from "@/lib/translator";
import { saveToSupabase } from "@/lib/supabase";
import { saveToMongo } from "@/lib/mongo";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log("✅ Received URL:", url);

    const blogText = await scrapeBlog(url);
    console.log("📝 Scraped Text:", blogText.substring(0, 100));

    const summary = summarise(blogText);
    console.log("✍️ Summary:", summary);

    const urdu = translateToUrdu(summary);
    console.log("🌐 Urdu:", urdu);

    await saveToSupabase({ url, summary, urdu });
    await saveToMongo({ url, fullText: blogText });

    return Response.json({ urdu });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("❌ API Error:", message);
    return new Response("Failed to summarise", { status: 500 });
  }
}
