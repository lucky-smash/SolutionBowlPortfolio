'use client';

/**
 * One controller for the site's declarative motion, so server-rendered pages only need data attributes:
 *
 *   data-lines            heading made of .line-mask > .line-inner rows: lines rise from their masks, staggered
 *   data-lines="intro"    same, but on the home page waits for the intro to finish
 *   data-reveal           fade + rise on entering the viewport (data-reveal-delay="ms")
 *   data-stagger          reveal the element's direct children one after another
 *   data-fill             statement paragraph whose words fill with ink as it scrolls through the viewport
 *   data-tags             tags pinned on a headline pop in after the lines
 *
 * Everything is re-scanned on route change. With prefers-reduced-motion, content is simply shown.
 */
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { afterIntro, DUR, EASE, reducedMotion, range } from '@/lib/motion';

export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = reducedMotion();
    const cleanups: (() => void)[] = [];
    const done = new WeakSet<Element>();
    const bound = new WeakSet<Element>(); // per run: StrictMode / route changes re-run this effect

    const playLines = (el: HTMLElement) => {
      if (done.has(el)) return;
      done.add(el);
      const inners = el.querySelectorAll<HTMLElement>('.line-inner');
      const delay = Number(el.dataset.linesDelay ?? 0);
      if (reduce) {
        inners.forEach((n) => (n.style.transform = 'none'));
        return;
      }
      animate(inners, {
        translateY: ['105%', '0%'],
        rotate: [2.5, 0],
        duration: DUR.line,
        delay: stagger(DUR.stagger, { start: delay }),
        ease: EASE.line,
      });
      const tags = el.parentElement?.querySelectorAll<HTMLElement>('[data-tag]');
      if (tags?.length)
        animate(tags, {
          opacity: [0, 1],
          scale: [0.6, 1],
          rotate: {
            from: (t: unknown) => Number((t as HTMLElement).dataset.tag ?? 0) * 3,
            to: (t: unknown) => Number((t as HTMLElement).dataset.tag ?? 0),
          },
          duration: 900,
          delay: stagger(110, { start: delay + 520 + inners.length * DUR.stagger }),
          ease: 'outBack(1.9)',
        });
    };

    const playReveal = (el: HTMLElement) => {
      if (done.has(el)) return;
      done.add(el);
      if (reduce) {
        el.style.opacity = '1';
        return;
      }
      animate(el, {
        opacity: [0, 1],
        translateY: [28, 0],
        duration: DUR.reveal,
        delay: Number(el.dataset.revealDelay ?? 0),
        ease: EASE.out,
      });
    };

    const playStagger = (el: HTMLElement) => {
      if (done.has(el)) return;
      done.add(el);
      const kids = Array.from(el.children) as HTMLElement[];
      if (reduce) return;
      animate(kids, {
        opacity: [0, 1],
        translateY: [36, 0],
        duration: DUR.reveal,
        delay: stagger(80),
        ease: EASE.out,
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          if (el.hasAttribute('data-lines')) {
            if (el.dataset.lines === 'intro') cleanups.push(afterIntro(() => playLines(el)));
            else playLines(el);
          } else if (el.hasAttribute('data-stagger')) playStagger(el);
          else playReveal(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );

    // Hide staggered children before they are observed (only when they will animate).
    const scan = () => {
      document.querySelectorAll<HTMLElement>('[data-lines],[data-reveal],[data-stagger]').forEach((el) => {
        if (bound.has(el)) return;
        bound.add(el);
        if (el.hasAttribute('data-stagger') && !reduce) for (const k of Array.from(el.children) as HTMLElement[]) k.style.opacity = '0';
        io.observe(el);
      });
      document.querySelectorAll<HTMLElement>('[data-fill]').forEach(bindFill);
    };

    // ---- Statement fill: words go from faint to ink as the paragraph crosses the viewport ----
    const fills: { el: HTMLElement; words: HTMLElement[] }[] = [];
    function bindFill(el: HTMLElement) {
      if (bound.has(el)) return;
      bound.add(el);
      // Split once per element, even across effect re-runs.
      const words = el.dataset.split ? (Array.from(el.querySelectorAll('[data-w]')) as HTMLElement[]) : splitWords(el);
      el.dataset.split = '1';
      if (reduce) return;
      fills.push({ el, words });
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const { el, words } of fills) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        // 0 when the paragraph's top is at 85% of the viewport, 1 when its bottom reaches 45%.
        const p = range(vh * 0.85 - r.top, 0, r.height + vh * 0.4);
        const n = words.length;
        words.forEach((w, i) => {
          const local = range(p * (n + 6) - i, 0, 6);
          w.style.opacity = String(0.16 + 0.84 * local);
        });
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    scan();
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Client components can mount after this effect; pick up their attributes too.
    const mo = new MutationObserver(() => scan());
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
    };
  }, [pathname]);

  return null;
}

/** Wraps each word of el's text nodes in a span (keeps nested elements, such as inline tags, intact). */
function splitWords(el: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  while (walker.nextNode()) texts.push(walker.currentNode as Text);
  for (const t of texts) {
    if (t.parentElement?.closest('[data-tag]')) continue;
    const frag = document.createDocumentFragment();
    for (const part of (t.textContent ?? '').split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
      else {
        const s = document.createElement('span');
        s.textContent = part;
        s.dataset.w = '';
        s.style.transition = 'opacity 0.25s linear';
        words.push(s);
        frag.appendChild(s);
      }
    }
    t.replaceWith(frag);
  }
  return words;
}
