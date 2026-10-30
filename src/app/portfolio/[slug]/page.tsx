import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import { FinalCta } from '@/components/home/Sections';
import { TypePanel } from '@/components/portfolio/WorkGrid';
import { Arrow } from '@/components/chrome/Nav';
import { getProject, projects } from '@/content/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.descriptor} | SolutionBowl.ai Portfolio`,
    description: p.summary,
    alternates: { canonical: `/portfolio/${p.id}` },
  };
}

/** A project page built only from the published portfolio entry: identity, summary, results and live links. */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.id === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const nameLines = p.name.length > 14 ? p.name.split(' ') : [p.name];

  return (
    <>
      <article>
        <header className="relative overflow-hidden pt-[calc(var(--header-h)+clamp(1.5rem,4vw,3rem))]">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="mb-10 text-sm text-ink-2">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/portfolio" className="group inline-flex items-center gap-2 font-medium text-ink hover:underline">
                    <Arrow className="rotate-180" /> Portfolio
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">{p.name}</li>
              </ol>
            </nav>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="eyebrow mb-6 text-ink-2" data-reveal>
                  {p.sectors.join(' · ')} — {p.region}
                </p>
                <Lines as="h1" lines={nameLines} className="display text-[length:var(--fs-mega)]" lineClassName={(k) => (k === nameLines.length - 1 ? 'text-orange-ink' : '')} />
              </div>
              <div className="lg:col-span-4" data-reveal>
                <p className="display-soft text-[clamp(1.35rem,0.99rem+0.9vw,1.89rem)] leading-tight">{p.descriptor}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={p.url}>{`Visit ${p.urlLabel}`}</Button>
                  {p.secondary && (
                    <Button href={p.secondary.url} variant="ghost">
                      {p.secondary.label}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="wrap mt-[clamp(2.5rem,5vw,4rem)]">
          <div className="relative aspect-[1.36] overflow-hidden rounded-[var(--radius-lg)] bg-cream-2 md:aspect-[2/1]" data-reveal>
            {p.image ? (
              <Image src={`/img/portfolio/${p.image}.webp`} alt={`${p.name} — ${p.descriptor}`} fill priority sizes="100vw" className="object-cover object-top" />
            ) : (
              <TypePanel p={p} />
            )}
          </div>
        </div>

        <section aria-labelledby="about-project" className="py-[var(--section)]">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5 text-ink-2">About the project</p>
              <h2 id="about-project" className="display-soft text-[clamp(1.44rem,0.99rem+1.44vw,2.34rem)] leading-[1.15]" data-reveal>
                {p.summary}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow mb-5 text-ink-2">Results</p>
              <ul className="border-t border-ink" data-stagger>
                {p.metrics.map((m, k) => (
                  <li key={m} className="flex items-baseline gap-6 border-b border-ink py-7">
                    <span className="text-sm font-semibold tabular-nums text-ink-2">{String(k + 1).padStart(2, '0')}</span>
                    <span className="display text-[clamp(1.71rem,1.08rem+2.16vw,3.24rem)]">{m}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <dt className="text-ink-2">Sector</dt>
                  <dd className="mt-1 font-semibold">{p.sectors.join(', ')}</dd>
                </div>
                <div>
                  <dt className="text-ink-2">Region</dt>
                  <dd className="mt-1 font-semibold">{p.region}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-ink-2">Live</dt>
                  <dd className="mt-1">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-deep underline-offset-4 hover:underline">
                      {p.urlLabel}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </article>

      <nav aria-label="More projects" className="wrap grid gap-4 pb-[var(--section)] md:grid-cols-2">
        {[
          { label: 'Previous project', p: prev, dir: -1 },
          { label: 'Next project', p: next, dir: 1 },
        ].map(({ label, p: q, dir }) => (
          <Link
            key={label}
            href={`/portfolio/${q.id}`}
            className={`group flex min-h-48 flex-col justify-between rounded-[var(--radius-lg)] p-7 transition-colors ${dir > 0 ? 'bg-ink text-paper hover:bg-ink-hover md:text-right' : 'bg-paper hover:bg-cream-2'}`}
          >
            <span className={`flex items-center gap-2 text-sm font-semibold ${dir > 0 ? 'md:justify-end' : ''}`}>
              {dir < 0 && <Arrow className="rotate-180" />} {label} {dir > 0 && <Arrow />}
            </span>
            <span>
              <span className="display block text-[clamp(1.98rem,1.26rem+2.16vw,3.42rem)]">{q.name}</span>
              <span className={`text-sm ${dir > 0 ? 'text-paper/70' : 'text-ink-2'}`}>{q.descriptor}</span>
            </span>
          </Link>
        ))}
        <div className="flex justify-center md:col-span-2">
          <Button href="/portfolio#work" variant="ghost">
            Back to all projects
          </Button>
        </div>
      </nav>
      <FinalCta />
    </>
  );
}
