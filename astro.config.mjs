import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

import robotsTxt from "astro-robots-txt";

import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import { lookupRedirects } from "./src/lib/lookup-redirects.mjs";

const SITE = "https://www.crft.studio";

// Private, utility, or relocated routes. Prefix match so nested paths drop too.
const NON_INDEXABLE_PREFIXES = [
  "/proposal",
  "/audit/requests",
  "/lookup",
  "/checkout",
  "/thank-you",
  "/success",
  "/process-audit-request",
  "/customers/mobiloud",
];

function isIndexablePath(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return !NON_INDEXABLE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [sitemap({
      filter: (page) => isIndexablePath(new URL(page).pathname),
      serialize(item) {
        const url = new URL(item.url);
        item.url = url.pathname === "/"
          ? `${SITE}/`
          : `${SITE}${url.pathname.replace(/\/+$/, "")}`;
        return item;
      },
  }), mdx(), robotsTxt({
      sitemap: `${SITE}/sitemap-index.xml`,
      policy: [{ userAgent: "*", allow: "/" }],
  }), react()],
  output: "static",
  adapter: vercel(),
  trailingSlash: "never",
  redirects: lookupRedirects(),

  vite: {
    plugins: [tailwindcss()]
  }
});
