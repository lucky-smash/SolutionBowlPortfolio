import Link from 'next/link';
import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import { Arrow } from '@/components/chrome/Nav';
import type { PostSummary } from './utils';

const tones = ['bg-ink text-paper', 'bg-paper text-ink', 'bg-orange text-ink'];

/** Next reads, as colour-block cards. */
export default function MoreArticles({ posts }: { posts: PostSummary[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="more-articles" className="py-[var(--section)]">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5 text-ink-2" data-reveal>
              Keep reading
            </p>
            <Lines id="more-articles" lines={['More ', 'Articles']} className="display text-[length:var(--fs-h2)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')} />
          </div>
          <div data-reveal>
            <Button href="/blog" variant="ghost">
              All articles
            </Button>
          </div>
        </div>
        <ul className="mt-14 grid gap-4 md:grid-cols-2" data-stagger>
          {posts.map((p, i) => {
            const tone = tones[i % tones.length];
            const dark = tone.includes('bg-ink');
            return (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className={`group flex h-full min-h-[24rem] flex-col justify-between gap-10 rounded-[var(--radius-lg)] p-[clamp(1.5rem,1rem+1.8vw,2.75rem)] ${tone}`}>
                  <span className="flex items-center justify-between gap-4">
                    <span className={`tag capitalize ${dark ? 'bg-orange text-ink' : 'bg-ink text-paper'}`}>{p.category}</span>
                    {p.readTime && <span className={`text-sm ${dark ? 'text-paper/70' : 'text-ink-2'}`}>{p.readTime}</span>}
                  </span>
                  <span>
                    <span className="display block text-[clamp(1.71rem,1.08rem+1.8vw,2.88rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                      {p.title}
                    </span>
                    <span className="mt-8 flex items-center justify-between gap-6">
                      <span className={`line-clamp-2 max-w-md text-[0.975rem] ${dark ? 'text-paper/70' : 'text-ink-2'}`}>{p.excerpt}</span>
                      <span
                        aria-hidden
                        className={`grid size-12 flex-none place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 ${dark ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}
                      >
                        <Arrow />
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
