import Link from 'next/link';
import SectionHead from '@/components/ui/SectionHead';
import { Arrow } from '@/components/chrome/Nav';

type Door = { label: string; title: string; body: string; href: string; cta?: string };

const tones = [
  { box: 'bg-night text-paper', tag: 'bg-orange text-ink', body: 'text-paper/70', dot: 'bg-orange text-ink' },
  { box: 'bg-orange text-ink', tag: 'bg-ink text-paper', body: 'text-ink', dot: 'bg-ink text-paper' },
  { box: 'bg-paper text-ink', tag: 'bg-cream-2 text-ink', body: 'text-ink-2', dot: 'bg-orange text-ink' },
];
const offsets = ['', 'md:mt-14', 'md:mt-28'];

/** "Where to go next": three big colour-block doors, stepped down the page. */
export default function Doors({ id, eyebrow, title, items }: { id: string; eyebrow: string; title: string; items: Door[] }) {
  return (
    <section aria-labelledby={id} className="py-[var(--section)]">
      <div className="wrap">
        <SectionHead id={id} eyebrow={eyebrow} title={title} size="h2" align="stack" />
        <ul className="mt-14 grid gap-4 md:grid-cols-3" data-stagger>
          {items.map((d, i) => {
            const t = tones[i % tones.length];
            const external = /^https?:/.test(d.href);
            const cls = `group relative flex h-full min-h-[17rem] flex-col justify-between gap-10 overflow-hidden rounded-[var(--radius-lg)] p-[clamp(1.5rem,2.6vw,2.5rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 md:min-h-[27rem] ${t.box}`;
            const inner = (
              <>
                <span className="flex items-start justify-between gap-4">
                  <span className={`tag ${t.tag}`}>{d.label}</span>
                  <span className={`grid size-12 flex-none place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 group-hover:scale-110 ${t.dot}`}>
                    <Arrow className={external ? '-rotate-45' : ''} />
                  </span>
                </span>
                <span>
                  <span className="display block text-[clamp(1.89rem,1.26rem+1.8vw,3.06rem)]">{d.title}</span>
                  <span className={`mt-4 block max-w-sm ${t.body}`}>{d.body}</span>
                  {d.cta && <span className="mt-6 inline-block border-b-2 border-current pb-0.5 text-[0.95rem] font-semibold">{d.cta}</span>}
                </span>
              </>
            );
            return (
              <li key={d.href} className={offsets[i % offsets.length]}>
                {external ? (
                  <a href={d.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={d.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
