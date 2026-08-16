export type CategoryScores = {
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
};

export type FailedAudit = {
  id: string;
  title: string;
  savings?: string;
};

export type StackItem = {
  name: string;
  category: string;
};

export type BriefPacket = {
  url: string;
  hostname: string;
  scores: {
    desktop: CategoryScores | null;
    mobile: CategoryScores | null;
  };
  topFailedAudits: FailedAudit[];
  stack: StackItem[];
  meta: {
    hasTitle: boolean;
    hasDesc: boolean;
    hasOgImage: boolean;
    title: string;
    description: string;
  };
  sitemap: {
    urlCount: number;
    hasSitemap: boolean;
  };
};

export type Finding = {
  id: string;
  severity: "high" | "medium";
  title: string;
  detail: string;
  offer: "redesign" | "rebuild" | "perf" | "seo";
};

export type ProjectType = "redesign" | "rebuild" | "perf" | "seo" | "none";

export type BriefCta = {
  headline: string;
  sub: string;
  offer: Exclude<ProjectType, "none">;
};

export type SectionNote = {
  summary: string;
  actions: string[];
  rebuildAngle?: string;
  suggestedTitle?: string;
  suggestedDescription?: string;
};

export type ActionBrief = {
  verdict: string;
  ownerLikelihood: "own" | "research" | "unknown";
  projectType: ProjectType;
  sections: {
    overview: SectionNote;
    lighthouse: SectionNote;
    stack: SectionNote;
    sitemap: SectionNote;
    meta: SectionNote;
  };
  cta: BriefCta;
  source: "ai" | "rules";
};

const WELL_KNOWN =
  /^(www\.)?(linear\.app|stripe\.com|github\.com|google\.com|apple\.com|facebook\.com|instagram\.com|twitter\.com|x\.com|linkedin\.com|amazon\.com|microsoft\.com|netflix\.com|airbnb\.com|figma\.com|notion\.so|basecamp\.com|posthog\.com|tailwindcss\.com|shopify\.com|vercel\.com|openai\.com|crft\.studio)$/i;

function scoreOf(report: any, key: string): number | null {
  const value = report?.categories?.[key]?.score;
  if (typeof value !== "number") return null;
  return Math.round(value * 100);
}

export function extractScores(report: any): CategoryScores | null {
  if (!report?.categories) return null;
  return {
    performance: scoreOf(report, "performance"),
    accessibility: scoreOf(report, "accessibility"),
    bestPractices: scoreOf(report, "best-practices"),
    seo: scoreOf(report, "seo"),
  };
}

export function extractFailedAudits(report: any, limit = 5): FailedAudit[] {
  const refs = report?.categories?.performance?.auditRefs ?? [];
  const audits = report?.audits ?? {};
  const items: FailedAudit[] = [];

  for (const ref of refs) {
    const audit = audits[ref.id];
    if (!audit || audit.score === null || audit.score === undefined || audit.score >= 0.9) continue;
    items.push({
      id: ref.id,
      title: audit.title,
      savings: typeof audit.displayValue === "string" ? audit.displayValue : undefined,
    });
    if (items.length >= limit) break;
  }

  return items;
}

export function flattenStack(techByCategory: Record<string, { name: string }[]> | null | undefined): StackItem[] {
  if (!techByCategory) return [];
  return Object.entries(techByCategory).flatMap(([category, techs]) =>
    (techs || []).map((tech) => ({ name: tech.name, category }))
  );
}

export function isWellKnownHost(hostname: string) {
  return WELL_KNOWN.test(hostname);
}

export function buildFindings(packet: BriefPacket): Finding[] {
  const findings: Finding[] = [];
  const mobile = packet.scores.mobile;
  const desktop = packet.scores.desktop;
  const names = packet.stack.map((item) => item.name.toLowerCase());
  const hasWordpress = names.includes("wordpress");
  const hasElementor = names.includes("elementor");
  const hasWebflow = names.includes("webflow");
  const hasShopify = names.includes("shopify");
  const pageBuilders = packet.stack.filter((item) => /page builder/i.test(item.category));
  const shopifyApps = packet.stack.filter((item) => /shopify app/i.test(item.category));

  if (mobile?.performance != null && mobile.performance < 50) {
    findings.push({
      id: "slow-mobile",
      severity: "high",
      title: `Slow on mobile (${mobile.performance})`,
      detail: "This is costing you conversions.",
      offer: "perf",
    });
  } else if (mobile?.performance != null && mobile.performance < 90) {
    findings.push({
      id: "mid-mobile",
      severity: "medium",
      title: `Mobile performance is ${mobile.performance}`,
      detail: "Visitors on phones are getting a weaker first impression.",
      offer: "perf",
    });
  }

  if (desktop?.performance != null && desktop.performance < 50) {
    findings.push({
      id: "slow-desktop",
      severity: "high",
      title: `Slow on desktop (${desktop.performance})`,
      detail: "The homepage is heavier than it needs to be.",
      offer: "perf",
    });
  }

  if ((hasWordpress && (hasElementor || pageBuilders.length > 0)) || hasWebflow) {
    findings.push({
      id: "page-builder",
      severity: "high",
      title: hasWebflow ? "Webflow ceiling" : "Page-builder stack",
      detail: "Typical rebuild path: Astro or Next, with a real CMS.",
      offer: "rebuild",
    });
  }

  if (hasShopify && shopifyApps.length >= 5) {
    findings.push({
      id: "shopify-bloat",
      severity: "medium",
      title: `${shopifyApps.length} Shopify apps detected`,
      detail: "App bloat is a common speed killer on storefronts.",
      offer: "perf",
    });
  }

  if (!packet.meta.hasOgImage) {
    findings.push({
      id: "missing-og",
      severity: "medium",
      title: "Missing Open Graph image",
      detail: "Links look unfinished in Slack, iMessage, and LinkedIn.",
      offer: "seo",
    });
  }

  if (!packet.meta.hasTitle || !packet.meta.hasDesc) {
    findings.push({
      id: "missing-meta",
      severity: "high",
      title: !packet.meta.hasTitle ? "Missing meta title" : "Missing meta description",
      detail: "Search and social previews have nothing to work with.",
      offer: "seo",
    });
  }

  if (!packet.sitemap.hasSitemap) {
    findings.push({
      id: "no-sitemap",
      severity: "medium",
      title: "No sitemap found",
      detail: "Search engines have to guess your information architecture.",
      offer: "seo",
    });
  }

  if (mobile?.accessibility != null && mobile.accessibility < 80) {
    findings.push({
      id: "a11y",
      severity: "medium",
      title: `Accessibility is ${mobile.accessibility}`,
      detail: "This usually means contrast, tap targets, or missing labels.",
      offer: "redesign",
    });
  }

  if (mobile?.seo != null && mobile.seo < 80) {
    findings.push({
      id: "seo",
      severity: "medium",
      title: `SEO score is ${mobile.seo}`,
      detail: "Basic on-page signals are leaving rankings on the table.",
      offer: "seo",
    });
  }

  return findings.slice(0, 5);
}

export function pickProjectType(findings: Finding[]): ProjectType {
  if (findings.some((finding) => finding.offer === "rebuild")) return "rebuild";
  if (findings.some((finding) => finding.id === "slow-mobile" || finding.id === "slow-desktop")) return "perf";
  if (findings.some((finding) => finding.offer === "redesign")) return "redesign";
  if (findings.some((finding) => finding.offer === "seo")) return "seo";
  return "none";
}

export function buildAuditNotes(packet: BriefPacket, findings: Finding[], verdict?: string) {
  return [
    `CRFT Lookup: ${packet.hostname}`,
    verdict,
    packet.scores.mobile?.performance != null ? `Mobile performance: ${packet.scores.mobile.performance}` : "",
    packet.scores.desktop?.performance != null ? `Desktop performance: ${packet.scores.desktop.performance}` : "",
    packet.stack.length ? `Stack: ${packet.stack.slice(0, 10).map((item) => item.name).join(", ")}` : "",
    findings.length ? `Findings: ${findings.map((finding) => finding.title).join("; ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildAuditHref(packet: BriefPacket, findings: Finding[], verdict?: string) {
  const params = new URLSearchParams({
    url: packet.url,
    notes: buildAuditNotes(packet, findings, verdict),
  });
  return `/audit?${params}`;
}

export function buildCta(packet: BriefPacket, findings: Finding[], aiCta?: BriefCta | null): BriefCta {
  if (aiCta?.headline && aiCta.sub && aiCta.offer) return aiCta;

  const projectType = pickProjectType(findings);
  const offer = projectType === "none" ? "redesign" : projectType;
  const mobilePerf = packet.scores.mobile?.performance;
  const research = isWellKnownHost(packet.hostname);

  if (research) {
    return {
      headline: "Want a site that performs like this — or better?",
      sub: "Scan your own website, or get a free hero redesign from CRFT.",
      offer,
    };
  }

  if (mobilePerf != null && mobilePerf < 50) {
    return {
      headline: `Mobile performance is ${mobilePerf}. Get a free hero redesign.`,
      sub: `See what a faster ${packet.hostname} could do for conversions.`,
      offer,
    };
  }

  if (offer === "rebuild") {
    return {
      headline: `This stack is holding ${packet.hostname} back.`,
      sub: "We'll map a rebuild path and start with a free hero redesign.",
      offer,
    };
  }

  if (offer === "seo") {
    return {
      headline: `${packet.hostname} is leaving search and social clicks on the table.`,
      sub: "Start with a free hero redesign and we'll fix the first impression.",
      offer,
    };
  }

  return {
    headline: `Fix what's holding ${packet.hostname} back.`,
    sub: "See what a redesigned, lightning-fast website can do for your business.",
    offer,
  };
}

function lighthouseNote(packet: BriefPacket, topFinding?: Finding) {
  const mobile = packet.scores.mobile?.performance;
  const desktop = packet.scores.desktop?.performance;
  const topIsMobilePerf = topFinding?.id === "slow-mobile" || topFinding?.id === "mid-mobile";
  const parts: string[] = [];

  if (mobile != null && !topIsMobilePerf) {
    parts.push(`Mobile performance is ${mobile}`);
  }
  if (desktop != null && !(topIsMobilePerf && desktop === mobile)) {
    parts.push(`Desktop is ${desktop}`);
  }
  const audits = packet.topFailedAudits.slice(0, 2).map((audit) => audit.title);
  if (audits.length) {
    parts.push(`Top opportunities: ${audits.join("; ")}`);
  }

  return parts.join(". ") + (parts.length ? "." : "");
}

export function buildRuleBrief(packet: BriefPacket, findings: Finding[]): ActionBrief {
  const projectType = pickProjectType(findings);
  const stackNames = packet.stack.slice(0, 8).map((item) => item.name).join(", ");
  const topFinding = findings[0];

  return {
    verdict: topFinding
      ? `${topFinding.title}. ${topFinding.detail}`
      : `${packet.hostname} looks generally healthy — the first impression can still be sharper.`,
    ownerLikelihood: isWellKnownHost(packet.hostname) ? "research" : "unknown",
    projectType,
    sections: {
      overview: {
        summary: topFinding?.detail || "No critical issues jumped out of this scan.",
        actions: [],
      },
      lighthouse: {
        summary: lighthouseNote(packet, topFinding),
        actions: packet.topFailedAudits.slice(0, 3).map((audit) =>
          audit.savings ? `${audit.title} (${audit.savings})` : audit.title
        ),
      },
      stack: {
        summary: stackNames ? `Detected ${stackNames}.` : "No major technologies were detected.",
        actions: findings.filter((finding) => finding.offer === "rebuild").map((finding) => finding.detail),
        rebuildAngle: findings.find((finding) => finding.id === "page-builder")?.detail,
      },
      sitemap: {
        summary: packet.sitemap.hasSitemap
          ? `Found a sitemap with ${packet.sitemap.urlCount} URLs.`
          : "No public sitemap was found.",
        actions: packet.sitemap.hasSitemap ? [] : ["Add a sitemap so search engines can see the full IA."],
      },
      meta: {
        summary: packet.meta.hasTitle && packet.meta.hasDesc && packet.meta.hasOgImage
          ? "Title, description, and Open Graph image are present."
          : "Meta tags are incomplete — previews will look unfinished when shared.",
        actions: [
          !packet.meta.hasTitle ? "Add a unique meta title under 60 characters." : "",
          !packet.meta.hasDesc ? "Add a meta description under 155 characters." : "",
          !packet.meta.hasOgImage ? "Add a 1.91:1 Open Graph image." : "",
        ].filter(Boolean),
        suggestedTitle: packet.meta.title,
        suggestedDescription: packet.meta.description,
      },
    },
    cta: buildCta(packet, findings),
    source: "rules",
  };
}

export function isBriefPacket(value: unknown): value is BriefPacket {
  if (!value || typeof value !== "object") return false;
  const packet = value as BriefPacket;
  return typeof packet.url === "string" && typeof packet.hostname === "string" && !!packet.scores && !!packet.meta && !!packet.sitemap;
}

export function sanitizeBrief(raw: any, packet: BriefPacket, findings: Finding[]): ActionBrief {
  const fallback = buildRuleBrief(packet, findings);
  if (!raw || typeof raw !== "object") return fallback;

  const projectTypes: ProjectType[] = ["redesign", "rebuild", "perf", "seo", "none"];
  const offers: BriefCta["offer"][] = ["redesign", "rebuild", "perf", "seo"];
  const section = (key: keyof ActionBrief["sections"]): SectionNote => {
    const incoming = raw.sections?.[key];
    const base = fallback.sections[key];
    if (!incoming || typeof incoming !== "object") return base;
    return {
      summary: typeof incoming.summary === "string" && incoming.summary ? incoming.summary : base.summary,
      actions: Array.isArray(incoming.actions)
        ? incoming.actions.filter((item: unknown) => typeof item === "string").slice(0, 3)
        : base.actions,
      rebuildAngle: typeof incoming.rebuildAngle === "string" ? incoming.rebuildAngle : base.rebuildAngle,
      suggestedTitle: typeof incoming.suggestedTitle === "string" ? incoming.suggestedTitle.slice(0, 70) : base.suggestedTitle,
      suggestedDescription:
        typeof incoming.suggestedDescription === "string" ? incoming.suggestedDescription.slice(0, 180) : base.suggestedDescription,
    };
  };

  return {
    verdict: typeof raw.verdict === "string" && raw.verdict ? raw.verdict : fallback.verdict,
    ownerLikelihood: ["own", "research", "unknown"].includes(raw.ownerLikelihood) ? raw.ownerLikelihood : fallback.ownerLikelihood,
    projectType: projectTypes.includes(raw.projectType) ? raw.projectType : fallback.projectType,
    sections: {
      overview: section("overview"),
      lighthouse: section("lighthouse"),
      stack: section("stack"),
      sitemap: section("sitemap"),
      meta: section("meta"),
    },
    cta: buildCta(packet, findings, {
      headline: typeof raw.cta?.headline === "string" ? raw.cta.headline : "",
      sub: typeof raw.cta?.sub === "string" ? raw.cta.sub : "",
      offer: offers.includes(raw.cta?.offer) ? raw.cta.offer : fallback.cta.offer,
    }),
    source: "ai",
  };
}
