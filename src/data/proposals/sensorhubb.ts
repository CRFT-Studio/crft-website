import type { Proposal } from "./types";
import { OG_DEFAULT, PRICING_PAGE, TODO_HEADING, baseFaqs, costs, labels, pricingPageDevTabs, supportSummary, tocFor } from "./shared";

const locale = "en" as const;
const ui = labels(locale);

/** Bespoke sections rendered through ProposalLayout slots in src/pages/proposal/sensorhubb.astro. */
export const sections = {
  leadScoring: { slug: "lead-scoring", text: "Lead scoring & booking" },
  siteAudit: { slug: "site-audit", text: "Site & landing page audit" },
  missingSignal: { slug: "missing-signal", text: "The Missing Signal & MCP" },
  contentPlan: { slug: "content-plan", text: "Content plan" },
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
    <p class="text-neutral-400 mb-6">Steve, you told us the differentiator is predictive analytics that spot failure before it happens, and that the hero did not say so. Your ICP v2.0 puts the facilities or operations leader first, with compliance co-leading in regulated accounts. This proposal rebuilds sensorhubb.com around those two facts, and around a booking flow that scores leads the way your sales team already does in HubSpot.</p>
    <p class="text-neutral-400 mb-6">One line runs through every page: SensorHubb connects to the BAS and the CMMS and replaces neither. It adds an independent reading on what the BAS rarely covers: walk-ins, standalone units, network closets and leak points. It does not repair pneumatics.</p>
    <p class="text-neutral-400">All prices on this page are in US dollars and match our public pricing page.</p>
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
      linkLabel: "View the annotated mockup",
    },
  },
  showCmsCompare: false,
  sitemap: {
    heading: ui.sitemap,
    noteHtml:
      "Proposed structure. New paths are lowercase; current mixed-case URLs such as /Industries/Healthcare/ redirect to them. Drag, zoom, search, or expand the canvas.",
    tree: {
      baseUrl: "https://www.sensorhubb.com",
      labels: {
        "/": "sensorhubb.com",
        "/platform": "Platform",
        "/platform/how-it-works": "How it works (the closed loop)",
        "/platform/predictive-analytics": "Predictive analytics",
        "/platform/ai-assistants": "AI assistants (MCP server)",
        "/platform/calibration": "Calibration",
        "/integrations": "Integrations",
        "/integrations/fmx": "FMX",
        "/integrations/maintainx": "MaintainX",
        "/integrations/servicenow": "ServiceNow",
        "/integrations/alerts": "Slack, Teams, Google Chat, PagerDuty",
        "/integrations/building-systems": "BAS: BACnet/IP, Modbus TCP, OPC UA",
        "/industries": "Industries",
        "/industries/healthcare": "Healthcare",
        "/industries/k12-education": "K-12 Education",
        "/industries/food-production": "Food production & distribution",
        "/industries/life-sciences": "Life Sciences",
        "/roles": "Roles",
        "/roles/facilities-director": "Facilities & plant operations",
        "/roles/pharmacy-director": "Pharmacy",
        "/roles/lab-director": "Laboratory",
        "/roles/quality-compliance": "Quality & compliance",
        "/roles/child-nutrition": "Child nutrition",
        "/roles/finance-operations": "Business manager & CFO",
        "/monitoring": "What we monitor",
        "/monitoring/walk-in-cooler-freezer": "Walk-in coolers & freezers",
        "/monitoring/vaccine-refrigerator": "Vaccine & medication refrigerators",
        "/monitoring/lab-freezer": "Lab freezers",
        "/monitoring/server-room": "Server rooms & network closets",
        "/monitoring/leak-detection": "Leak detection",
        "/monitoring/boiler-room": "Boiler & mechanical rooms",
        "/monitoring/door-sensors": "Door sensors",
        "/solutions": "Problems we solve",
        "/solutions/continuous-temperature-logs": "Logs and rounds leave gaps",
        "/solutions/after-hours-monitoring": "Nobody watching the empty building",
        "/resources": "Resources",
        "/resources/the-missing-signal": "The Missing Signal (e-book)",
        "/resources/signal-assessment": "Find your missing signal (self-check)",
        "/resources/vendor-tests": "The seven skeptics' tests",
        "/resources/sensorhubb-vs-bas": "Does my BAS not already do this?",
        "/resources/articles": "Articles",
        "/customers": "Customers",
        "/security": "Security & trust",
        "/partners": "Partners",
        "/about": "About",
        "/careers": "Careers",
        "/contact": "Contact",
        "/book": "Book a signal assessment",
        "/release-notes": "Release notes",
      },
      paths: [
        "/platform/how-it-works", "/platform/predictive-analytics", "/platform/ai-assistants", "/platform/calibration",
        "/integrations/fmx", "/integrations/maintainx", "/integrations/servicenow", "/integrations/alerts", "/integrations/building-systems",
        "/industries/healthcare", "/industries/k12-education", "/industries/food-production", "/industries/life-sciences",
        "/roles/facilities-director", "/roles/pharmacy-director", "/roles/lab-director", "/roles/quality-compliance", "/roles/child-nutrition", "/roles/finance-operations",
        "/monitoring/walk-in-cooler-freezer", "/monitoring/vaccine-refrigerator", "/monitoring/lab-freezer", "/monitoring/server-room", "/monitoring/leak-detection", "/monitoring/boiler-room", "/monitoring/door-sensors",
        "/solutions/continuous-temperature-logs", "/solutions/after-hours-monitoring",
        "/resources/the-missing-signal", "/resources/signal-assessment", "/resources/vendor-tests", "/resources/sensorhubb-vs-bas", "/resources/articles",
        "/customers", "/security", "/partners", "/about", "/careers", "/contact", "/book", "/release-notes",
      ],
    },
  },
  timeline: {
    heading: ui.timelines,
    totalLabel: "Estimated duration: 4 months (about $20,000 USD at the monthly rate)",
    phases: [
      { name: "Onboarding", duration: "Week 1", items: [
        "Kickoff with Steve and sales leadership",
        "Access to the current site, HubSpot (forms, properties, workflows), brand assets and product screenshots",
        "Confirm the embargo date for The Missing Signal",
      ] },
      { name: "Discovery & sitemap", duration: "2 weeks", items: [
        "Short interviews with SDRs, AEs and enterprise sales to weight roles and qualifying questions",
        "Content inventory, redirect map, and the sitemap above, signed off before design",
        "HubSpot field and routing plan for the ICP score",
      ] },
      { name: "Design", duration: "3 weeks", items: [
        "Homepage, industry, role, integration, monitoring, problem and article templates",
        "Booking flow screens",
      ] },
      { name: "Build & content", duration: "8 weeks", items: [
        "Astro templates and Sanity content types",
        "Scored booking flow into HubSpot, with UTM and partner attribution",
        "Integration, MCP, role, monitoring and problem pages; Missing Signal landing page",
        "Migration of current content and redirects; sitemap.xml",
        "PostHog analytics and conversion events",
      ] },
      { name: "QA, training & launch", duration: "2 weeks", items: [
        "Cross-browser, accessibility and performance pass; end-to-end tests of every HubSpot route",
        "Sanity training for your team",
        "Launch and redirect checks",
      ] },
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
    { after: "homepage-redesign", entry: sections.leadScoring },
    { after: "homepage-redesign", entry: sections.siteAudit },
    { after: "sitemap", entry: sections.missingSignal },
    { after: "sitemap", entry: sections.contentPlan },
  ]),
  todos: {
    heading: TODO_HEADING,
    items: [
      "Confirm the four-month estimate and the phase durations. They are drafts, not agreed.",
      "Confirm the slug. This page uses /proposal/sensorhubb. No written slug rule was found in the repo.",
      "The pricing page rates (quarterly −10%, annually −15%; support $75–$50 USD) differ from the older proposals' shared defaults (−12% / −18%; $75–$56 USD). This page uses the pricing page.",
      "The e-book is embargoed. Decide how much of it this page may quote.",
      "Get approval for customer logos (Hyatt, Subway, etc.) and the Richmond County Schools quote before using them.",
      "Remove this block before sending.",
    ],
  },
};

export default proposal;
