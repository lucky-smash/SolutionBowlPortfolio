'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import type { Project } from '@/content/projects';
import { EASE, reducedMotion } from '@/lib/motion';
import { Arrow } from '@/components/chrome/Nav';
import CoverReveal from './CoverReveal';

const FILTERS = ['All Projects', 'FinTech', 'Healthcare', 'E-Commerce', 'Real Estate', 'Mobile Apps', 'Enterprise'] as const;

/**
 * The editorial index of all projects. Cards take varied sizes in a 12-column rhythm (wide / narrow, a row of
 * three, narrow / wide …), so the grid reads like a spread rather than a catalogue. Filtering re-lays the grid and
 * brings the cards in with a short stagger.
 */
const RHYTHM = [7, 5, 4, 4, 4, 5, 7, 6, 6];

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All Projects');
  const grid = useRef<HTMLUListElement>(null);
  const first = useRef(true);
  const shown = projects.filter((p) => filter === 'All Projects' || p.sectors.includes(filter as Project['sector']));
  const counts = Object.fromEntries(FILTERS.map((f) => [f, f === 'All Projects' ? projects.length : projects.filter((p) => p.sectors.includes(f as Project['sector'])).length]));

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!grid.current || reducedMotion()) return;
    animate(grid.current.children, { opacity: [0, 1], translateY: [40, 0], scale: [0.97, 1], duration: 900, delay: stagger(60), ease: EASE.out });
  }, [filter]);

  return (
    <div>
      <div role="group" aria-label="Filter projects by sector" className="flex flex-wrap gap-2">
        {FILTERS.filter((f) => counts[f] > 0).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`tag gap-2 py-2.5 text-sm transition-colors ${filter === f ? 'bg-ink text-paper' : 'border border-[var(--line-strong)] bg-paper hover:bg-cream-2'}`}
          >
            {f}
            <span className={`text-xs tabular-nums ${filter === f ? 'text-orange' : 'text-ink-2'}`}>{counts[f]}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} projects shown
      </p>
      <ul ref={grid} className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12">
        {shown.map((p, i) => {
          const span = RHYTHM[i % RHYTHM.length];
          return (
            <li key={p.id} className={`md:col-span-6 ${spanClass[span]} ${i % 3 === 1 ? 'lg:mt-16' : ''}`}>
              <WorkCard p={p} tall={span <= 4} index={i} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const spanClass: Record<number, string> = { 4: 'lg:col-span-4', 5: 'lg:col-span-5', 6: 'lg:col-span-6', 7: 'lg:col-span-7' };

function WorkCard({ p, tall, index }: { p: Project; tall: boolean; index: number }) {
  return (
    <article className="group">
      <Link href={`/portfolio/${p.id}`} className="block">
        <div className={`relative overflow-hidden rounded-[var(--radius)] bg-cream-2 ${tall ? 'aspect-[4/4.4]' : 'aspect-[1.36]'}`}>
          {p.image ? (
            <Image
              src={`/img/portfolio/${p.image}.webp`}
              alt={`${p.name} — ${p.descriptor}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
            />
          ) : (
            <TypePanel p={p} />
          )}
          {p.image && p.accent && <CoverReveal image={p.image} accent={p.accent} note={p.metrics[0]} label={p.urlLabel} index={index} sizes="(min-width: 1024px) 50vw, 100vw" />}
          <span className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-ink text-paper opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:-rotate-45 group-hover:opacity-100">
            <Arrow />
          </span>
          <span className="tag absolute left-4 top-4 bg-paper/95">{p.sector}</span>
        </div>
        <div className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-[1fr_auto]">
          <h3 className="display text-[clamp(1.71rem,1.17rem+1.44vw,2.7rem)]">{p.name}</h3>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-orange-deep sm:pt-2 sm:text-right">{p.region}</p>
          <p className="text-ink-2 sm:col-span-2">{p.descriptor}</p>
        </div>
      </Link>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.metrics.map((m) => (
          <li key={m} className="tag border border-[var(--line-strong)] bg-paper/70 font-medium">
            {m}
          </li>
        ))}
      </ul>
    </article>
  );
}

/** For projects without a published render: the name set as a poster. */
const PANEL = ["bg-orange text-ink", "bg-ink text-paper", "bg-paper text-ink"];
export function TypePanel({ p }: { p: Project }) {
  const tone = PANEL[[...p.id].reduce((a, c) => a + c.charCodeAt(0), 0) % PANEL.length];
  return (
    <div className={`absolute inset-0 flex flex-col justify-end overflow-hidden p-6 ${tone}`}>
      <div aria-hidden className="absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-25 mix-blend-multiply" />
      <span aria-hidden className="absolute right-6 top-6 size-3 rounded-full bg-orange" />
      <span className="relative text-xs font-semibold uppercase tracking-[0.16em]">{p.urlLabel}</span>
      <span className="display relative mt-2 text-[clamp(2.03rem,1.25rem+2.65vw,4.29rem)] leading-[0.85]">{p.name}</span>
    </div>
  );
}
