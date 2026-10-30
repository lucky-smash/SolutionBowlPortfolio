import type { Metadata } from 'next';
import LegalDoc from '@/components/legal/LegalDoc';
import { terms } from '@/content/legal';

export const metadata: Metadata = {
  title: terms.meta.title,
  description: terms.meta.description,
  alternates: { canonical: '/terms-and-conditions' },
  openGraph: { title: terms.meta.title, description: terms.meta.description, url: '/terms-and-conditions' },
};

export default function TermsPage() {
  return <LegalDoc page={terms} titleLines={['Terms & ', 'Conditions']} related={{ label: 'Privacy Policy', href: '/privacy-policy' }} />;
}
