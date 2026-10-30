'use client';

/**
 * Opening sequence (home page, first visit of a session):
 *   1. the SB mark draws itself — the outline of the real, traced logo is stroked, then filled;
 *   2. an orange wash rises with a curved, bowl-like surface and covers the page;
 *   3. the wash drains upward and away, and the hero arrives: nav drops in, the headline rises line by line,
 *      the tags land on it, then the supporting copy.
 * ~2.9s in total. Repeat visits in the same session, reduced motion and no-JS skip straight to the hero.
 */
import { useLayoutEffect, useRef } from 'react';
import { animate, createDrawable, createTimeline, stagger } from 'animejs';
import { SYMBOL_GREY, SYMBOL_ORANGE, SYMBOL_VIEWBOX } from '@/components/brand/symbol';
import { EASE, INTRO_EVENT, reducedMotion } from '@/lib/motion';

const KEY = 'sb-intro';
// Before paint: decide whether the overlay should be there at all.
const gate = `try{if(sessionStorage.getItem('${KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-skip');else window.__sbIntro='pending'}catch(e){document.documentElement.classList.add('intro-skip')}`;

export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current!;
    // Only a hard load of the home page (where the gate set 'pending') plays the intro; client-side visits skip it.
    const skip = document.documentElement.classList.contains('intro-skip') || window.__sbIntro !== 'pending' || reducedMotion();
    const navItems = document.querySelectorAll<HTMLElement>('[data-nav-item]');
    const hidden = document.querySelectorAll<HTMLElement>('[data-intro-hide]');

    const arrive = (delay: number) => {
      window.__sbIntro = 'done';
      window.dispatchEvent(new Event(INTRO_EVENT));
      if (reducedMotion()) {
        hidden.forEach((h) => (h.style.opacity = '1'));
        return;
      }
      animate(navItems, { translateY: ['-140%', '0%'], opacity: [0, 1], duration: 1000, delay: stagger(60, { start: delay }), ease: EASE.out });
      animate(hidden, { translateY: [24, 0], opacity: [0, 1], duration: 1000, delay: stagger(110, { start: delay + 650 }), ease: EASE.out });
    };

    if (skip) {
      el.style.display = 'none';
      arrive(0);
      return;
    }
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {}
    navItems.forEach((n) => (n.style.opacity = '0'));
    document.documentElement.style.overflow = 'hidden';

    const paths = el.querySelectorAll<SVGPathElement>('[data-draw]');
    const wash = el.querySelector<HTMLElement>('[data-wash]')!;
    const paper = el.querySelector<HTMLElement>('[data-paper]')!;
    const drawables = createDrawable(paths);

    const tl = createTimeline({
      onComplete: () => {
        el.style.display = 'none';
      },
    });
    tl.set(el.querySelector('[data-mark]')!, { opacity: 1 }, 0)
      .add(drawables, { draw: ['0 0', '0 1'], duration: 1250, delay: stagger(140), ease: 'inOut(3)' }, 0)
      .add(paths, { fillOpacity: [0, 1], strokeOpacity: [1, 0], duration: 450, ease: 'out(2)' }, 1150)
      .add(el.querySelector('[data-mark]')!, { scale: [1, 0.92], opacity: [1, 0], duration: 500, ease: EASE.inOut }, 1700)
      // The wash rises: a dome whose curved top is the inside of a bowl seen edge-on.
      .add(wash, { clipPath: ['ellipse(140% 0% at 50% 100%)', 'ellipse(140% 140% at 50% 100%)'], duration: 750, ease: EASE.inOut }, 1650)
      .add(paper, { opacity: [1, 0], duration: 10 }, 2390)
      // …and drains away upward, uncovering the hero.
      .add(wash, { clipPath: ['ellipse(140% 140% at 50% 0%)', 'ellipse(140% 0% at 50% 0%)'], duration: 850, ease: EASE.inOut }, 2400)
      .call(() => {
        document.documentElement.style.overflow = '';
        arrive(80);
      }, 2450);

    return () => {
      tl.revert();
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: gate }} />
      <div ref={root} data-intro aria-hidden className="fixed inset-0 z-[70] [.intro-skip_&]:hidden [html:not(.js)_&]:hidden">
        <div data-paper className="absolute inset-0 grid place-items-center bg-cream">
          <svg data-mark viewBox={SYMBOL_VIEWBOX} className="w-[min(52vw,19rem)] overflow-visible opacity-0">
            <path data-draw d={SYMBOL_ORANGE} fill="#F58634" fillOpacity="0" fillRule="evenodd" stroke="#F58634" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path data-draw d={SYMBOL_GREY} fill="#848688" fillOpacity="0" fillRule="evenodd" stroke="#848688" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div data-wash className="absolute inset-0 bg-orange [clip-path:ellipse(140%_0%_at_50%_100%)]" />
      </div>
    </>
  );
}
