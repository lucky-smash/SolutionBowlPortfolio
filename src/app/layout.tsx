import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Footer from '@/components/chrome/Footer';
import OrangeToggle from '@/components/chrome/OrangeToggle';
import MotionRoot from '@/components/motion/MotionRoot';
import PageCurtain from '@/components/motion/PageCurtain';
import JsonLd from '@/components/seo/JsonLd';
import { company, home } from '@/content/site';
import { siteJsonLd } from '@/lib/schema';
import { OG_IMAGE } from '@/lib/seo';

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
  icons: { icon: '/brand/favicon.ico', apple: '/brand/sb-symbol-512.png' },
  openGraph: { siteName: 'SolutionBowl', type: 'website', locale: 'en_US', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport: Viewport = {
  themeColor: '#0f1b35',
};

// Dark is the default and is in the server HTML, so first paint (and no-JS) is dark. Runs before first paint:
// marks JS as available (so entrance states apply only when they will be animated) and honours a visitor who
// chose the light theme, so a light page never flashes dark.
const boot = `document.documentElement.classList.add('js');try{if(localStorage.getItem('sb-theme')==='light')delete document.documentElement.dataset.theme;var o=localStorage.getItem('sb-orange');if(o==='logo'||o==='brand')document.documentElement.dataset.orange=o}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body suppressHydrationWarning>
        <JsonLd data={siteJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to main content
        </a>
        <main id="main">{children}</main>
        <Footer />
        {/* Trial: compare the site orange with the logo orange. Remove once one is chosen. */}
        <OrangeToggle className="fixed bottom-4 left-4 z-[90] shadow-lg" />
        <MotionRoot />
        <PageCurtain />
      </body>
    </html>
  );
}
