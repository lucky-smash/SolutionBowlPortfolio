'use client';

import { useEffect, useRef, useState } from 'react';
import { range, reducedMotion } from '@/lib/motion';

type Pt = [number, number];

/** Sample spacing along the line, px. Small enough that the polyline reads as a curve under a thick round stroke. */
const STEP = 4;

/**
 * Six steps in a zigzag, threaded on one thick orange line. The line is a smooth curve through each step's cube,
 * measured from the layout (so it fits any width). On wide screens it throws a cursive loop into the empty side
 * of every other gap. It draws itself over a pale track in step with the scroll; each cube spins in as the line
 * reaches it.
 */
export default function ProcessPath({ steps }: { steps: { title: string; body: string; when?: string }[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  // Cumulative length and running-max y per sample, so scroll progress maps to "how far down the page", not
  // "how far along the line" (the loops add length without adding height).
  const track = useRef<{ lens: number[]; ys: number[]; total: number }>({ lens: [], ys: [], total: 0 });
  const [d, setD] = useState('');
  const [box, setBox] = useState({ w: 1, h: 1 });

  useEffect(() => {
    const el = wrap.current!;
    const build = () => {
      const r = el.getBoundingClientRect();
      const pts: Pt[] = Array.from(el.querySelectorAll<HTMLElement>('[data-dot]')).map((m) => {
        const b = m.getBoundingClientRect();
        return [b.left + b.width / 2 - r.left, b.top + b.height / 2 - r.top];
      });
      if (pts.length < 2) return;
      const loops = window.matchMedia('(min-width: 768px)').matches;
      // Catmull-Rom through the cubes, as cubic Béziers; starts above the first cube, ends below the last.
      const all: Pt[] = [[pts[0][0], 0], ...pts, [pts[pts.length - 1][0], r.height]];
      const out: Pt[] = [all[0]];
      for (let i = 0; i < all.length - 1; i++) {
        const p0 = all[Math.max(0, i - 1)], p1 = all[i], p2 = all[i + 1], p3 = all[Math.min(all.length - 1, i + 2)];
        const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        const at = (t: number): Pt => {
          const u = 1 - t;
          return [
            u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0],
            u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1],
          ];
        };
        const chord = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
        const n = Math.max(8, Math.ceil(chord / STEP));
        // Gap k runs from cube k to cube k+1. Step k's copy sits left when k is even, so the loop goes right.
        const k = i - 1;
        const loop = loops && k >= 0 && k < pts.length - 1 && k % 2 === 0;
        const t0 = 0.26, t1 = 0.6;
        let ux = 0, uy = 0, nx = 0, ny = 0, a = 0;
        if (loop) {
          const [ax, ay] = at(t0), [bx, by] = at(t1);
          const w = Math.hypot(bx - ax, by - ay) || 1;
          ux = (bx - ax) / w;
          uy = (by - ay) / w;
          const side = k % 2 === 0 ? 1 : -1;
          nx = -uy;
          ny = ux;
          if (Math.sign(nx || side) !== side) (nx = -nx), (ny = -ny);
          a = Math.min(58, w * 0.48); // > w/4, so the trochoid crosses itself
        }
        for (let j = 1; j <= n; j++) {
          const t = j / n;
          let [x, y] = at(t);
          if (loop && t > t0 && t < t1) {
            // Prolate trochoid on top of the base curve: surge ahead, swing out, fall back across itself.
            const th = ((t - t0) / (t1 - t0)) * Math.PI * 2;
            const along = a * Math.sin(th), across = a * (1 - Math.cos(th));
            x += ux * along + nx * across;
            y += uy * along + ny * across;
          }
          out.push([x, y]);
        }
      }
      const lens = [0], ys = [out[0][1]];
      let s = `M${out[0][0].toFixed(1)},${out[0][1].toFixed(1)}`;
      for (let i = 1; i < out.length; i++) {
        lens.push(lens[i - 1] + Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]));
        ys.push(Math.max(ys[i - 1], out[i][1]));
        s += `L${out[i][0].toFixed(1)},${out[i][1].toFixed(1)}`;
      }
      track.current = { lens, ys, total: lens[lens.length - 1] };
      setBox({ w: r.width, h: r.height });
      setD(s);
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = wrap.current!;
    const path = pathRef.current;
    if (!path || !d) return;
    const { lens, ys, total } = track.current;
    path.style.strokeDasharray = `${total} ${total + 1}`;
    if (reducedMotion()) {
      path.style.strokeDashoffset = '0';
      el.querySelectorAll<HTMLElement>('[data-dot]').forEach((dot) => (dot.dataset.on = '1'));
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const y = range(vh * 0.7 - r.top, 0, r.height) * r.height;
      // Last sample whose running-max y is still above the reading line.
      let lo = 0, hi = ys.length - 1;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (ys[mid] <= y) lo = mid;
        else hi = mid - 1;
      }
      path.style.strokeDashoffset = `${total - lens[lo]}`;
      el.querySelectorAll<HTMLElement>('[data-dot]').forEach((dot) => {
        const b = dot.getBoundingClientRect();
        dot.dataset.on = b.top + b.height / 2 < vh * 0.7 ? '1' : '0';
      });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, [d]);

  return (
    <div ref={wrap} className="relative mt-16">
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${box.w} ${box.h}`} preserveAspectRatio="none">
        <path d={d} fill="none" className="process-track" strokeLinecap="round" strokeLinejoin="round" />
        <path ref={pathRef} d={d} fill="none" className="process-line" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <ol className="relative grid gap-y-10 md:gap-y-4">
        {steps.map((s, i) => {
          const n = String(i + 1).padStart(2, '0');
          return (
            <li key={s.title} className={`grid md:grid-cols-2 ${i % 2 ? 'md:[&>div]:col-start-2' : ''}`}>
              <div className={`relative flex gap-5 pl-14 md:pl-0 ${i % 2 ? 'md:pl-28' : 'md:pr-28 md:text-right md:flex-row-reverse'}`} data-reveal>
                <span
                  data-dot
                  data-on="0"
                  className={`process-cube absolute left-0 top-0 md:-top-0.5 ${i % 2 ? 'md:-left-[6.4rem]' : 'md:left-auto md:-right-[6.4rem]'}`}
                >
                  <span className="process-cube__halo" />
                  <span className="process-cube__body">
                    <span className="process-cube__face is-front">{n}</span>
                    <span className="process-cube__face is-back">{n}</span>
                    <span className="process-cube__face is-right" />
                    <span className="process-cube__face is-left" />
                    <span className="process-cube__face is-top" />
                    <span className="process-cube__face is-bottom" />
                  </span>
                </span>
                <div className="max-w-md pb-6 md:pb-14">
                  {s.when && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-orange-deep">{s.when}</p>}
                  <h3 className="display text-[clamp(1.71rem,1.17rem+1.62vw,2.7rem)]">{s.title}</h3>
                  <p className="mt-3 whitespace-pre-line text-ink-2">{s.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
