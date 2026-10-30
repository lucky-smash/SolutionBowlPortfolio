'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import { reducedMotion } from '@/lib/motion';

/**
 * The hover layer for a project cover, after Two26. Each time the card is entered (or keyboard focused) it plays
 * once: the project's own colour floods the card as a liquid swell (two overlapping blobs, so the front edge has
 * humps) and the headline metric rises in; a round window opens onto a close crop of the render; the window grows
 * until the render fills the card exactly as the cover sits, and the layer steps aside. Leaving mid-play drains
 * whatever is showing into a shrinking circle. Shapes and layout live in globals.css (`.cover-*`); timing is here
 * (WAAPI). The window re-uses the cover's src, so the effect adds no requests.
 */
type From = 'bottom' | 'top-right' | 'left';
const FROM: From[] = ['bottom', 'top-right', 'left'];
/** Where the window opens for each swell direction. */
const FOCI: Record<From, [number, number]> = { bottom: [70, 40], 'top-right': [32, 44], left: [64, 60] };

const SWELL = 'cubic-bezier(0.5, 0, 0.2, 1)';
const EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';
const BLOB_OUT = 'translate(-50%, -50%) rotate(-50deg) scale(0)';
const BLOB_IN = 'translate(-50%, -50%) rotate(0deg) scale(1)';

const INK = '#1c1916';
const PAPER = '#fbf7f1';

export default function CoverReveal({
  image,
  accent,
  note,
  label,
  index,
  sizes,
}: {
  image: string;
  accent: string;
  note: string;
  label?: string;
  /** Position in the grid; picks which edge the swell comes from so neighbours don't move in lockstep. */
  index: number;
  sizes: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const from = FROM[index % FROM.length];

  useEffect(() => {
    const el = root.current;
    const group = el?.closest<HTMLElement>('.group');
    if (!el || !group) return;
    const cover = el.parentElement?.querySelector<HTMLElement>(':scope > img');
    const blobs = [...el.querySelectorAll<HTMLElement>('.cover-blob')];
    const win = el.querySelector<HTMLElement>('.cover-window')!;
    const winImg = win.querySelector<HTMLElement>('img')!;
    const noteEl = el.querySelector<HTMLElement>('.cover-note')!;
    const layers = [el, ...blobs, win, winImg, noteEl];
    const [fx, fy] = FOCI[from];

    let run = 0; // bumped on every enter / leave; a play whose number is stale stops at its next step
    let inside = false;

    /** Animate to a state from wherever the element is now, then keep that state as inline style. */
    const to = (node: HTMLElement, frame: Keyframe, opts: KeyframeAnimationOptions) => {
      const a = node.animate([frame], { fill: 'forwards', ...opts });
      return a.finished.then(
        () => {
          a.commitStyles();
          a.cancel();
        },
        () => {},
      );
    };
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const showing = () => el.style.visibility === 'visible';
    const reset = () => {
      layers.forEach((n) => n.getAnimations().forEach((a) => a.cancel()));
      el.style.clipPath = '';
      el.style.visibility = 'hidden';
      blobs.forEach((b) => (b.style.transform = BLOB_OUT));
      win.style.clipPath = 'circle(0% at 50% 50%)';
      noteEl.style.opacity = '0';
      noteEl.style.transform = 'translateY(1.5rem)';
    };

    async function play(id: number) {
      reset();
      el!.style.visibility = 'visible';

      // 1. The colour floods in over the cover; the metric rises.
      await Promise.all([
        ...blobs.map((b, i) => to(b, { transform: BLOB_IN }, { duration: 1100, delay: i * 120, easing: SWELL })),
        to(noteEl, { opacity: 1, transform: 'translateY(0)' }, { duration: 700, delay: 550, easing: EXPO }),
      ]);
      if (run !== id) return;
      await wait(450);
      if (run !== id) return;

      // 2. A window opens onto a close crop of the render, its centre under the window.
      win.style.clipPath = `circle(0% at ${fx}% ${fy}%)`;
      winImg.style.transform = `translate(${fx - 50}%, ${fy - 50}%) scale(1.6)`;
      await Promise.all([
        to(win, { clipPath: `circle(27% at ${fx}% ${fy}%)` }, { duration: 800, easing: EXPO }),
        to(winImg, { transform: `translate(${fx - 50}%, ${fy - 50}%) scale(1.3)` }, { duration: 900, easing: EXPO }),
      ]);
      if (run !== id) return;
      await wait(250);
      if (run !== id) return;

      // 3. The window grows until the render fills the card exactly as the cover sits (its hover zoom included),
      //    so the layer can step aside without a jump.
      const rest = cover ? getComputedStyle(cover).transform : 'none';
      await Promise.all([
        to(win, { clipPath: `circle(150% at ${fx}% ${fy}%)` }, { duration: 1000, easing: SWELL }),
        to(winImg, { transform: rest === 'none' ? 'translate(0%, 0%) scale(1)' : rest }, { duration: 1000, easing: SWELL }),
        to(noteEl, { opacity: 0, transform: 'translateY(-0.75rem)' }, { duration: 400, easing: 'ease-in' }),
      ]);
      if (run === id) reset();
    }

    const enter = () => {
      if (inside) return;
      inside = true;
      // Reduced motion: the card keeps its plain hover.
      if (!reducedMotion()) play(++run);
    };
    const leave = () => {
      if (!inside) return;
      inside = false;
      const id = ++run;
      if (!showing()) return;
      // Left mid-play: freeze where it is, then drain into a shrinking circle, back to the cover.
      layers.forEach((n) =>
        n.getAnimations().forEach((a) => {
          a.commitStyles();
          a.cancel();
        }),
      );
      el.style.clipPath = 'circle(150% at 50% 50%)';
      to(el, { clipPath: 'circle(0% at 50% 50%)' }, { duration: 650, easing: 'cubic-bezier(0.7, 0, 0.84, 0)' }).then(() => {
        if (run === id) reset();
      });
    };

    // Mouse and pen only: a tap on a touch screen goes straight to the project instead of flashing the colour.
    const onEnter = (e: PointerEvent) => e.pointerType !== 'touch' && enter();
    const onLeave = (e: PointerEvent) => e.pointerType !== 'touch' && leave();
    const onFocus = () => group.matches(':focus-visible, :has(:focus-visible)') && enter();
    const onBlur = (e: FocusEvent) => !group.contains(e.relatedTarget as Node | null) && !group.matches(':hover') && leave();

    reset();
    group.addEventListener('pointerenter', onEnter);
    group.addEventListener('pointerleave', onLeave);
    group.addEventListener('focusin', onFocus);
    group.addEventListener('focusout', onBlur);
    return () => {
      run++;
      group.removeEventListener('pointerenter', onEnter);
      group.removeEventListener('pointerleave', onLeave);
      group.removeEventListener('focusin', onFocus);
      group.removeEventListener('focusout', onBlur);
    };
  }, [from]);

  const style = { '--accent': accent, '--on-accent': onAccent(accent) } as CSSProperties;
  return (
    <div ref={root} aria-hidden className="cover-reveal" data-from={from} style={style}>
      <span className="cover-blob" />
      <span className="cover-blob" />
      <div className="cover-window">
        <Image src={`/img/portfolio/${image}.webp`} alt="" fill sizes={sizes} className="object-cover" />
      </div>
      <p className="cover-note">
        {label && <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] opacity-80">{label}</span>}
        <span className="display block hyphens-manual text-[clamp(1.5rem,1.1rem+1.1vw,2.4rem)] leading-[0.95]">{note}</span>
      </p>
    </div>
  );
}

/** Ink or paper, whichever reads better on the accent (WCAG contrast). */
function onAccent(hex: string) {
  const L = (h: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const c = parseInt(h.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const a = L(hex);
  const ratio = (x: number, y: number) => (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  return ratio(a, L(INK)) >= ratio(a, L(PAPER)) ? INK : PAPER;
}
