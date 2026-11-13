'use client';

import { useEffect, useRef, useState } from 'react';
import { reducedMotion } from '@/lib/motion';
import type { PhoneApp, PhoneController } from './phoneScene';

/**
 * A live 3D phone running `app`, for app cards. three.js + GSAP load only when the card nears the viewport, and the
 * scene pauses while it is off-screen. Until it is ready (or if WebGL is unavailable) a still phone stands in.
 */
export default function LivePhone({ app, poster = 1, className = '' }: { app: PhoneApp; poster?: number; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  // The still phone's screenshot is fetched only when the card is near, not by native lazy-loading (which on
  // mobile starts 1250-2500px early and put these images ahead of the hero's LCP).
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let ctrl: PhoneController | undefined;
    let visible = false;
    let loading = false;
    let cancelled = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !ctrl && !loading) {
          loading = true;
          import('./phoneScene')
            .then(({ mountPhone }) => mountPhone(el, app, { reduced: reducedMotion() }))
            .then((c) => {
              if (cancelled) return c.dispose();
              ctrl = c;
              ctrl.setActive(visible);
              setReady(true);
            })
            .catch(() => {
              /* no WebGL: the still phone stays */
            });
        }
        ctrl?.setActive(visible);
      },
      { rootMargin: '150px 0px' },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      ctrl?.dispose();
    };
  }, [app]);

  return (
    <div ref={host} aria-hidden className={`relative ${className}`}>
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 aspect-[0.78] h-[62%] -translate-x-1/2 -translate-y-1/2 -rotate-[4deg] rounded-[10%/8%] bg-[#2a2b30] p-[2.6%] shadow-[0_30px_50px_-20px_rgb(0_0_0/0.6)] transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
      >
        {near && (
          <img src={app.site ? (app.site.phone ?? app.site.wide) : `/img/apps/${app.id}/s${poster}.webp`} alt="" className="size-full rounded-[8%/6%] bg-[#fff] object-cover object-top" decoding="async" />
        )}
      </div>
    </div>
  );
}
