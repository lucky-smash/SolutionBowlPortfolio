import type { CSSProperties, ElementType, ReactNode } from 'react';

/**
 * A heading set line by line: each line sits in its own mask and rises into place (see MotionRoot).
 * `intro` defers the entrance on the home page until the opening sequence has played.
 */
export default function Lines({
  as: Tag = 'h2',
  lines,
  className = '',
  lineClassName = '',
  intro = false,
  enter = false,
  delay = 0,
  children,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string | ((i: number) => string);
  intro?: boolean;
  /** Above-the-fold headings: rise with a CSS animation from first paint instead of waiting for hydration (LCP). */
  enter?: boolean;
  delay?: number;
  children?: ReactNode;
  id?: string;
}) {
  const motion = enter ? { 'data-enter': '' } : { 'data-lines': intro ? 'intro' : '', 'data-lines-delay': delay || undefined };
  return (
    <Tag id={id} className={className} {...motion}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          <span className={`line-inner ${typeof lineClassName === 'function' ? lineClassName(i) : lineClassName}`} style={enter ? ({ '--i': i } as CSSProperties) : undefined}>
            {l}
          </span>
          {/* Keeps words apart in the accessible name; invisible between block lines. */}
          {i < lines.length - 1 && ' '}
        </span>
      ))}
      {children}
    </Tag>
  );
}
