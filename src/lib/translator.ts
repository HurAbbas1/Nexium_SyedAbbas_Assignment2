const urduDict: Record<string, string> = {
  hello: "سلام",
  world: "دنیا",
  blog: "بلاگ",
  this: "یہ",
  is: "ہے",
  a: "ایک",
  summary: "خلاصہ",
  // Add more words for better results
};

export function translateToUrdu(text: string): string {
  return text.split(' ').map(word => {
    const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
    return urduDict[cleaned] || word;
  }).join(' ');
}
