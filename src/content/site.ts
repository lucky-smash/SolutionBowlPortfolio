// Site-wide facts and navigation, from https://www.solutionbowl.ai (retrieved 2026-10-30) and PORTFOLIO.md.
import { serviceGroups, services } from './services';
import { products } from './products';

export const company = {
  name: 'Solution Bowl',
  legalName: 'Solution Bowl (India) Private Limited',
  tagline: 'Your end-to-end AI and digital engineering partner.',
  registration: 'Registered in India · DPIIT Recognised Startup',
  since: 'Digital excellence since 2017',
  url: 'https://www.solutionbowl.ai',
};

export const contact = {
  email: 'contactus@solutionbowl.com',
  whatsapp: { label: '+91 88829 58753', href: 'https://wa.me/918882958753' },
  responseTime: 'Avg. reply within 4 working hours',
  nda: "We're Happy to Sign an NDA Before Project Discussions",
};

export const offices = [
  {
    city: 'Gurugram, India',
    lines: ['3rd Floor, Unit 306, Tower B4,', 'Spaze iTech Park, Sector 49,', 'Gurugram, Haryana 122018'],
  },
  {
    city: 'Dubai, UAE',
    lines: ['Meydan Grandstand, 6th Floor,', 'Meydan Road, Nad Al Sheba,', 'Dubai, United Arab Emirates'],
  },
];

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/solution-bowl/' },
  { label: 'Instagram', href: 'https://www.instagram.com/solution_bowl/' },
  { label: 'WhatsApp', href: 'https://wa.me/918882958753' },
];

export type NavLink = { label: string; href: string; note?: string };

export const nav = {
  services: serviceGroups.map((g) => ({
    name: g.name,
    links: g.slugs.map((slug): NavLink => {
      const s = services.find((x) => x.slug === slug)!;
      return { label: s.name, href: `/services/${slug}` };
    }),
  })),
  products: products.map((p): NavLink => ({ label: p.name, href: `/products/${p.slug}` })),
  about: [
    { label: 'About Solution Bowl', href: '/about' },
    { label: 'Core Team', href: '/core-team' },
    { label: 'Life at Solution Bowl', href: '/life-at-solutionbowl' },
  ] as NavLink[],
  primary: [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Hire Developers', href: '/hire-developers' },
  ] as NavLink[],
  cta: { label: 'Get Expert Advice', href: '/contact' },
};

/** Headline statistics as published on the home page. */
export const headlineStats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '300+', label: 'Companies Empowered' },
  { value: '10+', label: 'Countries Served' },
  { value: '4.9★', label: 'Average Client Rating' },
];

export const home = {
  meta: {
    title: 'AI Development and Automation Company | SolutionBowl.ai',
    description:
      'AI-powered software, intelligent automation, and enterprise platforms for startups and enterprises across the Middle East, the US, the UK, and global markets.',
  },
  eyebrow: 'Digital excellence since 2017',
  title: ['AI Systems That', 'Automate, Integrate', '& Scale Your Business'],
  lede: 'We build AI-powered software, intelligent automation, enterprise platforms, and scalable digital products for startups and enterprises across the Middle East, the US, the UK, and global markets.',
  chips: ['AI & ML', 'Mobile Apps', 'Web Dev', 'Cloud', 'SaaS'],
  ctas: [
    { label: 'Book a Strategy Call', href: '/contact#contact-form' },
    { label: 'View Our Work', href: '/portfolio' },
  ],
  proof: ['500+ Projects Delivered', '4.9 ★ Client Rating'],
  caseStudies: {
    eyebrow: 'Case studies',
    title: ['Real Products.', 'Real Results.'],
    intro:
      'Success stories that showcase our expertise in building scalable digital products, AI systems, and enterprise technology solutions for modern businesses.',
  },
  cta: {
    eyebrow: 'Have a project?',
    title: ["Let's Build Something", 'That Scales.'],
    body: "Speak with our strategy team. We'll map your product roadmap, recommend the right tech and AI stack, and give you a realistic quote.",
    points: [
      'Senior architect on every discovery call - no sales reps',
      'NDA signed before we discuss your idea',
      'Fixed-price quotes with milestone-based billing',
      'Response within 4 working hours',
    ],
  },
};
