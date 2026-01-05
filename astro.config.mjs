import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

import robotsTxt from "astro-robots-txt";

import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.crft.studio',
  integrations: [sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/proposal'),
  }), mdx(), robotsTxt(), sanity(), react()],
  output: "static",
  adapter: vercel(),
  trailingSlash: "never",

  vite: {
    plugins: [tailwindcss()]
  }
});