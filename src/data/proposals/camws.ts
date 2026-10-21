import type { Proposal } from "./types";
import { OG_DEFAULT, TODO_HEADING, baseFaqs, costs, discounted, labels, supportSummary, tocFor } from "./shared";

const locale = "en" as const;
const ui = labels(locale);
const rates = discounted(5000);

const proposal: Proposal = {
  locale,
  clientName: "CAMWS",
  clientUrl: "https://camws.org/",
  title: "CAMWS Website Proposal",
  metaTitle: "CAMWS Proposal | CRFT Studio",
  metaDescription: "A proposal to redesign camws.org with a member portal, conference registration, dues payments, and WCAG 2.2 AA.",
  ogImageUrl: OG_DEFAULT,
  currentLangLabel: "EN",
  introHtml: `
    <p class="text-neutral-400 mb-6">CAMWS needs a public site that no longer feels dated on a phone, plus the member tasks the current portal does not do well: renewal, profile, directory, conference registration, and abstract submission. The RFP also asks for a CMS the Secretary-Treasurer can run, a document library, news and an events calendar, analytics, WCAG 2.2 AA, migration with redirects, training, and a written support model. Membership is about 1,100, dues run through PayPal today, and records are kept by hand.</p>
    <p class="text-neutral-400 mb-6">All prices on this page are in US dollars. The RFP does not state a budget. This proposal is $5,000 USD per month for eight months, $40,000 USD in total. The journals stay where they are. The Classical Journal, Teaching Classical Languages, and the American Journal of Classical Reception are linked, not rebuilt. Deep historical meeting microsites are migrated as documents or archived pages with redirects, not redrawn one HTML file at a time.</p>
    <p class="text-neutral-400 mb-4">Platform, in the terms the RFP asks for:</p>
    <ul class="text-neutral-300 text-lg list-disc pl-5 flex flex-col gap-2 mb-6">
      <li>Astro for the public site and the logged-in pages. Fast HTML, preview before publish, and a host you can move later.</li>
      <li>Sanity as the CMS. Structured types for news, events, awards, committees, publications, and documents. Roles for the Secretary-Treasurer, editors, and committee chairs. Version history and scheduled publishing are part of Sanity. CRFT uses Sanity. We do not implement Payload.</li>
      <li>Stripe for dues and conference fees, so card data stays with a PCI-compliant processor. Staff get payment reports from Stripe. PayPal can remain during a transition if you want it. We have not priced a second gateway.</li>
      <li>Member accounts live in the application, not in a proprietary association suite. Profile, renewal, and a member directory are pages we build. You can export members and content. The RFP names Wild Apricot as an example of a membership platform. This proposal does not assume Wild Apricot. Integrating it would be a different scope, and we would only add it after confirming the work.</li>
    </ul>
    <p class="text-neutral-400">Primary contact for the project is Jeremy Vejgman, founder, jeremy@crft.studio. Accessibility: WCAG 2.2 AA on the public site, with editor fields that require alt text and headings so staff do not need a developer to stay compliant on ordinary pages. Pages should load in under three seconds on a normal connection because they are static HTML on a CDN. Search is a site search index over the public content. Officer email inboxes are not part of this build. We will publish the addresses and forms you give us.</p>
  `,
  homepage: {
    enabled: true,
    heading: "Peer sites we looked at",
    bodyHtml:
      "Public sites of scholarly societies with meetings, membership, and publications. Inspiration only. Not CRFT clients, and not claimed as comparable engagements. No annotated homepage mockup is included.",
    competitors: [
      { name: "Society for Classical Studies", url: "https://classicalstudies.org/", note: "Membership, meetings, and publications in one navigation" },
      { name: "Archaeological Institute of America", url: "https://www.archaeological.org/", note: "Annual meeting, abstracts, and a member path" },
      { name: "American Classical League", url: "https://www.aclclassics.org/", note: "A classics association aimed at teachers as well as faculty" },
    ],
  },
  showCmsCompare: true,
  sitemap: {
    heading: ui.sitemap,
    noteHtml:
      "Built from the current camws.org navigation (About, Membership, Committees, Publications, Meetings, Awards, News) and the RFP’s functional list. Southern Section can stay a linked site or a section. Journal hosts (cj.camws.org, tcl.camws.org, ajcr.online) stay external.",
    groups: [
      {
        title: "Public",
        items: [
          { label: "Home" },
          { label: "About CAMWS, history, and the diversity statement" },
          { label: "Officers, contacts, and committees" },
          { label: "News and announcements" },
          { label: "Events calendar", note: "Meeting dates and submission deadlines" },
          { label: "Publications", note: "Links to CJ, TCL, the newsletter, and AJCR" },
          { label: "Awards and grants, including CPLG" },
          { label: "Resources and document library", note: "Bylaws, reports, grant forms" },
          { label: "Search" },
        ],
      },
      {
        title: "Meetings",
        items: [
          { label: "Annual meeting" },
          { label: "Call for papers and abstract submission" },
          { label: "Conference registration and payment" },
          { label: "Southern Section", note: "Link to southernsection.camws.org unless you want it folded in" },
        ],
      },
      {
        title: "Member portal",
        items: [
          { label: "Join and renew, including institutional membership" },
          { label: "Profile" },
          { label: "Directory", note: "Visible to signed-in members" },
          { label: "Payment history" },
          { label: "Exclusive member benefits" },
        ],
      },
    ],
  },
  timeline: {
    heading: ui.timelines,
    totalLabel: "Estimated duration: 8 months (about $40,000 USD)",
    phases: [
      {
        name: "Onboarding",
        duration: "Day 1",
        items: [
          "Kickoff with the Secretary-Treasurer",
          "Access to the current site, PayPal process, and a sample of member fields (no card data)",
          "Agree the migration boundary: current public pages in, historical meeting HTML archived with redirects",
        ],
      },
      {
        name: "Planning and sitemap",
        duration: "4 weeks",
        items: [
          "Short interviews with the people who actually publish: Secretary-Treasurer, newsletter, awards",
          "A proposed sitemap for review before design, as the RFP requires",
          "Content inventory and a redirect map",
        ],
      },
      {
        name: "Design",
        duration: "4 weeks",
        items: [
          "A small design system on the existing CAMWS identity, unless you commission a new one",
          "Homepage, interior page, news, meeting, and a logged-in member view",
          "Style notes staff can follow when they add pages later",
        ],
      },
      {
        name: "Public site and migration",
        duration: "12 weeks",
        items: [
          "Sanity content types, roles, and the public templates",
          "News, calendar, awards, committees, document library",
          "Migration of current public content and redirects",
          "Site search and analytics",
        ],
      },
      {
        name: "Members, dues, and the meeting",
        duration: "10 weeks",
        items: [
          "Accounts, profile, renewal reminders by email, and dues via Stripe",
          "Staff report of who has paid",
          "Conference registration and an abstract form with file upload and a review status staff can see",
          "This phase overlaps the end of the public build. Elapsed project time stays inside eight months",
        ],
      },
      {
        name: "Accessibility, training, launch",
        duration: "4 weeks",
        items: [
          "WCAG 2.2 AA pass on public templates and the main logged-in flows",
          "Training session, written guide, and short screen recordings for the routine CMS tasks",
          "Launch support for the first weeks, including security headers, backups of the repo and Sanity dataset, and a note on how to export",
        ],
      },
    ],
  },
  costs: costs({
    locale,
    currency: "USD",
    ...rates,
    devSummaryHtml:
      "All figures in this section are USD. $5,000 USD per month for eight months is $40,000 USD. That is the one-time build: public redesign, migration and redirects, member portal, dues, conference registration with abstract submission, WCAG 2.2 AA, training, and the written guide. Recurring costs that are not our fee are in the tech-stack table (Sanity seats) plus Stripe processing fees and hosting, paid by CAMWS. After month eight, support is the hourly bundles below. The quarterly and 6-month tabs show the monthly rate after a 12% and 18% prepay discount ($4,400 and $4,100 USD). Video tutorials for routine editing are included. A Wild Apricot integration, officer email hosting, and a rebuild of the journals are not.",
    supportSummaryHtml:
      "After launch, hourly support in USD covers schema changes, new workflows, and anything staff should not have to do in the CMS. Bundles reduce the hourly rate. Response on ordinary editor questions during the build is part of the monthly fee, not billed again here. We have not promised a same-day emergency retainer. If CAMWS needs a named response time in the contract, we will set it in writing before kickoff.",
    techIntroHtml:
      "These amounts are billed to CAMWS and are not inside the $40,000. The total line is Sanity’s per-user price, which is what a small editorial team typically pays. Stripe and hosting are extra and usage-based. Nothing in this table is a CRFT license.",
  }),
  faqsHeading: ui.faqs,
  faqs: [
    ...baseFaqs(locale),
    {
      question: "Will members be locked into your platform?",
      answer:
        "No. Content exports from Sanity. Member and payment records can be exported as data files. The Astro code is in a GitHub repository we transfer to you. Card numbers never land in our database. Stripe holds them.",
    },
    {
      question: "How do abstracts and registration work?",
      answer:
        "An author submits a form (title, abstract, program category, and any file you require). Staff see a queue in Sanity or a simple admin view and mark it accepted or declined. Registration is a separate checkout through Stripe, with member and non-member prices. We are not building a full conference app with scheduling conflicts and badges. That would be additional scope.",
    },
    {
      question: "How do you test accessibility?",
      answer:
        "Templates are built to WCAG 2.2 AA: contrast, keyboard, focus, labels, headings, and alt text required in the CMS. Before launch we run an automated checker and a manual pass on the homepage, a content page, search, join/renew, and abstract submission, then fix what fails. Editors keep ordinary pages compliant by filling the required fields. We do not issue a formal certification.",
    },
    {
      question: "What about the next five years?",
      answer:
        "Astro and Sanity are both actively maintained. Staff can keep publishing without us. A developer is needed when the content model changes or a dependency needs an upgrade. That is the hourly support on this page, not a new replatform. We will document the upgrade path at handover.",
    },
  ],
  contactHtml: ui.contact,
  tocTitle: ui.toc,
  toc: tocFor(locale, true),
  todos: {
    heading: TODO_HEADING,
    items: [
      "The RFP requires at least three client references with current contact information, plus résumés for key personnel. Do not invent them. Public work at /customers is marketing sites, not scholarly associations. Primary contact already named on the page: Jeremy Vejgman, jeremy@crft.studio.",
      "Confirm membership approach before sending. The page proposes a portal we build plus Stripe, and does not assume Wild Apricot. Price Wild Apricot only after you know we can integrate it. Same for keeping PayPal instead of Stripe.",
      "The RFP wants costs itemized by phase, including one-time, recurring, and maintenance. This page uses the subscription: $5,000 USD × 8 = $40,000 USD, plus client-paid Sanity/Stripe/hosting, plus optional hourly support after month eight. Add a phase dollar table in the PDF if a subscription will be rejected.",
      "Officer email hosting is out of scope on purpose. Confirm that is acceptable.",
      "Do not claim a WCAG certification. The page describes the testing method only.",
      "Email a PDF to Professor Victoria Pagan at nominating@camws.org by October 30, 2026. Subject line required by the RFP: “CAMWS Website RFP — CRFT Studio”.",
    ],
  },
};

export default proposal;
