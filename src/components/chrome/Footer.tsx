import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import { company, contact, nav, offices, socials } from '@/content/site';
import { Arrow } from './Nav';

export default function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-orange text-ink">
      {/* Tone-on-tone pattern of the mark. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/brand/emboss-tile.svg')] bg-[length:168px_148px] opacity-[0.16] mix-blend-multiply" />

      <div className="wrap relative pt-[clamp(4rem,8vw,7rem)]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="Solution Bowl — home" className="inline-block rounded-[1.25rem] bg-paper px-5 py-4">
              <Logo className="h-14 w-auto" title={null} />
            </Link>
            <p className="display-soft mt-8 max-w-[18ch] text-[clamp(1.8rem,1.26rem+1.8vw,2.93rem)]">{company.tagline}</p>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed">
              Discuss your project, AI idea, or enterprise software requirement with our experts.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 font-semibold text-paper">
                Contact Us
                <span className="grid size-9 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:-rotate-45">
                  <Arrow />
                </span>
              </Link>
              <a href={`mailto:${contact.email}`} className="rounded-full border border-ink/25 px-5 py-3 font-medium transition-colors hover:bg-ink/5">
                {contact.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-7">
            <FooterCol title="Company" links={[...nav.about, { label: 'Portfolio', href: '/portfolio' }, { label: 'Blog', href: '/blog' }, { label: 'Contact', href: '/contact' }]} />
            <FooterCol title="Services" links={nav.services.flatMap((g) => g.links)} className="row-span-2" />
            <FooterCol title="Products" links={[...nav.products, { label: 'Hire Dedicated Developers', href: '/hire-developers' }]} />
            <div className="col-span-2 sm:col-span-1">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em]">Offices</h2>
              <div className="space-y-5 text-[0.95rem] leading-snug">
                {offices.map((o) => (
                  <address key={o.city} className="not-italic">
                    <span className="mb-1 block font-semibold">{o.city}</span>
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em]">Follow</h2>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-medium hover:underline">
                      {s.label}
                      <Arrow className="-rotate-45 transition-transform group-hover:rotate-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink/20 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved. {company.registration}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Sign-off: the name, set large, split in the logo's two tones. */}
      <p aria-hidden className="display relative select-none whitespace-nowrap px-[var(--gutter)] pb-[0.06em] text-center text-[clamp(2.8rem,0.7rem+9.94vw,12.25rem)] leading-[0.78]">
        <span className="text-paper">Solution</span>
        <span className="text-ink">Bowl</span>
      </p>
    </footer>
  );
}

function FooterCol({ title, links, className = '' }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em]">{title}</h2>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.95rem] font-medium decoration-1 underline-offset-4 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
