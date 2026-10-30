'use client';

import { useRef, useState } from 'react';
import { animate } from 'animejs';
import type { Testimonial } from '@/content/types';
import { EASE, reducedMotion } from '@/lib/motion';

/** Client words as a deck of cards on the orange: the top card is thrown aside to reveal the next. */
export default function Testimonials({ items, eyebrow = 'In their words', title = "Don't just take our word for it." }: { items: Testimonial[]; eyebrow?: string; title?: string }) {
  const [i, setI] = useState(0);
  const deck = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const n = items.length;

  const go = (dir: 1 | -1) => {
    if (busy.current) return;
    const next = (i + dir + n) % n;
    const top = deck.current?.querySelector<HTMLElement>('[data-top="1"]');
    if (!top || reducedMotion()) return setI(next);
    busy.current = true;
    animate(top, {
      translateX: dir * 120 + '%',
      rotate: dir * 14,
      opacity: [1, 0],
      duration: 650,
      ease: EASE.inOut,
      onComplete: () => {
        top.style.transform = '';
        top.style.opacity = '';
        setI(next);
        busy.current = false;
      },
    });
  };

  return (
    <section aria-labelledby="testimonials" className="px-[clamp(0.5rem,1.5vw,1.25rem)] pb-[var(--section)]">
      <div className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-orange py-[clamp(4rem,8vw,7rem)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-25 mix-blend-multiply" />
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5 [&::before]:bg-ink" data-reveal>
              {eyebrow}
            </p>
            <h2 id="testimonials" className="display text-[length:var(--fs-h3)] lg:text-[clamp(2.03rem,1.17rem+2.03vw,3.51rem)]" data-reveal>
              {title}
            </h2>
            <div className="mt-8 flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid size-12 place-items-center rounded-full bg-ink text-paper transition-transform hover:-translate-x-0.5">
                <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden>
                  <path d="M12 7H2M6 3 2 7l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid size-12 place-items-center rounded-full bg-ink text-paper transition-transform hover:translate-x-0.5">
                <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="ml-2 text-sm font-semibold tabular-nums" aria-live="polite">
                {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
            </div>
          </div>
          <div ref={deck} className="relative grid min-h-[18rem] sm:min-h-[22rem] lg:col-span-7 lg:col-start-6">
            {[2, 1, 0].map((depth) => {
              const t = items[(i + depth) % n];
              return (
                <figure
                  key={`${(i + depth) % n}`}
                  data-top={depth === 0 ? '1' : '0'}
                  aria-hidden={depth !== 0}
                  className="col-start-1 row-start-1 flex flex-col justify-between rounded-[var(--radius-lg)] bg-paper p-[clamp(1.5rem,3vw,2.75rem)] shadow-[0_30px_50px_-30px_rgb(60_20_0/0.6)] transition-transform duration-700 ease-[var(--ease-out-expo)]"
                  style={{ transform: `translateY(${depth * -14}px) rotate(${depth === 0 ? -1.2 : depth === 1 ? 2.4 : -3.6}deg) scale(${1 - depth * 0.035})`, zIndex: 3 - depth }}
                >
                  <blockquote className="display-soft text-[clamp(1.22rem,0.9rem+1.03vw,1.94rem)] leading-[1.18]">“{t.quote}”</blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span aria-hidden className="grid size-12 place-items-center rounded-full bg-ink text-sm font-bold text-orange">
                      {t.name
                        .split(/\s+/)
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                    <span>
                      <strong className="block">{t.name}</strong>
                      <span className="text-sm text-ink-2">{[t.role, t.place].filter(Boolean).join(' · ')}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
