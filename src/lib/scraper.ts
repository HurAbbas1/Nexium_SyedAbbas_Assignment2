export async function scrapeBlog(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    const html = await res.text();

    // Extract <p> tags using basic regex (not ideal but works without cheerio)
    const paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/gim);

    if (!paragraphs || paragraphs.length === 0) {
      return "No readable content found in the blog.";
    }

    // Clean HTML tags from paragraphs
    const text = paragraphs
      .map(p => p.replace(/<[^>]+>/g, '').trim())
      .filter(p => p.length > 40) // Skip tiny lines
      .slice(0, 10) // Limit to top 10 paragraphs
      .join(' ');

    return text || "No valid blog content found.";
  } catch (err) {
    console.error("Scraping failed:", err);
    return "Failed to fetch or parse blog content.";
  }
}
