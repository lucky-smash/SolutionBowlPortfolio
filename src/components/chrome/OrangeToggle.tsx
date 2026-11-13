'use client';

import { useEffect, useState } from 'react';

/**
 * Trial switch between palettes on the dark theme (the light theme already uses the logo colours):
 *  - 'site':  the live solutionbowl.ai accent #f25c2e (the default)
 *  - 'logo':  the logo's orange #f58634, as the hero animation was drawn
 *  - 'brand': the logo's two colours, orange #f58634 and grey #848688 (secondary text and lines go neutral grey)
 * The choice lives on <html data-orange> (restored before paint by the boot script in layout.tsx); every orange,
 * the hero animation included, follows --color-orange, so the whole site switches together.
 */
const KEY = 'sb-orange';
const MODES = [
  { id: 'site', label: 'Site', swatches: ['#f25c2e'], title: 'Site orange #f25c2e' },
  { id: 'logo', label: 'Logo', swatches: ['#f58634'], title: 'Logo orange #f58634' },
  { id: 'brand', label: 'Brand', swatches: ['#f58634', '#848688'], title: 'Logo colours: orange #f58634 + grey #848688' },
] as const;
type Mode = (typeof MODES)[number]['id'];

export default function OrangeToggle({ className = '' }: { className?: string }) {
  const [mode, setMode] = useState<Mode>('site');

  useEffect(() => {
    const saved = document.documentElement.dataset.orange;
    setMode(saved === 'logo' || saved === 'brand' ? saved : 'site');
  }, []);

  const pick = (next: Mode) => {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    if (next === 'site') delete root.dataset.orange;
    else root.dataset.orange = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setMode(next);
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
  };

  return (
    <div
      role="group"
      aria-label="Site colours"
      className={`hidden flex-none items-center gap-1 rounded-full border border-[var(--line-strong)] bg-paper p-1 text-xs font-semibold text-ink dark:inline-flex ${className}`}
    >
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={mode === m.id}
          title={m.title}
          onClick={() => pick(m.id)}
          className={`inline-flex h-9 items-center gap-1.5 rounded-full pl-1.5 pr-3 transition-colors ${mode === m.id ? 'bg-cream text-ink ring-1 ring-[var(--line-strong)]' : 'text-ink-2 hover:text-ink'}`}
        >
          <span className="flex -space-x-1.5" aria-hidden>
            {m.swatches.map((c) => (
              <span key={c} className="size-4 rounded-full ring-2 ring-paper" style={{ background: c }} />
            ))}
          </span>
          {m.label}
        </button>
      ))}
    </div>
  );
}
