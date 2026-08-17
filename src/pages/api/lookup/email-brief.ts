import type { APIRoute } from "astro";
import { Resend } from "resend";
import { json } from "../../../lib/lookup/api";
import { parseLookupUrl } from "../../../lib/lookup/parse-url";
import {
  buildLookupEmailHtml,
  type EmailReportPayload,
  type EmailReportScores,
} from "../../../lib/lookup/email-report";

export const prerender = false;

function asScores(value: unknown): EmailReportScores | null {
  if (!value || typeof value !== "object") return null;
  const scores = value as Record<string, unknown>;
  const num = (key: string) => (typeof scores[key] === "number" ? (scores[key] as number) : null);
  return {
    performance: num("performance"),
    accessibility: num("accessibility"),
    bestPractices: num("bestPractices"),
    seo: num("seo"),
  };
}

function parsePayload(body: any, origin: string): EmailReportPayload | null {
  const url = parseLookupUrl(body.url || body.pageUrl);
  if (!url) return null;

  const hostname =
    typeof body.hostname === "string" && body.hostname
      ? body.hostname
      : url.hostname;

  const stack = Array.isArray(body.stack)
    ? body.stack
        .filter((item: unknown) => item && typeof item === "object")
        .map((item: any) => ({
          name: typeof item.name === "string" ? item.name : "",
          category: typeof item.category === "string" ? item.category : "Other",
        }))
        .filter((item: { name: string }) => item.name)
        .slice(0, 40)
    : [];

  const sitemap =
    body.sitemap && typeof body.sitemap === "object"
      ? {
          urlCount: typeof body.sitemap.urlCount === "number" ? body.sitemap.urlCount : 0,
          hasSitemap: Boolean(body.sitemap.hasSitemap),
        }
      : { urlCount: 0, hasSitemap: false };

  const reportUrl =
    typeof body.reportUrl === "string" && body.reportUrl.startsWith("http")
      ? body.reportUrl
      : `${origin}/lookup?url=${encodeURIComponent(url.href)}`;
  const auditUrl =
    typeof body.auditUrl === "string" && body.auditUrl.startsWith("http")
      ? body.auditUrl
      : `${origin}/audit?url=${encodeURIComponent(url.href)}`;
  const contactUrl =
    typeof body.contactUrl === "string" && body.contactUrl.startsWith("http")
      ? body.contactUrl
      : `${origin}/contact-us`;

  return {
    hostname,
    pageUrl: url.href,
    reportUrl,
    auditUrl,
    contactUrl,
    ogTitle: typeof body.ogTitle === "string" ? body.ogTitle : "",
    ogDescription: typeof body.ogDescription === "string" ? body.ogDescription : "",
    ogImageUrl: typeof body.ogImageUrl === "string" ? body.ogImageUrl : "",
    hasTitle: Boolean(body.hasTitle ?? body.ogTitle),
    hasDesc: Boolean(body.hasDesc ?? body.ogDescription),
    hasOgImage: Boolean(body.hasOgImage ?? body.ogImageUrl),
    stack,
    sitemap,
    scores: {
      desktop: asScores(body.scores?.desktop),
      mobile: asScores(body.scores?.mobile),
    },
  };
}

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400, cache: false });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Enter a valid email" }, { status: 400, cache: false });
  }

  const origin = new URL(request.url).origin;
  const payload = parsePayload(body, origin);
  if (!payload) {
    return json({ error: "Invalid URL" }, { status: 400, cache: false });
  }

  const html = buildLookupEmailHtml(payload);
  const resend = new Resend(import.meta.env.RESEND_API);
  await resend.batch.send([
    {
      from: "Jeremy from CRFT Studio <audit@crft.studio>",
      to: email,
      cc: "jeremy@crft.studio",
      subject: `CRFT Lookup report for ${payload.hostname}`,
      html,
    },
    {
      from: "audit@crft.studio",
      to: "jeremy@crft.studio",
      subject: `Lookup emailed: ${payload.hostname}`,
      html: `<p>${email} requested the lookup email for ${payload.pageUrl}</p>
      <p><a href="${payload.reportUrl}">Open report</a></p>`,
    },
  ]);

  return json({ ok: true }, { cache: false });
};
