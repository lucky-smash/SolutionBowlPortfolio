'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { EASE, reducedMotion } from '@/lib/motion';
import { pad } from './media';

type Milestone = { year: string; text: string };

/**
 * The 2017–2026 journey as a horizontal track. Native scrolling (touch, trackpad, arrow keys once focused),
 * mouse drag, year chips and previous/next buttons all move the same scroller; every year's text is always in the DOM.
 */
export default function JourneyTrack({ milestones }: { milestones: Milestone[] }) {
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  // Year chosen with a control: near the end of the track several years share the final scroll position.
  const pending = useRef<number | null>(null);
  const n = milestones.length;

  const items = () => Array.from(track.current?.children ?? []) as HTMLElement[];

  const go = useCallback((i: number) => {
    const t = track.current;
    const k = Math.max(0, Math.min(n - 1, i));
    const el = items()[k];
    if (!t || !el) return;
    pending.current = k;
    setActive(k);
    const first = items()[0];
    t.scrollTo({ left: el.offsetLeft - first.offsetLeft, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }, [n]);

  // Progress bar + active year follow the scroll position.
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = t.scrollWidth - t.clientWidth;
      const p = max > 0 ? t.scrollLeft / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.04, p)})`;
      const els = items();
      const base = els[0]?.offsetLeft ?? 0;
      let best = 0;
      let bestD = Infinity;
      els.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft - base - t.scrollLeft);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (p > 0.995) best = pending.current ?? els.length - 1;
      setActive(best);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    t.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      t.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);

  // A small lift on the year that becomes active.
  useEffect(() => {
    if (reducedMotion()) return;
    const y = track.current?.querySelectorAll<HTMLElement>('[data-year]')[active];
    if (y) animate(y, { translateY: [14, 0], duration: 700, ease: EASE.out });
  }, [active]);

  // Mouse drag (touch and pen scroll natively).
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let moved = false;
    const free = () => (pending.current = null);
    const down = (e: PointerEvent) => {
      free();
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = t.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        t.style.scrollSnapType = 'none';
        t.style.cursor = 'grabbing';
        t.setPointerCapture(e.pointerId);
      }
      if (moved) t.scrollLeft = startLeft - dx;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      t.style.cursor = '';
      if (!moved) return;
      const left = t.scrollLeft;
      t.style.scrollSnapType = '';
      // Re-snapping can jump; restore position, then glide to the nearest year.
      t.scrollLeft = left;
      const els = items();
      const base = els[0]?.offsetLeft ?? 0;
      let best = 0;
      els.forEach((el, i) => {
        if (Math.abs(el.offsetLeft - base - left) < Math.abs(els[best].offsetLeft - base - left)) best = i;
      });
      go(best);
    };
    t.addEventListener('pointerdown', down);
    t.addEventListener('wheel', free, { passive: true });
    t.addEventListener('keydown', free);
    t.addEventListener('pointermove', move);
    t.addEventListener('pointerup', up);
    t.addEventListener('pointercancel', up);
    return () => {
      t.removeEventListener('pointerdown', down);
      t.removeEventListener('wheel', free);
      t.removeEventListener('keydown', free);
      t.removeEventListener('pointermove', move);
      t.removeEventListener('pointerup', up);
      t.removeEventListener('pointercancel', up);
    };
  }, [go]);

  const arrowBtn = 'grid size-12 flex-none place-items-center rounded-full bg-ink text-paper transition-[transform,opacity] duration-300 disabled:opacity-30';

  return (
    <div className="mt-14">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <ul className="hidden flex-wrap gap-2 md:flex" aria-label="Jump to a year">
          {milestones.map((m, i) => (
            <li key={m.year}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === active ? 'true' : undefined}
                className={`tag py-2.5 text-[0.875rem] tabular-nums transition-colors duration-300 ${
                  i === active ? 'bg-ink text-paper' : 'border border-[var(--line-strong)] bg-paper/60 hover:bg-paper'
                }`}
              >
                {m.year}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <button type="button" className={`${arrowBtn} hover:-translate-x-0.5`} onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous year">
            <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden>
              <path d="M12 7H2M6 3 2 7l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className={`${arrowBtn} hover:translate-x-0.5`} onClick={() => go(active + 1)} disabled={active === n - 1} aria-label="Next year">
            <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="ml-2 text-sm font-semibold tabular-nums" aria-live="polite">
            <span className="sr-only">Showing </span>
            {milestones[active]?.year} <span className="text-ink-2">· {pad(active + 1)} / {pad(n)}</span>
          </span>
        </div>
      </div>

      <div className="wrap mt-8">
        <span className="block h-[3px] overflow-hidden rounded-full bg-[var(--line)]" aria-hidden>
          <span ref={bar} className="block h-full origin-left rounded-full bg-orange transition-transform duration-150" style={{ transform: 'scaleX(0.04)' }} />
        </span>
      </div>

      <ol
        ref={track}
        tabIndex={0}
        aria-label="Our journey, year by year. Scroll sideways or use the arrow keys."
        data-stagger
        className="mt-10 flex cursor-grab snap-x snap-mandatory gap-0 overflow-x-auto overscroll-x-contain pb-6 pl-[max(var(--gutter),calc((100vw-var(--max))/2+var(--gutter)))] pr-[var(--gutter)] [scroll-padding-inline:max(var(--gutter),calc((100vw-var(--max))/2+var(--gutter)))] [scrollbar-width:none] select-none [&::-webkit-scrollbar]:hidden focus-visible:outline-offset-[-6px]"
      >
        {milestones.map((m, i) => {
          const last = i === n - 1;
          const on = i === active;
          return (
            <li
              key={m.year}
              className={`relative flex w-[min(84vw,27rem)] flex-none snap-start flex-col ${
                last ? 'rounded-[var(--radius-lg)] bg-orange p-7 md:p-9' : 'border-l border-[var(--line-strong)] px-6 pb-4 pt-1 md:px-8'
              }`}
            >
              <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-2">
                <span aria-hidden className={`size-2.5 rounded-full transition-colors duration-500 ${last ? 'bg-ink' : on ? 'bg-orange' : 'bg-ink/25'}`} />
                <span className={last ? 'text-ink' : ''}>{pad(i + 1)}</span>
              </span>
              <h3
                data-year
                className={`display mt-5 text-[clamp(3.15rem,2.1rem+3.5vw,5.95rem)] transition-colors duration-500 ${last ? 'text-ink' : on ? 'text-orange-ink' : 'text-ink'}`}
              >
                {m.year}
              </h3>
              <p className={`mt-6 text-[0.98rem] leading-relaxed ${last ? 'text-ink' : 'text-ink-2'}`}>{m.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
