// The Solution Bowl as a solid of revolution (measured from public/models/solution-bowl.glb: outer radius 1,
// foot at y = 0, lip at y = 1.141). Used to fit the hand to the bowl without any intersection.
const OUTER = [
  [0, 0], [0.3828, 0.001], [0.4275, 0.003], [0.4713, 0.009], [0.514, 0.021], [0.5555, 0.042], [0.5956, 0.073],
  [0.6343, 0.111], [0.6715, 0.154], [0.707, 0.199], [0.7409, 0.242], [0.7729, 0.285], [0.8031, 0.326],
  [0.8314, 0.367], [0.8576, 0.409], [0.8818, 0.452], [0.9039, 0.497], [0.9238, 0.542], [0.9414, 0.588],
  [0.9568, 0.635], [0.9699, 0.683], [0.9807, 0.731], [0.9891, 0.78], [0.9951, 0.829], [0.9987, 0.878],
  [1, 0.928], [0.9992, 0.977], [0.9966, 1.027], [0.9924, 1.075], [0.985, 1.113], [0.973, 1.135], [0.9582, 1.141],
];
const INNER = [
  [0.9439, 1.133], [0.9345, 1.109], [0.9331, 1.07], [0.9359, 1.023], [0.9384, 0.975], [0.9392, 0.928],
  [0.938, 0.881], [0.9346, 0.835], [0.9289, 0.789], [0.921, 0.743], [0.9109, 0.697], [0.8986, 0.653],
  [0.8842, 0.608], [0.8676, 0.565], [0.8489, 0.523], [0.8281, 0.481], [0.8053, 0.44], [0.7803, 0.4],
  [0.7532, 0.361], [0.7239, 0.321], [0.6925, 0.279], [0.6595, 0.237], [0.6254, 0.194], [0.5912, 0.153],
  [0.5577, 0.119], [0.5248, 0.093], [0.4919, 0.077], [0.4576, 0.067], [0.4203, 0.063], [0, 0.061],
];
const SECTION = [...OUTER, ...INNER];

/** Signed distance to the bowl (negative inside the ceramic); writes the outward normal into `n` if given. */
export function bowlDistance(x, y, z, n) {
  const rho = Math.hypot(x, z);
  let best = Infinity, bx = 0, by = 0, inside = false;
  for (let i = 0, j = SECTION.length - 1; i < SECTION.length; j = i++) {
    const [x0, y0] = SECTION[j];
    const [x1, y1] = SECTION[i];
    if (y0 > y !== y1 > y && rho < ((x1 - x0) * (y - y0)) / (y1 - y0) + x0) inside = !inside;
    if (x0 === 0 && x1 === 0) continue;
    const ex = x1 - x0, ey = y1 - y0;
    const t = Math.max(0, Math.min(1, ((rho - x0) * ex + (y - y0) * ey) / (ex * ex + ey * ey)));
    const cx = x0 + ex * t, cy = y0 + ey * t;
    const d = (rho - cx) ** 2 + (y - cy) ** 2;
    if (d < best) { best = d; bx = cx; by = cy; }
  }
  const dist = Math.sqrt(best);
  if (n) {
    let qx = rho - bx, qy = y - by;
    if (inside) { qx = -qx; qy = -qy; }
    const l = Math.hypot(qx, qy) || 1;
    qx /= l; qy /= l;
    const ux = rho > 1e-6 ? x / rho : 1, uz = rho > 1e-6 ? z / rho : 0;
    n[0] = ux * qx; n[1] = qy; n[2] = uz * qx;
  }
  return inside ? -dist : dist;
}

// The bowl's outer hull: the outer wall closed by a lid at the rim, so the cavity counts as solid. Fingers wrapping
// the outside must never end up in the cavity; the lid is not a surface they are pushed to (they leave sideways).
const HULL = [...OUTER, [0, OUTER[OUTER.length - 1][1]]];
export function hullDistance(x, y, z, n) {
  const rho = Math.hypot(x, z);
  let best = Infinity, bx = 0, by = 0, inside = false;
  for (let i = 0, j = HULL.length - 1; i < HULL.length; j = i++) {
    const [x0, y0] = HULL[j];
    const [x1, y1] = HULL[i];
    if (y0 > y !== y1 > y && rho < ((x1 - x0) * (y - y0)) / (y1 - y0) + x0) inside = !inside;
    if (i >= OUTER.length || i === 0) continue; // lid and axis are not contact surfaces
    const ex = x1 - x0, ey = y1 - y0;
    const t = Math.max(0, Math.min(1, ((rho - x0) * ex + (y - y0) * ey) / (ex * ex + ey * ey)));
    const cx = x0 + ex * t, cy = y0 + ey * t;
    const d = (rho - cx) ** 2 + (y - cy) ** 2;
    if (d < best) { best = d; bx = cx; by = cy; }
  }
  const dist = Math.sqrt(best);
  if (n) {
    let qx = rho - bx, qy = y - by;
    if (inside) { qx = -qx; qy = -qy; }
    const l = Math.hypot(qx, qy) || 1;
    qx /= l; qy /= l;
    const ux = rho > 1e-6 ? x / rho : 1, uz = rho > 1e-6 ? z / rho : 0;
    n[0] = ux * qx; n[1] = qy; n[2] = uz * qx;
  }
  return inside ? -dist : dist;
}
