// Source: https://www.solutionbowl.ai/products/school-erp-software, https://www.solutionbowl.ai/products/erp-software,
// https://www.solutionbowl.ai/products/railway — retrieved 2026-10-30. Copy is verbatim from the live pages.
// Dropped: nav/footer chrome, lead form, NDA widget, decorative dashboard mockups, the school-ERP feature comparison
// table (cell ticks are icons and were not captured), repeated stat strips and "Schedule a call" CTA blocks.
import type { OfferingPage } from './types';

export const products: OfferingPage[] = [
  {
    slug: 'school-erp-software',
    name: 'School Management ERP Software',
    meta: {
      title: 'School Management Software for Schools & Colleges | SolutionBowl',
      description:
        'AI-powered school management software built for Indian schools. Manage admissions, fees, attendance, exams & communication from one platform. Mobile app included. Book a free demo.',
    },
    eyebrow: 'AI-POWERED SCHOOL MANAGEMENT SOFTWARE',
    title: 'School Management Software That Runs Your Entire Institution From One Dashboard.',
    lede: 'SolutionBowl brings admissions, fees, attendance, exams, communication, and operations into one centralised platform - with dedicated mobile apps for teachers, students, and parents so your staff spends less time on admin and more time on education.',
    tags: [
      'CBSE, ICSE & State Board Ready',
      'NEP 2020 Ready',
      '3 Mobile Apps',
      'Go Live in 7 Days',
      'WhatsApp Alerts',
      'UPI Fee Payments',
    ],
    summary: 'AI-powered school management software built for Indian schools.',
    sections: [
      {
        kind: 'items',
        title: 'Still Running Your School on Registers, Spreadsheets & WhatsApp?',
        items: [
          {
            title: 'Four to Six Tools for One School',
            body: 'Attendance apps, fee registers, WhatsApp groups, timetable spreadsheets, library registers, and result files rarely talk to each other.',
          },
          {
            title: 'Manual Work Creates Delays',
            body: 'Data gets duplicated, errors creep in, parents miss updates, and your staff spends productive hours on work that should already be automated.',
          },
          {
            title: 'Reports Take Hours, Not Seconds',
            body: "When leadership needs today's attendance, fee collection, or pending results, disconnected systems make every answer slower than it should be.",
          },
        ],
      },
      {
        kind: 'stats',
        items: [
          { value: '3 Hrs/Day', label: 'Saved per Admin' },
          { value: '80%', label: 'Less Paperwork' },
          { value: '99.9%', label: 'Uptime SLA' },
          { value: '4.9 / 5', label: 'Parent Satisfaction' },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'MOBILE APP DIFFERENTIATOR',
        title: 'A Dedicated Mobile App for Every Role in Your Institution',
        intro:
          'Unlike school ERPs that bolt on a basic parent app, SolutionBowl gives management, teachers, students, and parents the exact mobile workflows they need.',
        items: [
          {
            title: 'Super Admin & Management App',
            body: 'For owners, principals, and management teams who need live visibility across one campus or many.',
            points: [
              'Live attendance, fee, approval, and deadline dashboards',
              'Multi-campus view for groups and chains',
              'One-tap broadcasts to staff, teachers, or parents',
              'Remote approvals for admissions, leaves, and concessions',
            ],
          },
          {
            title: 'Teacher App',
            body: 'No-friction daily tools for class teachers and subject teachers, without being chained to a desktop.',
            points: [
              'Mark subject-wise attendance in under 30 seconds',
              'Enter marks, assign homework, and share study material',
              'View timetable, leave balance, and payslips',
              'Logged parent communication without sharing personal numbers',
            ],
          },
          {
            title: 'Student & Parent App',
            body: 'A single reliable app for families, reducing calls to the front desk and improving transparency.',
            points: [
              'Attendance notifications, results, report cards, and progress graphs',
              'Online fee payment with instant digital receipts',
              'Homework, assignments, circulars, calendar, and timetable',
              'Leave requests with real-time approval tracking',
            ],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: '25+ ERP MODULES',
        title: 'Complete School Management Software Built for Indian Institutions.',
        intro:
          'Every core school function, board workflow, compliance need, and day-to-day operational requirement is managed in one integrated ERP built for real on-ground use.',
        items: [
          { title: 'Online Admission Management', body: 'Digitise enquiries, online forms, admission IDs, approvals, shortlisting, follow-ups, and admission analytics.' },
          { title: 'Fee Management Software', body: 'Collect fees through UPI, cards, and net banking with reminders, receipts, concessions, installments, and Tally-ready reports.' },
          { title: 'Attendance Management System', body: 'Mark student and staff attendance from mobile or biometric devices with instant WhatsApp and push alerts to parents.' },
          { title: 'Examination & Result Management', body: 'Schedule exams, enter marks, generate board-format report cards, support online exams, and track NEP 2020 progress.' },
          { title: 'Student Information System', body: 'Store academic, medical, guardian, document, attendance, fee, and progress records in one secure student profile.' },
          { title: 'Timetable & Academic Management', body: 'Automate schedules, detect clashes, balance teacher workload, manage substitutes, and publish calendars to every role.' },
          { title: 'Communication Management', body: 'Send WhatsApp updates, SMS, push notifications, notices, emergency alerts, and logged parent-teacher conversations.' },
          { title: 'Parent Portal & Student App', body: 'Give families one app for attendance, homework, fees, results, leave requests, circulars, and teacher communication.' },
          { title: 'Faculty & HR Management', body: 'Manage staff profiles, leave approvals, attendance, payroll, salary slips, role access, and performance records.' },
          { title: 'Library Management System', body: 'Run catalogues, barcode/RFID issue-return, overdue fines, reservations, borrowing history, and digital learning resources.' },
          { title: 'Transport Management System', body: 'Track buses live, manage routes, drivers, pickup-drop assignments, route fees, and parent transport notifications.' },
          { title: 'Hostel Management', body: 'Handle room and bed allocation, student check-in/out, hostel fee collection, warden assignment, and resident reporting.' },
          { title: 'AI Analytics & Management Reporting', body: 'Surface fee defaulter risk, attendance trends, academic patterns, financial dashboards, and custom leadership reports.' },
        ],
      },
      {
        kind: 'stats',
        items: [
          { value: '500+', label: 'Institutions Onboarded' },
          { value: '25+', label: 'ERP Modules' },
          { value: '3', label: 'Dedicated Mobile Apps' },
          { value: '7 Days', label: 'Average Go-Live' },
          { value: '99.9%', label: 'Uptime SLA' },
          { value: '4.9', label: 'Client Satisfaction' },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'LIVE PRODUCT PREVIEW',
        title: 'See Exactly What Your School Gets on Day One',
        intro:
          'These dashboard views show how admissions, academics, finance, users, and campus operations come together inside one ERP.',
        items: [
          { title: 'Admissions Dashboard', body: 'Track enquiries, application status, document readiness, and admission conversion in one view.' },
          { title: 'Academic Operations', body: 'See classes, attendance, teacher workload, timetables, and daily activity without switching tools.' },
          { title: 'Finance & Reports', body: 'Monitor fee collection, pending dues, receipts, concessions, and audit-ready reports in real time.' },
          { title: 'User & Role Management', body: 'Manage students, parents, teachers, admins, and permissions across campuses from one secure panel.' },
        ],
      },
      {
        kind: 'stats',
        items: [
          { value: '7 Days', label: 'Avg. Go-Live' },
          { value: '3 Apps', label: 'Role-Based Mobile' },
          { value: 'AI', label: 'Smart Insights' },
          { value: 'India', label: 'Support Team' },
        ],
      },
      {
        kind: 'items',
        title: 'Why 500+ Institutions Across India Trust SolutionBowl',
        items: [
          {
            title: 'Built From Scratch for Indian Schools',
            body: 'Engineered for CBSE, ICSE, and State Board workflows, with GST-compliant receipts, board report cards, NEP 2020 progress tracking, and India-specific compliance.',
          },
          {
            title: 'Three Dedicated Mobile Apps',
            body: 'Management, teachers, and students or parents get role-specific mobile apps built for their real daily workflows, not a stripped-down web view.',
          },
          {
            title: 'AI-Powered, Not Just Digitised',
            body: 'Predict fee defaulter risk, spot falling attendance, compare academic trends, and give leadership dashboards that show what needs attention today.',
          },
          {
            title: 'Go Live in 7 Working Days',
            body: 'Our onboarding covers setup, migration, staff training, app distribution, and a dedicated implementation consultant so your team can switch without disruption.',
          },
        ],
      },
      {
        kind: 'process',
        title: 'From Demo to Go-Live in 7 Working Days',
        steps: [
          {
            title: 'Free Demo & Needs Assessment',
            when: 'Day 1',
            body: 'Our ERP consultant walks your team through a live demo, maps your workflows, and recommends the right module configuration.',
          },
          {
            title: 'Account Setup & Configuration',
            when: 'Days 2-3',
            body: 'We configure academic years, classes, sections, fee structures, staff roles, permissions, branding, and institution settings.',
          },
          {
            title: 'Data Migration & App Setup',
            when: 'Days 3-6',
            body: 'Student records, fee history, staff data, and academic information are migrated while teacher, parent, and student apps are configured.',
          },
          {
            title: 'Go Live + Support',
            when: 'Day 7 Onwards',
            body: 'Your institution goes live with staff training, app invitations, Monday-to-Saturday India-based support, and a dedicated account manager.',
          },
        ],
      },
      {
        kind: 'items',
        title: 'SolutionBowl School ERP by the Numbers.',
        intro:
          'Built for institutions that need board-ready workflows, mobile-first communication, and leadership visibility from a single dashboard.',
        items: [
          {
            title: '500+ Institutions Onboarded',
            body: 'Built for Indian schools, colleges, coaching institutes, and multi-campus education groups that need one reliable operating platform.',
          },
          {
            title: '7-Day Average Go-Live',
            body: 'Account setup, configuration, data migration, app distribution, and staff training are handled by our implementation team.',
          },
          {
            title: 'Three Dedicated Mobile Apps',
            body: 'Management, teachers, and students or parents each get purpose-built mobile workflows instead of one basic shared app.',
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
        q: 'What is SolutionBowl school management software and how is it different?',
        a: 'SolutionBowl is an AI-powered school management ERP built specifically for Indian educational institutions. It supports CBSE, ICSE, and State Board workflows, NEP 2020 progress cards, GST-compliant receipts, WhatsApp integration, and three dedicated mobile apps for management, teachers, and students or parents.',
      },
      {
        q: 'How long does it take to implement the platform?',
        a: 'Most institutions are fully live within 7 working days of kickoff. Our team handles account setup, configuration, data migration, staff training, and mobile app distribution, with core modules rolled out first so daily operations are not disrupted.',
      },
      {
        q: 'Does the platform have a mobile app for teachers and parents?',
        a: 'Yes. SolutionBowl ships three dedicated mobile apps: one for management and super admins, one for teachers, and one for students and parents. Teachers can mark attendance, enter marks, assign homework, and message parents. Parents get attendance, fees, results, homework, and communication in one app.',
      },
      {
        q: 'Is it suitable for coaching institutes and multi-campus schools?',
        a: 'Yes. The platform supports schools, colleges, coaching institutes, training centres, and multi-campus educational groups. Centralised dashboards give leadership visibility across branches for fee collections, attendance, academics, and operations.',
      },
      {
        q: 'Does it support CBSE, ICSE, and State Board requirements?',
        a: 'Yes. The platform can generate board-prescribed report card formats, supports NEP 2020 Holistic Progress Cards and co-scholastic evaluation, and can be configured for institution-specific report card formats during implementation.',
      },
      {
        q: 'Does it integrate with WhatsApp and online payment gateways?',
        a: 'Yes. It includes WhatsApp integration for fee reminders, attendance alerts, exam results, and parent notifications. Fee collection supports UPI, cards, and net banking. Additional integrations include biometric devices, Tally, Zoom, Google Meet, barcode/RFID, and Google Workspace.',
      },
      {
        q: 'Is the platform cloud-based? Can it be accessed on mobile?',
        a: 'Yes. The platform is cloud-based with a 99.9% uptime SLA. Administrators can access the web dashboard, while management, teachers, students, and parents use dedicated mobile app experiences on Android and iOS.',
      },
      {
        q: 'What does SolutionBowl school management software cost?',
        a: 'Pricing is customised based on institution size, student count, and selected modules. Most institutions use a per-student annual model. Data migration, staff training, and implementation support are included, with no hidden setup fees.',
      },
    ],
  },

  {
    slug: 'erp-software',
    name: 'Manufacturing ERP Software',
    meta: {
      title: 'AI-Powered Manufacturing ERP Software | Solution Bowl.ai',
      description:
        'AI-powered manufacturing ERP for modern manufacturers. Automate production, track suppliers, manage inventory, and scale fast. Go live in 4-6 weeks. Book a demo.',
    },
    eyebrow: 'ERP SOFTWARE',
    title: 'AI-Powered ERP for Modern Manufacturers',
    lede: 'Replace disconnected systems with one intelligent platform for production, inventory, supplier tracking, and factory operations.',
    summary:
      'Replace disconnected systems with one intelligent platform for production, inventory, supplier tracking, and factory operations.',
    sections: [
      {
        kind: 'items',
        title: 'Stop Losing Lakhs to Manual Processes and Production Delays',
        items: [
          { title: 'Lost Revenue', body: 'Delayed deliveries. Missed tenders. Angry clients. Every day without real-time visibility costs you money.' },
          { title: 'Wasted Time', body: 'Your team spends hours on Excel sheets, phone calls to suppliers, and firefighting instead of strategic work.' },
          { title: 'No Control', body: "You can't track production status, inventory levels, or supplier performance in real-time. You're always reacting, never planning." },
        ],
      },
      {
        kind: 'stats',
        items: [
          { value: '12 Wks', label: 'Avg. to MVP' },
          { value: '40% Faster', label: 'Time to Market' },
          { value: '99.9%', label: 'Uptime SLA' },
          { value: '3× ROI', label: 'Avg. Return' },
        ],
      },
      {
        kind: 'items',
        title: 'One Intelligent Platform. Every AI-Powered Manufacturing Module You Need.',
        intro:
          'Unlike traditional manufacturing ERP systems filled with unnecessary features, our AI-powered platform is built around your factory workflows - helping manufacturers automate operations, improve visibility, and scale with complete control.',
        items: [
          { title: 'Tenders & PO Management', body: 'Track every tender, PO, and delivery milestone in real-time' },
          { title: 'Supplier PO & LPR Tracking', body: 'Never miss an LPR deadline or supplier delay again' },
          { title: 'Production Scheduling', body: 'Visual planning boards that prevent bottlenecks before they happen' },
          { title: 'Inventory & Stock Control', body: 'Real-time stock levels, automated reorder alerts, zero stockouts' },
          { title: 'Quality Inspection', body: 'Digital checklists, automated approvals, instant rejection tracking' },
          { title: 'Dispatch & Delivery Tracking', body: 'From factory floor to client door-complete visibility' },
          { title: 'Monitor Chart & Delay Control', body: 'Spot delays instantly and take corrective action' },
          { title: 'Vendor & Supplier Management', body: 'Centralized supplier database with performance tracking' },
          { title: 'Items, Products & BOM', body: 'Master your bill of materials and product specifications' },
          { title: 'Supplier Rating System', body: 'Data-driven vendor evaluation for better procurement' },
        ],
      },
      {
        kind: 'items',
        title: 'Why Manufacturers Choose Us Over Traditional ERP Companies',
        items: [
          {
            title: 'Built for You, Not Against You',
            body: 'Traditional ERP forces you into their rigid system. We customize modules to fit YOUR workflows, YOUR industry (railways, defense, engineering), YOUR exact needs.',
          },
          {
            title: 'Weeks, Not Years',
            body: 'Forget 12-month implementations. Our low-code platform gets you live in 4-6 weeks. Start seeing ROI immediately.',
          },
          {
            title: 'Pay for What You Need',
            body: "No forced bundles. No features you'll never touch. Choose the modules that solve your problems. Add more as you scale. Total flexibility.",
          },
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote: 'Thank you SolutionBowl for setting up and fixing issues on my WordPress site.',
            name: 'Russ Merritt',
            role: 'Founder, ClearPath Capital',
            place: 'Jordan',
          },
        ],
      },
      {
        kind: 'process',
        title: 'From Chaos to Control in 4 Simple Steps',
        steps: [
          { title: 'Discovery Call', when: '4 business hours', body: 'We understand your pain points, workflows, and goals. No sales pitch-just listening.' },
          { title: 'Custom Demo', when: '24 Hours', body: 'See your exact modules in action. We show you how it works for YOUR industry - tenders, supplier tracking, production scheduling.' },
          { title: 'Tailored Proposal', when: '48 Hours', body: 'Get a clear roadmap: which modules, timeline, implementation plan. Transparent and detailed.' },
          { title: 'Go Live', when: '4–6 Weeks', body: 'Our team builds, customizes, trains your staff, and gets you live. Ongoing support included.' },
        ],
      },
      {
        kind: 'items',
        title: 'Real Results from Real Manufacturers',
        items: [
          { title: 'Railway Component Manufacturer, Pune', body: 'Reduced tender management time by 70%. Now tracking 150+ active POs in real-time instead of Excel chaos.' },
          { title: 'Auto Parts Supplier, Gurugram', body: 'Cut production delays by 60% with visual scheduling. Improved on-time delivery from 65% to 94%.' },
          { title: 'Defense Contractor, Bangalore', body: 'Complete LPR tracking visibility. Zero missed deadlines in 12 months. Vendor rating system saved ₹15 lakhs in procurement.' },
        ],
      },
      {
        kind: 'text',
        title: 'The Complete Manufacturing Cycle, Fully Automated',
        paragraphs: [
          'From raw material procurement to dispatch, every step of your production cycle is tracked, automated, and visible in real-time.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How is this different from SAP/Oracle/Tally?',
        a: 'Those are rigid, one-size-fits-all systems that take 12+ months and lakhs to implement. We build custom ERP manufacturing modules on a flexible low-code platform-only what you need, live in weeks.',
      },
      {
        q: 'What if we need something custom?',
        a: "That's our specialty. We build custom modules for your exact workflows-whether it's railway tenders, defense compliance, or unique industry needs. True enterprise resource planning for the manufacturing industry that adapts to you.",
      },
      {
        q: 'How long does implementation take?',
        a: '4-6 weeks from kickoff to go-live, including training. Unlike traditional systems, our manufacturing ERP India solution delivers value immediately.',
      },
      {
        q: 'What modules can we implement first?',
        a: 'Most clients start with production planning, ERP software, and inventory management. Choose what solves your biggest pain points first, then scale.',
      },
      {
        q: 'Can we start small and add modules later?',
        a: 'Absolutely. Most clients start with 3-4 core modules and expand as they see results. Our ERP system for the manufacturing industry grows with your business.',
      },
      {
        q: 'Do you provide training and support?',
        a: 'Yes. Complete training for your team during implementation, plus ongoing support via phone, email, and remote access.',
      },
      {
        q: 'Is our data secure?',
        a: 'Your data security is our top priority. We use military-grade encryption, secure servers, and automated backups. Plus, you get complete control over user permissions and data access.',
      },
    ],
  },

  {
    slug: 'railway',
    name: 'Railway Vendor ERP Software',
    meta: {
      title: 'Railway Vendor ERP Software for Manufacturers | SolutionBowl.ai',
      description:
        'Railway Vendor ERP for ICF, CLW, and RDSO suppliers. Automate tenders, POs, inventory, inspections, and dispatch with one AI-powered ERP platform.',
    },
    eyebrow: 'RAILWAY ERP SOFTWARE',
    title: 'AI-Powered ERP for Indian Modern Railway Manufacturers',
    lede: 'Manage production, inventory, inspections, dispatches, vendors, and railway tender workflows with one intelligent AI-powered ERP platform built for Indian railway manufacturers - enabling faster operations, smart automation, and complete operational control.',
    summary: 'Railway manufacturing workflows connected through one intelligent ERP platform.',
    sections: [
      {
        kind: 'text',
        eyebrow: 'ABOUT US',
        title: 'Who We Are',
        paragraphs: [
          'Ruling the Railway ERP space for over 5 years, SolutionBowl is trusted by India’s top railway component manufacturers and approved vendors.',
          'Our solution goes beyond software-it’s an operational backbone that aligns with tender-based workflows, inspection norms, dispatch tracking, and PO lifecycle management.',
          'Backed by a team of domain experts and implementation specialists, we don’t just deploy software-we drive transformation. From day one, we work closely with you to streamline production, improve procurement efficiency, and ensure compliance across every stage of the railway supply chain.',
          'With SolutionBowl Railway ERP, you gain full control, complete transparency, and a partner committed to your growth.',
        ],
      },
      {
        kind: 'items',
        eyebrow: 'WHY CHOOSE US',
        title: 'Why Choose SolutionBowl Railway ERP',
        intro:
          'Purpose-built for railway vendors, our ERP keeps tender workflows, inspections, procurement, inventory, dispatch, and audit trails connected in one operational system.',
        items: [
          {
            title: 'Purpose-Built for Railway Manufacturers',
            body: 'Designed specifically for railway tenders, inspections, and dispatch workflows - no generic ERP can match this level of operational fit.',
            tags: ['Tender workflows', 'Inspection-ready', 'Dispatch tracking'],
          },
          {
            title: 'Trusted by Top Railway Vendors',
            body: 'Proven across leading component manufacturers supplying to ICF, CLW, RDSO, and other Indian Railways units.',
            tags: ['ICF', 'CLW', 'RDSO'],
          },
          {
            title: 'End-to-End PO Lifecycle Management',
            body: 'From initial tender allocation to final dispatch, track every stage with complete traceability and documentation.',
            tags: ['PO tracking', 'Approvals', 'Documentation'],
          },
          {
            title: 'Real-Time Inventory & Dispatch Control',
            body: 'Prevent overstocking, under-supply, and late dispatches with live stock tracking, quantity balances, and automated alerts.',
            tags: ['Live stock', 'Balance alerts', 'Dispatch view'],
          },
          {
            title: 'LPR-Driven Procurement Efficiency',
            body: 'Leverage historical purchase data with built-in Last Purchase Rate tracking for smarter, cost-effective procurement decisions.',
            tags: ['LPR', 'Supplier POs', 'Cost control'],
          },
          {
            title: 'Audit-Ready & Railway-Compliant',
            body: 'Maintain an exportable trail for every transaction so internal audits and RITES inspections are easier to prepare for.',
            tags: ['Audit trail', 'RITES', 'Exports'],
          },
        ],
      },
      {
        kind: 'items',
        eyebrow: 'ERP MODULES',
        title: 'Railblazing AI-Powered Modules',
        intro:
          'Built for flexibility, our AI-powered ERP modules can be customized based on your factory operations, teams, approvals, and execution processes.',
        items: [
          { title: 'Railway Tender & PO Management', labels: ['TENDER-BASED', 'PO LIFECYCLE'], body: 'Create, track, and manage railway-issued POs with complete visibility-from HO to factory floor.' },
          { title: 'Supplier PO & LPR Tracking', labels: ['PROCUREMENT', 'LPR-DRIVEN'], body: 'Issue supplier POs with integrated Last Purchase Rate (LPR) tracking to support smart procurement decisions.' },
          { title: 'Product Scheduling & Work Order Planning', labels: ['PRODUCTION', 'MILESTONE-BASED'], body: 'Map out production and assembly timelines based on delivery commitments with milestone tracking.' },
          { title: 'Stock & Inventory Management', labels: ['LIVE STOCK', 'REAL-TIME'], body: 'View stock availability, issue logs, pending requests, and critical shortages-all in real time.' },
          { title: 'Integrated Quality Inspection', labels: ['QC READY', 'RITES-ALIGNED'], body: 'Ensure only approved stock enters production through built-in material inspection and rejection workflows.' },
          { title: 'Dispatch Management', labels: ['LOGISTICS', 'CONSIGNEE-AWARE'], body: 'Track quantity dispatched, balance remaining, invoice details, and consignee status in one dashboard.' },
          { title: 'Monitor Chart & Delay Tracking', labels: ['COMPLIANCE', 'DELAY LOGGING'], body: 'Log actual vs. planned timelines, capture delay reasons, and stay compliant with Railway expectations.' },
          { title: 'Role-Based Access Control', labels: ['MULTI-ROLE', 'DEPT-LEVEL'], body: 'Define access by department-Purchase, Store, Production, Accounts-ensuring data control and accountability.' },
          { title: 'Supplier Rating System (Add-on)', labels: ['ADD-ON', 'VENDOR RATING'], body: 'Rate suppliers on delivery performance, material quality, and compliance to strengthen your vendor base.' },
          { title: 'Master Configuration & Custom Settings', labels: ['FLEXIBLE SETUP', 'CUSTOM CONFIG'], body: 'Customize units, PO formats, payment terms, and dispatch modes to reflect your factory’s workflow.' },
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'CLIENT STORIES',
        title: 'What Our Clients Say',
        items: [
          {
            quote: 'The stock and inventory module has brought complete clarity to our warehouse operations. We can now track materials in real-time.',
            name: 'Kishan',
            role: 'Product Engineer, IAI',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How is Solution Bowl ERP tailored for Railway vendors?',
        a: 'Our ERP is purpose-built for vendors working with Indian Railways, with modules aligned to tender workflows, inspection processes, and dispatch tracking - making it a strong operational fit for ICF, CLW, RDSO, and more.',
      },
      {
        q: 'Why should I replace my existing system with an ERP solution?',
        a: 'Your current system might be scattered across Excel sheets, manual follow-ups, and delayed updates. An ERP brings everything into one place so your team knows what to produce, when to dispatch, and what is pending - with less confusion and fewer delays.',
      },
      {
        q: 'How long does implementation take?',
        a: 'Depending on your requirements and scale, we typically onboard and train your team within 7-15 working days with live module access.',
      },
      {
        q: 'Do you offer custom modules or changes based on our plant workflow?',
        a: 'Yes. Our ERP is modular and customizable. We adapt settings, access, and flows to match your specific production, store, and dispatch processes.',
      },
      {
        q: 'Is this ERP suitable for small or mid-sized vendors?',
        a: 'Absolutely. Whether you are an MSME or a large-scale manufacturer, our system is built to scale with your operations and simplify Railway compliance.',
      },
      {
        q: 'Can we import old PO, stock, or vendor data?',
        a: 'Yes. We support bulk data import and migration assistance so you can start fresh without losing historical data.',
      },
      {
        q: 'What if we have limited technical staff?',
        a: 'No problem. Our team provides complete training, onboarding, and ongoing support to ensure your staff is confident using the system.',
      },
      {
        q: 'Do you offer a demo before we decide?',
        a: 'Yes. You can book a free demo to see how the platform fits your specific needs.',
      },
    ],
  },
];

export const getProduct = (slug: string) => products.find(p => p.slug === slug);
