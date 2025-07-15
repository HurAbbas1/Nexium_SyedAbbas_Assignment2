export function summarise(text: string): string {
  // Clean and split the text into lines
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 40); // Ignore empty or too-short lines

  // Take the first 3 valid lines
  const summaryLines = lines.slice(0, 3);

  // Join into a single summary
  return summaryLines.join(' ');
}
