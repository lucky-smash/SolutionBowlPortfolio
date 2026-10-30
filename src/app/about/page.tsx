import type { Metadata } from 'next';
import { aboutPage } from '@/content/company';
import { FinalCta } from '@/components/home/Sections';
import Testimonials from '@/components/home/Testimonials';
import { AboutHero, Belief, Difference, Founder, Journey, Virtues } from '@/components/company/About';
import Doors from '@/components/company/Doors';

export const metadata: Metadata = {
  title: aboutPage.meta.title,
  description: aboutPage.meta.description,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const { next } = aboutPage;
  return (
    <>
      <AboutHero />
      <Belief />
      <Founder />
      <Virtues />
      <Journey />
      <Difference />
      <Testimonials items={aboutPage.testimonials} />
      <Doors id="next-doors" eyebrow={next.eyebrow} title={next.title} items={next.doors} />
      <FinalCta />
    </>
  );
}
