import { Arrow } from '@/components/chrome/Nav';
import type { AppPreview } from '@/content/projects';
import LivePhone from './LivePhone';

/** The apps as cards, each with a live 3D phone running the app. A card opens the app's store page. */
export default function AppsShowcase({ apps }: { apps: readonly AppPreview[] }) {
  return (
    <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3" data-stagger>
      {apps.map((a) => (
        <li key={a.id}>
          <a href={a.url} target="_blank" rel="noopener noreferrer" className="group block">
            <div
              className="relative aspect-[4/4.6] overflow-hidden rounded-[var(--radius)]"
              style={{ background: `radial-gradient(90% 75% at 50% 42%, color-mix(in oklab, ${a.color} 70%, white), ${a.color} 40%, color-mix(in oklab, ${a.color} 25%, black) 100%)` }}
            >
              {/* The SB mark pressed into the brand colour, behind the phone. */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-relief.svg')] bg-[length:168px_148px] opacity-35 mix-blend-overlay" />
              <LivePhone app={a} poster={a.cover ?? 1} className="!absolute inset-0" />
              <span className="tag absolute left-4 top-4 bg-paper/95 text-ink">{a.sector}</span>
              <span className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-orange text-ink opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:-rotate-45 group-hover:opacity-100">
                <Arrow />
              </span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <img src={`/img/apps/${a.id}/icon.webp`} alt="" width={56} height={56} loading="lazy" className="size-14 flex-none rounded-[22%] ring-1 ring-paper/15 transition-transform duration-500 group-hover:-rotate-6" />
              <div className="min-w-0 flex-1">
                <h3 className="display text-[clamp(1.6rem,1.2rem+1vw,2.2rem)] leading-none transition-colors group-hover:text-orange">{a.name}</h3>
                <p className="mt-1.5 text-sm text-paper/60">{a.region}</p>
              </div>
              {a.users && (
                <div className="text-right">
                  <span className="display block text-3xl leading-none text-orange">{a.users}</span>
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-paper/60">Users</span>
                </div>
              )}
            </div>
            <p className="mt-4 text-paper/75">{a.summary}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange">
              {a.cta ?? 'Get it on Google Play'} <Arrow />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
