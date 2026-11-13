import Link from 'next/link';
import Lines from '@/components/ui/Lines';
import { featuredIds, featuredPhones, getProject, highlights, portfolioIntro } from '@/content/projects';
import LivePhone from './LivePhone';

const featured = featuredIds.map((id) => ({ ...getProject(id)!, ...highlights[id], phone: featuredPhones[id] }));

/** The live portfolio's intro: the claim on the left, the four headline projects stacked in two offset columns. */
export default function PortfolioIntro() {
  const columns = [featured.filter((_, i) => i % 2 === 0), featured.filter((_, i) => i % 2 === 1)];
  return (
    <section aria-labelledby="intro-title" className="pt-[clamp(0.75rem,0.25rem+1vw,1.5rem)]">
      {/* The anchor sits on the content, not the padded section, so "Explore Our Work" lands with the whole spread in view. */}
      <div id="featured" className="wrap grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="@container">
            <Lines as="h2" id="intro-title" lines={portfolioIntro.title} className="display text-[length:var(--fs-h1)]" lineClassName={(i) => (i === 2 ? 'text-orange-ink' : '')} />
          </div>
          <p className="display mt-8 max-w-[40rem] text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] leading-tight" data-reveal>
            {portfolioIntro.tagline}
          </p>
          <p className="mt-5 max-w-[40rem] text-ink-2 leading-relaxed" data-reveal>
            {portfolioIntro.body}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-5" data-stagger>
          {columns.map((col, c) => (
            <ul key={c} className={`flex flex-col gap-4 ${c === 1 ? 'mt-8' : ''}`}>
              {col.map((p) => (
                <li key={p.id}>
                  <Link href={`/portfolio/${p.id}`} className="group block rounded-[var(--radius)] border border-[var(--line)] bg-paper p-3 transition-colors hover:border-[var(--line-strong)]">
                    {/* Same frame as before; inside it the foldable phone runs the project. */}
                    <div
                      className="relative aspect-[1.36] overflow-hidden rounded-[calc(var(--radius)-0.5rem)]"
                      style={{ background: `radial-gradient(95% 85% at 50% 40%, color-mix(in oklab, ${p.phone.color} 72%, white), ${p.phone.color} 42%, color-mix(in oklab, ${p.phone.color} 26%, black) 100%)` }}
                    >
                      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-relief.svg')] bg-[length:120px_106px] opacity-35 mix-blend-overlay" />
                      <LivePhone app={p.phone} poster={3} className="!absolute inset-0" />
                      <span className="sr-only">{`${p.name} — ${p.descriptor}`}</span>
                    </div>
                    <h3 className="display mt-4 px-1 text-base">{p.name}</h3>
                    <p className="mt-1 px-1 pb-1 text-xs font-medium text-orange-deep sm:text-sm">
                      {p.sector} · {p.highlight}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
