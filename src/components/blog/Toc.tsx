'use client';

import { useEffect, useState } from 'react';
import type { Heading } from './utils';

/** Tracks which heading the reader is in: the last one whose top has passed 35% of the viewport. */
export function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
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
  }, [ids]);
  return active;
}

/** Sticky "On this page" list for the article (desktop), with a reading-progress rule. */
export default function Toc({ items, articleId }: { items: Heading[]; articleId: string }) {
  const [ids] = useState(() => items.map((i) => i.id));
  const active = useActiveHeading(ids);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = document.getElementById(articleId);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, (window.innerHeight * 0.4 - r.top) / Math.max(1, total))));
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
  }, [articleId]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="eyebrow text-ink-2">On this page</p>
      <div aria-hidden className="mt-5 h-[3px] overflow-hidden rounded-full bg-[var(--line)]">
        <div className="h-full origin-left rounded-full bg-orange" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <ol className="mt-5 space-y-1">
        {items.map((h, i) => {
          const on = h.id === active;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={on ? 'location' : undefined}
                className={`group grid grid-cols-[1.75rem_1fr] gap-1 rounded-lg py-1.5 leading-snug transition-colors duration-300 ${
                  on ? 'font-semibold text-ink' : 'text-ink-2 hover:text-ink'
                }`}
              >
                <span className={`tabular-nums transition-colors ${on ? 'text-orange-deep' : 'text-ink-2'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
