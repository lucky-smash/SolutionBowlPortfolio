import type { MetadataRoute } from 'next';
import { posts } from '@/content/blog';
import { products } from '@/content/products';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { absoluteUrl } from '@/lib/seo';

type Entry = MetadataRoute.Sitemap[number];

// Built from the same content lists the pages are generated from, so a new service, project or post is
// listed as soon as it exists. No lastModified: the content has no real edit dates, and a build timestamp
// would tell Google every page changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, extra: Partial<Entry> = {}): Entry => ({
    url: absoluteUrl(path),
    priority,
    ...extra,
  });

  return [
    page('/', 1),
    page('/services', 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    ...products.map((p) => page(`/products/${p.slug}`, 0.8)),
    page('/portfolio', 0.8),
    ...projects.map((p) =>
      page(`/portfolio/${p.id}`, 0.7, p.image ? { images: [absoluteUrl(`/img/portfolio/${p.image}.webp`)] } : {}),
    ),
    page('/hire-developers', 0.8),
    page('/blog', 0.7),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.6)),
    page('/about', 0.6),
    page('/core-team', 0.5),
    page('/life-at-solutionbowl', 0.5),
    page('/contact', 0.7),
    page('/privacy-policy', 0.2),
    page('/terms-and-conditions', 0.2),
  ];
}
