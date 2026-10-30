import Image from 'next/image';
import Link from 'next/link';
import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import { featuredIds, getProject, highlights, portfolioIntro } from '@/content/projects';
import { home } from '@/content/site';
import { Arrow } from '@/components/chrome/Nav';
import CoverReveal from '@/components/portfolio/CoverReveal';

export const featuredProjects = featuredIds.map((id) => ({ ...getProject(id)!, ...highlights[id] }));

const LAYOUT = [
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-28',
  'lg:col-span-5',
  'lg:col-span-7 lg:-mt-16',
];

/**
 * The projects the hero's walkers are carrying, laid out as an editorial spread. The section picks up from the
 * world's ground line, so the hero hands straight over to the work.
 */
export default function FeaturedWork() {
  const c = home.caseStudies;
  return (
    <section aria-labelledby="featured-title" className="relative pb-[var(--section)] pt-[clamp(3.5rem,7vw,6rem)]">
      <div className="wrap">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-ink-2" data-reveal>
              {c.eyebrow}
            </p>
            <Lines id="featured-title" lines={['Client Success', 'Stories']} className="display text-[length:var(--fs-h2)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')} />
          </div>
          <p className="lede lg:col-span-4 lg:col-start-9" data-reveal>
            {c.intro}
          </p>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-12" data-stagger>
          {featuredProjects.map((p, i) => (
            <li key={p.id} className={LAYOUT[i]}>
              <Link href={`/portfolio/${p.id}`} className="group block">
                <div className="relative aspect-[1.36] overflow-hidden rounded-[var(--radius)] bg-cream-2 shadow-[0_30px_50px_-36px_rgb(60_30_5/0.55)]">
                  <Image
                    src={`/img/portfolio/${p.image}.webp`}
                    alt={`${p.name} — ${p.descriptor}`}
                    fill
                    sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  {p.accent && <CoverReveal image={p.image!} accent={p.accent} note={p.metrics[0]} label={p.urlLabel} index={i} sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw" />}
                  <span className="tag absolute left-4 top-4 bg-ink text-paper">{p.highlight}</span>
                  <span className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-orange text-ink opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:-rotate-45 group-hover:opacity-100">
                    <Arrow />
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="display text-[clamp(1.8rem,1.17rem+1.8vw,3.06rem)]">{p.name}</h3>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-orange-deep">
                    {p.sector} · {p.region}
                  </p>
                </div>
                <p className="mt-2 max-w-xl text-ink-2">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--line)] pt-8">
          <p className="max-w-xl text-ink-2">{portfolioIntro.claim}</p>
          <Button href="/portfolio">View All Portfolio</Button>
        </div>
      </div>
    </section>
  );
}
