export type Locale = "en" | "fr";
export type PriceFormat = "en-prefix" | "fr-suffix";

export interface TocEntry {
  text: string;
  slug: string;
}

export interface Competitor {
  name: string;
  url: string;
  note?: string;
}

export interface HomepageSection {
  /** When false, the block stays in the data file but is not rendered. */
  enabled: boolean;
  heading: string;
  bodyHtml: string;
  competitors?: Competitor[];
  redesign?: {
    title: string;
    description: string;
    url: string;
    linkLabel: string;
    embedUrl?: string;
  };
}

export interface SitemapGroup {
  title: string;
  items: { label: string; note?: string }[];
}

export interface SitemapSection {
  heading: string;
  embedSrc?: string;
  noteHtml?: string;
  groups?: SitemapGroup[];
}

export interface TimelinePhase {
  name: string;
  duration: string;
  items: string[];
  noteHtml?: string;
}

export interface TimelineSection {
  heading: string;
  totalLabel: string;
  phases: TimelinePhase[];
}

export interface Feature {
  title: string;
  body: string;
}

export interface PricePlan {
  prices: Record<string, number>;
  tabs: { id: string; label: string }[];
  currencyLabel: string;
  periodLabel: string;
  priceFormat: PriceFormat;
}

export interface TechRow {
  service: string;
  cost: string;
  notes: string;
}

export interface CostsSection {
  heading: string;
  devLabel: string;
  dev: PricePlan;
  devSummaryHtml: string;
  features: Feature[];
  supportLabel: string;
  support: PricePlan;
  supportSummaryHtml: string;
  techLabel: string;
  techIntroHtml: string;
  techColumns: [string, string, string];
  techRows: TechRow[];
  techTotal: { service: string; cost: string };
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Proposal {
  locale: Locale;
  clientName: string;
  clientUrl?: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
  currentLangLabel: string;
  alternate?: { href: string; label: string };
  introHtml: string;
  homepage?: HomepageSection;
  showCmsCompare: boolean;
  sitemap: SitemapSection;
  timeline: TimelineSection;
  costs: CostsSection;
  faqsHeading: string;
  faqs: Faq[];
  contactHtml: string;
  tocTitle: string;
  toc: TocEntry[];
  todos?: { heading: string; items: string[] };
}
