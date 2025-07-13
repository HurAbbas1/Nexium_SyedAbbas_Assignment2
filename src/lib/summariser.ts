export function summarise(text: string): string {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return sentences.slice(0, 2).join(' ').trim();
}
