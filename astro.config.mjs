import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

import robotsTxt from "astro-robots-txt";

import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.crft.studio',
  integrations: [sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/proposal') && !new URL(page).pathname.startsWith('/audit/requests') && !new URL(page).pathname.startsWith('/lookup'),
  }), mdx(), robotsTxt(), react()],
  output: "static",
  adapter: vercel(),
  trailingSlash: "never",
  redirects: {
    '/lookup': 'https://crftlookup.com',
    '/lookup/report': 'https://crftlookup.com/dashboard/report',
    ...Object.fromEntries([
      'technology-detection',
      'lighthouse',
      'sitemap-visualizer',
      'meta-tag-previewer',
    ].map((page) => [`/lookup/${page}`, `https://crftlookup.com/features/${page}`])),
    '/lookup/alternatives': 'https://crftlookup.com/alternatives',
    ...Object.fromEntries([
      'builtwith',
      'ful',
      'gtmetrix',
      'metatagsio',
      'octopus',
      'pagespeed',
      'pingdom',
      'stackcrawler',
      'wappalyzer',
    ].map((name) => [`/lookup/${name}-alternative`, `https://crftlookup.com/alternatives/${name}-alternative`])),
    ...Object.fromEntries([
      'analytics-detector',
      'cdn-detector',
      'cms-detector',
      'email-marketing-detector',
      'js-framework-detector',
      'shopify-app-detector',
      'wp-plugin-detector',
    ].map((page) => [`/lookup/use-cases/${page}`, `https://crftlookup.com/use-cases/${page}`])),
    // Gallery URLs retain their /lookup prefix on the new site.
    '/lookup/gallery': 'https://crftlookup.com/lookup/gallery',
    ...Object.fromEntries([
      'airbnb',
      'apple',
      'basecamp',
      'brittany-chiang',
      'cluely',
      'figma',
      'helium',
      'incident',
      'linear',
      'notion',
      'opal-camera',
      'posthog',
      'shopify',
      'sketch',
      'stripe',
      'tailwind-css',
      'uber',
    ].map((page) => [`/lookup/gallery/${page}`, `https://crftlookup.com/lookup/gallery/${page}`])),
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
