/**
 * The site's arrow glyph. Kept in its own module (not in the client-side Nav) so that using it doesn't pull Nav —
 * and through it every page's nav content — into the client bundle.
 */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className={className}>
      <path d="M2 7h10M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
