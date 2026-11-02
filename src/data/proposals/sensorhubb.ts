import type { Proposal } from "./types";
import heroMockup from "../../images/audits/sensorhubb-after.png";
import { OG_DEFAULT, PRICING_PAGE, TODO_HEADING, baseFaqs, costs, labels, pricingPageDevTabs, supportSummary, tocFor } from "./shared";

const locale = "en" as const;
const ui = labels(locale);

/** Bespoke sections rendered through ProposalLayout slots in src/pages/proposal/sensorhubb.astro. */
export const sections = {
  leadScoring: { slug: "lead-scoring", text: "Lead scoring & booking" },
};

const proposal: Proposal = {
  locale,
  clientName: "SensorHubb",
  clientUrl: "https://www.sensorhubb.com/",
  title: "SensorHubb Website Proposal",
  metaTitle: "SensorHubb Proposal | CRFT Studio",
  metaDescription: "A proposal to redesign sensorhubb.com around predictive analytics, facilities buyers, and a scored booking flow into HubSpot.",
  ogImageUrl: OG_DEFAULT,
  currentLangLabel: "EN",
  introHtml: `
    <p class="text-neutral-400 mb-6">Steve, you told us the differentiator is predictive analytics that spot failure before it happens, and that the hero did not say so. Your ICP v2.0 puts the facilities or operations leader first, with compliance co-leading in regulated accounts. This proposal rebuilds sensorhubb.com around those two facts, and around a booking flow that builds inbound and scores leads the way your sales team already does in HubSpot.</p>
    <p class="text-neutral-400 mb-6">SEO shapes the site structure from the start, with dedicated landing pages for different search intents: industries, buyer roles, monitoring use cases and integrations. Each page answers a specific buyer need and leads to a relevant next step, rather than sending every search or campaign to the homepage.</p>
  `,
  homepage: {
    enabled: true,
    heading: ui.homepage,
    bodyHtml:
      "We start from the hero mockup we shared on October 28 and fix what you flagged: lead with prediction, show the loop from alert to work order to verified recovery instead of raw readings, separate customers from hardware partners in the logo bar, use “Predict. Prevent. Protect.” correctly, and show the same readings on laptop and phone.",
    redesign: {
      title: "Hero mockup and annotations",
      description: "The first pass, built from public assets only. The redesign iterates from here with your input and real materials.",
      url: "https://www.crft.studio/audit/requests/sensorhubb",
      linkLabel: "View mockup",
      image: { src: heroMockup, alt: "SensorHubb homepage hero redesign mockup" },
    },
  },
  showCmsCompare: false,
  sitemap: {
    heading: ui.sitemap,
    noteHtml:
      "Proposed structure, organized by industry, buyer role and use case. Descriptive, lowercase, hyphenated URLs match each page’s search intent; final wording is validated through keyword research during discovery. The annotations below compare this plan with the current site. Drag, zoom, search, or expand the canvas.",
    tree: {
      baseUrl: "https://www.sensorhubb.com",
      labels: {
        "/": "sensorhubb.com",
        "/platform": "Platform",
        "/platform/how-it-works": "How it works (the closed loop)",
        "/platform/predictive-analytics": "Predictive analytics",
        "/platform/mcp-server": "AI assistants (MCP server)",
        "/platform/sensor-calibration": "Sensor calibration",
        "/integrations": "Integrations",
        "/integrations/fmx": "FMX",
        "/integrations/maintainx": "MaintainX",
        "/integrations/servicenow": "ServiceNow",
        "/integrations/alerts": "Slack, Teams, Google Chat, PagerDuty",
        "/integrations/building-systems": "BAS: BACnet/IP, Modbus TCP, OPC UA",
        "/industries": "Industries",
        "/industries/healthcare-temperature-monitoring": "Healthcare temperature monitoring",
        "/industries/k12-school-monitoring": "K-12 school monitoring",
        "/industries/food-production-temperature-monitoring": "Food production & distribution monitoring",
        "/industries/life-sciences-temperature-monitoring": "Life sciences temperature monitoring",
        "/roles": "Roles",
        "/roles/facilities-directors": "Facilities & plant operations directors",
        "/roles/pharmacy-directors": "Pharmacy directors",
        "/roles/laboratory-directors": "Laboratory directors",
        "/roles/quality-compliance-managers": "Quality & compliance managers",
        "/roles/child-nutrition-directors": "Child nutrition directors",
        "/roles/business-managers-cfos": "Business managers & CFOs",
        "/use-cases": "Monitoring use cases",
        "/use-cases/walk-in-cooler-temperature-monitoring": "Walk-in cooler temperature monitoring",
        "/use-cases/walk-in-freezer-temperature-monitoring": "Walk-in freezer temperature monitoring",
        "/use-cases/vaccine-refrigerator-temperature-monitoring": "Vaccine & medication refrigerator monitoring",
        "/use-cases/laboratory-freezer-temperature-monitoring": "Laboratory freezer temperature monitoring",
        "/use-cases/server-room-environmental-monitoring": "Server room & network closet monitoring",
        "/use-cases/water-leak-detection": "Water leak detection",
        "/use-cases/boiler-room-monitoring": "Boiler & mechanical room monitoring",
        "/use-cases/door-open-monitoring": "Door-open monitoring",
        "/use-cases/continuous-temperature-monitoring": "Continuous temperature monitoring instead of manual logs",
        "/use-cases/after-hours-building-monitoring": "After-hours building monitoring",
        "/resources": "Resources",
        "/resources/the-missing-signal": "The Missing Signal (e-book)",
        "/resources/signal-assessment": "Find your missing signal (self-check)",
        "/resources/sensor-monitoring-evaluation-checklist": "The seven skeptics' tests",
        "/resources/sensorhubb-vs-bas": "Does my BAS not already do this?",
        "/blog": "Blog",
        "/customers": "Customers",
        "/security": "Security & trust",
        "/partners": "Partners",
        "/about": "About",
        "/careers": "Careers",
        "/contact": "Contact",
        "/book-signal-assessment": "Book a signal assessment",
        "/book-a-demo": "Book a demo",
        "/release-notes": "Release notes",
        "/press": "Press",
      },
      paths: [
        "/platform/how-it-works", "/platform/predictive-analytics", "/platform/mcp-server", "/platform/sensor-calibration",
        "/integrations/fmx", "/integrations/maintainx", "/integrations/servicenow", "/integrations/alerts", "/integrations/building-systems",
        "/industries/healthcare-temperature-monitoring", "/industries/k12-school-monitoring", "/industries/food-production-temperature-monitoring", "/industries/life-sciences-temperature-monitoring",
        "/roles/facilities-directors", "/roles/pharmacy-directors", "/roles/laboratory-directors", "/roles/quality-compliance-managers", "/roles/child-nutrition-directors", "/roles/business-managers-cfos",
        "/use-cases/walk-in-cooler-temperature-monitoring", "/use-cases/walk-in-freezer-temperature-monitoring", "/use-cases/vaccine-refrigerator-temperature-monitoring", "/use-cases/laboratory-freezer-temperature-monitoring", "/use-cases/server-room-environmental-monitoring", "/use-cases/water-leak-detection", "/use-cases/boiler-room-monitoring", "/use-cases/door-open-monitoring",
        "/use-cases/continuous-temperature-monitoring", "/use-cases/after-hours-building-monitoring",
        "/resources/the-missing-signal", "/resources/signal-assessment", "/resources/sensor-monitoring-evaluation-checklist", "/resources/sensorhubb-vs-bas",
        "/blog", "/customers", "/security", "/partners", "/about", "/careers", "/contact", "/book-signal-assessment", "/book-a-demo", "/release-notes", "/press",
      ],
    },
    groups: [
      { title: "Industries — retain & expand", items: [
        { label: "/industries", note: "Current: Healthcare, K-12 and Life Sciences already have pages. Proposed: retain and strengthen that content under descriptive monitoring URLs, with a hub linking to each industry." },
        { label: "/industries/food-production-temperature-monitoring", note: "Current: food manufacturing appears on the homepage but has no dedicated page, despite its Tier 2B priority. Proposed: a landing page for food production and distribution buyers." },
      ] },
      { title: "Roles — new buyer journeys", items: [
        { label: "/roles", note: "Proposed addition: dedicated pages for facilities, pharmacy, laboratory, quality and compliance, child nutrition, and finance decision-makers. Facilities comes first; sales confirms each role’s priority and depth." },
        { label: "Industry vs. role intent", note: "Industry pages address sector-specific requirements; role pages address the buyer’s responsibilities, objections and next step. Link them rather than duplicating their content." },
      ] },
      { title: "Use cases — new search landing pages", items: [
        { label: "/use-cases", note: "Proposed addition: one home for asset- and problem-led searches, rather than overlapping monitoring and solutions sections. Dedicated URLs cover walk-in coolers, freezers, vaccine refrigerators, lab freezers, server rooms, leaks, mechanical rooms and open doors." },
        { label: "Continuous & after-hours monitoring", note: "Chapter 6 grades gaps in manual logs and unwatched empty buildings as “Solves”, so these get dedicated landing pages. Each page targets a distinct search intent, with relevant evidence and one primary call to action; campaign and segment pages follow the same rule." },
      ] },
      { title: "Integrations & MCP — make them discoverable", items: [
        { label: "/integrations", note: "Current: integrations appear only in release notes and About. Proposed: a searchable hub with dedicated FMX, MaintainX and ServiceNow pages, plus alert routing and building-system connections." },
        { label: "/platform/mcp-server", note: "Current: the MCP server is not marketed. Proposed: a dedicated page showing how buyers can ask their AI assistant which freezers are drifting, what was escalated and which repairs recovered, without another dashboard. Link to it from the homepage, integrations hub and facilities role page, with approved capability and permissions claims." },
      ] },
      { title: "Conversion — replace dead ends", items: [
        { label: "/book-a-demo", note: "Current: demo booking is only available in a popup. Proposed: a dedicated page with a shareable URL for campaigns and sales outreach, room to explain what the demo covers and add relevant proof, a mobile-friendly stepped form, and clearer funnel measurement. Use the same ICP scoring and HubSpot routing as the signal-assessment journey.", link: { href: `#${sections.leadScoring.slug}`, text: "See lead scoring & booking below." } },
        { label: "/book-signal-assessment", note: "Current: “See it in Action” points to an inaccessible Microsoft Teams event. Proposed: a working, scored booking flow with a clear signal-assessment call to action." },
      ] },
      { title: "Resources — The Missing Signal & evaluation", items: [
        { label: "/resources/the-missing-signal", note: "The field guide tells SDRs to open facilities conversations with this e-book. Give it one gated resource page for facilities buyers, offering both the standard and Partner Editions here, not under /partners. Track partner-sourced visits and downloads in HubSpot, and keep the page and downloads unpublished until the approved embargo date." },
        { label: "/resources/signal-assessment", note: "Turn the e-book’s five questions into an interactive self-check leading into the scored booking flow, with the existing call to action: “Book a 30-minute signal assessment”." },
        { label: "/resources/sensor-monitoring-evaluation-checklist", note: "Turn the seven skeptics’ tests into a practical vendor evaluation checklist." },
        { label: "/resources/sensorhubb-vs-bas", note: "Chapter 6 grades confusing building controls as “Helps”. Use a comparison page to explain how SensorHubb complements, rather than replaces, the BAS." },
      ] },
      { title: "Blog — practical content, not extra landing pages", items: [
        { label: "/blog", note: "All articles live at /blog/{article-slug}, separate from /resources. Chapter 6’s forum-derived problems inform topics that match how facilities buyers search." },
        { label: "“Helps” topics → articles", note: "Build the capital case for aging equipment with a drift record; verify that a contractor’s repair held; cover too few people managing too many buildings, linked from the facilities role page; settle comfort calls with readings; and distinguish an open door from a failing compressor using door-sensor and temperature traces." },
        { label: "“Not ours” → no dedicated pages", note: "Training gaps get only a plain-language alerts FAQ. Pay, respect and on-call issues get no page. After-hours call-outs, missing drawings and calibration disputes feed the article backlog, with claims kept within what SensorHubb can support." },
      ] },
      { title: "Technical SEO — preserve & repair", items: [
        { label: "Canonical URLs & redirects", note: "Current: lowercase internal links such as /industries/healthcare return 404. Proposed: lowercase, hyphenated canonical URLs, updated internal links and one-to-one 301 redirects from existing mixed-case URLs such as /Industries/Healthcare/ to the relevant new page." },
        { label: "/sitemap.xml", note: "Current: no XML sitemap was found. Proposed: generate a sitemap of indexable canonical pages, submit it to search engines, and validate redirects and crawlability at launch." },
      ] },
    ],
  },
  timeline: {
    heading: ui.timelines,
    totalLabel: "Estimated project duration: 4 months",
    phases: [
      { name: "Onboarding", duration: "Week 1", items: [
        "Subscription begun and Basecamp project invite sent",
        "Kickoff with Steve and sales leadership",
        "Access to the current site, HubSpot (forms, properties, workflows), brand assets and product screenshots",
        "Establish a baseline with <a href='/lookup' class='text-orange-300 underline'>CRFT Lookup</a>: Lighthouse scores, tech stack, sitemap and meta tags, building on the audit already shared",
        "Confirm the embargo date for The Missing Signal",
      ] },
      { name: "Discovery & sitemap", duration: "2 weeks", items: [
        "Short interviews with SDRs, AEs and enterprise sales to weight roles and qualifying questions",
        "Content inventory, redirect map, and the sitemap above, signed off before design",
        "HubSpot field and routing plan for the ICP score",
      ] },
      { name: "Design", duration: "3 weeks", items: [
        "Refine the website color palette and typography within SensorHubb’s existing brand identity",
        "Wireframe core pages and the stepped booking flow before building out the designs",
        "Homepage, industry, role, integration, use-case and article templates",
        "Booking flow screens",
      ], noteHtml: "We limit our use of vector design tools like Figma beyond initial ideation, and build high-fidelity designs in code. Your team reviews real responsive pages rather than a separate set of static mockups." },
      { name: "Build & content", duration: "8 weeks", items: [
        "Set up the code repository, responsive Astro templates and reusable components, and Sanity content types",
        "Write and collaborate on copy for each page, with your approval of product claims and embargoed materials",
        "Scored booking flow into HubSpot, with UTM and partner attribution",
        "Integration, MCP, role and use-case pages; Missing Signal resource page and blog articles",
        "Migration of current content and redirects; sitemap.xml",
        "PostHog analytics and conversion events",
        "Configure cookie consent where required for the chosen analytics and HubSpot setup",
      ] },
      { name: "QA, training & launch", duration: "2 weeks", items: [
        "Cross-browser, accessibility and performance pass; end-to-end tests of every HubSpot route",
        "Sanity training for your team",
        "Deploy to Cloudflare Pages and configure the custom domain and DNS for launch",
        "Launch and redirect checks",
      ] },
      { name: "Optional maintenance", duration: "After launch (as needed)", items: [
        "Performance optimization and speed improvements",
        "Dependency updates and website security checks",
        "New industry, role, use-case and campaign landing pages as priorities evolve",
        "Analytics monitoring and reporting on assessment bookings and the qualification flow",
        "Technical support for the website, forms and HubSpot connections",
      ], noteHtml: "Post-launch maintenance is optional and billed at the support rates below. It is separate from the four-month build estimate." },
    ],
  },
  costs: costs({
    locale,
    currency: "USD",
    devPlan: { prices: { ...PRICING_PAGE.dev.USD }, tabs: pricingPageDevTabs(locale) },
    supportPriceList: { ...PRICING_PAGE.support.USD },
    devSummaryHtml:
      "A simple, straightforward monthly subscription until the launch of your website. An optional contract on request. $5,000 USD per month, or $4,500 USD per month billed quarterly (save 10%), or $4,250 USD per month billed annually (save 15%). The estimate above is four months. Pause or cancel anytime.",
    supportSummaryHtml: supportSummary(locale, "USD"),
    techIntroHtml: "These amounts are billed to SensorHubb and are not part of our fee. HubSpot stays on your existing plan.",
  }),
  faqsHeading: ui.faqs,
  faqs: [
    ...baseFaqs(locale),
    {
      question: "Does this replace HubSpot?",
      answer: "No. HubSpot stays your CRM. The booking flow writes the ICP score, vertical, trigger and persona to the properties your sales team already uses, and routes each lead the way your field guide says.",
    },
    {
      question: "How do you handle integration and product claims?",
      answer: "We keep the qualifiers you use in The Missing Signal, such as “subject to the deployed integration and permissions”. You approve every claim about integrations, calibration and the MCP server before launch.",
    },
    {
      question: "What about the embargo on The Missing Signal?",
      answer: "The landing page and gated download stay unpublished until the date you set. This proposal page is unlisted and not indexed.",
    },
  ],
  contactHtml: ui.contact,
  tocTitle: ui.toc,
  toc: tocFor(locale, true, [
    { after: "sitemap", entry: sections.leadScoring },
  ]),
};

export default proposal;
