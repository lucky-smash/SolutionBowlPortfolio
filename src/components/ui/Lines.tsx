import type { ElementType, ReactNode } from 'react';

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
  delay = 0,
  children,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string | ((i: number) => string);
  intro?: boolean;
  delay?: number;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} data-lines={intro ? 'intro' : ''} data-lines-delay={delay || undefined}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          <span className={`line-inner ${typeof lineClassName === 'function' ? lineClassName(i) : lineClassName}`}>{l}</span>
          {/* Keeps words apart in the accessible name; invisible between block lines. */}
          {i < lines.length - 1 && ' '}
        </span>
      ))}
      {children}
    </Tag>
  );
}
