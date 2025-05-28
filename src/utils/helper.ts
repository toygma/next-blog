export const minRead = (content: string) => {
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return readingTime
};
