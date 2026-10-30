> **Archived.** The site no longer uses 3D: the hero is the animated SVG walking world (`src/components/world/`).
> These sources and the hand-fitting pipeline are kept for reference; built files go to `assets-src/models/build/` and
> are not served.

# 3D model sources

| File | What | Built to |
| --- | --- | --- |
| `bowl.blend` | Ceramic bowl (Blender 3.6) | `public/models/solution-bowl.glb` (prebuilt, meshopt-compressed) |
| `hand/hand.dae` + `hand/*_{albedo,normal,roughness,AO,metallic}` | Sculpted hand with 4K PBR maps (static mesh, no rig) | `public/models/hand.glb`, `hand-albedo.webp`, `hand-normal.webp`, `hand-orm.webp` |

## The hand (`npm run models`)

`scripts/build-hand.mjs` rebuilds the hand from the Collada source with Node only (no Blender needed):

1. `scripts/hand/dae.mjs` reads the mesh.
2. `scripts/hand/pose.mjs` fixes the grip. The sculpt is an unrigged **left** hand in a hanging pose, so it is
   re-posed by deforming the geometry the way a skinned rig would:
   - the wrist, knuckle line, palm surface and the five digit chains are measured from the mesh itself;
   - the hand is placed palm-up under the bowl (bowl frame: outer radius 1, foot at the origin);
   - the palm is lowered until it just meets the foot;
   - each digit is rotated about MCP / PIP / DIP joints with smooth weights, the amount of flexion found by a
     binary search so the pads stop exactly on the glaze (`POSE.contact`, ≈ 0.4 mm);
   - a final pass resolves anything left inside the bowl's exact signed-distance field
     (`scripts/hand/bowl-sdf.mjs`, measured from `solution-bowl.glb`), spreading the push-out smoothly.
   The build prints a report: the fitted curl per digit and each digit's closest approach to the bowl.
3. The mesh is simplified to 40k triangles, quantised and meshopt-compressed; textures are resized to 2K WebP with
   occlusion / roughness / metalness packed into one ORM map.

The hand is exported already in the bowl's frame, so a runtime can add both models to one group. (The site's scene
currently shows the bowl alone; the hand assets are kept for when it returns.)
`node scripts/build-hand.mjs --raw` exports the unposed source for comparison.

## Other generated assets

- `node scripts/trace-logo.mjs` — traces `public/brand/solution-bowl-logo.png` into SVG paths
  (`src/components/brand/logo-paths.ts`), so the official mark can be drawn, printed on the bowl and embossed.
- `node scripts/build-emboss.mjs` — the embossed background tile `public/brand/emboss-tile.svg`.
