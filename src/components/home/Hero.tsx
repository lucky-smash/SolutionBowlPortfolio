import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import HeadlineTags, { type TagSpec } from './HeadlineTags';
import Stage from '@/components/stage/Stage';
import { home } from '@/content/site';
import { portfolioIntro } from '@/content/projects';

/** The live hero's service chips, pinned onto the headline Two26-style. */
const TAGS: TagSpec[] = [
  { label: home.chips[0], line: 0, at: 'end', dx: 0.14, dy: 0.08, rotate: -6, tone: 'orange' },
  { label: home.chips[1], line: 1, at: 'end', dx: 0.12, dy: 0.18, rotate: 4, tone: 'ink' },
  { label: home.chips[2], line: 2, at: 'end', dx: 0.14, dy: 0.12, rotate: -3, tone: 'paper' },
  { label: home.chips[3], line: 2, at: 'end', dx: 0.95, dy: 0.42, rotate: 5, tone: 'orange' },
  { label: home.chips[4], line: 0, at: 'end', dx: 0.98, dy: 0.36, rotate: -4, tone: 'paper' },
];

/**
 * The headline has its own band across the top; the lede and actions sit at the left. On desktop the walking stage
 * covers the hero below the proof row and sizes its figures, from the bottom-right, as large as they can be while
 * keeping clear of the [data-stage-avoid] copy. On phones the stage follows the copy and frames the figures.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[max(100svh,46rem)] flex-col overflow-hidden pt-[calc(var(--header-h)+0.75rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(120%_80%_at_100%_0%,#000_10%,transparent_60%)]" />
      <div data-stage-avoid className="wrap relative z-10">
        <div className="flex items-center justify-between gap-6 pt-2 text-sm">
          <p data-intro-hide className="eyebrow text-ink-2">
            {home.eyebrow}
          </p>
          <ul data-intro-hide className="hidden items-center gap-5 text-ink-2 sm:flex">
            {home.proof.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-orange" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mt-[clamp(1rem,3vh,2.5rem)] @container lg:max-w-[64rem]">
          <Lines
            as="h1"
            id="hero-title"
            intro
            lines={portfolioIntro.title}
            className="display relative text-[clamp(2.2rem,7.4cqw,6.2rem)]"
            lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')}
          >
            <HeadlineTags tags={TAGS} />
          </Lines>
        </div>
      </div>

      <div data-intro-hide className="pointer-events-none relative mt-4 h-[clamp(15rem,38svh,22rem)] lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-[calc(var(--header-h)+2.75rem)] lg:mt-0 lg:h-auto">
        <Stage className="h-full" />
      </div>

      <div data-stage-avoid className="wrap relative z-10">
        <div className="mt-2 max-w-[30rem] pb-8 lg:mt-9 lg:pb-0 lg:max-w-[min(30rem,40vw)]">
          <p data-intro-hide className="lede">
            {home.lede}
          </p>
          <div data-intro-hide className="mt-6 flex flex-wrap gap-3">
            <Button href={home.ctas[0].href}>{home.ctas[0].label}</Button>
            <Button href={home.ctas[1].href} variant="ghost">
              {home.ctas[1].label}
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
