import type { Proposal } from "./types";
import { OG_DEFAULT, TODO_HEADING, baseFaqs, costs, discounted, labels, supportSummary, tocFor } from "./shared";

const locale = "en" as const;
const ui = labels(locale);
const rates = discounted(4250);

const proposal: Proposal = {
  locale,
  clientName: "Canadian Club of Ottawa",
  clientUrl: "https://canadianclubottawa.ca/",
  title: "Canadian Club of Ottawa Website Proposal",
  metaTitle: "Canadian Club of Ottawa Proposal | CRFT Studio",
  metaDescription: "A website proposal for the Canadian Club of Ottawa: events, membership, sponsorship, content migration, and a CMS staff can update.",
  ogImageUrl: OG_DEFAULT,
  currentLangLabel: "EN",
  introHtml: `
    <p class="text-neutral-400 mb-6">The Canadian Club of Ottawa has convened national conversations since 1903. The website RFP asks for a practical site that staff can maintain, built around the refreshed visual identity, and ready ahead of the 2027–2028 season. This proposal is for the website only. The separate logo and brand-visibility RFP is not included.</p>
    <p class="text-neutral-400 mb-6">CRFT Studio designs and develops marketing websites on Astro and Sanity. Sanity is the CMS we implement. Staff update copy, events, and images in a structured editor, without a developer and without Shopify. The current Shopify site stays up until the replacement has been tested and approved.</p>
    <p class="text-neutral-400 mb-4">What this engagement covers, matched to the RFP:</p>
    <ul class="text-neutral-300 text-lg list-disc pl-5 flex flex-col gap-2 mb-6">
      <li>Home, About and history, Upcoming events, Past events and archive, Membership, Sponsorship, and Contact.</li>
      <li>Event recordings, which already live on the current site, migrated with the archive rather than dropped.</li>
      <li>Registration and ticketing as clear links to the Club’s existing ticketing platform. We are not rebuilding ticketing.</li>
      <li>A mobile-responsive build, basic SEO (titles, descriptions, redirects from the current URLs), and analytics.</li>
      <li>Migration of the current public pages. The Club supplies final copy, photography, and the approved logo and brand guidelines.</li>
      <li>Accessibility treated as part of design and QA: semantic headings, contrast against the refreshed brand, keyboard access, and alt text the CMS asks for. The RFP asks us to describe the approach. It does not name a WCAG level, so we have not claimed a formal audit.</li>
      <li>Handover to the Vice President of Operations and Communications and the Club Administrator, with a short training session. Board reviews can sit on the monthly meeting cycle.</li>
    </ul>
    <p class="text-neutral-400">Website planning can start while the brand refresh is still underway. Visual design waits for the approved identity. The subscription pauses during that wait, so the Club is not billed for idle months. A logged-in member area is not in this scope. Membership is a public page plus a way to enquire or join. We can price a portal separately if you want one.</p>
  `,
  homepage: {
    enabled: true,
    heading: "Peer sites we looked at",
    bodyHtml:
      "These are public sites of organizations with a similar job: a lecture or events program, a membership ask, and a long institutional history. They are inspiration only. They are not CRFT clients, and this proposal does not include an annotated homepage mockup.",
    competitors: [
      { name: "Empire Club of Canada", url: "https://www.empireclubofcanada.com/", note: "Events-first homepage and a clear membership path" },
      { name: "Canadian Club of Toronto", url: "https://www.canadianclub.org/", note: "Sister club. History and upcoming luncheons sit next to each other" },
      { name: "Public Policy Forum", url: "https://ppforum.ca/", note: "How a civic convener presents events, past work, and a support ask" },
    ],
  },
  showCmsCompare: true,
  sitemap: {
    heading: ui.sitemap,
    noteHtml:
      "Proposed from the RFP’s core pages and the current Shopify site (canadianclubottawa.ca). News posts that are still useful can live under Events or a simple News listing. The RFP announcement posts themselves do not need to move.",
    groups: [
      {
        title: "Home",
        items: [
          { label: "Homepage", note: "Next event, what the Club is, membership and sponsorship" },
          { label: "Contact" },
        ],
      },
      {
        title: "About",
        items: [
          { label: "About the Club" },
          { label: "History", note: "The current “120 years” page, ready to extend toward 2028" },
          { label: "Board of directors" },
        ],
      },
      {
        title: "Events",
        items: [
          { label: "Upcoming events", note: "Date, speaker, venue, and a link to the existing ticketing platform" },
          { label: "Past events and archive" },
          { label: "Event recordings" },
        ],
      },
      {
        title: "Join and support",
        items: [
          { label: "Membership", note: "Public page and enquiry. No member login in this scope" },
          { label: "Sponsorship" },
        ],
      },
    ],
  },
  timeline: {
    heading: ui.timelines,
    totalLabel: "Estimated active work: 3 months, on the Club’s calendar through June 2027",
    phases: [
      {
        name: "Onboarding",
        duration: "Day 1",
        items: [
          "After selection (the RFP targets mid-November 2026)",
          "Basecamp project, kickoff with the VP of Operations and Communications and the Club Administrator",
          "Confirm brand-designer contact, ticketing links, and who approves copy",
        ],
      },
      {
        name: "Discovery and structure",
        duration: "2 weeks",
        items: [
          "November–December 2026, alongside the Club’s own discovery window",
          "Sitemap, content inventory, and a list of what the Club still needs to write or photograph",
          "URL redirect map from the current Shopify pages",
          "Information architecture can proceed before the new logo is approved",
        ],
      },
      {
        name: "Brand hold",
        duration: "Not billed",
        items: [
          "Subscription pauses until the refreshed identity is approved",
          "The RFP anticipates that approval in Q1 2027",
          "The current website stays live the whole time",
        ],
      },
      {
        name: "Design and build",
        duration: "8 weeks",
        items: [
          "Starts once brand guidelines and the approved logo are in hand. The RFP points at March–May 2027",
          "Home and the core templates, designed in code, responsive",
          "Sanity models for events, pages, people, and sponsorship",
          "Analytics and a basic SEO setup",
        ],
      },
      {
        name: "Migration, training, launch",
        duration: "2 weeks",
        items: [
          "Move the current public pages, set redirects, and check ticketing links",
          "Staff training and a short written guide",
          "Target launch in June 2027, before the 2027–2028 season, after the Club has tested and approved the new site",
        ],
      },
    ],
  },
  costs: costs({
    locale,
    currency: "CAD",
    ...rates,
    devSummaryHtml:
      "All prices on this page are in Canadian dollars, before tax. The RFP asks for an itemized fixed price and welcomes a nonprofit discount and phased payments. CRFT bills a monthly subscription for active work, which you can pause. This site is smaller than a product marketing build, so the rate is $4,250 CAD per month rather than our published $6,850 CAD. Three active months is about $12,750 CAD before tax. The quarterly and 6-month tabs show that monthly rate after a 12% and 18% prepay discount ($3,740 and $3,485 CAD). The brand-refresh wait is not billed. A member login and any work on the separate brand RFP are out of scope.",
    supportSummaryHtml: supportSummary(locale, "CAD"),
    techIntroHtml:
      "The costs below are billed to the Canadian Club of Ottawa, not to CRFT. Hosting for the Astro site is also yours to pay. A typical launch fits a free or low host tier. We will name the host at kickoff rather than invent a number here.",
  }),
  faqsHeading: ui.faqs,
  faqs: [
    ...baseFaqs(locale),
    {
      question: "Will you rebuild our Shopify store or our ticketing?",
      answer:
        "No. The new site replaces the public website. Event registration stays on the ticketing platform you already use, linked from each event. We will confirm the exact vendor with you before launch. Membership in this proposal is a page and a form, not a Shopify customer account.",
    },
    {
      question: "What do you need from the Club?",
      answer:
        "Approved logo and brand guidelines before visual design, a decision on which past events and recordings to keep, and a single approver for copy. We draft page structure and can collaborate on new copy. We do not invent the Club’s history or speaker quotes.",
    },
    {
      question: "How does the subscription relate to a fixed price?",
      answer:
        "The working estimate is $4,250 CAD per active month for three months, about $12,750 CAD before tax, with the right to pause during the brand hold and to cancel. If the Club needs a single fixed figure for the board, we can turn that estimate into a capped quote before work starts.",
    },
  ],
  contactHtml: ui.contact,
  tocTitle: ui.toc,
  toc: tocFor(locale, true),
  todos: {
    heading: TODO_HEADING,
    items: [
      "Add two relevant references with name, organization, and a current email or phone. The RFP requires them. Do not invent any. The public portfolio at /customers is marketing sites (Cyberimpact, MobiLoud, That Writer Rose, FeedBear, MixBloom, Hoppy Copy), not membership or civic clients.",
      "The RFP asks for an itemized fixed price. This page is the monthly subscription: $4,250 CAD × 3 active months ≈ $12,750 CAD before tax, quarterly $3,740 CAD/month, 6-month $3,485 CAD/month. Attach a fixed schedule if the Club will not accept a subscription.",
      "Confirm whether CRFT is also bidding on the separate logo and brand-visibility RFP. This page prices the website only.",
      "Do not name a ticketing vendor until you confirm it. The page only says we will link to the Club’s existing platform.",
      "Add a short professional profile to the submission email (Jeremy Vejgman, founder, jeremy@crft.studio). Do not invent a founding year, headcount, awards, or insurance. The RFP does not ask for insurance.",
      "Submit by 11:59 PM on Wednesday, October 21, 2026 to Bryan Detchou, VP Operations and Communications, admin@canadianclubottawa.ca.",
    ],
  },
};

export default proposal;
