/**
 * Breaks a title into display lines of roughly `max` characters, balancing the line lengths so the last line is
 * never a lonely word. Used to set long CMS-style titles as masked, line-by-line headings.
 */
export function toLines(text: string, max = 18): string[] {
  const words = text.trim().split(/\s+/);
  const total = text.length;
  const count = Math.max(1, Math.ceil(total / max));
  const target = total / count;
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (cur && next.length > target * 1.12 && lines.length < count - 1) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}
