'use client';

import { useState } from 'react';

/** Pause / play for a moving marquee (WCAG 2.2.2). Pauses the nearest `.marquee` ancestor's track. */
export default function MarqueeToggle({ label = 'scrolling text' }: { label?: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label={paused ? `Play ${label}` : `Pause ${label}`}
      onClick={(e) => {
        const track = (e.currentTarget.closest('.marquee') as HTMLElement | null)?.querySelector<HTMLElement>('.marquee-track');
        if (track) track.style.animationPlayState = paused ? '' : 'paused';
        setPaused(!paused);
      }}
      className="absolute right-[max(1rem,var(--gutter))] top-1/2 z-10 grid size-9 -translate-y-1/2 rotate-[2.5deg] place-items-center rounded-full bg-ink text-paper shadow-md"
    >
      {paused ? (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
