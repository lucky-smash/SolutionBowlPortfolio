import type { Metadata } from 'next';
import Link from 'next/link';
import Lines from '@/components/ui/Lines';
import SectionHead from '@/components/ui/SectionHead';
import { FinalCta } from '@/components/home/Sections';
import { Arrow } from '@/components/chrome/Nav';
import { getService, serviceGroups } from '@/content/services';
import { products } from '@/content/products';
import { homeExtras } from '@/content/company';

export const metadata: Metadata = {
  title: 'Services | SolutionBowl.ai',
  description: homeExtras.capabilities.intro,
  alternates: { canonical: '/services' },
};

/** Every service and product, grouped as on the live site's Services menu. */
export default function ServicesIndex() {
  const c = homeExtras.capabilities;
  let n = 0;
  return (
    <>
      <section className="relative overflow-hidden pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,4rem))]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(90%_70%_at_100%_0%,#000_10%,transparent_60%)]" />
        <div className="wrap relative">
          <p className="eyebrow mb-6 text-ink-2" data-reveal>
            {c.eyebrow}
          </p>
          <Lines as="h1" lines={c.title} className="display text-[length:var(--fs-hero)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')} />
          <p className="lede mt-8 max-w-2xl" data-reveal>
            {c.intro}
          </p>
        </div>
      </section>

      {serviceGroups.map((g, gi) => (
        <section key={g.name} aria-labelledby={`group-${gi}`} className="pb-[clamp(3rem,6vw,5rem)]">
          <div className="wrap grid gap-8 lg:grid-cols-12">
            <h2 id={`group-${gi}`} className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-2 lg:col-span-3 lg:pt-10">
              <span className="mr-3 inline-grid size-7 place-items-center rounded-full bg-orange text-[0.7rem] text-ink">{gi + 1}</span>
              {g.name}
            </h2>
            <ul className="border-t border-ink lg:col-span-9" data-stagger>
              {g.slugs.map((slug) => {
                const s = getService(slug)!;
                n++;
                return (
                  <li key={slug}>
                    <Link
                      href={`/services/${slug}`}
                      className="group relative isolate grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-5 gap-y-2 overflow-hidden border-b border-ink py-7 md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1fr)_auto]"
                    >
                      <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-orange transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                      <span className="text-sm font-semibold tabular-nums text-ink-2 group-hover:text-ink">{String(n).padStart(2, '0')}</span>
                      <span className="display text-[clamp(1.71rem,1.08rem+2.07vw,3.15rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">{s.name}</span>
                      <span className="col-span-2 col-start-2 max-w-md text-[0.97rem] text-ink-2 group-hover:text-ink md:col-span-1 md:col-start-3">{s.summary}</span>
                      <span className="col-start-3 row-start-1 grid size-11 place-items-center rounded-full border border-ink transition-colors group-hover:bg-ink group-hover:text-paper md:col-start-4">
                        <Arrow />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="products" className="px-[clamp(0.5rem,1.5vw,1.25rem)] py-[calc(var(--section)/2)]">
        <div className="rounded-[clamp(1.5rem,3vw,3rem)] bg-night py-[clamp(4rem,7vw,6rem)] text-paper">
          <div className="wrap">
            <SectionHead id="products" tone="dark" eyebrow="Products" title={['School, Manufacturing', '& Railway ERP Software']} accentLine={1} />
            <ul className="mt-12 grid gap-4 md:grid-cols-3" data-stagger>
              {products.map((p, i) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="group flex h-full min-h-72 flex-col justify-between gap-8 rounded-[var(--radius-lg)] border border-paper/15 p-7 transition-colors hover:border-orange hover:bg-night-hover">
                    <span className="flex items-center justify-between text-xs font-semibold tabular-nums text-paper/60">
                      {String(i + 1).padStart(2, '0')}
                      <span className="grid size-10 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 group-hover:-rotate-45">
                        <Arrow />
                      </span>
                    </span>
                    <span>
                      <span className="display block text-[clamp(1.71rem,1.26rem+1.26vw,2.52rem)]">{p.name}</span>
                      <span className="mt-3 block text-paper/70">{p.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/hire-developers" className="group mt-4 flex items-center justify-between gap-6 rounded-[var(--radius-lg)] bg-orange p-7 text-ink">
              <span className="display text-[clamp(1.71rem,1.26rem+1.26vw,2.52rem)]">Hire Dedicated Developers</span>
              <span className="grid size-12 flex-none place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:-rotate-45">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
