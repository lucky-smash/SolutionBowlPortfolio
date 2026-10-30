/**
 * Illustrated walking figures for the hero stage.
 *
 * Tall, editorial proportions (~8 heads), real garments — tapered or flared trousers, jackets with collars,
 * sneakers with soles — drawn as filled shapes with an ink outline. Every shape carries a role class (f-main,
 * f-dark, f-light, f-paper, skin, hair) so the stage can re-render the same drawing in different media just by
 * switching a data attribute (ink, pencil, grain, cut paper), and a boil filter makes the lines live.
 *
 * The gait is the same distance-driven, two-bone-IK walk as before (planted feet never slide relative to the
 * ground), retuned for long legs; the stage samples it "on twos" (12 fps) like hand-drawn animation.
 */
const NS = 'http://www.w3.org/2000/svg';
type El = SVGElement;
const el = (tag: string, attrs: Record<string, string | number>, parent?: Element): El => {
  const e = document.createElementNS(NS, tag) as El;
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  parent?.appendChild(e);
  return e;
};
const TAU = Math.PI * 2;
const smooth = (t: number) => t * t * (3 - 2 * t);
const f1 = (n: number) => n.toFixed(1);

export type Role = 'f-main' | 'f-dark' | 'f-light' | 'f-paper' | 'f-grey';

export interface FigureSpec {
  /** Overall height in stage units. */
  height: number;
  skin: 'skin-a' | 'skin-b' | 'skin-c';
  hair: 'quiff' | 'curls' | 'bob' | 'bun';
  glasses?: boolean;
  trousers: Role;
  trouserCut: 'slim' | 'flare';
  jacket: Role;
  /** Long jacket / coat that covers the hips. */
  coat?: boolean;
  shoes: 'sneaker-dark' | 'sneaker-light';
  /** Cadence: seconds per full cycle (two steps). */
  period: number;
  /** Stride as a fraction of height. */
  stride: number;
  /** Phase offset so figures never step in unison. */
  phase: number;
  lean: number;
}

/** Tapered limb: a closed shape around a two-segment chain with widths at the joints. */
function limb(a: number[], b: number[], c: number[], wa: number, wb: number, wc: number, hem = 0) {
  const n = (p: number[], q: number[]) => {
    const dx = q[0] - p[0], dy = q[1] - p[1];
    const l = Math.hypot(dx, dy) || 1;
    return [-dy / l, dx / l];
  };
  const n1 = n(a, b), n2 = n(b, c);
  const nb = [(n1[0] + n2[0]) / 2, (n1[1] + n2[1]) / 2];
  const L = (p: number[], v: number[], w: number) => [p[0] + (v[0] * w) / 2, p[1] + (v[1] * w) / 2];
  const R = (p: number[], v: number[], w: number) => [p[0] - (v[0] * w) / 2, p[1] - (v[1] * w) / 2];
  const a1 = L(a, n1, wa), b1 = L(b, nb, wb), c1 = L(c, n2, wc);
  const a2 = R(a, n1, wa), b2 = R(b, nb, wb), c2 = R(c, n2, wc);
  // Flared hems kick out slightly at the bottom.
  const c1h = [c1[0] + n2[0] * hem, c1[1] + n2[1] * hem], c2h = [c2[0] - n2[0] * hem, c2[1] - n2[1] * hem];
  return `M${f1(a1[0])} ${f1(a1[1])}Q${f1(b1[0])} ${f1(b1[1])} ${f1((b1[0] + c1h[0]) / 2)} ${f1((b1[1] + c1h[1]) / 2)}L${f1(c1h[0])} ${f1(c1h[1])}L${f1(c2h[0])} ${f1(c2h[1])}L${f1((b2[0] + c2h[0]) / 2)} ${f1((b2[1] + c2h[1]) / 2)}Q${f1(b2[0])} ${f1(b2[1])} ${f1(a2[0])} ${f1(a2[1])}Z`;
}

function knee(hx: number, hy: number, ax: number, ay: number, l1: number, l2: number, forward = 1) {
  let dx = ax - hx, dy = ay - hy;
  let d = Math.hypot(dx, dy);
  const max = l1 + l2 - 0.5;
  if (d > max) { dx *= max / d; dy *= max / d; d = max; }
  const a = Math.atan2(dy, dx);
  const b = Math.acos(Math.min(1, Math.max(-1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const k1 = [hx + l1 * Math.cos(a - b), hy + l1 * Math.sin(a - b)];
  const k2 = [hx + l1 * Math.cos(a + b), hy + l1 * Math.sin(a + b)];
  return (k1[0] - k2[0]) * forward > 0 ? k1 : k2;
}

export class Figure {
  readonly root: El;
  private parts: Record<string, El> = {};
  private head: El;
  readonly carry: El; // a carried board sits here, attached to the torso
  private D: Record<string, number>;

  constructor(parent: Element, readonly spec: FigureSpec) {
    const H = spec.height;
    this.D = {
      head: H * 0.118,
      neck: H * 0.03,
      thigh: H * 0.262,
      shin: H * 0.245,
      ankle: H * 0.018,
      torso: H * 0.33,
      upper: H * 0.17,
      fore: H * 0.155,
    };
    this.root = el('g', { class: 'figure' }, parent);
    const g = this.root;
    const P = (key: string, cls: string) => (this.parts[key] = el('path', { class: `${cls} ol` }, g));
    el('ellipse', { class: 'ground-shadow', cx: 0, cy: 2, rx: H * 0.13, ry: H * 0.012 }, g);
    P('farArm', `${spec.jacket} shade`);
    P('farHand', `${spec.skin} shade`);
    P('farLeg', `${spec.trousers} shade`);
    P('farShoe', spec.shoes);
    P('farSole', 'sole');
    P('torso', spec.jacket);
    P('collar', `${spec.jacket} collar`);
    P('neck', spec.skin);
    this.head = el('g', {}, g);
    drawHead(this.head, spec);
    P('nearLeg', spec.trousers);
    P('nearShoe', spec.shoes);
    P('nearSole', 'sole');
    P('hem', `${spec.jacket}`);
    this.carry = el('g', {}, g);
    P('nearArm', spec.jacket);
    P('nearHand', spec.skin);
  }

  /** Pose for a time in seconds (the stage quantises it). `hold` makes the near arm grip the carried board. */
  pose(t: number, hold: boolean) {
    const s = this.spec;
    const D = this.D;
    const H = s.height;
    const S = s.stride * H;
    const p = ((t / s.period + s.phase) % 1 + 1) % 1;
    const STANCE = 0.6;
    const bob = H * 0.012;
    const hipH = D.thigh + D.shin + D.ankle - H * 0.012;
    const hip = [0, -hipH + bob * (0.5 + 0.5 * Math.cos(TAU * 2 * p))];

    const leg = (q: number) => {
      let x, lift = 0, ang = 0;
      if (q < STANCE) {
        const u = q / STANCE;
        x = S * STANCE * (0.5 - u);
        ang = -0.6 * smooth(Math.max(0, (u - 0.6) / 0.4));
      } else {
        const u = (q - STANCE) / (1 - STANCE);
        x = S * STANCE * (-0.5 + smooth(u));
        lift = Math.sin(Math.PI * u) * H * 0.05;
        ang = -0.45 * (1 - u) + 0.2 * smooth(Math.max(0, (u - 0.65) / 0.35));
      }
      const ax = hip[0] + x;
      const ay = -D.ankle - lift - (ang < 0 ? Math.sin(-ang) * H * 0.03 : 0);
      const k = knee(hip[0], hip[1], ax, ay, D.thigh, D.shin);
      return { a: [ax, ay], k, ang };
    };
    const far = leg((p + 0.5) % 1);
    const near = leg(p);
    const wide = s.trouserCut === 'flare';
    const tw = H * 0.098, kw = H * (wide ? 0.07 : 0.062), aw = H * (wide ? 0.115 : 0.052);
    this.parts.farLeg.setAttribute('d', limb(hip, far.k, far.a, tw, kw, aw, wide ? H * 0.01 : 0));
    this.parts.nearLeg.setAttribute('d', limb(hip, near.k, near.a, tw, kw, aw, wide ? H * 0.01 : 0));
    const shoe = (a: number[], ang: number) => `translate(${f1(a[0])} ${f1(a[1])}) rotate(${f1(ang * 57.3)}) scale(${(H / 520).toFixed(3)})`;
    this.parts.farShoe.setAttribute('d', SHOE);
    this.parts.farShoe.setAttribute('transform', shoe(far.a, far.ang));
    this.parts.farSole.setAttribute('d', SOLE);
    this.parts.farSole.setAttribute('transform', shoe(far.a, far.ang));
    this.parts.nearShoe.setAttribute('d', SHOE);
    this.parts.nearShoe.setAttribute('transform', shoe(near.a, near.ang));
    this.parts.nearSole.setAttribute('d', SOLE);
    this.parts.nearSole.setAttribute('transform', shoe(near.a, near.ang));

    // Torso: a jacket from shoulders to hips, leaning and twisting slightly with the stride.
    const lean = s.lean + 0.02 * Math.sin(TAU * 2 * p + 1);
    const sh = [hip[0] + Math.sin(lean) * D.torso, hip[1] - Math.cos(lean) * D.torso];
    const depth = H * 0.16;
    const hemY = hip[1] + (s.coat ? H * 0.12 : H * 0.02);
    const back = sh[0] - depth * 0.55, front = sh[0] + depth * 0.45;
    this.parts.torso.setAttribute(
      'd',
      `M${f1(back)} ${f1(sh[1] + H * 0.02)}Q${f1(sh[0])} ${f1(sh[1] - H * 0.012)} ${f1(front)} ${f1(sh[1] + H * 0.02)}` +
        `Q${f1(front + H * 0.012)} ${f1((sh[1] + hemY) / 2)} ${f1(hip[0] + depth * 0.5)} ${f1(hemY)}` +
        `L${f1(hip[0] - depth * 0.58)} ${f1(hemY + H * 0.004)}Q${f1(back - H * 0.014)} ${f1((sh[1] + hemY) / 2)} ${f1(back)} ${f1(sh[1] + H * 0.02)}Z`,
    );
    this.parts.hem.setAttribute('d', '');
    this.parts.collar.setAttribute(
      'd',
      `M${f1(sh[0] - depth * 0.15)} ${f1(sh[1] + H * 0.005)}L${f1(sh[0] + depth * 0.32)} ${f1(sh[1] + H * 0.012)}L${f1(sh[0] + depth * 0.05)} ${f1(sh[1] + H * 0.075)}Z`,
    );
    const nk = [sh[0] + H * 0.012, sh[1] - D.neck];
    const nw = H * 0.03;
    this.parts.neck.setAttribute('d', `M${f1(sh[0] - nw / 2)} ${f1(sh[1] + 4)}L${f1(nk[0] - nw / 2)} ${f1(nk[1])}L${f1(nk[0] + nw / 2)} ${f1(nk[1])}L${f1(sh[0] + nw / 2)} ${f1(sh[1] + 4)}Z`);
    const headBob = H * 0.002 * Math.sin(TAU * 2 * p - 0.9);
    this.head.setAttribute('transform', `translate(${f1(nk[0] + H * 0.01)} ${f1(nk[1] - D.head * 0.42 + headBob)}) rotate(${f1(lean * 25 + 1.5 * Math.sin(TAU * p))}) scale(${(H / 520).toFixed(3)})`);

    // Arms.
    const shoulder = [sh[0] - depth * 0.05, sh[1] + H * 0.03];
    const arm = (angle: number, elbow: number) => {
      const e = [shoulder[0] + Math.sin(angle) * D.upper, shoulder[1] + Math.cos(angle) * D.upper];
      const fa = angle + elbow;
      const w = [e[0] + Math.sin(fa) * D.fore, e[1] + Math.cos(fa) * D.fore];
      return { e, w };
    };
    const swing = 0.36 * Math.cos(TAU * p);
    const farA = arm(swing, 0.25 + Math.max(0, swing) * 0.6);
    const nearA = hold ? arm(0.18 + 0.03 * Math.sin(TAU * 2 * p), 0.55) : arm(-swing, 0.25 + Math.max(0, -swing) * 0.6);
    const sw = H * 0.064, ew = H * 0.054, ww = H * 0.042;
    this.parts.farArm.setAttribute('d', limb(shoulder, farA.e, farA.w, sw, ew, ww));
    this.parts.nearArm.setAttribute('d', limb(shoulder, nearA.e, nearA.w, sw, ew, ww));
    const hand = (w: number[], e: number[]) => {
      const a = Math.atan2(w[1] - e[1], w[0] - e[0]);
      return `translate(${f1(w[0])} ${f1(w[1])}) rotate(${f1(a * 57.3 - 90)}) scale(${(H / 520).toFixed(3)})`;
    };
    this.parts.farHand.setAttribute('d', HAND);
    this.parts.farHand.setAttribute('transform', hand(farA.w, farA.e));
    this.parts.nearHand.setAttribute('d', HAND);
    this.parts.nearHand.setAttribute('transform', hand(nearA.w, nearA.e));

    // The board rides on the torso, tucked under the near arm.
    this.carry.setAttribute('transform', `translate(${f1(hip[0] + H * 0.01)} ${f1(hip[1] - D.torso * 0.42)}) rotate(${f1(-4 + lean * 30 + 1.2 * Math.sin(TAU * 2 * p - 0.7))})`);
  }
}

// Shapes drawn at the 520-unit reference height (scaled by the figure).
const SHOE = 'M-14 -10C-14 -22 2 -22 10 -16L34 -8C46 -4 48 6 40 8L-16 8C-22 8 -22 0 -14 -10Z';
const SOLE = 'M-18 4L42 4C44 6 44 10 40 11L-16 11C-20 11 -20 6 -18 4Z';
const HAND = 'M-9 -4C-10 6 -6 16 2 17C9 18 12 10 11 2C10 -4 6 -6 0 -6C-4 -6 -8 -6 -9 -4ZM8 0C14 -2 16 4 12 8';

function drawHead(g: El, s: FigureSpec) {
  const P = (d: string, cls: string) => el('path', { d, class: `${cls} ol` }, g);
  // Hair behind.
  if (s.hair === 'curls') P('M-30 -40C-52 -30 -50 10 -38 26C-30 40 -20 30 -22 12C-24 -8 -20 -26 -10 -34Z', 'hair');
  if (s.hair === 'bun') P('M-34 -46C-48 -50 -54 -34 -44 -26C-36 -20 -26 -28 -28 -38Z', 'hair');
  // Profile: forehead, nose, lips, chin, jaw back to the neck.
  P('M-24 -38C-12 -54 22 -52 30 -32C34 -22 32 -14 38 -8C40 -5 36 -2 32 -2C34 4 32 8 28 10C30 14 26 18 20 18C14 26 4 30 -6 28C-18 26 -26 16 -28 2C-30 -14 -32 -28 -24 -38Z', s.skin);
  P('M-8 -4C-14 -10 -20 -4 -16 4C-14 8 -10 8 -8 6', `${s.skin} ear`);
  if (s.glasses) {
    P('M10 -18L36 -18C38 -12 36 -6 30 -6L16 -6C11 -6 9 -12 10 -18Z', 'lens');
    el('path', { d: 'M10 -16L-6 -14', class: 'line ol' }, g);
  } else {
    el('path', { d: 'M22 -16C24 -18 28 -18 30 -15', class: 'line ol' }, g);
  }
  el('path', { d: 'M24 12C27 13 29 12 30 10', class: 'line ol' }, g);
  // Hair over.
  const top = {
    quiff: 'M-30 -30C-36 -56 -2 -74 26 -60C40 -54 42 -40 34 -36C24 -44 10 -44 0 -36C-6 -30 -10 -22 -12 -14C-20 -14 -26 -20 -30 -30Z',
    curls: 'M-34 -24C-44 -52 -10 -70 18 -62C34 -58 40 -44 34 -38C26 -44 12 -46 2 -40C-6 -34 -10 -26 -12 -18C-18 -10 -26 -6 -30 -2C-38 -8 -36 -16 -34 -24Z',
    bob: 'M-34 6C-44 -34 -16 -64 16 -58C36 -54 42 -40 36 -34C24 -40 6 -42 -4 -34C-10 -26 -12 -10 -14 4C-18 14 -28 16 -34 6Z',
    bun: 'M-30 -26C-36 -52 -4 -66 20 -58C34 -54 38 -42 32 -38C22 -44 8 -44 -2 -38C-8 -32 -12 -24 -14 -16C-22 -14 -27 -18 -30 -26Z',
  }[s.hair];
  P(top, 'hair');
}
