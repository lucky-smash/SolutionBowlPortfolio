import type { Metadata } from 'next';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import WorkGrid from '@/components/portfolio/WorkGrid';
import SectionHead from '@/components/ui/SectionHead';
import { FinalCta } from '@/components/home/Sections';
import { Arrow } from '@/components/chrome/Nav';
import { apps, portfolioIntro, projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Software Development Portfolio | 500+ Live Projects | SolutionBowl.ai',
  description: portfolioIntro.tagline + ' ' + portfolioIntro.claim,
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />

      {/* Every project, laid out as an editorial spread. */}
      <section id="work" aria-labelledby="all-work" className="scroll-mt-24 py-[var(--section)]">
        <div className="wrap">
          <SectionHead id="all-work" eyebrow="Client success stories" title={['All', 'Projects']} accentLine={1} intro={portfolioIntro.tagline} />
          <div className="mt-12">
            <WorkGrid projects={projects} />
          </div>
        </div>
      </section>

      <section aria-labelledby="apps" className="px-[clamp(0.5rem,1.5vw,1.25rem)] pb-[var(--section)]">
        <div className="rounded-[clamp(1.5rem,3vw,3rem)] bg-night py-[clamp(4rem,7vw,6rem)] text-paper">
          <div className="wrap">
            <SectionHead id="apps" tone="dark" eyebrow="Mobile applications" title={['Apps Built', 'to Scale']} accentLine={1} intro="Live on app stores, with a 4.9★ average rating and a 99.9% uptime commitment." />
            <ul className="mt-12 border-t border-paper/20" data-stagger>
              {apps.map((a) => (
                <li key={a.name}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-b border-paper/20 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_8rem_auto]"
                  >
                    <span>
                      <span className="display block text-[clamp(1.98rem,1.26rem+2.16vw,3.42rem)] transition-colors group-hover:text-orange">{a.name}</span>
                      <span className="text-sm text-paper/60">
                        {a.sector} · {a.region}
                      </span>
                    </span>
                    <span className="col-span-2 row-start-2 text-paper/75 md:col-span-1 md:col-start-2 md:row-start-1">{a.summary}</span>
                    <span className="hidden text-right md:block">
                      <span className="display block text-4xl text-orange">{a.users}</span>
                      <span className="text-xs uppercase tracking-[0.14em] text-paper/60">Users</span>
                    </span>
                    <span className="col-start-2 row-start-1 grid size-12 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 group-hover:-rotate-45 md:col-start-4">
                      <Arrow />
                      <span className="sr-only">Open {a.name} on Google Play</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
