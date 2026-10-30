import type { Block, BlogPost } from '@/content/types';

/** URL-safe id for a heading. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

export type Heading = { id: string; text: string };

/** The post's h2s with unique ids, in order — shared by the article body and its table of contents. */
export function headings(body: Block[]): Heading[] {
  const seen = new Map<string, number>();
  const out: Heading[] = [];
  for (const b of body) {
    if (b.type !== 'h2') continue;
    const base = slugify(b.text) || 'section';
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.push({ id: n ? `${base}-${n + 1}` : base, text: b.text });
  }
  return out;
}

/** Card-level fields only, so client components don't receive whole article bodies. */
export type PostSummary = Pick<BlogPost, 'slug' | 'title' | 'category' | 'excerpt' | 'readTime' | 'author'>;
export const summarise = ({ slug, title, category, excerpt, readTime, author }: BlogPost): PostSummary => ({
  slug,
  title,
  category,
  excerpt,
  readTime,
  author,
});
