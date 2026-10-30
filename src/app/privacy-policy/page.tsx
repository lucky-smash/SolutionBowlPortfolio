import type { Metadata } from 'next';
import LegalDoc from '@/components/legal/LegalDoc';
import { privacy } from '@/content/legal';

export const metadata: Metadata = {
  title: privacy.meta.title,
  description: privacy.meta.description,
  alternates: { canonical: '/privacy-policy' },
  openGraph: { title: privacy.meta.title, description: privacy.meta.description, url: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <LegalDoc page={privacy} titleLines={['Privacy ', 'Policy']} related={{ label: 'Terms & Conditions', href: '/terms-and-conditions' }} />;
}
