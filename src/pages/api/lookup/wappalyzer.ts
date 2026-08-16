import type { APIRoute } from "astro";
import { json, lookupTarget } from "../../../lib/lookup/api";
import { fetchWappalyzer } from "../../../lib/lookup/wappalyzer";

export const prerender = false;
export const maxDuration = 60;

export const GET: APIRoute = async (context) => {
  const target = lookupTarget(context);
  if (!target) return json({ error: "Invalid URL" }, { status: 400 });

  try {
    const techByCategory = await fetchWappalyzer(target);
    return json({ techByCategory });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch tech stack";
    return json({ error: message }, { status: 502 });
  }
};
