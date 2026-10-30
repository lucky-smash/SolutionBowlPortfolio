import Link from 'next/link';
import { Arrow } from '@/components/chrome/Nav';
import type { PostSummary } from './utils';

/** The featured article as one big orange colour block: a magazine cover more than a card. */
export default function FeaturedPost({ post }: { post: PostSummary }) {
  return (
    <article className="relative" data-reveal>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative grid overflow-hidden rounded-[var(--radius-lg)] bg-orange text-ink lg:grid-cols-12"
      >
        {/* Emboss texture fading in from the top-right corner. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-25 mix-blend-multiply [mask-image:radial-gradient(90%_90%_at_100%_0%,#000_10%,transparent_65%)]"
        />
        <div className="relative flex flex-col gap-10 p-[clamp(1.5rem,1rem+2.5vw,3.5rem)] lg:col-span-8 lg:min-h-[34rem] lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag bg-ink text-paper">Featured</span>
            <span className="tag border border-ink/30 bg-paper/40">{post.category}</span>
          </div>
          <h2 className="display text-[clamp(1.87rem,0.78rem+4.06vw,5.07rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
            {post.title}
          </h2>
        </div>
        <div className="relative flex flex-col justify-between gap-10 border-t border-ink/20 p-[clamp(1.5rem,1rem+2.5vw,3.5rem)] lg:col-span-4 lg:border-l lg:border-t-0">
          <p className="text-[1.075rem] leading-relaxed">{post.excerpt}</p>
          <div className="flex items-end justify-between gap-6">
            <dl className="text-sm">
              <div className="flex gap-2">
                <dt className="sr-only">Author</dt>
                <dd className="font-semibold capitalize">{post.author}</dd>
              </div>
              {post.readTime && (
                <div className="flex gap-2">
                  <dt className="sr-only">Read time</dt>
                  <dd>{post.readTime}</dd>
                </div>
              )}
            </dl>
            <span className="flex items-center gap-3 font-semibold">
              <span className="hidden sm:inline">Read article</span>
              <span className="grid size-14 flex-none place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 group-focus-visible:-rotate-45">
                <Arrow />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
