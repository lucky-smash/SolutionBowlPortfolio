import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OfferingPage from '@/components/offering/OfferingPage';
import JsonLd from '@/components/seo/JsonLd';
import { getService, serviceGroups, services } from '@/content/services';
import { absoluteUrl, breadcrumbJsonLd, pageMeta } from '@/lib/seo';
import { ORG_ID } from '@/lib/schema';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.meta.title, description: s.meta.description, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const group = serviceGroups.find((g) => g.slugs.includes(slug))!;
  const pos = services.findIndex((x) => x.slug === slug) + 1;
  const path = `/services/${slug}`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Services', path: '/services' },
            { name: s.name, path },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: s.name,
            serviceType: s.name,
            description: s.meta.description,
            url: absoluteUrl(path),
            category: group.name,
            provider: { '@id': ORG_ID },
          },
        ]}
      />
      <OfferingPage
        page={s}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: s.name }]}
        index={String(pos).padStart(2, '0')}
        family={{
          name: group.name,
          links: group.slugs.map((g) => ({ label: getService(g)!.name, href: `/services/${g}`, current: g === slug })),
        }}
      />
    </>
  );
}
