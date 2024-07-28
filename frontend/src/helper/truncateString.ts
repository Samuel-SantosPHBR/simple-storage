export const truncateString = (text: string, length = 22) => {
  if (text.length > length) return text.slice(0, length) + "...";

  return text;
};
