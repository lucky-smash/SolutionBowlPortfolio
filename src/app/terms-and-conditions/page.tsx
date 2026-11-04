import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import LegalDoc from '@/components/legal/LegalDoc';
import { terms } from '@/content/legal';

export const metadata: Metadata = pageMeta({
  title: terms.meta.title,
  description: terms.meta.description,
  path: '/terms-and-conditions',
});

export default function TermsPage() {
  return <LegalDoc page={terms} titleLines={['Terms & ', 'Conditions']} related={{ label: 'Privacy Policy', href: '/privacy-policy' }} />;
}
