import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OfferingPage from '@/components/offering/OfferingPage';
import { getProduct, products } from '@/content/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return { title: p.meta.title, description: p.meta.description, alternates: { canonical: `/products/${p.slug}` } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const pos = products.findIndex((x) => x.slug === slug) + 1;
  return (
    <OfferingPage
      page={p}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }, { label: p.name }]}
      index={String(pos).padStart(2, '0')}
      family={{ name: 'Products', links: products.map((x) => ({ label: x.name, href: `/products/${x.slug}`, current: x.slug === slug })) }}
    />
  );
}
