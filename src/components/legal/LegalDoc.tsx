import type { ReactNode } from 'react';
import Link from 'next/link';
import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import { Arrow } from '@/components/chrome/Nav';
import { contact } from '@/content/site';
import type { LegalPage } from '@/content/types';
import LegalIndex from './LegalIndex';
import { introParts, sectionPieces, type Piece } from './parse';

const EMAIL = /([\w.+-]+@[\w-]+\.[\w.-]+\w)/g;

/** Email addresses in legal copy become mailto links; long tokens may wrap anywhere. */
function rich(text: string): ReactNode {
  const parts = text.split(EMAIL);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    i % 2 ? (
      <a key={i} href={`mailto:${p}`} className="font-semibold text-orange-deep underline decoration-orange/50 underline-offset-[0.2em] hover:decoration-orange-deep">
        {p}
      </a>
    ) : (
      p
    ),
  );
}

function PieceView({ p }: { p: Piece }) {
  switch (p.kind) {
    case 'p':
      return <p>{rich(p.text)}</p>;
    case 'caption':
      return <p className="eyebrow pt-2 text-ink">{p.text}</p>;
    case 'callout':
      return (
        <div className="relative rounded-[var(--radius)] bg-paper py-5 pl-7 pr-6 before:absolute before:inset-y-5 before:left-0 before:w-1 before:rounded-r-full before:bg-orange">
          <p>
            <strong className="font-semibold text-ink">{p.label}:</strong> {rich(p.text)}
          </p>
        </div>
      );
    case 'card':
      return (
        <address className="rounded-[var(--radius)] bg-ink px-7 py-6 not-italic leading-relaxed text-paper/80">
          {p.lines.map((l, i) => (
            <span key={i} className={`block ${i === 0 ? 'display-soft mb-2 text-[1.35rem] text-paper' : ''}`}>
              {l.includes('@') ? (
                <a href={`mailto:${l}`} className="font-semibold text-orange underline decoration-orange/50 underline-offset-[0.2em]">
                  {l}
                </a>
              ) : (
                l
              )}
            </span>
          ))}
        </address>
      );
    case 'list':
      return (
        <ul className="space-y-2.5">
          {p.items.map((it, i) => (
            <li key={i} className="relative pl-7">
              <span aria-hidden className="absolute left-0.5 top-[0.68em] size-2 rounded-full bg-orange" />
              {rich(it)}
            </li>
          ))}
        </ul>
      );
    case 'terms':
      return (
        <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {p.items.map((t, i) => (
            <div key={i} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-6">
              <dt className="font-semibold text-ink">{t.term}</dt>
              <dd>{rich(t.text)}</dd>
            </div>
          ))}
        </dl>
      );
    case 'groups':
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {p.groups.map((g, i) => (
            <div key={g.term} className={`rounded-[var(--radius)] p-6 ${i === 0 ? 'bg-paper' : 'bg-ink text-paper/80'}`}>
              <p className={`display-soft mb-4 text-[1.35rem] ${i === 0 ? 'text-ink' : 'text-paper'}`}>{g.term}</p>
              <ul className="space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="relative pl-6">
                    <span aria-hidden className={`absolute left-0 top-[0.68em] size-2 rounded-full ${i === 0 ? 'bg-orange' : 'border border-orange'}`} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case 'table':
      return (
        <>
          {/* Wide screens: a real table. */}
          <div className="hidden overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-paper md:block">
            <table className="w-full border-collapse text-left text-[0.95rem] leading-snug">
              <thead>
                <tr className="bg-ink text-paper">
                  {p.head.map((h) => (
                    <th key={h} scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.rows.map((r, i) => (
                  <tr key={i} className="border-t border-[var(--line)] align-top">
                    {r.map((c, j) =>
                      j === 0 ? (
                        <th key={j} scope="row" className="px-5 py-4 font-semibold text-ink break-words">
                          {c}
                        </th>
                      ) : (
                        <td key={j} className="px-5 py-4 break-words">
                          {rich(c)}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Small screens: one labelled card per row. */}
          <ul className="space-y-3 md:hidden">
            {p.rows.map((r, i) => (
              <li key={i} className="rounded-[var(--radius)] bg-paper p-5">
                <p className="font-semibold text-ink break-words">{r[0]}</p>
                <dl className="mt-3 space-y-2.5 text-[0.95rem] leading-snug">
                  {r.slice(1).map((c, j) => (
                    <div key={j}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-2">{p.head[j + 1]}</dt>
                      <dd className="mt-0.5 break-words">{rich(c)}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </>
      );
  }
}

/** A calm, readable legal document: title, intro facts, sticky section index and numbered sections. */
export default function LegalDoc({ page, titleLines, related }: { page: LegalPage; titleLines: string[]; related: { label: string; href: string } }) {
  const intro = introParts(page.intro);
  const index = page.sections.map(({ id, heading }) => ({ id, heading }));

  return (
    <>
      <header className="relative overflow-hidden pb-[clamp(3rem,6vw,5.5rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,4.5rem))]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-40 [mask-image:radial-gradient(100%_80%_at_100%_0%,#000_10%,transparent_60%)]" />
        <div className="wrap relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow text-ink-2" data-reveal>
              Legal
            </p>
            {page.updated && (
              <p className="tag border border-[var(--line-strong)] bg-paper/70" data-reveal>
                <span aria-hidden className="size-1.5 rounded-full bg-orange" />
                Updated {page.updated}
              </p>
            )}
          </div>
          <Lines as="h1" lines={titleLines} className="display mt-8 text-[length:var(--fs-hero)]" lineClassName={(i) => (i === titleLines.length - 1 ? 'text-orange-ink' : '')} />

          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-10 border-t border-ink pt-8 lg:grid-cols-12">
            {intro.lede && (
              <p className="display-soft text-[clamp(1.35rem,1.03rem+0.99vw,2.02rem)] leading-[1.15] lg:col-span-5" data-reveal>
                {intro.lede}
              </p>
            )}
            <div className="space-y-6 lg:col-span-6 lg:col-start-7" data-reveal>
              {intro.paragraphs.map((t) => (
                <p key={t} className="text-ink-2">
                  {t}
                </p>
              ))}
              {intro.facts.length > 0 && (
                <dl className="flex flex-wrap gap-px overflow-hidden rounded-[var(--radius)] bg-[var(--line)]">
                  {intro.facts.map((f) => (
                    <div key={f.label} className="min-w-[9rem] flex-1 bg-paper p-4">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-2">{f.label}</dt>
                      <dd className="mt-1.5 font-semibold">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {intro.badges.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {intro.badges.map((b, i) => (
                    <li key={b} className={`tag py-2.5 text-[0.875rem] ${i % 2 ? 'bg-ink text-paper' : 'bg-orange text-ink'}`}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="wrap grid gap-10 pb-[var(--section)] lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] max-h-[calc(100svh-var(--header-h)-3rem)] overflow-y-auto pb-4 pr-2">
            <LegalIndex items={index} />
          </div>
        </aside>
        <details className="group rounded-[var(--radius)] bg-paper lg:hidden [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius)] px-5 py-4">
            <span className="eyebrow text-ink">Contents</span>
            <span aria-hidden className="grid size-8 flex-none place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-open:rotate-45">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <ol className="space-y-1 px-5 pb-5 text-[0.95rem]">
            {index.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="grid grid-cols-[1.9rem_1fr] gap-1 py-1.5 leading-snug text-ink-2 hover:text-ink">
                  <span className="tabular-nums text-orange-deep">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s.heading}</span>
                </a>
              </li>
            ))}
          </ol>
        </details>

        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          {page.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-ink pb-16 pt-8 first:border-t-0 first:pt-0 md:grid md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-6 lg:first:pt-0">
              <span aria-hidden className="display block text-[clamp(2.25rem,1.8rem+1.35vw,3.15rem)] leading-[0.85] text-orange-ink">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h2 id={`${s.id}-h`} className="display-soft mt-3 text-[clamp(1.48rem,1.17rem+0.99vw,2.16rem)] leading-[1.05] md:mt-0">
                  {s.heading}
                </h2>
                <div className="mt-6 max-w-[68ch] space-y-5 break-words text-[1.0625rem] leading-[1.75] text-ink-2">
                  {sectionPieces(s).map((p, j) => (
                    <PieceView key={j} p={p} />
                  ))}
                </div>
              </div>
            </section>
          ))}

          <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" data-reveal>
            <div className="flex flex-col justify-between gap-8 rounded-[var(--radius-lg)] bg-orange p-7 md:p-9">
              <p className="display text-[clamp(1.8rem,1.26rem+1.62vw,2.93rem)]">Questions about this page?</p>
              <div className="flex flex-wrap gap-3">
                <Button href={`mailto:${contact.email}`}>{contact.email}</Button>
              </div>
            </div>
            <Link href={related.href} className="group flex flex-col justify-between gap-8 rounded-[var(--radius-lg)] bg-paper p-7 md:p-9">
              <span className="eyebrow text-ink-2">Also read</span>
              <span className="flex items-end justify-between gap-4">
                <span className="display-soft text-[clamp(1.35rem,1.08rem+0.81vw,1.89rem)] leading-tight">{related.label}</span>
                <span aria-hidden className="grid size-12 flex-none place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45">
                  <Arrow />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
