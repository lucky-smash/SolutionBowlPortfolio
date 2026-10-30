import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Lines from '@/components/ui/Lines';
import ArticleBody from '@/components/blog/ArticleBody';
import Toc from '@/components/blog/Toc';
import MoreArticles from '@/components/blog/MoreArticles';
import { headings, summarise } from '@/components/blog/utils';
import { Arrow } from '@/components/chrome/Nav';
import { FinalCta } from '@/components/home/Sections';
import { getPost, posts } from '@/content/blog';
import { company } from '@/content/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: post.meta.title, description: post.meta.description, url },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = headings(post.body);
  const others = posts.filter((p) => p.slug !== post.slug).map(summarise);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta.description,
    articleSection: post.category,
    mainEntityOfPage: `${company.url}/blog/${post.slug}`,
    author: { '@type': 'Organization', name: 'SolutionBowl', url: company.url },
    publisher: { '@type': 'Organization', name: 'SolutionBowl', url: company.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <article aria-labelledby="post-title">
        <header className="relative overflow-hidden pb-[clamp(3rem,6vw,5.5rem)] pt-[calc(var(--header-h)+clamp(1.5rem,4vw,3.5rem))]">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-45 [mask-image:radial-gradient(100%_80%_at_100%_0%,#000_10%,transparent_60%)]" />
          <div className="wrap relative">
            <nav aria-label="Breadcrumb" data-reveal>
              <Link href="/blog" className="group inline-flex items-center gap-2.5 text-sm font-semibold text-ink-2 hover:text-ink">
                <span className="grid size-8 place-items-center rounded-full border border-[var(--line-strong)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-x-1">
                  <Arrow className="rotate-180" />
                </span>
                All articles
              </Link>
            </nav>

            <div className="mt-10 flex flex-wrap items-center gap-2" data-reveal>
              <span className="tag bg-orange capitalize text-ink">{post.category}</span>
              {post.readTime && <span className="tag border border-[var(--line-strong)] bg-paper/60">{post.readTime}</span>}
            </div>

            <Lines
              as="h1"
              id="post-title"
              lines={[post.title]}
              className="display mt-7 text-[clamp(1.82rem,0.42rem+4.48vw,5.77rem)] lg:max-w-[88%]"
            />

            <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-8 border-t border-ink pt-8 lg:grid-cols-12">
              <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3 lg:col-span-4 lg:grid-cols-2" data-reveal>
                <div>
                  <dt className="text-ink-2">Written by</dt>
                  <dd className="mt-1 font-semibold capitalize">{post.author}</dd>
                </div>
                <div>
                  <dt className="text-ink-2">Topic</dt>
                  <dd className="mt-1 font-semibold capitalize">{post.category}</dd>
                </div>
                {post.readTime && (
                  <div>
                    <dt className="text-ink-2">Reading time</dt>
                    <dd className="mt-1 font-semibold">{post.readTime}</dd>
                  </div>
                )}
              </dl>
              <p className="lede lg:col-span-7 lg:col-start-6" data-reveal>
                {post.excerpt}
              </p>
            </div>
          </div>
        </header>

        <div className="wrap grid gap-10 pb-[var(--section)] lg:grid-cols-12">
          {toc.length > 1 && (
            <>
              <aside className="hidden lg:col-span-3 lg:block">
                <div className="sticky top-[calc(var(--header-h)+1.5rem)] max-h-[calc(100svh-var(--header-h)-3rem)] overflow-y-auto pb-4 pr-2">
                  <Toc items={toc} articleId="post-body" />
                </div>
              </aside>
              <details className="group rounded-[var(--radius)] bg-paper lg:hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius)] px-5 py-4 font-semibold">
                  <span className="eyebrow text-ink">On this page</span>
                  <span aria-hidden className="grid size-8 flex-none place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-open:rotate-45">
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <ol className="space-y-1 px-5 pb-5 text-[0.95rem]">
                  {toc.map((h, i) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="grid grid-cols-[1.75rem_1fr] gap-1 py-1.5 leading-snug text-ink-2 hover:text-ink">
                        <span className="tabular-nums text-orange-deep">{String(i + 1).padStart(2, '0')}</span>
                        <span>{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </>
          )}
          <div id="post-body" className="min-w-0 lg:col-span-8 lg:col-start-5">
            <ArticleBody body={post.body} />
            <div className="mt-16 flex max-w-[62ch] flex-wrap items-center justify-between gap-4 border-t border-ink pt-8">
              <p className="text-sm text-ink-2">
                Filed under <span className="font-semibold capitalize text-ink">{post.category}</span>
              </p>
              <Link href="/blog" className="group inline-flex items-center gap-2.5 text-sm font-semibold">
                <Arrow className="rotate-180 transition-transform duration-500 group-hover:-translate-x-1" />
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </article>

      <div className="bg-cream-2/60">
        <MoreArticles posts={others} />
      </div>
      <FinalCta />
    </>
  );
}
