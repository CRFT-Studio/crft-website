import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://crft.studio',
  integrations: [tailwind(), sitemap(), mdx()],
  output: "hybrid",
  adapter: cloudflare()
});