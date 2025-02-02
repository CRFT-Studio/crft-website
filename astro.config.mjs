import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

import robotsTxt from "astro-robots-txt";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: 'https://crft.studio',
  integrations: [tailwind(), sitemap(), mdx(), robotsTxt()],
  output: "static",
  adapter: cloudflare(),
});