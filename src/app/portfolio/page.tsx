import type { Metadata } from 'next';
import { absoluteUrl, breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioIntro from '@/components/portfolio/PortfolioIntro';
import WorkGrid from '@/components/portfolio/WorkGrid';
import SectionHead from '@/components/ui/SectionHead';
import { FinalCta } from '@/components/home/Sections';
import AppsShowcase from '@/components/portfolio/AppsShowcase';
import { apps, portfolioIntro, projects } from '@/content/projects';

export const metadata: Metadata = pageMeta({
  title: 'Software Development Portfolio | 500+ Live Projects | SolutionBowl.ai',
  description: portfolioIntro.tagline + ' ' + portfolioIntro.claim,
  path: '/portfolio',
});

// Each project has its own page, so the list points crawlers at those pages.
const portfolioJsonLd = [
  breadcrumbJsonLd([{ name: 'Portfolio', path: '/portfolio' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SolutionBowl software development portfolio',
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: absoluteUrl(`/portfolio/${p.id}`),
    })),
  },
];

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={portfolioJsonLd} />
      <PortfolioHero />

      {/* The live portfolio's intro copy beside its four headline projects. */}
      <PortfolioIntro />

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
            <AppsShowcase apps={apps} />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
