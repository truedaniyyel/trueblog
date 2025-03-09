export function readingTime(html: string, wpm = 200) {
  const textOnly = html.replace(/<[^>]+>/g, '');
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wpm);
  return `${readingTimeMinutes} min read`;
}
