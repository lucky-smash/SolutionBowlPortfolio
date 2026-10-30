// Grip correction for the hand sculpt (assets-src/models/hand/hand.dae).
//
// The sculpt is a static, unrigged right hand, slightly cupped, posed hanging with its palm facing −X. Holding the
// bowl palm-up from underneath is what that shape is closest to, so the hand is:
//   1. measured: wrist, knuckle line, palm surface and the five digit chains are found from the mesh itself;
//   2. placed rigidly in the bowl's frame (bowl: outer radius 1, foot at the origin, opening along +Y);
//   3. re-posed like a skinned mesh: each digit is rotated about its MCP / PIP / DIP joints with smooth weights so
//      the pads close onto the bowl's curved wall, and the wrist is set to a relaxed extension;
//   4. resolved against the bowl's exact signed-distance field so no vertex is left inside the ceramic, with the
//      push-out spread smoothly over the neighbourhood so the skin looks compressed, not dented.
// All positions are returned in the bowl's frame, so the runtime only has to add the hand next to the bowl.
import { hullDistance as bowlDistance } from './bowl-sdf.mjs';

const v3 = {
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  scale: (a, s) => [a[0] * s, a[1] * s, a[2] * s],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  norm: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
};

/** Rodrigues rotation of p about the axis (unit) through point o by angle a. */
function rotateAbout(p, o, axis, a) {
  const c = Math.cos(a), s = Math.sin(a);
  const d = v3.sub(p, o);
  const k = axis;
  const kd = v3.dot(k, d);
  const kxd = v3.cross(k, d);
  return [
    o[0] + d[0] * c + kxd[0] * s + k[0] * kd * (1 - c),
    o[1] + d[1] * c + kxd[1] * s + k[1] * kd * (1 - c),
    o[2] + d[2] * c + kxd[2] * s + k[2] * kd * (1 - c),
  ];
}
const smooth = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

/** Welds coincident vertices (UV seams) and builds vertex adjacency on the welded set. */
function topology(P, index) {
  const n = P.length / 3;
  const map = new Map();
  const canon = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    const k = `${Math.round(P[i * 3] * 1e4)},${Math.round(P[i * 3 + 1] * 1e4)},${Math.round(P[i * 3 + 2] * 1e4)}`;
    if (!map.has(k)) map.set(k, i);
    canon[i] = map.get(k);
  }
  const adj = Array.from({ length: n }, () => new Set());
  for (let t = 0; t < index.length; t += 3) {
    const a = canon[index[t]], b = canon[index[t + 1]], c = canon[index[t + 2]];
    adj[a].add(b).add(c); adj[b].add(a).add(c); adj[c].add(a).add(b);
  }
  return { n, canon, adj: adj.map((s) => [...s]) };
}

const get = (P, i) => [P[i * 3], P[i * 3 + 1], P[i * 3 + 2]];
const set = (P, i, p) => { P[i * 3] = p[0]; P[i * 3 + 1] = p[1]; P[i * 3 + 2] = p[2]; };

/** Connected components of welded vertices satisfying pred. */
function components(topo, pred) {
  const { n, canon, adj } = topo;
  const seen = new Uint8Array(n);
  const out = [];
  for (let i = 0; i < n; i++) {
    if (canon[i] !== i || seen[i] || !pred(i)) continue;
    const stack = [i]; seen[i] = 1; const c = [];
    while (stack.length) { const v = stack.pop(); c.push(v); for (const w of adj[v]) if (!seen[w] && pred(w)) { seen[w] = 1; stack.push(w); } }
    out.push(c);
  }
  return out;
}

export const POSE = {
  /** Hand size relative to the bowl (outer radius 1 ≈ 7.5 cm): palm ≈ 10 cm, middle finger ≈ 8.5 cm. */
  scale: 1.3,
  /** Where the palm's centre sits under the bowl (bowl frame), and which way the fingers and forearm point. */
  palmAt: [0.02, -0.035, 0.05],
  /** Direction from wrist to knuckles in the bowl frame (the fingers reach to the back-left, under the bowl). */
  handAxis: [-0.62, 0.05, -0.78],
  /** Roll of the palm about the hand axis, radians (0 = palm straight up). */
  roll: 0.1,
  /** Wrist extension added to the sculpt, radians (positive lowers the forearm away from the bowl). */
  wrist: 0.38,
  /** Extra flexion per digit at [MCP, PIP, DIP], radians, before contact fitting. Index → pinky, then thumb. */
  curl: {
    index: [0.25, 0.35, 0.18],
    middle: [0.25, 0.35, 0.18],
    ring: [0.28, 0.35, 0.18],
    pinky: [0.3, 0.35, 0.18],
    thumb: [0.15, 0.2, 0.1],
  },
  /** Skin left between pads and glaze after fitting (bowl units ≈ 0.4 mm). */
  contact: 0.006,
};

export function poseHand(mesh, opts = {}) {
  const pose = { ...POSE, ...opts };
  const P = mesh.position;
  const topo = topology(P, mesh.index);
  const { n, canon } = topo;
  const isCanon = (i) => canon[i] === i;
  const report = {};

  // ---- 1. Measure the sculpt (raw frame: fingers toward −Y, palm facing −X, thumb toward +Z) ------------------
  const digits = components(topo, (i) => P[i * 3 + 1] < -0.4).filter((c) => c.length > 200);
  // Thumb: the chain nearest the palm plane (smallest x). Fingers ordered by z: index (largest) → pinky.
  digits.sort((a, b) => mean(P, a)[0] - mean(P, b)[0]);
  const thumbSeed = digits[0];
  const fingersSeed = digits.slice(1).sort((a, b) => mean(P, b)[2] - mean(P, a)[2]);
  if (fingersSeed.length !== 4) throw new Error(`expected 4 fingers, found ${fingersSeed.length}`);

  // Grow each digit up to its knuckle: flood from the seed through vertices below the web line of that digit.
  const names = ['index', 'middle', 'ring', 'pinky'];
  const digitOf = new Int8Array(n).fill(-1);
  const chains = [];
  fingersSeed.forEach((seed, f) => {
    const c = mean(P, seed);
    // Web line: the highest y where this finger is still separate from its neighbours.
    let web = -0.4;
    for (let y = -0.38; y < 0.05; y += 0.02) {
      const comps = components(topo, (i) => P[i * 3 + 1] < y && Math.abs(P[i * 3 + 2] - c[2]) < 0.2);
      const mine = comps.find((cc) => cc.includes(seed[0]));
      const zs = mine.map((i) => P[i * 3 + 2]);
      if (Math.max(...zs) - Math.min(...zs) > 0.26) break;
      web = y;
    }
    const verts = components(topo, (i) => P[i * 3 + 1] < web).find((cc) => cc.includes(seed[0]));
    chains.push({ name: names[f], verts, web });
  });
  const thumbVerts = components(topo, (i) => P[i * 3 + 1] < -0.2 && P[i * 3] < 0.2).find((cc) => cc.includes(thumbSeed[0]));
  chains.push({ name: 'thumb', verts: thumbVerts, web: -0.2 });
  chains.forEach((ch, k) => ch.verts.forEach((v) => (digitOf[v] = k)));

  // Joint frame per digit: base (knuckle) at the web, tip at the far end, axis along the digit.
  for (const ch of chains) {
    const pts = ch.verts.map((i) => get(P, i));
    const tip = pts.reduce((a, b) => (b[1] < a[1] ? b : a));
    const baseRing = pts.filter((p) => p[1] > ch.web - 0.04);
    const base = meanPts(baseRing.length ? baseRing : pts);
    ch.base = base;
    ch.tip = tip;
    ch.length = v3.len(v3.sub(tip, base));
  }

  // Hand frame: wrist centre, knuckle centre, palm normal.
  const wristC = meanPts(collect(P, n, isCanon, (p) => p[1] > 0.28 && p[1] < 0.42));
  const knuckles = meanPts(chains.slice(0, 4).map((c) => c.base));
  const axis = v3.norm(v3.sub(knuckles, wristC));
  // Lateral: from pinky knuckle to index knuckle, made orthogonal to the axis.
  let lateral = v3.sub(chains[0].base, chains[3].base);
  lateral = v3.norm(v3.sub(lateral, v3.scale(axis, v3.dot(lateral, axis))));
  // Palm normal (out of the palm): the side the relaxed fingertips curl toward. The sculpt turns out to be a
  // left hand, so the frame's handedness is measured and kept (never mirrored) rather than assumed.
  let palmN = v3.norm(v3.cross(lateral, axis));
  if (v3.dot(v3.sub(chains[1].tip, chains[1].base), palmN) < 0) palmN = v3.scale(palmN, -1);
  const handed = Math.sign(v3.dot(v3.cross(axis, lateral), palmN)); // +1: (axis, lateral, palmN) right-handed
  // Palm surface: the most palm-ward skin around the middle of the metacarpals.
  const mid = v3.add(wristC, v3.scale(v3.sub(knuckles, wristC), 0.55));
  const palmBand = collect(P, n, (i) => isCanon(i) && digitOf[i] < 0, (p) => Math.abs(v3.dot(v3.sub(p, mid), axis)) < 0.12 && Math.abs(v3.dot(v3.sub(p, mid), lateral)) < 0.18);
  const palmDepth = Math.max(...palmBand.map((p) => v3.dot(v3.sub(p, mid), palmN)));
  const palmPoint = v3.add(mid, v3.scale(palmN, palmDepth));
  report.frame = { handed, wristC, knuckles, axis, lateral, palmN, palmPoint, chains: chains.map((c) => ({ name: c.name, n: c.verts.length, length: +c.length.toFixed(3), web: +c.web.toFixed(2) })) };

  // ---- 3a. Re-pose in the raw frame (joint rotations), before placement --------------------------------------
  // Wrist: rotate everything on the forearm side of the wrist about the lateral axis.
  const wristAxis = lateral; // flexion/extension axis
  for (let i = 0; i < n; i++) {
    if (!isCanon(i)) continue;
    const p = get(P, i);
    const along = v3.dot(v3.sub(p, wristC), axis); // negative toward the forearm
    const w = 1 - smooth(-0.22, 0.02, along);
    if (w > 0) set(P, i, rotateAbout(p, wristC, wristAxis, -pose.wrist * w));
  }

  // ---- 2. Rigid placement in the bowl frame (computed now, applied after the joints are posed) ----------------
  // Target basis: hand axis → pose.handAxis, palm normal → up (rolled about the axis).
  const A = v3.norm(pose.handAxis);
  let N = [0, 1, 0];
  N = v3.norm(v3.sub(N, v3.scale(A, v3.dot(N, A))));
  // Same handedness as the source: if (axis, lateral, palmN) is right-handed, so is (A, L, Nn).
  const L0 = handed > 0 ? v3.cross(N, A) : v3.cross(A, N);
  const L = v3.norm(rotateAbout(L0, [0, 0, 0], A, pose.roll));
  const Nn = v3.norm(handed > 0 ? v3.cross(A, L) : v3.cross(L, A));
  const s = pose.scale;
  const at = [...pose.palmAt];
  const toBowl = (p) => {
    const d = v3.sub(p, palmPoint);
    const a = v3.dot(d, axis), l = v3.dot(d, lateral), m = v3.dot(d, palmN);
    return [
      at[0] + s * (A[0] * a + L[0] * l + Nn[0] * m),
      at[1] + s * (A[1] * a + L[1] * l + Nn[1] * m),
      at[2] + s * (A[2] * a + L[2] * l + Nn[2] * m),
    ];
  };
  const distRaw = (p) => { const q = toBowl(p); return bowlDistance(q[0], q[1], q[2]); };

  // Seat the palm: lower the hand until the palm (everything that is not a digit) just touches the foot.
  const palmVerts = [];
  for (let i = 0; i < n; i++) if (isCanon(i) && digitOf[i] < 0) palmVerts.push(i);
  for (let it = 0; it < 6; it++) {
    let min = Infinity;
    for (const i of palmVerts) min = Math.min(min, distRaw(get(P, i)));
    at[1] += min - pose.contact; // gap → raise, penetration → lower
    if (Math.abs(pose.contact - min) < 1e-4) break;
  }
  report.palmAt = at.map((v) => +v.toFixed(4));

  // ---- 3b. Digits: rotate about MCP (base), PIP and DIP joints with smooth weights, the amount of flexion fitted
  // per digit so its pads arrive on the glaze (closest approach = pose.contact) instead of passing through it.
  const fractions = { finger: [0, 0.46, 0.74], thumb: [0, 0.42, 0.7] };
  chains.forEach((ch) => {
    const fr = ch.name === 'thumb' ? fractions.thumb : fractions.finger;
    const angles = pose.curl[ch.name];
    const dir = v3.norm(v3.sub(ch.tip, ch.base));
    const flexAxis = v3.norm(v3.cross(dir, palmN));
    const joints = fr.map((f) => v3.add(ch.base, v3.scale(dir, f * ch.length)));
    const blend = 0.06 * ch.length + 0.01;
    // Include the palm skin just above the knuckle so the MCP bend is spread across the knuckle.
    const set_ = new Set(ch.verts);
    for (let i = 0; i < n; i++) {
      if (!isCanon(i) || set_.has(i) || digitOf[i] >= 0) continue;
      const p = get(P, i);
      const t = v3.dot(v3.sub(p, ch.base), dir);
      const lat = v3.len(v3.sub(v3.sub(p, ch.base), v3.scale(dir, t)));
      if (t > -0.08 && lat < 0.11 + (ch.name === 'thumb' ? 0.04 : 0)) set_.add(i);
    }
    const verts = [...set_];
    const rest = verts.map((i) => get(P, i));
    // Pose the digit with all joint angles scaled by k (applied tip-first so each joint sits where the
    // pose before its parent put it).
    const posed = (k) =>
      rest.map((p0) => {
        let p = p0;
        for (let j = joints.length - 1; j >= 0; j--) {
          const t = v3.dot(v3.sub(p0, ch.base), dir) - fr[j] * ch.length;
          const w = smooth(-blend, blend, t);
          if (w > 0) p = rotateAbout(p, joints[j], flexAxis, angles[j] * k * w);
        }
        return p;
      });
    const minDist = (k) => Math.min(...posed(k).map(distRaw));
    // Largest k in [kMin, kMax] whose closest approach is still ≥ contact (distance falls as the digit curls in).
    const kMin = ch.name === 'thumb' ? -1.4 : -0.6, kMax = ch.name === 'pinky' ? 1.2 : 1.4;
    let k;
    if (minDist(kMin) < pose.contact) k = kMin; // even uncurled it touches: leave the rest to the resolver
    else if (minDist(kMax) >= pose.contact) k = kMax; // can't reach the bowl
    else {
      let lo = kMin, hi = kMax;
      for (let it = 0; it < 22; it++) { const mid = (lo + hi) / 2; if (minDist(mid) >= pose.contact) lo = mid; else hi = mid; }
      k = lo;
    }
    if (ch.name === 'index') k = Math.min(k, pose.indexLift ?? k); // the index rests a touch lighter
    posed(k).forEach((p, idx) => set(P, verts[idx], p));
    ch.k = +k.toFixed(3);
  });
  report.curlFit = Object.fromEntries(chains.map((c) => [c.name, c.k]));

  for (let i = 0; i < n; i++) if (isCanon(i)) set(P, i, toBowl(get(P, i)));

  // ---- 4. Resolve contact against the bowl ------------------------------------------------------------------
  const nrm = [0, 0, 0];
  const disp = new Float32Array(n * 3);
  let worst = 0, inside = 0;
  for (let i = 0; i < n; i++) {
    if (!isCanon(i)) continue;
    const d = bowlDistance(P[i * 3], P[i * 3 + 1], P[i * 3 + 2], nrm);
    if (d < pose.contact) {
      const push = pose.contact - d;
      disp[i * 3] = nrm[0] * push; disp[i * 3 + 1] = nrm[1] * push; disp[i * 3 + 2] = nrm[2] * push;
      worst = Math.min(worst, d); if (d < 0) inside++;
    }
  }
  report.beforeResolve = { worst: +worst.toFixed(4), inside };
  // Spread the push-out (Laplacian smoothing of the displacement field, keeping the max per vertex).
  for (let it = 0; it < 12; it++) {
    const next = new Float32Array(disp);
    for (let i = 0; i < n; i++) {
      if (!isCanon(i)) continue;
      const nb = topo.adj[i];
      let sx = 0, sy = 0, sz = 0;
      for (const j of nb) { sx += disp[j * 3]; sy += disp[j * 3 + 1]; sz += disp[j * 3 + 2]; }
      const k = 1 / nb.length;
      const ax = sx * k, ay = sy * k, az = sz * k;
      // Keep at least the hard push for colliding vertices; let others inherit a share of the neighbourhood's.
      if (ax * ax + ay * ay + az * az > next[i * 3] ** 2 + next[i * 3 + 1] ** 2 + next[i * 3 + 2] ** 2) {
        next[i * 3] = ax * 0.92; next[i * 3 + 1] = ay * 0.92; next[i * 3 + 2] = az * 0.92;
      }
    }
    disp.set(next);
  }
  for (let i = 0; i < n; i++) if (isCanon(i)) set(P, i, v3.add(get(P, i), [disp[i * 3], disp[i * 3 + 1], disp[i * 3 + 2]]));
  // Final hard guarantee.
  worst = Infinity; inside = 0;
  for (let i = 0; i < n; i++) {
    if (!isCanon(i)) continue;
    const d = bowlDistance(P[i * 3], P[i * 3 + 1], P[i * 3 + 2], nrm);
    if (d < pose.contact * 0.5) { const push = pose.contact - d; set(P, i, v3.add(get(P, i), v3.scale(nrm, push))); inside++; }
    worst = Math.min(worst, d);
  }
  report.afterResolve = { minDistanceBeforeHardFix: +worst.toFixed(4), hardFixed: inside };

  // Contact per digit (closest approach of each chain to the glaze).
  report.contact = chains.map((ch) => ({ name: ch.name, min: +Math.min(...ch.verts.map((i) => bowlDistance(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]))).toFixed(4) }));

  // Copy welded positions back to their seam duplicates, then recompute normals.
  for (let i = 0; i < n; i++) if (!isCanon(i)) set(P, i, get(P, canon[i]));
  recomputeNormals(mesh, canon);
  mesh.report = report;
  return mesh;
}

function mean(P, idx) { const s = [0, 0, 0]; for (const i of idx) { s[0] += P[i * 3]; s[1] += P[i * 3 + 1]; s[2] += P[i * 3 + 2]; } return s.map((v) => v / idx.length); }
function meanPts(pts) { const s = [0, 0, 0]; for (const p of pts) { s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; } return s.map((v) => v / pts.length); }
function collect(P, n, okIdx, okPt) { const out = []; for (let i = 0; i < n; i++) { if (!okIdx(i)) continue; const p = get(P, i); if (okPt(p)) out.push(p); } return out; }

/** Area-weighted vertex normals, shared across seam duplicates so seams stay invisible. */
function recomputeNormals(mesh, canon) {
  const P = mesh.position, I = mesh.index, N = new Float32Array(P.length);
  for (let t = 0; t < I.length; t += 3) {
    const a = canon[I[t]], b = canon[I[t + 1]], c = canon[I[t + 2]];
    const pa = get(P, a), pb = get(P, b), pc = get(P, c);
    const f = v3.cross(v3.sub(pb, pa), v3.sub(pc, pa));
    for (const v of [a, b, c]) { N[v * 3] += f[0]; N[v * 3 + 1] += f[1]; N[v * 3 + 2] += f[2]; }
  }
  for (let i = 0; i < P.length / 3; i++) {
    const k = canon[i];
    const v = v3.norm([N[k * 3], N[k * 3 + 1], N[k * 3 + 2]]);
    mesh.normal[i * 3] = v[0]; mesh.normal[i * 3 + 1] = v[1]; mesh.normal[i * 3 + 2] = v[2];
  }
}
