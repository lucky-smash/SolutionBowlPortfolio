// Service pages content.
// Source: https://www.solutionbowl.ai/services/* (live site), copied verbatim, retrieved 2026-10-30.
// Hidden tabs were captured where possible (ecommerce offer tabs, devops/next-tech stack + phase tabs, next-tech
// stages, mobile Android, automation Intelligent Automation); other tabs keep only the visible one.
// Animated counters that rendered as "0" and dashboard mockup widgets were omitted.
import type { OfferingPage } from './types';

export const serviceGroups: { name: string; slugs: string[] }[] = [
  { name: 'Product Engineering', slugs: ['mobile-app-development', 'web-development-service', 'cms-service', 'ecommerce-services'] },
  { name: 'AI Engineering & Automation', slugs: ['ai-ml-service', 'ai-ecommerce', 'automation', 'internet-of-things-iot', 'next-tech-solutions'] },
  { name: 'Infrastructure & Security', slugs: ['devops-service'] },
  { name: 'Quality Engineering', slugs: ['qa-testing-service'] },
];

export const services: OfferingPage[] = [
  // ---------------------------------------------------------------- Mobile App Development
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    meta: {
      title: 'Custom Mobile App Development Services | SolutionBowl.ai',
      description:
        'Custom iOS, Android, Flutter, and React Native mobile app development for startups across the Middle East, the US, and the UK. 500+ scalable apps delivered.',
    },
    eyebrow: 'MOBILE APP DEVELOPMENT',
    title: 'Custom Mobile App Development Company for Startups',
    lede: 'Build scalable iOS, Android & cross-platform mobile apps with expert developers, faster MVP delivery, and enterprise-grade security.',
    tags: ['iOS Native', 'Android', 'Flutter', 'React Native', 'AI-Powered'],
    summary:
      'Custom iOS, Android, Flutter, and React Native mobile app development for startups across the Middle East, the US, and the UK.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'PLATFORMS WE BUILD ON',
        title: 'Every Platform. One Expert Team.',
        intro:
          'The platform shapes everything from architecture to release strategy. We have delivered 500+ projects across iOS, Android, and cross-platform.',
        items: [
          {
            title: 'iOS App Development: Elegant, High-Performance iPhone and iPad Apps',
            points: [
              "Premium native UI crafted to Apple's Human Interface Guidelines",
              'Full App Store submission metadata, screenshots, review compliance, and launch monitoring',
              'HealthKit, ARKit, CoreML, and notification integrations handled natively',
              'Clean, scalable Swift codebase ready for future feature growth',
            ],
            tags: ['Swift', 'SwiftUI', 'Xcode'],
          },
          {
            title: 'Android App Development: Robust, fast, built for the full Android ecosystem',
            points: [
              'Kotlin & Jetpack Compose for modern Android apps',
              'Tested across Android devices and OS versions using automated and manual QA',
              'Google Pay, Maps, Firebase & Play Store integration',
              'Sprint-based delivery with QA coverage for fragmented device ecosystems',
            ],
            tags: ['Android', 'Kotlin', 'Jetpack'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'APP CATEGORIES',
        title: 'Apps We Build for Every Industry',
        items: [
          {
            title: 'Healthcare & MedTech',
            body: 'Telemedicine, patient portals, remote monitoring, and wearable integrations built to HIPAA-aware standards.',
            labels: ['CARE DELIVERY', 'HIPAA-AWARE'],
          },
          {
            title: 'FinTech & Banking',
            body: 'Digital wallets, lending platforms, and neobanking interfaces with biometric auth, real-time transactions.',
            labels: ['SECURE PAYMENTS', 'FRAUD-AWARE'],
          },
          {
            title: 'E-Commerce & Retail',
            body: 'Shopping apps with AR try-on, real-time inventory sync, loyalty programs, and multi-currency checkout.',
            labels: ['CONVERSION-LED', 'AR-READY'],
          },
          {
            title: 'On-Demand & Marketplace',
            body: 'Ride-hailing, food delivery, and super apps with Real-time GPS, dynamic pricing, and push notifications.',
            labels: ['REAL-TIME LOGISTICS', 'MULTI-ROLE'],
          },
          {
            title: 'EdTech & eLearning',
            body: 'LMS platforms, video streaming, live classrooms, and gamification systems that make learning stick.',
            labels: ['RETENTION-FOCUSED', 'VIDEO-RICH'],
          },
          {
            title: 'Enterprise & B2B Apps',
            body: 'Field service apps, mobile ERP clients, inventory systems, and CRM tools offline-first.',
            labels: ['OPS EFFICIENCY', 'WORKFLOW-DRIVEN'],
          },
        ],
      },
      {
        kind: 'stack',
        eyebrow: 'TECHNOLOGY STACK',
        title: 'Battle-Tested Tech Stack',
        groups: [{ name: 'Mobile', items: ['Flutter', 'React Native', 'Swift / SwiftUI', 'Kotlin', 'Jetpack Compose'] }],
      },
      {
        kind: 'process',
        eyebrow: 'OUR PROCESS',
        title: 'A Process Built for Zero Surprises',
        intro:
          'We keep you in the loop at every stage, with weekly demos, clear timelines, and open communication so you always know exactly where your product stands.',
        steps: [
          {
            title: 'Discovery & Scope',
            when: 'Week 1-2',
            body: 'We unpack business goals, user needs, competitors, and technical constraints so the roadmap starts with clarity instead of assumptions.',
          },
          {
            title: 'UI/UX Design',
            when: 'Week 2-4',
            body: 'We turn the roadmap into mobile-first screens and prototypes you can review early, before engineering starts compounding cost.',
          },
          {
            title: 'Agile Development',
            when: 'Week 4-10',
            body: 'Sprints, demos, staging, and CI/CD keep progress visible. You see the product take shape instead of waiting for a giant reveal.',
          },
          {
            title: 'QA & Device Testing',
            when: 'Week 10-12',
            body: 'We validate across devices and OS combinations, then tighten performance, edge cases, and release quality before launch.',
          },
          {
            title: 'App Store Launch',
            when: 'Week 12-13',
            body: 'We handle screenshots, metadata, compliance, submissions, review responses, and launch-day monitoring across both stores.',
          },
          {
            title: 'Post-Launch Growth',
            when: 'Ongoing',
            body: 'After release, we stay close with analytics, crash monitoring, retention improvements, and the roadmap for what comes next.',
          },
        ],
      },
      {
        kind: 'case',
        eyebrow: 'OUR WORK',
        title: 'Daeem: On-Demand Delivery App Built for the Saudi Market',
        label: 'ON-DEMAND DELIVERY · SAUDI ARABIA',
        challenge:
          'A Jeddah-based delivery company needed a full-featured consumer app to serve customers across Saudi Arabia with food, grocery, pharmacy, and package delivery through a single platform.',
        solution:
          'We built a multi-category delivery app with real-time order tracking, live courier updates, 24/7 support integration, and a localized experience designed specifically for the Saudi community.',
        impact: [
          '1,000+ downloads within early launch phase',
          '4 delivery categories live: food, grocery, pharmacy, packages',
          'Real-time tracking from pickup to drop-off across Saudi cities',
        ],
        tags: ['React Native', 'Node.js', 'Firebase', 'Google Maps API'],
        link: { label: 'Live on Google Play', href: 'https://play.google.com/store/apps/details?id=com.daeemcustomer' },
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'SolutionBowl is a solid service provider. I will not hesitate to work with them again for any similar website development projects. Recommended!',
            name: 'C3 Film Guide',
            role: 'Film Guide Platform',
            place: 'USA',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does it take to build and launch a mobile app?',
        a: 'A typical MVP takes 8–12 weeks. Complex apps with AI, maps or real-time features may take 14–20 weeks.',
      },
      {
        q: 'Should I build native or cross-platform?',
        a: 'For most startups we recommend Flutter — it delivers near-native performance on both iOS and Android at 30–40% lower cost.',
      },
      {
        q: 'Do you provide app maintenance?',
        a: "Yes, we do. Every app we build comes with post-launch support covering bug fixes, OS updates, performance monitoring, and feature enhancements. Whether you need a dedicated monthly retainer or on-demand fixes, we structure the support around what your app actually needs, not a one-size-fits-all plan.",
      },
      {
        q: 'Can you integrate AI features into an existing app?',
        a: 'Yes. We integrate AI capabilities into live apps without rebuilding from scratch. Whether you need a conversational chatbot, smart recommendations, predictive analytics, or automated workflows, we connect the right AI layer to your existing product using APIs from OpenAI, Anthropic, or custom-trained models, depending on your use case.',
      },
      {
        q: 'Do you handle App Store and Google Play submission?',
        a: 'Yes: completely. We handle all assets, metadata, privacy policy, review compliance, and the full submission process.',
      },
    ],
  },

  // ---------------------------------------------------------------- Web Development
  {
    slug: 'web-development-service',
    name: 'Web Development',
    meta: {
      title: 'Web App Development Company | Application Development Services',
      description:
        'Expert web app development for enterprise apps, SaaS, CMS, and ERP. 500+ projects delivered across the US, UK, and global markets. Book a strategy call.',
    },
    eyebrow: 'WEB APP DEVELOPMENT SERVICES',
    title: 'Web App Development Services That Convert and Scale',
    lede: 'From high-performance marketing sites to enterprise web applications and SaaS platforms we build web app development services that rank, convert and scale your business.',
    tags: ['React / Next.js', 'Node.js', 'WordPress', 'Shopify', 'AI-Powered', 'PWA'],
    summary:
      'Expert web app development for enterprise apps, SaaS, CMS, and ERP. 500+ projects delivered across the US, UK, and global markets.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'WHAT WE BUILD',
        title: 'Web App Development Services for Every Goal',
        intro:
          'Whether you need a fast-loading landing page or a complex enterprise web application our team has built it before and shipped it on time.',
        items: [
          {
            title: 'Custom Web Applications',
            body: 'Bespoke full-stack custom web app development built with React, Next.js and Node.js. Every system is architected to scale, secured from day one and handed over with 100% IP ownership.',
            tags: ['React', 'Next.js', 'Node.js'],
          },
          {
            title: 'E-Commerce Development',
            body: 'High-converting Shopify, WooCommerce and custom e-commerce platforms with smooth checkout flows, multi-currency payments and real-time inventory management built to sell at scale.',
            tags: ['Shopify', 'WooCommerce', 'Stripe'],
          },
          {
            title: 'CMS Development',
            body: 'WordPress, Drupal and headless CMS development services with custom themes, editorial workflows and plugin architecture built so your content team can publish without developer dependency.',
            tags: ['WordPress', 'Drupal', 'Sanity'],
          },
          {
            title: 'Custom ERP Solutions',
            body: 'Multi-tenant dashboards, admin panels and ERP software development that unifies procurement, inventory, finance and HR into a single CRM ERP system purpose-built for your operations.',
            tags: ['ERP', 'CRM', 'Dashboard'],
          },
          {
            title: 'Performance & SEO',
            body: 'Core Web Vitals optimisation, Lighthouse 100 scores, structured data and technical SEO audits that convert organic traffic into measurable revenue. Performance is built in from the first sprint.',
            tags: ['Core Web Vitals', 'SEO', 'CDN'],
          },
          {
            title: 'Website Maintenance & Support',
            body: 'SLA-backed website support services covering security patches, CMS updates, uptime monitoring and post-launch feature development so your platform stays fast, secure and ahead of technical debt.',
            tags: ['SLA Support', 'Monitoring', 'Updates'],
          },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'OUR PROCESS',
        title: 'From Brief to Live in 6 Steps',
        intro:
          'A structured, milestone-driven delivery model so you always know what is happening, what comes next and who is accountable at every stage.',
        steps: [
          { title: 'Discovery', body: 'Goals, scope and users aligned' },
          { title: 'UI/UX Design', body: 'Figma prototypes, signed off first' },
          { title: 'Development', body: 'Agile sprints, bi-weekly live demos' },
          { title: 'QA & Testing', body: 'Cross-browser, load and security checks' },
          { title: 'Launch', body: 'Deployment, DNS & monitoring' },
          { title: 'Growth', body: 'Analytics, SEO and continuous iteration' },
        ],
      },
      {
        kind: 'items',
        title: 'Deliverables, Timeline & Development',
        items: [
          {
            title: 'Deliverables',
            points: [
              'Working builds deployed to a shared staging URL every sprint',
              'Feature-complete increments delivered every two weeks',
              'Full code review and version control maintained throughout',
            ],
          },
          {
            title: 'Timeline',
            body: 'Week 4 to 10',
            points: [
              'You see real progress on a live staging URL at every checkpoint',
              'No black-box development. Feedback actioned within the next sprint',
            ],
          },
          {
            title: 'Development',
            body: 'Our engineers build in structured two-week sprints with live demos at every checkpoint. You see what has been built, give direct feedback and the next sprint reflects it immediately. Every release goes through a dedicated code review process before it moves to staging.',
          },
        ],
      },
      {
        kind: 'stack',
        eyebrow: 'TECHNOLOGY STACK',
        title: 'Production-Proven Tech Stack',
        intro:
          'We choose the right technology for each project rather than the most fashionable one. Every tool in our stack is proven across real production environments.',
        groups: [
          {
            name: 'Frontend',
            items: [
              'React (UI Layer)',
              'Next.js (SSR/SSG)',
              'TypeScript (Type Safety)',
              'Tailwind CSS (Styling)',
              'Framer Motion (Animations)',
              'Vue / Nuxt (Alternative SPA)',
            ],
          },
        ],
      },
      {
        kind: 'case',
        eyebrow: 'OUR WORK',
        title: 'Dhurina: Scalable Cloud Infrastructure for 3M+ Students',
        label: 'EDTECH · INDIA',
        challenge:
          "India's leading competitive exam prep platform needed cloud infrastructure capable of handling millions of concurrent students during live classes, batch video uploads, and real-time mock test delivery across Android and iOS without performance degradation during peak exam seasons.",
        solution:
          'We built auto-scaling AWS infrastructure with CDN configuration for video content delivery, automated CI/CD deployment pipelines, and monitoring systems configured to maintain uptime across 150+ exam categories and live sessions from 200+ educators simultaneously.',
        impact: [
          '3M+ students served reliably across Android and iOS',
          'Zero production outages during high-traffic live exam periods',
          'Auto-scaling infrastructure supporting 200+ educators and 150+ exam categories',
        ],
        tags: ['AWS', 'Kubernetes', 'CI/CD', 'CDN', 'Auto-Scaling'],
        link: { label: 'Live in Production · India', href: 'https://dhurina.net/' },
      },
      {
        kind: 'items',
        eyebrow: 'WHY SOLUTIONBOWL',
        title: 'The Web App Development Partner Built for Results',
        intro:
          'We do not just build websites. As a custom web application development company, we build revenue-generating digital assets that keep performing well beyond the launch announcement.',
        items: [
          {
            title: 'Senior-Only Web Engineers',
            body: '5+ years average experience. No juniors, no outsourcing. You work directly with the engineers and architects building your product every day.',
          },
          {
            title: 'Performance-First Architecture',
            body: 'Every web app targets Lighthouse 100. We optimise for Core Web Vitals, LCP and CLS from the very first development sprint rather than fixing it at the end.',
          },
          {
            title: 'Bi-Weekly Sprints with Live Demos',
            body: 'Real progress every two weeks on a shared staging URL. You see what was built, you respond directly and the next sprint reflects your feedback immediately.',
          },
          {
            title: '100% Code & IP Ownership',
            body: 'Every line of code is yours from day one. Full source handover at project close with zero licence lock-in and no ongoing fees for your own platform.',
          },
          {
            title: '3-Month Post-Launch Warranty',
            body: 'Every project ships with a 3-month bug warranty and an optional SLA retainer for ongoing website support and maintenance services after the warranty period.',
          },
        ],
      },
      {
        kind: 'stats',
        items: [
          { value: '3.2x', label: 'Average ROI delivered in year one' },
          { value: '6–12 Wks', label: 'Typical MVP to live launch timeline for web projects' },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'STRATEGIC PRODUCT BUILD',
        title: 'Design clarity, engineering precision and launch focus all in one team.',
        paragraphs: [
          'From architecture to post-launch optimisation every release is built to look sharp, ship fast and keep improving after go-live.',
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'Solution Bowl delivered a clean and professional 5-page website review with valuable insights and clear recommendations. Their team was responsive, detail-oriented, and easy to work with throughout the process.',
            name: 'Jarrett Marcum',
            role: 'Website Project Manager',
            place: 'Philippines',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does it take to build a custom web application?',
        a: 'Build timelines depend on scope and technical complexity.\n6 to 12 weeks: Simple web apps and MVPs\n3 to 6 months: Mid-complexity platforms with admin panels, integrations and role-based access\n6 to 12 months: Enterprise web application development with compliance requirements, multi-region infrastructure or AI features\nA confirmed milestone map is shared at the end of every discovery phase so the timeline is never a surprise.',
      },
      {
        q: 'What does your CMS development service include?',
        a: 'Our content management system development covers custom WordPress builds, Drupal enterprise CMS solutions, Sanity and Contentful headless implementations and Shopify storefront development. Each engagement includes theme development, plugin architecture, editorial workflow design, multi-language configuration and migration from legacy platforms where required. Businesses looking to hire CMS developers for ongoing content operations can also engage on a monthly retainer covering development and support.',
      },
      {
        q: 'Do you build custom ERP and CRM ERP systems?',
        a: 'Yes. Our ERP software development practice covers procurement, inventory, HR, finance and operations modules built around your exact workflows. We design CRM ERP systems that bring departmental data into a single platform, eliminate manual handoffs and integrate with your existing tools through REST or GraphQL APIs. Businesses wanting to hire ERP developers on a dedicated basis can engage through our flexible team-extension model.',
      },
      {
        q: 'Do you offer website support and maintenance services?',
        a: 'Yes. Our web maintenance services operate on SLA-backed terms covering uptime monitoring, security patching, CMS and plugin updates, performance audits and bug resolution within agreed response times. Every project includes a 3-month warranty period at no extra cost. After that, clients move to a monthly website management services retainer sized to the complexity of their platform. Website maintenance cost varies based on platform size, hosting environment and the level of active development required.',
      },
      {
        q: 'Do you offer SaaS application development services?',
        a: 'Yes. Our SaaS application development services cover multi tenant web applications, subscription billing systems, admin dashboards, role-based access control and third-party API integrations. Whether you are building a B2B SaaS product from scratch or scaling an existing platform, we handle the full scope from architecture and development through to QA and post-launch support. Typical SaaS MVPs go live in 6 to 12 weeks from a confirmed scope.',
      },
      {
        q: 'Who owns the source code and intellectual property?',
        a: 'You do 100%, from day one. Before work begins we sign an NDA and an IP assignment agreement. At project handover all source code, design files, documentation and third-party licences transfer fully to you. We retain no rights to any part of what was built. This applies to every engagement regardless of size, duration or technology stack.',
      },
    ],
  },

  // ---------------------------------------------------------------- CMS
  {
    slug: 'cms-service',
    name: 'CMS',
    meta: {
      title: 'Custom CMS Development Services | WordPress, Shopify, and Drupal.',
      description:
        'Custom CMS development services on WordPress, Drupal, Shopify, and headless stacks. SolutionBowl builds CMS platforms that scale, rank, and convert. Serving 10+ countries. Book a call.',
    },
    eyebrow: 'CMS DEVELOPMENT SERVICES',
    title: 'CMS Development Services That Scale, Rank and Convert',
    lede: 'We build enterprise content management systems across WordPress Drupal, Shopify and headless architectures that give your marketing and editorial teams full publishing control, without touching a single line of code.',
    tags: ['WordPress', 'Drupal', 'Shopify', 'Headless CMS', 'AI-Powered', 'PWA Support'],
    summary:
      'Custom CMS development services on WordPress, Drupal, Shopify, and headless stacks. SolutionBowl builds CMS platforms that scale, rank, and convert.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'WHAT WE BUILD',
        title: 'Every CMS. Every Use Case.',
        intro:
          'From fast-moving editorial teams to enterprise content operations, we architect the right CMS for your audience, your workflow and your growth targets.',
        items: [
          {
            title: 'Editorial & Blog Platforms',
            body: 'High-performance content hubs engineered for publishing teams who need speed, SEO structure and genuine editorial independence. Category management, scheduled publishing and author-level role controls come standard on every build.',
            tags: ['WordPress', 'Drupal', 'SEO-ready'],
          },
          {
            title: 'eCommerce CMS',
            body: 'High-converting Shopify, WooCommerce and headless commerce builds with custom editorial layers for product catalogues, campaign landing pages and seasonal content - fully manageable by your marketing team without developer involvement.',
            tags: ['Shopify', 'WooCommerce', 'Webflow'],
          },
          {
            title: 'Headless & API-First',
            body: 'Decouple your content layer from the frontend entirely. Publish once and deliver across web, mobile apps, kiosks, digital signage and connected devices through a single structured API.',
            tags: ['Contentful', 'Sanity', 'Strapi'],
          },
          {
            title: 'Enterprise Portals',
            body: 'Multi-site, multilingual and role-governed content platforms built for large enterprises, government bodies and healthcare organisations with strict compliance requirements and complex editorial hierarchies.',
            tags: ['Drupal', 'Multisite', 'SSO'],
          },
          {
            title: 'Membership & Community',
            body: 'Gated content platforms with subscription tiers, member dashboards, community forums and payment gateway integrations designed for recurring revenue models and sustained audience retention.',
            tags: ['WordPress', 'MemberPress', 'BuddyPress'],
          },
          {
            title: 'AI-Enhanced CMS',
            body: 'Intelligent content workflows powered by AI-assisted writing, automated taxonomy, smart search, personalisation engines and content performance analytics built directly into your CMS dashboard.',
            tags: ['AI Writing', 'Smart Search', 'Personalisation'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'CMS PLATFORMS',
        title: 'Every Platform. One Expert Team.',
        intro:
          'We evaluate your content goals, traffic volume and team capability before recommending a platform. Every CMS we build is production-tested and engineered to scale with your business.',
        items: [
          {
            title: 'WordPress',
            body: "The world's most adaptable CMS platform. We build custom themes, Gutenberg block libraries, WooCommerce storefronts and enterprise-grade WordPress installations engineered for performance, security and long-term scale.",
            tags: ['Custom Themes', 'WooCommerce', 'Headless WP'],
          },
          {
            title: 'Drupal',
            body: 'The enterprise CMS built for complex content architecture. Ideal for government departments, healthcare networks and large media organisations that require strict governance, multisite management and deep API capabilities.',
            tags: ['Multisite', 'Content API'],
          },
          {
            title: 'Headless CMS',
            body: 'Contentful, Sanity and Strapi deployments with decoupled content delivery for omnichannel publishing, blazing frontend performance and a future-proof architecture that grows with your product.',
            tags: ['API-First'],
          },
          {
            title: 'Shopify & Shopify Plus',
            body: 'Custom Liquid theme development, app integrations, B2B buyer portals and high-conversion storefront builds for brands scaling their eCommerce operations across markets.',
            tags: ['Custom Theme', 'B2B Portals'],
          },
          {
            title: 'Wix & Webflow',
            body: 'Visual-first CMS builds for marketing teams that need editorial power without engineering overhead. Wix Studio and Webflow CMS with custom logic, third-party integrations and solid SEO foundations from day one.',
            tags: ['No-Code Power', 'CMS Collections'],
          },
        ],
      },
      { kind: 'stats', items: [{ value: '6 Wks', label: 'Average launch time' }] },
      {
        kind: 'stack',
        eyebrow: 'TECHNOLOGY STACK',
        title: 'Battle-Tested CMS Stack',
        intro:
          'We select CMS technology based on your content objectives and team capability, not what is currently in trend. Every platform and integration tool in our stack is production-proven and built to handle scale.',
        groups: [
          {
            name: 'CMS Platforms',
            items: [
              'WordPress (Open-Source CMS)',
              'Drupal 10 (Enterprise CMS)',
              'Shopify Plus (Commerce CMS)',
              'Sanity (Headless CMS)',
              'Contentful (Headless CMS)',
            ],
          },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'OUR PROCESS',
        title: 'From Brief to Launch Without the Guesswork',
        intro:
          'Every CMS development project at SolutionBowl follows a structured delivery framework that keeps your editorial team in control at every stage and eliminates last-minute surprises.',
        steps: [
          {
            title: 'Discovery & Strategy',
            when: 'WEEK 1–2',
            body: 'We map your content architecture, editorial workflows, SEO requirements and third-party integration dependencies before a single component is designed or developed.\n• Content taxonomy and information architecture planning\n• Platform selection and technology recommendation\n• SEO baseline audit and migration impact assessment',
          },
          {
            title: 'UI/UX & Prototype',
            when: 'WEEK 2–4',
            body: 'We design the editorial interface and the public-facing experience in parallel, so the CMS your team uses and the site your audience sees are built as one cohesive system from the start.\n• Clickable CMS editorial prototypes in Figma\n• Component and block design system development\n• Editor UX walkthrough and client sign-off',
          },
          {
            title: 'Build & Integrate',
            when: 'WEEK 4–8',
            body: 'Theme development, custom block architecture, plugin configuration and API integrations are built to your brand and content strategy, not lifted from a generic template or starter theme.\n• Custom theme and block component development\n• Third-party, CRM and marketing tool integrations\n• Role-based access control configuration',
          },
          {
            title: 'Content Migration',
            when: 'WEEK 6–8',
            body: 'We migrate your existing content, URL structures and SEO signals without losing a single point of search equity. Zero broken links and zero missed redirects are guaranteed delivery criteria.\n• Automated migration scripting and data mapping\n• URL redirect mapping and post-migration testing\n• Media library and digital asset transfer',
          },
          {
            title: 'QA & Performance',
            when: 'WEEK 8–9',
            body: 'Security hardening, Core Web Vitals optimisation, cross-browser testing and load simulation are completed before any page reaches a live environment.\n• Security audit and platform hardening pass\n• Core Web Vitals score of 90 or above as a delivery criterion\n• Cross-browser and cross-device QA testing',
          },
          {
            title: 'Launch & Handover',
            when: 'WEEK 9–10',
            body: 'We deploy to production, run editorial team training sessions and hand over full platform documentation. You own everything outright, with a three-month post-launch warranty included as standard.\n• Editorial team onboarding and training sessions\n• Full documentation and admin credentials handover\n• Three-month post-launch warranty included',
          },
        ],
      },
      {
        kind: 'case',
        eyebrow: 'CASE STUDIES',
        title: 'Nextstep Training Apprenticeship and Skills Platform',
        label: 'EDUCATION · UNITED KINGDOM',
        challenge:
          'A Department for Education-funded apprenticeship provider operating across London and England since 2012 needed a WordPress platform to serve employers and learners simultaneously, with structured navigation, lead capture, and full editorial control for course and compliance content.',
        solution:
          'We delivered a WordPress build with Elementor, featuring dual-audience pathways, apprenticeship program pages, vacancy listings, safeguarding documentation, and lead capture forms, giving the internal team complete CMS control over all content with no development dependency on any standard update.',
        impact: [
          '3,800 Individuals trained through the platform',
          '94% Employer satisfaction rate',
          '83% Learner positive progression rate',
          'Since 2012 Established training provider, fully supported online',
        ],
        tags: ['WordPress', 'Elementor', 'Education CMS', 'Dual Audience UX', 'Lead Generation'],
      },
      {
        kind: 'items',
        eyebrow: 'WHY SOLUTIONBOWL',
        title: 'The CMS Partner That Actually Delivers',
        items: [
          {
            title: 'Your team publishes without raising a ticket',
            labels: ['EDITORIAL FREEDOM', 'Editorial Independence'],
            body: 'We build content management systems where your marketing and editorial teams create, update, schedule and publish without developer dependency. Real editorial control for teams that need to move fast and publish on their own terms.',
            points: [
              'Visual block editors with no-code page building capability',
              'Custom content types designed around your editorial workflow',
              'Role-based access for editors, reviewers and administrators',
            ],
          },
          {
            title: 'Core Web Vitals 90 or above on every delivery',
            labels: ['PERFORMANCE FIRST', '90+ Performance Score'],
            body: 'A slow CMS does not rank. We engineer performance into every sprint, targeting sub-1.5s load times, optimised LCP and zero layout shift across all key pages. Every CMS we deliver scores 90 or above on Google PageSpeed Insights before handover.',
            points: [
              'Sub-1.5s load time across all primary pages',
              'Image optimisation, lazy loading and CDN configuration',
              'Lighthouse score 90 or above included as a delivery criterion',
            ],
          },
          {
            title: 'Search optimisation built into the architecture',
            labels: ['SEO-NATIVE BUILD', 'SEO-Native Architecture'],
            body: 'SEO is not an afterthought on a SolutionBowl CMS build. Schema markup, canonical URLs, hreflang tags, XML sitemaps and structured data are scoped and delivered on every project, not retrofitted after go-live.',
            points: [
              'Zero SEO equity lost during content migration',
              'Structured data and schema markup configured at build',
              'SEO-friendly URL architecture and redirect mapping from day one',
            ],
          },
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'Migrating to a headless CMS was the most significant technical decision we had made in years. SolutionBowl guided every step of the process and the result is a platform that handles over 200 articles a day without a single performance or reliability issue.',
            name: 'Arvind Nair',
            role: 'CTO, NewsFirst',
            place: 'Bengaluru, India',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can you integrate AI tools directly into our CMS?',
        a: 'Yes. AI integration is a core part of our CMS development capability. We build AI-assisted writing tools, automated content tagging and taxonomy, smart site search powered by Algolia or custom models, personalisation engines that adapt content by audience segment, and content performance analytics dashboards, all integrated directly into your CMS editorial interface. Your team gets intelligent content workflows without switching between platforms or tools.',
      },
      {
        q: 'How long does it take to build a CMS platform?',
        a: 'Our standard CMS delivery timeline runs 8 to 10 weeks from discovery to go-live. Timelines vary by scope: 4 to 6 weeks: Straightforward WordPress or Shopify builds. 8 to 10 weeks: Standard CMS delivery from discovery to launch. 10 to 16 weeks: Enterprise headless platforms with complex migrations, compliance requirements or multisite architecture. We confirm the exact timeline during discovery after reviewing your platform, migration complexity and integration requirements.',
      },
      {
        q: 'Which CMS platform is right for my business?',
        a: 'The right platform depends on your content volume, team size, commerce requirements and existing technical infrastructure. WordPress suits most content-led and marketing-driven businesses. Drupal is the right choice for government, healthcare and enterprise portals with complex governance needs. Shopify and Shopify Plus serve commerce-first brands. Headless platforms like Sanity or Contentful are the correct fit when you publish across multiple channels simultaneously.',
      },
      {
        q: 'Can you migrate our existing website to a new CMS without losing SEO rankings?',
        a: 'Yes. Content migration with zero SEO equity loss is a core part of our delivery process. We handle full URL mapping, redirect configuration, metadata transfer, structured data migration and a post-launch crawl audit to confirm nothing is lost. We have managed migrations from legacy platforms, bespoke CMS builds and multi-site WordPress installations without impacting organic search rankings.',
      },
      {
        q: 'Do you build headless CMS platforms?',
        a: 'Yes. We build decoupled and headless CMS architectures using Contentful, Sanity and Strapi, connected to React, Next.js and other modern frontend frameworks. Headless is the right architecture when you need to publish content to multiple channels simultaneously, when your frontend performance requirements exceed what a traditional CMS can deliver, or when your development team needs complete flexibility over the presentation layer.',
      },
      {
        q: 'What support and maintenance do you provide after CMS launch?',
        a: 'Every CMS project includes a three-month post-launch warranty as standard. Beyond that, we offer SLA-backed maintenance packages covering security updates, plugin and platform version management, performance monitoring, content support and ongoing feature development. We operate as a long-term CMS partner, not a build-and-exit agency.',
      },
    ],
  },

  // ---------------------------------------------------------------- Ecommerce
  {
    slug: 'ecommerce-services',
    name: 'Ecommerce',
    meta: {
      title: 'eCommerce Development Company | Shopify, WooCommerce, and Custom Builds',
      description:
        'Shopify, Shopify Plus, WooCommerce & custom eCommerce development with ERP integration & AI automation. 3.2x avg conversion rate improvement. 500+ projects.',
    },
    eyebrow: 'ECOMMERCE SOLUTIONS',
    title: 'E-Commerce Services That Turn Traffic Into Revenue Sales',
    lede: 'From Shopify storefronts to enterprise-grade AI commerce ecosystems, SolutionBowl engineers digital retail experiences that turn browsers into loyal buyers. Our end-to-end eCommerce development services cover platform builds, custom software development, ERP integration, and AI automation for brands that sell at scale.',
    tags: ['Shopify Plus', 'WooCommerce', 'Custom Checkout', 'ERP Integration', 'AI Commerce', 'CRO Focused'],
    summary:
      'Shopify, Shopify Plus, WooCommerce & custom eCommerce development with ERP integration & AI automation.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'WHAT WE OFFER',
        title: 'End-to-End eCommerce Services Built for Growth',
        intro:
          'From platform setup to AI-powered automation, our full-stack eCommerce development services cover every layer of your digital commerce stack.',
        items: [
          {
            title: 'Shopify Development',
            labels: ['PLATFORM SOLUTION'],
            body: 'We build and scale high-converting Shopify stores with custom themes, app integrations, and checkout optimisation tailored to your brand. From first launch to high-volume growth, our Shopify development service delivers storefronts built for performance and conversion.',
            points: [
              'Custom theme design and development',
              'App integration and development including Klaviyo and ReCharge',
              'Payment gateway and checkout optimisation',
              'Mobile-first responsive storefronts',
              'SEO and Core Web Vitals performance optimisation',
            ],
          },
          {
            title: 'Shopify Plus',
            labels: ['PLATFORM SOLUTION'],
            body: 'Enterprise-grade commerce at scale. We implement Shopify Plus to unlock advanced automation, multi-store management, and B2B capabilities for high-volume merchants who have outgrown standard Shopify.',
            points: [
              'Shopify Flow automation setup and configuration',
              'Multi-store and international expansion',
              'B2B wholesale channel configuration',
              'Custom checkout with Checkout Extensibility',
              'Headless commerce with Next.js and Hydrogen',
            ],
          },
          {
            title: 'WooCommerce Development',
            labels: ['PLATFORM SOLUTION'],
            body: 'As a trusted eCommerce development company, we build flexible, fully owned commerce stores powered by WordPress. Our development service covers website development, custom plugin builds, and ongoing maintenance services for stores at every stage of growth.',
            points: [
              'WooCommerce website development including store setup and platform migration',
              'Custom plugin and extension development by experienced eCommerce developers',
              'WooCommerce Subscriptions and membership configuration',
              'Multi-vendor marketplace builds',
              'Ongoing maintenance services covering updates, security, and performance',
            ],
          },
          {
            title: 'Odoo eCommerce',
            labels: ['PLATFORM SOLUTION'],
            body: 'Fully integrated commerce inside the Odoo ecosystem, connecting your online store directly to inventory, accounting, CRM, and shipping in one unified platform with no middleware gaps.',
            points: [
              'Odoo module setup and theme customisation',
              'ERP integration covering inventory, POS, and accounting',
              'Custom Odoo module development',
              'Odoo migration and version upgrade services',
            ],
          },
          {
            title: 'Custom eCommerce Development',
            labels: ['PLATFORM SOLUTION'],
            body: 'When off-the-shelf platforms cannot meet your requirements, we design bespoke commerce solutions as a specialist custom software development company. Our custom application development service builds API-first, microservices-based platforms engineered around your exact business logic and integration landscape.',
            points: [
              'Headless commerce architecture built with React and Vue',
              'Custom checkout and payment flow engineering',
              'GraphQL and REST API development',
              'Multi-channel commerce across web, mobile, and POS',
              'Software development outsourcing model for teams needing flexible capacity',
            ],
          },
          {
            title: 'Enterprise Platform Consulting',
            labels: ['ENTERPRISE SOLUTION'],
            body: 'Strategic platform selection and architecture consulting for enterprise retailers navigating complex commerce requirements, multi-region operations, and compliance obligations.',
            points: [
              'Platform selection and RFP management',
              'Digital commerce strategy and roadmapping',
              'Legacy system modernisation',
              'Compliance and data security advisory',
              'Cost-benefit analysis and ROI modelling',
            ],
          },
          {
            title: 'ERP and OMS Integration',
            labels: ['ENTERPRISE SOLUTION'],
            body: 'Connect your commerce platform to SAP, Oracle, NetSuite, and Microsoft Dynamics for real-time data sync, unified order management, and accurate inventory across every sales channel.',
            points: [
              'SAP, Oracle, and NetSuite integrations',
              'Order management system setup and configuration',
              'Real-time inventory and order synchronisation',
              'Custom middleware and API gateway development',
            ],
          },
          {
            title: 'Multi-Region and Marketplace',
            labels: ['ENTERPRISE SOLUTION'],
            body: 'Scale internationally with multi-currency, multi-language storefronts and marketplace integrations across Amazon, Flipkart, and regional platforms that match your target markets.',
            points: [
              'Multi-currency and localisation setup',
              'Amazon, Flipkart, and Myntra channel integration',
              'Cross-border tax and compliance configuration',
              'Centralised catalogue management',
            ],
          },
          {
            title: 'Custom AI Chatbot and Support Advisory',
            labels: ['AI SOLUTION'],
            body: 'Deploy intelligent conversational AI that understands your product catalogue, handles customer queries 24/7, processes orders, and escalates complex issues, reducing support costs significantly across every channel.',
            points: [
              'LLM-powered product recommendation chat',
              'Order tracking and return process automation',
              'Multilingual customer support AI across 10+ languages',
              'Sentiment analysis and live agent escalation triggers',
              'Integration with Zendesk, Freshdesk, and Intercom',
            ],
          },
          {
            title: 'AI Delivery Optimisation',
            labels: ['AI SOLUTION'],
            body: 'Reduce last-mile delivery costs and improve customer experience with AI that dynamically routes orders, predicts delays, and selects the best carrier automatically in real time.',
            points: [
              'Dynamic route optimisation using machine learning',
              'Carrier performance scoring and auto-selection',
              'Predictive delay alerts and proactive customer notifications',
              'Geo-clustering for warehouse dispatch zones',
            ],
          },
          {
            title: 'AI Inventory Forecasting',
            labels: ['AI SOLUTION'],
            body: 'Stop stockouts and overstock events. Our AI forecasting engine analyses demand signals, seasonality, supplier lead times, and market trends to generate replenishment decisions automatically with 95%+ accuracy.',
            points: [
              'Demand forecasting with 95%+ accuracy',
              'Automated reorder point and EOQ calculation',
              'Seasonal and promotional demand spike modelling',
              'Multi-SKU and multi-warehouse optimisation',
            ],
          },
          {
            title: 'Warehouse Automation',
            labels: ['AI SOLUTION'],
            body: 'Modernise your fulfilment centre with AI-guided picking systems, computer vision quality control, and robotic process automation that scales with your order volume without adding headcount.',
            points: [
              'WMS integration and AI-guided pick path optimisation',
              'Computer vision for product inspection and defect detection',
              'RPA for shipment labelling and documentation',
              'Slotting optimisation algorithms',
            ],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'WHY CHOOSE US',
        title: 'Your Commerce Growth Partner, Not Just a Vendor',
        intro:
          'We do not just build stores. We architect revenue-generating commerce ecosystems backed by data, AI, and deep domain expertise across every major commerce vertical.',
        items: [
          {
            title: 'Commerce-Specialised Team',
            body: 'Engineers, UX designers, and commerce strategists focused entirely on eCommerce, not generalist coders retrofitting commerce onto unrelated skill sets.',
          },
          {
            title: 'Data-First Development',
            body: 'Every feature we ship is validated by analytics and conversion data. We build what moves revenue, not what looks impressive in a demo.',
          },
          {
            title: 'PCI-DSS and GDPR Ready',
            body: 'Security and compliance are built into every commerce project. Our builds follow PCI-DSS-compliant architecture and GDPR best practices from day one, not retrofitted after go-live.',
          },
          {
            title: 'Agile, Transparent Delivery',
            body: 'Two-week sprint cycles, weekly demo calls, and real-time dashboards. You always know exactly where your project stands and what ships next.',
          },
        ],
      },
      {
        kind: 'stats',
        items: [
          { value: '+148%', label: 'Average catalog engagement after redesign' },
          { value: '3.2×', label: 'Average ROI delivered in Year 1.' },
          { value: '98%', label: 'Client Retention Rate' },
          { value: '60%', label: 'Avg. Support Cost Reduction via AI' },
          { value: '3.2×', label: 'Conversion Rate Improvement' },
          { value: '14 Days', label: 'Avg. Time to First Prototype' },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'HOW WE WORK',
        title: 'Our Proven eCommerce Delivery Process',
        intro:
          'A battle-tested 5-phase process that takes your idea from discovery to a live, revenue-generating commerce platform - on time and on budget.',
        steps: [
          { title: 'Discovery & Strategy', body: 'Business analysis, competitor research, platform selection, and commerce roadmap definition.' },
          { title: 'UX & Architecture', body: 'Wireframes, user flow mapping, tech architecture, and data model design with your team.' },
          { title: 'Development & AI Build', body: 'Agile sprints, platform development, AI model training, and integration engineering.' },
          { title: 'QA & Performance', body: 'Load testing, conversion rate optimization, security audit, and UAT sign-off.' },
          { title: 'Launch & Scale', body: 'Go-live support, monitoring setup, growth analytics, and continuous optimization.' },
        ],
      },
      {
        kind: 'case',
        eyebrow: 'OUR WORK',
        title: 'Granted Beauty Australian Haircare Shopify Storefront',
        label: 'BEAUTY · AUSTRALIA',
        challenge:
          'An Australian clean haircare brand needed a Shopify storefront that could communicate salon-grade product quality, support ritual-based bundle purchasing, and convert first-time visitors through editorial storytelling, all manageable by a small founding team with no dedicated development resource.',
        solution:
          'We built a custom Shopify store with a video hero section, ritual-based bundle product pages with up to 25% automated bundle discounts, free shipping threshold mechanics, and a blog CMS for content publishing. Social commerce integration across Instagram, TikTok, and Facebook gives the brand a fully connected D2C growth engine.',
        impact: [
          '3 haircare ritual bundles live with automated promotional pricing',
          'Full editorial and product CMS control handed to the founding team',
          'Multi-channel social commerce active across Instagram, TikTok, and Facebook',
        ],
        tags: ['Shopify', 'Custom Theme', 'Bundle Commerce', 'D2C Haircare'],
        link: { label: 'Live · Australia', href: 'https://www.grantedbeauty.com.au/' },
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'Solution Bowl delivered a clean and professional 5-page website review with valuable insights and clear recommendations. Their team was responsive, detail-oriented, and easy to work with throughout the process.',
            name: 'Jarrett Marcum',
            role: 'Website Project Manager',
            place: 'Philippines',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Which eCommerce platform should we choose?',
        a: 'We recommend the platform after reviewing your catalogue, operations, fulfilment model, integrations, team capability, and growth targets. Shopify Plus, WooCommerce, Odoo, Adobe Commerce, and custom headless builds each fit different business cases.',
      },
      {
        q: 'Can you migrate our current store without losing SEO?',
        a: 'Yes. We plan redirects, preserve metadata, map product and category URLs, migrate structured data, and validate Core Web Vitals before launch so traffic and revenue are protected during the move.',
      },
      {
        q: 'Do you integrate ERP, inventory, POS, and shipping systems?',
        a: 'Yes. We build API integrations with Odoo, NetSuite, SAP, Oracle, and Microsoft Dynamics so your commerce platform and back-office systems share real-time data with no manual syncing. Order management, inventory levels, customer records, and fulfillment status stay accurate across every channel automatically. We also integrate shipping providers, payment gateways, CRM tools, and marketplace channels, including Amazon, Flipkart, and regional platforms. Whether you need a single integration or a fully connected commerce stack, we architect the middleware and API layer to handle it cleanly and reliably.',
      },
      {
        q: 'Can you add AI features to an existing commerce site?',
        a: "Yes. You do not need to rebuild your store to add AI capability. We integrate AI product recommendations that adapt to each shopper's behavior, support chatbots that handle queries, returns, and order tracking around the clock, and demand forecasting engines that prevent stockouts and overstock events. We also add customer segmentation models, fraud detection layers, inventory reorder alerts, and delivery optimization tools to existing Shopify, WooCommerce, and custom commerce platforms. Most AI integrations are scoped and deployed within 4 to 8 weeks without disrupting your live store.",
      },
      {
        q: 'Do you provide maintenance after launch?',
        a: 'Yes. Every eCommerce project includes post-launch support covering monitoring, bug fixes, performance optimization, security updates, and platform upgrades. For stores with AI integrations, we also handle model retraining and accuracy monitoring as your catalog and customer data evolve. Our SLA-backed maintenance packages are structured around your traffic volume and business criticality, from lightweight monthly retainers for growing stores to dedicated support arrangements for high-volume enterprise platforms. We treat post-launch as the beginning of the engagement, not the end of it.',
      },
      {
        q: 'Do you build eCommerce stores for international markets?',
        a: 'Yes. We build multi-currency, multi-language storefronts for brands selling across India, the Middle East, Australia, the UK, and the US. Our international builds include localized checkout flows, cross-border tax and compliance configuration, regional payment gateway integration, and catalog management from a single backend. Whether you are expanding from one market to three or launching globally from day one, we architect the commerce infrastructure to support it.',
      },
    ],
  },

  // ---------------------------------------------------------------- Machine Learning App Development
  {
    slug: 'ai-ml-service',
    name: 'Machine Learning App Development',
    meta: {
      title: 'AI-Powered Solutions and Machine Learning Development Services',
      description:
        'SolutionBowl AI builds custom AI agents, generative AI, LLM development, NLP, and machine learning solutions for enterprises in 10+ countries. Book a free call.',
    },
    eyebrow: 'AI & MACHINE LEARNING SERVICES',
    title: "AI Development Services for Every Ambitious Startup's Needs",
    lede: 'We build custom AI systems across generative AI, LLMs, NLP, and computer vision for enterprises across India, the Middle East, and global markets.',
    tags: ['Generative AI', 'Custom LLM Development', 'NLP Solutions', 'AI Agent Development', 'Computer Vision', 'MLOps'],
    summary:
      'SolutionBowl AI builds custom AI agents, generative AI, LLM development, NLP, and machine learning solutions for enterprises in 10+ countries.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'WHAT WE BUILD',
        title: 'Six AI Capabilities That Transform How Your Business Operates',
        intro:
          'From proof of concept to production scale, our AI engineers build systems that work in the real world, not just in demos. Every engagement starts with your business outcomes, not the technology.',
        items: [
          {
            title: 'Generative AI Development',
            body: 'We build production-ready generative AI applications on GPT-4o, Claude, Gemini and leading open-source models. Our generative AI development services cover custom LLM fine-tuning, RAG pipeline architecture, prompt engineering and multi-modal AI systems, delivering accurate, grounded and brand-consistent outputs at enterprise scale.',
            tags: ['GPT-4o', 'Claude Sonnet', 'LangChain', 'RAG', 'AI'],
          },
          {
            title: 'AI Agent Development',
            body: 'Our AI agent development team builds autonomous multi-agent systems that plan, reason and execute complex tasks without human intervention. From single-purpose task agents to full multi-agent orchestration frameworks, we design agentic AI solutions that integrate directly into your existing tools, reducing manual workload across operations, customer support and data processing at scale.',
            tags: ['LangGraph', 'CrewAI', 'AutoGen', 'LangChain'],
          },
          {
            title: 'NLP and Conversational AI',
            body: 'We build NLP systems and conversational AI platforms that understand and act on human language at a production scale. From intelligent chatbots and voice assistants to document intelligence and multilingual pipelines, every solution is built on your domain-specific data rather than generic pretrained outputs. We handle intent recognition, entity extraction, RAG-powered knowledge assistants, sentiment analysis, and multilingual pipelines supporting 10+ languages, all grounded in your proprietary data and workflows.',
            tags: ['LangChain', 'Whisper', 'HuggingFace', 'spaCy'],
          },
          {
            title: 'Computer Vision',
            body: 'Object detection, OCR, defect recognition, facial analysis and real-time video analytics, built for production environments in manufacturing, healthcare, retail and security. We integrate vision models directly into your operational workflows so insights surface where decisions are made, not in a separate reporting layer.',
            tags: ['YOLO v10', 'PyTorch', 'OpenCV', 'EfficientNet'],
          },
          {
            title: 'Machine Learning App Development',
            body: 'We build custom machine learning applications that transform your historical data into forward-looking intelligence. Our machine learning development services cover demand forecasting, churn prediction, fraud detection, recommendation engines and credit scoring, each engineered with reproducible training pipelines, documented experiments and production-grade APIs. Whether you need a standalone ML model or a full machine learning software platform, we deliver systems that improve the longer they run.',
            tags: ['XGBoost', 'TensorFlow', 'Scikit-learn', 'MLflow'],
          },
          {
            title: 'AI Process Automation',
            body: 'Rule-based automation breaks on unstructured data, exceptions and edge cases. Our AI-powered process automation solutions handle what legacy RPA cannot, intelligent document processing, approval workflows, data extraction from unstructured sources and high-volume decision-making. We combine custom AI models with workflow orchestration to automate processes that were previously considered too complex or inconsistent to touch.',
            tags: ['n8n', 'Custom RPA', 'Apache Airflow', 'LangChain'],
          },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'OUR PROCESS',
        title: 'From Data to Production in 6 Stages',
        intro:
          'Most AI projects fail not because the technology is wrong, but because the groundwork is skipped. Our structured six-stage delivery ensures every AI-powered solution is grounded in your real data, tested against agreed thresholds and deployed with monitoring in place from day one.',
        steps: [
          {
            title: 'AI Discovery',
            when: 'Week 1 – 2',
            body: 'We work with your team to identify the highest-value artificial intelligence opportunities in your business, assess data readiness and define success metrics that matter to your revenue and operations. Senior ML architects are involved from session one. An NDA is signed before any information is shared.\n• Business problem mapped to measurable AI KPIs\n• Feasibility report with recommended model approach\n• Data requirements and gap analysis completed',
          },
          {
            title: 'Data Audit',
            body: 'A systematic review of your data assets, covering volume, quality, labelling coverage and regulatory constraints. We design a clean, scalable data pipeline architecture before any model training begins. Poor data quality is the single most common reason AI projects fail; this stage eliminates that risk.',
          },
          {
            title: 'Model Build',
            body: 'Our ML engineers select the optimal architecture for your use case, run structured experiments and fine-tune models on your proprietary data. Every experiment is tracked in MLflow with full reproducibility so nothing is lost between iterations. You receive progress updates at agreed checkpoints throughout.',
          },
          {
            title: 'Evaluation',
            body: 'Structured evaluation across accuracy, bias, fairness, latency and edge-case robustness. SHAP and LIME explainability layers are generated so every model decision can be traced and justified. No production deployment happens until all agreed performance thresholds are passed, without exception.',
          },
          {
            title: 'Deployment',
            body: 'Scalable inference infrastructure with CI/CD pipelines, A/B testing capability and real-time monitoring dashboards live on day one. Rollback plans are tested before every production promotion. For high-stakes use cases, shadow mode deployment is available to validate in parallel with your existing system.',
          },
          {
            title: 'Monitoring & Improvement',
            body: 'Production AI models degrade as real-world data distributions shift. We implement automated drift detection, scheduled retraining cycles and monthly model health reviews so your system keeps improving long after launch. The roadmap for the next model iteration is agreed with your team before handover.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'INDUSTRY APPLICATIONS',
        title: 'AI Built for Your Industry',
        items: [
          {
            title: 'Healthcare & MedTech',
            body: 'Diagnostic imaging AI, clinical NLP for patient records, risk stratification models and HIPAA-compliant data pipelines that connect directly to existing clinical systems.',
            tags: ['Computer Vision', 'Clinical NLP', 'HIPAA'],
          },
          {
            title: 'Fintech & Banking',
            body: 'Real-time fraud detection engines, ML-powered credit scoring, transaction monitoring systems and AML compliance intelligence built to operate at enterprise transaction volume.',
          },
          {
            title: 'eCommerce & Retail',
            body: 'Deep learning recommendation engines, demand forecasting models, AI-powered pricing optimisation and visual search, driving measurable lifts in conversion rate and average order value.',
          },
          {
            title: 'EdTech & eLearning',
            body: 'Adaptive learning path engines, AI tutors, automated assessment grading and student performance analytics that personalise learning at scale without increasing instructor workload.',
          },
          {
            title: 'Logistics & Supply Chain',
            body: 'Route optimisation AI, demand sensing models, warehouse computer vision and predictive maintenance solutions that reduce downtime and improve delivery performance across your network.',
          },
          {
            title: 'Manufacturing',
            body: 'Real-time quality control vision systems, defect detection at production-line speed, predictive maintenance AI and scheduling optimisation built for Industry 4.0 environments.',
          },
          {
            title: 'SaaS & Enterprise',
            body: 'AI copilot assistants embedded in your product, intelligent semantic search, AI-powered analytics dashboards and churn prediction models that keep your retention metrics moving in the right direction.',
          },
          {
            title: 'Real Estate & PropTech',
            body: 'Property valuation models, lead scoring engines, AI lease analysis tools and intelligent document extraction systems that cut the time from inquiry to qualified decision.',
          },
        ],
      },
      {
        kind: 'stack',
        eyebrow: 'TECHNOLOGY STACK',
        title: 'Production-Grade AI Stack',
        intro:
          'Battle-tested tools chosen for capability and production-readiness, not hype. Every technology in our stack has been validated in live client deployments.',
        groups: [
          {
            name: 'AI Models',
            items: [
              'GPT-4o / o1 (OpenAI LLM)',
              'Claude Sonnet (Anthropic LLM)',
              'Gemini 1.5 (Google LLM)',
              'Llama 3 (Open Source)',
              'YOLO v10 (Computer Vision)',
              'Whisper (Speech and ASR)',
              'Mistral (Open Source)',
              'EfficientNet (Vision Model)',
            ],
          },
          {
            name: 'Data & Vector',
            items: [
              'Pinecone (Vector DB)',
              'Weaviate (Vector Search)',
              'pgvector (SQL and Vector)',
              'Apache Spark (Big Data)',
              'Airflow (Data Pipelines)',
              'dbt (Data Transform)',
              'Qdrant (Vector Search)',
              'Chroma (Embedding DB)',
            ],
          },
        ],
      },
      {
        kind: 'case',
        eyebrow: 'OUR WORK',
        title: 'Galinia AI Meditation App That Writes a Personalized Session in Seconds',
        label: 'HEALTHTECH · GLOBAL',
        challenge:
          "A wellness startup needed to build an AI system that could read a user's emotional state from free-form text input and generate a unique, personalized guided meditation script in real time, every single time. No two users would receive the same session. The system had to feel genuinely human, respond in seconds, and operate reliably at scale on iOS across a global audience.",
        solution:
          'We built a generative AI pipeline that processes free-form user input, detects emotional tone using NLP, and produces a fresh meditation script tailored to that exact moment. A voice synthesis layer delivers each session across multiple guide voices with ambient sound layering. Six AI meditation styles, including mindfulness, sleep, affirmations, and visualization, plus an auto-style selector and multilingual support, are all shipped in the production iOS app.',
        impact: [
          'Personalized AI meditation script was generated from user input in under 5 seconds',
          '6 meditation styles with automatic selection based on detected emotional tone',
          'Live on the App Store with multilingual support and a growing global user base',
        ],
        tags: ['Generative AI', 'NLP', 'Voice Synthesis', 'iOS', 'Health and Fitness'],
        link: { label: 'Live on App Store · Global', href: 'https://play.google.com/store/apps/details?id=com.galiniaai' },
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'SolutionBowl is a solid service provider. I will not hesitate to work with them again for any similar website development projects. Recommended!',
            name: 'C3 Film Guide',
            role: 'Film Guide Platform',
            place: 'USA',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What are AI-powered solutions?',
        a: 'AI-powered solutions are custom software systems that use machine learning, generative AI, natural language processing and computer vision to automate decisions, surface predictions and generate outputs that would otherwise require human effort at scale. Unlike conventional software that executes fixed rules, AI-powered solutions learn from your data and improve over time. At SolutionBowl, our AI-powered solutions span intelligent automation of repetitive workflows, predictive analytics models that forecast demand and risk, and AI integration layers that embed intelligence directly into your existing products and platforms. The result is data-driven decision making across your business, not just in isolated dashboards.',
      },
      {
        q: 'How does AI help businesses grow?',
        a: 'AI drives business growth through three compounding levers: Intelligent automation eliminates repetitive manual work, freeing your team to focus on higher-value decisions. Predictive analytics turns historical data into forward-looking intelligence: demand forecasting, churn risk identification and lead scoring before your sales team makes a single call. AI integration embeds capability directly into customer-facing products, increasing engagement and reducing support cost. Businesses investing in digital transformation using AI report faster cycle times, lower cost per transaction and compounding model performance gains. Our clients across HealthTech, Fintech, Logistics and SaaS see measurable impact within the first quarter.',
      },
      {
        q: 'What industries benefit most from AI?',
        a: 'Every data-generating industry benefits from AI, but the sectors where we see the fastest ROI on AI integration are Healthcare and MedTech (diagnostic imaging, clinical NLP, risk stratification), Fintech and Banking (real-time fraud detection, ML credit scoring, AML compliance), eCommerce and Retail (recommendation engines, demand forecasting, pricing optimisation), Logistics and Supply Chain (route optimisation, predictive maintenance, warehouse vision), and Enterprise SaaS (AI copilots, semantic search, churn prediction). Digital transformation using AI is particularly high-impact in industries with large volumes of unstructured data, such as documents, images and customer interactions, because intelligent automation and predictive analytics turn that data from a storage cost into a strategic asset. If your business processes data at volume and makes repeated decisions, AI will create leverage.',
      },
      {
        q: 'What is generative AI in business?',
        a: 'Generative AI refers to large language models and multi-modal AI systems that create original outputs adapted to your specific domain. In practice, it means AI-powered solutions that: Draft contracts, generate product descriptions, produce code and summarise documents at scale; Answer customer queries and synthesise reports, faster than any human team can manage; Turn unstructured information locked in documents and conversations into usable intelligence for data-driven decision making. SolutionBowl builds on GPT-4o, Claude Sonnet, Gemini and leading open-source models, combining fine-tuning with retrieval-augmented generation to keep outputs accurate, grounded and brand-consistent.',
      },
      {
        q: 'How to implement AI in a company?',
        a: 'Start with the highest-value problem, not the most exciting technology. Our structured six-stage approach ensures every deployment is grounded in your real data and monitored from day one: AI Discovery: map business problems to measurable KPIs and assess data readiness. Data Audit: design clean, scalable pipelines before any model training begins. Model Build: tracked experiments and fine-tuning on your proprietary data. Evaluation: accuracy, bias and fairness testing against agreed thresholds before production. Deployment: CI/CD pipelines and real-time monitoring dashboards live from day one. Monitoring and Improvement: drift detection and retraining cycles to keep performance compounding. Digital transformation using AI is a capability build, not a one-time project. Start with one use case where intelligent automation or predictive analytics delivers a measurable outcome within 12 weeks, prove the ROI, then scale.',
      },
      {
        q: 'How long does custom AI and ML development take?',
        a: 'Timelines depend on project scope and data readiness: AI proof of concept: 2 to 4 weeks. Custom ML model or NLP solution with API and dashboard: 6 to 14 weeks. Enterprise AI platform with data pipelines, MLOps, fine-tuned LLMs and monitoring: 4 to 9 months. Our average delivery time across all AI engagements is 12 weeks to a working MVP. A confirmed milestone map is shared at the end of every discovery phase so the timeline is never a surprise.',
      },
      {
        q: 'Who owns the AI models and training data after the project ends?',
        a: 'You own everything, 100%, from day one. Before any work begins we sign an NDA and a full IP assignment agreement. At project handover all trained model weights, training datasets, pipeline code, documentation and infrastructure configurations transfer entirely to you. We retain no rights to any part of what was built. This applies to every AI and machine learning engagement regardless of model type, size or complexity.',
      },
    ],
  },

  // ---------------------------------------------------------------- AI-Ecommerce
  {
    slug: 'ai-ecommerce',
    name: 'AI-Ecommerce',
    meta: {
      title: 'AI for eCommerce | Chatbot, Inventory & Delivery AI | SolutionBowl',
      description:
        'SolutionBowl builds AI systems for eCommerce custom chatbots with 72% ticket deflection, delivery optimisation, inventory forecasting at 92% accuracy, and warehouse automation.',
    },
    eyebrow: 'AI FOR ECOMMERCE',
    title: 'Sell Smarter with AI-Powered eCommerce Solutions',
    lede: 'We build production-grade AI systems for eCommerce teams across India, the Middle East, and global markets from intelligent chatbots and demand forecasting to last-mile delivery optimisation and warehouse automation.',
    tags: ['Custom AI Chatbot', 'Delivery Optimisation', 'Inventory Forecasting', 'Warehouse Automation'],
    summary:
      'SolutionBowl builds AI systems for eCommerce custom chatbots with 72% ticket deflection, delivery optimisation, inventory forecasting at 92% accuracy, and warehouse automation.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'OUR AI SOLUTIONS',
        title: 'AI Solutions Built for Every Layer of eCommerce',
        intro:
          'Transform customer support, delivery operations, automation workflows, and business intelligence with enterprise-grade AI systems.',
        items: [
          {
            title: 'Custom AI Chatbot & Support Advisory',
            labels: ['AI SUPPORT & CONVERSION', 'Ticket Deflection Rate: 72% deflected'],
            body: 'A bespoke conversational AI trained on your entire product catalogue, brand voice, policies, and past support interactions. It handles pre-sale queries, order tracking, returns, and upsells - 24/7, in any language, at millisecond speed.',
            points: [
              'RAG-powered knowledge base trained on your store data',
              'Real-time order tracking & returns processing via API',
              'Smart upsell & cross-sell recommendations in chat',
              'Multilingual support with sentiment-aware escalation',
              'Omnichannel - website, WhatsApp, Instagram DM, email',
            ],
          },
          {
            title: 'AI Delivery Optimisation',
            labels: ['LAST-MILE INTELLIGENCE', 'On-Time Delivery Lift: +28% on-time'],
            body: 'Dynamic route planning, carrier selection, and ETA prediction powered by real-time machine learning. The system factors traffic, weather, order priority, vehicle capacity and SLA windows simultaneously - cutting cost per delivery while raising on-time performance.',
            points: [
              'Real-time dynamic routing with live traffic integration',
              'AI carrier scoring and auto-allocation by cost + SLA',
              'Predictive ETA engine with <5% deviation accuracy',
              'Customer-facing live tracking with proactive SMS/email',
              'Batch consolidation & multi-stop route optimisation',
            ],
          },
          {
            title: 'AI Inventory Forecasting',
            labels: ['DEMAND INTELLIGENCE', 'Forecast Accuracy: 92% accuracy'],
            body: 'Machine learning demand forecasting that ingests your historical sales, seasonal trends, marketing calendars, supplier lead times and external signals - automatically generating replenishment orders to eliminate stockouts and overstock simultaneously.',
            points: [
              'SKU-level demand prediction up to 12 weeks ahead',
              'Seasonal, promotional & external signal modelling',
              'Auto-reorder triggers with supplier lead-time logic',
              'Overstock & dead-stock clearance alert system',
              'Multi-warehouse & multi-region inventory balancing',
            ],
          },
          {
            title: 'Warehouse Automation',
            labels: ['FULFILMENT INTELLIGENCE', 'Pick Accuracy After AI: 99.6% accurate'],
            body: 'AI-powered warehouse management that orchestrates pick paths, slotting optimisation, inbound putaway, and quality inspection - using computer vision and reinforcement learning to maximise throughput and reach near-zero error rates without ripping out your existing infrastructure.',
            points: [
              'AI pick-path optimisation with real-time re-routing',
              'Computer vision QC inspection at packing stations',
              'Smart slotting based on velocity & affinity analysis',
              'Predictive maintenance for conveyor & robotic systems',
              'WMS integration - works with your existing software',
            ],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'AI OPERATING STACK',
        title: 'A Connected AI Layer for Every Commerce Signal',
        intro:
          'We connect customer conversations, product data, inventory movement, fulfilment events, and delivery performance into one decision-making layer.',
        items: [
          {
            title: 'Unified Data Backbone',
            body: 'Clean pipelines from Shopify, WooCommerce, OMS, WMS, CRM, support desk, and delivery partners.',
          },
          {
            title: 'Prediction & Decision Models',
            body: 'Demand forecasting, support routing, replenishment logic, carrier scoring, and anomaly detection.',
          },
          {
            title: 'Workflow Automation',
            body: 'Automated escalations, stock alerts, route updates, fulfilment actions, and live dashboards.',
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'REAL-TIME INTELLIGENCE',
        title: 'Signals become actions before problems reach the customer.',
        paragraphs: [
          'The stack continuously reads order velocity, support intent, carrier delays, stock pressure, and fulfilment capacity so each workflow can adapt automatically.',
        ],
      },
      {
        kind: 'process',
        eyebrow: 'OUR PROCESS',
        title: 'From First Call to Full Production',
        intro: 'A proven 5-stage delivery model that gets your AI live in 12 weeks - with zero disruption to existing operations.',
        steps: [
          {
            title: 'Discovery & Data Audit',
            body: 'We map your eCommerce stack, data sources, and pain points. You receive a feasibility report, recommended AI architecture, and a data readiness score - all within the first two weeks.',
          },
          {
            title: 'Model Design & Integration Architecture',
            body: 'We design the AI model architecture, define integration touchpoints with your OMS, WMS, and CRM, and confirm the data pipeline. Every technical decision is documented before a line of code is written.',
          },
          {
            title: 'Build, Train & Fine-Tune',
            body: 'Core AI build sprint - models are trained on your proprietary data, fine-tuned to your product domain, and tested against agreed accuracy benchmarks. Weekly demos keep you aligned throughout.',
          },
          {
            title: 'Staging, QA & Go-Live',
            body: 'Full end-to-end testing in your staging environment, load testing under production traffic volumes, and a coordinated go-live with rollback capability. Zero-downtime deployment is standard.',
          },
          {
            title: 'Monitor, Retrain & Scale',
            body: 'Post-launch, our MLOps layer monitors model drift, triggers retraining on new data, and surfaces performance insights via a live dashboard. Your AI gets smarter every week automatically.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'BUSINESS IMPACT',
        title: 'Where the AI Pays for Itself',
        intro:
          'Every model is tied to operational metrics your team already tracks: conversion, support load, delivery cost, stock availability, and fulfilment accuracy.',
        items: [
          {
            title: '18% Higher Average Order Value',
            body: 'Recommendation logic uses customer intent, product affinity, and purchase history to surface the right bundle or upsell at the right moment.',
          },
          {
            title: '28% Lower Delivery Cost',
            body: 'Carrier selection, batch routing, and ETA prediction reduce waste across last-mile operations without weakening customer promises.',
          },
          {
            title: '99.6% Pick Accuracy',
            body: 'Warehouse intelligence improves pick paths, packing checks, replenishment timing, and exception handling inside your existing workflow.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'CASE STUDIES',
        title: 'AI eCommerce Work Built Around Measurable Outcomes',
        intro:
          'Practical examples of how AI improves support, inventory, fulfilment, and delivery performance inside real commerce operations.',
        items: [
          {
            title: 'Conversational AI for a High-Volume D2C Store',
            labels: ['AI SUPPORT & SALES'],
            body: 'We designed an AI shopping assistant that answers product questions, tracks orders, resolves return requests, and recommends bundles from live catalogue data.',
            points: ['72% ticket deflection', '18% lift in average order value'],
          },
          {
            title: 'Demand Forecasting for Multi-Warehouse Retail',
            labels: ['INVENTORY INTELLIGENCE'],
            body: 'SKU-level forecasting connected order history, promotions, supplier lead times, and regional demand signals to reduce stockouts and excess inventory.',
            points: ['92% forecast accuracy', 'Fewer stockout events'],
          },
          {
            title: 'Last-Mile Routing for Faster Fulfilment',
            labels: ['DELIVERY OPTIMISATION'],
            body: 'A delivery intelligence layer scored carriers, planned route batches, predicted ETAs, and triggered proactive customer updates through existing logistics tools.',
            points: ['28% lower delivery cost', 'Higher on-time performance'],
          },
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'Solution Bowl delivered a clean and professional 5-page website review with valuable insights and clear recommendations. Their team was responsive, detail-oriented, and easy to work with throughout the process.',
            name: 'Jarrett Marcum',
            role: 'Website Project Manager',
            place: 'Philippines',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What AI eCommerce solutions do you build?',
        a: 'We build AI chatbots, inventory forecasting engines, delivery optimisation systems, warehouse automation workflows, recommendation models, and custom AI operating layers for online retailers.',
      },
      {
        q: 'Can the AI connect with our existing eCommerce stack?',
        a: 'Yes. We integrate with platforms such as Shopify, WooCommerce, Magento, custom storefronts, OMS, WMS, CRM, support desks, logistics APIs, and payment systems.',
      },
      {
        q: 'How long does an AI eCommerce implementation take?',
        a: 'Timelines depend on data readiness and integration complexity, but most focused systems move from discovery to production in phased releases over several weeks.',
      },
      {
        q: 'Do you support stores outside India?',
        a: 'Yes. We work with eCommerce teams across India, the Middle East, and global markets, with workflows designed for multi-region catalogues, fulfilment, and customer support.',
      },
      {
        q: 'Can AI help reduce support and delivery costs?',
        a: 'Yes. AI assistants can deflect repetitive support tickets, while routing and fulfilment intelligence can reduce delivery waste, improve ETA accuracy, and surface operational exceptions earlier.',
      },
    ],
  },

  // ---------------------------------------------------------------- Automation
  {
    slug: 'automation',
    name: 'Automation',
    meta: {
      title: 'Intelligent Automation Services and RPA | SolutionBowl.ai',
      description:
        'RPA, workflow automation & AI agents for enterprises across the Middle East, the US, and the UK. 80% time saved, 95.7% uptime. We automate what slows your team down.',
    },
    eyebrow: 'AUTOMATION SOLUTIONS',
    title: 'Intelligent Automation Services That Replace Manual Work With AI-Driven Decisions',
    lede: 'From eliminating repetitive back-office tasks to running self-optimising marketing campaigns and deploying intelligent AI agents - we build automation that frees your team to do what only humans can.',
    tags: ['AI Agents', 'Workflow Orchestration', 'RPA Automation', 'API Integrations'],
    summary: 'RPA, workflow automation & AI agents for enterprises across the Middle East, the US, and the UK.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'WHAT WE BUILD',
        title: 'Solutions Across Every Automation Category',
        intro: 'Pick a pillar and explore the specific capabilities we deliver under each practice area.',
        items: [
          {
            title: 'Robotic Process Automation',
            labels: ['Business Process'],
            body: 'Software bots that replicate human interactions across any desktop, web or legacy application - no API required. Ideal for data entry, form submissions, report generation and copy-paste workflows.',
          },
          {
            title: 'Workflow Orchestration',
            labels: ['Business Process'],
            body: 'Design, deploy and monitor complex multi-step workflows across systems using tools like Airflow, Temporal and custom orchestration engines. Conditional logic, parallel execution and retries built in.',
          },
          {
            title: 'Document Processing & IDP',
            labels: ['Business Process'],
            body: 'Intelligent Document Processing using OCR, NLP and ML to extract, classify and validate data from invoices, contracts, purchase orders and compliance documents - with human-in-loop escalation.',
          },
          {
            title: 'ERP & System Integration',
            labels: ['Business Process'],
            body: 'Connect your ERP, CRM, HRMS and custom systems via REST, SOAP or event-driven APIs. Bidirectional sync, data transformation, deduplication and real-time event propagation across your stack.',
          },
          {
            title: 'Compliance & Audit Automation',
            labels: ['Business Process'],
            body: 'Automate regulatory reporting, audit trail generation, SLA monitoring and policy enforcement. Reduce compliance overhead by up to 70% and eliminate manual submission errors.',
          },
          {
            title: 'HR & Finance Process Automation',
            labels: ['Business Process'],
            body: 'Automate onboarding, payroll processing, expense approvals, purchase orders and month-end close. Free your finance and HR teams from high-volume, low-value manual tasks.',
          },
          {
            title: 'Autonomous AI Agents',
            labels: ['Intelligent Automation'],
            body: 'Deploy goal-directed AI agents that plan, use tools, call APIs and make multi-step decisions autonomously - capable of handling complex exception scenarios without human intervention.',
          },
          {
            title: 'Anomaly Detection & Alerting',
            labels: ['Intelligent Automation'],
            body: 'Real-time ML models that monitor transaction streams, operational metrics and supply chain signals, auto-flag deviations and trigger remediation workflows before issues escalate.',
          },
          {
            title: 'NLP-Powered Data Extraction',
            labels: ['Intelligent Automation'],
            body: 'Extract, classify and transform unstructured data from emails, PDFs, chats and voice transcripts using large language models and fine-tuned NLP pipelines - at scale and in real time.',
          },
          {
            title: 'Predictive Decision Engines',
            labels: ['Intelligent Automation'],
            body: 'ML-powered decision systems that evaluate hundreds of signals in milliseconds - automating credit approvals, dynamic pricing, inventory replenishment and resource allocation decisions.',
          },
          {
            title: 'Self-Learning Pipelines',
            labels: ['Intelligent Automation'],
            body: 'Automation systems that monitor their own performance, detect model drift and trigger retraining pipelines automatically - keeping accuracy high without manual MLOps overhead.',
          },
          {
            title: 'Hyperautomation Platforms',
            labels: ['Intelligent Automation'],
            body: 'Full-stack hyperautomation combining RPA, AI, process mining and low-code orchestration into a unified platform - scaling automation across every department simultaneously.',
          },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'HOW WE DELIVER',
        title: 'The Automation Strategy Blueprint',
        intro: 'Structured, low-risk and transparent. We move fast without creating brittle systems that break six months later.',
        steps: [
          {
            title: 'Strategic Consultation',
            body: 'Understand business goals, operational challenges, and automation opportunities through process discovery and workflow assessment.',
          },
          {
            title: 'Opportunity Analysis',
            body: 'Identify and prioritize high-impact automation areas based on efficiency gains, scalability, and business value.',
          },
          {
            title: 'Solution Design',
            body: 'Design intelligent automation workflows using RPA, AI agents, APIs, and cognitive automation tailored to business needs.',
          },
          {
            title: 'Testing & Deployment',
            body: 'Validate workflows through end-to-end testing, then deploy with monitoring, optimization, and continuous performance tracking.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'BY THE NUMBERS',
        title: 'Transform Business Operations With AI Automation',
        intro:
          'We build AI-powered workflows, intelligent agents, and business automation systems that reduce manual work, increase productivity, and help companies scale faster.',
        items: [
          {
            title: 'Cut Manual Work By Up To 80%',
            labels: ['80% reduction in repetitive effort'],
            body: 'Automate repetitive tasks like data entry, invoice processing, approvals, reporting, and workflow execution so your team spends more time on high-value work.',
            tags: ['Workflow Automation', 'RPA', 'Process Automation'],
          },
          {
            title: 'Generate And Convert More Leads Automatically',
            labels: ['3x faster lead response speed'],
            body: 'Capture leads from websites, ads, WhatsApp, LinkedIn, and CRM systems, then automatically qualify and assign them to the right sales pipeline.',
            tags: ['Lead Automation', 'CRM Automation', 'Sales AI'],
          },
          {
            title: 'Deploy AI Agents That Work 24/7',
            labels: ['24/7 automated customer engagement'],
            body: 'Intelligent AI assistants handle customer support, answer queries, schedule meetings, qualify leads, and perform repetitive business tasks around the clock.',
            tags: ['AI Agents', 'Customer Support AI'],
          },
          {
            title: 'Connect Your Business Systems Into One Workflow',
            labels: ['10+ systems connected seamlessly'],
            body: 'Integrate ERP, CRM, APIs, email systems, payment platforms, and internal tools into a unified automation ecosystem.',
            tags: ['API Integration', 'ERP Automation'],
          },
          {
            title: 'Increase Engagement With AI Personalization',
            labels: ['60%+ increase in engagement potential'],
            body: 'Deliver personalized emails, messages, and customer journeys using behavior-driven AI workflows that improve interaction and conversion rates.',
            tags: ['Marketing Automation', 'Email AI'],
          },
          {
            title: 'Reliable Automations With Smart Monitoring',
            labels: ['99.9% workflow uptime'],
            body: 'Our automation systems continuously monitor workflows, detect failures instantly, and trigger alerts before operations are impacted.',
            tags: ['Monitoring', 'Business Automation'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'SEE IT IN ACTION',
        title: 'Three Pillars, One Connected System',
        intro:
          "Automation works best when the three layers share data and reinforce each other. Here's what each pillar looks like at work.",
        items: [
          {
            title: 'Workflows That Run Themselves',
            labels: ['BUSINESS PROCESS'],
            body: 'RPA bots, orchestration engines and integration middleware working 24/7 without human hand-holding.',
          },
          {
            title: 'Campaigns That Convert on Autopilot',
            labels: ['MARKETING'],
            body: 'Hyper-personalised sequences triggered by real intent signals - turning browsers into buyers without manual intervention.',
          },
          {
            title: 'AI That Learns and Decides',
            labels: ['INTELLIGENT'],
            body: 'Autonomous agents, anomaly detectors and self-optimising decision engines that handle complexity at machine speed.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'INDUSTRIES WE AUTOMATE',
        title: 'Automation Expertise Across Every Major Vertical',
        items: [
          {
            title: 'Healthcare & MedTech',
            body: 'Prior auth automation, patient scheduling, clinical data extraction and HIPAA-compliant document workflows.',
          },
          {
            title: 'Fintech & Banking',
            body: 'KYC/AML automation, reconciliation, real-time fraud detection and automated regulatory reporting.',
          },
          {
            title: 'eCommerce & Retail',
            body: 'Inventory automation, order orchestration, personalised email flows and abandoned cart recovery pipelines.',
          },
          {
            title: 'EdTech & eLearning',
            body: 'Student onboarding automation, course completion triggers, adaptive content delivery and certificate generation.',
          },
          {
            title: 'Logistics & Supply Chain',
            body: 'Freight booking automation, ETA prediction, invoice reconciliation and carrier integration workflows.',
          },
          {
            title: 'SaaS & Enterprise',
            body: 'Trial-to-paid automation, CSM health score alerts, billing workflows and AI-powered churn prevention.',
          },
          {
            title: 'Real Estate & PropTech',
            body: 'Lead nurture automation, document extraction, property listing workflows and tenant communication systems.',
          },
          {
            title: 'Manufacturing',
            body: 'Quality control automation, predictive maintenance alerts, procurement workflows and IoT-triggered processes.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'WHY SOLUTIONBOWL',
        title: 'We Build Automation That Survives the Real World',
        items: [
          {
            title: 'Full-Stack, Not Point-Solutions',
            body: 'We architect end-to-end automation - not isolated bots that break when a system changes. Our integrations are built to evolve with your tech stack.',
          },
          {
            title: 'AI-First by Default',
            body: "Rule-based automation has a ceiling. We layer AI models where logic isn't enough - handling ambiguity, learning from exceptions and improving over time.",
          },
          {
            title: 'Production-Grade Reliability',
            body: '99.7% pipeline uptime backed by self-healing architectures, Slack alerting, detailed logging and SLA-level monitoring dashboards your team can own.',
          },
          {
            title: '48-Hour Discovery to Roadmap',
            body: 'Our automation audit process is fast and structured. In 48 hours you receive a prioritised list of opportunities with estimated ROI, effort and dependencies.',
          },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'INTELLIGENT AUTOMATION',
        title: "We Don't Just Automate - We Architect Futures",
        paragraphs: [
          'Every engagement starts with understanding how your business actually works before we write a single line of automation code.',
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'SolutionBowl is a solid service provider. I will not hesitate to work with them again for any similar website development projects. Recommended!',
            name: 'C3 Film Guide',
            role: 'Film Guide Platform',
            place: 'USA',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Intelligent Automation?',
        a: 'Intelligent Automation combines AI, workflows, APIs, and automation tools to streamline business operations.',
      },
      {
        q: 'Which business processes can be automated?',
        a: 'Sales, HR, finance, operations, customer support, ERP workflows, reporting, and marketing processes can all be automated.',
      },
      {
        q: 'Do you provide custom automation solutions?',
        a: 'Yes, we design tailored automation systems based on specific business workflows and operational goals.',
      },
      {
        q: 'Can automation integrate with existing software?',
        a: 'Yes, automation can connect with CRMs, ERPs, APIs, cloud platforms, and third-party business tools.',
      },
      {
        q: 'Is AI automation suitable for small businesses?',
        a: 'Yes, scalable automation solutions can improve efficiency for startups, SMEs, and enterprises alike.',
      },
      {
        q: 'How long does automation implementation take?',
        a: 'The timeline depends on process complexity, integrations, and the scale of automation required.',
      },
    ],
  },

  // ---------------------------------------------------------------- Internet of Things (IoT)
  {
    slug: 'internet-of-things-iot',
    name: 'Internet of Things (IoT)',
    meta: {
      title: 'IoT App, IIoT, Wearable and Cloud IoT Development Services',
      description:
        'We build IoT applications, IIoT platforms, Smart TV apps, wearable solutions, and cloud IoT systems that connect real-world devices with secure, scalable software.',
    },
    eyebrow: 'INTERNET OF THINGS (IOT)',
    title: 'Build connected products that sense, automate, and scale.',
    lede: 'SolutionBowl designs IoT applications, IIoT platforms, Smart TV apps, wearable experiences, and cloud IoT systems that connect real-world devices with secure, usable software.',
    tags: [
      'IoT App Development',
      'Industrial IoT (IIoT) Development',
      'Smart TV App Development',
      'Wearable App Development',
      'Cloud IoT Development',
    ],
    summary:
      'We build IoT applications, IIoT platforms, Smart TV apps, wearable solutions, and cloud IoT systems that connect real-world devices with secure, scalable software.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'IOT SERVICES',
        title: 'Everything Your Connected Product Needs',
        intro:
          'We cover the full software side of IoT, from device-facing apps to industrial operations platforms and cloud infrastructure.',
        items: [
          {
            title: 'IoT App Development',
            body: 'Mobile and web apps that control devices, surface live telemetry, automate actions, and give teams a single command layer.',
            points: ['Device dashboards', 'Remote controls', 'Alerts and automations'],
          },
          {
            title: 'Industrial IoT (IIoT) Development',
            body: 'Connected factory, asset monitoring, predictive maintenance, and plant-floor visibility systems for industrial operations.',
            points: ['Machine telemetry', 'Downtime detection', 'Maintenance intelligence'],
          },
          {
            title: 'Smart TV App Development',
            body: 'Responsive Smart TV applications for OTT, retail, hospitality, education, dashboards, and in-room digital experiences.',
            points: ['TV-first interfaces', 'Remote-friendly UX', 'Streaming integrations'],
          },
          {
            title: 'Wearable App Development',
            body: 'Wearable apps that capture signals, guide users in real time, sync with mobile apps, and support health, fitness, and workforce use cases.',
            points: ['Sensor data capture', 'Companion apps', 'Low-power workflows'],
          },
          {
            title: 'Cloud IoT Development',
            body: 'Cloud-native IoT platforms that connect devices, process events, secure data, and scale from pilot fleets to production networks.',
            points: ['MQTT and APIs', 'Device registry', 'Real-time analytics'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'CONNECTED PRODUCT LAB',
        title: 'From prototype signal to production fleet.',
        intro:
          'IoT projects succeed when devices, networks, apps, cloud, and operations are designed together. We turn fragmented device signals into useful workflows your users can trust every day.',
        items: [
          { title: 'Gateway and connectivity logic' },
          { title: 'Telemetry storage and data models' },
          { title: 'Real-time alerts and escalation rules' },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'ARCHITECTURE',
        title: 'A Full IoT Stack, Not Just an App Screen',
        intro:
          'We design the layers that keep connected systems reliable: devices, transport, cloud services, and user experiences.',
        items: [
          {
            title: 'Device Layer',
            body: 'Sensors, controllers, gateways, wearables, TVs, and embedded hardware connected to reliable data pipelines.',
          },
          {
            title: 'Connectivity Layer',
            body: 'MQTT, WebSockets, BLE, Wi-Fi, cellular, LoRaWAN, REST APIs, and event streams designed for real-world reliability.',
          },
          {
            title: 'Cloud Layer',
            body: 'Managed ingestion, storage, identity, rules, analytics, observability, and scalable backend services.',
          },
          {
            title: 'Experience Layer',
            body: 'Mobile apps, dashboards, smart TV interfaces, wearable flows, alerts, reports, and operator workspaces.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'USE CASES',
        title: 'Built for Device-heavy operations.',
        intro:
          'Whether the endpoint is a factory controller, a wearable sensor, a Smart TV, or a field asset, we shape the software around the operating environment.',
        items: [
          {
            title: 'Manufacturing',
            body: 'Production visibility, asset monitoring, predictive maintenance, quality checks, and energy tracking.',
          },
          {
            title: 'Healthcare',
            body: 'Remote monitoring, wearable signals, device dashboards, alerts, and compliant data workflows.',
          },
          {
            title: 'Retail and Hospitality',
            body: 'Smart screens, connected rooms, queue analytics, inventory signals, and customer-facing TV experiences.',
          },
          {
            title: 'Logistics',
            body: 'Fleet signals, cold-chain monitoring, route visibility, sensor alerts, and warehouse telemetry.',
          },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'DELIVERY PROCESS',
        title: 'How We Move Your IOT Ideas Into Production',
        intro:
          'We keep the build grounded in real devices, measurable operations, and secure production readiness from the first sprint.',
        steps: [
          {
            title: 'Use Case Discovery',
            body: 'We map devices, users, operating conditions, data signals, security needs, and measurable business outcomes.',
          },
          {
            title: 'Prototype and Integration',
            body: 'We validate firmware touchpoints, gateway logic, cloud ingestion, app flows, and device-to-cloud reliability early.',
          },
          {
            title: 'Platform Build',
            body: 'We build the production application, APIs, device registry, analytics, alerts, permissions, and admin controls.',
          },
          {
            title: 'Secure Launch',
            body: 'We harden authentication, encryption, monitoring, OTA readiness, and release workflows before rollout.',
          },
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'SolutionBowl is a solid service provider. I will not hesitate to work with them again for any similar website development projects. Recommended!',
            name: 'C3 Film Guide',
            role: 'Film Guide Platform',
            place: 'USA',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What IoT development services do you provide?',
        a: 'We provide IoT app development, Industrial IoT platform development, Smart TV app development, wearable app development, cloud IoT development, dashboards, API integrations, and monitoring systems.',
      },
      {
        q: 'Can you connect IoT apps with existing business software?',
        a: 'Yes. We integrate IoT systems with ERPs, CRMs, warehouse tools, support desks, analytics platforms, cloud services, and custom APIs so device data becomes operationally useful.',
      },
      {
        q: 'Do you build both the app and cloud backend?',
        a: 'Yes. We build mobile apps, web dashboards, cloud APIs, device registries, event processing, alerting, analytics, and admin tools. We can also collaborate with firmware and hardware teams.',
      },
      {
        q: 'How do you handle IoT security?',
        a: 'We design for secure identity, encrypted data transport, role-based access, device authentication, audit trails, monitored APIs, and cloud infrastructure hardening.',
      },
      {
        q: 'Can you start with a prototype before full development?',
        a: 'Yes. For IoT projects we often start with a proof of concept that validates device connectivity, data flow, app controls, and the core business workflow before scaling.',
      },
    ],
  },

  // ---------------------------------------------------------------- Next Tech Solutions
  {
    slug: 'next-tech-solutions',
    name: 'Next Tech Solutions',
    meta: {
      title: 'Enterprise Blockchain and Crypto Development Services India',
      description:
        'We build enterprise blockchain platforms, smart contracts, crypto wallets, DeFi systems, and Web3 apps permissioned ledgers to token platforms, built for production.',
    },
    eyebrow: 'NEXT TECH SOLUTIONS',
    title: 'Enterprise Blockchain and Crypto Development Services',
    lede: 'We build secure blockchain systems for enterprises and crypto products: from permissioned ledgers and smart contracts to wallets, token platforms, DeFi workflows, and Web3 applications. Every build is designed for production from day one.',
    tags: ['Enterprise Blockchain', 'Crypto Development', 'Smart Contracts', 'Wallets'],
    summary:
      'We build enterprise blockchain platforms, smart contracts, crypto wallets, DeFi systems, and Web3 apps permissioned ledgers to token platforms, built for production.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'SERVICE TRACKS',
        title: 'Two Focused Practices Under Next Tech Solutions',
        intro:
          'Enterprise teams need controlled ledgers, audit trails, and system integrations. Crypto products need secure contracts, strong UX, and launch operations. We build both with the same production discipline and the same commitment to getting it right before it goes live.',
        items: [
          {
            title: 'Blockchain Infrastructure for Serious Business Workflows',
            labels: ['ENTERPRISE BLOCKCHAIN SOLUTIONS', 'Audit-ready, permissioned, integration-first'],
            body: 'We design permissioned ledgers, smart contract workflows, and audit-ready systems that help enterprises share data with trust, automate settlement, and eliminate reconciliation friction. Built on Hyperledger Fabric, Corda, and Quorum for regulated, multi-party environments.',
            tags: ['Permissioned Blockchain Networks', 'Supply Chain Traceability', 'Smart Contract Workflows'],
          },
          {
            title: 'Secure Crypto Products from Contract to Customer Experience',
            labels: ['CRYPTO DEVELOPMENT', 'Smart contracts, wallets, token platforms'],
            body: 'We build token systems, wallets, exchange layers, NFT utilities, DeFi workflows, and Web3 applications with security, scalability, and compliance workflows planned from day one. Whether you are launching a token or a full DeFi platform, the architecture is built to last.',
            tags: ['Token and Coin Development', 'Wallet and Payment Systems', 'Exchange and DeFi Platforms'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'WHAT WE BUILD',
        title: 'From Smart Contracts to Enterprise-Grade Platforms',
        intro:
          'Each engagement is scoped around the product outcome: trust, traceability, secure transactions, faster settlement, better user ownership, or new digital asset infrastructure. We do not sell hours. We deliver working systems.',
        items: [
          {
            title: 'Blockchain Consulting and Architecture',
            body: 'Use case validation, chain selection, governance model design, architecture blueprint, compliance touchpoints, and a delivery roadmap your engineering team can actually execute. We give you a clear picture before a single contract is written.',
            tags: ['Strategy', 'Architecture'],
          },
          {
            title: 'Smart Contract Development',
            body: 'Secure Solidity, Rust, and chain-specific contracts built with full test coverage, upgrade planning, gas optimisation, and audit support. We write contracts that behave exactly as intended, every time.',
            tags: ['Solidity', 'Rust'],
          },
          {
            title: 'Web3 Integration',
            body: 'Connect wallets, dApps, APIs, indexers, oracles, payment gateways, and enterprise systems into one reliable, production-ready product experience. We make Web3 accessible without sacrificing security or control.',
            tags: ['WalletConnect', 'APIs'],
          },
          {
            title: 'Digital Identity and Access',
            body: 'Decentralised identity systems, credential verification, role-based access controls, KYC handoffs, and user permission models for regulated and enterprise environments. Identity that works with your business workflows, not against them.',
            tags: ['DID', 'KYC'],
          },
          {
            title: 'Asset Tokenisation',
            body: 'Tokenise real-world assets, loyalty points, carbon credits, memberships, or financial instruments with full controls and reporting. We handle the contract architecture, compliance logic, and the operational tooling your team needs to manage it.',
            tags: ['RWA', 'Loyalty'],
          },
          {
            title: 'Monitoring and Analytics',
            body: 'Transaction dashboards, contract event tracking, suspicious activity alerts, admin panels, and product performance telemetry. Operational visibility built for teams that need to know what is happening on-chain in real time.',
            tags: ['Analytics', 'Alerts'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'ARCHITECTURE',
        title: 'Blockchain Products Need More Than Contracts',
        intro:
          'The useful work happens when contracts, identity, data, admin tooling, monitoring, and customer UX behave like one product. We design the full architecture, not just the on-chain layer.',
        items: [
          { title: 'Business events and off-chain systems' },
          { title: 'Smart contracts and ledger writes' },
          { title: 'Wallet, identity, and permission layer' },
          { title: 'Analytics, alerts, and admin operations' },
        ],
      },
      {
        kind: 'stack',
        eyebrow: 'TECHNOLOGY STACK',
        title: 'Chain-Agnostic, Outcome-Driven Engineering Stack',
        intro:
          'We select tools based on governance requirements, throughput, custody model, cost profile, ecosystem maturity, and the product experience your users need. No chain loyalties. The right tool for the right job.',
        groups: [
          {
            name: 'Enterprise',
            items: ['Hyperledger Fabric', 'Corda', 'Quorum', 'Go', 'Node.js', 'PostgreSQL', 'Kafka', 'AWS KMS'],
          },
          {
            name: 'Crypto',
            items: [
              'Ethereum',
              'Solana',
              'Polygon',
              'Binance Smart Chain',
              'Solidity',
              'Rust',
              'Hardhat',
              'Foundry',
              'The Graph',
              'IPFS',
              'Chainlink',
              'MetaMask SDK',
            ],
          },
          {
            name: 'Security',
            items: ['Slither', 'MythX', 'OpenZeppelin', 'AWS KMS', 'HashiCorp Vault', 'Tenderly', 'Forta'],
          },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'SECURITY AND OPERATIONS',
        title: 'Built for Launch Day and the Day After',
        intro:
          'Crypto and blockchain systems carry real operational risk the moment they go live. We plan for testing, access control, monitoring, upgrade paths, and incident runbooks before production traffic arrives. Security is not a checklist. It is built into every sprint.',
        steps: [
          {
            title: 'Threat modelling and permission review',
            body: 'Map attack paths, admin roles, treasury access, and contract permissions before build work moves forward.',
          },
          {
            title: 'Automated smart contract test coverage',
            body: 'Run repeatable contract tests, regression checks, and simulation flows alongside every sprint.',
          },
          {
            title: 'Admin and treasury access controls',
            body: 'Design role gates, approval paths, and privileged actions with least-access operations in mind.',
          },
          {
            title: 'Transaction monitoring and alerting',
            body: 'Track contract events, suspicious activity, operational signals, and launch-critical alerts.',
          },
          {
            title: 'Launch runbooks and upgrade planning',
            body: 'Prepare rollout steps, fallback plans, ownership handoffs, and upgrade paths before production traffic arrives.',
          },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'DELIVERY PROCESS',
        title: 'A Security-Led Build Path from Idea to Launch',
        intro:
          'We keep the path structured so your team always knows what is being validated, built, tested, and prepared for production. Six stages. No surprises.',
        steps: [
          {
            title: 'Opportunity and Risk Mapping',
            when: 'Week 1',
            body: 'We map your use case against chain options, regulatory exposure, token economics, and technical risk. This stage defines what you are building, why it needs blockchain, and what could go wrong before anything is committed to code.\n• Use case and technical risk map\n• Chain option and regulatory exposure review\n• Initial token economics assumptions',
          },
          {
            title: 'Architecture and Chain Selection',
            when: 'Week 2',
            body: 'We select the right chain, consensus model, smart contract language, and infrastructure components for your specific requirements. You receive a documented architecture decision record before build begins.\n• Architecture decision record\n• Chain and consensus model rationale\n• Infrastructure component blueprint',
          },
          {
            title: 'Contract and Platform Build',
            when: 'Weeks 3-8',
            body: 'We build smart contracts, backend services, APIs, admin tooling, and the user-facing application layer in parallel. Test coverage is written alongside the code, not after.\n• Smart contracts and backend services\n• APIs, admin tooling, and product UI\n• Test coverage written alongside code',
          },
          {
            title: 'Security Review and QA',
            when: 'Weeks 7-10',
            body: 'We run automated contract analysis, manual code review, penetration testing, and functional QA across all system layers. Vulnerabilities found here are resolved before production. Not patched after.\n• Automated contract analysis\n• Manual security and code review\n• Functional QA across system layers',
          },
          {
            title: 'Launch and Integration',
            when: 'Weeks 10-12',
            body: 'We launch with monitored rollouts, connect payment gateways, wallet integrations, analytics pipelines, and support workflows, and prepare fallback plans for critical flows.\n• Production deployment\n• Monitoring and alerting dashboard\n• Launch runbook and rollback plan',
          },
          {
            title: 'Scale and Operate',
            when: 'Post-launch',
            body: 'Post-launch support, performance monitoring, on-chain analytics, upgrade management, and feature development as your product and user base grow. We stay engaged beyond the launch.\n• Post-launch support and performance monitoring\n• On-chain analytics and upgrade management\n• Feature roadmap for product growth',
          },
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'SolutionBowl is a solid service provider. I will not hesitate to work with them again for any similar website development projects. Recommended!',
            name: 'C3 Film Guide',
            role: 'Film Guide Platform',
            place: 'USA',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What blockchain platforms do you build on?',
        a: 'We are chain-agnostic and select the right platform based on your governance needs, transaction volume, privacy requirements, and ecosystem. For enterprise workflows, we build on Hyperledger Fabric, R3 Corda, and Quorum. For crypto and Web3 products, we work with Ethereum, Polygon, Solana, and Binance Smart Chain.',
      },
      {
        q: 'Do you write and audit smart contracts?',
        a: 'Yes. We write Solidity and Rust contracts with full test coverage, gas optimisation, and upgrade planning built in. We also perform automated static analysis and manual security review before deployment. For high-value contracts, we recommend and coordinate third-party audits.',
      },
      {
        q: 'Can you build a crypto wallet for my product?',
        a: 'Yes. We build custodial, non-custodial, and multi-signature wallet solutions with support for ERC-20, ERC-721, and cross-chain assets. Wallet development includes transaction flows, key management, KYC integration, and the companion mobile or web application.',
      },
      {
        q: 'What does asset tokenisation involve?',
        a: 'Asset tokenisation converts ownership of a real-world or digital asset into a blockchain-based token. We handle the full process: smart contract design, token standards (ERC-20, ERC-721, RWA frameworks), compliance logic, minting controls, and the admin dashboard your team uses to manage issuance and reporting.',
      },
      {
        q: 'How do you handle security for blockchain products?',
        a: 'Security is designed in from stage one, not reviewed at the end. Our process includes threat modelling, permission architecture, automated smart contract testing, manual code review, transaction monitoring, and launch runbooks with rollback plans. For regulated industries, we align with applicable compliance requirements throughout the build.',
      },
    ],
  },

  // ---------------------------------------------------------------- DevOps Cloud & Security
  {
    slug: 'devops-service',
    name: 'DevOps Cloud & Security',
    meta: {
      title: 'DevOps Consulting Services | CI/CD and IaC | SolutionBowl.ai',
      description:
        'Expert in DevOps: CI/CD pipelines, Kubernetes, Terraform, DevSecOps, and cloud migration. 4.5x faster releases, 83% fewer incidents. SOC 2 ready. Trusted worldwide.',
    },
    eyebrow: 'DEVOPS, CLOUD & SECURITY SERVICES',
    title: 'DevOps Consulting Services That Ship Fast and Scale Clean',
    lede: 'Engineering teams waste sprint cycles on brittle deployments, manual handoffs, and reactive firefighting. SolutionBowl delivers DevOps consulting services that replace fragile processes with automated pipelines, cloud-native infrastructure, and security built into every release.',
    tags: ['CI/CD Pipelines', 'Kubernetes & Containers', 'Cloud Migration', 'DevSecOps', 'IaC with Terraform and Pulumi'],
    summary: 'Cloud, CI/CD, and security practices built for reliable releases.',
    sections: [
      {
        kind: 'stats',
        items: [
          { value: '↓ 83%', label: 'Incident rate with automated rollbacks' },
          { value: '4.7× Faster', label: 'Deployment Frequency' },
          { value: 'Zero Downtime', label: 'Blue/Green Deploys' },
        ],
      },
      {
        kind: 'stack',
        title: 'A Typical Pipeline We Build for You',
        groups: [
          {
            name: 'Pipeline stages',
            items: [
              'CODE COMMIT',
              'SAST / LINT',
              'UNIT TESTS',
              'DOCKER BUILD',
              'TRIVY SCAN',
              'STAGING DEPLOY',
              'SMOKE TESTS',
              'PROD RELEASE',
            ],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'CI/CD EXCELLENCE',
        title: 'From Weeks-Long Releases to Sub-Hour Deployments',
        intro:
          'Slow release cycles are a competitive disadvantage. Our CI/CD pipeline setup service replaces manual handoffs with fully automated build, test, and deployment workflows configured to your branching strategy and rollback requirements. We design pipelines using GitHub Actions CI/CD, GitLab CI, Jenkins CI/CD, and CircleCI so your team ships on every commit without trading speed for quality.',
        items: [
          {
            title: 'Automated build and test execution on every commit',
            body: 'Pipeline-as-code that lives in your repo and evolves with your product.',
          },
          {
            title: 'Blue-green and canary deployment strategies',
            body: 'SAST, Trivy image scans, and secrets detection on every push - before it goes anywhere near production.',
          },
          {
            title: 'Rollback automation and incident recovery workflows',
            body: 'Every deployment is reversible in seconds with automated rollback triggers on health check failures.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'OUR ENGINEERS. REAL INFRA. REAL OUTCOMES.',
        title: "We don't just advise - we build, deploy, and hand over.",
        intro:
          'Our DevOps engineers work inside your codebase, your cloud account, and your team - not at arm\'s length in a Jira board.',
        items: [
          { title: 'Observability Dashboards', body: 'Grafana · Prometheus · Datadog' },
          { title: 'Embedded Team Approach', body: 'Working side-by-side with your engineers' },
          { title: 'Multi-Cloud Architecture', body: 'AWS · Azure · GCP · DigitalOcean' },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'OUR SERVICES',
        title: 'End-to-End DevOps Services for Engineering Teams That Ship',
        intro:
          'Our DevOps solutions provider model covers every layer of your delivery stack. We build systems your team understands and owns, not black-box setups you inherit without context.',
        items: [
          {
            title: 'CI/CD Pipeline Engineering',
            body: 'We build fully automated CI/CD pipelines using GitHub Actions CI/CD, GitLab CI, and Jenkins CI/CD. Our CI/CD automation cuts release cycles from days to under an hour so your team ships continuously with full confidence.',
            tags: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI'],
          },
          {
            title: 'Kubernetes and Container Orchestration',
            body: 'Our Kubernetes consulting covers cluster design, Helm chart development, autoscaling, and multi-region deployments. We deliver container orchestration that is production-ready and observable from the first cluster.',
            tags: ['Kubernetes', 'Helm', 'Docker', 'KEDA'],
          },
          {
            title: 'Infrastructure as Code',
            body: 'We replace manual server provisioning with version-controlled, repeatable infrastructure. Our IaC services use Terraform services and Ansible automation to keep every environment consistent, auditable, and deployable in minutes.',
            tags: ['Terraform', 'Pulumi', 'Ansible'],
          },
          {
            title: 'Cloud Migration and Architecture',
            body: 'We migrate legacy monoliths and on-premise workloads to cloud-native architectures on AWS, Azure, and GCP with zero data loss and minimal downtime. As a DevOps consulting company, we deliver environments that are production-ready before your team takes ownership.',
            tags: ['AWS', 'Azure', 'GCP'],
          },
          {
            title: 'DevSecOps and Compliance',
            body: 'Our DevSecOps consulting integrates security into every stage of your pipeline instead of treating it as a final checkpoint. Our security engineering implementation covers static and dynamic analysis, container scanning, secrets management, and compliance readiness for SOC 2 and ISO 27001.',
            tags: ['Trivy', 'HashiCorp Vault', 'OWASP', 'Snyk'],
          },
          {
            title: 'Microservices Architecture',
            body: 'We decompose monolithic applications into independently deployable services through a structured microservices migration process. Our microservices architecture services include service mesh setup, API gateway configuration, and distributed tracing built in from the first service boundary.',
            tags: ['Istio', 'Kong', 'Jaeger', 'Kafka'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'WHY DEVOPS',
        title: 'The Real Cost of Fragile, Manual Release Pipelines',
        intro:
          'Every sprint built on a broken delivery process compounds technical debt. Missed deadlines, production outages, and burned-out engineers are predictable outcomes of working without a solid DevOps foundation.',
        items: [
          {
            title: 'Deployments Take Too Long',
            body: 'Manual approval chains and testing queues add days to every release. Our CI/CD automation cuts that to under an hour on every commit.',
          },
          {
            title: 'Production Outages Are Frequent',
            body: 'Reactive incident management means users notice problems before your team does. Automated monitoring and rollbacks flip that equation entirely.',
          },
          {
            title: 'Infrastructure Drift Breaks Environments',
            body: 'Manually configured servers create unpredictable differences across environments. Our IaC services lock every environment to a consistent, auditable state.',
          },
          {
            title: 'Security Is Added at the End',
            body: 'Late-stage security reviews create expensive rework. Our DevSecOps implementation moves security checks to every pull request and every build.',
          },
          {
            title: 'Cloud Costs Grow Without Visibility',
            body: 'Untagged resources and oversized instances compound silently. Our DevOps strategy consulting includes cost governance, rightsizing, and budget alerting.',
          },
        ],
      },
      {
        kind: 'items',
        title: 'DevOps Transformation Experts',
        intro: 'Trusted by engineering teams across 10+ countries',
        items: [
          { title: 'Deploy in minutes, not days', body: 'Fully automated CI/CD with parallel tests, canary releases, and instant rollbacks.' },
          { title: 'Observe everything, fix before it breaks', body: 'Grafana + Prometheus + PagerDuty catch issues before your users even notice.' },
          { title: 'Cut cloud costs by 40–60%', body: 'Right-sizing, Spot instances, auto-scaling, and FinOps dashboards keep infra lean.' },
          { title: 'Security embedded in every commit', body: 'SAST, DAST, container scanning, and secrets rotation baked in - not bolted on after.' },
          { title: 'Infrastructure that scales automatically', body: 'Kubernetes HPA, KEDA, and multi-region failover absorb any traffic spike gracefully.' },
        ],
      },
      {
        kind: 'stats',
        items: [
          { value: 'SOC 2 Ready', label: '6 months avg' },
          { value: '−60% Cost', label: 'Cloud spend avg' },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'CLOUD & DEVSECOPS',
        title: 'Cloud Infrastructure That Scales Without Surprises',
        intro:
          'Building for scale means designing infrastructure that absorbs demand spikes, survives regional failures, and keeps costs predictable as your user base grows. Our DevOps implementation services cover VPC design, multi-region failover, and ongoing cost governance.',
        items: [
          {
            title: 'Multi-region and multi-AZ architecture for high availability',
            body: 'Zero data loss, minimal downtime, full infrastructure-as-code for every resource.',
          },
          {
            title: 'Auto-scaling and load balancer configuration',
            body: 'Dynamic secrets, auto-rotation, and audit logs - no more .env files in Git.',
          },
          {
            title: 'Compliance controls for HIPAA, PCI-DSS, and SOC 2',
            body: 'Right-sizing, Spot/Reserved instances, and dashboards that keep cloud spend in check.',
          },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'HOW WE WORK',
        title: 'A Six-Phase DevOps Transformation Process',
        intro:
          'We audit your current state, design a strategy aligned to your delivery goals, and build systems your team fully owns. No generic playbooks, no black-box handovers.',
        steps: [
          {
            title: 'DevOps Maturity Audit',
            when: 'Days 1–5',
            body: 'We spend 3–5 days embedded in your existing workflows, reviewing your repo structure, deployment scripts, cloud setup, and incident history. We produce a DevOps Maturity Report with a prioritised gap analysis.\n• DevOps Maturity Scorecard (DORA metrics baseline)\n• Prioritised gap analysis and risk register\n• Cloud cost analysis and optimisation quick wins\n• Security posture assessment (OWASP Top 10 coverage)',
          },
          {
            title: 'DevOps Transformation Roadmap',
            when: 'Days 6–10',
            body: 'Based on the audit, we co-create a phased transformation roadmap. We align on technology choices, team structure, and a realistic timeline that fits your release schedule - no big-bang rewrites.\n• Technology selection rationale document\n• Phased implementation roadmap with milestones\n• Team RACI matrix and training plan\n• Risk mitigation strategy for each phase',
          },
          {
            title: 'CI/CD Pipeline Build',
            when: 'Weeks 2–5',
            body: 'We build your CI/CD pipeline from scratch or incrementally improve what exists. Every pipeline we ship includes parallel test execution, automated staging deployments, and one-click production releases with rollback capability.\n• Fully automated CI/CD pipeline for all services\n• Parallel test execution and coverage reporting\n• Staging environment with automated smoke tests\n• Runbook documentation for every pipeline stage',
          },
          {
            title: 'Cloud Infrastructure & Kubernetes',
            when: 'Weeks 4–8',
            body: 'We provision your cloud infrastructure using Terraform and deploy your workloads to Kubernetes. We configure autoscaling, persistent storage, networking, and monitoring so the infra runs itself.\n• Terraform modules for all cloud infrastructure\n• Kubernetes cluster with HPA and cluster autoscaler\n• Grafana + Prometheus observability stack live\n• Cost tagging and FinOps dashboard configured',
          },
          {
            title: 'DevSecOps Hardening',
            when: 'Weeks 6–10',
            body: 'Security is embedded into every layer - SAST in your pipeline, container scanning on every build, secrets management via Vault, and OPA Gatekeeper policies enforcing cluster security standards.\n• SAST and DAST integration in CI pipeline\n• Container image scanning with Trivy on every build\n• HashiCorp Vault for secrets management\n• OPA Gatekeeper policies with admission webhooks',
          },
          {
            title: 'Knowledge Transfer & Handover',
            when: 'Weeks 10–12',
            body: "We don't disappear after go-live. We run knowledge transfer sessions, write runbooks for every operational scenario, and stay available for 30 days post-handover to answer questions and handle edge cases.\n• Full runbook library for all operational scenarios\n• Team training sessions recorded for future reference\n• 30-day hypercare support post-handover\n• Optional ongoing DevOps-as-a-Service retainer",
          },
        ],
      },
      {
        kind: 'stack',
        eyebrow: 'TECHNOLOGY STACK',
        title: 'Tools We Use. Results You Can Measure.',
        intro:
          "We're tool-agnostic and outcome-obsessed. We work with the best-in-class DevOps toolchain and integrate seamlessly with what you already have.",
        groups: [
          { name: 'CI/CD', items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI', 'Azure Pipelines', 'ArgoCD', 'FluxCD'] },
          { name: 'Containers', items: ['Docker', 'Kubernetes', 'Helm', 'Istio', 'Containerd', 'Podman', 'Envoy'] },
          { name: 'Cloud', items: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean', 'Cloudflare', 'AWS EKS', 'AKS'] },
          { name: 'IaC', items: ['Terraform', 'Pulumi', 'Ansible', 'CloudFormation', 'Bicep', 'CDK'] },
          { name: 'Monitoring', items: ['Grafana', 'Prometheus', 'Datadog', 'OpenTelemetry', 'ELK Stack', 'PagerDuty', 'Jaeger'] },
          { name: 'Security', items: ['Trivy', 'HashiCorp Vault', 'SonarQube', 'Snyk', 'OWASP ZAP', 'Falco', 'OPA / Gatekeeper'] },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'INDUSTRIES WE SERVE',
        title: 'DevOps Expertise Across Every Vertical',
        items: [
          { title: 'Healthcare & MedTech', body: 'HIPAA-compliant pipelines' },
          { title: 'Fintech & Banking', body: 'Zero-downtime, PCI-DSS ready' },
          { title: 'eCommerce & Retail', body: 'Flash-sale grade autoscaling' },
          { title: 'EdTech & eLearning', body: 'Global CDN & multi-region' },
          { title: 'Logistics & Supply Chain', body: 'High-availability event pipelines' },
          { title: 'SaaS & Enterprise', body: 'Multi-tenant Kubernetes' },
          { title: 'Media & Broadcasting', body: 'Low-latency streaming infra' },
          { title: 'Real Estate & PropTech', body: 'Cost-optimised cloud stacks' },
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'Solution Bowl delivered a clean and professional 5-page website review with valuable insights and clear recommendations. Their team was responsive, detail-oriented, and easy to work with throughout the process.',
            name: 'Jarrett Marcum',
            role: 'Website Project Manager',
            place: 'Philippines',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What does your DevOps consulting service include?',
        a: 'Our DevOps consulting services cover CI/CD pipeline design, container orchestration, infrastructure as code, cloud migration, security engineering implementation, and microservices architecture. Every engagement starts with an audit and ends with a documented handover your team fully understands.',
      },
      {
        q: 'How long does a DevOps transformation take?',
        a: 'Most engagements run 8 to 12 weeks from audit to handover. Simpler pipeline implementations complete in 4 to 6 weeks. Migrations with HIPAA or SOC 2 compliance requirements typically run 10 to 14 weeks. We share a sprint-level timeline before any infrastructure work begins.',
      },
      {
        q: 'Do you work with our existing tools?',
        a: 'Yes. We assess your current environment before recommending any changes. Where existing tools are fit for purpose, we optimise and integrate them. Where gaps exist, we explain the rationale for any alternative recommendations.',
      },
      {
        q: 'Can you work across AWS, Azure, and GCP?',
        a: 'Yes. Our engineers are certified across all three major cloud platforms and have delivered production infrastructure on each. We also handle hybrid environments where workloads span multiple providers.',
      },
      {
        q: 'What is DevSecOps and why does it matter?',
        a: 'DevSecOps integrates security scanning and policy enforcement directly into your CI/CD pipeline. Vulnerabilities are caught at the pull request stage where they cost the least to fix.',
      },
      {
        q: 'What is included in DevOps managed services after the project?',
        a: 'Our DevOps managed services retainer covers platform optimisation, container platform upgrades, security patch management, incident response support, and quarterly infrastructure reviews.',
      },
      {
        q: 'Do you provide ongoing maintenance and regression testing after launch?',
        a: 'Yes. Quality assurance does not stop at go-live. We offer post-launch QA retainers covering scheduled regression testing on every new release, automated test suite maintenance as your codebase evolves, and performance monitoring to catch degradation before your users do. For teams shipping weekly or bi-weekly sprints, we embed QA engineers directly into your release cycle so every deployment is validated before it reaches production. Retainer packages are scoped by release frequency, team size, and coverage requirements, with SLA-backed response times for critical defect triage.',
      },
    ],
  },

  // ---------------------------------------------------------------- QA & Testing
  {
    slug: 'qa-testing-service',
    name: 'QA & Testing',
    meta: {
      title: 'QA Testing and Software Testing Services | SolutionBowl.ai',
      description:
        'Complete software testing and QA services covering manual testing, automation, security, and mobile app testing. 350+ products tested. 95+% bug detection rate.',
    },
    eyebrow: 'QA & SOFTWARE TESTING SERVICES',
    title: 'QA Testing Services for Software That Works.',
    lede: 'Ship features faster without shipping bugs. SolutionBowl delivers end-to-end software testing services covering manual QA, test automation, performance engineering, and security audits, so your team releases with confidence on every sprint.',
    tags: ['Manual Testing', 'Test Automation', 'Performance Testing', 'Security Testing', 'Mobile App Testing', 'Dedicated QA Team'],
    summary:
      'Complete software testing and QA services covering manual testing, automation, security, and mobile app testing.',
    sections: [
      {
        kind: 'items',
        eyebrow: 'BUILT FOR SPEED & PRECISION',
        title: 'Real-world user simulation.',
        intro:
          'Our QA engineers work as an embedded extension of your team, combining structured test plans with exploratory instinct. From the first commit to production release, we make sure every feature behaves exactly as intended.',
        items: [
          {
            title: 'CI/CD-Integrated Testing',
            body: 'Automated test suites run on every commit, giving your development team instant feedback with no waiting on manual QA queues.',
          },
          {
            title: 'Real-Time Quality Metrics',
            body: 'Dashboards showing test coverage, defect trends, and automation ROI give your team full visibility into quality at every sprint.',
          },
          {
            title: 'Security Baked In',
            body: 'OWASP scans and vulnerability checks run alongside functional tests so security is never left as an afterthought before release.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'OUR QA PRACTICE',
        title: 'Expert Teams. Real Environments. Measurable Results.',
        intro:
          'From manual exploratory sessions to fully automated regression suites, our engineers test software the way real users experience it.',
        items: [
          { title: 'Test Automation Frameworks', body: 'Playwright · Cypress · Selenium · Appium' },
          { title: 'Collaborative QA Review', body: 'Embedded teams working alongside your developers' },
          { title: 'Multi-Device & Platform Testing', body: '200+ real device & OS combinations' },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'CORE QA CAPABILITIES',
        title: 'Three Pillars. One Mission: Zero Defects.',
        intro:
          'Our software quality assurance services cover the full testing lifecycle across functional, non-functional, and security testing, aligned to your delivery pipeline and business goals.',
        items: [
          {
            title: 'Functional Testing',
            body: 'Verify every feature, user flow, and business requirement across web, mobile, and API layers through manual and automated functional testing services.',
            tags: ['Manual', 'Automation', 'API Testing', 'Regression'],
          },
          {
            title: 'Non-Functional Testing',
            body: "Stress-test your system's performance, load tolerance, and scalability before real users hit your platform, not after they report the issue.",
            tags: ['Load Testing', 'Stress Testing', 'Scalability', 'Usability'],
          },
          {
            title: 'Security Testing',
            body: 'Identify vulnerabilities, misconfigurations, and compliance gaps before attackers do through comprehensive VAPT and code-level security analysis.',
            tags: ['VAPT', 'SAST / DAST', 'Pen Testing', 'Compliance'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'QA SERVICES',
        title: 'Every Test Type, Expertly Delivered.',
        intro:
          'From exploratory manual testing to fully automated CI/CD pipelines, our software testing agency handles everything your product needs to ship with confidence.',
        items: [
          {
            title: 'Manual Testing',
            labels: ['EXPLORATORY & SCRIPTED QA'],
            body: 'Our QA engineers go beyond scripted test cases, applying domain knowledge and structured exploration to catch what automation misses. We validate user journeys, edge cases, and UX quality including cross-browser testing services across all major browsers.',
            points: [
              'Functional, UI/UX, and manual regression testing across user flows',
              'Exploratory and ad-hoc testing sessions by senior manual testers',
              'Cross-browser testing services on Chrome, Firefox, Safari, and Edge',
              'Boundary value analysis and equivalence partitioning',
              'Detailed bug reports with severity classification and reproduction steps',
            ],
            tags: ['JIRA', 'Zephyr', 'TestRail', 'Azure DevOps', 'BrowserStack'],
          },
          {
            title: 'Test Automation',
            labels: ['CI/CD-INTEGRATED AUTOMATION'],
            body: 'We build maintainable automation frameworks that plug natively into your CI/CD pipeline. Our automated testing company approach delivers fast feedback loops, full regression coverage, and reduced manual effort across every release.',
            points: [
              'Framework design using Playwright, Cypress, and Selenium testing services',
              'API automation with RestAssured, Postman, and k6',
              'Parallel execution and multi-environment test runs',
              'Page Object Model and data-driven framework architecture',
              'Automated regression testing reports with Allure and Extent',
            ],
            tags: ['Playwright', 'Cypress', 'Selenium', 'Appium', 'RestAssured', 'k6'],
          },
          {
            title: 'Performance Testing',
            labels: ['LOAD, STRESS & SCALABILITY ENGINEERING'],
            body: 'We design performance strategies that validate application behaviour under peak traffic, measure response times against SLAs, and identify bottlenecks before they reach production including mobile app performance testing and web application performance testing.',
            points: [
              'Load, stress, soak, spike, and volume testing',
              'SLA validation and performance baseline establishment',
              'Server monitoring: CPU, memory, DB query analysis',
              'Bottleneck identification and remediation recommendations',
            ],
            tags: ['JMeter', 'k6', 'Gatling', 'Locust', 'Grafana', 'New Relic'],
          },
          {
            title: 'Security Testing',
            labels: ['VAPT & PENETRATION TESTING'],
            body: 'Our application security testing practice identifies and remediates vulnerabilities before bad actors can exploit them. We follow OWASP, NIST, and PTES standards for thorough security vulnerability assessment and penetration testing services across web and mobile applications.',
            points: [
              'OWASP Top 10 assessment for web and mobile apps',
              'SAST and DAST integration directly into your CI/CD pipeline',
              'API security testing and authentication flow review',
              'Infrastructure and cloud security scanning',
              'Compliance readiness for GDPR, HIPAA, and PCI-DSS',
            ],
            tags: ['Burp Suite', 'OWASP ZAP', 'Nessus', 'Metasploit', 'Snyk'],
          },
          {
            title: 'mobile app testing',
            labels: ['IOS, ANDROID & CROSS-PLATFORM'],
            body: 'Comprehensive testing across native, hybrid, and cross-platform mobile applications covering real device farms, OS fragmentation, network conditions, and mobile app performance testing for iOS app testing and Android app testing.',
            points: [
              'Native iOS app testing and Android app testing on real devices',
              'Gesture, biometric, and push notification validation',
              'Device farm testing across 200+ device and OS combinations',
              'Network condition simulation across 2G, 3G, 4G, 5G, and offline',
              'App store compliance review and beta testing support',
            ],
            tags: ['Appium', 'XCTest', 'Espresso', 'BrowserStack', 'AWS Device Farm'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'SECURITY-FIRST QA',
        title: 'Secure by Test, Not by Chance.',
        intro:
          'Our cybersecurity testing practice covers VAPT, SAST, DAST, and compliance validation, fully integrated into your delivery pipeline so vulnerabilities never reach production.',
        items: [
          {
            title: 'Vulnerability Assessment and Pen Testing',
            body: 'OWASP, NIST, and PTES standards applied across web, mobile, and API surfaces to find every exploitable gap.',
          },
          {
            title: 'SAST and DAST in CI/CD',
            body: 'Static and dynamic analysis runs inside your build pipeline, delivering continuous security coverage on every commit.',
          },
          {
            title: 'Compliance: GDPR, HIPAA, PCI-DSS',
            body: 'Compliance readiness testing with documented evidence packages ready for audit trails and regulator review.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'WHY SOLUTIONBOWL',
        title: 'Quality Is Not a Phase. It Is Our Entire Process.',
        intro:
          'We embed quality thinking from day one, not as a final checkpoint, but as an integral part of how software is designed, built, and shipped.',
        items: [
          {
            title: 'Dedicated QA Engineers',
            body: 'Our dedicated QA engineers work as embedded members of your team, not ticket-responders. They understand your product deeply and own quality across every sprint.',
          },
          {
            title: 'Shift-Left Testing',
            body: 'We start QA from the requirements review stage, catching defects in design before they become expensive bugs in production code.',
          },
          {
            title: 'CI/CD-Native Automation',
            body: 'Our continuous testing services plug natively into your delivery pipeline, giving developers instant quality feedback on every commit.',
          },
          {
            title: 'Metrics-Driven QA',
            body: 'We track defect escape rate, automation ROI, and test coverage to continuously prove and improve the value of quality across your product.',
          },
          {
            title: 'Domain Expertise',
            body: 'From fintech compliance to healthcare data privacy, our QA teams carry domain-specific knowledge that directly shapes test strategy and defect prioritisation.',
          },
          {
            title: 'Security-First Mindset',
            body: 'Security testing is built into every engagement as standard. We protect your users, your data, and your reputation from vulnerabilities that pipelines alone miss.',
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'INDUSTRIES WE TEST FOR',
        title: 'Domain-Aware QA Across Every Sector.',
        items: [
          { title: 'Healthcare & MedTech' },
          { title: 'Fintech & Banking' },
          { title: 'eCommerce & Retail' },
          { title: 'EdTech & eLearning' },
          { title: 'Logistics & Supply Chain' },
          { title: 'Real Estate & PropTech' },
          { title: 'Gaming & Entertainment' },
          { title: 'Media & Publishing' },
          { title: 'Enterprise SaaS' },
          { title: 'AI & ML Platforms' },
          { title: 'InsurTech' },
          { title: 'Travel & Hospitality' },
        ],
      },
      {
        kind: 'process',
        eyebrow: 'HOW WE WORK',
        title: 'Delivered in Five Structured Phases.',
        steps: [
          { title: 'Discovery', body: 'Understand your product, user flows, and quality risks. Define coverage scope and acceptance criteria.' },
          { title: 'Strategy', body: 'Design the test plan - which types, tools, and environments - aligned to your release cadence.' },
          { title: 'Setup', body: 'Build test frameworks, automation scaffolding, environments, and CI/CD integrations.' },
          { title: 'Execution', body: 'Run tests systematically - manual, automated, and performance - with full traceability.' },
          { title: 'Reporting', body: 'Detailed defect reports, test coverage metrics, and handover documentation for ongoing QA.' },
        ],
      },
      {
        kind: 'stack',
        title: 'QA Tool Stack',
        groups: [
          {
            name: 'TEST AUTOMATION',
            items: ['Playwright', 'Cypress', 'Selenium WebDriver', 'Appium', 'XCTest / Espresso', 'TestNG / JUnit'],
          },
          {
            name: 'PERFORMANCE TESTING',
            items: ['Apache JMeter', 'k6', 'Gatling', 'Locust', 'BlazeMeter', 'New Relic / Grafana'],
          },
          {
            name: 'SECURITY TESTING',
            items: ['Burp Suite Pro', 'OWASP ZAP', 'Nessus / Nmap', 'Metasploit', 'Snyk / SonarQube', 'Qualys'],
          },
          {
            name: 'TEST MANAGEMENT',
            items: ['JIRA + Zephyr', 'TestRail', 'Azure DevOps', 'Allure Reports', 'BrowserStack', 'AWS Device Farm'],
          },
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote:
              'SolutionBowl is a solid service provider. I will not hesitate to work with them again for any similar website development projects. Recommended!',
            name: 'C3 Film Guide',
            role: 'Film Guide Platform',
            place: 'USA',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What software testing services does SolutionBowl offer?',
        a: 'We deliver end-to-end software testing services covering manual QA, test automation, performance engineering, security testing and mobile app testing. Our QA practice handles everything from exploratory functional testing and automated regression suites to VAPT, penetration testing, load testing, and CI/CD-integrated continuous testing. Every engagement is scoped to your product, your release cadence, and your risk tolerance, not a generic checklist.',
      },
      {
        q: 'How do you integrate QA into our existing CI/CD pipeline?',
        a: 'Our automation frameworks plug natively into your existing pipeline using GitHub Actions, GitLab CI, or Jenkins. We build test suites with Playwright, Cypress, or Selenium that trigger on every commit, returning pass/fail results before code reaches staging. Setup typically takes one to two weeks. If you do not have a CI/CD pipeline yet, we scope that as part of the engagement.',
      },
      {
        q: 'What is included in your security testing and VAPT service?',
        a: 'Our application security testing covers OWASP Top 10 assessment across web, mobile, and API layers, SAST and DAST integrated into your build pipeline, penetration testing following NIST and PTES standards, API security and authentication flow review, infrastructure and cloud security scanning, and compliance readiness documentation for GDPR, HIPAA, and PCI-DSS. You receive a full vulnerability report with severity classification and remediation guidance, not just a list of findings.',
      },
      {
        q: 'How long does a QA testing engagement take?',
        a: 'Timelines depend on scope and product complexity. A focused test automation setup runs two to four weeks. A full QA engagement covering manual, automation, performance, and security testing typically runs six to ten weeks. Dedicated QA team placements are ongoing. Every engagement starts with a discovery session where we define the scope, coverage targets, and timeline before any testing begins.',
      },
      {
        q: 'Do you provide dedicated QA engineers for ongoing testing?',
        a: 'Yes. Our dedicated QA engineers work as embedded members of your team across every sprint, not as external ticket-responders. They attend your standups, review requirements before development starts, and own quality across the full release cycle. You can engage a dedicated QA team on a monthly retainer with flexible team sizes depending on your volume and release frequency. This model suits product companies that want senior QA ownership without the overhead of hiring in-house.',
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
