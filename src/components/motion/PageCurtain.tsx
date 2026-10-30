'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { EASE, reducedMotion } from '@/lib/motion';

/**
 * Route transition: after a client-side navigation the new page is uncovered by the same bowl-curved orange wash
 * that ends the home intro, so moving between pages feels like one continuous piece. Not on first load.
 */
export default function PageCurtain() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || reducedMotion()) return;
    el.style.display = 'block';
    const a = animate(el, {
      clipPath: ['ellipse(140% 140% at 50% 0%)', 'ellipse(140% 0% at 50% 0%)'],
      duration: 750,
      ease: EASE.inOut,
      onComplete: () => {
        el.style.display = 'none';
      },
    });
    return () => {
      a.cancel();
      el.style.display = 'none';
    };
  }, [pathname]);

  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[65] hidden bg-orange" />;
}
