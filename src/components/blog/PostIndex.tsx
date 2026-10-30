'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Arrow } from '@/components/chrome/Nav';
import { DUR, EASE, reducedMotion } from '@/lib/motion';
import type { ReactNode } from 'react';
import type { PostSummary } from './utils';

const ALL = 'All';

/** Every article as a big editorial row, with category pills to narrow the list. */
export default function PostIndex({ posts, heading }: { posts: PostSummary[]; heading?: ReactNode }) {
  const categories = [ALL, ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState(ALL);
  const listRef = useRef<HTMLOListElement>(null);
  const first = useRef(true);
  const shown = active === ALL ? posts : posts.filter((p) => p.category === active);

  // Rows settle in when the filter changes (the first paint is handled by MotionRoot).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const rows = listRef.current?.children;
    if (!rows?.length || reducedMotion()) return;
    animate(rows, { opacity: [0, 1], translateY: [24, 0], duration: DUR.reveal * 0.8, delay: stagger(70), ease: EASE.out });
  }, [active]);

  return (
    <div>
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">{heading}</div>
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-2 lg:col-span-5 lg:justify-end" role="group" aria-label="Filter articles by category" data-reveal>
            {categories.map((c) => {
              const count = c === ALL ? posts.length : posts.filter((p) => p.category === c).length;
              const on = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(c)}
                  className={`tag cursor-pointer py-2.5 text-[0.875rem] capitalize transition-colors duration-300 ${
                    on ? 'bg-ink text-paper' : 'border border-[var(--line-strong)] bg-paper/60 hover:bg-paper'
                  }`}
                >
                  {c}
                  <span className={`tabular-nums ${on ? 'text-orange' : 'text-ink-2'}`}>{String(count).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? 'article' : 'articles'} shown
      </p>
      <ol ref={listRef} className="mt-10 border-t border-ink" data-stagger>
        {shown.map((p) => {
          const n = posts.indexOf(p) + 1;
          return (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group relative isolate grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-4 overflow-hidden border-b border-ink py-8 md:grid-cols-[4rem_minmax(0,1.6fr)_minmax(0,1fr)_auto] md:items-start md:gap-x-8 md:py-12"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-orange transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="pt-1 text-sm font-semibold tabular-nums text-ink-2 group-hover:text-ink">{String(n).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <span className="tag mb-4 border border-[var(--line-strong)] bg-paper/70 capitalize">{p.category}</span>
                  <h3 className="display text-[clamp(1.71rem,0.99rem+2.16vw,3.24rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {p.title}
                  </h3>
                </span>
                <span className="col-start-2 flex flex-col gap-4 md:col-start-3 md:pt-10">
                  <span className="line-clamp-4 text-ink-2 group-hover:text-ink">{p.excerpt}</span>
                  {p.readTime && <span className="text-sm font-semibold">{p.readTime}</span>}
                </span>
                <span
                  aria-hidden
                  className="col-start-2 grid size-12 place-items-center rounded-full border border-[var(--line-strong)] transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:col-start-4 md:mt-10"
                >
                  <Arrow />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
