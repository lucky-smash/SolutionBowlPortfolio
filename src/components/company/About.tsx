import Image from 'next/image';
import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import SectionHead from '@/components/ui/SectionHead';
import HeadlineTags, { type TagSpec } from '@/components/home/HeadlineTags';
import { Arrow } from '@/components/chrome/Nav';
import { aboutPage } from '@/content/company';
import JourneyTrack from './JourneyTrack';
import { pad, teamPhoto } from './media';

/* Hero tags restate facts from the page (lede, stats) as pinned chips. */
const TAGS: TagSpec[] = [
  { label: 'Since 2017', line: 0, at: 'end', dx: 0.12, dy: 0.08, rotate: -6, tone: 'orange' },
  { label: 'DPIIT Registered', line: 1, at: 'end', dx: 0.1, dy: 0.18, rotate: 4, tone: 'ink' },
  { label: 'India · Middle East · US', line: 2, at: 0.52, dy: 0.86, rotate: -3, tone: 'paper' },
];

export function AboutHero() {
  const h = aboutPage.hero;
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+1rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(110%_80%_at_100%_0%,#000_10%,transparent_60%)]" />
      <div className="wrap relative">
        <div className="flex items-center justify-between gap-6 pt-2 text-sm">
          <p className="eyebrow text-ink-2" data-reveal>
            About Solution Bowl
          </p>
          <p className="hidden max-w-[22rem] text-right text-ink-2 sm:block" data-reveal data-reveal-delay="120">
            {h.tagline}
          </p>
        </div>

        <div className="relative mt-[clamp(2.5rem,8vh,5.5rem)]">
          <Lines as="h1" intro={false} lines={h.title} className="display relative text-[clamp(2.1rem,0.42rem+7vw,8.05rem)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')}>
            <HeadlineTags tags={TAGS} />
          </Lines>
        </div>

        <div className="grid items-end gap-10 pb-[clamp(3.5rem,9vh,6.5rem)] pt-[clamp(2.5rem,7vh,5rem)] lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="lede max-w-[34rem]" data-reveal>
              {h.lede}
            </p>
            <p className="mt-4 text-ink-2 sm:hidden" data-reveal>
              {h.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal data-reveal-delay="120">
              <Button href="#journey">Our journey</Button>
              <Button href="/core-team" variant="ghost">
                Meet the team
              </Button>
            </div>
          </div>
          <a
            href="#believe"
            className="group hidden items-center gap-3 justify-self-end text-sm font-semibold text-ink-2 hover:text-ink lg:col-span-3 lg:col-start-10 lg:flex"
            data-reveal
            data-reveal-delay="200"
          >
            <span className="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] transition-transform duration-500 group-hover:translate-y-1">
              <Arrow className="rotate-90" />
            </span>
            Scroll to read
          </a>
        </div>
      </div>
    </section>
  );
}

/** What we believe: the statement fills with ink as it is read. */
export function Belief() {
  const b = aboutPage.belief;
  return (
    <section id="believe" aria-labelledby="believe-h" className="relative border-t border-[var(--line)] py-[var(--section)]">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 id="believe-h" className="eyebrow text-ink-2 lg:sticky lg:top-28" data-reveal>
            {b.eyebrow}
          </h2>
        </div>
        <div className="lg:col-span-9">
          <p data-fill className="display-soft text-[length:var(--fs-statement)] leading-[1.08]">
            {b.title[0]} <span className="text-orange-ink">{b.title[1]}</span>
          </p>
          <p className="lede mt-12 max-w-2xl" data-reveal>
            {b.body}
          </p>
        </div>
      </div>
    </section>
  );
}

/** The founder's line, set large on the dark panel beside his portrait. */
export function Founder() {
  const f = aboutPage.founder;
  return (
    <section aria-label="A word from our founder" className="px-[clamp(0.5rem,1.5vw,1.25rem)]">
      <figure className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-night py-[clamp(4rem,8vw,7.5rem)] text-paper">
        <div aria-hidden className="pointer-events-none absolute -left-[10%] bottom-[-30%] size-[46vw] rounded-full bg-orange/20 blur-[120px]" />
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-[22rem] lg:col-span-4 lg:mx-0" data-reveal>
            <div className="relative aspect-[3/4] rotate-[-2.5deg] overflow-hidden rounded-[var(--radius-lg)] bg-ink shadow-[0_40px_60px_-30px_rgb(0_0_0/0.8)]">
              <Image src={teamPhoto(f.name)} alt={`Portrait of ${f.name}`} fill sizes="(min-width: 1024px) 22rem, 80vw" className="object-cover object-top" />
            </div>
            <span className="tag absolute -bottom-4 right-2 rotate-[5deg] bg-orange text-ink shadow-[0_10px_24px_-12px_rgb(0_0_0/0.6)]">{f.role}</span>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <span aria-hidden className="display block h-[0.5em] text-[9rem] leading-none text-orange">“</span>
            <blockquote data-fill className="display-soft text-[clamp(1.71rem,0.99rem+2.34vw,3.24rem)] leading-[1.1]">
              {f.quote}
            </blockquote>
            <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-paper/15 pt-6" data-reveal>
              <span>
                <strong className="display-soft block text-2xl">{f.name}</strong>
                <span className="text-sm tracking-[0.12em] text-paper/65">{f.role}</span>
              </span>
              {f.linkedin && (
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full border border-paper/25 py-1.5 pl-5 pr-1.5 text-sm font-semibold hover:bg-paper/10"
                >
                  LinkedIn
                  <span className="grid size-8 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 group-hover:-rotate-45">
                    <Arrow className="-rotate-45" />
                  </span>
                  <span className="sr-only"> profile of {f.name} (opens in a new tab)</span>
                </a>
              )}
            </figcaption>
          </div>
        </div>
      </figure>
    </section>
  );
}

/** The five virtues as a big editorial index that takes the orange on hover. */
export function Virtues() {
  const v = aboutPage.virtues;
  return (
    <section aria-labelledby="virtues" className="py-[var(--section)]">
      <div className="wrap">
        <SectionHead id="virtues" eyebrow={v.eyebrow} title={['Built on', 'more than code.']} accentLine={1} intro={v.intro[0]} />
        <div className="mt-14 grid gap-10 border-t border-[var(--line)] pt-10 lg:grid-cols-12">
          <p className="max-w-xl text-ink-2 lg:col-span-5" data-reveal>
            {v.intro[1]}
          </p>
          <dl className="grid grid-cols-3 gap-4 lg:col-span-6 lg:col-start-7" data-stagger>
            {v.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end gap-3 border-l border-[var(--line-strong)] pl-4">
                <dt className="text-[0.7rem] font-semibold tracking-[0.14em] text-ink-2 sm:text-xs">{s.label}</dt>
                <dd className="display text-[clamp(1.87rem,1.09rem+2.65vw,4.29rem)]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ol className="mt-16 border-t border-ink" data-stagger>
          {v.items.map((it) => (
            <li
              key={it.n}
              className="group relative isolate grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-3 overflow-hidden border-b border-ink py-7 md:grid-cols-[5rem_minmax(0,1.25fr)_minmax(0,1fr)] md:gap-x-8 md:py-9"
            >
              <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-orange transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              <span className="text-sm font-semibold tabular-nums text-ink-2 group-hover:text-ink">{it.n}</span>
              <h3 className="display text-[clamp(1.79rem,0.78rem+3.59vw,4.88rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">{it.title}</h3>
              <p className="col-start-2 max-w-md text-[1.05rem] text-ink-2 group-hover:text-ink md:col-start-3 md:justify-self-end">{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 2017 → 2026, as a horizontal track. */
export function Journey() {
  const j = aboutPage.journey;
  return (
    <section id="journey" aria-labelledby="journey-h" className="overflow-hidden border-t border-[var(--line)] py-[var(--section)]">
      <div className="wrap">
        <SectionHead id="journey-h" eyebrow={j.eyebrow} title={['Years of Execution,', 'Innovation & Impact']} accentLine={1} intro={j.intro} />
      </div>
      <JourneyTrack milestones={j.milestones} />
    </section>
  );
}

/** Why a different partner: the DNA on an orange block, the four principles beside it. */
export function Difference() {
  const d = aboutPage.difference;
  return (
    <section aria-labelledby="difference" className="pb-[var(--section)]">
      <div className="wrap">
        <SectionHead id="difference" title={['Why SolutionBowl Is', 'a Different Partner.']} accentLine={1} intro={d.intro} />
        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          <article className="relative overflow-hidden rounded-[var(--radius-lg)] bg-orange p-[clamp(1.6rem,4vw,3.5rem)] lg:col-span-7" data-reveal>
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-25 mix-blend-multiply [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
            <div className="relative">
              <p className="eyebrow [&::before]:bg-ink">{d.dna.eyebrow}</p>
              <h3 className="display mt-6 max-w-[16ch] text-[clamp(1.87rem,0.94rem+2.81vw,3.9rem)]">{d.dna.title}</h3>
              <p className="mt-6 max-w-2xl text-[1.08rem] leading-relaxed">{d.dna.body}</p>
              <ol className="mt-12 grid gap-6 border-t border-ink/25 pt-8 sm:grid-cols-3">
                {d.dna.points.map((p, i) => (
                  <li key={p.title}>
                    <span className="display text-4xl">{pad(i + 1)}</span>
                    <h4 className="display-soft mt-3 text-[1.35rem] leading-tight">{p.title}</h4>
                    <p className="mt-2 text-[0.95rem] leading-snug">{p.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </article>
          <ul className="flex flex-col rounded-[var(--radius-lg)] bg-paper px-[clamp(1.4rem,3vw,2.5rem)] lg:col-span-5" data-stagger>
            {d.principles.map((p, i) => (
              <li key={p.title} className="group grid grid-cols-[auto_minmax(0,1fr)] gap-5 border-b border-[var(--line)] py-7 last:border-b-0">
                <span className="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] text-sm font-semibold tabular-nums transition-colors duration-500 group-hover:border-orange group-hover:bg-orange">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="display-soft text-[1.5rem] leading-tight">{p.title}</h3>
                  <p className="mt-2 text-ink-2">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
