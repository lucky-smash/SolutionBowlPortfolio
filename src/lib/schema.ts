// Site-wide schema.org entities. Every page references the Organization by @id instead of repeating it.
import { company, contact, socials } from '@/content/site';

export const ORG_ID = `${company.url}/#organization`;
const SITE_ID = `${company.url}/#website`;

export const siteJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.name,
    alternateName: 'SolutionBowl',
    legalName: company.legalName,
    url: company.url,
    logo: `${company.url}/brand/solution-bowl-logo.png`,
    description: company.tagline,
    foundingDate: '2017',
    email: contact.email,
    // WhatsApp is a contact channel, not a profile, so it stays out of sameAs.
    sameAs: socials.filter((s) => s.label !== 'WhatsApp').map((s) => s.href),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: contact.email,
      telephone: '+91-88829-58753',
    },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '3rd Floor, Unit 306, Tower B4, Spaze iTech Park, Sector 49',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        postalCode: '122018',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: 'SolutionBowl',
    url: company.url,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  },
];
