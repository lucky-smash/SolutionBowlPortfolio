import Link from 'next/link';
import type { Faq, Item, OfferingPage as Page, Section } from '@/content/types';
import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import SectionHead from '@/components/ui/SectionHead';
import ProcessPath from '@/components/home/ProcessPath';
import Testimonials from '@/components/home/Testimonials';
import { Faqs, FinalCta } from '@/components/home/Sections';
import { Arrow } from '@/components/chrome/Nav';
import { toLines } from '@/lib/text';

export type Crumb = { label: string; href?: string };

/**
 * Shared layout for service, product and hire-developer pages. The hero carries a "poster" panel that places
 * the page within its family (its group and siblings); each content section kind gets its own editorial treatment,
 * alternating surfaces so long pages keep a rhythm.
 */
export default function OfferingPage({
  page,
  crumbs,
  family,
  index,
}: {
  page: Page;
  crumbs: Crumb[];
  /** The page's family for the poster panel, e.g. its service group. */
  family: { name: string; links: { label: string; href: string; current?: boolean }[] };
  /** "03 / 11"-style position. */
  index?: string;
}) {
  const titleLines = toLines(page.title, 18);
  return (
    <>
      <section className="relative overflow-hidden pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(1.5rem,4vw,3rem))]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(90%_70%_at_100%_0%,#000_10%,transparent_60%)]" />
        <div className="wrap relative">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-2">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-ink hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-ink">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-6 text-ink-2" data-reveal>
                {page.eyebrow}
              </p>
              <Lines as="h1" lines={titleLines} className="display text-[clamp(2.03rem,0.7rem+3.92vw,5.07rem)]" lineClassName={(i) => (i === titleLines.length - 1 ? 'text-orange-ink' : '')} />
              <p className="lede mt-8 max-w-2xl" data-reveal>
                {page.lede}
              </p>
              {page.tags && (
                <ul className="mt-6 flex flex-wrap gap-2" data-stagger>
                  {page.tags.map((t) => (
                    <li key={t} className="tag border border-[var(--line-strong)] bg-paper">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-9 flex flex-wrap gap-3" data-reveal>
                <Button href="/contact#contact-form">Book a Strategy Call</Button>
                <Button href="/portfolio" variant="ghost">
                  View Our Work
                </Button>
              </div>
            </div>
            <aside aria-label={family.name} className="lg:col-span-4" data-reveal data-reveal-delay="200">
              <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-orange p-7">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">{family.name}</p>
                  {index && <p className="display text-5xl leading-none">{index}</p>}
                </div>
                <ul className="mt-10 space-y-1 border-t border-ink/20 pt-4">
                  {family.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        aria-current={l.current ? 'page' : undefined}
                        className={`group flex items-center justify-between gap-3 rounded-lg py-1.5 font-semibold ${l.current ? '' : 'text-ink/85 hover:text-ink'}`}
                      >
                        <span className="flex items-center gap-2">
                          {l.current && <span aria-hidden className="size-2 rounded-full bg-ink" />}
                          {l.label}
                        </span>
                        <Arrow className="opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {page.sections.map((s, i) => (
        <SectionBlock key={i} s={s} i={i} />
      ))}

      {page.faqs && page.faqs.length > 0 && <Faqs items={page.faqs as Faq[]} />}
      <FinalCta />
    </>
  );
}

function SectionBlock({ s, i }: { s: Section; i: number }) {
  const id = s.id ?? `section-${i + 1}`;
  switch (s.kind) {
    case 'items':
      return <ItemsSection s={s} id={id} i={i} />;
    case 'process':
      return (
        <section aria-labelledby={id} className="py-[var(--section)]">
          <div className="wrap">
            <SectionHead id={id} eyebrow={s.eyebrow} title={toLines(s.title, 26)} accentLine={toLines(s.title, 26).length - 1} intro={s.intro} align="stack" size="h3" />
            <ProcessPath steps={s.steps} />
          </div>
        </section>
      );
    case 'stack':
      return (
        <section aria-labelledby={id} className="px-[clamp(0.5rem,1.5vw,1.25rem)] py-[calc(var(--section)/2)]">
          <div className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-night py-[clamp(4rem,7vw,6rem)] text-paper">
            <div className="wrap">
              <SectionHead id={id} tone="dark" eyebrow={s.eyebrow} title={toLines(s.title, 24)} accentLine={toLines(s.title, 24).length - 1} intro={s.intro} size="h3" />
              <div className={`mt-12 grid gap-3 ${s.groups.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`} data-stagger>
                {s.groups.map((g) => (
                  <div key={g.name} className="rounded-[var(--radius)] border border-paper/12 p-6">
                    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-orange">{g.name}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((t) => (
                        <li key={t} className="tag border border-paper/20 text-paper/90">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    case 'case':
      return (
        <section aria-labelledby={id} className="px-[clamp(0.5rem,1.5vw,1.25rem)] py-[calc(var(--section)/2)]">
          <div className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-orange py-[clamp(3.5rem,7vw,6rem)]">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-20 mix-blend-multiply" />
            <div className="wrap relative grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                {s.eyebrow && (
                  <p className="eyebrow mb-4 [&::before]:bg-ink" data-reveal>
                    {s.eyebrow}
                  </p>
                )}
                {s.label && <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em]">{s.label}</p>}
                <Lines id={id} lines={toLines(s.title, 24)} className="display text-[clamp(1.98rem,1.17rem+2.52vw,3.83rem)]" />
                {s.tags && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li key={t} className="tag bg-ink text-paper">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                {s.link && (
                  <div className="mt-8">
                    <Button href={s.link.href} variant="ink">
                      {s.link.label}
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-4 lg:col-span-6" data-stagger>
                {s.challenge && <CaseBlock label="The Challenge" text={s.challenge} />}
                {s.solution && <CaseBlock label="The Solution" text={s.solution} />}
                <div className="rounded-[var(--radius)] bg-ink p-6 text-paper">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-orange">The Impact</p>
                  <ul className="space-y-2">
                    {s.impact.map((m) => (
                      <li key={m} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 size-1.5 flex-none rounded-full bg-orange" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    case 'stats':
      return (
        <section aria-labelledby={s.title ? id : undefined} aria-label={s.title ? undefined : 'Key figures'} className="py-[calc(var(--section)/2)]">
          <div className="wrap">
            {s.title && <SectionHead id={id} eyebrow={s.eyebrow} title={toLines(s.title, 26)} size="h3" align="stack" />}
            <dl className={`grid grid-cols-2 border-y border-ink ${s.items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} ${s.title ? 'mt-12' : ''}`} data-stagger>
              {s.items.map((st) => (
                <div key={st.label + st.value} className="flex flex-col-reverse justify-end gap-2 border-[var(--line)] p-6 [&:not(:last-child)]:border-r">
                  <dt className="text-sm text-ink-2">{st.label}</dt>
                  <dd className="display text-[clamp(2.03rem,1.25rem+2.34vw,3.9rem)] leading-[0.9]">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      );
    case 'quotes':
      return s.items.length > 1 ? (
        <div className="pt-[calc(var(--section)/2)]">
          <Testimonials items={s.items} eyebrow={s.eyebrow ?? 'Client stories'} title={s.title ?? 'What Our Clients Say'} />
        </div>
      ) : (
        <section aria-label={s.title ?? 'Client story'} className="py-[calc(var(--section)/1.5)]">
          <figure className="wrap mx-auto max-w-5xl text-center" data-reveal>
            {s.eyebrow && <p className="eyebrow mx-auto mb-8 flex w-fit text-ink-2">{s.eyebrow}</p>}
            <blockquote className="display-soft text-[clamp(1.44rem,0.99rem+1.62vw,2.7rem)] leading-[1.15]">“{s.items[0].quote}”</blockquote>
            <figcaption className="mt-8 text-sm">
              <strong className="block text-base">{s.items[0].name}</strong>
              <span className="text-ink-2">{[s.items[0].role, s.items[0].place].filter(Boolean).join(' · ')}</span>
            </figcaption>
          </figure>
        </section>
      );
    case 'text':
      return (
        <section aria-labelledby={id} className="py-[var(--section)]">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead id={id} eyebrow={s.eyebrow} title={toLines(s.title, 20)} size="h3" align="stack" />
            </div>
            <div className="space-y-5 text-[1.125rem] leading-relaxed text-ink-2 lg:col-span-6 lg:col-start-7" data-stagger>
              {s.paragraphs.map((p, k) => (
                <p key={k} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      );
  }
}

function CaseBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[var(--radius)] bg-paper p-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-orange-deep">{label}</p>
      <p className="whitespace-pre-line">{text}</p>
    </div>
  );
}

/** Items take one of three forms, chosen from their shape so every page keeps varied rhythm. */
function ItemsSection({ s, id, i }: { s: Extract<Section, { kind: 'items' }>; id: string; i: number }) {
  const hasPoints = s.items.some((it) => it.points?.length);
  const titleLines = toLines(s.title, 24);
  const head = <SectionHead id={id} eyebrow={s.eyebrow} title={titleLines} accentLine={titleLines.length - 1} intro={s.intro} size="h3" />;

  // Detailed offers (with bullet points): two-column feature panels.
  if (hasPoints)
    return (
      <section aria-labelledby={id} className={`py-[var(--section)] ${i % 2 ? 'bg-paper' : ''}`}>
        <div className="wrap">
          {head}
          <div className="mt-14 grid gap-5 md:grid-cols-2" data-stagger>
            {s.items.map((it, k) => (
              <article key={it.title} className={`flex flex-col rounded-[var(--radius-lg)] p-[clamp(1.5rem,3vw,2.5rem)] ${i % 2 ? 'bg-cream' : 'bg-paper'}`}>
                <div className="flex items-start justify-between gap-6">
                  <h3 className="display-soft text-[clamp(1.26rem,0.99rem+0.81vw,1.75rem)] leading-tight">{it.title}</h3>
                  <span className="display text-4xl leading-none text-orange-ink">{String(k + 1).padStart(2, '0')}</span>
                </div>
                {it.body && <p className="mt-4 whitespace-pre-line text-ink-2">{it.body}</p>}
                {it.points && (
                  <ul className="mt-6 space-y-3 border-t border-[var(--line)] pt-6">
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 size-1.5 flex-none rounded-full bg-orange" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <ItemFooter it={it} />
              </article>
            ))}
          </div>
        </div>
      </section>
    );

  // Short lists: a big editorial index, like the home page's capabilities.
  if (s.items.length <= 5)
    return (
      <section aria-labelledby={id} className="py-[var(--section)]">
        <div className="wrap">
          {head}
          <ol className="mt-14 border-t border-ink" data-stagger>
            {s.items.map((it, k) => (
              <li key={it.title} className="group relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-6 gap-y-3 border-b border-ink py-8 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)]">
                <span className="text-sm font-semibold tabular-nums text-ink-2">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="display text-[clamp(1.57rem,0.99rem+1.8vw,2.79rem)]">{it.title}</h3>
                <div className="col-start-2 md:col-start-3">
                  {it.body && <p className="whitespace-pre-line text-ink-2">{it.body}</p>}
                  <ItemFooter it={it} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );

  // Longer lists: a card grid with labels, alternating one orange tile for rhythm.
  return (
    <section aria-labelledby={id} className={`py-[var(--section)] ${i % 2 ? 'bg-paper' : ''}`}>
      <div className="wrap">
        {head}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {s.items.map((it, k) => (
            <li
              key={it.title}
              className={`group flex min-h-56 flex-col justify-between gap-6 rounded-[var(--radius)] p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 ${
                k === 1 ? 'bg-orange' : i % 2 ? 'bg-cream' : 'bg-paper'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-semibold tabular-nums text-ink-2 group-[.bg-orange]:text-ink">{String(k + 1).padStart(2, '0')}</span>
                <span aria-hidden className="size-2 rounded-full bg-orange transition-transform duration-500 group-hover:scale-[2]" />
              </div>
              <div>
                <h3 className="display-soft text-[1.4rem] leading-tight">{it.title}</h3>
                {it.body && <p className={`mt-2 whitespace-pre-line text-[0.97rem] ${k === 1 ? 'text-ink' : 'text-ink-2'}`}>{it.body}</p>}
                <ItemFooter it={it} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ItemFooter({ it }: { it: Item }) {
  if (!it.labels?.length && !it.tags?.length) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {it.labels?.map((l) => (
        <span key={l} className="tag max-w-full whitespace-normal bg-ink px-2.5 py-1 text-[0.7rem] uppercase leading-snug tracking-[0.08em] text-paper">
          {l}
        </span>
      ))}
      {it.tags?.map((t) => (
        <span key={t} className="tag max-w-full whitespace-normal border border-[var(--line-strong)] bg-paper/70 text-[0.75rem]">
          {t}
        </span>
      ))}
    </div>
  );
}
