import type { APIRoute } from "astro";
import { json, lookupTarget } from "../../../lib/lookup/api";
import { fetchSitemapUrls } from "../../../lib/lookup/sitemap";

export const prerender = false;
export const maxDuration = 60;

export const GET: APIRoute = async (context) => {
  const target = lookupTarget(context);
  if (!target) return json({ error: "Invalid URL" }, { status: 400 });

  try {
    const result = await fetchSitemapUrls(target);
    if (result.error && result.urls.length === 0) {
      return json(result, { status: 502, cache: false });
    }
    return json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch sitemap";
    return json({ urls: [], error: message }, { status: 502 });
  }
};
