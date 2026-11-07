import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { lookupRedirects } from "../src/lib/lookup-redirects.mjs";

const configPath = ".vercel/output/config.json";

if (existsSync(configPath)) {
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  const already = config.routes?.some((route) => route.src === "^/lookup/$" && route.status === 301);
  if (!already) {
    const slashRoutes = Object.entries(lookupRedirects()).map(([from, redirect]) => ({
      src: `^${from}/$`,
      headers: { Location: redirect.destination },
      status: 301,
    }));
    // Unknown /lookup/.../ URLs skip the sitewide slash strip and go straight to Lookup.
    slashRoutes.push({
      src: "^/lookup(?:/.*)?/$",
      headers: { Location: "https://www.crftlookup.com/" },
      status: 301,
    });
    config.routes = [...slashRoutes, ...(config.routes ?? [])];
    writeFileSync(configPath, JSON.stringify(config));
  }
}

const homepage = "<loc>https://www.crft.studio</loc>";
const homepageCanonical = "<loc>https://www.crft.studio/</loc>";
for (const sitemapPath of ["dist/client/sitemap-0.xml", ".vercel/output/static/sitemap-0.xml"]) {
  if (!existsSync(sitemapPath)) continue;
  const xml = readFileSync(sitemapPath, "utf8");
  if (xml.includes(homepage) && !xml.includes(homepageCanonical)) {
    writeFileSync(sitemapPath, xml.replace(homepage, homepageCanonical));
  }
}
