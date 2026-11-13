'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { appPreviews, kindFilters, sectorOrder, type AppPreview, type Kind, type Project, type Sector } from '@/content/projects';
import { EASE, reducedMotion } from '@/lib/motion';
import { Arrow } from '@/components/chrome/Nav';
import CoverReveal from './CoverReveal';
import LivePhone from './LivePhone';

type KindFilter = Kind | 'All';
type SectorFilter = Sector | 'All';

/**
 * The editorial index of all projects. Cards take varied sizes in a 12-column rhythm (wide / narrow, a row of
 * three, narrow / wide …), so the grid reads like a spread rather than a catalogue. Filtering re-lays the grid and
 * brings the cards in with a short stagger.
 */
const RHYTHM = [7, 5, 4, 4, 4, 5, 7, 6, 6];

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [kind, setKind] = useState<KindFilter>('All');
  const [sector, setSector] = useState<SectorFilter>('All');
  const grid = useRef<HTMLUListElement>(null);
  const first = useRef(true);

  const inKind = projects.filter((p) => kind === 'All' || p.kind === kind);
  // Industries offered under the current capsule: only those with at least one project in it.
  const sectors = sectorOrder.filter((s) => inKind.some((p) => p.sectors.includes(s)));
  const activeSector = sector !== 'All' && sectors.includes(sector) ? sector : 'All';
  // Apps lead the grid (and every filtered view); the rest keep their order.
  const shown = inKind
    .filter((p) => activeSector === 'All' || p.sectors.includes(activeSector))
    .sort((a, b) => Number(b.id in appPreviews) - Number(a.id in appPreviews));
  const kinds = kindFilters.filter((k) => projects.some((p) => p.kind === k.kind));

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!grid.current || reducedMotion()) return;
    animate(grid.current.children, { opacity: [0, 1], translateY: [40, 0], scale: [0.97, 1], duration: 900, delay: stagger(60), ease: EASE.out });
  }, [kind, activeSector]);

  const pickKind = (k: KindFilter) => {
    setKind(k);
    setSector('All');
  };

  return (
    <div>
      <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
        {([{ kind: 'All', label: 'All Projects' }, ...kinds] as { kind: KindFilter; label: string }[]).map((k) => (
          <button
            key={k.kind}
            type="button"
            aria-pressed={kind === k.kind}
            onClick={() => pickKind(k.kind)}
            className={`tag py-2.5 text-sm transition-colors ${kind === k.kind ? 'bg-ink text-paper' : 'border border-[var(--line-strong)] bg-paper hover:bg-cream-2'}`}
          >
            {k.label}
          </button>
        ))}
      </div>
      {sectors.length > 1 && (
        <div role="group" aria-label="Filter by industry" className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2">
          {(['All', ...sectors] as SectorFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={activeSector === s}
              onClick={() => setSector(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeSector === s ? 'bg-orange text-ink' : 'text-ink-2 hover:bg-cream-2 hover:text-ink'
              }`}
            >
              {s === 'All' ? 'All' : s}
            </button>
          ))}
        </div>
      )}
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
  const app = appPreviews[p.id];
  const cover = (
    <div className={`relative overflow-hidden rounded-[var(--radius)] bg-cream-2 ${tall ? 'aspect-[4/4.4]' : 'aspect-[1.36]'}`}>
      {app ? (
        <AppCover app={app} />
      ) : p.image ? (
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
      {!app && p.image && p.accent && <CoverReveal accent={p.accent} index={index} />}
      <span className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-ink text-paper opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:-rotate-45 group-hover:opacity-100">
        <Arrow />
      </span>
      <span className="tag absolute left-4 top-4 bg-paper/95">{p.sector}</span>
    </div>
  );
  return (
    <article className="group">
      <Link href={`/portfolio/${p.id}`} className="block">
        {cover}
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

/** An app project's cover: its brand colour, the app icon and a live 3D phone running the app. */
function AppCover({ app }: { app: AppPreview }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden text-[#fff]"
      style={{ background: `radial-gradient(110% 90% at 78% 30%, color-mix(in oklab, ${app.color} 75%, white), ${app.color} 38%, color-mix(in oklab, ${app.color} 28%, black) 100%)` }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-relief.svg')] bg-[length:168px_148px] opacity-35 mix-blend-overlay" />
      <LivePhone app={app} poster={app.cover} className="!absolute inset-y-0 right-0 w-[60%]" />
      <div className="pointer-events-none absolute bottom-[8%] left-[7%] flex max-w-[40%] flex-col items-start gap-3">
        <span className="block size-[clamp(3.75rem,6.5vw,5.5rem)] overflow-hidden rounded-[22%] shadow-[0_18px_40px_-12px_rgb(0_0_0/0.55)] ring-1 ring-[#ffffff4d] motion-safe:group-hover:animate-[jiggle_0.32s_ease-in-out_infinite]">
          <Image src={`/img/apps/${app.id}/icon.webp`} alt="" width={88} height={88} className="size-full object-cover" />
        </span>
        <span className="display text-[clamp(1.3rem,0.9rem+1.3vw,2rem)] leading-none drop-shadow">{app.name}</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] backdrop-blur">
          <span className="size-1.5 rounded-full bg-[#4ade80] motion-safe:animate-pulse" />
          {app.users ? `${app.users} users` : 'Live app'}
        </span>
      </div>
    </div>
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
