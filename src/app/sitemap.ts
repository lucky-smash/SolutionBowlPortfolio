import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { absoluteUrl } from '@/lib/seo';

// The site is just the portfolio: its index and one page per project. No lastModified: the content has no real
// edit dates, and a build timestamp would tell Google every page changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/portfolio'), priority: 1 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/portfolio/${p.id}`),
      priority: 0.7,
      ...(p.image ? { images: [absoluteUrl(`/img/portfolio/${p.image}.webp`)] } : {}),
    })),
  ];
}
