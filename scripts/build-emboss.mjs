// Builds public/brand/emboss-tile.svg: a repeat tile of miniature SB symbols (the real mark, from logo-paths.ts)
// treated as a debossed/embossed texture — cream face, a highlight up-left, a soft shade down-right.
// One in four marks carries a muted orange face. Used as a CSS background (one request, no DOM cost).
// Also writes emboss-tile-dark.svg: the same marks pressed into the dark theme's navy ground.
import fs from 'node:fs';
const src = fs.readFileSync('src/components/brand/logo-paths.ts', 'utf8');
const W = +src.match(/width: (\d+)/)[1];
const SH = +src.match(/symbolHeight: (\d+)/)[1];
const orange = src.match(/LOGO_ORANGE = '([^']+)'/)[1];
const grey = src.match(/LOGO_GREY = '([^']+)'/)[1];

// Keep only subpaths that lie in the symbol (above the wordmark): split on M and test the first point's y.
const sym = (d) => d.split(/(?=M)/).filter((p) => { const m = p.match(/M\s*([\d.]+)[ ,]([\d.]+)/); return m && +m[2] < SH; }).join('');
const d = sym(orange) + sym(grey);

const size = 46; // symbol width in px
const s = size / W;
const TW = 168, TH = 148; // tile
const marks = [
  { x: 18, y: 20, tint: false },
  { x: 102, y: 94, tint: true },
];
const PALETTES = {
  'emboss-tile.svg': { light: '#fffaf2', shade: '#d2c0a6', face: '#efe5d6', tint: '#f1d5bb' },
  // The dark theme's navy ground (#0f1b35): a lifted face, a cool highlight up-left, a deep shade down-right.
  'emboss-tile-dark.svg': { light: '#40599a', shade: '#030712', face: '#1f3160', tint: '#5a3646' },
};
const mark = (p) => ({ x, y, tint }) => `
  <g transform="translate(${x} ${y}) scale(${s.toFixed(5)})">
    <use href="#sb" transform="translate(-${(1.1 / s).toFixed(1)} -${(1.1 / s).toFixed(1)})" fill="${p.light}" />
    <use href="#sb" transform="translate(${(1.2 / s).toFixed(1)} ${(1.3 / s).toFixed(1)})" fill="${p.shade}" />
    <use href="#sb" fill="${tint ? p.tint : p.face}" />
  </g>`;
for (const [file, p] of Object.entries(PALETTES)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${TW}" height="${TH}" viewBox="0 0 ${TW} ${TH}">
  <defs><path id="sb" fill-rule="evenodd" d="${d}"/></defs>
  ${marks.map(mark(p)).join('')}
</svg>`;
  fs.writeFileSync(`public/brand/${file}`, svg);
  console.log(file, (svg.length / 1024).toFixed(1), 'KB, symbol height', (SH * s).toFixed(1));
}
