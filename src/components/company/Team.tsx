import Image from 'next/image';
import Lines from '@/components/ui/Lines';
import SectionHead from '@/components/ui/SectionHead';
import { Arrow } from '@/components/chrome/Nav';
import { teamPage } from '@/content/company';
import TeamGrid from './TeamGrid';
import { teamPhoto } from './media';
import MarqueeToggle from '@/components/ui/MarqueeToggle';

const leaders = teamPage.members.filter((m) => m.group === 'Leadership');
const crew = teamPage.members.filter((m) => m.group !== 'Leadership');

export function TeamHero() {
  const t = teamPage;
  const strip = t.members.map((m, i) => (
    <span key={m.name} className={`relative block h-[clamp(9rem,7rem+8vw,15rem)] w-[clamp(7rem,5.5rem+6vw,11.5rem)] flex-none overflow-hidden rounded-[var(--radius)] bg-sand ${i % 2 ? 'mt-6 rotate-[2deg]' : 'rotate-[-2deg]'}`}>
      <Image src={teamPhoto(m.name)} alt="" fill sizes="12rem" className="object-cover object-top" />
    </span>
  ));
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+1rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(110%_80%_at_100%_0%,#000_10%,transparent_60%)]" />
      <div className="wrap relative">
        <div className="flex items-center justify-between gap-6 pt-2 text-sm">
          <p className="eyebrow text-ink-2" data-reveal>
            {t.eyebrow}
          </p>
          <p className="hidden max-w-[22rem] text-right text-ink-2 sm:block" data-reveal data-reveal-delay="120">
            {t.tagline}
          </p>
        </div>
        <Lines
          as="h1"
          intro={false}
          lines={t.title}
          className="display mt-[clamp(2.5rem,7vh,5rem)] text-[length:var(--fs-hero)]"
          lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')}
        />
        <div className="mt-[clamp(2.5rem,6vh,4.5rem)] grid items-end gap-10 lg:grid-cols-12">
          <a href="#leadership" className="group flex w-fit items-center gap-4 lg:col-span-4" data-reveal>
            <span className="flex -space-x-3" aria-hidden>
              {leaders.map((m) => (
                <span key={m.name} className="relative block size-14 overflow-hidden rounded-full border-[3px] border-cream bg-sand transition-transform duration-500 group-hover:-translate-y-1">
                  <Image src={teamPhoto(m.name)} alt="" fill sizes="3.5rem" priority className="object-cover object-top" />
                </span>
              ))}
            </span>
            <span className="text-sm font-semibold">
              {t.leadership.eyebrow.charAt(0) + t.leadership.eyebrow.slice(1).toLowerCase()}
              <Arrow className="ml-1.5 inline rotate-90 text-orange-deep" />
            </span>
          </a>
          <p className="lede max-w-[36rem] lg:col-span-6 lg:col-start-7" data-reveal data-reveal-delay="100">
            {t.lede}
          </p>
        </div>
      </div>

      {/* Every face on the team, drifting past. Decorative: the same people are listed, named, below. */}
      <div className="marquee relative mt-[clamp(3rem,8vh,5rem)] overflow-hidden pb-[clamp(3rem,8vh,5rem)] [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <MarqueeToggle label="team portraits" />
        <div aria-hidden className="marquee-track flex w-max gap-4 pr-4" style={{ ['--marquee-speed' as string]: '70s' }}>
          <span className="flex gap-4">{strip}</span>
          <span className="flex gap-4">{strip}</span>
        </div>
      </div>
    </section>
  );
}

export function TeamStats() {
  return (
    <section aria-label="The team in numbers" className="px-[clamp(0.5rem,1.5vw,1.25rem)]">
      <div className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-night py-[clamp(3.5rem,7vw,6rem)] text-paper">
        <div aria-hidden className="pointer-events-none absolute -right-[10%] top-[-40%] size-[40vw] rounded-full bg-orange/25 blur-[120px]" />
        <dl className="wrap relative grid grid-cols-2 gap-y-10 lg:grid-cols-4" data-stagger>
          {teamPage.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end gap-3 border-l border-paper/15 pl-5 lg:pl-8">
              <dt className="text-xs font-semibold tracking-[0.14em] text-paper/65">{s.label}</dt>
              <dd className="display text-[clamp(2.24rem,1.26rem+3.22vw,5.25rem)] text-orange">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function TeamBelief() {
  const b = teamPage.belief;
  return (
    <section aria-labelledby="team-belief" className="py-[var(--section)]">
      <div className="wrap">
        <h2 id="team-belief" className="eyebrow mb-10 text-ink-2" data-reveal>
          {b.eyebrow}
        </h2>
        <p data-fill className="display-soft max-w-[26ch] text-[length:var(--fs-statement)] leading-[1.08]">
          <span className="text-orange-ink">{b.title[0]}</span> {b.title[1]} {b.title[2]}
        </p>
        <ol className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-10 md:grid-cols-3 md:gap-6" data-stagger>
          {b.points.map((p) => (
            <li key={p.n} className="border-t border-ink pt-6">
              <span className="display block text-[clamp(2.73rem,1.95rem+2.34vw,4.68rem)] text-orange-ink">{p.n}</span>
              <h3 className="display-soft mt-6 text-[1.6rem] leading-tight">{p.title}</h3>
              <p className="mt-3 max-w-sm text-ink-2">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const leaderOffset = ['', 'lg:mt-24', 'lg:mt-8', 'lg:mt-32'];
const leaderTilt = ['rotate-[-1.5deg]', 'rotate-[1.5deg]', 'rotate-[-1deg]', 'rotate-[2deg]'];

export function Leadership() {
  const l = teamPage.leadership;
  return (
    <section id="leadership" aria-labelledby="leadership-h" className="border-t border-[var(--line)] py-[var(--section)]">
      <div className="wrap">
        <SectionHead id="leadership-h" eyebrow={l.eyebrow} title={l.title} size="h3" />
        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6" data-stagger>
          {leaders.map((m, i) => (
            <li key={m.name} className={`group ${leaderOffset[i]}`}>
              <div className={`relative aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] bg-sand shadow-[0_30px_50px_-34px_rgb(60_30_5/0.6)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-0 ${leaderTilt[i]}`}>
                <Image
                  src={teamPhoto(m.name)}
                  alt={`Portrait of ${m.name}`}
                  fill
                  sizes="(min-width: 1024px) 24vw, 48vw"
                  className="object-cover object-top transition-[filter,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="display text-[clamp(1.53rem,1.08rem+1.26vw,2.34rem)]">{m.name}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-2">{m.role}</p>
                </div>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-10 flex-none place-items-center rounded-full bg-ink text-paper transition-colors duration-300 hover:bg-orange hover:text-ink"
                    aria-label={`${m.name} on LinkedIn (opens in a new tab)`}
                  >
                    <Arrow className="-rotate-45" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Browse() {
  const b = teamPage.browse;
  return (
    <section aria-labelledby="browse" className="pb-[var(--section)]">
      <div className="px-[clamp(0.5rem,1.5vw,1.25rem)]">
        <div className="rounded-[clamp(1.5rem,3vw,3rem)] bg-paper py-[clamp(3.5rem,7vw,6.5rem)]">
          <div className="wrap">
            <SectionHead id="browse" eyebrow={b.eyebrow} title={b.title} accentLine={1} intro={b.intro} />
            <TeamGrid members={crew} />
          </div>
        </div>
      </div>
    </section>
  );
}
