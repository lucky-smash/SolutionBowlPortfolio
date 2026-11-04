'use client';

import { useEffect, useId, useRef, type CSSProperties } from 'react';
import { reducedMotion } from '@/lib/motion';

/**
 * Paint-brush hover for a project cover, after Two26. Each time the card is entered (or keyboard focused) it
 * plays once, in about 1.4s: a fat brush stroke in the project's colour zig-zags down the card and swells until
 * it covers it; a second stroke on the same path, a beat behind, paints the cover back over the colour — so the
 * colour flashes through and is gone. Leaving mid-stroke runs both strokes backwards.
 *
 * The cover is repainted by an SVG <image> masked by the second stroke. The SVG's viewBox is the card's pixel
 * size, so `xMidYMid slice` crops exactly like the cover's `object-cover`, and it borrows the cover's classes so
 * it follows the same hover zoom. It reuses the cover's loaded src, so the effect adds no requests.
 */

/** The brush path in a 1000×1000 design box: four sweeps, top to bottom, overshooting both sides. */
const BRUSH =
  'M-80 70C260 -30 640 190 1080 60C760 250 300 250 -80 400C280 470 700 430 1080 600C720 740 260 690 -80 830C300 900 680 1010 1080 960';
/** Final brush width in design units: wide enough that neighbouring sweeps overlap and nothing shows through. */
const WIDTH = 640;
const EASE = 'cubic-bezier(0.45, 0, 0.55, 1)';
const COLOUR = { duration: 950, delay: 0 };
const REVEAL = { duration: 1050, delay: 350 };
/** Leaving mid-stroke rewinds a little faster than it played. */
const REWIND = -1.3;

export default function CoverReveal({ accent, index }: { accent: string; /** Grid position; odd cards mirror the stroke. */ index: number }) {
  const root = useRef<HTMLDivElement>(null);
  // Stable across server and client; stripped to characters that are safe inside url(#…).
  const uid = `brush${useId().replace(/[^\w-]/g, '')}`;

  useEffect(() => {
    const el = root.current;
    const group = el?.closest<HTMLElement>('.group');
    const cover = el?.parentElement?.querySelector<HTMLImageElement>(':scope > img');
    if (!el || !group || !cover) return;
    const svg = el.querySelector<SVGSVGElement>('svg.brush-repaint')!;
    const image = svg.querySelector('image')!;
    const groups = [...el.querySelectorAll<SVGGElement>('g[data-fit]')];
    const [colour, reveal] = [...el.querySelectorAll<SVGPathElement>('path')];

    // Follow the cover's hover zoom and keep its framing.
    svg.setAttribute('class', `brush-repaint ${cover.className}`);
    const syncSrc = () => cover.currentSrc && image.setAttribute('href', cover.currentSrc);
    syncSrc();
    cover.addEventListener('load', syncSrc);

    // Size both SVGs to the card in pixels and fit the 1000×1000 brush box over it like `cover`.
    const fit = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      if (!w || !h) return;
      const s = Math.max(w, h) / 1000;
      const flip = index % 2 ? `translate(${w} 0) scale(-1 1) ` : '';
      const t = `${flip}translate(${(w - 1000 * s) / 2} ${(h - 1000 * s) / 2}) scale(${s})`;
      el.querySelectorAll('svg').forEach((n) => n.setAttribute('viewBox', `0 0 ${w} ${h}`));
      image.setAttribute('width', String(w));
      image.setAttribute('height', String(h));
      groups.forEach((g) => g.setAttribute('transform', t));
    };
    const ro = new ResizeObserver(fit);
    ro.observe(el);

    let anims: Animation[] = [];
    let inside = false;

    const stroke = (path: SVGPathElement, t: { duration: number; delay: number }) =>
      path.animate(
        [
          { strokeDashoffset: 1, strokeWidth: 0 },
          { strokeDashoffset: 0, strokeWidth: WIDTH },
        ],
        { ...t, easing: EASE, fill: 'both' },
      );

    const finish = () => {
      anims.forEach((a) => a.cancel());
      anims = [];
      el.style.visibility = 'hidden';
    };

    const enter = () => {
      if (inside) return;
      inside = true;
      if (reducedMotion()) return;
      // Re-entered while rewinding: carry on forwards from where it is.
      if (anims.length) return anims.forEach((a) => (a.updatePlaybackRate(1), a.play()));
      fit();
      el.style.visibility = 'visible';
      anims = [stroke(colour, COLOUR), stroke(reveal, REVEAL)];
      const these = anims;
      // Both finish together whether it played through or rewound to the start; either way the card is clean.
      Promise.all(these.map((a) => a.finished)).then(
        () => anims === these && finish(),
        () => {},
      );
    };

    const leave = () => {
      if (!inside) return;
      inside = false;
      // Left before the first frame: nothing to rewind (and play() at time 0 backwards would jump to the end).
      if (anims.every((a) => !a.currentTime)) return finish();
      // play() too, so a stroke that already finished (the colour, once the repaint is under way) also runs back.
      anims.forEach((a) => (a.updatePlaybackRate(REWIND), a.play()));
    };

    // Mouse and pen only: a tap on a touch screen goes straight to the project instead of flashing the colour.
    const onEnter = (e: PointerEvent) => e.pointerType !== 'touch' && enter();
    const onLeave = (e: PointerEvent) => e.pointerType !== 'touch' && leave();
    const onFocus = () => group.matches(':focus-visible, :has(:focus-visible)') && enter();
    const onBlur = (e: FocusEvent) => !group.contains(e.relatedTarget as Node | null) && !group.matches(':hover') && leave();

    group.addEventListener('pointerenter', onEnter);
    group.addEventListener('pointerleave', onLeave);
    group.addEventListener('focusin', onFocus);
    group.addEventListener('focusout', onBlur);
    return () => {
      finish();
      ro.disconnect();
      cover.removeEventListener('load', syncSrc);
      group.removeEventListener('pointerenter', onEnter);
      group.removeEventListener('pointerleave', onLeave);
      group.removeEventListener('focusin', onFocus);
      group.removeEventListener('focusout', onBlur);
    };
  }, [index]);

  const brush = { strokeDasharray: '1 1', strokeDashoffset: 1, strokeWidth: 0 } as CSSProperties;
  return (
    <div ref={root} aria-hidden className="cover-reveal">
      {/* 1. The colour stroke. */}
      <svg className="brush-colour" preserveAspectRatio="none">
        <g data-fit>
          <path d={BRUSH} pathLength={1} fill="none" stroke={accent} strokeLinecap="round" strokeLinejoin="round" style={brush} />
        </g>
      </svg>
      {/* 2. The cover, painted back over the colour through the second stroke. */}
      <svg className="brush-repaint" preserveAspectRatio="none">
        <defs>
          <mask id={uid} maskUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
            <g data-fit>
              <path d={BRUSH} pathLength={1} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" style={brush} />
            </g>
          </mask>
        </defs>
        <image preserveAspectRatio="xMidYMid slice" mask={`url(#${uid})`} />
      </svg>
    </div>
  );
}
