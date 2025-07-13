import { scrapeBlog } from "@/lib/scraper";
import { summarise } from "@/lib/summariser";
import { translateToUrdu } from "@/lib/translator";
import { saveToSupabase } from "@/lib/supabase";
import { saveToMongo } from "@/lib/mongo";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log("Received URL:", url);

    const blogText = await scrapeBlog(url);
    console.log("Scraped Text:", blogText.substring(0, 100));

    const summary = summarise(blogText);
    console.log("Summary:", summary);

    const urdu = translateToUrdu(summary);
    console.log("Urdu:", urdu);

    console.log("Saving to Supabase...");
    await saveToSupabase({ url, summary, urdu });

    console.log("Saving to MongoDB...");
    await saveToMongo({ url, fullText: blogText });

    return Response.json({ urdu });
  } catch (error: any) {
    console.error("❌ API Error:", error?.message || error);
    return new Response("Failed to summarise", { status: 500 });
  }
}
