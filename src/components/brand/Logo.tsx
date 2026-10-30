import { LOGO_GREY, LOGO_ORANGE, LOGO_VIEWBOX } from './logo-paths';

/**
 * The official Solution Bowl logo, vectorised from public/brand/solution-bowl-logo.png (scripts/trace-logo.mjs).
 * `full` is the stacked logo exactly as published; `symbol` is the SB mark alone (the same artwork, cropped above
 * the wordmark). Proportions are fixed by the viewBox — size it with height or width only.
 */
export default function Logo({
  variant = 'full',
  className,
  title = 'Solution Bowl',
}: {
  variant?: 'full' | 'symbol';
  className?: string;
  title?: string | null;
}) {
  const h = variant === 'full' ? LOGO_VIEWBOX.height : LOGO_VIEWBOX.symbolHeight;
  return (
    <svg
      viewBox={`0 0 ${LOGO_VIEWBOX.width} ${h}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title ?? undefined}
    >
      <path fill="#F58634" fillRule="evenodd" d={LOGO_ORANGE} />
      <path fill="#848688" fillRule="evenodd" d={LOGO_GREY} />
    </svg>
  );
}

export const LOGO_ASPECT = LOGO_VIEWBOX.width / LOGO_VIEWBOX.height;
export const SYMBOL_ASPECT = LOGO_VIEWBOX.width / LOGO_VIEWBOX.symbolHeight;
