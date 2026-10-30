// Builds public/models/hand.glb (+ textures) from assets-src/models/hand.
//   node scripts/build-hand.mjs            full build
//   node scripts/build-hand.mjs --raw      skip the grip fix (for comparing against the source pose)
// The source is a static sculpt (no rig), so the grip is corrected by deforming the mesh directly
// (scripts/hand/pose.mjs), then the mesh is simplified and meshopt-compressed.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { weld, simplify, quantize, meshopt, reorder } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import { readHandDae } from './hand/dae.mjs';
import { poseHand } from './hand/pose.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const SRC = path.join(ROOT, 'assets-src/models/hand');
const OUT = path.join(ROOT, 'assets-src/models/build');
const raw = process.argv.includes('--raw');
const TARGET_TRIS = 40000;

const mesh = readHandDae(path.join(SRC, 'hand.dae'));
// Undo the Collada unit scale: the sculpt is authored at ~2 units long, which is what the scene expects.
for (let i = 0; i < mesh.position.length; i++) mesh.position[i] /= 0.01;
if (!raw) {
  poseHand(mesh);
  console.log(JSON.stringify(mesh.report, null, 1));
}

const doc = new Document();
const buffer = doc.createBuffer();
const prim = doc
  .createPrimitive()
  .setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(mesh.position).setBuffer(buffer))
  .setAttribute('NORMAL', doc.createAccessor().setType('VEC3').setArray(mesh.normal).setBuffer(buffer))
  .setAttribute('TEXCOORD_0', doc.createAccessor().setType('VEC2').setArray(mesh.uv).setBuffer(buffer))
  .setIndices(doc.createAccessor().setType('SCALAR').setArray(mesh.index).setBuffer(buffer));
const material = doc.createMaterial('hand').setRoughnessFactor(1).setMetallicFactor(0);
prim.setMaterial(material);
doc.createScene().addChild(doc.createNode('Hand').setMesh(doc.createMesh('Hand').addPrimitive(prim)));

await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;
const ratio = Math.min(1, TARGET_TRIS / (mesh.index.length / 3));
await doc.transform(
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio, error: 0.0005, lockBorder: true }),
  reorder({ encoder: MeshoptEncoder }),
  quantize({ quantizePosition: 14, quantizeNormal: 10, quantizeTexcoord: 12 }),
  meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
);
doc.createExtension(KHRMeshQuantization).setRequired(true);
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.FILTER });

fs.mkdirSync(OUT, { recursive: true });
const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
await io.write(path.join(OUT, 'hand.glb'), doc);
const tris = doc.getRoot().listMeshes()[0].listPrimitives()[0].getIndices().getCount() / 3;
console.log(`hand.glb: ${tris} triangles, ${(fs.statSync(path.join(OUT, 'hand.glb')).size / 1024).toFixed(0)} KB`);

// Textures: 2K WebP. Occlusion, roughness and metalness are packed into one ORM map (R, G, B).
const tex = (n) => path.join(SRC, `Hands_Low_defaultMat1_${n}`);
const SIZE = 2048;
if (!process.argv.includes('--no-tex')) {
  await sharp(tex('albedo.jpeg')).resize(SIZE, SIZE).webp({ quality: 86 }).toFile(path.join(OUT, 'hand-albedo.webp'));
  await sharp(tex('normal.png')).resize(SIZE, SIZE).webp({ quality: 92 }).toFile(path.join(OUT, 'hand-normal.webp'));
  const ch = async (n) => sharp(tex(n)).resize(SIZE, SIZE).greyscale().raw().toBuffer();
  const [ao, rough, metal] = await Promise.all([ch('AO.jpeg'), ch('roughness.jpeg'), ch('metallic.jpeg')]);
  const orm = Buffer.alloc(SIZE * SIZE * 3);
  for (let i = 0; i < SIZE * SIZE; i++) {
    orm[i * 3] = ao[i];
    orm[i * 3 + 1] = rough[i];
    orm[i * 3 + 2] = metal[i];
  }
  await sharp(orm, { raw: { width: SIZE, height: SIZE, channels: 3 } }).webp({ quality: 88 }).toFile(path.join(OUT, 'hand-orm.webp'));
  for (const f of ['hand-albedo.webp', 'hand-normal.webp', 'hand-orm.webp'])
    console.log(`${f}: ${(fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0)} KB`);
}
