import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Intro from '@/components/home/Intro';
import Hero from '@/components/home/Hero';
import FeaturedWork from '@/components/home/FeaturedWork';
import { home } from '@/content/site';
import { homeExtras } from '@/content/company';
import { AiStudio, Capabilities, Faqs, FinalCta, Process, Ribbon, Statement, WhyUs } from '@/components/home/Sections';
import Testimonials from '@/components/home/Testimonials';
import { aboutPage } from '@/content/company';

export const metadata: Metadata = pageMeta({
  title: home.meta.title,
  description: home.meta.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Intro />
      <Hero />
      <FeaturedWork />
      <Statement />
      <Ribbon />
      <Capabilities />
      <AiStudio />
      <Process />
      <WhyUs />
      <Testimonials items={aboutPage.testimonials} />
      <Faqs items={homeExtras.faqs} />
      <FinalCta />
    </>
  );
}
