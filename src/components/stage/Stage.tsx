'use client';

/**
 * The hero stage: two tall illustrated figures and a small bowl-bodied robot walk in place, like a hand-drawn
 * loop. What makes it feel drawn rather than generated:
 *   - it is sampled "on twos" — 12 drawings a second, not 60 smooth frames;
 *   - the line boils: a turbulence seed changes every drawing, so every outline wobbles like redrawn ink;
 *   - the medium changes every ~1.2s — flat ink, coloured pencil, grain, cut paper — re-rendering the same
 *     drawing through role classes, never swapping the characters.
 * The story is on the board the first figure carries: its tangled scribble untangles into a connected,
 * checked flow while they walk. The second carries the SB mark. Brand-derived network flourishes (from the
 * molecule cluster in the SB logo) frame the scene.
 *
 * Anime.js drives the clock; the whole loop costs ~100 attribute writes per drawing. It pauses off-screen and
 * in background tabs; with prefers-reduced-motion it is one still drawing in the ink style.
 */
import { useEffect, useRef } from 'react';
import { createTimer, type Timer } from 'animejs';
import { Figure, type FigureSpec } from './figure';
import { SYMBOL_GREY, SYMBOL_ORANGE, SYMBOL_VIEWBOX } from '@/components/brand/symbol';
import { reducedMotion } from '@/lib/motion';

const W = 1600;
const H = 760;
const GROUND = 724;
const FPS = 12;
const STYLES = ['ink', 'pencil', 'grain', 'paper'] as const;
const STYLE_FRAMES = 14; // drawings per medium (~1.17s)
/** Desktop fit: the flourish's footprint in drawing units (x1 y1 x2 y2); the figures' are measured live. */
const FLOURISH_BOX = [1296, 30, W, 700];
const GAP = 24; // px kept between the cast and the copy
const HEADROOM = 150; // the drawing may be cropped down to y = 150 (heads at ~186–206, ground at 724)

const A: FigureSpec = { height: 520, skin: 'skin-a', hair: 'quiff', glasses: true, trousers: 'f-light', trouserCut: 'slim', jacket: 'f-main', shoes: 'sneaker-dark', period: 1.18, stride: 0.62, phase: 0, lean: 0.04 };
const B: FigureSpec = { height: 500, skin: 'skin-c', hair: 'curls', trousers: 'f-main', trouserCut: 'flare', jacket: 'f-light', coat: false, shoes: 'sneaker-light', period: 1.12, stride: 0.6, phase: 0.31, lean: 0.03 };

export default function Stage({ className = '' }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const cast = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = svg.current!;
    const reduce = reducedMotion();
    const narrow = window.matchMedia('(max-width: 767px)').matches;
    const span = [760, W + 160]; // passers-by walk between these x (drawing units)

    // Phones: the whole drawing fills the short stage, framing the figures. Desktop: the stage covers the hero, and
    // the drawing — anchored right and bottom — grows as large as it can while the cast keeps clear of the copy
    // (every [data-stage-avoid] block in the section: its text, tags, links and buttons).
    const section = root.closest('section');
    let boxes: number[][] = []; // the cast's footprint, measured below once the figures exist
    const obstacles = () => {
      const out: DOMRect[] = [];
      const range = document.createRange();
      section?.querySelectorAll('[data-stage-avoid]').forEach((block) => {
        const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (!n.textContent?.trim()) continue;
          range.selectNodeContents(n);
          out.push(...range.getClientRects());
        }
        block.querySelectorAll('.tag, a, button').forEach((el) => out.push(el.getBoundingClientRect()));
      });
      return out.filter((r) => r.width > 0 && r.height > 0);
    };
    const fit = () => {
      if (window.matchMedia('(max-width: 1023px)').matches) {
        root.setAttribute('viewBox', `0 0 ${W} ${H}`);
        root.setAttribute('preserveAspectRatio', 'xMaxYMax slice');
        span[0] = 760;
        return;
      }
      root.setAttribute('preserveAspectRatio', 'xMaxYMax meet');
      const box = root.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const avoid = obstacles();
      const at = (s: number, [x1, y1, x2, y2]: readonly number[]) => ({
        l: box.right - (W - x1) * s,
        r: box.right - (W - x2) * s,
        t: box.bottom - (H - y1) * s,
        b: box.bottom - (H - y2) * s,
      });
      const clear = (s: number) =>
        boxes.every((c) => {
          const p = at(s, c);
          return avoid.every((o) => p.l >= o.right + GAP || p.r <= o.left - GAP || p.t >= o.bottom + GAP || p.b <= o.top - GAP);
        });
      // The largest scale that keeps the cast clear: from the cast filling the stage (heads keep a little
      // headroom) down to 60% of the whole drawing fitting it.
      const sFit = Math.min(box.width / W, box.height / H);
      const sMax = Math.max(sFit, Math.min(box.height / (H - HEADROOM), box.width / (W - 600)));
      const sMin = sFit * 0.6;
      let s = sMin;
      for (let k = 0; k <= 64; k++) {
        const next = sMax - ((sMax - sMin) * k) / 64;
        if (clear(next)) {
          s = next;
          break;
        }
      }
      const vw = box.width / s;
      const vh = box.height / s;
      root.setAttribute('viewBox', `${(W - vw).toFixed(1)} ${(H - vh).toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}`);
      // Passers-by enter only to the right of anything in their band.
      const bandTop = box.bottom - (H - (GROUND - 170)) * s;
      const edge = Math.max(box.left, ...avoid.filter((o) => o.bottom > bandTop - GAP).map((o) => o.right + GAP));
      span[0] = Math.max(760, W - (box.right - edge) / s);
    };
    const g = cast.current!;

    // Back to front: robot leads on the right; the two people walk together.
    // Phones frame the right-hand part of the stage, so the group sits a little further right there.
    const pos = narrow ? { a: 1050, b: 1300, bot: 1500 } : { a: 960, b: 1230, bot: 1450 };
    const figA = new Figure(g, A);
    const figB = new Figure(g, B);
    figA.root.setAttribute('transform', `translate(${pos.a} ${GROUND})`);
    figB.root.setAttribute('transform', `translate(${pos.b} ${GROUND})`);
    // B walks slightly behind A: draw B first.
    g.insertBefore(figB.root, figA.root);

    const boardA = makeBoard(figA.carry, 'flow');
    makeBoard(figB.carry, 'mark');
    const bot = new Bot(g);
    bot.root.setAttribute('transform', `translate(${pos.bot} ${GROUND}) scale(1.35)`);

    // The cast's real footprint (drawing units) over a walk cycle — swinging arms and boards included — for the
    // desktop fit. The flourish is static.
    const footprint = (node: SVGElement) => {
      const el = node as SVGGraphicsElement;
      const m = el.transform.baseVal.consolidate()?.matrix;
      const b = el.getBBox();
      const [a, d, e, f] = m ? [m.a, m.d, m.e, m.f] : [1, 1, 0, 0];
      return [a * b.x + e, d * b.y + f, a * (b.x + b.width) + e, d * (b.y + b.height) + f];
    };
    const castBoxes: number[][] = [figA.root, figB.root, bot.root].map(() => [Infinity, Infinity, -Infinity, -Infinity]);
    for (let frame = 0; frame < FPS * 1.25; frame++) {
      const t = frame / FPS;
      figA.pose(t, true);
      figB.pose(t, true);
      bot.pose(t);
      [figA.root, figB.root, bot.root].forEach((el, i) => {
        const [x1, y1, x2, y2] = footprint(el);
        const c = castBoxes[i];
        castBoxes[i] = [Math.min(c[0], x1 - 8), Math.min(c[1], y1 - 8), Math.max(c[2], x2 + 8), Math.max(c[3], y2 + 8)];
      });
    }
    castBoxes.push(FLOURISH_BOX);
    boxes = castBoxes;

    fit();
    window.addEventListener('resize', fit);
    // Headlines settle after fonts load and the line reveals finish; refit as they do.
    const refits = [300, 1200, 2600, 4500].map((ms) => window.setTimeout(fit, ms));
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(() => fit());
    if (section) ro.observe(section);

    // Depth: two small, muted passers-by crossing the back of the scene in opposite directions. They travel at
    // exactly stride / period, so their feet stay planted while they move.
    const back = root.querySelector<SVGGElement>('#st-back')!;
    const passers = narrow
      ? []
      : [
          { f: new Figure(back, { ...B, height: 150, hair: 'bun', skin: 'skin-b', jacket: 'f-grey', trousers: 'f-dark', trouserCut: 'slim', shoes: 'sneaker-light', period: 1.3, phase: 0.2 }), dir: 1, x0: 120, y: GROUND - 18 },
          { f: new Figure(back, { ...A, height: 132, hair: 'bob', glasses: false, skin: 'skin-a', jacket: 'f-main', trousers: 'f-light', period: 1.22, phase: 0.6 }), dir: -1, x0: 760, y: GROUND - 40 },
        ];
    // Passers-by stay right of the copy (span, set by fit) and fade in / out at the ends of their path.
    const movePassers = (t: number) =>
      passers.forEach((w) => {
        const v = (w.f.spec.stride * w.f.spec.height) / w.f.spec.period;
        const len = span[1] - span[0];
        const x = span[0] + ((((w.x0 - span[0] + w.dir * v * t) % len) + len) % len);
        w.f.root.setAttribute('transform', `translate(${x.toFixed(1)} ${w.y}) scale(${w.dir} 1)`);
        w.f.root.setAttribute('opacity', Math.min(1, (x - span[0]) / 140, (span[1] - x) / 140).toFixed(2));
        w.f.pose(t, false);
      });

    const boil = root.querySelector<SVGFETurbulenceElement>('#st-boil-noise')!;
    const paperNoise = root.querySelector<SVGFETurbulenceElement>('#st-paper-noise')!;

    const draw = (frame: number) => {
      const t = frame / FPS;
      figA.pose(t, true);
      figB.pose(t, true);
      bot.pose(t);
      boardA.update(t);
      movePassers(t);
      if (!reduce) {
        boil.setAttribute('seed', String(frame % 7));
        paperNoise.setAttribute('seed', String((frame >> 1) % 5));
        root.dataset.style = STYLES[Math.floor(frame / STYLE_FRAMES) % STYLES.length];
      }
    };

    if (reduce) {
      root.dataset.style = 'ink';
      draw(5);
      return () => {
        window.removeEventListener('resize', fit);
        refits.forEach(clearTimeout);
        ro.disconnect();
        g.replaceChildren();
      back.replaceChildren();
      };
    }
    root.dataset.style = 'ink';
    draw(0);

    let last = -1;
    let timer: Timer | null = null;
    const start = () => {
      if (timer) return timer.resume();
      timer = createTimer({
        loop: true,
        duration: 1e9,
        onUpdate: (self) => {
          const frame = Math.floor((self.currentTime / 1000) * FPS);
          if (frame !== last) {
            last = frame;
            draw(frame);
          }
        },
      });
    };
    let onScreen = true;
    let visible = document.visibilityState === 'visible';
    const sync = () => (onScreen && visible ? start() : timer?.pause());
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(root);
    const onVis = () => {
      visible = document.visibilityState === 'visible';
      sync();
    };
    document.addEventListener('visibilitychange', onVis);
    // Phones: keep the medium changes, drop the per-frame line boil (it is the expensive part).
    if (narrow) root.querySelector('#st-cast')?.setAttribute('filter', '');
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', fit);
      refits.forEach(clearTimeout);
      ro.disconnect();
      timer?.revert();
      g.replaceChildren();
      back.replaceChildren();
    };
  }, []);

  return (
    <svg
      ref={svg}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMaxYMax meet"
      data-style="ink"
      role="img"
      aria-label="Illustration: two people and a small Solution Bowl robot walk together; the tangled scribble on one person's sign untangles into a connected, finished flow."
      className={`stage block w-full ${className}`}
    >
      <defs>
        <filter id="st-boil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence id="st-boil-noise" type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="1" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="st-paper" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence id="st-paper-noise" type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" result="torn" />
          <feDropShadow in="torn" dx="2" dy="3" stdDeviation="1.6" floodColor="#5a2a0e" floodOpacity="0.28" />
        </filter>
        <pattern id="st-hatch-orange" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <rect width="7" height="7" fill="#f9b27a" />
          <path d="M0 1.5H7M0 5H7" stroke="#e8641f" strokeWidth="2.1" />
        </pattern>
        <pattern id="st-hatch-ink" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
          <rect width="6" height="6" fill="#6a625b" />
          <path d="M0 1H6M0 4H6" stroke="#231e1a" strokeWidth="1.8" />
        </pattern>
        <pattern id="st-hatch-light" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <rect width="8" height="8" fill="#fffaf2" />
          <path d="M0 4H8" stroke="#e9d8c3" strokeWidth="1.4" />
        </pattern>
        <pattern id="st-grain" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#2b2622" />
          <rect x="0" y="0" width="1" height="1" fill="#8b8079" />
          <rect x="2" y="1" width="1" height="1" fill="#5b524b" />
          <rect x="1" y="3" width="1" height="1" fill="#a39890" />
          <rect x="3" y="2" width="1" height="1" fill="#4a423c" />
        </pattern>
        <pattern id="st-grain-orange" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#ec6a24" />
          <rect x="1" y="0" width="1" height="1" fill="#ffb07a" />
          <rect x="3" y="2" width="1" height="1" fill="#c94f12" />
          <rect x="0" y="3" width="1" height="1" fill="#f99052" />
        </pattern>
        <style>{STAGE_CSS}</style>
      </defs>

      {/* A network flourish, from the molecule cluster in the SB logo: one sweeping line threading three nodes. */}
      <g className="flourish" fill="none" stroke="#f58634" strokeLinecap="round">
        <path d="M1660 -20 C1540 60 1350 70 1330 210 C1310 350 1520 330 1560 470 C1590 570 1500 640 1420 700" strokeWidth="17" />
        <circle cx="1331" cy="205" r="34" strokeWidth="15" fill="var(--color-cream)" />
        <circle cx="1556" cy="455" r="22" strokeWidth="13" fill="var(--color-cream)" />
        <circle cx="1470" cy="58" r="13" strokeWidth="11" fill="var(--color-cream)" />
      </g>

      <g id="st-back" className="back" filter="url(#st-boil)" />
      <g id="st-cast" ref={cast} filter="url(#st-boil)" />
    </svg>
  );
}

/** The four media. Every shape in the cast carries a role class; this is all that changes between them. */
const STAGE_CSS = `
.stage .ol{stroke:#1c1916;stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round}
.stage .line{fill:none}
.stage .ground-shadow{fill:#1c1916;opacity:.08}
.stage .shade{filter:brightness(.86)}
.stage .f-main{fill:#f58634}.stage .f-dark{fill:#2a2623}.stage .f-light{fill:#fffaf2}.stage .f-paper{fill:#fffdf8}.stage .f-grey{fill:#a7a9ab}
.stage .skin-a{fill:#f2c9a6}.stage .skin-b{fill:#d49a70}.stage .skin-c{fill:#8d5a3b}
.stage .hair{fill:#2a1f18}.stage .lens{fill:#1c1916}
.stage .sneaker-dark{fill:#1c1916}.stage .sneaker-light{fill:#fffaf2}.stage .sole{fill:#fffaf2}
.stage .collar{filter:brightness(.92)}
.stage .ink-mark{fill:#1c1916}.stage .mark-o{fill:#f58634}.stage .mark-g{fill:#848688}
.stage .flow-tangle{fill:none;stroke:#1c1916;stroke-width:3}
.stage .flow-done{fill:none;stroke:#e35a12;stroke-width:5;stroke-linecap:round}
.stage .node{fill:#fffdf8;stroke:#1c1916;stroke-width:2.6}
.stage .node-end{fill:#f58634;stroke:#1c1916;stroke-width:2.6}
.stage .tick{fill:none;stroke:#1c1916;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round}

.stage[data-style=pencil] .ol{stroke:#3a2f28;stroke-width:1.7}
.stage[data-style=pencil] .f-main{fill:url(#st-hatch-orange)}
.stage[data-style=pencil] .f-dark,.stage[data-style=pencil] .sneaker-dark{fill:url(#st-hatch-ink)}
.stage[data-style=pencil] .f-light,.stage[data-style=pencil] .f-paper,.stage[data-style=pencil] .sole{fill:url(#st-hatch-light)}
.stage[data-style=pencil] .hair{fill:#5a3a28}

.stage[data-style=grain] .ol{stroke-width:1.9}
.stage[data-style=grain] .f-main{fill:url(#st-grain-orange)}
.stage[data-style=grain] .f-light{fill:url(#st-grain)}
.stage[data-style=grain] .hair,.stage[data-style=grain] .sneaker-dark{fill:url(#st-grain)}
.stage[data-style=grain] .skin-a{fill:#f5d3b6}

.stage[data-style=paper] .ol{stroke:none}
.stage[data-style=paper] #st-cast{filter:url(#st-paper)}
.stage[data-style=paper] .f-main{fill:#e8561c}.stage[data-style=paper] .f-light{fill:#f6e4d2}.stage[data-style=paper] .f-paper{fill:#fbefe2}
.stage[data-style=paper] .hair{fill:#3b2a20}.stage[data-style=paper] .line{stroke:#1c1916;stroke-width:2.4}
.stage[data-style=paper] .flow-tangle{stroke:#1c1916}
.stage .flourish{opacity:.95}
.stage .back{opacity:.5}
.stage .back .f-main{fill:#f7b98a}.stage .back .f-dark{fill:#8a8178}.stage .back .f-grey{fill:#c9c2b8}.stage .back .f-light{fill:#fffaf2}
.stage .back .ol{stroke-width:2}
`;

/** Boards carried under the arm. 'flow' untangles over each loop; 'mark' shows the SB symbol. */
function makeBoard(parent: Element, kind: 'flow' | 'mark') {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag: string, attrs: Record<string, string | number>, p: Element = g) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, String(attrs[k]));
    p.appendChild(e);
    return e;
  };
  const g = document.createElementNS(NS, 'g');
  parent.appendChild(g);
  const bw = 190, bh = 132;
  // Board sits forward of the hip, partly in front of the body.
  g.setAttribute('transform', `translate(${-bw * 0.38} ${-bh * 0.5})`);
  el('rect', { x: 0, y: 0, width: bw, height: bh, rx: 4, class: 'f-paper ol' });
  if (kind === 'mark') {
    const s = document.createElementNS(NS, 'svg');
    for (const [k, v] of Object.entries({ x: 34, y: 22, width: bw - 68, height: bh - 44, viewBox: SYMBOL_VIEWBOX })) s.setAttribute(k, String(v));
    g.appendChild(s);
    el('path', { d: SYMBOL_ORANGE, class: 'mark-o', 'fill-rule': 'evenodd' }, s);
    el('path', { d: SYMBOL_GREY, class: 'mark-g', 'fill-rule': 'evenodd' }, s);
    return { update: () => {} };
  }
  // Tangled scribble → clean flow. Both are sampled at the same 40 points so one can become the other.
  const N = 40;
  const tangle = (i: number, t: number) => {
    const u = i / (N - 1);
    const a = u * Math.PI * 7.3;
    const wob = Math.sin(t * 9 + i) * 1.6;
    return [bw * 0.5 + Math.cos(a * 1.3) * (34 + 14 * Math.sin(a * 0.7)) + wob, bh * 0.5 + Math.sin(a) * (30 + 10 * Math.cos(a * 1.9)) + wob];
  };
  const flow = (i: number) => {
    const u = i / (N - 1);
    // Node → node → node along a gentle S, ending in the result node.
    return [26 + u * (bw - 56), bh * 0.58 - Math.sin(u * Math.PI) * 22 + Math.sin(u * Math.PI * 2) * 8];
  };
  const line = el('path', { class: 'flow-tangle' });
  const nodes = [0, 0.5, 1].map((u, k) => el('circle', { cx: flow(Math.round(u * (N - 1)))[0], cy: flow(Math.round(u * (N - 1)))[1], r: k === 2 ? 11 : 8, class: k === 2 ? 'node-end' : 'node', opacity: 0 }));
  const tick = el('path', { d: `M${bw - 36} ${bh * 0.58 - 1}l5 5l9 -10`, class: 'tick', opacity: 0, transform: `translate(${-4} ${-1})` });
  const LOOP = (STYLES.length * STYLE_FRAMES) / FPS;
  return {
    update(t: number) {
      const u = (t % LOOP) / LOOP;
      // Hold tangled, untangle, hold solved, then reset during a change of medium.
      const m = u < 0.3 ? 0 : u < 0.55 ? smooth((u - 0.3) / 0.25) : 1;
      let d = '';
      for (let i = 0; i < N; i++) {
        const [x0, y0] = tangle(i, t);
        const [x1, y1] = flow(i);
        const x = x0 + (x1 - x0) * m, y = y0 + (y1 - y0) * m;
        d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      line.setAttribute('d', d);
      line.setAttribute('class', m > 0.6 ? 'flow-done' : 'flow-tangle');
      const show = m > 0.92 ? 1 : 0;
      nodes.forEach((n) => n.setAttribute('opacity', String(show)));
      tick.setAttribute('opacity', String(u > 0.62 ? 1 : 0));
    },
  };
}
const smooth = (t: number) => t * t * (3 - 2 * t);

/** A small robot with a Solution Bowl body, trotting on short legs ahead of the people. */
class Bot {
  readonly root: SVGGElement;
  private parts: Record<string, SVGElement> = {};
  constructor(parent: Element) {
    const NS = 'http://www.w3.org/2000/svg';
    const el = (tag: string, attrs: Record<string, string | number>, p: Element) => {
      const e = document.createElementNS(NS, tag) as SVGElement;
      for (const k in attrs) e.setAttribute(k, String(attrs[k]));
      p.appendChild(e);
      return e;
    };
    this.root = el('g', {}, parent) as SVGGElement;
    el('ellipse', { class: 'ground-shadow', cx: 0, cy: 2, rx: 46, ry: 6 }, this.root);
    this.parts.farLeg = el('path', { class: 'f-dark ol shade' }, this.root);
    this.parts.body = el('g', {}, this.root);
    const b = this.parts.body;
    // The bowl: cream rim, orange glaze, a printed SB, a visor and an antenna.
    el('path', { d: 'M-62 -36 C-60 34 60 34 62 -36 Z', class: 'f-main ol' }, b);
    el('path', { d: 'M-66 -40 L66 -40 C66 -30 -66 -30 -66 -40 Z', class: 'f-light ol' }, b);
    el('path', { d: 'M-8 -18 L54 -18 C54 -2 46 4 38 4 L6 4 C-2 4 -8 -4 -8 -18 Z', class: 'f-dark ol' }, b);
    el('circle', { cx: 34, cy: -8, r: 4.5, class: 'f-main' }, b);
    el('path', { d: 'M-12 -42 L-20 -78', class: 'line ol' }, b);
    el('circle', { cx: -21, cy: -82, r: 8, class: 'f-main ol' }, b);
    this.parts.nearLeg = el('path', { class: 'f-dark ol' }, this.root);
  }
  pose(t: number) {
    // Quick little steps: same planted-foot gait as the people, at robot scale.
    const P = 0.56, S = 64, STANCE = 0.6;
    const p = (t / P) % 1;
    const bob = 3 * (0.5 + 0.5 * Math.cos(Math.PI * 4 * p));
    const hip0 = [0, -58 + bob];
    this.parts.body.setAttribute('transform', `translate(0 ${(-70 + bob).toFixed(1)}) rotate(${(1.6 * Math.sin(Math.PI * 2 * p)).toFixed(1)})`);
    const leg = (q: number, hx: number) => {
      q = ((q % 1) + 1) % 1;
      const hip = [hx, hip0[1]];
      let x, lift = 0;
      if (q < STANCE) x = S * STANCE * (0.5 - q / STANCE);
      else {
        const u = (q - STANCE) / (1 - STANCE);
        x = S * STANCE * (-0.5 + smooth(u));
        lift = Math.sin(Math.PI * u) * 10;
      }
      const a = [hip[0] + x, -6 - lift];
      // Knee bends forward.
      const k = [(hip[0] + a[0]) / 2 + 9, (hip[1] + a[1]) / 2];
      const w = 9;
      const n = (v: number) => v.toFixed(1);
      return (
        `M${n(hip[0] - w / 2)} ${n(hip[1])}Q${n(k[0] - w / 2)} ${n(k[1])} ${n(a[0] - w / 2)} ${n(a[1])}` +
        `L${n(a[0] - 8)} ${n(a[1] + 4)}C${n(a[0] - 10)} ${n(a[1] + 10)} ${n(a[0] + 22)} ${n(a[1] + 10)} ${n(a[0] + 20)} ${n(a[1] + 3)}` +
        `L${n(a[0] + w / 2)} ${n(a[1] - 2)}Q${n(k[0] + w / 2)} ${n(k[1])} ${n(hip[0] + w / 2)} ${n(hip[1])}Z`
      );
    };
    this.parts.farLeg.setAttribute('d', leg(p + 0.5, -12));
    this.parts.nearLeg.setAttribute('d', leg(p, 12));
  }
}
