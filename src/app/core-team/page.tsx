import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { teamPage } from '@/content/company';
import { FinalCta } from '@/components/home/Sections';
import { Browse, Leadership, TeamBelief, TeamHero, TeamStats } from '@/components/company/Team';
import Doors from '@/components/company/Doors';

export const metadata: Metadata = pageMeta({
  title: teamPage.meta.title,
  description: teamPage.meta.description,
  path: '/core-team',
});

export default function CoreTeamPage() {
  const { doors } = teamPage;
  return (
    <>
      <TeamHero />
      <TeamStats />
      <TeamBelief />
      <Leadership />
      <Browse />
      <Doors id="team-doors" eyebrow={doors.eyebrow} title={doors.title} items={doors.items} />
      <FinalCta />
    </>
  );
}
