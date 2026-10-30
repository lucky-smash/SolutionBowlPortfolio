'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const KEY = 'sb-theme';
const THEME_COLOR: Record<Theme, string> = { light: '#f4ece0', dark: '#0f1b35' };

function syncThemeColor(theme: Theme) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

/**
 * Light / dark switch. The theme lives on <html data-theme> (restored before paint by the boot script in
 * layout.tsx), so the icon is chosen in CSS and the server render never disagrees with the client.
 * Listeners can follow changes through the `sb-themechange` event on window (detail: the new theme).
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const current: Theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current);
    syncThemeColor(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.classList.add('theme-switching');
    if (next === 'dark') root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    syncThemeColor(next);
    setTheme(next);
    window.dispatchEvent(new CustomEvent('sb-themechange', { detail: next }));
    // Two frames: the new colours paint without transitions, then transitions come back.
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
  };

  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Dark theme"
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative grid size-11 flex-none place-items-center rounded-full border border-[var(--line-strong)] bg-paper text-ink transition-colors hover:border-orange ${className}`}
    >
      {/* Moon in the light theme (what you switch to), sun in the dark one. */}
      <svg viewBox="0 0 24 24" className="size-[1.15rem] dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
      </svg>
      <svg viewBox="0 0 24 24" className="hidden size-[1.15rem] text-orange dark:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
    </button>
  );
}
