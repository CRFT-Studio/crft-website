import type { APIContext } from "astro";
import { parseLookupUrl } from "./parse-url";

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=2592000, stale-while-revalidate=86400",
  "Vercel-CDN-Cache-Control": "max-age=2592000",
};

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-cache, no-store, must-revalidate",
};

export function json(data: unknown, init: { status?: number; cache?: boolean } = {}) {
  const { status = 200, cache = status === 200 } = init;
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...(cache ? CACHE_HEADERS : NO_CACHE_HEADERS),
    },
  });
}

export function lookupTarget(context: APIContext) {
  const target = parseLookupUrl(context.url.searchParams.get("url"));
  if (!target) return null;
  return target.origin + target.pathname;
}
