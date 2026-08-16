import type { APIRoute } from "astro";
import { json, lookupTarget } from "../../../lib/lookup/api";
import { fetchLighthouseReports } from "../../../lib/lookup/lighthouse";

export const prerender = false;
export const maxDuration = 60;

export const GET: APIRoute = async (context) => {
  const target = lookupTarget(context);
  if (!target) return json({ error: "Invalid URL" }, { status: 400 });

  try {
    const reports = await fetchLighthouseReports(target);
    if (!reports.desktop && !reports.mobile) {
      return json({ error: "Failed to fetch Lighthouse reports", ...reports }, { status: 502 });
    }
    return json(reports);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch Lighthouse reports";
    return json({ error: message }, { status: 502 });
  }
};
