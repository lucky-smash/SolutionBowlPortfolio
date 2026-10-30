// Company pages content: About, Core Team, Life at Solution Bowl, Contact, and home-page extras.
// Sources (https://www.solutionbowl.ai): /about, /core-team, /life-at-solutionbowl, /contact, and the home page
// (testimonials, FAQ, stats, why-us, process, industries, AI studio, capabilities blocks). Retrieved 2026-10-30.
// All copy is verbatim from the live pages (repeated marquee/carousel renders removed).
import type { Meta, Testimonial, Faq, Stat, Item } from './types';

/* ------------------------------------------------------------------ About */

export interface AboutPage {
  meta: Meta;
  hero: { title: string[]; lede: string; tagline: string };
  belief: { eyebrow: string; title: string[]; body: string };
  founder: { name: string; role: string; quote: string; linkedin?: string };
  virtues: {
    eyebrow: string;
    title: string;
    intro: string[];
    stats: Stat[];
    items: { n: string; title: string; body: string }[];
  };
  journey: {
    eyebrow: string;
    title: string;
    intro: string;
    milestones: { year: string; text: string }[];
  };
  difference: {
    title: string;
    intro: string;
    dna: { eyebrow: string; title: string; body: string; points: Item[] };
    principles: Item[];
  };
  testimonials: Testimonial[];
  next: {
    eyebrow: string;
    title: string;
    doors: { label: string; title: string; body: string; href: string }[];
  };
}

export const aboutPage: AboutPage = {
  meta: {
    title: 'About Our AI and Product Engineering Company | SolutionBowl',
    description:
      'DPIIT-registered AI and digital product engineering company. Senior engineering expertise, AI-first innovation, and proven delivery across India, Middle East, and US markets.',
  },
  hero: {
    title: ['We engineer', 'AI-native products', 'for ambitious teams.'],
    lede: 'A DPIIT-registered AI and digital product engineering company. Built in Gurugram since 2017, shipping work to India, the Middle East, and the United States.',
    tagline: 'Senior engineers building practical AI, automation, and software systems.',
  },
  belief: {
    eyebrow: 'WHAT WE BELIEVE',
    title: [
      'Most firms measure success by sprint velocity.',
      'We measure it by whether the product moved the business forward.',
    ],
    body: 'From day one, we align around your commercial goals, conversion metrics, churn numbers, cost of acquisition, and build technology that actually addresses them.',
  },
  founder: {
    name: 'Mohit Narang',
    role: 'CEO & FOUNDER',
    quote: "We don't measure ourselves by the code we ship. We measure ourselves by the businesses we move forward.",
    linkedin: 'https://www.linkedin.com/in/mohitnarangg-solutionbowl/',
  },
  virtues: {
    eyebrow: 'OUR VIRTUES',
    title: 'Built on more than code.',
    intro: [
      'Five virtues that shape how we engineer products, partner with teams, and keep showing up long after launch.',
      "Each is small enough to test against any single decision, and big enough to feel in the work we ship. They're not statements on a wall; they're the operating system behind every architecture choice, every sprint, every client conversation.",
    ],
    stats: [
      { value: '~10', label: 'YEARS BUILDING' },
      { value: '100+', label: 'BRANDS SHIPPED' },
      { value: 'DPIIT', label: 'REGISTERED' },
    ],
    items: [
      { n: '01', title: 'Innovation', body: 'Bold ideas, future-ready solutions built with creativity and purpose.' },
      { n: '02', title: 'Equanimity', body: 'Grounded, composed, solution-focused through every challenge.' },
      { n: '03', title: 'Even-Sightedness', body: 'Every perspective valued, fairness, respect, and inclusivity by default.' },
      { n: '04', title: 'Growth', body: 'Continuous learning and collective progress as a team.' },
      { n: '05', title: 'Ownership', body: 'Responsibility with integrity, accountability, and excellence.' },
    ],
  },
  journey: {
    eyebrow: 'OUR JOURNEY',
    title: 'Years of Execution, Innovation & Impact',
    intro:
      'From four people and a clear purpose in Gurgaon to delivering AI-powered workflow automation for 7 Indian Army engineering units, every year added a new capability, a new market, and a new milestone.',
    milestones: [
      {
        year: '2017',
        text: 'Solution Bowl was founded in 2017 with a team of 4, operating from a small office in Old Gurgaon. What started with pure execution and problem-solving soon evolved into a vision to become a trusted end-to-end technology partner for growing businesses.',
      },
      {
        year: '2018',
        text: "With a focused approach, we built our first trusted network of service partners and onboarded early clients like ATMA. This milestone marked the launch of our first client application and laid the foundation for Solution Bowl's journey. By solving real business challenges with precision, transparency, and consistent delivery, we started building relationships driven by trust, not just promises.",
      },
      {
        year: '2019',
        text: 'As Solution Bowl entered its growth phase, we realized the right team would shape our future. During a placement drive at MDU Rohtak, we discovered talented individuals who aligned with our vision, and even today, they remain key pillars of our journey and growth.',
      },
      {
        year: '2020',
        text: 'We built our first in-house EdTech product and got the opportunity to pitch it before foreign investors and venture capitalists. What started as an early vision for digital learning eventually evolved into a platform ecosystem reaching over 5 million+ downloads today.',
      },
      {
        year: '2021',
        text: "Solution Bowl earned the trust to work on its first B2G project with the Haryana Government. This milestone was further honored when our efforts were recognized by Hon'ble Governor of Haryana, Shri Bandaru Dattatreya Ji, marking a proud moment in our journey.",
      },
      {
        year: '2022',
        text: "As Solution Bowl's work in the education and technology space continued to gain recognition, our founder was invited as an emerging tech voice at an education conclave and national media discussion on the future of learning and digital transformation in education.",
      },
      {
        year: '2023',
        text: 'In 2023, one of the platforms we proudly continue to power crossed 1 million+ downloads, turning years of late nights, relentless execution, and shared belief into a milestone worth celebrating. For the entire Solution Bowl team, it was more than growth in numbers; it was proof that the products we build can truly create impact at scale.',
      },
      {
        year: '2024',
        text: "Delivering our first government project with MIDC Shillong marked our bold entry into the B2G sector, leading one of the biggest and most ambitious missions to digitally transform Meghalaya's industrial ecosystem at scale.",
      },
      {
        year: '2025',
        text: 'In 2025, we inaugurated our new office, a milestone that turned years of hustle from a small rented one-room setup into a space built by a stronger team, bigger ambitions, and 500+ successfully delivered projects.',
      },
      {
        year: '2026',
        text: 'What started as a vision has now become a force driven by innovation, ambition, and a fearless team shaping the future together. In 2026, Solution Bowl stands stronger than ever, building impactful technology, expanding global footprints, and transforming bold ideas into scalable AI powered digital realities.',
      },
    ],
  },
  difference: {
    title: 'Why SolutionBowl Is a Different Partner.',
    intro:
      'Future-ready engineering, long-term partnership, global scale, and people-driven innovation, the four operating principles behind every product we ship.',
    dna: {
      eyebrow: 'SOLUTIONBOWL DNA',
      title: 'We engineer products. And the team that delivers them.',
      body: 'Our delivery model wraps senior engineering around every project. Strategy, architecture, AI experimentation, and post-launch ownership all under one roof, so clients get a partner that compounds value, not a vendor that disappears after launch.',
      points: [
        {
          title: 'Senior-led teams',
          body: 'Architects, AI engineers, and lead designers stay on every project from day one to launch, no junior handoffs.',
        },
        {
          title: 'One team, end to end',
          body: 'Strategy, design, engineering, AI, QA, and DevOps under one roof. Plans align before sprint one.',
        },
        {
          title: 'Built for the long road',
          body: 'We stay engaged after launch so your product compounds, not stagnates the day the contract ends.',
        },
      ],
    },
    principles: [
      {
        title: 'Future-Ready Engineering',
        body: 'We build scalable AI-powered digital products using modern technologies, cloud-native architecture, and intelligent automation.',
      },
      {
        title: 'Beyond Development',
        body: 'From product strategy to deployment and scaling, we act as your long-term technology and digital transformation partner.',
      },
      {
        title: 'Built To Scale Globally',
        body: 'Our enterprise software solutions are designed for global markets, high performance, security, and future business growth.',
      },
      {
        title: 'People-Driven Innovation',
        body: 'A team of engineers, designers, and AI innovators passionate about building impactful software solutions for modern businesses.',
      },
    ],
  },
  testimonials: [
    {
      quote:
        'They asked harder questions in the first week than our previous vendor asked all quarter. The product shipped on the day they committed to in week one.',
      name: 'Russ Merritt',
      role: 'Founder, Client Engagement',
      place: 'C3 Film Guide',
    },
    {
      quote:
        "What stood out wasn't the engineering, that's table stakes. It was the willingness to push back on requirements that wouldn't actually move our numbers.",
      name: 'Jarrett Marcum',
      role: 'Operations Lead',
      place: 'Independent',
    },
    {
      quote:
        'Working with SolutionBowl on the ATMA website project was an excellent experience. The team understood the requirements clearly and translated them into a professional, responsive WordPress website that perfectly represents the association.',
      name: 'Pankaj Sukhija',
      role: 'ATMA',
      place: 'India',
    },
    {
      quote:
        'Strong technical knowledge, professionalism, and attention to detail throughout the project. From theme customization to plugin integration and performance optimization, everything was handled efficiently and delivered on time.',
      name: 'SK',
      role: 'Founder',
      place: 'Dubai, UAE',
    },
    {
      quote:
        'Working with SolutionBowl on our website Ethos Education World was a wonderful experience. They quickly understood our vision and delivered a clean, modern, and user-friendly site.',
      name: 'Saurabh Taluja',
      role: 'Ethos Education',
      place: 'India',
    },
    {
      quote:
        'Solution Bowl delivered a clean and professional 5-page website review with valuable insights and clear recommendations. Their team was responsive, detail-oriented, and easy to work with throughout the process.',
      name: 'Jarrett Marcum',
      role: 'Client',
      place: 'Philippines',
    },
    {
      quote:
        'SolutionBowl is a solid service provider. I will not hesitate to work with them again for any similar website development projects. Recommended!',
      name: 'C3 Film Guide',
      role: 'Founder',
      place: 'USA',
    },
    {
      quote:
        'Thank you SolutionBowl for setting up and fixing issues on my WordPress site. Quick turnaround and a professional engagement throughout.',
      name: 'Russ Merritt',
      role: 'Business Owner',
      place: 'Jordan',
    },
  ],
  next: {
    eyebrow: 'WHERE TO GO NEXT',
    title: 'Three doors. Pick the one that matches your next step.',
    doors: [
      {
        label: 'TEAM',
        title: 'Meet the people behind the work',
        body: 'Leadership, engineering, AI & growth, the team that actually ships.',
        href: '/core-team',
      },
      {
        label: 'LIFE',
        title: 'Life at Solution Bowl',
        body: 'Rituals, off-sites, hack days, and the offices in Gurugram and Dubai.',
        href: '/life-at-solutionbowl',
      },
      {
        label: 'CONTACT',
        title: 'Have a project? Let’s scope it.',
        body: 'Reply within 1 business day. No sales reps, talk to a senior architect.',
        href: '/contact',
      },
    ],
  },
};

/* ------------------------------------------------------------------- Team */

export interface TeamMember {
  name: string;
  role: string;
  /** Group label as shown on the page ("Leadership", "Engineering & AI", "Growth"). */
  group?: string;
  bio?: string;
  /** Absolute live URL of the photo. A local copy lives in /public/img/team/<kebab-name>.webp. */
  photo?: string;
  linkedin?: string;
}

export interface TeamPage {
  meta: Meta;
  eyebrow?: string;
  title: string[];
  lede?: string;
  stats: Stat[];
  tagline?: string;
  belief: { eyebrow: string; title: string[]; points: { n: string; title: string; body: string }[] };
  leadership: { eyebrow: string; title: string };
  browse: { eyebrow: string; title: string[]; intro: string; filters: { label: string; count: string }[] };
  members: TeamMember[];
  doors: { eyebrow: string; title: string; items: { label: string; title: string; body: string; cta: string; href: string }[] };
}

const T = 'https://www.solutionbowl.ai/img/team/';

export const teamPage: TeamPage = {
  meta: {
    title: 'Core Team | Solution Bowl - Meet the Architects of Intelligent Technology',
    description:
      'Meet the engineers, strategists, designers and AI specialists building Solution Bowl. A collective shipping AI-native products across India, the Middle East and the US.',
  },
  eyebrow: 'THE CORE TEAM',
  title: ['Meet the', 'architects', 'of intelligent technology.'],
  lede: 'What started as a small vision has grown into a collective of engineers, strategists, creators and innovators building impactful digital experiences together. Every solution we ship is powered by people who never stop learning, evolving and pushing boundaries.',
  stats: [
    { value: '500+', label: 'PROJECTS DELIVERED' },
    { value: '10+', label: 'COUNTRIES SERVED' },
    { value: '99.9%', label: 'UPTIME SLA' },
    { value: '3×', label: 'AVG. CLIENT ROI' },
  ],
  tagline: 'A senior product engineering team built for accountable delivery.',
  belief: {
    eyebrow: 'OUR OPERATING BELIEF',
    title: [
      "We don't hire roles.",
      "We hire people who treat the craft like it's theirs,",
      'curious enough to ask, sharp enough to ship, patient enough to stay after launch.',
    ],
    points: [
      {
        n: '01',
        title: 'Senior by default',
        body: 'Every account is led by an engineer who has shipped your stack in production before. No junior-on-the-front pattern.',
      },
      {
        n: '02',
        title: 'Cross-craft by design',
        body: 'Engineers, designers, AI specialists and strategists sit in the same standup. No handoffs. No translation losses.',
      },
      {
        n: '03',
        title: 'Accountable past launch',
        body: "The team that built it is the team you reach a year later. That's the promise, and it shows up in our retention.",
      },
    ],
  },
  leadership: { eyebrow: 'LEADERSHIP', title: 'The founding bench, and the operating engine behind it.' },
  browse: {
    eyebrow: 'BROWSE BY CRAFT',
    title: ['Two teams.', 'One team that ships.'],
    intro:
      'Engineers, AI specialists and QA on one side. Growth, design, content and HR on the other, sharing the same standup.',
    filters: [
      { label: 'All', count: '16' },
      { label: 'Engineering & AI', count: '12' },
      { label: 'Growth', count: '4' },
    ],
  },
  members: [
    { name: 'Mohit Narang', role: 'Founder & CEO', group: 'Leadership', photo: T + 'mohit-narang.webp', linkedin: 'https://www.linkedin.com/in/mohitnarangg-solutionbowl/' },
    { name: 'Gourav Kumar', role: 'Chief Operating Officer', group: 'Leadership', photo: T + 'gourav.webp', linkedin: 'https://www.linkedin.com/in/gourav-solutionbowl/' },
    { name: 'Jattin Kumar', role: 'Chief Technology Officer', group: 'Leadership', photo: T + 'jattin.webp', linkedin: 'https://www.linkedin.com/in/jattin-kumar-57910a158/' },
    { name: 'Maya Sharma', role: 'Vice President', group: 'Leadership', photo: T + 'maya.webp', linkedin: 'https://www.linkedin.com/in/maya-r-sharma/' },
    { name: 'Jogender S', role: 'Senior Laravel Developer', group: 'Engineering & AI', photo: T + 'jogender.webp' },
    { name: 'Pankaj B', role: 'Senior Full Stack Developer', group: 'Engineering & AI', photo: T + 'pankaj.webp' },
    { name: 'Mohit Kapoor', role: 'Senior Forward Deployed AI Engineer', group: 'Engineering & AI', photo: T + 'mohit-kapoor.webp' },
    { name: 'Akash', role: 'Senior Mobile App & AI Solutions Developer', group: 'Engineering & AI', photo: T + 'akash.webp' },
    { name: 'Sourabh Chauhan', role: 'Senior QA Engineer', group: 'Engineering & AI', photo: T + 'sourabh.webp' },
    { name: 'Taniya Rajpal', role: 'Senior Business Development Manager', group: 'Growth', photo: T + 'tania.webp' },
    { name: 'Jyoti Mohar', role: 'Senior Frontend Engineer', group: 'Engineering & AI', photo: T + 'jyotiMohar.webp' },
    { name: 'Sunil', role: 'Associate Software Developer', group: 'Engineering & AI', photo: T + 'sunil.webp' },
    { name: 'Varinder Kaur', role: 'Senior React Developer', group: 'Engineering & AI', photo: T + 'varinderKaur.webp' },
    { name: 'Keshav', role: 'AI Research & Automation Executive', group: 'Engineering & AI', photo: T + 'keshav.webp' },
    { name: 'Manya', role: 'AI Innovation Associate', group: 'Engineering & AI', photo: T + 'manya.webp' },
    { name: 'Amit Mishra', role: 'AI Innovation Associate', group: 'Engineering & AI', photo: T + 'amit.webp' },
    { name: 'Manish S', role: 'Laravel Developer', group: 'Engineering & AI', photo: T + 'manish.webp' },
    { name: 'Eva Ratti', role: 'AI & Automation Intern', group: 'Growth', photo: T + 'eva.webp' },
    { name: 'Shubham Gussain', role: 'Creative Content Specialist', group: 'Growth', photo: T + 'shubham.webp' },
    { name: 'Sejal Sharma', role: 'Executive- Finance & Ops', group: 'Growth', photo: T + 'sejal.webp' },
  ],
  doors: {
    eyebrow: 'THREE DOORS IN',
    title: 'Where do you want to go next?',
    items: [
      {
        label: 'CULTURE & RITUALS',
        title: 'Life at Solution Bowl',
        body: 'See how the team actually works, the rituals, the offices, the candid moments behind every shipped product.',
        cta: 'Step inside',
        href: '/life-at-solutionbowl',
      },
      {
        label: 'CAREERS',
        title: 'Apply for a role',
        body: "Engineers, designers, AI specialists, strategists. Open roles refresh monthly. Send your work and we'll respond personally.",
        cta: 'See open roles',
        href: 'https://www.linkedin.com/company/solution-bowl/jobs/?viewAsMember=true',
      },
      {
        label: 'STRATEGY',
        title: 'Book a call with a senior engineer',
        body: '30 minutes with someone who has actually shipped your stack. No discovery-call theatre, no junior-on-the-front pattern.',
        cta: 'Pick a time',
        href: '/contact?intent=strategy',
      },
    ],
  },
};

/* ------------------------------------------------------------------- Life */

export interface LifePage {
  meta: Meta;
  hero: {
    eyebrow: string;
    title: string[];
    lede: string;
    ctas: { label: string; href: string }[];
    tagline: string;
  };
  chapters: {
    eyebrow: string;
    title: string[];
    intro: string;
    items: { n: string; label: string; title: string; body: string; counter: string }[];
  };
  moments: { eyebrow: string; title: string; intro: string };
  quote: { eyebrow: string; text: string };
  join: {
    eyebrow: string;
    title: string[];
    intro: string;
    cta: { label: string; href: string };
    steps: { n: string; title: string; body: string }[];
  };
  invitation: {
    eyebrow: string;
    title: string;
    body: string;
    cta: { label: string; href: string };
    links: { label: string; title: string; href: string }[];
  };
  photos?: { src: string; alt: string }[];
}

const L = 'https://www.solutionbowl.ai/img/life-gallery/';

export const lifePage: LifePage = {
  meta: {
    title: 'Life at Solution Bowl | Our People Are Our Greatest Technology',
    description:
      'Inside Solution Bowl - rituals, offices, growth and the candid moments behind every product we ship. Across India, the Middle East and the US.',
  },
  hero: {
    eyebrow: 'LIFE AT SOLUTION BOWL',
    title: ['Our people are', 'our greatest', 'technology.'],
    lede: 'At Solution Bowl, achieving the impossible is part of who we are. Powered by visionary thinkers and innovators, we push boundaries, challenge conventions, and turn bold ideas into reality, because the best innovations are created when creativity, technology, and ambitious minds unite.',
    ctas: [
      { label: 'Join our team', href: 'https://www.linkedin.com/company/solution-bowl/jobs/?viewAsMember=true' },
      { label: 'See how we work', href: '#story' },
    ],
    tagline: 'A culture for focused builders, curious thinkers, and collaborative teams.',
  },
  chapters: {
    eyebrow: 'THREE CHAPTERS',
    title: ['From four people in Gurugram', 'to teams shipping to ten countries.'],
    intro: 'Where we’ve been, where we are, and where we’re going, told the way the team actually tells it.',
    items: [
      {
        n: '01',
        label: 'ORIGIN',
        title: 'Working for the world, across the world.',
        body: 'Solution Bowl started in 2017 with a small team and a simple belief, technology should make businesses move faster, think smarter, and do more with less. Today, we work with companies across 10+ countries, building apps, AI systems and digital experiences for businesses growing in a fast-changing world.',
        counter: 'CHAPTER 1 OF 3',
      },
      {
        n: '02',
        label: 'TODAY',
        title: 'Where we are.',
        body: 'What started with a few passionate people has grown into a team of engineers, designers, strategists, creators and problem-solvers who love building together. From brainstorming big ideas to solving complex challenges, we combine creativity, technology and ambition to create products that make a real impact.',
        counter: 'CHAPTER 2 OF 3',
      },
      {
        n: '03',
        label: 'HORIZON',
        title: 'Where we’re aiming to be.',
        body: 'We’re building toward a future where intelligent technology feels simple, powerful and human. Our goal is to help businesses innovate faster, automate smarter and scale confidently through AI, modern applications and digital experiences, powered by people who are always learning, evolving and pushing boundaries together.',
        counter: 'CHAPTER 3 OF 3',
      },
    ],
  },
  moments: {
    eyebrow: 'HAPPY MOMENTS',
    title: 'The work happens in moments, caught between sprints.',
    intro: 'A live mosaic of the team, pair sessions, lunches, team off-sites and Friday demos.',
  },
  quote: {
    eyebrow: 'FROM OUR TEAM',
    text: 'Caring for people is core to our identity, and we have built a culture around it.',
  },
  join: {
    eyebrow: 'JOIN THE TEAM',
    title: ['Three steps. No theatre.', 'We read everything you send.'],
    intro:
      'Hiring at Solution Bowl is built around the way we’d want to be hired ourselves, clear, fast and respectful of your time.',
    cta: { label: 'Apply now', href: 'https://www.linkedin.com/company/solution-bowl/jobs/?viewAsMember=true' },
    steps: [
      {
        n: '01',
        title: 'First, you apply.',
        body: 'This is your time to shine. Show us who you are and what you can really do, a CV, a portfolio, a GitHub link, a writeup of a project you’re proud of.',
      },
      {
        n: '02',
        title: 'Then we read everything, properly.',
        body: 'No keyword filtering. A senior on the relevant craft reads what you sent and replies within a week, even if the answer is no.',
      },
      {
        n: '03',
        title: 'Then we talk, like teammates.',
        body: 'One conversation about your work, one paid practical aligned to the role, one chat with the team you’d work alongside. No riddles, no trick coding rounds.',
      },
    ],
  },
  invitation: {
    eyebrow: 'A FINAL INVITATION',
    title: 'The people behind the work.',
    body: 'You’ve seen the chapters, the rituals and the rooms. Now meet the people, by craft, by tenure, by what they’re currently shipping.',
    cta: { label: 'Meet the core team', href: '/core-team' },
    links: [
      { label: 'CAREERS', title: 'See open roles on LinkedIn', href: 'https://www.linkedin.com/company/solution-bowl/jobs/?viewAsMember=true' },
      { label: 'ABOUT', title: 'The company, in one page', href: '/about' },
    ],
  },
  // Alt text is the caption shown on the live page. Local copies: /public/img/life/<file>.webp
  photos: [
    { src: L + 'innovate-build-elevate.webp', alt: 'Pair sessions at HQ' },
    { src: L + 'studio-energy.webp', alt: 'In the office' },
    { src: L + 'strategy-huddle.webp', alt: 'Strategy huddle' },
    { src: L + 'founders-day.webp', alt: "Founders' day, 2024" },
    { src: L + 'studio-sessions.webp', alt: 'Off-hour sessions' },
    { src: L + 'lunch-sector-49.webp', alt: 'Lunch at Sector 49' },
    { src: L + 'demo-day.webp', alt: 'Demo day' },
    { src: L + 'team-offsite.webp', alt: 'Team offsite' },
    { src: L + 'friday-demos.webp', alt: 'Friday demos' },
    { src: L + 'team-feast.webp', alt: 'Team feast' },
    { src: L + 'team-selfie.webp', alt: 'Team selfie' },
    { src: L + 'engineering-offsite.webp', alt: 'Engineering offsite' },
  ],
};

/* ---------------------------------------------------------------- Contact */

export interface ContactPage {
  meta: Meta;
  hero: { eyebrow: string; title: string[]; lede: string; badges: string[] };
  stats: Stat[];
  form: {
    title: string;
    subtitle: string;
    roles: string[];
    needs: string[];
    scales: string[];
    timelines: string[];
    ndaTitle: string;
    ndaPoints: string[];
  };
  steps: { eyebrow: string; title: string; intro: string; items: { title: string; body: string }[] };
  why: { eyebrow: string; title: string; intro: string; items: Item[] };
  reviews: { eyebrow: string; title: string; rating?: string; items: Testimonial[] };
  cta: { eyebrow: string; title: string; body: string; primary: string; secondary: string };
}

export const contactPage: ContactPage = {
  meta: {
    title: 'Contact SolutionBowl AI | Book a Free Strategy Call',
    description:
      "Reach SolutionBowl AI's senior architects for your AI, mobile, web, or automation project. Response within 4 hours. Strategy call within 48 hours. No sales reps.",
  },
  hero: {
    eyebrow: 'TALK TO SENIOR ENGINEERS',
    title: ['Turn your boldest idea', 'into a product the world relies on.'],
    lede: 'Mobile apps, AI automation, enterprise platforms, cloud infrastructure. We engineer solutions that scale, perform, and deliver measurable outcomes.',
    badges: ['NDA before discussion', '4hr response', 'Senior architects only'],
  },
  stats: [
    { value: '10+', label: 'COUNTRIES SERVED' },
    { value: '500+', label: 'PROJECTS' },
    { value: '15+', label: 'INDUSTRIES' },
    { value: '4.8', label: 'RATING' },
  ],
  form: {
    title: 'Get a Free Strategy Call',
    subtitle: 'A senior architect responds within 4 business hours.',
    roles: [
      'Founder / Co-Founder',
      'CTO / Tech Lead',
      'Product Manager',
      'Operations Head',
      'Enterprise Team',
      'Startup Founder',
      'Consultant',
      'Other',
    ],
    needs: [
      'AI Solutions & Automation',
      'Custom Software Development',
      'Mobile App Development',
      'Web Platform Development',
      'ERP / CRM Systems',
      'Cloud & DevOps',
      'UI/UX Engineering',
      'Dedicated Developers',
      'Enterprise Modernization',
      'AI Agent Development',
      'Other',
    ],
    scales: [
      'MVP / Prototype',
      'Startup Scale',
      'Enterprise Solution',
      'Internal Ops Platform',
      'AI Transformation',
      'Team Extension',
      'Need Scoping',
      'Not Sure Yet',
    ],
    timelines: ['Immediate', 'Within 1 Month', 'Within 3 Months', 'Planning Phase'],
    ndaTitle: "What's in our NDA",
    ndaPoints: [
      'Mutual confidentiality - both sides protected',
      'Covers product ideas, code, designs, business processes',
      '3-year term, signed digitally via DocuSign',
      'You own 100% of everything we build for you',
    ],
  },
  steps: {
    eyebrow: 'AI-POWERED WORKFLOW',
    title: 'From first message to tailored proposal, in 3 steps.',
    intro: 'No back-and-forth, no jargon, no junior account managers. Just senior engineers and a clear path forward.',
    items: [
      {
        title: 'Share Your Vision',
        body: 'Fill out the form with your project details. Your idea is fully protected by an NDA before any discussion begins.',
      },
      {
        title: 'Technical Consultation',
        body: 'A senior architect reviews your brief and connects with you to understand scope, goals, and technical requirements.',
      },
      {
        title: 'Tailored Proposal',
        body: 'We deliver a detailed, no-obligation proposal with timeline, team structure, and transparent milestone-based pricing.',
      },
    ],
  },
  why: {
    eyebrow: 'WHY TEAMS CHOOSE US',
    title: 'Top engineers. Proven delivery. Zero compromise.',
    intro:
      'Every engagement is led by senior architects, backed by a structured delivery framework, and held to one standard: outcomes that actually move your business forward.',
    items: [
      {
        title: 'IP & Confidentiality First',
        body: 'NDA executed before any technical discussion. You own 100% of all code, designs, and data, transferred in full at project close. No grey areas.',
      },
      {
        title: 'Senior Engineers, Every Engagement',
        body: 'The architects you meet in discovery are the engineers who build. No bait-and-switch, no hand-off to junior teams post-signature.',
      },
      {
        title: 'Fixed-Price, Milestone-Based',
        body: 'Transparent scoping with clear milestones. What we quote is what you pay. Scope changes go through a formal change process, not your invoice.',
      },
      {
        title: 'Middle East & Western Market Depth',
        body: 'We understand PDPL, Vision 2030 mandates, Arabic localisation, and Middle East procurement cycles, alongside US and UK compliance requirements.',
      },
    ],
  },
  reviews: {
    eyebrow: 'CLIENT REVIEWS',
    title: "A wall of words from founders & teams we've shipped for.",
    rating: '4.8 / 5 TOP RATED ON UPWORK',
    items: [
      {
        quote:
          'Working with SolutionBowl on the ATMA website project was an excellent experience. The team understood the requirements clearly and translated them into a professional, responsive WordPress website that perfectly represents the association. I highly recommend SolutionBowl for any web development or WordPress projects.',
        name: 'Pankaj Sukhija',
        role: 'ATMA',
        place: 'India',
      },
      {
        quote:
          'It was a great experience working with the SolutionBowl team. Strong technical knowledge, professionalism, and attention to detail throughout the project. From theme customization to plugin integration and performance optimization, everything was handled efficiently and delivered on time.',
        name: 'SK',
        role: 'FOUNDER',
        place: 'Dubai, UAE',
      },
      {
        quote:
          'Working with SolutionBowl on our website Ethos Education World was a wonderful experience. They quickly understood our vision and delivered a clean, modern, and user-friendly site.',
        name: 'Saurabh Taluja',
        role: 'ETHOS EDUCATION',
        place: 'India',
      },
      {
        quote:
          'Thank you SolutionBowl for setting up and fixing issues on my WordPress site. Quick turnaround and a professional engagement throughout.',
        name: 'Russ Merritt',
        role: 'BUSINESS OWNER',
        place: 'Jordan',
      },
      {
        quote:
          'Solution Bowl delivered a clean and professional 5-page website review with valuable insights and clear recommendations. Their team was responsive, detail-oriented, and easy to work with throughout the process.',
        name: 'Jarrett Marcum',
        role: 'CLIENT',
        place: 'Philippines',
      },
      {
        quote:
          'SolutionBowl is a solid service provider. I will not hesitate to work with them again for any similar website development projects. Recommended!',
        name: 'C3 Film Guide',
        role: 'STUDIO',
        place: 'USA',
      },
    ],
  },
  cta: {
    eyebrow: 'READY WHEN YOU ARE',
    title: "Let's build the next thing that scales.",
    body: 'Share your project. A senior architect will reply within 4 business hours with a clear next step.',
    primary: 'Schedule a call',
    secondary: 'Chat on WhatsApp',
  },
};

/* ------------------------------------------------------------ Home extras */

export interface HomeExtras {
  faqs: Faq[];
  testimonials: Testimonial[];
  stats: Stat[];
  whyUs: { eyebrow: string; title: string[]; intro: string; items: Item[] };
  process: { eyebrow: string; title: string[]; intro: string; steps: { title: string; body: string }[] };
  industries: string[];
  aiStudio: {
    eyebrow: string;
    title: string[];
    body: string;
    quote: string;
    capabilities: { title: string; body: string }[];
  };
  capabilities: {
    eyebrow: string;
    title: string[];
    intro: string;
    items: { title: string; body: string; tags: string[] }[];
  };
}

export const homeExtras: HomeExtras = {
  faqs: [
    {
      q: 'What services does Solution Bowl provide?',
      a: 'Solution Bowl is an AI and digital engineering company offering custom software development, AI solutions, mobile app development, web development, cloud services, ERP systems, UI/UX design, DevOps, and intelligent automation solutions for startups and enterprises.',
    },
    {
      q: 'Does Solution Bowl build AI-powered applications?',
      a: 'Yes. Solution Bowl develops AI-powered web and mobile applications, AI agents, workflow automation systems, enterprise AI tools, and intelligent analytics platforms designed to improve operational efficiency and business scalability.',
    },
    {
      q: 'Which industries does Solution Bowl work with?',
      a: 'Solution Bowl works across multiple industries including FinTech, Healthcare, EdTech, Real Estate, E-Commerce, Logistics, Enterprise SaaS, Media, and Supply Chain businesses across Middle East and Western markets.',
    },
    {
      q: 'Does Solution Bowl provide custom ERP and enterprise software development?',
      a: 'Yes. The company develops custom ERP systems, CRM platforms, HRM solutions, enterprise dashboards, workflow automation systems, and business management software tailored to operational requirements.',
    },
    {
      q: 'Can startups hire dedicated developers from Solution Bowl?',
      a: 'Yes. Startups and enterprises can hire dedicated developers, UI/UX designers, QA engineers, DevOps specialists, and AI engineers on flexible engagement models depending on project requirements',
    },
    {
      q: 'What technologies does Solution Bowl use for development?',
      a: 'The company works with modern technologies including React, Next.js, Node.js, Flutter, Python, AI/ML frameworks, AWS, Docker, GraphQL, Shopify, WordPress, and cloud-native architectures.',
    },
    {
      q: 'How long does it take to build a custom software product?',
      a: 'Project timelines depend on complexity, integrations, and business requirements. MVPs can typically be delivered within weeks, while enterprise-scale platforms may require longer phased development cycles.',
    },
  ],
  testimonials: [
    {
      quote:
        'Working with SolutionBowl on our website Ethos Education World was a wonderful experience. They quickly understood our vision and delivered a clean, modern, and user-friendly site.',
      name: 'Saurabh Taluja',
      role: 'Founder, Ethos Education',
      place: 'India',
    },
    {
      quote:
        'Solution Bowl delivered a clean and professional 5-page website review with valuable insights and clear recommendations. Their team was responsive, detail-oriented, and easy to work with throughout the process.',
      name: 'Jarrett Marcum',
      role: 'Website Project Manager',
      place: 'Philippines',
    },
  ],
  stats: [
    { value: '500+', label: 'Projects Delivered' },
    { value: '300+', label: 'Companies Empowered' },
    { value: '10+', label: 'Countries Served' },
    { value: '4.9★', label: 'Average Client Rating' },
  ],
  whyUs: {
    eyebrow: 'WHY SOLUTIONBOWL',
    title: ['Smart Engineering,', 'Built by Senior Experts'],
    intro:
      'Trusted by enterprises and high-growth businesses across the Middle East, USA, and India , here’s why 300+ companies chose us -',
    items: [
      {
        title: 'Senior-Level Talent on Every Project',
        body: 'No bait-and-switch. The architects you meet in discovery are the engineers who build your product.',
      },
      {
        title: 'NDA Before We Discuss Your Idea',
        body: 'Full IP protection from day one. You own 100% of all code, designs, and data we produce.',
      },
      {
        title: 'Middle East & US Market Deep Expertise',
        body: 'We understand Middle East Vision 2030 initiatives, US compliance requirements, and both market cultures.',
      },
      {
        title: 'Fixed-Price Quotes, No Hidden Costs',
        body: 'Transparent, milestone-based billing with no scope-creep surprises. What we quote is what you pay.',
      },
    ],
  },
  process: {
    eyebrow: 'HOW WE WORK',
    title: ['A Process Built for On-Time,', 'On-Budget Delivery'],
    intro:
      'Our battle-tested delivery framework cuts risk, reduces time-to-market and ensures your vision ships exactly as imagined.',
    steps: [
      {
        title: 'Discovery & Blueprint',
        body: 'We assess your goals, workflows, and AI opportunities, then create a detailed product blueprint, architecture plan, and delivery roadmap.',
      },
      {
        title: 'Strategy & Design',
        body: 'We shape the UX, system architecture, and technical strategy, testing assumptions early so costly decisions are made before a line of code is written.',
      },
      {
        title: 'Agile Development',
        body: 'Sprint-based development with bi-weekly demos. AI systems, mobile apps, and platform features built with full CI/CD from day one',
      },
      {
        title: 'QA & Security Testing',
        body: 'Manual, automated, load, and penetration testing. Compliance checks for Middle East (PDPL) and US (SOC 2, HIPAA) standards.',
      },
      {
        title: 'Launch & Go-to-Market',
        body: 'Secure, scalable deployment plus go-to-market support including SEO strategy, app store optimisation, and growth planning.',
      },
      {
        title: 'Ongoing Partnership',
        body: 'Post-launch support, continuous AI model improvement, and product roadmap execution. We stay with you as your long-term technology growth partner.',
      },
    ],
  },
  industries: [
    'Real Estate & PropTech',
    'Healthcare & MedTech',
    'Fintech & Banking',
    'eCommerce & Retail',
    'EdTech & eLearning',
    'Logistics & Supply Chain',
    'SaaS & Enterprise',
    'Media & Publishing',
    'Government & GovTech',
  ],
  aiStudio: {
    eyebrow: 'SOLUTIONBOWL AI STUDIO',
    title: ['A dedicated AI division', 'inside Solution Bowl.'],
    body: 'An AI engineering initiative building intelligent systems, AI agents, enterprise automation, and next-generation AI experiences for modern businesses.',
    quote:
      'We help Middle East and US organisations move beyond AI hype and build systems that create sustainable competitive advantages.',
    capabilities: [
      { title: 'AI Agents', body: 'Autonomous task execution systems.' },
      { title: 'Prompt Engineering', body: 'Optimized AI interactions and workflows.' },
      { title: 'Conversational AI', body: 'Chatbots, copilots, and voice assistants.' },
      { title: 'AI Automation', body: 'Workflow automation powered by AI.' },
      { title: 'Enterprise AI', body: 'AI integrations for ERP, CRM, and operations.' },
      { title: 'Generative AI', body: 'LLM integrations and AI-generated experiences.' },
      { title: 'RAG Systems', body: 'Knowledge retrieval and intelligent search systems.' },
      { title: 'Multi-Agent Systems', body: 'Collaborative autonomous AI ecosystems.' },
    ],
  },
  capabilities: {
    eyebrow: 'OUR CAPABILITIES',
    title: ['End-to-End Digital &', 'AI Engineering'],
    intro:
      'From ideation to launch and beyond, our cross-functional teams build products that scale. Every service is backed by a proven delivery framework.',
    items: [
      {
        title: 'AI-Powered Web & Mobile',
        body: 'Intelligent platforms and mobile apps embedded with AI capabilities, automation layers, and cloud-native architectures that deliver measurable business outcomes at scale.',
        tags: ['React / Next.js', 'Flutter', 'AI Integration'],
      },
      {
        title: 'Digital Transformation',
        body: 'Modernise legacy systems with AI-driven platforms, intelligent workflows, and scalable cloud infrastructure designed to improve efficiency and accelerate growth velocity',
        tags: ['Cloud Migration', 'ERP Modernisation'],
      },
      {
        title: 'AI Agent Development',
        body: 'Agentic AI systems that reason, plan, and execute complex multi-step tasks across your tech ecosystem, from customer support bots to autonomous business operations.',
        tags: ['LangChain', 'RAG', 'Multi-Agent'],
      },
      {
        title: 'Intelligent Automation (RPA + AI)',
        body: 'Combine AI with robotic process automation to eliminate manual operations, reduce errors, and create self-improving workflows that free your team for high-value work.',
        tags: ['RPA', 'ML Pipelines'],
      },
      {
        title: 'Custom ERP & Enterprise Platforms',
        body: 'AI-enabled ERP systems and enterprise software built to your exact operational requirements, streamlining departments, integrating data, and delivering real-time intelligence.',
        tags: ['Custom ERP', 'CRM/HRM'],
      },
      {
        title: 'AI Strategy & Tech Consulting',
        body: 'Architecture audits, AI roadmaps, and digital transformation planning, helping C-suite leaders make confident technology investments aligned with long-term business goals.',
        tags: ['CTO Advisory', 'AI Roadmap'],
      },
    ],
  },
};
