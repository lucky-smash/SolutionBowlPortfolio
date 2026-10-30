# Solution Bowl — website

The redesigned solutionbowl.ai: Next.js (App Router) + React + TypeScript + Tailwind CSS v4, with Anime.js for all
motion, including the hand-animated-style walking stage in the hero (SVG figures drawn on twos, with line boil and
changing media).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-checks, prerenders every route)
npm run start
npm run lint     # tsc --noEmit
npm run models   # rebuild the hand model (see assets-src/models/README.md)
```

## Routes

Every URL of the live site is kept: `/`, `/about`, `/core-team`, `/life-at-solutionbowl`, `/portfolio`,
`/services/<11 services>`, `/products/<3 products>`, `/hire-developers`, `/blog`, `/blog/<post>`, `/contact`,
`/privacy-policy`, `/terms-and-conditions`. New: `/services` (index of all services) and `/portfolio/<project>`
(one page per published project).

## Content

All copy lives in `src/content/` and is taken from the live site (retrieved 2026-10-30) and `PORTFOLIO.md` — nothing
is invented. `types.ts` is the schema; `site.ts` holds navigation, offices and contact details.

## Design system

- Tokens and component classes: `src/app/globals.css` (brand orange `#F58634` and grey `#848688` sampled from the
  logo; contrast-checked text colours are noted there).
- Type: the live site's faces — Clash Display (700, self-hosted from Fontshare in `src/app/fonts/`) for display,
  Plus Jakarta Sans for text and UI.
- Theme: light by default; `ThemeToggle` (in the nav) switches to a dark theme in the live site's navy / orange
  palette (`html[data-theme="dark"]` in `globals.css`).
- Logo: `src/components/brand/Logo.tsx`, vectorised from the official PNG (`scripts/trace-logo.mjs`) — same artwork.
- Background texture: `public/brand/emboss-tile.svg`, miniature embossed SB marks (`scripts/build-emboss.mjs`).

## Motion

- Declarative, page-wide: `src/components/motion/MotionRoot.tsx` animates `data-lines` (masked, line-by-line
  headings), `data-reveal`, `data-stagger` and `data-fill` (statement words fill as you read) with Anime.js.
- Home intro (`src/components/home/Intro.tsx`): the logo draws itself, a bowl-curved orange wash rises and drains,
  the hero arrives. Once per session.
- The hero stage (`src/components/stage/`), used on the home and portfolio heroes: two tall illustrated figures and
  a small bowl-bodied robot walk in place, with small passers-by crossing behind. It is built to feel hand-animated:
  - drawn "on twos" — 12 drawings a second, not 60 smooth frames;
  - the line boils — an SVG turbulence seed changes every drawing, so outlines wobble like redrawn ink;
  - the medium changes every ~1.2s — flat ink, coloured pencil, grain, cut paper — by switching one data attribute;
    every shape carries a role class (`f-main`, `f-dark`, `f-light`, `skin`, `hair`…), styled per medium in `Stage.tsx`.
  - "Walk in with a problem, walk out with a solution" is told on the board the first figure carries: its tangled
    scribble untangles into a connected flow with a check, every loop. The second carries the SB mark.
  - `figure.ts`: the figures — real garments (tapered or flared trousers, jackets with collars, sneakers) on a
    distance-driven two-bone-IK walk (planted feet never slide; background walkers travel at exactly stride / period).
  - Phones: the stage sits between the headline and the copy; no background walkers and no line boil (the medium
    changes stay). It pauses off-screen and in background tabs; with `prefers-reduced-motion` it is one still drawing.
  - The motion is code, not footage. If an illustrator delivers a frame-by-frame loop later, it can replace the stage
    as a looping, muted `<video>` with the same layout.

## Contact form

`/contact` posts to `src/app/api/contact/route.ts`, which validates and forwards the enquiry as JSON to
`CONTACT_WEBHOOK_URL` (set it in the environment: a CRM, Zapier/Make hook, Slack webhook, mailer…). If it is not set
or delivery fails, the form opens the visitor's email app pre-filled to contactus@solutionbowl.com, so no enquiry
is silently lost.
