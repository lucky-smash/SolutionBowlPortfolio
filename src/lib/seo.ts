// One place that turns a page's title/description/path into the full metadata set search engines and
// social previews read. Next does not derive og:title / og:description / og:url from `title`, so without
// this every page that only set `title` shared as a blank card on LinkedIn, WhatsApp and X.
import type { Metadata } from 'next';
import { company } from '@/content/site';

type PageMeta = {
  title: string;
  description: string;
  /** Path from the site root, e.g. '/services/ai-development'. */
  path: string;
  type?: 'website' | 'article';
};

/** Site-wide share card, built by scripts/build-og-image.mjs. Repeated on every page because a page's
 *  `openGraph` replaces (not merges with) the layout's, image included. */
export const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'SolutionBowl: Real Products. Measurable Impact. Proven Results.',
};

export function pageMeta({ title, description, path, type = 'website' }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type, siteName: 'SolutionBowl', locale: 'en_US', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}

export const absoluteUrl = (path: string) => `${company.url}${path === '/' ? '' : path}`;

/** schema.org BreadcrumbList for a page `crumbs` levels below the home page. */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
