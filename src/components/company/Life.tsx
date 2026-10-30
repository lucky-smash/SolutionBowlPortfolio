import Image from 'next/image';
import Link from 'next/link';
import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import SectionHead from '@/components/ui/SectionHead';
import { Arrow } from '@/components/chrome/Nav';
import { lifePage, teamPage } from '@/content/company';
import { lifePhoto, teamPhoto } from './media';

const photos = (lifePage.photos ?? []).map((p) => ({ ...p, local: lifePhoto(p.src) }));
const byFile = (file: string) => photos.find((p) => p.local.endsWith('/' + file));

/** A photo in a rounded, gently rotated frame with its caption pinned on as a tag. */
function Snap({
  file,
  className = '',
  aspect,
  sizes,
  tilt = 0,
  caption = true,
  priority,
}: {
  file: string;
  className?: string;
  aspect: string;
  sizes: string;
  tilt?: number;
  caption?: boolean;
  priority?: boolean;
}) {
  const p = byFile(file);
  if (!p) return null;
  return (
    <figure className={`group ${className.includes('absolute') ? '' : 'relative'} ${className}`} style={{ rotate: `${tilt}deg` }}>
      <div className={`relative overflow-hidden rounded-[var(--radius)] bg-sand shadow-[0_28px_44px_-30px_rgb(60_30_5/0.7)] ${aspect}`}>
        <Image src={p.local} alt={p.alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
      </div>
      {caption && (
        <figcaption aria-hidden className="tag absolute -bottom-3 left-4 bg-paper text-[0.75rem] text-ink shadow-[0_10px_20px_-12px_rgb(40_20_5/0.5)]">
          {p.alt}
        </figcaption>
      )}
    </figure>
  );
}

export function LifeHero() {
  const h = lifePage.hero;
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+1rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(110%_80%_at_100%_0%,#000_10%,transparent_60%)]" />
      <div className="wrap relative">
        <div className="flex items-center justify-between gap-6 pt-2 text-sm">
          <p className="eyebrow text-ink-2" data-reveal>
            {h.eyebrow}
          </p>
          <p className="hidden max-w-[24rem] text-right text-ink-2 sm:block" data-reveal data-reveal-delay="120">
            {h.tagline}
          </p>
        </div>
        <div className="grid gap-12 pb-[clamp(4rem,10vh,7rem)] pt-[clamp(2.5rem,7vh,5rem)] lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col lg:col-span-7">
            <Lines as="h1" intro={false} lines={h.title} className="display text-[length:var(--fs-hero)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')} />
            <div className="mt-auto pt-[clamp(2.5rem,6vh,4rem)]">
              <p className="lede max-w-[34rem]" data-reveal>
                {h.lede}
              </p>
              <p className="mt-4 text-ink-2 sm:hidden" data-reveal>
                {h.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-reveal data-reveal-delay="120">
                <Button href={h.ctas[0].href}>{h.ctas[0].label}</Button>
                <Button href={h.ctas[1].href} variant="ghost">
                  {h.ctas[1].label}
                </Button>
              </div>
            </div>
          </div>
          {/* Collage: three frames pinned at different angles on a fixed-ratio stage. */}
          <div className="relative mx-auto aspect-[5/6] w-full max-w-[36rem] lg:col-span-5" data-reveal data-reveal-delay="160">
            <Snap file="team-selfie.webp" aspect="aspect-[4/3]" className="absolute right-0 top-0 w-[80%]" tilt={-2} sizes="(min-width: 1024px) 30rem, 80vw" caption={false} priority />
            <Snap file="studio-sessions.webp" aspect="aspect-[2/3]" className="absolute left-0 top-[36%] w-[37%]" tilt={4} sizes="(min-width: 1024px) 14rem, 38vw" priority />
            <Snap file="friday-demos.webp" aspect="aspect-[3/2]" className="absolute bottom-[3%] right-[3%] w-[56%]" tilt={-4} sizes="(min-width: 1024px) 20rem, 56vw" priority />
          </div>
        </div>
      </div>
    </section>
  );
}

const chapterTone = [
  { box: 'bg-paper text-ink', sub: 'text-ink-2', tag: 'bg-orange text-ink', num: 'text-orange-ink' },
  { box: 'bg-orange text-ink', sub: 'text-ink', tag: 'bg-ink text-paper', num: 'text-ink' },
  { box: 'bg-night text-paper', sub: 'text-paper/70', tag: 'bg-orange text-ink', num: 'text-orange' },
];
const chapterPhoto = ['founders-day.webp', 'strategy-huddle.webp', 'team-offsite.webp'];

/** Three chapters as cards that stack on one another as you scroll. */
export function Chapters() {
  const c = lifePage.chapters;
  return (
    <section id="story" aria-labelledby="chapters" className="border-t border-[var(--line)] py-[var(--section)]">
      <div className="wrap">
        <SectionHead id="chapters" eyebrow={c.eyebrow} title={c.title} accentLine={1} intro={c.intro} />
        <ol className="mt-16">
          {c.items.map((it, i) => {
            const t = chapterTone[i];
            const p = byFile(chapterPhoto[i]);
            return (
              <li
                key={it.n}
                className={`mb-5 overflow-hidden rounded-[var(--radius-lg)] last:mb-0 lg:sticky lg:mb-[18vh] ${t.box}`}
                style={{ top: `calc(var(--header-h) + ${1 + i * 1.5}rem)` }}
              >
                <article className="grid gap-8 p-[clamp(1.5rem,3.5vw,3.25rem)] md:grid-cols-12 md:items-stretch lg:min-h-[min(34rem,calc(100svh-var(--header-h)-6rem))]">
                  <div className="flex flex-col justify-between gap-10 md:col-span-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className={`tag ${t.tag}`}>{it.label}</span>
                      <span className={`text-xs font-semibold tracking-[0.16em] ${t.sub}`}>{it.counter}</span>
                    </div>
                    <div>
                      <span aria-hidden className={`display block text-[clamp(3.5rem,2.1rem+4.9vw,7.7rem)] ${t.num}`}>
                        {it.n}
                      </span>
                      <h3 className="display-soft mt-4 text-[clamp(1.71rem,1.17rem+1.62vw,2.79rem)] leading-[1.05]">{it.title}</h3>
                      <p className={`mt-5 max-w-xl ${t.sub}`}>{it.body}</p>
                    </div>
                  </div>
                  {p && (
                    <div className="relative min-h-64 overflow-hidden rounded-[var(--radius)] md:col-span-5">
                      <Image src={p.local} alt={p.alt} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* Collage layout for the twelve gallery photos (in content order): column span, frame ratio, offset, tilt. */
const MOSAIC: { span: string; aspect: string; tilt: number }[] = [
  { span: 'col-span-2 lg:col-span-5', aspect: 'aspect-[3/2]', tilt: -1.5 },
  { span: 'col-span-1 lg:col-span-4 lg:mt-20', aspect: 'aspect-[4/5] lg:aspect-[3/2]', tilt: 1.5 },
  { span: 'col-span-1 lg:col-span-3 lg:mt-6', aspect: 'aspect-[4/5]', tilt: -1 },
  { span: 'col-span-1 lg:col-span-4 lg:mt-4', aspect: 'aspect-[4/5] lg:aspect-[4/3]', tilt: 1 },
  { span: 'col-span-1 lg:col-span-3 lg:-mt-10', aspect: 'aspect-[4/5] lg:aspect-[2/3]', tilt: -2 },
  { span: 'col-span-2 lg:col-span-5 lg:mt-12', aspect: 'aspect-[3/2]', tilt: 1.5 },
  { span: 'col-span-1 lg:col-span-3', aspect: 'aspect-[4/5] lg:aspect-[4/3]', tilt: 2 },
  { span: 'col-span-1 lg:col-span-4 lg:-mt-16', aspect: 'aspect-[4/5] lg:aspect-[3/4]', tilt: -1.5 },
  { span: 'col-span-2 lg:col-span-5 lg:mt-8', aspect: 'aspect-[3/2]', tilt: 1 },
  { span: 'col-span-2 lg:col-span-6', aspect: 'aspect-[16/9]', tilt: -1 },
  { span: 'col-span-1 lg:col-span-3 lg:mt-14', aspect: 'aspect-[4/5] lg:aspect-[4/3]', tilt: 2 },
  { span: 'col-span-1 lg:col-span-3 lg:mt-4', aspect: 'aspect-[4/5]', tilt: -2 },
];

export function Moments() {
  const m = lifePage.moments;
  return (
    <section aria-labelledby="moments" className="pb-[var(--section)]">
      <div className="wrap">
        <SectionHead id="moments" eyebrow={m.eyebrow} title={m.title} intro={m.intro} />
        <ul className="mt-16 grid grid-cols-2 items-start gap-x-4 gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-14" data-stagger>
          {photos.map((p, i) => {
            const s = MOSAIC[i % MOSAIC.length];
            const file = p.local.split('/').pop()!;
            return (
              <li key={p.local} className={s.span}>
                <Snap file={file} aspect={s.aspect} tilt={s.tilt} sizes="(min-width: 1024px) 40vw, 50vw" className="transition-[rotate] duration-700 ease-[var(--ease-out-expo)] hover:!rotate-0" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function LifeQuote() {
  const q = lifePage.quote;
  return (
    <section aria-labelledby="life-quote" className="px-[clamp(0.5rem,1.5vw,1.25rem)]">
      <figure className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,3rem)] bg-night py-[clamp(5rem,11vw,10rem)] text-paper">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-[0.07] invert" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/15 blur-[140px]" />
        <div className="wrap relative text-center">
          <h2 id="life-quote" className="eyebrow mx-auto flex w-fit text-paper/70" data-reveal>
            {q.eyebrow}
          </h2>
          <span aria-hidden className="display mx-auto mt-6 block h-[0.45em] text-[10rem] leading-none text-orange">
            “
          </span>
          <blockquote data-fill className="display mx-auto max-w-[18ch] text-[length:var(--fs-h2)] leading-[0.9]">
            {q.text}
          </blockquote>
        </div>
      </figure>
    </section>
  );
}

export function Join() {
  const j = lifePage.join;
  return (
    <section aria-labelledby="join" className="py-[var(--section)]">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead id="join" eyebrow={j.eyebrow} title={j.title} accentLine={1} size="h3" intro={j.intro} align="stack" />
            <div className="mt-8" data-reveal>
              <Button href={j.cta.href} variant="orange">
                {j.cta.label}
              </Button>
            </div>
          </div>
        </div>
        <ol className="lg:col-span-6 lg:col-start-7" data-stagger>
          {j.steps.map((s) => (
            <li key={s.n} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 border-t border-ink py-9 last:border-b md:gap-x-10">
              <span aria-hidden className="display text-[clamp(2.73rem,1.87rem+2.65vw,5.07rem)] text-orange-ink">
                {s.n}
              </span>
              <div className="pt-2">
                <h3 className="display-soft text-[clamp(1.3rem,1.08rem+0.81vw,1.89rem)] leading-tight">{s.title}</h3>
                <p className="mt-3 text-ink-2">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Invitation() {
  const v = lifePage.invitation;
  const faces = teamPage.members.slice(0, 6);
  return (
    <section aria-labelledby="invitation" className="pb-[var(--section)]">
      <div className="wrap grid gap-4 lg:grid-cols-12">
        <div className="relative flex min-h-[28rem] flex-col justify-between gap-10 overflow-hidden rounded-[var(--radius-lg)] bg-orange p-[clamp(1.6rem,4vw,3.5rem)] lg:col-span-8" data-reveal>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-25 mix-blend-multiply [mask-image:linear-gradient(to_left,#000,transparent_70%)]" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <p className="eyebrow [&::before]:bg-ink">{v.eyebrow}</p>
            <span className="flex -space-x-3" aria-hidden>
              {faces.map((m) => (
                <span key={m.name} className="relative block size-12 overflow-hidden rounded-full border-[3px] border-orange bg-sand">
                  <Image src={teamPhoto(m.name)} alt="" fill sizes="3rem" className="object-cover object-top" />
                </span>
              ))}
            </span>
          </div>
          <div className="relative">
            <Lines id="invitation" lines={[v.title]} className="display max-w-[12ch] text-[length:var(--fs-h2)]" />
            <p className="mt-6 max-w-xl text-[1.08rem]">{v.body}</p>
            <div className="mt-8">
              <Button href={v.cta.href}>{v.cta.label}</Button>
            </div>
          </div>
        </div>
        <ul className="grid gap-4 lg:col-span-4">
          {v.links.map((l, i) => {
            const external = /^https?:/.test(l.href);
            const cls = `group flex h-full min-h-44 flex-col lg:min-h-56 justify-between gap-8 rounded-[var(--radius-lg)] p-[clamp(1.5rem,2.6vw,2.25rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 ${
              i === 0 ? 'bg-night text-paper' : 'bg-paper text-ink'
            }`;
            const inner = (
              <>
                <span className="flex items-start justify-between gap-4">
                  <span className={`tag ${i === 0 ? 'bg-orange text-ink' : 'bg-cream-2 text-ink'}`}>{l.label}</span>
                  <span className={`grid size-11 place-items-center rounded-full transition-transform duration-500 group-hover:-rotate-45 ${i === 0 ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>
                    <Arrow className={external ? '-rotate-45' : ''} />
                  </span>
                </span>
                <h3 className="display text-[clamp(1.71rem,1.17rem+1.44vw,2.61rem)]">{l.title}</h3>
              </>
            );
            return (
              <li key={l.href} data-reveal data-reveal-delay={String(100 + i * 100)}>
                {external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={l.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
