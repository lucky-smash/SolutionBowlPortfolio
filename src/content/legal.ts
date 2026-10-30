// Source: https://www.solutionbowl.ai/privacy-policy and https://www.solutionbowl.ai/terms-and-conditions — retrieved 2026-10-30.
// Copy is verbatim. LegalPage only supports paragraphs and bullets, so tables are flattened to one bullet per row
// (cells joined with " — ", prefixed with the column header where useful) and callout boxes become paragraphs.
// Section ids match the live anchors. Page order is kept (the live privacy page lists Your Rights before Security).
import type { LegalPage } from './types';

export const privacy: LegalPage = {
  meta: {
    title: 'Privacy Policy | SolutionBowl',
    description: 'Clear rules for how we collect, use, protect, and retain your data.',
  },
  title: 'Privacy Policy',
  updated: 'October 29, 2026',
  intro: [
    'Clear rules for how we collect, use, protect, and retain your data.',
    'We take your privacy seriously. This policy explains exactly what data we collect, why we collect it, how we use it, and the rights you have over your information.',
    'Governing Law: India (IT Act 2000)',
    'Language: English',
    "This Privacy Policy was last updated on October 27, 2026 and applies to all users of SolutionBowl's website, services and products.",
  ],
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      paragraphs: [
        'SolutionBowl Private Limited ("SolutionBowl", "we", "us", or "our") operates the website solutionbowl.ai and provides digital product engineering services. This Privacy Policy governs how we collect, use, store, and share information when you interact with our website, services, or communicate with our team.',
        'We are committed to protecting your personal data in accordance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 of India, along with applicable international frameworks including the General Data Protection Regulation (GDPR) where applicable.',
        "Plain English Summary: We collect only what we need. We don't sell your data. We protect what you share with us. You can ask us to delete your data at any time.",
        'By using our website or services, you consent to the practices described in this policy. If you disagree with any part of this policy, please discontinue use of our website and contact us to remove any data we may have collected.',
      ],
    },
    {
      id: 'data-collected',
      heading: 'Data We Collect',
      paragraphs: [
        'We collect information in two ways: information you provide directly, and information collected automatically when you use our website.',
        'Columns: Category — Examples — How Collected',
      ],
      bullets: [
        'Identity Data — Name, job title, company name — Contact forms, enquiry submissions',
        'Contact Data — Email address, phone number — Contact forms, direct email, call bookings',
        'Technical Data — IP address, browser type, device OS, screen resolution — Automatically via analytics tools',
        'Usage Data — Pages visited, time on site, referral source, clicks, how far you scroll, sections viewed, which form fields are used (never what you type), page load speed — Google Analytics; with your consent also Microsoft Clarity and PostHog (heatmaps and session recordings) and the Meta Pixel (ad measurement)',
        'Communications Data — Content of emails, chat messages, meeting notes — Direct communication with our team',
        'Project Data — Project briefs, requirements documents, feedback — Provided during active client engagements',
        'WARNING NOTICE: We do not collect: payment card numbers (handled by third-party processors), government ID numbers, biometric data, or sensitive personal data categories unless strictly required and explicitly consented to.',
      ],
    },
    {
      id: 'how-we-use',
      heading: 'How We Use Your Data',
      paragraphs: [
        'We use personal data only for the purposes for which it was collected, or for compatible purposes. Our legal bases for processing include legitimate interests, contractual necessity, and consent.',
        'Columns: Purpose — Legal Basis',
        'We will never use your data for automated decision-making that produces legal or similarly significant effects without your explicit consent.',
      ],
      bullets: [
        'Responding to enquiries and providing quotes — Legitimate interests / Pre-contract',
        'Delivering contracted services and projects — Contract performance',
        'Sending project updates and status communications — Contract performance',
        'Sending marketing newsletters and service updates — Consent (opt-in only)',
        'Improving website performance and user experience — Legitimate interests',
        'Analysing website traffic and optimising content — Legitimate interests',
        'Complying with legal obligations — Legal obligation',
        'Fraud prevention and security — Legitimate interests',
      ],
    },
    {
      id: 'sharing',
      heading: 'Data Sharing & Third Parties',
      paragraphs: [
        'We do not sell, rent, or trade your personal data. We share data only in these limited circumstances:',
        'Columns: Third Party — Purpose — Data Shared',
        'All third-party processors are bound by data processing agreements and are required to process your data only on our instructions and in compliance with applicable law.',
        'International transfers notice: Some third-party tools may store data outside India. Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or adequacy decisions.',
      ],
      bullets: [
        'Google Analytics & Google Ads — Website analytics and ad measurement — Usage data; anonymous and cookie-free until you accept cookies',
        'Microsoft Clarity — Heatmaps and session recordings (only after you accept) — Clicks, scrolling and page interactions; form fields and messages are masked',
        'PostHog — Product analytics, heatmaps and session recordings (only after you accept) — Clicks, scrolling and page interactions; form fields and messages are masked',
        'Meta Platforms (Meta Pixel) — Measuring our Facebook and Instagram ads (only after you accept) — Pages viewed, and that a form was sent or a phone, email or WhatsApp link was clicked; never what you type',
        'HubSpot CRM — Lead management — Name, email, company',
        'Calendly — Meeting scheduling — Name, email, timezone',
        'Notion / Linear — Project management — Project & task data',
        'AWS / Google Cloud — Hosting infrastructure — Server logs only',
        'Legal / Regulatory Bodies — Compliance obligations — As required by law',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies & Tracking',
      paragraphs: [
        'Our website uses cookies - small text files stored on your device - to improve functionality and analyse performance. You can manage cookies via your browser settings at any time.',
        'Our cookie banner works as follows. Before you make a choice, Google Analytics and Google Ads receive only anonymous, cookie-free measurements (for example, that a page was viewed or a button was clicked), with no cookies stored and no identifier for you or your device; Google uses them to estimate overall traffic and conversions. If you accept, analytics cookies are set and Microsoft Clarity and PostHog are enabled for heatmaps and session recordings, with form fields and messages masked, and the Meta Pixel measures our Facebook and Instagram ads. If you decline, no analytics or advertising data is sent.',
        'Columns: Cookie Name — Type — Purpose — Duration',
        "Essential cookies cannot be disabled as they are required for the website to function. Analytics and marketing cookies require your consent. You can withdraw consent at any time by clearing this site's cookies and site data in your browser settings; the cookie banner will then ask you again.",
      ],
      bullets: [
        '_sb_session — Essential — Maintains your session state — Session',
        '_ga, _ga_* — Analytics — Google Analytics tracking (only after you accept) — 2 years',
        '_gcl_au — Marketing — Google Ads conversion measurement (only after you accept) — 90 days',
        '_clck, _clsk — Analytics — Microsoft Clarity heatmaps and recordings (only after you accept) — 1 year / 1 day',
        'ph_*_posthog — Analytics — PostHog analytics and recordings (only after you accept) — 1 year',
        '_fbp — Marketing — Meta Pixel for ad measurement (only after you accept) — 90 days',
        '__hs_cookie_cat_pref — Analytics — HubSpot CRM visitor tracking — 13 months',
        "cookie-consent — Essential — Stores your cookie consent choice (kept in your browser's local storage) — Until you clear it",
      ],
    },
    {
      id: 'retention',
      heading: 'Data Retention',
      paragraphs: [
        'We retain your data only for as long as necessary to fulfil the purpose for which it was collected, or as required by law.',
        'Columns: Data Type — Retention Period — Reason',
        'When data is no longer needed, it is securely deleted or anonymised so it can no longer be attributed to you.',
      ],
      bullets: [
        'Financial / invoicing records — 8 years — Indian tax law compliance',
        'Marketing email data — Until unsubscribe + 30 days — Consent-based',
        'Website analytics — 26 months — Performance trend analysis',
        'Server logs — 90 days — Security monitoring',
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your Rights',
      paragraphs: [
        'Depending on your location and applicable law, you may have the following rights regarding your personal data:',
        'To exercise any of these rights, contact our Data Protection Officer at contactus@solutionbowl.com. We will respond within 30 days. We may need to verify your identity before fulfilling a request.',
        'Right to complain notice: If you believe we have mishandled your data, you have the right to lodge a complaint with the relevant supervisory authority in your jurisdiction.',
      ],
      bullets: [
        'Right of Access — Request a copy of all personal data we hold about you.',
        'Right to Rectification — Ask us to correct inaccurate or incomplete data.',
        'Right to Erasure — Request deletion of your data ("right to be forgotten").',
        'Right to Restrict — Limit how we process your data in certain circumstances.',
        'Data Portability — Receive your data in a structured, machine-readable format.',
        'Right to Object — Object to processing based on legitimate interests or direct marketing.',
      ],
    },
    {
      id: 'security',
      heading: 'Data Security',
      paragraphs: [
        'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction, or alteration. These measures include:',
        'Despite our best efforts, no transmission over the internet is completely secure. If you have reason to believe your interaction with us is no longer secure, please notify us immediately at contactus@solutionbowl.com.',
      ],
      bullets: [
        'TLS/SSL encryption for all data in transit',
        'AES-256 encryption for sensitive data at rest',
        'Role-based access controls limiting data access to authorised personnel only',
        'Regular security audits and penetration testing',
        'Multi-factor authentication on all internal systems',
        'Signed NDAs and data processing agreements with all staff and vendors',
        'Incident response plan with 72-hour breach notification protocols',
      ],
    },
    {
      id: 'children',
      heading: "Children's Privacy",
      paragraphs: [
        'Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If we become aware that a child under 18 has provided us with personal data, we will take immediate steps to delete such information.',
        'If you are a parent or guardian and believe your child has provided us with personal data, please contact us at contactus@solutionbowl.com.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to This Policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:',
        'We encourage you to review this page periodically. Continued use of our services after a policy update constitutes acceptance of the revised policy.',
      ],
      bullets: [
        'Update the "Last Updated" date at the top of this page',
        'Notify registered users by email for significant changes',
        'Display a prominent notice on our website for 30 days',
      ],
    },
    {
      id: 'contact-pp',
      heading: 'Contact Our DPO',
      paragraphs: [
        'For any privacy-related questions, requests, or concerns, please contact our Data Protection Officer:',
        'SolutionBowl Private Limited',
        'contactus@solutionbowl.com',
        '3rd Floor, Unit 306, Tower B4, Spaze iTech Park, Sector 49, Gurugram, Haryana 122018',
        'solutionbowl.ai',
        'We aim to respond to all privacy-related requests within 30 calendar days. For complex requests, we may extend this period by up to 60 days, in which case we will notify you of the extension and reasons within the initial 30-day period.',
      ],
    },
  ],
};

export const terms: LegalPage = {
  meta: {
    title: 'Terms & Conditions | SolutionBowl',
    description: "The working agreement that keeps every SolutionBowl engagement clear.",
  },
  title: 'Terms & Conditions',
  updated: 'April 9, 2026',
  intro: [
    'The working agreement that keeps every SolutionBowl engagement clear.',
    "These terms govern your use of SolutionBowl's website and services. Please read them carefully - they protect both you and us and form the foundation of every engagement.",
    'Effective Date: April 9, 2026',
    'Governing Law: India (Arbitration Act 1996)',
    'Language: English',
    'NDA signed before every project',
    '100% IP ownership to client',
    'Senior-only team, no outsourcing',
    '3-month post-launch warranty',
    'These Terms & Conditions are effective as of April 9, 2026. By accessing our website or engaging our services, you agree to be bound by these terms.',
  ],
  sections: [
    {
      id: 'acceptance',
      heading: 'Acceptance of Terms',
      paragraphs: [
        'By accessing or using the SolutionBowl website (solutionbowl.ai) or engaging SolutionBowl Private Limited for any professional services, you ("Client", "you") agree to be legally bound by these Terms & Conditions ("Terms"), our Privacy Policy, and any specific Statement of Work or Service Agreement executed between the parties.',
        'If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity. If you do not have such authority, you must not accept these Terms or use our services.',
        'These Terms form part of a legally binding contract. We strongly recommend reading them fully before engaging our services. If you have questions, contact us before proceeding.',
        'SolutionBowl reserves the right to update these Terms at any time. Material changes will be communicated via email to registered clients or displayed prominently on the website. Continued use of our services after such notification constitutes acceptance.',
      ],
    },
    {
      id: 'definitions',
      heading: 'Definitions',
      paragraphs: ['Columns: Term — Definition'],
      bullets: [
        '"SolutionBowl" — SolutionBowl Private Limited, a company registered in India, and its employees, contractors, and affiliates.',
        '"Client" — Any individual, company, or entity that accesses the website or purchases services from SolutionBowl.',
        '"Services" — Software development, design, consulting, maintenance, and any other digital services provided by SolutionBowl.',
        '"Deliverables" — The specific outputs, code, designs, documents, or other materials produced as part of a project.',
        '"SOW" — Statement of Work - the specific agreement detailing scope, timeline, and fees for a project.',
        '"Confidential Information" — Any non-public information disclosed by either party in connection with the engagement.',
        '"Background IP" — Intellectual property owned by SolutionBowl prior to, or independently of, the engagement.',
        '"Project IP" — All intellectual property created specifically for the Client as part of a paid engagement.',
      ],
    },
    {
      id: 'services',
      heading: 'Our Services & Website Use',
      paragraphs: [
        'SolutionBowl provides digital product engineering services including but not limited to mobile app development, web development, AI/ML integration, UX design, DevOps, QA testing, and ongoing maintenance. Specific service details, scope, timelines, and fees are defined in individual Statements of Work.',
        'With respect to our website, you agree to use it only for lawful purposes and in accordance with these Terms. You must not:',
      ],
      bullets: [
        'You May — Browse and access publicly available content',
        'You May — Submit enquiries and contact forms',
        'You May — Download publicly shared resources',
        'You May — Share links to our pages',
        'You Must Not — Scrape, crawl, or harvest data without consent',
        'You Must Not — Attempt to gain unauthorised access',
        'You Must Not — Transmit malware or malicious code',
        'You Must Not — Use the site in any unlawful manner',
      ],
    },
    {
      id: 'client-obligations',
      heading: 'Client Obligations',
      paragraphs: [
        'The success of every project depends on active client participation. By engaging SolutionBowl, you agree to:',
        'Project delays caused by delayed client feedback, approvals, or content delivery are not the responsibility of SolutionBowl. Timeline estimates are based on the assumption of timely client collaboration. Significant delays may require re-scoping and revised timelines.',
      ],
      bullets: [
        'Provide complete, accurate, and timely information, content, and feedback required for the project',
        'Appoint a named point of contact with authority to approve decisions and sign-offs',
        'Review and approve deliverables within the agreed review windows (typically 5 business days per sprint)',
        'Ensure all third-party assets, licenses, or content you provide are legally cleared for use',
        'Make payments according to the agreed schedule in the SOW',
        'Provide access to necessary systems, credentials, or platforms required for the engagement',
      ],
    },
    {
      id: 'ip',
      heading: 'Intellectual Property',
      paragraphs: [
        'Intellectual property ownership is one of the most important aspects of any software engagement. Here is our clear position:',
        'IP Ownership - Clearly Stated',
        'Transfer of Project IP is conditional upon full payment of all invoices. Until final payment is received, SolutionBowl retains all rights to the deliverables. We reserve the right to use non-identifiable portions of work for our portfolio unless agreed otherwise in writing.',
        "SolutionBowl's name, logo, trademarks, and website content are protected. You must not use them without prior written consent.",
      ],
      bullets: [
        'Project IP → Client — All code, designs and deliverables created for your project are fully transferred to you upon final payment.',
        'Background IP → SolutionBowl — Pre-existing frameworks, tools, and libraries we bring to the project remain ours, but you get a perpetual license to use them.',
        'NDA Signed First — A mutual NDA is signed before any discovery call or project discussion, protecting your ideas from day one.',
        'Full Source Handover — Complete source code, design files, documentation, and credentials are handed over at project completion.',
      ],
    },
    {
      id: 'payment',
      heading: 'Payment Terms',
      paragraphs: [
        'All payment terms are defined in the specific Statement of Work. General payment policies are as follows:',
        'Columns: Policy — Details',
        'Transparency commitment: We will never invoice for scope not agreed in writing. Any change in scope requires a signed Change Order before work begins.',
      ],
      bullets: [
        'Invoicing — Invoices are issued at project milestones as defined in the SOW. A standard structure is 30% upfront, milestone-based payments, and 20% on final delivery.',
        'Payment Due — Invoices are payable within 14 days of issue unless otherwise agreed in writing.',
        'Late Payment — Overdue invoices accrue interest at 1.5% per month from the due date. SolutionBowl may pause work after 7 days of non-payment without penalty.',
        'Currency — Invoices issued in INR for Indian clients, USD/GBP/AED for international clients as per the SOW.',
        'Taxes — Applicable GST is charged on all invoices to Indian clients. International clients are responsible for their local tax obligations.',
        'Refunds — Payments for completed milestones are non-refundable. Disputes must be raised within 7 days of invoice receipt.',
      ],
    },
    {
      id: 'confidentiality',
      heading: 'Confidentiality & NDA',
      paragraphs: [
        'Both parties agree to keep confidential all non-public information disclosed during and after the engagement. This obligation survives termination of the contract for a period of 5 years.',
        'Confidential information includes but is not limited to: business plans, financial data, product roadmaps, technical specifications, customer data, pricing, and any other information marked as confidential or that a reasonable person would consider confidential.',
        'Confidentiality does not apply to information that:',
        'All SolutionBowl employees, contractors, and vendors involved in your project sign individual NDAs as part of their engagement. Your project information is never shared beyond those with a need to know.',
      ],
      bullets: [
        'Was already in the public domain at the time of disclosure',
        'Becomes publicly known through no fault of the receiving party',
        'Was independently developed without reference to the confidential information',
        'Is required to be disclosed by law or court order (with notice given where legally permitted)',
      ],
    },
    {
      id: 'warranties',
      heading: 'Warranties & Post-Launch Support',
      paragraphs: [
        'SolutionBowl warrants that all deliverables will:',
        'Post-Launch Warranty: All software projects include a 3-month warranty period commencing on the date of production launch. During this period, we will fix defects - defined as functionality that does not perform as specified in the SOW - at no additional cost. This excludes changes in requirements, third-party platform changes, or user-caused issues.',
        'Disclaimer: SolutionBowl does not warrant that the website or deliverables will be completely error-free, uninterrupted, or free from security vulnerabilities that arise from the broader ecosystem. We warrant only that we will exercise reasonable skill and care in our work.',
      ],
      bullets: [
        'Be created with reasonable skill and care by qualified professionals',
        'Conform materially to the specifications agreed in the SOW at the time of delivery',
        'Not knowingly infringe any third-party intellectual property rights',
      ],
    },
    {
      id: 'liability',
      heading: 'Limitation of Liability',
      paragraphs: [
        "To the maximum extent permitted by applicable law, SolutionBowl's total liability to the Client for any and all claims arising out of or related to the services shall not exceed the total fees paid by the Client to SolutionBowl in the twelve (12) months preceding the claim.",
        'SolutionBowl shall not be liable for any:',
        'Nothing in these Terms excludes liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under applicable law.',
      ],
      bullets: [
        'Indirect, incidental, special, or consequential damages',
        'Loss of profits, revenue, data, goodwill, or business opportunities',
        'Damages arising from third-party services, APIs, or platforms',
        'Delays caused by client-side factors including late feedback or content delivery',
        'Force majeure events including natural disasters, government actions, or internet outages',
      ],
    },
    {
      id: 'termination',
      heading: 'Termination & Project Cancellation',
      paragraphs: [
        'Either party may terminate a project engagement in the following circumstances:',
        'Columns: Scenario — Notice Required — Financial Consequence',
        'Upon termination, SolutionBowl will deliver all completed work and materials to the Client, subject to payment of all outstanding invoices. Clauses relating to confidentiality, IP, and liability survive termination indefinitely.',
      ],
      bullets: [
        'Client terminates for convenience — 14 days written notice — Client pays for all work completed to date plus a 15% early termination fee on remaining contracted value',
        'SolutionBowl terminates for convenience — 30 days written notice — SolutionBowl refunds any prepaid amounts for work not yet started',
        'Client material breach (e.g. non-payment) — 7 days cure notice — Client owes all outstanding amounts; IP rights revert to SolutionBowl',
        'SolutionBowl material breach — 14 days cure notice — Client may receive partial refund for undelivered milestones',
        'Mutual agreement — As agreed in writing — As agreed in writing',
      ],
    },
    {
      id: 'dispute',
      heading: 'Dispute Resolution',
      paragraphs: [
        'We believe most disputes can be resolved through honest dialogue. Our preferred process is:',
        'These Terms are governed by the laws of India. Nothing in this clause prevents either party from seeking urgent injunctive or interim relief from a competent court.',
      ],
      bullets: [
        'Good Faith Negotiation (30 days) — Either party notifies the other in writing. Senior representatives meet within 10 business days to resolve in good faith.',
        'Mediation — If negotiation fails, parties agree to attempt mediation through a mutually agreed mediator before initiating arbitration.',
        'Binding Arbitration — Disputes not resolved by mediation shall be finally settled by binding arbitration under the Arbitration and Conciliation Act, 1996 in Gurugram, Haryana, India.',
      ],
    },
    {
      id: 'general-tc',
      heading: 'General Provisions',
      paragraphs: ['Columns: Provision — Details'],
      bullets: [
        'Entire Agreement — These Terms, together with any SOW and NDA, constitute the entire agreement between the parties and supersede all prior communications.',
        "Amendments — Changes to these Terms require written agreement from both parties. SolutionBowl may update website Terms unilaterally with 30 days' notice.",
        'Severability — If any provision is found unenforceable, the remaining provisions continue in full force and effect.',
        'Waiver — Failure to enforce any provision does not constitute a waiver of the right to enforce it in the future.',
        'Assignment — SolutionBowl may assign these Terms to a successor entity. Clients may not assign without prior written consent.',
        'Relationship — SolutionBowl is an independent contractor. Nothing creates a partnership, joint venture, employment, or agency relationship.',
        'Force Majeure — Neither party is liable for delays caused by events outside their reasonable control, including natural disasters, pandemics, or government actions.',
        'Notices — All formal notices must be in writing via email (with read receipt) or registered post to the addresses in the SOW.',
      ],
    },
  ],
};
