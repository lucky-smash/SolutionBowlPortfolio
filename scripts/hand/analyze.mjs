import { readHandDae } from './dae.mjs';
const m = readHandDae('assets-src/models/hand/hand.dae');
const P = m.position.map((v) => v / 0.01);
const n = P.length / 3;
// weld by position
const key = new Map(); const canon = new Int32Array(n);
for (let i = 0; i < n; i++) { const k = `${Math.round(P[i*3]*1e4)},${Math.round(P[i*3+1]*1e4)},${Math.round(P[i*3+2]*1e4)}`; if (!key.has(k)) key.set(k, i); canon[i] = key.get(k); }
const adj = Array.from({ length: n }, () => []);
for (let t = 0; t < m.index.length; t += 3) { const a = canon[m.index[t]], b = canon[m.index[t+1]], c = canon[m.index[t+2]]; adj[a].push(b, c); adj[b].push(a, c); adj[c].push(a, b); }
function comps(pred) {
  const seen = new Uint8Array(n); const out = [];
  for (let i = 0; i < n; i++) { if (canon[i] !== i || seen[i] || !pred(i)) continue; const st = [i]; seen[i] = 1; const c = [];
    while (st.length) { const v = st.pop(); c.push(v); for (const w of adj[v]) if (!seen[w] && pred(w)) { seen[w] = 1; st.push(w); } }
    out.push(c); }
  return out.filter((c) => c.length > 30).map((c) => { const mn=[9,9,9], mx=[-9,-9,-9], s=[0,0,0]; for (const v of c) for (let k=0;k<3;k++){const x=P[v*3+k]; mn[k]=Math.min(mn[k],x); mx[k]=Math.max(mx[k],x); s[k]+=x;} return { n: c.length, c: s.map(x=>+(x/c.length).toFixed(3)), min: mn.map(x=>+x.toFixed(3)), max: mx.map(x=>+x.toFixed(3)) }; });
}
for (const Y of [-0.1, -0.2, -0.3, -0.4, -0.5]) { const cs = comps((i) => P[i*3+1] < Y); console.log('y<', Y, cs.length, JSON.stringify(cs)); }
// thumb: likely separated by a different axis; check x/z slices
console.log('open border edges?');
const band = (lo, hi, extra = () => true) => { const s=[0,0,0]; let c=0; const mn=[9,9,9],mx=[-9,-9,-9]; for (let i=0;i<n;i++){ if (canon[i]!==i) continue; const y=P[i*3+1]; if (y>=lo && y<hi && extra(i)){c++; for(let k=0;k<3;k++){s[k]+=P[i*3+k]; mn[k]=Math.min(mn[k],P[i*3+k]); mx[k]=Math.max(mx[k],P[i*3+k]);}}} return {c, mean:s.map(v=>+(v/c).toFixed(3)), min:mn.map(v=>+v.toFixed(3)), max:mx.map(v=>+v.toFixed(3))}; };
for (const [lo,hi] of [[0.9,1.01],[0.6,0.7],[0.3,0.4],[0.1,0.2],[0,0.1],[-0.1,0],[-0.2,-0.1],[-0.3,-0.2]]) console.log(lo,hi, JSON.stringify(band(lo,hi, (i)=>P[i*3+2] < 0.38 || P[i*3] > 0.2)));
