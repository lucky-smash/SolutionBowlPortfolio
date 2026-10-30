import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import HeadlineTags, { type TagSpec } from '@/components/home/HeadlineTags';
import Stage from '@/components/stage/Stage';
import { portfolioIntro } from '@/content/projects';

const TAGS: TagSpec[] = [
  { label: 'EdTech', line: 0, at: 'end', dx: 0.14, dy: 0.1, rotate: -6, tone: 'orange' },
  { label: 'FinTech', line: 1, at: 'end', dx: 0.12, dy: 0.16, rotate: 4, tone: 'ink' },
  { label: 'Healthcare', line: 1, at: 'end', dx: 0.16, dy: 0.62, rotate: -4, tone: 'paper' },
  { label: 'E-Commerce', line: 0, at: 'end', dx: 0.9, dy: 0.36, rotate: 5, tone: 'orange' },
];

/** Same stage as the home hero, so the portfolio reads as the continuation of that story. */
export default function PortfolioHero() {
  return (
    <section aria-labelledby="portfolio-title" className="relative flex min-h-[max(100svh,46rem)] flex-col overflow-hidden pt-[calc(var(--header-h)+0.75rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(120%_80%_at_100%_0%,#000_10%,transparent_60%)]" />
      <div data-stage-avoid className="wrap relative z-10">
        <p className="eyebrow pt-2 text-ink-2" data-reveal>
          Portfolio · 500+ live projects
        </p>
        <div className="relative mt-[clamp(1rem,3vh,2.5rem)] @container lg:max-w-[52rem]">
          <Lines as="h1" id="portfolio-title" lines={['Our Work.', 'Their Impact.']} className="display relative text-[clamp(2.4rem,11cqw,7.4rem)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')}>
            <HeadlineTags tags={TAGS} />
          </Lines>
        </div>
      </div>

      <div className="pointer-events-none relative mt-4 h-[clamp(15rem,38svh,22rem)] lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-[calc(var(--header-h)+2.75rem)] lg:mt-0 lg:h-auto">
        <Stage className="h-full" />
      </div>

      <div data-stage-avoid className="wrap relative z-10">
        <div className="mt-2 max-w-[30rem] pb-8 lg:mt-9 lg:pb-0 lg:max-w-[min(30rem,40vw)]">
          <p className="lede" data-reveal>
            {portfolioIntro.tagline} {portfolioIntro.claim}
          </p>
          <div className="mt-6 flex flex-wrap gap-3" data-reveal>
            <Button href="#work">Explore Our Work</Button>
            <Button href="/contact" variant="ghost">
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
