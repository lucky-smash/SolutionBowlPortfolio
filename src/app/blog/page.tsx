import type { Metadata } from 'next';
import Lines from '@/components/ui/Lines';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostIndex from '@/components/blog/PostIndex';
import { summarise } from '@/components/blog/utils';
import { FinalCta } from '@/components/home/Sections';
import { blogIntro, posts } from '@/content/blog';

export const metadata: Metadata = {
  title: 'Blog | SolutionBowl',
  description: blogIntro.lede,
  alternates: { canonical: '/blog' },
  openGraph: { title: blogIntro.title, description: blogIntro.lede, url: '/blog' },
};

export default function BlogIndexPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const all = posts.map(summarise);

  return (
    <>
      <section aria-labelledby="blog-title" className="relative overflow-hidden pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(2.5rem,6vw,5.5rem))]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(110%_80%_at_100%_0%,#000_10%,transparent_60%)]" />
        <div className="wrap relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow text-ink-2" data-reveal>
              {blogIntro.eyebrow}
            </p>
            <p className="text-sm font-semibold tabular-nums text-ink-2" data-reveal>
              {String(posts.length).padStart(2, '0')} articles
            </p>
          </div>
          <Lines
            as="h1"
            id="blog-title"
            lines={['Ideas That Move ', 'the Industry ', 'Forward']}
            className="display mt-8 text-[length:var(--fs-mega)]"
            lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')}
          />
          <div className="mt-10 grid gap-8 lg:-mt-[calc(var(--fs-mega)*0.84)] lg:grid-cols-12">
            <p className="lede max-w-xl lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal>
              {blogIntro.lede}
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Featured article" className="pb-[var(--section)]">
        <div className="wrap">
          <FeaturedPost post={summarise(featured)} />
        </div>
      </section>

      <section aria-labelledby="all-articles" className="pb-[var(--section)]">
        <div className="wrap">
          <PostIndex
            posts={all}
            heading={
              <>
                <p className="eyebrow mb-5 text-ink-2" data-reveal>
                  The archive
                </p>
                <Lines id="all-articles" lines={['All ', 'Articles']} className="display text-[length:var(--fs-h2)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')} />
              </>
            }
          />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
