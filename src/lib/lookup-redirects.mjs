/** Permanent redirects from the old crft.studio/lookup URLs onto www.crftlookup.com. */

const ORIGIN = "https://www.crftlookup.com";

const features = [
  "technology-detection",
  "lighthouse",
  "sitemap-visualizer",
  "meta-tag-previewer",
];

const alternativeNames = [
  "builtwith",
  "ful",
  "gtmetrix",
  "metatagsio",
  "octopus",
  "pagespeed",
  "pingdom",
  "stackcrawler",
  "wappalyzer",
];

const detectors = [
  "analytics-detector",
  "cdn-detector",
  "cms-detector",
  "email-marketing-detector",
  "js-framework-detector",
  "shopify-app-detector",
  "wp-plugin-detector",
];

const gallery = [
  "airbnb",
  "apple",
  "basecamp",
  "brittany-chiang",
  "cluely",
  "figma",
  "helium",
  "incident",
  "linear",
  "notion",
  "opal-camera",
  "posthog",
  "shopify",
  "sketch",
  "stripe",
  "tailwind-css",
  "uber",
];

/**
 * Historical routes come from this repo's lookup pages (and Wayback 200s).
 * The nested /lookup/alternatives/*, /lookup/features/*, and flat
 * /lookup/*-detector shapes 404 today; they are mapped anyway because those
 * are the URLs still being requested, and each slug has a live equivalent.
 * Anything else falls through to the crftlookup homepage via src/pages/lookup/[...path].astro.
 */
export function lookupRedirects() {
  /** @type {Record<string, { status: 301, destination: string }>} */
  const redirects = {};
  const add = (from, to) => {
    redirects[from] = { status: 301, destination: to };
  };

  add("/lookup", `${ORIGIN}/lookup`);
  // Public scanner duplicate. The new report UI lives at /dashboard/report
  // (/lookup/report on crftlookup.com returns 500).
  add("/lookup/report", `${ORIGIN}/dashboard/report`);
  // Removed Dec 2024 when analysis was folded into /lookup?url=.
  add("/lookup/analysis", `${ORIGIN}/lookup`);
  add("/lookup/alternatives", `${ORIGIN}/alternatives`);
  add("/lookup/gallery", `${ORIGIN}/lookup/gallery`);

  for (const feature of features) {
    add(`/lookup/${feature}`, `${ORIGIN}/features/${feature}`);
    add(`/lookup/features/${feature}`, `${ORIGIN}/features/${feature}`);
  }

  for (const name of alternativeNames) {
    const slug = `${name}-alternative`;
    add(`/lookup/${slug}`, `${ORIGIN}/alternatives/${slug}`);
    add(`/lookup/alternatives/${slug}`, `${ORIGIN}/alternatives/${slug}`);
  }

  for (const detector of detectors) {
    add(`/lookup/use-cases/${detector}`, `${ORIGIN}/use-cases/${detector}`);
    add(`/lookup/${detector}`, `${ORIGIN}/use-cases/${detector}`);
  }

  for (const page of gallery) {
    add(`/lookup/gallery/${page}`, `${ORIGIN}/lookup/gallery/${page}`);
  }

  return redirects;
}
