import type { APIRoute } from "astro";
import { json } from "../../../lib/lookup/api";
import {
  buildFindings,
  buildRuleBrief,
  isBriefPacket,
  sanitizeBrief,
} from "../../../lib/lookup/brief";
import { completeJson } from "../../../lib/lookup/openrouter";
import { notifyTelegram } from "../../../lib/lookup/telegram";

export const prerender = false;
export const maxDuration = 30;

function briefPrompt(packet: ReturnType<typeof Object> & Record<string, unknown>) {
  return `Turn this CRFT Lookup scan into an action brief for the site owner.

Return JSON with this shape:
{
  "verdict": "one sentence",
  "ownerLikelihood": "own" | "research" | "unknown",
  "projectType": "redesign" | "rebuild" | "perf" | "seo" | "none",
  "sections": {
    "overview": { "summary": "string", "actions": ["string"] },
    "lighthouse": { "summary": "string", "actions": ["string"] },
    "stack": { "summary": "string", "actions": ["string"], "rebuildAngle": "string" },
    "sitemap": { "summary": "string", "actions": ["string"] },
    "meta": { "summary": "string", "suggestedTitle": "string", "suggestedDescription": "string" }
  },
  "cta": { "headline": "string", "sub": "string", "offer": "redesign" | "rebuild" | "perf" | "seo" }
}

Rules:
- Business English, not Lighthouse jargon
- Max 3 actions per section
- suggestedTitle <= 60 chars, suggestedDescription <= 155
- Bias toward a human rebuild when the stack is a page builder or scores are poor
- If the host is a famous site, ownerLikelihood should be "research"

Scan packet:
${JSON.stringify(packet)}`;
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400, cache: false });
  }

  const packet = (body as { packet?: unknown })?.packet ?? body;
  if (!isBriefPacket(packet)) {
    return json({ error: "Invalid brief packet" }, { status: 400, cache: false });
  }

  const notify = Boolean((body as { notify?: boolean })?.notify);
  const findings = buildFindings(packet);
  const fallback = buildRuleBrief(packet, findings);

  const generated = await completeJson(briefPrompt(packet));
  const brief = generated ? sanitizeBrief(generated, packet, findings) : fallback;

  if (notify) {
    const mobile = packet.scores.mobile;
    const desktop = packet.scores.desktop;
    const stack = packet.stack.slice(0, 8).map((item) => item.name).join(", ");
    await notifyTelegram(
      [
        packet.url,
        brief.verdict,
        `Mobile ${mobile?.performance ?? "–"} / Desktop ${desktop?.performance ?? "–"}`,
        stack ? `Stack: ${stack}` : "",
        `Type: ${brief.projectType}`,
      ]
        .filter(Boolean)
        .join("\n")
    );
  }

  return json({ brief, findings }, { cache: false });
};
