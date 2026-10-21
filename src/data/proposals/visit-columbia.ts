import type { Proposal } from "./types";
import { OG_DEFAULT, TODO_HEADING, baseFaqs, costs, discounted, labels, supportSummary, tocFor } from "./shared";

const locale = "en" as const;
const ui = labels(locale);
const rates = discounted(5000);

const proposal: Proposal = {
  locale,
  clientName: "Visit Columbia",
  clientUrl: "https://www.visitcolumbiatn.com/",
  title: "Visit Columbia Website Proposal",
  metaTitle: "Visit Columbia Proposal | CRFT Studio",
  metaDescription: "A proposal to redesign, build, and maintain VisitColumbiaTN.com: partner listings, events, maps, and stories.",
  ogImageUrl: OG_DEFAULT,
  currentLangLabel: "EN",
  introHtml: `
    <p class="text-neutral-400 mb-6">Visit Columbia’s public solicitation is for tourism website development and maintenance of VisitColumbiaTN.com. The BidNet documents themselves are not public, so this proposal is based on that listing and on the live site. The site is a destination guide: a partner directory of roughly 440 listings, an events calendar, maps, itineraries, and a long article archive, plus sections for downtown, the Duck River, Mule Day, the arts district, weddings, sports, and the Tennessee presidential trail.</p>
    <p class="text-neutral-400 mb-6">All prices on this page are in US dollars. No budget was printed on the public notice. CRFT’s rate is $5,000 USD per month. Seven months is $35,000 USD. That is sized to a directory of this scale, not to a small brochure, and it includes the first months of maintenance after launch rather than treating maintenance as a surprise. Quarterly and 6-month prepay drop the monthly rate by 12% and 18% ($4,400 and $4,100 USD).</p>
    <p class="text-neutral-400">Editors at the tourism office should be able to add a listing, an event, or a story without a developer. Listings, events, and articles are structured Sanity types with the fields the current site already depends on (category, neighborhood, dates, map location). The public site is Astro, so listing pages stay fast and can be previewed before they go live. Partner businesses do not get logins in this scope. Staff publish on their behalf, which matches how a DMO site of this size is usually run. A partner self-serve portal would be a later project.</p>
  `,
  homepage: {
    enabled: true,
    heading: "Peer sites we looked at",
    bodyHtml:
      "Public destination sites with a partner directory, events, and trip planning. Inspiration only. Not CRFT clients. No annotated homepage mockup is included.",
    competitors: [
      { name: "Visit Franklin", url: "https://visitfranklin.com/", note: "A nearby Tennessee downtown destination with events and listings" },
      { name: "Visit Savannah", url: "https://www.visitsavannah.com/", note: "How a larger DMO splits explore, events, and stories" },
      { name: "Travel Oregon", url: "https://traveloregon.com/", note: "Maps, itineraries, and a clear content model for a tourism team" },
    ],
  },
  showCmsCompare: true,
  sitemap: {
    heading: ui.sitemap,
    noteHtml:
      "Collapsed from the current sitemap (about 640 URLs). Individual listings, events, and articles stay as entries in those sections. They are not drawn as separate boxes here. Legacy test URLs under paths like svtest would not be migrated.",
    groups: [
      {
        title: "Home",
        items: [
          { label: "Homepage", note: "Seasonal feature, upcoming events, a way into the directory" },
          { label: "Contact and visitor information" },
          { label: "Newsletter" },
        ],
      },
      {
        title: "Explore",
        items: [
          { label: "Downtown and the historic district" },
          { label: "Arts district and Columbia Arts Council" },
          { label: "Outdoors, Duck River, and parks" },
          { label: "Presidential sites and the Tennessee presidential trail" },
          { label: "Sports" },
          { label: "Weddings and events venues" },
          { label: "Itineraries" },
          { label: "Mule Day" },
        ],
      },
      {
        title: "Directory, events, stories",
        items: [
          { label: "Partner listings", note: "Eat, stay, shop, things to do. The bulk of the current site" },
          { label: "Events calendar" },
          { label: "Articles and the blog" },
          { label: "Maps", note: "Town map plus listing locations" },
        ],
      },
      {
        title: "About",
        items: [
          { label: "About Visit Columbia and the team" },
          { label: "Welcome center and local info" },
          { label: "Media" },
          { label: "Privacy" },
        ],
      },
    ],
  },
  timeline: {
    heading: ui.timelines,
    totalLabel: "Estimated duration: 7 months (about $35,000 USD)",
    phases: [
      {
        name: "Onboarding",
        duration: "Day 1",
        items: [
          "Kickoff with the tourism staff who publish listings and events today",
          "Access to the current CMS export, analytics, and map data",
          "Agree which listing categories and article years are in the first launch",
        ],
      },
      {
        name: "Discovery and architecture",
        duration: "3 weeks",
        items: [
          "Content model for listings, events, places, and stories",
          "Redirect plan so existing Google results for listings do not 404",
          "SEO baseline: titles, descriptions, and canonical URLs",
        ],
      },
      {
        name: "Design",
        duration: "4 weeks",
        items: [
          "Homepage, listing, event, story, and map templates",
          "Designed in code, checked on a phone. Columbia’s current brand stays unless you supply a new one",
        ],
      },
      {
        name: "Directory, events, and maps",
        duration: "12 weeks",
        items: [
          "Import partner listings and give staff a Sanity desk to edit them",
          "Events calendar with a public list and detail pages",
          "Map of places, fed by the same listing records",
          "Preview environment before anything replaces the live site",
        ],
      },
      {
        name: "Stories, SEO, launch",
        duration: "6 weeks",
        items: [
          "Migrate the article archive that is still worth keeping",
          "Redirects, metadata, and a search page",
          "Training for the people who update listings each week",
          "Launch on a date the office chooses, with the old site left up until then",
        ],
      },
      {
        name: "Maintenance",
        duration: "Included through month 7, then hourly",
        items: [
          "The seventh month is post-launch support: fixes, editor questions, and performance",
          "After that, use the hourly bundles below, or pause until the next campaign season",
          "Security updates for the Astro app and Sanity schema changes stay with CRFT. Day-to-day listing edits stay with staff",
        ],
      },
    ],
  },
  costs: costs({
    locale,
    currency: "USD",
    ...rates,
    devSummaryHtml:
      "All figures in this section are USD. $5,000 USD per month for seven months is $35,000 USD. That covers the redesign and build of VisitColumbiaTN.com as described above, including partner listings, events, maps, stories, SEO setup, training, and the first month after launch. It does not cover a partner login, paid advertising, or a new brand. The quarterly and 6-month tabs are the monthly rate after a 12% and 18% prepay discount. If the City needs one fixed maintenance number for later years, we can set it once the required hours are known. We have not guessed that number.",
    supportSummaryHtml: supportSummary(locale, "USD"),
    techIntroHtml:
      "Stack costs are billed to Visit Columbia, not included in the $35,000. Sanity’s Growth plan is the line most offices actually pay. Hosting is separate and usually small for a site like this. We will recommend a specific host once we know whether the City requires the site to sit on its own infrastructure.",
  }),
  faqsHeading: ui.faqs,
  faqs: [
    ...baseFaqs(locale),
    {
      question: "Can staff add a restaurant or an event without you?",
      answer:
        "Yes. Listings and events are forms in Sanity: name, category, description, photos, hours, location, and dates. Publishing does not require a code change. A new page type that does not exist yet, such as a partner portal, is a development task.",
    },
    {
      question: "What happens to the current listing URLs?",
      answer:
        "We map the current paths to the new ones and ship redirects with the launch. Listings are the pages most likely to have search traffic, so they are the priority for that map.",
    },
    {
      question: "Is ongoing maintenance included forever?",
      answer:
        "Month seven of the subscription is the launch-support month. After that, maintenance is the hourly bundles on this page, which you can buy as needed. Hosting and Sanity seats continue to be billed by those vendors to you.",
    },
  ],
  contactHtml: ui.contact,
  tocTitle: ui.toc,
  toc: tocFor(locale, true),
  todos: {
    heading: TODO_HEADING,
    items: [
      "The BidNet solicitation (RFP - Tourism Website Development & Maintenance Services, closing October 29, 2026, 2:00 PM CDT) is behind a login. This page uses the public listing plus the live sitemap at visitcolumbiatn.com. Read the locked documents before sending and correct scope, forms, insurance, bonds, and references.",
      "If the City requires a fixed annual maintenance price, replace the hourly block. No annual figure is invented here. The build estimate is $5,000 USD × 7 months = $35,000 USD.",
      "Add references only if the RFP requires them, and only real ones. Do not imply tourism-board clients. The public portfolio is marketing sites.",
      "Submitting likely requires a BidNet vendor account. Confirm that before the deadline.",
    ],
  },
};

export default proposal;
