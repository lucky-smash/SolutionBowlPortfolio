import Link from 'next/link';
import { Arrow } from '@/components/chrome/Nav';

type Variant = 'ink' | 'orange' | 'ghost' | 'paper';

const styles: Record<Variant, { base: string; dot: string }> = {
  ink: { base: 'bg-ink text-paper hover:bg-ink-hover', dot: 'bg-orange text-ink' },
  orange: { base: 'bg-orange text-ink hover:bg-orange-hover', dot: 'bg-ink text-paper' },
  paper: { base: 'bg-paper text-ink hover:bg-white', dot: 'bg-orange text-ink' },
  ghost: { base: 'border border-[var(--line-strong)] text-ink hover:bg-ink/5', dot: 'bg-ink text-paper' },
};

/** Pill button with a round arrow badge that turns on hover. Internal links use next/link. */
export default function Button({
  href,
  children,
  variant = 'ink',
  className = '',
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const s = styles[variant];
  const cls = `group inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold transition-colors duration-300 ${s.base} ${className}`;
  const inner = (
    <>
      <span className="py-1.5 [overflow-wrap:anywhere]">{children}</span>
      <span className={`grid size-9 flex-none place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 ${s.dot}`}>
        <Arrow />
      </span>
    </>
  );
  if (external || /^(https?:|mailto:|tel:)/.test(href))
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
