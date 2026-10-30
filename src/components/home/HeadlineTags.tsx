'use client';

import { useEffect, useRef } from 'react';

export type TagSpec = {
  label: string;
  /** Line the tag belongs to. */
  line: number;
  /** Horizontal anchor: 'end' sits just past the end of the line; a number is a fraction of the line's width. */
  at: 'end' | number;
  /** Vertical offset from the line's top, in em of the headline. */
  dy: number;
  /** Extra horizontal offset in em. */
  dx?: number;
  rotate: number;
  tone: 'ink' | 'orange' | 'paper';
};

const tone = {
  ink: 'bg-ink text-paper',
  orange: 'bg-orange text-ink',
  paper: 'bg-paper text-ink border border-[var(--line-strong)]',
};

/**
 * Tags pinned onto a headline (the hero's service chips). Positions come from the measured width of each set
 * line, so they stay attached to the words at every viewport width and font-loading state.
 */
export default function HeadlineTags({ tags }: { tags: TagSpec[] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current!;
    const h = host.parentElement!;
    const place = () => {
      const hr = h.getBoundingClientRect();
      const em = parseFloat(getComputedStyle(h).fontSize);
      const lines = Array.from(h.querySelectorAll<HTMLElement>('.line-inner'));
      host.querySelectorAll<HTMLElement>('[data-tag]').forEach((el, i) => {
        const t = tags[i];
        const line = lines[t.line];
        if (!line) return;
        const range = document.createRange();
        range.selectNodeContents(line);
        const r = range.getBoundingClientRect();
        // Measure without the line's entrance transform.
        const ty = new DOMMatrixReadOnly(getComputedStyle(line).transform).m42;
        const lineLeft = r.left - hr.left;
        const x = t.at === 'end' ? lineLeft + r.width : lineLeft + r.width * t.at;
        el.style.left = `${x + (t.dx ?? 0) * em}px`;
        el.style.top = `${r.top - ty - hr.top + t.dy * em}px`;
        el.style.visibility = 'visible';
      });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(h);
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [tags]);

  return (
    <span ref={ref} aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {tags.map((t) => (
        <span
          key={t.label}
          data-tag={t.rotate}
          className={`tag invisible absolute shadow-[0_10px_24px_-12px_rgb(40_20_5/0.5)] ${tone[t.tone]}`}
          style={{ transform: `rotate(${t.rotate}deg)`, fontSize: 'clamp(0.8rem, 0.45rem + 0.5vw, 1.05rem)' }}
        >
          {t.label}
        </span>
      ))}
    </span>
  );
}
