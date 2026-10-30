// Shared motion vocabulary. One family of curves keeps the site feeling like one piece:
// long, decelerating entrances; quick, symmetric hovers.
import { cubicBezier } from 'animejs';

export const EASE = {
  /** Entrances: fast start, long settle (≈ easeOutExpo, softened). */
  out: cubicBezier(0.16, 1, 0.3, 1),
  /** Text lines rising out of their masks — a touch more weight at the end. */
  line: cubicBezier(0.22, 1, 0.36, 1),
  /** Panels and wipes that travel across the screen. */
  inOut: cubicBezier(0.76, 0, 0.24, 1),
} as const;

export const DUR = {
  line: 1100,
  reveal: 1000,
  stagger: 90,
} as const;

export function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Fine-pointer, wide viewport: the full experience. Touch / narrow screens get the simplified one. */
export function isDesktopExperience() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
}

// The home-page intro holds back hero entrances until it finishes.
export const INTRO_EVENT = 'sb:intro-done';
declare global {
  interface Window {
    __sbIntro?: 'pending' | 'done';
  }
}
export function afterIntro(fn: () => void) {
  if (typeof window === 'undefined') return () => {};
  if (window.__sbIntro !== 'pending') {
    fn();
    return () => {};
  }
  const h = () => fn();
  window.addEventListener(INTRO_EVENT, h, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, h);
}

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** Maps x from [a, b] to [0, 1], clamped. */
export const range = (x: number, a: number, b: number) => clamp01((x - a) / (b - a));
export const smoothstep = (x: number) => x * x * (3 - 2 * x);
export const easeOutCubic = (x: number) => 1 - (1 - x) ** 3;
export const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
