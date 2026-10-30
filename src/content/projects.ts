// Portfolio content as published on https://www.solutionbowl.ai/portfolio (retrieved 2026-10-29).
// Names, descriptions, metrics and links mirror the live page; see PORTFOLIO.md (the source of truth) for notes.

export const SITE = 'https://www.solutionbowl.ai';

export type Sector =
  | 'EdTech'
  | 'FinTech'
  | 'Supply Chain'
  | 'E-Commerce'
  | 'Healthcare'
  | 'Real Estate'
  | 'Enterprise'
  | 'Media'
  | 'Mobile Apps';

export interface Project {
  id: string;
  name: string;
  /** Primary sector, shown as the card tag. */
  sector: Sector;
  /** All sectors the project is filterable under. */
  sectors: Sector[];
  /** Short descriptor under the project name. */
  descriptor: string;
  region: string;
  summary: string;
  metrics: [string, string];
  url: string;
  urlLabel: string;
  /** Extra verified link, e.g. an app store listing. */
  secondary?: { url: string; label: string };
  /** Base name of the render in /img/portfolio (without extension). */
  image?: string;
  /** Brand colour sampled from the render; floods the card on hover (see CoverReveal). */
  accent?: string;
}

export const projects: Project[] = [
  {
    id: 'dhurina',
    name: 'Dhurina',
    sector: 'EdTech',
    sectors: ['EdTech', 'Mobile Apps'],
    descriptor: 'Competitive exam preparation app',
    region: 'India',
    summary:
      'A fast, scalable learning app built for Tier 2 & 3 cities, with offline-first architecture, regional-language support and adaptive content delivery.',
    metrics: ['5M+ Play Store downloads', '#1 exam prep app in North India'],
    url: 'https://dhurina.net/en/',
    urlLabel: 'dhurina.net',
    secondary: { url: 'https://play.google.com/store/apps/details?id=com.dhurina', label: 'Google Play' },
    image: 'Dhurina3D',
    accent: '#e9973f',
  },
  {
    id: 'livfin',
    name: 'LivFin',
    sector: 'FinTech',
    sectors: ['FinTech', 'Supply Chain'],
    descriptor: 'Supply chain finance platform',
    region: 'India',
    summary:
      'A self-serve platform giving MSMEs working capital through invoice financing, discounting and receivables-based lending.',
    metrics: ['₹500Cr+ disbursals facilitated', '3x faster loan processing'],
    url: 'https://livfin.com/',
    urlLabel: 'livfin.com',
    image: 'LivFin3D',
    accent: '#0f5a47',
  },
  {
    id: 'skinmart',
    name: 'Skinmart',
    sector: 'E-Commerce',
    sectors: ['E-Commerce'],
    descriptor: 'Skincare e-commerce store',
    region: 'Australia',
    summary:
      'An online skincare store with curated global brands, expert consultation modules and a conversion-focused checkout.',
    metrics: ['2.8x conversion rate growth', '100+ brands listed'],
    url: 'https://skinmart.com.au/',
    urlLabel: 'skinmart.com.au',
    image: 'Skinmart3D',
    accent: '#d27a55',
  },
  {
    id: 'bituconnect',
    name: 'BituConnect',
    sector: 'Supply Chain',
    sectors: ['Supply Chain'],
    descriptor: 'Global procurement & trading platform',
    region: 'UAE',
    summary:
      'Procurement and commodity trading for a UAE bitumen sourcing company — RFQ management, secure transactions and end-to-end order tracking.',
    metrics: ['40% less procurement time', 'Global multi-region platform'],
    url: 'https://bituconnect.com/',
    urlLabel: 'bituconnect.com',
    image: 'BituConnect3D',
    accent: '#2f7fd8',
  },
  {
    id: 'inspire-mental-fitness',
    name: 'Inspire Mental Fitness',
    sector: 'Healthcare',
    sectors: ['Healthcare'],
    descriptor: 'Mental wellness platform',
    region: 'United States',
    summary:
      'Structured mental-training programmes that help athletes, students and professionals build focus, resilience and emotional stability.',
    metrics: ['95% user satisfaction score', '50% more session completion'],
    url: 'https://inspirementalfitness.com/',
    urlLabel: 'inspirementalfitness.com',
    image: 'InspireMentalFitness3D',
    accent: '#2d8749',
  },
  {
    id: 'joyfirst-india',
    name: 'JoyFirst India',
    sector: 'Real Estate',
    sectors: ['Real Estate'],
    descriptor: 'Real estate & PropTech platform',
    region: 'India',
    summary:
      'Commercial and residential real estate across Gurugram and Uttarakhand — brokerage, consultancy, interior design and loan assistance in one place.',
    metrics: ['3x lead generation growth', 'Multi-city platform coverage'],
    url: 'https://joyfirstindia.com/',
    urlLabel: 'joyfirstindia.com',
    image: 'JoyFirstIndiaPvtLtd3D',
    accent: '#5a9ed7',
  },
  {
    id: 'wirhe',
    name: 'WIRhE',
    sector: 'Healthcare',
    sectors: ['Healthcare'],
    descriptor: 'Global public-health foundation',
    region: 'Netherlands',
    summary:
      'A website for a foundation working to end preventable Rh disease, with dedicated sections for maternal-care professionals and families.',
    metrics: ['Audience across 30+ countries', '4x engagement uplift post-launch'],
    url: 'https://wirhe.org/',
    urlLabel: 'wirhe.org',
    image: 'WIRhE3D',
    accent: '#1a4286',
  },
  {
    id: 'tap-n-go',
    name: 'Tap-N-Go',
    sector: 'Enterprise',
    sectors: ['Enterprise'],
    descriptor: 'Service management SaaS',
    region: 'Global',
    summary: 'A service management platform with a dashboard for real-time service tracking, analytics and reporting.',
    metrics: ['60% ops efficiency improvement', 'Real-time analytics dashboard'],
    url: 'https://tap-n-go.vercel.app/Dashboard/authPages',
    urlLabel: 'tap-n-go.vercel.app',
    image: 'Tap-N-Go3D',
    accent: '#f2d531',
  },
  {
    id: 'hki-media',
    name: 'HKI Media',
    sector: 'Media',
    sectors: ['Media'],
    descriptor: 'Digital media platform',
    region: 'India',
    summary:
      'A digital platform for a growing media house, built for brand visibility, audience engagement and fast content delivery.',
    metrics: ['2x audience reach growth', '40% faster page loads'],
    url: 'https://www.hkimedia.com',
    urlLabel: 'hkimedia.com',
    image: 'HKIMEDIA3D',
    accent: '#b9392b',
  },
  {
    id: 'er-counseling',
    name: 'ER Counseling',
    sector: 'Healthcare',
    sectors: ['Healthcare'],
    descriptor: 'Online therapy practice',
    region: 'United States',
    summary:
      'A website for a Christian-based psychotherapy practice offering individual and couples therapy online, free consultations and resources.',
    metrics: ['3x consultation bookings', '98% client satisfaction'],
    url: 'https://ercounselingservices.com/',
    urlLabel: 'ercounselingservices.com',
  },
  {
    id: 'jm-cadworx',
    name: 'JM CADWORX',
    sector: 'E-Commerce',
    sectors: ['E-Commerce'],
    descriptor: 'CAD drafting & design service',
    region: 'United States',
    summary:
      'A platform for a CAD drafting service producing drawings for permitting, fabrication and construction.',
    metrics: ['48hr average delivery turnaround', '200% growth in online orders'],
    url: 'https://jmcadworx.com/',
    urlLabel: 'jmcadworx.com',
  },
  {
    id: 'appdates',
    name: 'AppDates',
    sector: 'Mobile Apps',
    sectors: ['Mobile Apps'],
    descriptor: 'Cross-platform dating app',
    region: 'Canada',
    summary: 'A multi-platform dating app, on mobile and the web, for a Canadian client.',
    metrics: ['Cross-platform iOS & Android', 'Real-time matching engine'],
    url: 'https://webapp.appdates.news/#/welcome-screen',
    urlLabel: 'webapp.appdates.news',
  },
  {
    id: 'atma-india',
    name: 'ATMA India',
    sector: 'Enterprise',
    sectors: ['Enterprise'],
    descriptor: 'Industry association website',
    region: 'India',
    summary:
      "A responsive, enterprise-grade website for the Automotive Tyre Manufacturers' Association with streamlined navigation and industry resources.",
    metrics: ['100% mobile responsive', 'Govt. compliance ready'],
    url: 'https://www.atmaindia.org.in/',
    urlLabel: 'atmaindia.org.in',
  },
  {
    id: 'droneplanet',
    name: 'DronePlanet',
    sector: 'Enterprise',
    sectors: ['Enterprise'],
    descriptor: 'B2B drone services marketplace',
    region: 'India',
    summary:
      'A B2B marketplace connecting drone operators and enterprises across aerial photography, industrial inspection and drone logistics.',
    metrics: ['500+ service providers onboarded', 'Multi-vertical marketplace'],
    url: 'https://droneplanet.in/',
    urlLabel: 'droneplanet.in',
  },
];

/** Filter order; only sectors that have at least one project are rendered. */
export const sectorOrder: Sector[] = [
  'EdTech',
  'FinTech',
  'Supply Chain',
  'E-Commerce',
  'Healthcare',
  'Real Estate',
  'Enterprise',
  'Media',
  'Mobile Apps',
];

export const apps = [
  {
    name: 'Dhurina',
    sector: 'Education Technology',
    region: 'India',
    users: '5M+',
    summary: 'Competitive exam prep for Tier 2 & 3 cities — offline-first, regional languages, adaptive content.',
    url: 'https://play.google.com/store/apps/details?id=com.dhurina',
  },
  {
    name: 'Daeem',
    sector: 'Service & Maintenance',
    region: 'Saudi Arabia',
    users: '1K+',
    summary: 'Home maintenance and professional service booking.',
    url: 'https://play.google.com/store/apps/details?id=com.daeemcustomer',
  },
  {
    name: 'LynkUp',
    sector: 'Marketing Technology',
    region: 'India',
    users: '500+',
    summary: 'Connects F&B brands with content creators to run and manage campaigns.',
    url: 'https://play.google.com/store/apps/details?id=com.lynkupapplication.android',
  },
];

/** The four projects the live portfolio hero highlights; they are the ones served from the bowl. */
export const featuredIds = ['dhurina', 'livfin', 'skinmart', 'bituconnect'] as const;
/** Highlight line for each featured project, as on the live portfolio hero. */
export const highlights: Record<(typeof featuredIds)[number], { sector: string; highlight: string }> = {
  dhurina: { sector: 'EdTech', highlight: '5M+ Downloads' },
  livfin: { sector: 'FinTech', highlight: '₹500Cr+ Disbursed' },
  skinmart: { sector: 'eCommerce', highlight: 'Australia' },
  bituconnect: { sector: 'Supply Chain', highlight: 'UAE' },
};
export const getProject = (id: string) => projects.find((p) => p.id === id);
export const portfolioIntro = {
  title: ['Real Products.', 'Measurable Impact.', 'Proven Results.'],
  tagline: 'A portfolio of shipped software with measurable business outcomes.',
  claim: '500+ live digital products across EdTech, FinTech, Healthcare, E-Commerce and Enterprise, delivered to clients in 10+ countries.',
};
