'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import type { TeamMember } from '@/content/company';
import { EASE, reducedMotion } from '@/lib/motion';
import { teamPhoto } from './media';

const ALL = 'All';

/** The wider team, filterable by craft (groups come from the members' own `group`). */
export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const groups = [ALL, ...Array.from(new Set(members.map((m) => m.group).filter(Boolean) as string[]))];
  const [filter, setFilter] = useState(ALL);
  const grid = useRef<HTMLUListElement>(null);
  const first = useRef(true);
  const shown = filter === ALL ? members : members.filter((m) => m.group === filter);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const kids = grid.current?.children;
    if (!kids || reducedMotion()) return;
    animate(kids, {
      opacity: [0, 1],
      translateY: [26, 0],
      scale: [0.97, 1],
      duration: 800,
      delay: stagger(45),
      ease: EASE.out,
    });
  }, [filter]);

  return (
    <div className="mt-14">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter the team by craft">
        {groups.map((g) => {
          const count = g === ALL ? members.length : members.filter((m) => m.group === g).length;
          const on = g === filter;
          return (
            <button
              key={g}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(g)}
              className={`tag gap-2 py-3 pl-5 pr-3 text-[0.95rem] transition-colors duration-300 ${on ? 'bg-ink text-paper' : 'border border-[var(--line-strong)] bg-paper/60 hover:bg-paper'}`}
            >
              {g}
              <span className={`grid min-w-7 place-items-center rounded-full px-1.5 py-1 text-xs tabular-nums ${on ? 'bg-orange text-ink' : 'bg-cream-2 text-ink'}`}>{count}</span>
            </button>
          );
        })}
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} people
        </p>
      </div>

      <ul ref={grid} className="mt-10 grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:gap-x-6" data-stagger>
        {shown.map((m, i) => (
          <li key={m.name} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-sand">
              <Image
                src={teamPhoto(m.name)}
                alt={`Portrait of ${m.name}`}
                fill
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                className="object-cover object-top transition-[filter,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
              />
              {m.group && (
                <span
                  aria-hidden
                  className={`tag absolute right-3 top-3 bg-orange text-[0.72rem] text-ink opacity-0 shadow-[0_10px_20px_-12px_rgb(40_20_5/0.6)] transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-100 ${
                    i % 2 ? 'rotate-[10deg] group-hover:rotate-[4deg]' : 'rotate-[-10deg] group-hover:rotate-[-4deg]'
                  }`}
                >
                  {m.group}
                </span>
              )}
            </div>
            <h3 className="display-soft mt-4 text-[clamp(1.03rem,0.9rem+0.45vw,1.3rem)] leading-tight">{m.name}</h3>
            <p className="mt-1 text-[0.9rem] leading-snug text-ink-2">{m.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
