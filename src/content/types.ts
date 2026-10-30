// Content schema. All copy is taken from https://www.solutionbowl.ai (retrieved 2026-10-30) and PORTFOLIO.md —
// never invented. Optional fields are omitted when the live page has no such content.

export interface Meta {
  title: string;
  description: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface Item {
  title: string;
  body?: string;
  /** Small uppercase labels shown with the item, e.g. "HIPAA-AWARE". */
  labels?: string[];
  /** Bullet points under the item. */
  points?: string[];
  /** Technology chips. */
  tags?: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  place?: string;
}

export type Section =
  | { kind: 'items'; id?: string; eyebrow?: string; title: string; intro?: string; items: Item[] }
  | { kind: 'process'; id?: string; eyebrow?: string; title: string; intro?: string; steps: { title: string; body: string; when?: string }[] }
  | { kind: 'stack'; id?: string; eyebrow?: string; title: string; intro?: string; groups: { name: string; items: string[] }[] }
  | {
      kind: 'case';
      id?: string;
      eyebrow?: string;
      title: string;
      label?: string;
      challenge?: string;
      solution?: string;
      impact: string[];
      tags?: string[];
      link?: Link;
    }
  | { kind: 'stats'; id?: string; eyebrow?: string; title?: string; items: Stat[] }
  | { kind: 'quotes'; id?: string; eyebrow?: string; title?: string; items: Testimonial[] }
  | { kind: 'text'; id?: string; eyebrow?: string; title: string; paragraphs: string[] };

export interface Faq {
  q: string;
  a: string;
}

/** A service, product or hire-developers page. */
export interface OfferingPage {
  slug: string;
  /** Short name used in navigation and cards. */
  name: string;
  meta: Meta;
  eyebrow: string;
  /** Hero headline, verbatim. */
  title: string;
  lede: string;
  /** Hero chips. */
  tags?: string[];
  /** One-sentence summary for index cards (verbatim from the page or its meta description). */
  summary: string;
  sections: Section[];
  faqs?: Faq[];
}

export interface LegalPage {
  meta: Meta;
  title: string;
  updated?: string;
  intro?: string[];
  sections: { id: string; heading: string; paragraphs?: string[]; bullets?: string[] }[];
}

export type Block =
  | { type: 'h2' | 'h3' | 'p' | 'quote'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] };

export interface BlogPost {
  slug: string;
  meta: Meta;
  category: string;
  title: string;
  excerpt: string;
  readTime?: string;
  date?: string;
  author: string;
  featured?: boolean;
  body: Block[];
}
