export const truncateString = (text: string | undefined, length = 22) => {
  if (!text) return "";
  if (text.length > length) return text.slice(0, length) + "...";

  return text;
};
