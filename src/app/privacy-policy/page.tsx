import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import LegalDoc from '@/components/legal/LegalDoc';
import { privacy } from '@/content/legal';

export const metadata: Metadata = pageMeta({
  title: privacy.meta.title,
  description: privacy.meta.description,
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return <LegalDoc page={privacy} titleLines={['Privacy ', 'Policy']} related={{ label: 'Terms & Conditions', href: '/terms-and-conditions' }} />;
}
