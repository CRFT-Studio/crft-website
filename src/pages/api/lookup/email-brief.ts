import type { APIRoute } from "astro";
import { Resend } from "resend";
import { json } from "../../../lib/lookup/api";
import { parseLookupUrl } from "../../../lib/lookup/parse-url";

export const prerender = false;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400, cache: false });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const url = parseLookupUrl(body.url);
  const hostname = typeof body.hostname === "string" ? body.hostname : url?.hostname || "";
  const verdict = typeof body.verdict === "string" ? body.verdict : "";
  const actions = Array.isArray(body.actions) ? body.actions.filter((item: unknown) => typeof item === "string").slice(0, 6) : [];
  const suggestedTitle = typeof body.suggestedTitle === "string" ? body.suggestedTitle : "";
  const suggestedDescription = typeof body.suggestedDescription === "string" ? body.suggestedDescription : "";
  const reportUrl = typeof body.reportUrl === "string" ? body.reportUrl : "";
  const auditUrl = typeof body.auditUrl === "string" ? body.auditUrl : "https://www.crft.studio/audit";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Enter a valid email" }, { status: 400, cache: false });
  }
  if (!url) {
    return json({ error: "Invalid URL" }, { status: 400, cache: false });
  }

  const actionHtml = actions.length
    ? `<ol>${actions.map((action: string) => `<li>${escapeHtml(action)}</li>`).join("")}</ol>`
    : "";
  const metaHtml =
    suggestedTitle || suggestedDescription
      ? `<p><b>Suggested title:</b> ${escapeHtml(suggestedTitle)}<br><b>Suggested description:</b> ${escapeHtml(suggestedDescription)}</p>`
      : "";

  const resend = new Resend(import.meta.env.RESEND_API);
  await resend.batch.send([
    {
      from: "Jeremy from CRFT Studio <audit@crft.studio>",
      to: email,
      cc: "jeremy@crft.studio",
      subject: `Your CRFT Lookup brief for ${hostname}`,
      html: `<p>Here's the action brief for ${escapeHtml(hostname)}.</p>
      <p><b>${escapeHtml(verdict)}</b></p>
      ${actionHtml}
      ${metaHtml}
      <p><a href="${escapeHtml(auditUrl)}">Get a free hero redesign</a>${reportUrl ? ` · <a href="${escapeHtml(reportUrl)}">Open the full report</a>` : ""}</p>
      <p>Jeremy<br>Founder @ CRFT Studio</p>`,
    },
    {
      from: "audit@crft.studio",
      to: "jeremy@crft.studio",
      subject: `Lookup brief emailed: ${hostname}`,
      html: `<p>${escapeHtml(email)} asked for the brief on ${escapeHtml(url.href)}</p>
      <p>${escapeHtml(verdict)}</p>`,
    },
  ]);

  return json({ ok: true }, { cache: false });
};
