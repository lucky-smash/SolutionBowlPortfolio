import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { lifePage } from '@/content/company';
import { FinalCta } from '@/components/home/Sections';
import { Chapters, Invitation, Join, LifeHero, LifeQuote, Moments } from '@/components/company/Life';

export const metadata: Metadata = pageMeta({
  title: lifePage.meta.title,
  description: lifePage.meta.description,
  path: '/life-at-solutionbowl',
});

export default function LifePage() {
  return (
    <>
      <LifeHero />
      <Chapters />
      <Moments />
      <LifeQuote />
      <Join />
      <Invitation />
      <FinalCta />
    </>
  );
}
