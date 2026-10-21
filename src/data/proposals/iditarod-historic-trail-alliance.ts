import type { Proposal } from "./types";
import { OG_DEFAULT, TODO_HEADING, baseFaqs, costs, discounted, labels, supportSummary, tocFor } from "./shared";

const locale = "en" as const;
const ui = labels(locale);
const rates = discounted(5000);

const proposal: Proposal = {
  locale,
  clientName: "Iditarod Historic Trail Alliance",
  clientUrl: "https://www.iditarod100.org/",
  title: "Iditarod Historic Trail Alliance Website Proposal",
  metaTitle: "Iditarod Historic Trail Alliance Proposal | CRFT Studio",
  metaDescription: "A website proposal for iditarod100.org: trail content, store, donations, WCAG 2.2 AA, and a CMS the Alliance can edit.",
  ogImageUrl: OG_DEFAULT,
  currentLangLabel: "EN",
  introHtml: `
    <p class="text-neutral-400 mb-6">The Alliance wants iditarod100.org rebuilt as a modern, accessible site for people who use the trail, rural communities along it, and the land managers who share it. The RFP covers discovery, information architecture, design, migration, a store, donations, payments, WCAG 2.2 AA, training, and a maintenance recommendation. Desired public launch is March 1, 2027, after a November 30, 2026 kickoff. The stated budget is $20,000–$25,000.</p>
    <p class="text-neutral-400 mb-6">All prices on this page are in US dollars. CRFT’s published rate is $5,000 USD per month. Five months is $25,000 USD, the top of the budget, and it is enough to include the store, donations, and membership payments rather than stop at a brochure. Stopping at four months is $20,000 USD if the store has to wait. Prepaying quarterly or for six months lowers the monthly rate by 12% and 18% ($4,400 and $4,100 USD).</p>
    <p class="text-neutral-400 mb-4">You asked for two or three platform recommendations. These are the three worth weighing. CRFT would implement the first. We do not implement the other two.</p>
    <ul class="text-neutral-300 text-lg list-disc pl-5 flex flex-col gap-2 mb-6">
      <li><span class="text-neutral-100">Astro + Sanity + Stripe.</span> This is the proposal. Astro serves a fast public site. Sanity is the CMS editors use, with roles, drafts, and an export of your content. Stripe Checkout handles store, donation, and membership payments, and Stripe keeps the card data so the site stays out of PCI scope. Donor and customer emails can sync to the email tool you already use. Later additions (courses, richer media, a virtual tour) are new Sanity types and pages, not a replatform.</li>
      <li><span class="text-neutral-100">WordPress.</span> Familiar to many nonprofit editors, with store and donation plugins. It is a reasonable alternative if the Alliance wants a plugin marketplace more than a structured content model. CRFT would not build it. The ongoing security and plugin maintenance is higher than Sanity for a small staff.</li>
      <li><span class="text-neutral-100">Shopify for the whole site.</span> Strong if the store were the product. It is a poor fit for a trail guide, community pages, and an education section. We would not put the public site on Shopify. A Shopify store linked from an Astro site is possible later, and it is not in this price.</li>
    </ul>
    <p class="text-neutral-400">March 1, 2027 is about thirteen weeks after kickoff. We can put the public templates and priority pages in front of visitors on that date if photography, payment accounts, and the first round of copy are ready at kickoff. Community pages, the store, and donations are more realistic through April 2027. That is why the estimate is five months, with March 1 as a milestone inside the project rather than the end of it. The RFP notes federal financial assistance. We will follow flow-down terms that apply to this website work once those terms are identified. This page does not claim certifications we have not been asked to show.</p>
  `,
  homepage: {
    enabled: true,
    heading: "Peer sites we looked at",
    bodyHtml:
      "Public trail organizations with the same mix of trip planning, stewardship, and a donate or shop ask. Inspiration only. Not CRFT clients. No annotated homepage mockup is included.",
    competitors: [
      { name: "Pacific Crest Trail Association", url: "https://www.pcta.org/", note: "Plan a trip, protect the trail, and a clear support ask" },
      { name: "Appalachian Trail Conservancy", url: "https://appalachiantrail.org/", note: "Long-distance trail content with maps, volunteer, and shop" },
      { name: "Continental Divide Trail Coalition", url: "https://cdtcoalition.org/", note: "A smaller staff publishing maps, stories, and donations together" },
    ],
  },
  showCmsCompare: true,
  sitemap: {
    heading: ui.sitemap,
    noteHtml:
      "This follows Attachment 1 of the RFP (the draft INHT website map) and replaces the current flat list of community HTML pages on iditarod100.org. Gateway communities become a repeatable place page instead of a separate hand-built file per community. The current store, newsletters, stewardship, and support pages fold into the groups below.",
    groups: [
      {
        title: "Home",
        items: [
          { label: "Homepage", note: "Visual story: what the trail is, who it is for, how to start" },
          { label: "Search" },
          { label: "Contact" },
        ],
      },
      {
        title: "Plan a trip",
        items: [
          { label: "Interactive map" },
          { label: "Visitor guide" },
          { label: "Recreation info" },
          { label: "Passport program" },
          { label: "Auto tour" },
          { label: "Places to visit and gateway communities" },
          { label: "Links to partner sites" },
        ],
      },
      {
        title: "Learn about the trail",
        items: [
          { label: "Locations and landscapes" },
          { label: "Multiple uses of the trail" },
          { label: "History", note: "Including the gold-rush and Alaska Native travel context the Alliance already publishes" },
          { label: "Records and stories" },
          { label: "Project Jukebox", note: "Link or embed the existing project, not a rewrite of it" },
          { label: "For kids" },
          { label: "For educators and professional development" },
        ],
      },
      {
        title: "Get involved",
        items: [
          { label: "Stewardship and workshops" },
          { label: "Junior Trailblazer" },
          { label: "Grants" },
          { label: "Donations" },
          { label: "Membership" },
          { label: "Newsletter signup" },
        ],
      },
      {
        title: "About and store",
        items: [
          { label: "Staff and board" },
          { label: "Annual reports and newsletters" },
          { label: "Partners and media package" },
          { label: "Announcements" },
          { label: "Store", note: "Merchandise and INHT books, Stripe checkout" },
        ],
      },
    ],
  },
  timeline: {
    heading: ui.timelines,
    totalLabel: "Estimated duration: 5 months (about $25,000 USD). Public milestone: March 1, 2027",
    phases: [
      {
        name: "Onboarding",
        duration: "Day 1",
        items: [
          "Kickoff targeted for November 30, 2026, after a November 20 award",
          "Basecamp, analytics access if you have it, and a content inventory of iditarod100.org",
          "Confirm Stripe (or another PCI processor) and which email tool receives signup addresses",
        ],
      },
      {
        name: "Discovery",
        duration: "2 weeks",
        items: [
          "Requirements, risks, and success measures from the RFP and Attachment 1",
          "Written platform recommendation (the three options above, with Astro + Sanity + Stripe as the one we will build)",
          "Content-needs list: copy, photos, and map data the Alliance still has to supply",
        ],
      },
      {
        name: "Design",
        duration: "3 weeks",
        items: [
          "Templates for the homepage, a place page, a simple text page, an event or announcement, and the store",
          "Designed in code after a short direction review. Two revision rounds on the core templates are included",
          "WCAG 2.2 AA checked in the design: contrast, focus, headings, form labels",
        ],
      },
      {
        name: "Public site",
        duration: "8 weeks",
        items: [
          "Sanity models, navigation, search, and the priority pages",
          "Redirects from the current HTML files",
          "Analytics",
          "Target: priority public pages launchable March 1, 2027 if source material is in by kickoff",
        ],
      },
      {
        name: "Store, payments, remaining migration",
        duration: "6 weeks",
        items: [
          "Merchandise, books, donations, and membership payments through Stripe",
          "Customer and donor email capture, passed to your email tool. We do not build a separate CRM",
          "Migration of the remaining community and history pages",
          "Accessibility, performance, and security pass before launch. Through about mid-April 2027",
        ],
      },
      {
        name: "Training and support",
        duration: "2 weeks",
        items: [
          "Editor training, a written admin guide, and a recommended maintenance plan",
          "Post-launch fixes for issues found in the first two weeks",
        ],
      },
    ],
  },
  costs: costs({
    locale,
    currency: "USD",
    ...rates,
    devSummaryHtml:
      "All figures in this section are USD. $5,000 USD per month for five months is $25,000 USD, the top of the $20,000–$25,000 range in the RFP. That total includes discovery, the Attachment 1 sitemap, design, migration, store, donations, membership payments, WCAG 2.2 AA work, training, and a short post-launch window. Four months, stopping before the store, is $20,000 USD. The quarterly and 6-month tabs are the monthly rate after a 12% and 18% prepay discount. Optional later work (e-courses, a virtual tour) is not included. Payment processing fees are Stripe’s, paid by the Alliance, not part of our fee.",
    supportSummaryHtml: supportSummary(locale, "USD"),
    techIntroHtml:
      "These stack costs are billed to the Iditarod Historic Trail Alliance in USD where a vendor charges USD, and they are not part of the $25,000. Stripe processing fees are separate and usage-based. Hosting for the Astro site is also yours. We have not put a hosting dollar figure here because it depends on traffic and whether you want the site on your own server.",
  }),
  faqsHeading: ui.faqs,
  faqs: [
    ...baseFaqs(locale),
    {
      question: "How will you meet WCAG 2.2 AA?",
      answer:
        "Semantic HTML, visible focus, form labels, captions and alt text required by the CMS, color contrast checked against the brand, and keyboard testing on the templates. Before launch we run an automated scan and a manual pass on the primary journeys (plan a trip, donate, buy from the store, read a community page). We fix what that pass finds. We do not sell a third-party certification.",
    },
    {
      question: "Who holds donor and store data?",
      answer:
        "Card data stays with Stripe. Sanity holds the content you publish. Emails collected on forms can be sent to your existing email tool. You can export Sanity content. We do not keep a private copy of donor records after handover.",
    },
    {
      question: "What is not in the $25,000?",
      answer:
        "New photography, a virtual tour, e-courses, a custom CRM, rewriting Project Jukebox, and Stripe’s own fees. Professional copywriting of the whole archive is not included. We will format and migrate approved content and flag gaps.",
    },
  ],
  contactHtml: ui.contact,
  tocTitle: ui.toc,
  toc: tocFor(locale, true),
  todos: {
    heading: TODO_HEADING,
    items: [
      "Add at least three client references with current contacts. The RFP requires them. Do not invent any. Public work at /customers is marketing sites, not trail or nonprofit accounts.",
      "The PDF also needs a company profile, team roles, and years in business. Primary contact can be Jeremy Vejgman, founder, jeremy@crft.studio. Do not invent a founding year or headcount.",
      "The RFP says the project is funded in whole or in part by a federal financial assistance award and that the vendor must comply with applicable flow-down terms. Confirm insurance, debarment, and any required certifications before sending. This page does not claim those are in place.",
      "Confirm Stripe is acceptable. The page recommends it and does not claim an existing integration.",
      "Email one PDF to iditarodhta@gmail.com by Monday, November 2, 2026, 5:00 PM AKST. The written question window in the RFP closed October 15, 2026 (Annette Heckart, annette.heckart@outlook.com).",
      "Attachment 1 is the sitemap used here. If a newer map arrives, edit the groups in src/data/proposals/iditarod-historic-trail-alliance.ts.",
    ],
  },
};

export default proposal;
