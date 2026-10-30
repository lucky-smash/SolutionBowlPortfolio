'use client';

import { useEffect, useState } from 'react';

/** Sticky section index for a legal page; the section being read is marked. */
export default function LegalIndex({ items }: { items: { id: string; heading: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last short sections can't reach the line: mark the last one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4 && current) {
        const last = items[items.length - 1].id;
        const lastEl = document.getElementById(last);
        if (lastEl && lastEl.getBoundingClientRect().top < window.innerHeight) current = last;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav aria-label="Sections" className="text-sm">
      <p className="eyebrow text-ink-2">Contents</p>
      <ol className="mt-5 border-l border-[var(--line-strong)]">
        {items.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id} className="relative">
              <span
                aria-hidden
                className={`absolute -left-px top-1 bottom-1 w-[3px] rounded-full bg-orange transition-transform duration-500 ease-[var(--ease-out-expo)] ${on ? 'scale-y-100' : 'scale-y-0'}`}
              />
              <a
                href={`#${s.id}`}
                aria-current={on ? 'location' : undefined}
                className={`grid grid-cols-[1.9rem_1fr] gap-1 py-1.5 pl-4 leading-snug transition-colors duration-300 ${on ? 'font-semibold text-ink' : 'text-ink-2 hover:text-ink'}`}
              >
                <span className={`tabular-nums ${on ? 'text-orange-deep' : ''}`}>{String(i + 1).padStart(2, '0')}</span>
                <span>{s.heading}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
