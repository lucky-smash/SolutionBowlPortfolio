import type { Metadata } from 'next';
import { lifePage } from '@/content/company';
import { FinalCta } from '@/components/home/Sections';
import { Chapters, Invitation, Join, LifeHero, LifeQuote, Moments } from '@/components/company/Life';

export const metadata: Metadata = {
  title: lifePage.meta.title,
  description: lifePage.meta.description,
  alternates: { canonical: '/life-at-solutionbowl' },
};

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
