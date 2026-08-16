# CRFT Lookup — inbound plan

How to turn Lookup from a popular scanner into a web-dev lead engine.

Lookup already has the traffic. The leak is conversion: **2,729 visitors and ~10k reports / 30 days, 33 people hit `/audit` (2% of scanners).** The job is to turn raw scans into a brief that makes a site owner ask CRFT to fix it.

---

## Diagnosis

### What Lookup is today

A free, unlimited website analysis tool. Four sections on one shareable report:

1. **Overview** — OG image/title/description, thin tech snapshot, Lighthouse score cards
2. **Lighthouse** — full Google PSI viewer, desktop + mobile
3. **Tech stack** — Wappalyzer fingerprints
4. **Sitemap** — visualizes an existing `sitemap.xml` (does not crawl)
5. **Meta tags** — live previews across search, social, messaging (edits are preview-only)

Positioning: BuiltWith + PageSpeed + metatags.io + Octopus.do in one UI. Monetized by selling design/dev, not SaaS seats.

Tagline: *“All the info we look for in websites, consolidated.”*

### Who uses it

Mix of:

- Curious developers scanning Linear / Stripe / Mailchimp
- Real businesses scanning their own sites (Corpay, dental practices, Shopify stores, etc.)

The audit form requires email domain = site domain, so CTAs must target **owners**, not curious devs.

### Conversion path (after 1–4)

Scan → Action Brief (rules, then OpenRouter) → personalized CTA → prefilled `/audit` or email the brief.

CTAs now read findings and split owners from researchers:

- Mobile sticky bar / sidebar: headline + `/audit?url=&notes=` from the brief
- Mid-report card: “I own this site” → audit · “Scan my site” → `/lookup`
- Homepage: Lookup scan form + “Scan your website” hero CTA

### 30-day numbers (PostHog, to 2026-08-16)

| Stage | Volume | Problem |
|---|---|---|
| `/lookup` visit | 3,081 people | Already **47% of the site**. Not on the homepage. |
| Report generated (`report_loaded`) | 1,594 people (52%) | Fine. |
| `/audit` | 33 people (2% of scanners) | Generic “Get Redesign” ignores the findings. |
| `/contact-us` | 17 visitors | Dead end. |

Other notes:

- `/lookup` is the #1 page: 2,729 visitors, 9,065 pageviews, 11.6% bounce
- Homepage is only 375 visitors
- SEO landings already work: sitemap-visualizer (336), wappalyzer-alternative (245), js-framework-detector (238), cdn-detector (189), builtwith-alternative (184)
- Median time from landing → scan: **26 seconds**
- Median time from scan → audit: **2.5 minutes** — they decide on the first screen
- Intelligence layer now ships as an Action Brief under Overview (rules immediately, OpenRouter when `OPENROUTER_API` is set)

### Product gaps that still matter

- Meta editor still has no one-click export of suggested tags
- Unused `LookupEmail.astro` (Parallel employee/email finder) — do **not** ship publicly
- Still badged “New”; fake testimonials commented out; `#randomReport` JS exists but the button is missing
- Brief is not CDN-cached on `url + datetime` yet (generated per view; Telegram notify is session-gated)

---

## What not to do

- **Do not ship `LookupEmail.astro` publicly.** Lead-list building contradicts the “ethical, no data mining” positioning and will not create inbound. Fine as an internal Telegram enrichment later.
- **Do not turn Lookup into a SaaS** (accounts, public API, bulk export, paid plans). Wrong business. The tool stays free; CRFT sells the rebuild.
- **Do not dump each raw section into a model.** Lighthouse JSON is huge. Output will be generic PageSpeed advice.
- **Do not gate the report behind email.** That would kill the 52% scan rate and SEO shareability.
- **Do not crawl a sitemap from scratch.** Expensive; Octopus already does it.
- **Do not add more detector SEO pages first.** Those already work. Conversion is the bottleneck.

---

## Recommended sequence

**1–4 are shipped** (2026-08-16). Remaining work is “Later ideas.”

### 1. Wire the existing funnel — shipped

Highest ROI per hour. Uses data you already have.

- Prefill `/audit?url=` from the scanned URL; pass scores into the notes field
- Rewrite CTAs from “Get Redesign” to the actual problem: *“Mobile performance is 34. Get a free hero redesign.”*
- Split CTAs:
  - **Own this site** → audit
  - **Just researching** → “Scan your own site”
- Put Lookup on the homepage (it already out-traffics `/` 7:1)
- Telegram ping should include hostname + scores + stack, not just the URL, so you can follow up hot scans

### 2. Deterministic findings bar — shipped

A rule engine above the fold. Instant, free, no hallucination.

Examples:

| Signal | Finding | Offer |
|---|---|---|
| Perf < 50 | “Slow on mobile. This is costing you conversions.” | Hero redesign / perf pass |
| WordPress + Elementor + jQuery | “Page-builder stack. Typical rebuild path: Astro/Next.” | Rebuild |
| Missing OG title/image | “Links look broken in Slack/iMessage.” | Meta + design |
| No sitemap | “Search engines can’t see your IA.” | Marketing-site / SEO |
| Shopify + many apps | “App bloat is a common speed killer.” | Perf / rebuild |

Each finding maps to a CRFT offer. This is the structure the AI will later narrate — ship it first.

### 3. OpenRouter “Action Brief” — shipped

Interpret each section into prioritized, owner-facing actions. Do not send the full report to the model.

#### Architecture

- New `GET/POST /api/lookup/brief` after Lighthouse + Wappalyzer resolve
- Send a **compact packet**, not the full report:

```ts
{
  url, hostname,
  scores: { desktop, mobile },          // 4 categories each
  topFailedAudits: [{ id, title, savings }], // top 5 only
  stack: [{ name, category }],          // CMS, framework, CDN, analytics
  meta: { hasTitle, hasDesc, hasOgImage, title, description },
  sitemap: { urlCount, hasSitemap }
}
```

- OpenRouter with a cheap structured-output model (Gemini Flash / GPT-4o-mini / Claude Haiku)
- Cache on `url + datetime` like the rest of the report
- Cost: ~$10–40/mo at current volume if every report; less if click-to-generate
- JSON schema out, not free prose:

```ts
{
  verdict: string,                 // 1 sentence
  ownerLikelihood: "own" | "research" | "unknown",
  projectType: "redesign" | "rebuild" | "perf" | "seo" | "none",
  sections: {
    overview: { summary, actions[] },
    lighthouse: { summary, actions[] },
    stack: { summary, actions[], rebuildAngle? },
    sitemap: { summary, actions[] },
    meta: { summary, suggestedTitle, suggestedDescription }
  },
  cta: { headline, sub, offer }    // drives the sidebar + mid-report card
}
```

#### Per-section interpretation

| Section | AI job | Inbound hook |
|---|---|---|
| Overview | “What this site is, and what’s holding it back.” | Verdict + project type |
| Lighthouse | Top 3 issues in business English, not “reduce unused JS.” | “We’ll fix the hero + cut JS in a rebuild.” |
| Tech stack | What the stack *implies* (legacy WP, Webflow ceiling, app bloat). | Rebuild / migration offer |
| Sitemap | Thin IA, missing money pages, or “no sitemap = SEO hole.” | IA / marketing-site project |
| Meta | Rewrite title + description they can paste. | Instant value; email-gate this |

Render as a new **Action Brief** block pinned under Overview (where the 2.5-min decision happens). Keep the raw Lighthouse viewer below for credibility.

**Prompt stance:** senior CRFT designer-dev. Bias toward “this needs a human rebuild,” never “install this WordPress plugin.” Cite only numbers from the packet.

**Cost / reliability:** generate automatically and cache. Fallback to the rule-based bar if OpenRouter fails. Do not block the existing ~20s report on the LLM.

### 4. Email the brief — shipped

After the brief renders: *“Send this to my inbox.”* Work email only.

- Resend / Plunk / Postmark with the verdict, 5 actions, suggested meta, and a one-click `/audit?url=` button
- Curious Linear-scanners still get value; owners become a follow-up list
- Do **not** gate the report itself

---

## Later ideas (after 1–4)

### Worth it

- **Compare mode** (`yours` vs `competitor`) — agencies share it; owners feel the gap
- **Homepage screenshot strip** — visual design critique is the CRFT-native wedge Lighthouse can’t do. Pair with the free hero audit
- **Stack-specific offer pages** the brief links to (“You’re on Webflow — what we usually replace”)
- **Re-scan reminder** 30 days later if they gave email: “Your mobile score dropped 12 points”
- **Suggested meta export** — one-click copy of the AI title/description (brief already displays them)
- **Hot-scan queue** — Telegram now includes scores/stack/verdict; still no filtered inbox for owner-likely + low scores

### Maybe later

- Agency white-label / iframe embed (already have iframe copy) with CRFT branding on every shared report
- Stronger “scan your own site” after a curiosity scan (mid-report card already splits this)
- Visual/design score from a screenshot (above-the-fold critique)
- History / re-scan UX beyond the datetime cache key
- Industry landing pages in the footer (SaaS / eCommerce — currently commented out)

### Skip / defer

- Public API, bulk export, accounts
- Employee/email finder
- Crawling pages to *create* a sitemap
- Local / intranet / password-protected scans
- More “Wow so cool!” testimonials

---

## Success metrics

- `report_loaded` → `/audit` from 2% → 5%+ (≈80 audits/month at current volume)
- Email captures per 100 reports
- Audit form submits with a prefilled Lookup URL (new event)
- Telegram: count of “hot” scans (owner-likely + low scores) that get a personal reply

Track in PostHog. Existing event: `report_loaded`. Add events for brief generated, email captured, audit CTA clicked, audit submitted with Lookup URL.

---

## What shipped

- `ActionBrief` under Overview: rule findings first, OpenRouter brief when `OPENROUTER_API` is set
- Section notes under Lighthouse / Tech / Sitemap / Meta; generic copy lives in FAQ accordions
- Personalized CTAs + `/audit?url=&notes=` prefill
- Homepage scan form (`LookupScanForm`)
- `POST /api/lookup/brief` + `POST /api/lookup/email-brief` (Resend)
- Telegram payload moved to the brief API (URL, verdict, scores, stack, project type)
- PostHog: `brief_loaded`, `brief_email_sent`, `audit_cta_clicked`

Needs `OPENROUTER_API` in env for the AI layer. Without it, the rule brief still renders.

---

## Key files

**Product / report**

- `src/pages/lookup/index.astro` — landing + live report (canonical)
- `src/pages/lookup/report.astro` — leftover duplicate

**APIs**

- `src/pages/api/lookup/lighthouse.ts`
- `src/pages/api/lookup/wappalyzer.ts`
- `src/pages/api/lookup/sitemap.ts`
- `src/pages/api/lookup/brief.ts`
- `src/pages/api/lookup/email-brief.ts`

**Libs**

- `src/lib/lookup/api.ts`
- `src/lib/lookup/client.ts`
- `src/lib/lookup/brief.ts`
- `src/lib/lookup/openrouter.ts`
- `src/lib/lookup/telegram.ts`
- `src/lib/lookup/lighthouse.ts`
- `src/lib/lookup/wappalyzer.ts`
- `src/lib/lookup/sitemap.ts`
- `src/lib/lookup/parse-url.ts`

**Result UI**

- `src/components/ActionBrief.tsx`
- `src/components/LookupScanForm.astro`
- `src/components/Lighthouse.astro`
- `src/components/Wappalyzer.astro`
- `src/components/Sitemap.astro`
- `src/components/sitemap/*`

**Unused / do not ship as-is**

- `src/components/LookupEmail.astro` — Parallel employee/email research
- `src/components/LookupNav.astro` — imported, never rendered

**Conversion destination**

- `src/pages/audit/index.astro` — hero redesign form (email domain must match site)
- `src/pages/process-audit-request.astro`
