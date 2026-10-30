// Minimal reader for assets-src/models/hand/hand.dae (Assimp export: one mesh, triangles only,
// every attribute shares the vertex index). Returns positions in metres, Y up.
import fs from 'node:fs';

function floatArray(xml, id) {
  const m = xml.match(new RegExp(`<float_array id="${id}" count="(\\d+)">([^<]*)</float_array>`));
  if (!m) throw new Error(`float_array ${id} not found`);
  const out = new Float32Array(+m[1]);
  let i = 0;
  for (const tok of m[2].trim().split(/\s+/)) out[i++] = +tok;
  if (i !== out.length) throw new Error(`${id}: expected ${out.length} values, read ${i}`);
  return out;
}

export function readHandDae(file) {
  const xml = fs.readFileSync(file, 'utf8');
  const unit = +(xml.match(/<unit[^>]*meter="([\d.]+)"/)?.[1] ?? 1);
  const position = floatArray(xml, 'meshId0-positions-array');
  const normal = floatArray(xml, 'meshId0-normals-array');
  const uv = floatArray(xml, 'meshId0-tex0-array');
  const p = xml.match(/<polylist[^>]*>[\s\S]*?<p>([^<]*)<\/p>/);
  const toks = p[1].trim().split(/\s+/);
  const index = new Uint32Array(toks.length);
  for (let i = 0; i < toks.length; i++) index[i] = +toks[i];
  for (let i = 0; i < position.length; i++) position[i] *= unit;
  // Collada UVs have v up; glTF has v down.
  for (let i = 1; i < uv.length; i += 2) uv[i] = 1 - uv[i];
  return { position, normal, uv, index };
}
