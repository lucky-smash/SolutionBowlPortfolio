// Source: https://www.solutionbowl.ai/hire-developers — retrieved 2026-10-30. Copy is verbatim from the live page.
// Dropped: nav/footer chrome, uncaptured "0" counters (Projects Delivered, Companies Empowered, Countries Served,
// Average Client Rating), star ratings and emoji icons, CTA blocks.
import type { OfferingPage } from './types';

export const hire: OfferingPage = {
  slug: 'hire-developers',
  name: 'Hire Dedicated Developers',
  meta: {
    title: 'Hire Dedicated Developers | React, Flutter, Python, AI Engineers | SolutionBowl',
    description:
      'Hire dedicated developers from SolutionBowl AI. Vetted React, Flutter, Python, DevOps, and AI engineers. Top 3% talent. 500+ placements. Onboard in 24 hours.',
  },
  eyebrow: 'HIRE DEDICATED DEVELOPERS',
  title: 'Build Faster with Pre-Vetted Builders.',
  lede: 'Skip months of recruitment. Hire dedicated developers from SolutionBowl and get battle-tested React, Flutter, Python, Node.js, DevOps and AI engineers fully integrated into your workflow from day one. Every developer passes a 5-step technical vetting process. Only the top 3% make the cut. Onboard in 48 hours. No lock-in.',
  tags: ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI / ML', 'QA Engineers', 'Full Stack', 'Onboard in 48hrs', 'No long-term lock-in'],
  summary: 'Dedicated engineers who integrate with your team from day one.',
  sections: [
    {
      kind: 'items',
      title: 'Developer Profiles',
      items: [
        { title: 'Jogender S', body: 'Senior Laravel Developer', tags: ['React', 'Next.js', 'TypeScript'], labels: ['$45/hr', 'Available'] },
        { title: 'Akash Kumar', body: 'Senior App Developer', tags: ['Flutter', 'React Native', 'Node.js'], labels: ['$40/hr', 'Available'] },
        { title: 'Manish S', body: 'Laravel Developer', tags: ['Kubernetes', 'AWS', 'Terraform'], labels: ['$52/hr', 'Available'] },
        { title: 'Sourabh Chauhan', body: 'Senior QA Engineer', tags: ['Python', 'LangChain', 'FastAPI'], labels: ['$55/hr', 'Available'] },
      ],
    },
    {
      kind: 'text',
      title: 'Every role you need, pre-screened and ready.',
      paragraphs: [
        'Our talent pool spans 17+ specialisations. All developers have cleared a rigorous 5-step technical vetting process - only the top 3% make it through.',
      ],
    },
    {
      kind: 'stats',
      items: [
        { value: 'Top 3%', label: 'Acceptance Rate' },
        { value: '5-Step Vetting', label: 'Technical Screening' },
      ],
    },
    {
      kind: 'items',
      eyebrow: 'WHY SOLUTIONBOWL',
      title: 'Not a marketplace. A curated talent layer.',
      intro:
        "Freelancer platforms hand you a CV. We hand you a developer who's already been through 5 rounds of technical screening - and matched to your specific tech stack, timezone, and working style.",
      items: [
        { title: 'Only the Top 3% Accepted', body: 'Every developer passes coding challenges, system design, and a culture-fit interview before joining our pool.' },
        { title: 'Onboard in 48 Hours', body: 'We match you with candidates within 24 hours. Your chosen developer is ready to commit code by day two.' },
        { title: 'Free Replacement Guarantee', body: 'Not the right fit? We replace your developer at zero cost - no questions, no arguments, no downtime.' },
      ],
    },
    {
      kind: 'process',
      eyebrow: 'HOW IT WORKS',
      title: 'From brief to first commit in four simple steps.',
      intro: 'No lengthy RFPs, no CV-sifting marathons. Tell us what you need - we do the rest.',
      steps: [
        { title: 'Share Your Requirements', body: 'Fill in a short brief: tech stack, experience level, timezone, and engagement type. Takes 5 minutes.' },
        { title: 'We Match You', body: 'Within 24 hours we send you 2–3 pre-screened candidates matched precisely to your needs.' },
        { title: 'Interview & Choose', body: 'Run a technical interview or trial task. No commitment until you say yes. Typically done in a day.' },
        { title: 'Ship Together', body: 'Your developer joins your Slack, starts in your codebase, and ships their first PR within 48 hours of contract signing.' },
      ],
    },
    {
      kind: 'items',
      eyebrow: 'ENGAGEMENT MODELS',
      title: 'Flexible Engagement Models Built Around Your Growth',
      intro:
        'From startups needing a single developer to businesses building full-scale digital platforms , we provide scalable engagement models designed for speed, flexibility, and long-term technology partnerships.',
      items: [
        {
          title: 'Dedicated Developers',
          body: 'Hire Remote Developers for Your Team',
          points: [
            'Full-time dedicated developers',
            'Monthly hiring model',
            'Agile development process',
            'Direct team communication',
            'Fast onboarding',
            'Weekly progress reports',
            'Long-term development support',
          ],
        },
        {
          title: 'Managed Development Team',
          body: 'End-to-End Software Development Team',
          labels: ['Most Preferred'],
          points: [
            'Dedicated PM + Developers + QA',
            'Custom web & mobile app development',
            'UI/UX, development & deployment',
            'Scalable development team',
            'SaaS & ERP development support',
            'Transparent project management',
            'Ongoing maintenance & support',
          ],
        },
        {
          title: 'Project-Based Development',
          body: 'Custom Software Development Services',
          points: [
            'Fixed scope project delivery',
            'Milestone-based execution',
            'Web, mobile & ERP solutions',
            'Dedicated project coordination',
            'QA testing & deployment',
            'Post-launch technical support',
            'Clear timelines & deliverables',
          ],
        },
      ],
    },
    {
      kind: 'stack',
      eyebrow: 'TECHNOLOGY STACK',
      title: 'Developers fluent in every major stack and tool.',
      intro:
        "We don't force a tech stack on you. Our developers work in your environment - whatever language, framework, or cloud you're on.",
      groups: [
        { name: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Svelte', 'Storybook'] },
        { name: 'Backend', items: ['Node.js', 'Python / Django', 'Go / Golang', 'Java / Spring', 'PostgreSQL', 'GraphQL', 'FastAPI', 'REST APIs'] },
        { name: 'Mobile', items: ['Flutter', 'Swift / iOS', 'Kotlin / Android', 'React Native', 'Firebase', 'Expo'] },
        { name: 'Cloud & DevOps', items: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Grafana'] },
        { name: 'AI / ML', items: ['LangChain', 'OpenAI API', 'Anthropic Claude API', 'PyTorch', 'TensorFlow', 'RAG Pipelines', 'Hugging Face', 'LlamaIndex'] },
        { name: 'Data', items: ['PostgreSQL', 'MongoDB', 'Snowflake', 'Redis', 'Apache Kafka', 'dbt', 'Spark'] },
      ],
    },
    {
      kind: 'stats',
      items: [
        { value: '48hrs', label: 'First Commit Guaranteed' },
        { value: 'Zero Risk', label: 'Free Replacement' },
      ],
    },
    {
      kind: 'items',
      eyebrow: 'PERFORMANCE & ACCOUNTABILITY',
      title: 'Developers who deliver, not just estimate.',
      intro:
        'We hold our developers to the same standards you would - weekly sprint reviews, transparent Jira boards, and a dedicated success manager who flags risks before they become blockers.',
      items: [
        { title: 'Agile Sprint Cadence', body: 'Weekly sprints with clear goals, daily async updates, and a Friday retro to improve every week.' },
        { title: 'Dedicated Success Manager', body: 'Your named human escalation point - not a support ticket. Available same-day for anything that needs attention.' },
        { title: 'Seamless Team Integration', body: 'Your developer works in your tools from day one - Slack, Jira, GitHub, Linear, Notion. They are part of your team, not a third-party resource.' },
      ],
    },
  ],
  faqs: [
    {
      q: 'How quickly can I onboard a dedicated developer from SolutionBowl?',
      a: 'Fast. Share your requirements through our brief form and we send you 2 to 3 matched developer profiles within 24 hours. Run your interview, confirm your choice, and your developer joins your team within 48 hours of contract signing. Most clients have a developer committing code within two working days of their first conversation with us.',
    },
    {
      q: 'What happens if the developer does not work out?',
      a: 'We replace them at zero cost within 30 days. If the match is not right for any reason, notify your success manager and we begin sourcing a replacement immediately. There is no additional fee, no contractual argument, and no interruption to your sprint. Your project keeps moving.',
    },
    {
      q: 'Do your developers work in my timezone?',
      a: 'Yes. Timezone alignment is one of the first filters in our matching process. We guarantee a minimum 4-hour daily overlap with your working hours. Most developers in our pool work across IST, GST (Gulf), and standard US Eastern and Pacific timezone windows.',
    },
    {
      q: 'What is the difference between the full-time, part-time, and hourly engagement models?',
      a: 'The full-time model gives you a dedicated developer working exclusively on your product for standard working hours each week - best for ongoing product builds and long-running engineering work. The part-time model commits a developer for a defined number of hours per week or month - best for startups managing costs or teams that need augmentation rather than a full hire. The hourly model is pure pay-per-hour with no minimum commitment - best for sprint-specific work, code reviews, architectural audits, or any bounded scope where you need senior expertise without a long-term engagement.',
    },
    {
      q: 'Who manages the developer - my team or SolutionBowl?',
      a: 'Day-to-day, your team manages the developer entirely. They attend your standups, follow your sprint structure, and report to your engineering lead. SolutionBowl provides a dedicated success manager who monitors engagement health, flags delivery risks, and handles any contractual or HR matters. You get the output of a direct hire with none of the employment overhead.',
    },
    {
      q: 'Can I start with a part-time developer and scale to full time?',
      a: 'Absolutely. Engagement model changes take effect at the start of the next billing cycle. Many clients start on the part-time or hourly model to validate the fit, then convert to full-time engagement once they are confident in the developer and the working relationship. There is no penalty for changing models and no re-vetting required.',
    },
  ],
};
