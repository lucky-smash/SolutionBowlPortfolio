'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import Logo from '@/components/brand/Logo';
import ThemeToggle from '@/components/chrome/ThemeToggle';
import { nav } from '@/content/site';
import { reducedMotion, EASE } from '@/lib/motion';

type Panel = 'services' | 'about' | null;

export default function Nav() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [mobile, setMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>(0);

  // Close everything on navigation.
  useEffect(() => {
    setPanel(null);
    setMobile(false);
  }, [pathname]);

  // Hide while scrolling down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (panel || mobile) setHidden(false);
  }, [panel, mobile]);

  // Escape closes; mobile menu locks page scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanel(null);
        setMobile(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : '';
    if (mobile && overlayRef.current && !reducedMotion()) {
      const items = overlayRef.current.querySelectorAll('[data-m-item]');
      animate(items, {
        translateY: ['110%', '0%'],
        duration: 900,
        delay: stagger(55, { start: 120 }),
        ease: EASE.out,
      });
    }
  }, [mobile]);

  const open = (p: Panel) => {
    window.clearTimeout(closeTimer.current);
    setPanel(p);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanel(null), 160);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const servicesActive = pathname.startsWith('/services') || pathname.startsWith('/products');
  const aboutActive = nav.about.some((l) => isActive(l.href));

  return (
    <>
    <header
      ref={headerRef}
      data-site-header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
          scrolled || panel ? 'opacity-100' : 'opacity-0'
        } bg-cream/85 backdrop-blur-md [box-shadow:0_1px_0_var(--line)]`}
      />
      <nav aria-label="Main" className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <div data-nav-item className="flex-none">
          <Link href="/" aria-label="Solution Bowl — home" className="block rounded-md">
            <Logo className="h-11 w-auto md:h-12" title={null} />
          </Link>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-paper/70 p-1 backdrop-blur lg:flex">
          <li data-nav-item onMouseEnter={() => open('services')} onMouseLeave={scheduleClose}>
            <PanelButton label="Services" active={servicesActive} expanded={panel === 'services'} onClick={() => setPanel(panel === 'services' ? null : 'services')} controls="nav-services" />
          </li>
          <li data-nav-item onMouseEnter={() => open('about')} onMouseLeave={scheduleClose}>
            <PanelButton label="About" active={aboutActive} expanded={panel === 'about'} onClick={() => setPanel(panel === 'about' ? null : 'about')} controls="nav-about" />
          </li>
          {nav.primary.map((l) => (
            <li data-nav-item key={l.href}>
              <NavPill href={l.href} active={isActive(l.href)}>
                {l.label}
              </NavPill>
            </li>
          ))}
        </ul>

        <div data-nav-item className="flex flex-none items-center gap-2">
          <ThemeToggle />
          <Link
            href={nav.cta.href}
            className="group hidden items-center gap-3 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-ink-hover sm:inline-flex"
          >
            {nav.cta.label}
            <span className="grid size-8 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg]">
              <Arrow />
            </span>
          </Link>
          <button
            type="button"
            className="relative grid size-11 place-items-center rounded-full border border-[var(--line-strong)] bg-paper lg:hidden"
            aria-expanded={mobile}
            aria-controls="nav-mobile"
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            onClick={() => setMobile((m) => !m)}
          >
            <span className={`absolute h-0.5 w-5 rounded bg-ink transition-transform duration-300 ${mobile ? 'rotate-45' : '-translate-y-1'}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-ink transition-transform duration-300 ${mobile ? '-rotate-45' : 'translate-y-1'}`} />
          </button>
        </div>
      </nav>

      {/* Desktop panels */}
      <div
        id="nav-services"
        onMouseEnter={() => open('services')}
        onMouseLeave={scheduleClose}
        className={`absolute inset-x-0 top-full hidden lg:block ${panel === 'services' ? 'visible' : 'invisible'}`}
      >
        <div
          className={`wrap transition-all duration-500 ease-[var(--ease-out-expo)] ${
            panel === 'services' ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_1.1fr] gap-8 rounded-[var(--radius-lg)] border border-[var(--line)] bg-paper p-8 shadow-[0_30px_60px_-30px_rgb(60_30_5/0.35)]">
            {nav.services.map((g) => (
              <div key={g.name}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">{g.name}</p>
                <ul className="space-y-1.5">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <PanelLink href={l.href} active={isActive(l.href)}>
                        {l.label}
                      </PanelLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-[var(--radius)] bg-cream p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">Products</p>
              <ul className="space-y-1.5">
                {nav.products.map((l) => (
                  <li key={l.href}>
                    <PanelLink href={l.href} active={isActive(l.href)}>
                      {l.label}
                    </PanelLink>
                  </li>
                ))}
              </ul>
              <Link href="/hire-developers" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-deep hover:underline">
                Hire Dedicated Developers <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        id="nav-about"
        onMouseEnter={() => open('about')}
        onMouseLeave={scheduleClose}
        className={`absolute inset-x-0 top-full hidden lg:block ${panel === 'about' ? 'visible' : 'invisible'}`}
      >
        <div className="wrap flex justify-center">
          <ul
            className={`grid w-[min(44rem,100%)] grid-cols-3 gap-3 rounded-[var(--radius-lg)] border border-[var(--line)] bg-paper p-3 shadow-[0_30px_60px_-30px_rgb(60_30_5/0.35)] transition-all duration-500 ease-[var(--ease-out-expo)] ${
              panel === 'about' ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
            }`}
          >
            {nav.about.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`group flex h-full flex-col justify-between gap-8 rounded-[var(--radius)] p-5 transition-colors ${
                    isActive(l.href) ? 'bg-orange' : 'bg-cream hover:bg-orange'
                  }`}
                >
                  <span className="text-xs font-semibold tabular-nums text-ink-2 group-hover:text-ink">0{i + 1}</span>
                  <span className="display-soft text-2xl">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </header>
      {/* Mobile overlay */}
      <div
        id="nav-mobile"
        ref={overlayRef}
        hidden={!mobile}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-cream lg:hidden"
      >
        <div className="wrap flex min-h-full flex-col gap-10 pb-10 pt-6">
          <ul className="space-y-1">
            {[...nav.about.slice(0, 1), { label: 'Services', href: '/services' }, ...nav.primary, { label: 'Contact', href: '/contact' }].map((l) => (
              <li key={l.href} className="overflow-hidden">
                <Link data-m-item href={l.href} className="display block py-1 text-[clamp(2.03rem,9.36vw,3.51rem)]">
                  {l.label === 'About Solution Bowl' ? 'About' : l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 gap-8 border-t border-[var(--line)] pt-8 xs:grid-cols-2">
            {nav.services.map((g) => (
              <div key={g.name}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">{g.name}</p>
                <ul className="space-y-2">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-base font-medium">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">Products</p>
              <ul className="space-y-2">
                {nav.products.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-base font-medium">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">Company</p>
              <ul className="space-y-2">
                {nav.about.slice(1).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-base font-medium">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href={nav.cta.href}
            className="mt-auto inline-flex items-center justify-between rounded-full bg-ink py-2 pl-6 pr-2 font-semibold text-paper"
          >
            {nav.cta.label}
            <span className="grid size-10 place-items-center rounded-full bg-orange text-ink">
              <Arrow />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

function PanelButton({ label, active, expanded, onClick, controls }: { label: string; active: boolean; expanded: boolean; onClick: () => void; controls: string }) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active || expanded ? 'bg-ink text-paper' : 'hover:bg-cream-2'
      }`}
    >
      {label}
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
        <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function NavPill({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`inline-flex rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? 'bg-ink text-paper' : 'hover:bg-cream-2'}`}
    >
      {children}
    </Link>
  );
}

function PanelLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`group -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-[0.95rem] font-medium transition-colors hover:bg-cream ${
        active ? 'text-orange-deep' : ''
      }`}
    >
      {children}
      <span className="translate-x-[-4px] text-orange-deep opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <Arrow />
      </span>
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className={className}>
      <path d="M2 7h10M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
