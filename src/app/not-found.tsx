import type { Metadata } from 'next';
import Link from 'next/link';
import Lines from '@/components/ui/Lines';
import Button from '@/components/ui/Button';
import { Arrow } from '@/components/chrome/Nav';

export const metadata: Metadata = {
  title: 'Page not found | SolutionBowl',
  description: "The page you were looking for isn't here.",
};

const elsewhere = [
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'About us', href: '/about' },
];

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative flex min-h-[max(100svh,44rem)] flex-col overflow-hidden pb-16 pt-[calc(var(--header-h)+clamp(1.5rem,4vw,3rem))]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-50 [mask-image:radial-gradient(80%_70%_at_50%_40%,#000_10%,transparent_70%)]" />
      <div className="wrap relative flex flex-1 flex-col">
        <p className="eyebrow text-ink-2" data-reveal>
          Error 404
        </p>

        {/* The number itself: the zero is the brand's orange bowl, seen from above. */}
        <div aria-hidden className="relative mx-auto mt-[clamp(1rem,3vw,2.5rem)] w-fit select-none">
          <Lines
            as="p"
            lines={[
              <span key="n" className="flex items-center gap-[0.04em]">
                4
                <span className="relative inline-grid size-[0.78em] place-items-center rounded-full bg-orange shadow-[inset_0_-0.06em_0.12em_rgb(120_50_5/0.35)]">
                  <span className="size-[0.5em] rounded-full bg-[radial-gradient(circle_at_40%_35%,#f7a464,#d8641c_70%)] shadow-[inset_0_0.04em_0.08em_rgb(80_30_0/0.45)]" />
                </span>
                4
              </span>,
            ]}
            className="display text-[clamp(7rem,0.7rem+21vw,16.8rem)] leading-[0.8] text-ink"
          />
          <span data-tag="-8" className="tag absolute right-[-2%] top-[-4%] rotate-[-8deg] bg-ink px-3 py-2 text-[clamp(0.75rem,0.55rem+0.8vw,1.15rem)] text-paper shadow-lg sm:px-4 sm:py-2.5">
            Nothing in this bowl
          </span>
          <span data-tag="6" className="tag absolute bottom-[-2%] left-[-2%] rotate-[6deg] border border-[var(--line-strong)] bg-paper px-3 py-2 text-[clamp(0.75rem,0.55rem+0.8vw,1.15rem)] text-ink shadow-lg sm:px-4 sm:py-2.5">
            Page not found
          </span>
        </div>

        <div className="mx-auto mt-[clamp(2rem,5vw,4rem)] max-w-3xl text-center">
          <Lines as="h1" id="nf-title" lines={['This page has ', 'left the bowl.']} className="display text-[clamp(1.98rem,1.26rem+2.34vw,3.6rem)]" lineClassName={(i) => (i === 1 ? 'text-orange-ink' : '')} />
          <p className="lede mx-auto mt-5 max-w-xl" data-reveal>
            The link may be broken, or the page may have moved. Here are a few good places to pick things up again.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
            <Button href="/">Back to home</Button>
            <Button href="/portfolio" variant="orange">
              See our work
            </Button>
            <Button href="/contact" variant="ghost">
              Contact us
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" data-reveal>
            {elsewhere.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group inline-flex items-center gap-1.5 font-semibold text-ink-2 hover:text-ink">
                  {l.label}
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
