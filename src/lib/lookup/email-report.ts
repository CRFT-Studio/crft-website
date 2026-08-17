export type EmailReportScores = {
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
};

export type EmailReportPayload = {
  hostname: string;
  pageUrl: string;
  reportUrl: string;
  auditUrl: string;
  contactUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  hasTitle: boolean;
  hasDesc: boolean;
  hasOgImage: boolean;
  stack: { name: string; category: string }[];
  sitemap: { urlCount: number; hasSitemap: boolean };
  scores: {
    desktop: EmailReportScores | null;
    mobile: EmailReportScores | null;
  };
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function scoreColor(score: number | null) {
  if (score == null) return "#a3a3a3";
  if (score >= 90) return "#4ade80";
  if (score >= 50) return "#facc15";
  return "#f87171";
}

function scoreCell(label: string, score: number | null) {
  const color = scoreColor(score);
  const value = score == null ? "–" : String(score);
  return `<td style="width:25%;padding:4px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #525252;background:#262626;">
      <tr><td style="background:#404040;color:#e5e5e5;font-size:11px;line-height:1.2;text-align:center;padding:6px 4px;">${escapeHtml(label)}</td></tr>
      <tr><td style="color:${color};font-size:28px;font-weight:600;text-align:center;padding:10px 4px;line-height:1;">${value}</td></tr>
    </table>
  </td>`;
}

function scoreBlock(title: string, scores: EmailReportScores | null) {
  if (!scores) {
    return `<p style="margin:0 0 12px;color:#a3a3a3;font-size:14px;">${escapeHtml(title)}: scores unavailable</p>`;
  }
  return `
    <p style="margin:0 0 8px;color:#d4d4d4;font-size:13px;font-weight:600;letter-spacing:0.02em;">${escapeHtml(title)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
      <tr>
        ${scoreCell("Performance", scores.performance)}
        ${scoreCell("Accessibility", scores.accessibility)}
        ${scoreCell("Best Practices", scores.bestPractices)}
        ${scoreCell("SEO", scores.seo)}
      </tr>
    </table>`;
}

function stackHtml(stack: EmailReportPayload["stack"]) {
  if (!stack.length) {
    return `<p style="margin:0;color:#a3a3a3;font-size:14px;">No major technologies detected.</p>`;
  }

  const byCategory = new Map<string, string[]>();
  for (const item of stack.slice(0, 24)) {
    const list = byCategory.get(item.category) || [];
    list.push(item.name);
    byCategory.set(item.category, list);
  }

  const rows = [...byCategory.entries()]
    .slice(0, 6)
    .map(
      ([category, names]) => `
      <tr>
        <td style="padding:0 0 10px;vertical-align:top;width:120px;color:#a3a3a3;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(category)}</td>
        <td style="padding:0 0 10px;color:#e5e5e5;font-size:14px;line-height:1.45;">${escapeHtml(names.join(", "))}</td>
      </tr>`
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;
}

function metaStatus(payload: EmailReportPayload) {
  const bits = [
    payload.hasTitle ? "Title" : null,
    payload.hasDesc ? "Description" : null,
    payload.hasOgImage ? "OG image" : null,
  ].filter(Boolean);
  const missing = [
    payload.hasTitle ? null : "title",
    payload.hasDesc ? null : "description",
    payload.hasOgImage ? null : "OG image",
  ].filter(Boolean);

  if (!missing.length) return "Title, description, and Open Graph image are present.";
  if (bits.length) return `Present: ${bits.join(", ")}. Missing: ${missing.join(", ")}.`;
  return `Missing: ${missing.join(", ")}.`;
}

function button(href: string, label: string, primary = false) {
  const bg = primary ? "#ea580c" : "#262626";
  const border = primary ? "#ea580c" : "#525252";
  const color = primary ? "#fff7ed" : "#e5e5e5";
  return `<a href="${escapeHtml(href)}" style="display:inline-block;background:${bg};border:1px solid ${border};color:${color};text-decoration:none;font-size:14px;font-weight:600;padding:12px 16px;margin:0 8px 8px 0;">${escapeHtml(label)}</a>`;
}

export function buildLookupEmailHtml(payload: EmailReportPayload) {
  const title = payload.ogTitle || payload.hostname;
  const description = payload.ogDescription || "CRFT Lookup overview for this site.";
  const imageBlock = payload.hasOgImage && payload.ogImageUrl
    ? `<img src="${escapeHtml(payload.ogImageUrl)}" alt="${escapeHtml(title)}" width="552" style="display:block;width:100%;max-width:552px;height:auto;border:0;border-bottom:1px solid #404040;" />`
    : `<div style="padding:48px 24px;text-align:center;color:#f87171;font-size:14px;border-bottom:1px solid #404040;">No Open Graph image set</div>`;

  const sitemapLine = payload.sitemap.hasSitemap
    ? `Sitemap found with ${payload.sitemap.urlCount} URLs.`
    : "No public sitemap found.";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CRFT Lookup · ${escapeHtml(payload.hostname)}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#e5e5e5;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#171717;border:1px solid #404040;">
          <tr>
            <td style="padding:20px 24px;border-bottom:1px solid #404040;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <a href="https://www.crft.studio" style="text-decoration:none;">
                      <img src="https://www.crft.studio/brand/CRFT%20logo%20-%20white.png" alt="CRFT" width="96" height="auto" style="display:block;width:96px;height:auto;border:0;" />
                    </a>
                  </td>
                  <td align="right" style="vertical-align:middle;color:#a3a3a3;font-size:13px;">${escapeHtml(payload.hostname)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              ${imageBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <h1 style="margin:0 0 8px;color:#fafafa;font-size:24px;line-height:1.25;font-weight:600;">${escapeHtml(title)}</h1>
              <p style="margin:0 0 20px;color:#d4d4d4;font-size:16px;line-height:1.5;">${escapeHtml(description)}</p>
              <p style="margin:0 0 4px;color:#a3a3a3;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">Scanned URL</p>
              <p style="margin:0 0 24px;"><a href="${escapeHtml(payload.pageUrl)}" style="color:#fdba74;font-size:14px;word-break:break-all;text-decoration:none;">${escapeHtml(payload.pageUrl)}</a></p>

              <p style="margin:0 0 12px;color:#fafafa;font-size:16px;font-weight:600;">Lighthouse</p>
              ${scoreBlock("Desktop", payload.scores.desktop)}
              ${scoreBlock("Mobile", payload.scores.mobile)}

              <p style="margin:8px 0 12px;color:#fafafa;font-size:16px;font-weight:600;">Tech stack</p>
              <div style="margin:0 0 20px;padding:14px;border:1px solid #404040;background:#262626;">
                ${stackHtml(payload.stack)}
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="width:50%;padding:0 6px 0 0;vertical-align:top;">
                    <div style="border:1px solid #404040;background:#262626;padding:14px;">
                      <p style="margin:0 0 6px;color:#a3a3a3;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">Sitemap</p>
                      <p style="margin:0;color:#e5e5e5;font-size:14px;line-height:1.4;">${escapeHtml(sitemapLine)}</p>
                    </div>
                  </td>
                  <td style="width:50%;padding:0 0 0 6px;vertical-align:top;">
                    <div style="border:1px solid #404040;background:#262626;padding:14px;">
                      <p style="margin:0 0 6px;color:#a3a3a3;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">Meta</p>
                      <p style="margin:0;color:#e5e5e5;font-size:14px;line-height:1.4;">${escapeHtml(metaStatus(payload))}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px;color:#fafafa;font-size:16px;font-weight:600;">Next steps</p>
              <div style="margin:0 0 8px;">
                ${button(payload.reportUrl, "Open full report", true)}
                ${button(payload.auditUrl, "Get a free redesign")}
                ${button(payload.contactUrl, "Contact us")}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 24px;border-top:1px solid #404040;color:#737373;font-size:12px;line-height:1.5;">
              Sent by <a href="https://www.crft.studio" style="color:#a3a3a3;text-decoration:none;">CRFT Studio</a> · Lookup report for ${escapeHtml(payload.hostname)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function sampleEmailReportPayload(origin = "https://www.crft.studio"): EmailReportPayload {
  return {
    hostname: "tailwindcss.com",
    pageUrl: "https://tailwindcss.com",
    reportUrl: `${origin}/lookup?url=https%3A%2F%2Ftailwindcss.com`,
    auditUrl: `${origin}/audit?url=https%3A%2F%2Ftailwindcss.com`,
    contactUrl: `${origin}/contact-us`,
    ogTitle: "Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.",
    ogDescription: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    ogImageUrl: `${origin}/lookup-open-graph.png`,
    hasTitle: true,
    hasDesc: true,
    hasOgImage: true,
    stack: [
      { name: "Next.js", category: "Web frameworks" },
      { name: "React", category: "JavaScript frameworks" },
      { name: "Tailwind CSS", category: "UI frameworks" },
      { name: "Vercel", category: "PaaS" },
      { name: "Google Analytics", category: "Analytics" },
    ],
    sitemap: { urlCount: 128, hasSitemap: true },
    scores: {
      desktop: { performance: 92, accessibility: 96, bestPractices: 100, seo: 100 },
      mobile: { performance: 78, accessibility: 96, bestPractices: 100, seo: 100 },
    },
  };
}
