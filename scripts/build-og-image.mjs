// Builds the site-wide 1200×630 share card (LinkedIn, WhatsApp, X, Slack) in the live site's navy/orange look.
// Output: public/og-image.png — referenced by pageMeta() in src/lib/seo.ts on every page.
// Run: node scripts/build-og-image.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const W = 1200;
const H = 630;
const NAVY = '#0f1b35';
const ORANGE = '#f25c2e';

const bowl = await sharp(`${root}public/img/hero/bowl-hero.webp`).resize({ height: 560, fit: 'inside' }).toBuffer();
const bm = await sharp(bowl).metadata();
const logo = await sharp(`${root}public/brand/solution-bowl-logo-480.png`).resize({ width: 132 }).toBuffer();

const font = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="78%" cy="55%" r="45%">
      <stop offset="0" stop-color="${ORANGE}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="${NAVY}"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <circle cx="80" cy="203" r="6" fill="${ORANGE}"/>
  <text x="96" y="210" font-family="${font}" font-size="20" font-weight="600" letter-spacing="3" fill="#aeb8ce">DIGITAL EXCELLENCE SINCE 2017</text>
  <g font-family="${font}" font-weight="800" font-size="70" letter-spacing="-1.5">
    <text x="72" y="300" fill="#f5f7fc">Real Products.</text>
    <text x="72" y="382" fill="${ORANGE}">Measurable Impact.</text>
    <text x="72" y="464" fill="#f5f7fc">Proven Results.</text>
  </g>
  <text x="72" y="548" font-family="${font}" font-size="26" font-weight="500" fill="#aeb8ce">AI, software &amp; automation · 500+ projects delivered</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([
    { input: bowl, left: W - bm.width - 10, top: Math.round((H - bm.height) / 2) + 20 },
    { input: logo, left: 72, top: 52 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(`${root}public/og-image.png`);

console.log('wrote public/og-image.png');
