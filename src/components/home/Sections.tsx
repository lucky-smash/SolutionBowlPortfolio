import Link from 'next/link';
import SectionHead from '@/components/ui/SectionHead';
import Button from '@/components/ui/Button';
import Lines from '@/components/ui/Lines';
import ProcessPath from './ProcessPath';
import MarqueeToggle from '@/components/ui/MarqueeToggle';
import { aboutPage, homeExtras } from '@/content/company';
import { headlineStats } from '@/content/site';
import { Arrow } from '@/components/chrome/Nav';

/** "What we believe": the About statement, filling with ink as it is read. */
export function Statement() {
  const { belief, founder } = aboutPage;
  return (
    <section aria-labelledby="believe" className="relative py-[var(--section)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_50%,transparent_35%,#000_100%)]" />
      <div className="wrap relative">
        <p id="believe" className="eyebrow mx-auto mb-10 flex w-fit text-ink-2" data-reveal>
          {belief.eyebrow}
        </p>
        <p data-fill className="display-soft mx-auto max-w-[24ch] text-center text-[length:var(--fs-statement)] leading-[1.08]">
          {belief.title[0]}{' '}
          <span data-tag="-4" className="tag relative -top-[0.2em] mx-1 inline-flex rotate-[-4deg] bg-orange align-middle text-[0.32em] text-ink">
            Since 2017
          </span>{' '}
          {belief.title[1]}{' '}
          <span data-tag="5" className="tag relative -top-[0.15em] mx-1 inline-flex rotate-[5deg] bg-ink align-middle text-[0.32em] text-paper">
            DPIIT Registered
          </span>
        </p>
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2 md:items-start">
          <p className="lede" data-reveal>
            {belief.body}
          </p>
          <figure className="relative rounded-[var(--radius)] bg-paper p-7 shadow-[0_20px_40px_-30px_rgb(60_30_5/0.45)]" data-reveal data-reveal-delay="120">
            <span aria-hidden className="display absolute -top-6 left-6 text-7xl leading-none text-orange">“</span>
            <blockquote className="display-soft text-[1.45rem] leading-snug">{founder.quote}</blockquote>
            <figcaption className="mt-5 flex items-center justify-between gap-4 text-sm">
              <span>
                <strong className="block font-semibold">{founder.name}</strong>
                <span className="text-ink-2">{founder.role}</span>
              </span>
              {founder.linkedin && (
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-orange-deep hover:underline">
                  LinkedIn <Arrow className="-rotate-45" />
                </a>
              )}
            </figcaption>
          </figure>
        </div>
        <dl className="mt-[clamp(4rem,8vw,7rem)] grid grid-cols-2 border-t border-[var(--line)] lg:grid-cols-4" data-stagger>
          {headlineStats.map((s) => (
            <div key={s.label} className="border-b border-[var(--line)] py-8 pr-4 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <dt className="order-2 mt-2 text-sm text-ink-2">{s.label}</dt>
              <dd className="display text-[clamp(2.5rem,1.56rem+3.12vw,5.07rem)] leading-[0.9]">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex justify-center">
          <Button href="/about" variant="ghost">
            More about Solution Bowl
          </Button>
        </div>
      </div>
    </section>
  );
}

/** A tilted ribbon of the industries served. */
export function Ribbon() {
  const items = homeExtras.industries;
  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6">{t}</span>
          <span aria-hidden className="size-3 rounded-full bg-ink/80" />
        </span>
      ))}
    </span>
  );
  return (
    <section aria-label="Industries we serve" className="relative overflow-hidden py-10">
      <div className="marquee relative -mx-4 rotate-[-2.5deg] bg-orange py-4 shadow-[0_18px_30px_-22px_rgb(60_30_5/0.6)]">
        <MarqueeToggle label="industries ribbon" />
        <h2 className="sr-only">Serving 15+ industries across Middle East &amp; Western markets</h2>
        <div className="marquee-track display flex w-max text-[clamp(1.8rem,1.17rem+2.16vw,3.24rem)] leading-none" style={{ ['--marquee-speed' as string]: '46s' }}>
          {row}
          <span aria-hidden className="flex">
            {row}
          </span>
        </div>
      </div>
    </section>
  );
}

/** Capabilities as an editorial index: big rows that take the orange on hover. */
export function Capabilities() {
  const c = homeExtras.capabilities;
  return (
    <section aria-labelledby="capabilities" className="py-[var(--section)]">
      <div className="wrap">
        <SectionHead id="capabilities" eyebrow={c.eyebrow} title={c.title} accentLine={1} intro={c.intro} />
        <ol className="mt-16 border-t border-ink" data-stagger>
          {c.items.map((it, i) => (
            <li key={it.title}>
              <Link
                href="/services"
                className="group relative isolate grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-x-6 gap-y-3 overflow-hidden border-b border-ink py-8 md:grid-cols-[4rem_minmax(0,1.15fr)_minmax(0,1fr)_auto] md:py-10"
              >
                <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-orange transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                <span className="text-sm font-semibold tabular-nums text-ink-2 group-hover:text-ink">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display text-[clamp(1.8rem,1.08rem+2.34vw,3.51rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">{it.title}</h3>
                <p className="col-start-2 max-w-xl text-ink-2 group-hover:text-ink md:col-start-3">{it.body}</p>
                <ul className="col-start-2 flex flex-wrap gap-2 md:col-start-4 md:max-w-[12rem] md:justify-end">
                  {it.tags.map((t) => (
                    <li key={t} className="tag border border-[var(--line-strong)] bg-paper/60">
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-end">
          <Button href="/services">Explore all services</Button>
        </div>
      </div>
    </section>
  );
}

/** The AI Studio: a dark, dense panel. */
export function AiStudio() {
  const a = homeExtras.aiStudio;
  return (
    <section aria-labelledby="ai-studio" className="px-[clamp(0.5rem,1.5vw,1.25rem)]">
      <div className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-night py-[var(--section)] text-paper">
        <div aria-hidden className="pointer-events-none absolute -right-[10%] top-[-20%] size-[50vw] rounded-full bg-orange/25 blur-[120px]" />
        <div className="wrap relative">
          <SectionHead id="ai-studio" tone="dark" eyebrow={a.eyebrow} title={a.title} accentLine={1} intro={a.body} />
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <figure className="lg:col-span-4" data-reveal>
              <blockquote className="display-soft text-[clamp(1.35rem,0.99rem+1.08vw,1.98rem)] leading-[1.15] text-paper">“{a.quote}”</blockquote>
              <div className="mt-8">
                <Button href="/contact" variant="orange">
                  Talk to Our AI Team
                </Button>
              </div>
            </figure>
            <ul className="grid gap-px overflow-hidden rounded-[var(--radius)] bg-paper/12 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-4" data-stagger>
              {a.capabilities.map((c, i) => (
                <li key={c.title} className="group flex min-h-48 flex-col justify-between gap-6 bg-night p-6 transition-colors duration-500 hover:bg-night-hover">
                  <span className="flex items-center justify-between text-xs font-semibold tabular-nums text-paper/50">
                    {String(i + 1).padStart(2, '0')}
                    <span aria-hidden className="size-2 rounded-full bg-orange transition-transform duration-500 group-hover:scale-[2.2]" />
                  </span>
                  <span>
                    <span className="display-soft block text-[1.45rem]">{c.title}</span>
                    <span className="mt-2 block text-[0.95rem] leading-snug text-paper/65">{c.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** How we work: six steps on a line that draws itself as you read down. */
export function Process() {
  const p = homeExtras.process;
  return (
    <section aria-labelledby="process" className="py-[var(--section)]">
      <div className="wrap">
        <SectionHead id="process" eyebrow={p.eyebrow} title={p.title} accentLine={1} intro={p.intro} align="stack" />
        <ProcessPath steps={p.steps} />
      </div>
    </section>
  );
}

/** Why Solution Bowl: four promises. */
export function WhyUs() {
  const w = homeExtras.whyUs;
  return (
    <section aria-labelledby="why" className="pb-[var(--section)]">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <SectionHead id="why" eyebrow={w.eyebrow} title={w.title} accentLine={1} size="h3" intro={w.intro} align="stack" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7" data-stagger>
            {w.items.map((it, i) => (
              <li
                key={it.title}
                className={`flex min-h-64 flex-col justify-between rounded-[var(--radius)] p-7 ${i === 1 ? 'bg-orange' : i === 2 ? 'bg-ink text-paper' : 'bg-paper'}`}
              >
                <span className="display text-6xl leading-none opacity-90">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="display-soft block text-[1.6rem] leading-tight">{it.title}</span>
                  <span className={`mt-3 block ${i === 2 ? 'text-paper/75' : i === 1 ? 'text-ink' : 'text-ink-2'}`}>{it.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Faqs({ items, title = ['Frequently Asked', 'Questions'], eyebrow = 'Got questions?' }: { items: { q: string; a: string }[]; title?: string[]; eyebrow?: string }) {
  return (
    <section aria-labelledby="faq" className="py-[var(--section)]">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead id="faq" eyebrow={eyebrow} title={title} accentLine={1} size="h3" align="stack" intro="Everything you need to know about working with SolutionBowl. Can't find the answer? Reach out to our team." />
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-medium" data-reveal>
            <span aria-hidden className="size-2 rounded-full bg-orange" /> Avg. reply within 4 working hours
          </p>
        </div>
        <div className="space-y-3 lg:col-span-7" data-stagger>
          {items.map((f) => (
            <details key={f.q} className="group rounded-[1.1rem] bg-paper open:bg-cream-2 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[1.1rem] px-6 py-5 text-[1.05rem] font-semibold">
                {f.q}
                <span aria-hidden className="grid size-8 flex-none place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-open:rotate-45">
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="ml-auto max-w-[44rem] whitespace-pre-line rounded-[1.1rem] rounded-tr-sm bg-paper p-5 text-ink-2">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action, shared by most pages. */
export function FinalCta({
  eyebrow = 'Have a project?',
  title = ["Let's Build Something", 'That Scales.'],
  body = "Speak with our strategy team. We'll map your product roadmap, recommend the right tech and AI stack, and give you a realistic quote.",
  points = ['Senior architect on every discovery call - no sales reps', 'NDA signed before we discuss your idea', 'Fixed-price quotes with milestone-based billing', 'Response within 4 working hours'],
}: {
  eyebrow?: string;
  title?: string[];
  body?: string;
  points?: string[];
}) {
  return (
    <section aria-labelledby="final-cta" className="relative overflow-hidden border-t border-[var(--line)] py-[var(--section)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-35 [mask-image:linear-gradient(to_bottom,transparent,#000_40%)]" />
      <div className="wrap relative text-center">
        <p className="eyebrow mx-auto mb-6 flex w-fit text-ink-2" data-reveal>
          {eyebrow}
        </p>
        <Lines id="final-cta" lines={title} className="display mx-auto text-[length:var(--fs-mega)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')} />
        <p className="lede mx-auto mt-8 max-w-2xl" data-reveal>
          {body}
        </p>
        <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2" data-stagger>
          {points.map((p) => (
            <li key={p} className="tag border border-[var(--line-strong)] bg-paper py-2.5 text-[0.875rem] font-medium">
              <span aria-hidden className="size-1.5 rounded-full bg-orange" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal>
          <Button href="/contact#contact-form">Book a Strategy Call</Button>
          <Button href="https://wa.me/918882958753" variant="ghost">
            WhatsApp us
          </Button>
        </div>
      </div>
    </section>
  );
}
