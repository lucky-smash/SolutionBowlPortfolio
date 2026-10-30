import type { Metadata } from 'next';
import OfferingPage from '@/components/offering/OfferingPage';
import { hire } from '@/content/hire';
import { nav } from '@/content/site';

export const metadata: Metadata = { title: hire.meta.title, description: hire.meta.description, alternates: { canonical: '/hire-developers' } };

export default function HirePage() {
  return (
    <OfferingPage
      page={hire}
      crumbs={[{ label: 'Home', href: '/' }, { label: hire.name }]}
      family={{
        name: 'Engagement',
        links: [
          { label: 'Hire Dedicated Developers', href: '/hire-developers', current: true },
          ...nav.services[0].links.slice(0, 2),
          { label: 'Get Expert Advice', href: '/contact' },
        ],
      }}
    />
  );
}
