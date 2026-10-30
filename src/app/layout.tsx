import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/chrome/Nav';
import Footer from '@/components/chrome/Footer';
import MotionRoot from '@/components/motion/MotionRoot';
import PageCurtain from '@/components/motion/PageCurtain';
import { company, home } from '@/content/site';

// The live site's typefaces: Clash Display (Indian Type Foundry, via Fontshare — free for commercial use,
// self-hosted here) for headings, Plus Jakarta Sans for text and UI.
const display = localFont({
  src: [
    { path: './fonts/ClashDisplay-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/ClashDisplay-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/ClashDisplay-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-clash',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: home.meta.title, template: '%s' },
  description: home.meta.description,
  icons: { icon: '/brand/favicon.ico' },
  openGraph: { siteName: 'SolutionBowl', type: 'website' },
};

export const viewport: Viewport = {
  themeColor: '#f4ece0',
};

// Runs before first paint: marks JS as available (so entrance states apply only when they will be animated) and
// restores the visitor's chosen theme, so a dark page never flashes light.
const boot = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('sb-theme');if(t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MotionRoot />
        <PageCurtain />
      </body>
    </html>
  );
}
