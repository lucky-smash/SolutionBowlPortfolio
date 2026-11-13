import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { CustomWiggle } from 'gsap/CustomWiggle';

/**
 * What the phone runs. An app plays its store screens (/img/apps/<id>/s1..sN.webp). A website (`site`) opens in a
 * browser instead: `phone` is a tall mobile capture scrolled on the folded cover screen, `wide` the tablet/desktop
 * page shown on the unfolded inner screen. Without `phone`, the site launches and goes straight to the big screen.
 */
export type PhoneApp = {
  id: string;
  name: string;
  color: string;
  shots: number;
  icon?: string;
  site?: { label: string; wide: string; phone?: string };
};
export type PhoneController = { setActive(on: boolean): void; dispose(): void };

const MODEL_URL = '/models/phone.glb';
const SCREEN_NODE = 'Back_Screen'; // the cover display, used while the phone is folded
const INNER_NODE = 'Front_Screen'; // the inner display, seen once it unfolds
const HIDDEN_NODES = ['Back_Logo']; // keep the mockup brand-neutral
const HIDDEN_MATERIALS = ['C_SW_Apple'];
const PHONE_H = 1.52; // world height the model is scaled to
const BASE_YAW = -0.36; // a three-quarter view shows the frame
const CW = 540; // screen canvas width; height follows the display's aspect
const FONT = 'system-ui, -apple-system, "SF Pro Text", "Segoe UI", Roboto, sans-serif';

/*
 * Motion curves, shaped after the real thing (made once, shared by every phone):
 * - hingeOpen: the hinge's friction holds it for a moment, it swings through, then eases into the flat stop.
 * - hingeShut: closes steadily, then the magnets snap it shut over the last few degrees.
 * - flick: a finger swipe, a short drag that is let go and glides to rest.
 * - launch: an app zooming open from its icon (critically damped, no bounce).
 * - settle: the damped wobble of a hand-held phone after the hinge clicks into place.
 */
let easesReady = false;
function registerEases() {
  if (easesReady) return;
  easesReady = true;
  gsap.registerPlugin(CustomEase, CustomWiggle);
  CustomEase.create('sb.hingeOpen', 'M0,0 C0.26,0 0.3,0.12 0.44,0.38 0.58,0.64 0.72,0.92 0.84,0.98 0.88,1 0.94,1 1,1');
  CustomEase.create('sb.hingeShut', 'M0,0 C0.2,0.02 0.42,0.42 0.62,0.66 0.76,0.82 0.86,0.88 1,1');
  CustomEase.create('sb.flick', 'M0,0 C0.24,0.04 0.26,0.62 0.42,0.84 0.56,1 0.76,1 1,1');
  CustomEase.create('sb.launch', 'M0,0 C0.16,0.5 0.22,0.9 0.42,0.97 0.6,1 0.8,1 1,1');
  CustomWiggle.create('sb.settle', { wiggles: 3, type: 'easeOut' });
}

/* The model is fetched and decoded once, then cloned per card. */
let modelPromise: Promise<GLTF> | null = null;
function loadModel() {
  if (!modelPromise) {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    modelPromise = loader.loadAsync(MODEL_URL);
    modelPromise.catch(() => (modelPromise = null));
  }
  return modelPromise;
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/**
 * Where a display sits in the current pose and how its texture is laid out: outward normal (from the triangles'
 * winding, skinning applied), "up" (towards v = 0, the top of a glTF image), physical aspect and UV range.
 */
function measureScreen(mesh: THREE.Mesh) {
  const g = mesh.geometry as THREE.BufferGeometry;
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  const m = mesh.matrixWorld;
  const pts: THREE.Vector3[] = [];
  const centroid = new THREE.Vector3();
  let umin = Infinity, umax = -Infinity, vmin = Infinity, vmax = -Infinity, um = 0, vm = 0;
  for (let i = 0; i < pos.count; i++) {
    const p = mesh.getVertexPosition(i, new THREE.Vector3()).applyMatrix4(m); // bone-deformed for skinned meshes
    pts.push(p);
    centroid.add(p);
    const u = uv.getX(i), v = uv.getY(i);
    umin = Math.min(umin, u); umax = Math.max(umax, u); vmin = Math.min(vmin, v); vmax = Math.max(vmax, v);
    um += u; vm += v;
  }
  centroid.divideScalar(pos.count);
  um /= pos.count;
  vm /= pos.count;
  // area-weighted face normal
  const normal = new THREE.Vector3();
  const idx = g.index;
  const tri = (a: number, b: number, c: number) => {
    const e1 = pts[b].clone().sub(pts[a]);
    const e2 = pts[c].clone().sub(pts[a]);
    normal.add(e1.cross(e2));
  };
  if (idx) for (let i = 0; i < idx.count; i += 3) tri(idx.getX(i), idx.getX(i + 1), idx.getX(i + 2));
  else for (let i = 0; i < pos.count; i += 3) tri(i, i + 1, i + 2);
  normal.normalize();
  const uDir = new THREE.Vector3();
  const vDir = new THREE.Vector3();
  for (let i = 0; i < pts.length; i++) {
    const d = pts[i].clone().sub(centroid);
    uDir.addScaledVector(d, uv.getX(i) - um);
    vDir.addScaledVector(d, uv.getY(i) - vm);
  }
  uDir.normalize();
  vDir.normalize();
  let w = 0, h = 0;
  for (const q of pts) {
    const d = q.clone().sub(centroid);
    w = Math.max(w, Math.abs(d.dot(uDir)));
    h = Math.max(h, Math.abs(d.dot(vDir)));
  }
  return { normal, uDir, vDir, aspect: w / h, umin, umax, vmin, vmax };
}

type ScreenInfo = ReturnType<typeof measureScreen>;

/** Rotation that turns a display to face the camera (+z) with its top up (+y); also whether its UVs run mirrored. */
function facing(ms: ScreenInfo) {
  const z = ms.normal.clone();
  const y = ms.vDir.clone().negate();
  y.addScaledVector(z, -y.dot(z)).normalize();
  const x = new THREE.Vector3().crossVectors(y, z).normalize();
  const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, z)).invert();
  return { q, mirrored: ms.uDir.dot(x) < 0 };
}

/** A canvas texture laid onto a display's UV range (glTF convention, un-mirrored). */
function screenTexture(canvas: HTMLCanvasElement, ms: ScreenInfo, mirrored: boolean, aniso: number) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = false;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.anisotropy = aniso;
  const du = ms.umax - ms.umin;
  const dv = ms.vmax - ms.vmin;
  tex.repeat.set((mirrored ? -1 : 1) / du, 1 / dv);
  tex.offset.set(mirrored ? ms.umax / du : -ms.umin / du, -ms.vmin / dv);
  return tex;
}

/** Swaps a display's material for a clone that shows `tex` as light, keeping the model's glass coat. */
function lightUp(mesh: THREE.Mesh, tex: THREE.Texture) {
  const mat = (mesh.material as THREE.MeshPhysicalMaterial).clone();
  mat.map = null;
  mat.color.set(0x000000);
  mat.emissive.set(0xffffff);
  mat.emissiveMap = tex;
  mat.emissiveIntensity = 1;
  mat.toneMapped = false;
  mesh.material = mat;
  return mat;
}

/**
 * Mounts the foldable phone model into `host` and loops a short, smooth demo: folded, the cover screen shows the
 * home screen in edit mode (icons jiggling), a tap opens the app and swipes through it; then the phone unfolds on
 * its own hinge animation and turns to show the inner screen, where the app runs in a two-pane view, before it
 * folds shut again. GSAP drives every timeline; both displays are canvas textures. Starts paused: setActive(true).
 */
export async function mountPhone(host: HTMLElement, app: PhoneApp, opts: { reduced: boolean }): Promise<PhoneController> {
  const gltf = await loadModel();
  const { reduced } = opts;
  registerEases();
  const small = window.matchMedia('(max-width: 767px)').matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping; // keeps the app screens' colours true
  renderer.toneMappingExposure = 1;
  const el = renderer.domElement;
  Object.assign(el.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
  host.appendChild(el);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.9;
  const camera = new THREE.PerspectiveCamera(24, 1, 0.01, 60);
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(-2.5, 3, 4);
  const rim = new THREE.DirectionalLight(0xffffff, 1);
  rim.position.set(3, 1.5, -2.5);
  scene.add(key, rim);

  const owned: { dispose(): void }[] = [];
  const keep = <T extends { dispose(): void }>(d: T) => (owned.push(d), d);
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  /* ---------- model: clone, measure both poses, orient, scale ---------- */
  const model = cloneSkinned(gltf.scene);
  model.traverse((o) => {
    const mat = (o as THREE.Mesh).material as THREE.Material | undefined;
    if (HIDDEN_NODES.includes(o.name) || (mat && HIDDEN_MATERIALS.includes(mat.name))) o.visible = false;
  });
  const clip = gltf.animations[0];
  const mixer = new THREE.AnimationMixer(model);
  const action = clip ? mixer.clipAction(clip) : null;
  action?.play();
  if (action) action.paused = true;
  const duration = clip?.duration ?? 0;
  /** fold = 0: shut (end of the open–close clip), 1: flat open (its start). */
  const pose = (fold: number) => {
    if (!action) return;
    action.time = duration * (1 - fold);
    mixer.update(0);
  };

  const outerMesh = model.getObjectByName(SCREEN_NODE) as THREE.Mesh;
  const innerMesh = model.getObjectByName(INNER_NODE) as THREE.Mesh | undefined;
  const canUnfold = !!(action && innerMesh);

  const orient = new THREE.Group();
  orient.add(model);
  const frameOf = (q: THREE.Quaternion) => {
    orient.quaternion.copy(q);
    orient.position.set(0, 0, 0);
    orient.updateMatrixWorld(true);
    model.traverse((o) => {
      if ((o as THREE.SkinnedMesh).isSkinnedMesh) (o as THREE.SkinnedMesh).computeBoundingBox();
    });
    const box = new THREE.Box3().setFromObject(orient, true);
    return { center: box.getCenter(new THREE.Vector3()), size: box.getSize(new THREE.Vector3()) };
  };

  pose(0);
  model.updateMatrixWorld(true);
  const outerInfo = measureScreen(outerMesh);
  const shut = facing(outerInfo);
  const shutFrame = frameOf(shut.q);

  let innerInfo: ScreenInfo | null = null;
  let open = shut;
  let openFrame = shutFrame;
  if (canUnfold) {
    pose(1);
    orient.quaternion.identity();
    orient.updateMatrixWorld(true);
    innerInfo = measureScreen(innerMesh!);
    open = facing(innerInfo);
    openFrame = frameOf(open.q);
    pose(0);
  }

  const scale = PHONE_H / shutFrame.size.y;
  const fit = new THREE.Group();
  fit.scale.setScalar(scale);
  fit.add(orient);
  const phoneW = shutFrame.size.x * scale;
  const phoneD = shutFrame.size.z * scale;
  const openW = openFrame.size.x * scale;
  const openH = openFrame.size.y * scale;

  /** Places the model for a fold amount: hinge pose, a turn from the cover screen to the inner one, re-centred. */
  const tmpC = new THREE.Vector3();
  let lastFold = -1;
  let lastTurn = -1;
  /** `f` drives the hinge; `turn` the hand turning the phone to face you, which trails the hinge a little. */
  const applyFold = (f: number, turn = f) => {
    if (f === lastFold && turn === lastTurn) return;
    if (f !== lastFold) pose(f);
    lastFold = f;
    lastTurn = turn;
    orient.quaternion.slerpQuaternions(shut.q, open.q, turn);
    tmpC.lerpVectors(shutFrame.center, openFrame.center, turn);
    orient.position.copy(tmpC).multiplyScalar(-1);
  };
  applyFold(0);

  const rig = new THREE.Group(); // pointer parallax
  const phone = new THREE.Group(); // entrance + idle motion
  phone.add(fit);
  rig.add(phone);
  scene.add(rig);

  /* ---------- the displays: canvases on the model's own screen materials ---------- */
  const CH = Math.round(CW / outerInfo.aspect);
  const canvas = document.createElement('canvas');
  canvas.width = CW;
  canvas.height = CH;
  const ctx = canvas.getContext('2d')!;
  const tex = keep(screenTexture(canvas, outerInfo, shut.mirrored, aniso));
  keep(lightUp(outerMesh, tex));

  const IW = 960;
  const IH = innerInfo ? Math.round(IW / innerInfo.aspect) : 1;
  const icanvas = document.createElement('canvas');
  icanvas.width = IW;
  icanvas.height = IH;
  const ictx = icanvas.getContext('2d')!;
  let itex: THREE.CanvasTexture | null = null;
  if (innerInfo && innerMesh) {
    itex = keep(screenTexture(icanvas, innerInfo, open.mirrored, aniso));
    keep(lightUp(innerMesh, itex));
  }

  // soft contact shadow
  const sc = document.createElement('canvas');
  sc.width = sc.height = 128;
  const sctx = sc.getContext('2d')!;
  const sg = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  sg.addColorStop(0, 'rgba(0,0,0,0.5)');
  sg.addColorStop(1, 'rgba(0,0,0,0)');
  sctx.fillStyle = sg;
  sctx.fillRect(0, 0, 128, 128);
  const shadowMat = keep(new THREE.MeshBasicMaterial({ map: keep(new THREE.CanvasTexture(sc)), transparent: true, depthWrite: false }));
  const shadow = new THREE.Mesh(keep(new THREE.PlaneGeometry(phoneW * 1.7, 0.26)), shadowMat);
  shadow.position.set(0, -PHONE_H / 2 - 0.1, -0.25);
  scene.add(shadow);

  /* ---------- screen content ---------- */
  const load = (src: string) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    return img;
  };
  const icon = load(app.icon ?? `/img/apps/${app.id}/icon.webp`);
  const shots = Array.from({ length: app.shots }, (_, i) => load(`/img/apps/${app.id}/s${i + 1}.webp`));
  const site = app.site;
  const sitePhone = site?.phone ? load(site.phone) : null;
  const siteWide = site ? load(site.wide) : null;
  const SITE_STEPS = 2; // scroll stops on each screen
  const ready = (img: HTMLImageElement) => img.complete && img.naturalWidth > 0;

  const probe = document.createElement('canvas');
  probe.width = probe.height = 1;
  const pctx = probe.getContext('2d', { willReadFrequently: true })!;
  const edgeCache = new Map<HTMLImageElement, { top: string; bottom: string }>();
  const avg = (img: HTMLImageElement, y: number, h: number) => {
    pctx.clearRect(0, 0, 1, 1);
    pctx.drawImage(img, 0, y, img.naturalWidth, h, 0, 0, 1, 1);
    const [r, g, b] = pctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r},${g},${b})`;
  };
  const composed = new Map<HTMLImageElement, HTMLCanvasElement>();
  const edges = (img: HTMLImageElement) => {
    let e = edgeCache.get(img);
    if (!e) {
      const strip = Math.max(2, Math.round(img.naturalHeight * 0.01));
      e = { top: avg(img, 0, strip), bottom: avg(img, img.naturalHeight - strip, strip) };
      edgeCache.set(img, e);
    }
    return e;
  };

  // Tweened by GSAP, read by draw().
  const st = { open: reduced ? 1 : 0, slide: reduced ? 1 : 0, press: 1, touch: 0, jiggle: reduced ? 0 : 1, fold: 0, turn: 0, zoom: 0, wob: 0, inner: 0 };

  const GHOSTS: { label: string; from: string; to: string; glyph: number }[] = [
    { label: 'Calendar', from: '#ffffff', to: '#e9e9ee', glyph: 5 },
    { label: 'Photos', from: '#ffd60a', to: '#ff9f0a', glyph: 0 },
    { label: 'Camera', from: '#8e8e93', to: '#3a3a3c', glyph: 1 },
    { label: 'Mail', from: '#5ac8fa', to: '#0a84ff', glyph: 2 },
    { label: 'Clock', from: '#2c2c2e', to: '#000000', glyph: 1 },
    { label: '', from: '', to: '', glyph: -1 }, // the real app
    { label: 'Weather', from: '#64d2ff', to: '#0a84ff', glyph: 0 },
    { label: 'Notes', from: '#ffe680', to: '#ffd60a', glyph: 3 },
    { label: 'Maps', from: '#a8e6a1', to: '#30d158', glyph: 4 },
    { label: 'Music', from: '#ff6482', to: '#ff2d55', glyph: 0 },
    { label: 'Wallet', from: '#3a3a3c', to: '#1c1c1e', glyph: 3 },
    { label: 'Settings', from: '#aeaeb2', to: '#636366', glyph: 1 },
    { label: 'Health', from: '#ffffff', to: '#f2f2f7', glyph: 0 },
    { label: 'Files', from: '#64d2ff', to: '#0a84ff', glyph: 3 },
    { label: 'Podcasts', from: '#d68cff', to: '#9b4dff', glyph: 1 },
    { label: 'Stocks', from: '#2c2c2e', to: '#000000', glyph: 4 },
  ];
  const DOCK = [
    { from: '#65e07a', to: '#30c04f', glyph: 2 },
    { from: '#5ac8fa', to: '#0a84ff', glyph: 1 },
    { from: '#65e07a', to: '#30c04f', glyph: 0 },
    { from: '#ff6482', to: '#ff2d55', glyph: 0 },
  ];
  // Home-screen layout scales with the display's height (a folded phone's cover screen is short).
  const COLS = 4;
  const PADX = 40;
  const CELL = (CW - PADX * 2) / COLS;
  const ROW0 = 96;
  const ICON = Math.round(Math.min(86, ((CH - ROW0 - 196) / 4) * 0.66, CELL * 0.72));
  const K = ICON / 86; // type and spacing follow the icon size
  const DOCK_H = ICON + 36;
  const DOCK_Y = CH - DOCK_H - 20;
  const ROWH = (DOCK_Y - 34 - ROW0) / 4;
  const slot = (i: number) => ({ x: PADX + (i % COLS) * CELL + (CELL - ICON) / 2, y: ROW0 + Math.floor(i / COLS) * ROWH, w: ICON, h: ICON });
  const APP_INDEX = 5;
  const appRect = slot(APP_INDEX);
  const deep = `#${new THREE.Color(app.color).lerp(new THREE.Color('#0b0d18'), 0.62).getHexString()}`;

  function glyph(kind: number, s: number, dark: boolean) {
    ctx.fillStyle = dark ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.95)';
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = s * 0.07;
    const c = s / 2;
    ctx.beginPath();
    if (kind === 0) ctx.arc(c, c, s * 0.2, 0, Math.PI * 2), ctx.fill();
    else if (kind === 1) ctx.arc(c, c, s * 0.24, 0, Math.PI * 2), ctx.stroke();
    else if (kind === 2) rr(ctx, s * 0.24, s * 0.32, s * 0.52, s * 0.36, s * 0.06), ctx.fill();
    else if (kind === 3) for (let i = 0; i < 3; i++) rr(ctx, s * 0.26, s * (0.3 + i * 0.15), s * 0.48, s * 0.07, s * 0.03), ctx.fill();
    else if (kind === 4) ctx.moveTo(s * 0.28, s * 0.68), ctx.lineTo(s * 0.45, s * 0.42), ctx.lineTo(s * 0.58, s * 0.55), ctx.lineTo(s * 0.74, s * 0.3), ctx.stroke();
    else if (kind === 5) {
      ctx.fillStyle = '#ff3b30';
      ctx.font = `600 ${s * 0.16}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText('WED', c, s * 0.3);
      ctx.fillStyle = '#111';
      ctx.font = `300 ${s * 0.46}px ${FONT}`;
      ctx.fillText('5', c, s * 0.74);
      ctx.textAlign = 'left';
    }
  }

  function statusBar(color: string) {
    ctx.fillStyle = color;
    ctx.font = `600 22px ${FONT}`;
    ctx.textBaseline = 'middle';
    ctx.fillText('9:41', 48, 42);
    for (let i = 0; i < 4; i++) rr(ctx, CW - 150 + i * 9, 50 - (i + 1) * 4.5, 6, (i + 1) * 4.5, 1.5), ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.5;
    rr(ctx, CW - 96, 33, 40, 19, 6);
    ctx.stroke();
    ctx.globalAlpha = 1;
    rr(ctx, CW - 93, 36, 28, 13, 3.5);
    ctx.fill();
    ctx.textBaseline = 'alphabetic';
  }

  function tile(r: { x: number; y: number; w: number; h: number }, phase: number, t: number, paint: () => void, scale = 1) {
    const a = st.jiggle * Math.sin(t * 17 + phase) * 0.035;
    const dy = st.jiggle * Math.sin(t * 13 + phase * 1.7) * 0.9;
    ctx.save();
    ctx.translate(r.x + r.w / 2, r.y + r.h / 2 + dy);
    ctx.rotate(a);
    ctx.scale(scale, scale);
    ctx.translate(-r.w / 2, -r.h / 2);
    ctx.save();
    rr(ctx, 0, 0, r.w, r.h, r.w * 0.225);
    ctx.clip();
    paint();
    ctx.restore();
    ctx.restore();
    return dy;
  }

  function label(text: string, r: { x: number; y: number; w: number }, dy: number) {
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = `500 ${Math.max(11, Math.round(17 * K))}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 4;
    ctx.fillText(text, r.x + r.w / 2, r.y + ICON + 22 * K + dy);
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
  }

  function home(t: number) {
    const g = ctx.createLinearGradient(0, 0, CW * 0.4, CH);
    g.addColorStop(0, app.color);
    g.addColorStop(0.55, deep);
    g.addColorStop(1, '#0a0b14');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, CW, CH);
    const glow = ctx.createRadialGradient(CW * 0.15, CH * 0.85, 0, CW * 0.15, CH * 0.85, CW);
    glow.addColorStop(0, `${app.color}88`);
    glow.addColorStop(1, `${app.color}00`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, CW, CH);
    statusBar('#fff');

    for (let i = 0; i < GHOSTS.length; i++) {
      const r = slot(i);
      if (i === APP_INDEX) {
        const dy = tile(
          r,
          1.3,
          t,
          () => {
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, r.w, r.h);
            if (ready(icon)) ctx.drawImage(icon, 0, 0, r.w, r.h);
          },
          st.press,
        );
        label(app.name, r, dy);
        continue;
      }
      const gh = GHOSTS[i];
      const dy = tile(r, i * 2.1, t, () => {
        const ig = ctx.createLinearGradient(0, 0, 0, r.h);
        ig.addColorStop(0, gh.from);
        ig.addColorStop(1, gh.to);
        ctx.fillStyle = ig;
        ctx.fillRect(0, 0, r.w, r.h);
        glyph(gh.glyph, r.w, gh.from === '#ffffff');
      });
      label(gh.label, r, dy);
    }

    for (let d = 0; d < 3; d++) {
      ctx.fillStyle = d === 0 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.arc(CW / 2 - 16 + d * 16, DOCK_Y - 16, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    rr(ctx, 18, DOCK_Y, CW - 36, DOCK_H, DOCK_H * 0.32);
    ctx.fill();
    DOCK.forEach((dk, i) => {
      const r = { x: PADX + i * CELL + (CELL - ICON) / 2, y: DOCK_Y + (DOCK_H - ICON) / 2, w: ICON, h: ICON };
      tile(r, i * 3.3 + 9, t, () => {
        const ig = ctx.createLinearGradient(0, 0, 0, r.h);
        ig.addColorStop(0, dk.from);
        ig.addColorStop(1, dk.to);
        ctx.fillStyle = ig;
        ctx.fillRect(0, 0, r.w, r.h);
        glyph(dk.glyph, r.w, false);
      });
    });

    if (st.touch > 0.01) {
      ctx.fillStyle = `rgba(255,255,255,${0.35 * st.touch})`;
      ctx.beginPath();
      ctx.arc(appRect.x + ICON / 2, appRect.y + ICON / 2, ICON * (0.4 + 0.12 * (1 - st.touch)), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /** Frame 0 is the launch screen (brand colour + icon); frames 1..n are the app's screens. */
  function frame(i: number, x: number) {
    ctx.save();
    ctx.translate(x, 0);
    if (i <= 0) {
      ctx.fillStyle = app.color;
      ctx.fillRect(0, 0, CW, CH);
      const s = 150;
      ctx.save();
      rr(ctx, (CW - s) / 2, (CH - s) / 2 - 30, s, s, s * 0.225);
      ctx.clip();
      ctx.fillStyle = '#fff';
      ctx.fillRect((CW - s) / 2, (CH - s) / 2 - 30, s, s);
      if (ready(icon)) ctx.drawImage(icon, (CW - s) / 2, (CH - s) / 2 - 30, s, s);
      ctx.restore();
    } else {
      // Show the whole screen. If it is taller than the display, fit its height and fill the sides with a
      // blurred, dimmed copy; if wider, fit its width and extend its top and bottom edge colours.
      // Composed once per screen and cached: blurring every frame would be costly.
      const img = shots[i - 1];
      const cached = img && composed.get(img);
      if (cached) {
        ctx.drawImage(cached, 0, 0);
        ctx.restore();
        return;
      }
      ctx.fillStyle = app.color;
      ctx.fillRect(0, 0, CW, CH);
      if (img && ready(img)) {
        const out = document.createElement('canvas');
        out.width = CW;
        out.height = CH;
        const o = out.getContext('2d')!;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        if (ih / iw > CH / CW) {
          // Taller than the display: fill nearly its full width (trimming a little off the bottom, where store
          // shots carry least), then carry the image's own left and right pixel columns out to the edges, so its
          // background simply continues. No blurred copy, no dimming, no visible seam.
          const s = Math.max(CH / ih, (CW * 0.86) / iw);
          const dw = iw * s;
          const dh = ih * s;
          const dx = (CW - dw) / 2;
          const dy = -Math.max(0, dh - CH) * 0.45;
          if (dx > 0) {
            o.drawImage(img, 0, 0, 2, ih, 0, dy, Math.ceil(dx) + 1, dh);
            o.drawImage(img, iw - 2, 0, 2, ih, Math.floor(dx + dw) - 1, dy, Math.ceil(dx) + 1, dh);
          }
          o.drawImage(img, dx, dy, dw, dh);
        } else {
          const e = edges(img);
          const dh = (CW * ih) / iw;
          o.fillStyle = e.top;
          o.fillRect(0, 0, CW, CH / 2 + 1);
          o.fillStyle = e.bottom;
          o.fillRect(0, CH / 2, CW, CH / 2);
          o.drawImage(img, 0, (CH - dh) / 2, CW, dh);
        }
        composed.set(img, out);
        ctx.drawImage(out, 0, 0);
      }
    }
    ctx.restore();
  }

  /**
   * A page in a browser: an address bar with the site's domain under the status bar, then the page, filling the
   * width and scrolled by `scroll` (0 top .. 1 as far as it goes). Pages shorter than the view fill its height.
   */
  function browserView(c: CanvasRenderingContext2D, w: number, h: number, top: number, img: HTMLImageElement | null, scroll: number) {
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, w, h);
    const bh = Math.round(w * 0.1);
    const pill = { x: w * 0.06, y: top + bh * 0.16, w: w * 0.88, h: bh * 0.68 };
    c.fillStyle = '#eceef2';
    rr(c, pill.x, pill.y, pill.w, pill.h, pill.h / 2);
    c.fill();
    const fs = Math.round(pill.h * 0.44);
    c.font = `500 ${fs}px ${FONT}`;
    c.textBaseline = 'middle';
    c.textAlign = 'center';
    c.fillStyle = '#1c1c1e';
    const text = site?.label ?? app.name;
    const tw = c.measureText(text).width;
    c.fillText(text, w / 2 + fs * 0.45, pill.y + pill.h / 2);
    // padlock
    const lx = w / 2 - tw / 2 - fs * 0.5;
    const ly = pill.y + pill.h / 2;
    c.fillStyle = '#6b6f78';
    rr(c, lx - fs * 0.3, ly - fs * 0.05, fs * 0.6, fs * 0.46, fs * 0.08);
    c.fill();
    c.strokeStyle = '#6b6f78';
    c.lineWidth = Math.max(1.5, fs * 0.09);
    c.beginPath();
    c.arc(lx, ly - fs * 0.07, fs * 0.19, Math.PI, 0);
    c.stroke();
    c.textAlign = 'left';
    c.textBaseline = 'alphabetic';
    const y0 = top + bh;
    const vh = h - y0;
    if (img && ready(img)) {
      const sc = Math.max(w / img.naturalWidth, vh / img.naturalHeight);
      const dw = img.naturalWidth * sc;
      const dh = img.naturalHeight * sc;
      c.save();
      c.beginPath();
      c.rect(0, y0, w, vh);
      c.clip();
      c.drawImage(img, (w - dw) / 2, y0 - Math.max(0, dh - vh) * Math.min(1, Math.max(0, scroll)), dw, dh);
      c.restore();
    }
    c.fillStyle = 'rgba(0,0,0,0.08)';
    c.fillRect(0, y0, w, 1.5);
  }

  function inApp() {
    if (site) {
      if (sitePhone) {
        browserView(ctx, CW, CH, 64, sitePhone, st.slide / SITE_STEPS);
        statusBar('#111');
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        rr(ctx, CW / 2 - 70, CH - 18, 140, 6, 3);
        ctx.fill();
      } else {
        frame(0, 0); // the launch screen; the site itself opens on the big screen
        statusBar('#fff');
      }
      return;
    }
    const s = st.slide;
    const i = Math.floor(s);
    const f = s - i;
    frame(i, -f * CW);
    if (f > 0.0001) frame(i + 1, (1 - f) * CW);
    // a soft fade behind the status bar (not a hard band) so its white icons read on light screens
    const shade = ctx.createLinearGradient(0, 0, 0, 96);
    shade.addColorStop(0, 'rgba(0,0,0,0.22)');
    shade.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, CW, 96);
    statusBar('#fff');
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    rr(ctx, CW / 2 - 70, CH - 18, 140, 6, 3);
    ctx.fill();
  }

  function draw(t: number) {
    ctx.clearRect(0, 0, CW, CH);
    const e = st.open;
    if (e < 1) {
      ctx.save();
      const k = 1 - 0.06 * e;
      ctx.translate((CW * (1 - k)) / 2, (CH * (1 - k)) / 2);
      ctx.scale(k, k);
      home(t);
      ctx.restore();
      if (e > 0) {
        ctx.fillStyle = `rgba(0,0,0,${0.45 * e})`;
        ctx.fillRect(0, 0, CW, CH);
      }
    }
    if (e > 0) {
      const x = appRect.x * (1 - e);
      const y = appRect.y * (1 - e);
      const w = appRect.w + (CW - appRect.w) * e;
      const h = appRect.h + (CH - appRect.h) * e;
      ctx.save();
      rr(ctx, x, y, w, h, 20 * (1 - e) + 4);
      ctx.clip();
      ctx.translate(x, y);
      ctx.scale(w / CW, h / CH);
      inApp();
      ctx.restore();
    }
    tex.needsUpdate = true;
  }

  /** Inner display: the app in a multi-pane view, as on an unfolded phone. Drawn only while it can be seen. */
  function drawInner() {
    if (!itex) return;
    const c = ictx;
    if (site) {
      const sb = Math.round(IH * 0.07);
      browserView(c, IW, IH, sb, siteWide ?? sitePhone, st.inner / SITE_STEPS);
      c.fillStyle = '#111';
      c.textBaseline = 'middle';
      c.font = `600 ${Math.round(sb * 0.42)}px ${FONT}`;
      c.fillText('9:41', IW * 0.035, sb * 0.6);
      for (let i = 0; i < 4; i++) rr(c, IW * 0.9 + i * sb * 0.17, sb * 0.76 - (i + 1) * sb * 0.08, sb * 0.11, (i + 1) * sb * 0.08, 2), c.fill();
      c.textBaseline = 'alphabetic';
      c.fillStyle = 'rgba(0,0,0,0.7)';
      rr(c, IW / 2 - IW * 0.08, IH - 14, IW * 0.16, 5, 2.5);
      c.fill();
      itex.needsUpdate = true;
      return;
    }
    const g = c.createLinearGradient(0, 0, IW, IH);
    g.addColorStop(0, app.color);
    g.addColorStop(0.6, deep);
    g.addColorStop(1, '#0a0b14');
    c.fillStyle = g;
    c.fillRect(0, 0, IW, IH);

    // status bar with the app's name in the middle
    const sb = Math.round(IH * 0.07);
    c.fillStyle = '#fff';
    c.textBaseline = 'middle';
    c.font = `600 ${Math.round(sb * 0.42)}px ${FONT}`;
    c.fillText('9:41', IW * 0.035, sb * 0.62);
    c.textAlign = 'center';
    c.font = `600 ${Math.round(sb * 0.4)}px ${FONT}`;
    c.fillText(app.name, IW / 2, sb * 0.62);
    c.textAlign = 'left';
    for (let i = 0; i < 4; i++) rr(c, IW * 0.9 + i * sb * 0.17, sb * 0.78 - (i + 1) * sb * 0.08, sb * 0.11, (i + 1) * sb * 0.08, 2), c.fill();
    c.textBaseline = 'alphabetic';

    // panes: as many 9:16 screens as fit, sliding along together
    const pad = Math.round(IW * 0.035);
    const top = sb + pad * 0.3;
    const paneH = IH - top - pad * 1.2;
    const gap = pad * 0.6;
    const paneW = paneH * 0.5625;
    const fitCount = Math.max(1, Math.min(3, shots.length, Math.floor((IW - pad * 2 + gap) / (paneW + gap))));
    const x0 = (IW - (fitCount * paneW + (fitCount - 1) * gap)) / 2;
    const n = shots.length;
    const base = Math.floor(st.inner);
    const f = st.inner - base;
    c.save();
    c.beginPath();
    c.rect(pad * 0.5, top - 4, IW - pad, paneH + 8);
    c.clip();
    for (let k = -1; k <= fitCount; k++) {
      const x = x0 + (k - f) * (paneW + gap);
      if (x > IW || x + paneW < 0) continue;
      const img = shots[(((base + k) % n) + n) % n];
      c.save();
      c.shadowColor = 'rgba(0,0,0,0.35)';
      c.shadowBlur = 18;
      c.fillStyle = '#fff';
      rr(c, x, top, paneW, paneH, paneW * 0.06);
      c.fill();
      c.restore();
      c.save();
      rr(c, x, top, paneW, paneH, paneW * 0.06);
      c.clip();
      if (img && ready(img)) {
        const s = Math.max(paneW / img.naturalWidth, paneH / img.naturalHeight);
        const dw = img.naturalWidth * s;
        c.drawImage(img, x + (paneW - dw) / 2, top, dw, img.naturalHeight * s);
      }
      c.restore();
    }
    c.restore();
    c.fillStyle = 'rgba(255,255,255,0.8)';
    rr(c, IW / 2 - IW * 0.08, IH - pad * 0.55, IW * 0.16, 5, 2.5);
    c.fill();
    itex.needsUpdate = true;
  }

  /* ---------- motion ---------- */
  const anims: gsap.core.Animation[] = [];
  phone.rotation.y = BASE_YAW;
  if (!reduced) {
    phone.position.y = -0.18;
    phone.rotation.y = BASE_YAW - 0.5;
    phone.scale.setScalar(0.94);
    anims.push(
      gsap
        .timeline({ paused: true })
        .to(phone.position, { y: 0, duration: 1.6, ease: 'power3.out' }, 0)
        .to(phone.rotation, { y: BASE_YAW, duration: 1.8, ease: 'power3.out' }, 0)
        .to(phone.scale, { x: 1, y: 1, z: 1, duration: 1.6, ease: 'power3.out' }, 0),
    );
    anims.push(gsap.to(phone.position, { y: 0.022, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6, paused: true }));
    anims.push(gsap.fromTo(phone.rotation, { y: BASE_YAW }, { y: BASE_YAW + 0.22, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.8, immediateRender: false, paused: true }));
    anims.push(gsap.to(phone.rotation, { x: -0.05, duration: 4.6, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true }));

    const loop = gsap.timeline({ repeat: -1, delay: 0.8, paused: true });
    loop
      .set(st, { open: 0, slide: 0, press: 1, touch: 0, jiggle: 1, fold: 0, turn: 0, zoom: 0, wob: 0, inner: 0 })
      .to(st, { jiggle: 0, duration: 0.35, ease: 'power1.out' }, 2.4)
      .to(st, { touch: 1, duration: 0.12, ease: 'power2.out' }, 2.55)
      .to(st, { press: 0.88, duration: 0.12, ease: 'power2.out' }, 2.55)
      .to(st, { press: 1, duration: 0.45, ease: 'back.out(2.6)' }, 2.68)
      .to(st, { touch: 0, duration: 0.35, ease: 'power1.out' }, 2.72)
      .to(st, { open: 1, duration: 0.58, ease: 'sb.launch' }, 2.7);
    let at = 4.1;
    const coverShots = site ? (sitePhone || !canUnfold ? SITE_STEPS : 0) : canUnfold ? Math.min(2, app.shots) : app.shots;
    for (let i = 1; i <= coverShots; i++) {
      loop.to(st, { slide: i, duration: 0.7, ease: 'sb.flick' }, at);
      at += 2.3;
    }
    if (canUnfold) {
      // Unfold on the model's own hinge: the camera makes room first, the hinge swings open, the hand turns the
      // phone to face you a beat behind it, and the phone gives a small damped wobble as the hinge locks flat.
      const u = at - 0.3;
      loop
        .to(st, { zoom: 1, duration: 2.2, ease: 'power2.inOut' }, u - 0.15)
        .to(st, { fold: 1, duration: 2, ease: 'sb.hingeOpen' }, u)
        .to(st, { turn: 1, duration: 2.15, ease: 'power3.inOut' }, u + 0.12)
        .fromTo(st, { wob: 0 }, { wob: 1, duration: 1.2, ease: 'sb.settle', immediateRender: false }, u + 1.82)
        .set(st, { open: 0, slide: 0, jiggle: 1 }, u + 1.3); // the cover screen resets while it faces away
      at += 2.8;
      const steps = site ? SITE_STEPS : Math.min(3, Math.max(1, app.shots - 1));
      for (let i = 1; i <= steps; i++) {
        loop.to(st, { inner: i, duration: 0.8, ease: 'sb.flick' }, at);
        at += 2.3;
      }
      // Fold shut: it turns back as it closes, the magnets snap the last few degrees, and it settles in the hand.
      const f = at - 0.4;
      loop
        .to(st, { turn: 0, duration: 1.95, ease: 'power3.inOut' }, f)
        .to(st, { fold: 0, duration: 1.8, ease: 'sb.hingeShut' }, f + 0.1)
        .to(st, { zoom: 0, duration: 2.1, ease: 'power2.inOut' }, f + 0.15)
        .fromTo(st, { wob: 0 }, { wob: -0.6, duration: 0.9, ease: 'sb.settle', immediateRender: false }, f + 1.88)
        .set(st, { inner: 0 }, f + 2.1)
        .to({}, { duration: 1.4 }, f + 2.1);
    } else {
      loop
        .to(st, { open: 0, duration: 0.6, ease: 'power3.inOut' }, at)
        .to(st, { jiggle: 1, duration: 0.4, ease: 'power1.in' }, at + 0.55)
        .to({}, { duration: 0.6 });
    }
    anims.push(loop);
  }

  /* ---------- pointer parallax ---------- */
  // The phone leans towards the cursor with a little weight (time-based, so it feels the same at any frame
  // rate) and drifts back to rest when the cursor leaves.
  const zone = host.parentElement ?? host;
  const tiltX = gsap.quickTo(rig.rotation, 'x', { duration: 0.9, ease: 'power3.out' });
  const tiltY = gsap.quickTo(rig.rotation, 'y', { duration: 0.9, ease: 'power3.out' });
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = zone.getBoundingClientRect();
    tiltY((((e.clientX - r.left) / r.width) * 2 - 1) * 0.22);
    tiltX((((e.clientY - r.top) / r.height) * 2 - 1) * 0.12);
  };
  const onLeave = () => {
    tiltX(0);
    tiltY(0);
  };
  zone.addEventListener('pointermove', onMove);
  zone.addEventListener('pointerleave', onLeave);

  /* ---------- sizing + render loop ---------- */
  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    distShut = Math.max((PHONE_H * 1.2) / (2 * tan), (Math.max(phoneW, phoneD) * 1.75) / (2 * tan * camera.aspect));
    distOpen = Math.max((openH * 1.22) / (2 * tan), (openW * 1.3) / (2 * tan * camera.aspect));
    camera.position.z = THREE.MathUtils.lerp(distShut, distOpen, st.zoom);
    camera.position.y = -0.02;
    camera.updateProjectionMatrix();
  };
  let distShut = 4;
  let distOpen = 4;
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // Frames run on GSAP's own ticker, straight after it updates the tweens, so every frame renders exactly the
  // state GSAP just computed (a separate requestAnimationFrame can land a frame behind and judder).
  // The screen canvases are redrawn, and re-uploaded to the GPU, only when what they show has changed.
  let active = false;
  let started = false;
  const t0 = performance.now();
  const loaded = () =>
    [sitePhone, siteWide].reduce((n, img) => n + (img && ready(img) ? 1 : 0), shots.reduce((n, img) => n + (ready(img) ? 1 : 0), ready(icon) ? 1 : 0));
  let coverKey = '';
  let innerKey = '';
  const tick = () => {
    const t = (performance.now() - t0) / 1000;
    shadowMat.opacity = 0.85 - phone.position.y * 1.5;
    if (canUnfold) {
      applyFold(st.fold, st.turn);
      camera.position.z = THREE.MathUtils.lerp(distShut, distOpen, st.zoom);
      shadow.scale.x = THREE.MathUtils.lerp(1, openW / phoneW, st.turn);
      fit.rotation.z = st.wob * 0.028;
      fit.rotation.y = st.wob * 0.05;
      fit.position.y = -Math.abs(st.wob) * 0.012;
    }
    const n = loaded();
    if (st.fold < 0.85) {
      // the cover screen, while it can be seen; the jiggling home screen changes every frame
      const k = `${st.open},${st.slide},${st.press},${st.touch},${st.jiggle},${n}`;
      if (k !== coverKey || (st.jiggle > 0 && st.open < 1)) {
        coverKey = k;
        draw(t);
      }
    }
    if (st.fold > 0.15) {
      const k = `${st.inner},${n}`;
      if (k !== innerKey) {
        innerKey = k;
        drawInner();
      }
    } else innerKey = '';
    renderer.render(scene, camera);
  };
  draw(0);
  renderer.render(scene, camera);

  return {
    setActive(on) {
      if (on === active) return;
      active = on;
      if (on) {
        if (!started) {
          started = true;
          anims.forEach((a) => a.play());
        } else anims.forEach((a) => a.resume());
        gsap.ticker.add(tick);
      } else {
        gsap.ticker.remove(tick);
        anims.forEach((a) => a.pause());
      }
    },
    dispose() {
      gsap.ticker.remove(tick);
      ro.disconnect();
      anims.forEach((a) => a.kill());
      gsap.killTweensOf([phone.position, phone.rotation, phone.scale, rig.rotation, st]);
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerleave', onLeave);
      mixer?.stopAllAction();
      // geometry and the model's own materials are shared between clones; only what this mount made is freed
      owned.forEach((d) => d.dispose());
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      el.remove();
    },
  };
}
