export function caracterLimiter({ text = '' }) {
  if (text.length <= 10) return text;
  return text.slice(0, 20) + "...";
}
