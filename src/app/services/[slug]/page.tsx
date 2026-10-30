import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OfferingPage from '@/components/offering/OfferingPage';
import { getService, serviceGroups, services } from '@/content/services';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return { title: s.meta.title, description: s.meta.description, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const group = serviceGroups.find((g) => g.slugs.includes(slug))!;
  const pos = services.findIndex((x) => x.slug === slug) + 1;
  return (
    <OfferingPage
      page={s}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: s.name }]}
      index={String(pos).padStart(2, '0')}
      family={{
        name: group.name,
        links: group.slugs.map((g) => ({ label: getService(g)!.name, href: `/services/${g}`, current: g === slug })),
      }}
    />
  );
}
