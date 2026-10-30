import type { ReactNode } from 'react';
import Lines from './Lines';

/** Eyebrow + line-masked display title + optional intro, in the site's editorial voice. */
export default function SectionHead({
  eyebrow,
  title,
  intro,
  accentLine,
  align = 'split',
  tone = 'light',
  size = 'h2',
  id,
  aside,
}: {
  eyebrow?: string;
  title: string[] | string;
  intro?: ReactNode;
  /** Index of the line set in orange. */
  accentLine?: number;
  align?: 'split' | 'stack' | 'center';
  tone?: 'light' | 'dark';
  size?: 'h1' | 'h2' | 'h3';
  id?: string;
  aside?: ReactNode;
}) {
  const lines = Array.isArray(title) ? title : [title];
  const fs = size === 'h1' ? 'text-[length:var(--fs-h1)]' : size === 'h2' ? 'text-[length:var(--fs-h2)]' : 'text-[length:var(--fs-h3)]';
  const sub = tone === 'dark' ? 'text-paper/70' : 'text-ink-2';
  const accent = tone === 'dark' ? 'text-orange' : 'text-orange-ink';
  const Head = (
    <div>
      {eyebrow && (
        <p className={`eyebrow mb-5 ${sub}`} data-reveal>
          {eyebrow}
        </p>
      )}
      <Lines id={id} as={size === 'h1' ? 'h1' : 'h2'} lines={lines} className={`display ${fs}`} lineClassName={(i) => (i === accentLine ? accent : '')} />
    </div>
  );
  if (align === 'center')
    return (
      <div className="mx-auto max-w-5xl text-center">
        {Head}
        {intro && (
          <div className={`lede mx-auto mt-6 max-w-2xl ${sub}`} data-reveal>
            {intro}
          </div>
        )}
        {aside}
      </div>
    );
  if (align === 'stack')
    return (
      <div className="max-w-5xl">
        {Head}
        {intro && (
          <div className={`lede mt-6 max-w-2xl ${sub}`} data-reveal>
            {intro}
          </div>
        )}
        {aside}
      </div>
    );
  return (
    <div className="grid items-end gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">{Head}</div>
      <div className="lg:col-span-4">
        {intro && (
          <div className={`lede ${sub}`} data-reveal>
            {intro}
          </div>
        )}
        {aside}
      </div>
    </div>
  );
}
