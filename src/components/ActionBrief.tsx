import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildAuditHref,
  buildCta,
  buildFindings,
  extractFailedAudits,
  extractScores,
  flattenStack,
  isWellKnownHost,
  type ActionBrief as ActionBriefData,
  type BriefPacket,
  type Finding,
} from "@/lib/lookup/brief";
import { fetchLookupSection } from "@/lib/lookup/client";

type Props = {
  url: string;
  hostname: string;
  hasTitle: boolean;
  hasDesc: boolean;
  hasOgImage: boolean;
  ogTitle: string;
  ogDescription: string;
};

type LighthouseReports = {
  desktop?: unknown;
  mobile?: unknown;
};

function setText(id: string, value: string) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setHref(id: string, value: string) {
  const node = document.getElementById(id);
  if (node instanceof HTMLAnchorElement) node.href = value;
}

function setNote(id: string, summary?: string) {
  const node = document.getElementById(id);
  if (!node) return;
  if (!summary) {
    node.setAttribute("hidden", "");
    return;
  }
  node.textContent = summary;
  node.removeAttribute("hidden");
}

function applyCtas(packet: BriefPacket, findings: Finding[], brief?: ActionBriefData | null) {
  const cta = brief?.cta || buildCta(packet, findings);
  const auditHref = buildAuditHref(packet, findings, brief?.verdict);
  const research = isWellKnownHost(packet.hostname) || brief?.ownerLikelihood === "research";

  setText("sidebar-audit-label", cta.headline);
  setText("owner-card-headline", research ? `Curious about ${packet.hostname}?` : cta.headline);
  setText("owner-card-sub", cta.sub);
  setText("mobile-audit-label", cta.offer === "rebuild" ? "Get a rebuild plan" : "Get Free Design Audit");
  setHref("sidebar-audit-cta", auditHref);
  setHref("owner-card-audit", auditHref);
  setHref("mobile-audit-cta", auditHref);

  if (brief) {
    setNote("lighthouse-note", brief.sections.lighthouse.summary);
    setNote("tech-stack-note", brief.sections.stack.rebuildAngle || brief.sections.stack.summary);
    setNote("sitemap-note", brief.sections.sitemap.summary);
    setNote("meta-tags-note", brief.sections.meta.summary);
  }
}

export default function ActionBrief({
  url,
  hostname,
  hasTitle,
  hasDesc,
  hasOgImage,
  ogTitle,
  ogDescription,
}: Props) {
  const [lighthouse, setLighthouse] = useState<LighthouseReports | null>(null);
  const [stack, setStack] = useState<{ name: string; category: string }[] | null>(null);
  const [sitemap, setSitemap] = useState<{ urlCount: number; hasSitemap: boolean } | null>(null);
  const [brief, setBrief] = useState<ActionBriefData | null>(null);
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const requested = useRef(false);

  const packet = useMemo<BriefPacket | null>(() => {
    if (!lighthouse && !stack && !sitemap) return null;
    return {
      url,
      hostname,
      scores: {
        desktop: extractScores(lighthouse?.desktop),
        mobile: extractScores(lighthouse?.mobile),
      },
      topFailedAudits: extractFailedAudits(lighthouse?.mobile || lighthouse?.desktop),
      stack: stack || [],
      meta: {
        hasTitle,
        hasDesc,
        hasOgImage,
        title: ogTitle || "",
        description: ogDescription || "",
      },
      sitemap: sitemap || { urlCount: 0, hasSitemap: false },
    };
  }, [url, hostname, lighthouse, stack, sitemap, hasTitle, hasDesc, hasOgImage, ogTitle, ogDescription]);

  const findings = useMemo(() => (packet ? buildFindings(packet) : []), [packet]);
  const ready = Boolean(lighthouse && stack && sitemap);

  useEffect(() => {
    const onLighthouse = (event: Event) => {
      setLighthouse((event as CustomEvent<LighthouseReports>).detail || {});
    };
    const onWappalyzer = (event: Event) => {
      setStack(flattenStack((event as CustomEvent<Record<string, { name: string }[]>>).detail));
    };
    const onSitemap = (event: Event) => {
      setSitemap((event as CustomEvent<{ urlCount: number; hasSitemap: boolean }>).detail);
    };

    if (window.__lookupLighthouse) setLighthouse(window.__lookupLighthouse);
    if (window.__lookupWappalyzer) setStack(flattenStack(window.__lookupWappalyzer));
    if (window.__lookupSitemap) setSitemap(window.__lookupSitemap);

    document.addEventListener("lookup:lighthouse", onLighthouse);
    document.addEventListener("lookup:wappalyzer", onWappalyzer);
    document.addEventListener("lookup:sitemap", onSitemap);

    fetchLookupSection<{ urls?: string[]; error?: string | null }>("sitemap", url)
      .then((result) => {
        const count = result.urls?.length || 0;
        setSitemap({ urlCount: count, hasSitemap: count > 0 });
      })
      .catch(() => setSitemap({ urlCount: 0, hasSitemap: false }));

    return () => {
      document.removeEventListener("lookup:lighthouse", onLighthouse);
      document.removeEventListener("lookup:wappalyzer", onWappalyzer);
      document.removeEventListener("lookup:sitemap", onSitemap);
    };
  }, [url]);

  useEffect(() => {
    if (!packet || !ready) return;
    applyCtas(packet, findings, brief);
  }, [packet, findings, brief, ready]);

  useEffect(() => {
    if (!packet || !ready || requested.current) return;
    requested.current = true;

    const params = new URLSearchParams(window.location.search);
    const notifyKey = `lookup-notified:${params.get("url")}:${params.get("datetime")}`;
    const notify = !sessionStorage.getItem(notifyKey);
    if (notify) sessionStorage.setItem(notifyKey, "1");

    fetch("/api/lookup/brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packet, notify }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data?.brief) return;
        setBrief(data.brief);
        window.posthog?.capture?.("brief_loaded", { url: packet.url, source: data.brief.source });
      })
      .catch(() => {});
  }, [ready, packet]);

  async function sendEmail(event: React.FormEvent) {
    event.preventDefault();
    if (!packet || emailState === "sending") return;
    setEmailState("sending");
    try {
      const response = await fetch("/api/lookup/email-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          url: packet.url,
          hostname: packet.hostname,
          verdict: brief?.verdict || findings[0]?.detail || "",
          actions: brief?.sections.overview.actions || findings.map((finding) => finding.title),
          suggestedTitle: brief?.sections.meta.suggestedTitle || ogTitle,
          suggestedDescription: brief?.sections.meta.suggestedDescription || ogDescription,
          reportUrl: window.location.href,
          auditUrl: `${window.location.origin}${buildAuditHref(packet, findings, brief?.verdict)}`,
        }),
      });
      if (!response.ok) throw new Error("send failed");
      setEmailState("sent");
      window.posthog?.capture?.("brief_email_sent", { url: packet.url });
    } catch {
      setEmailState("error");
    }
  }

  const cta = packet ? brief?.cta || buildCta(packet, findings) : null;
  const auditHref = packet ? buildAuditHref(packet, findings, brief?.verdict) : "/audit";
  const research = packet ? isWellKnownHost(packet.hostname) || brief?.ownerLikelihood === "research" : false;
  const visibleFindings = findings.slice(0, 4);
  const suggestedTitle = brief?.sections.meta.suggestedTitle;
  const suggestedDescription = brief?.sections.meta.suggestedDescription;
  const showMeta =
    suggestedTitle &&
    suggestedDescription &&
    (suggestedTitle !== ogTitle || suggestedDescription !== ogDescription);

  return (
    <div className="square-card p-5 mt-10" id="action-brief">
      <div className="text-neutral-400 mb-2">Action brief</div>
      {!ready ? (
        <div className="text-lg text-neutral-300">Reading the scan…</div>
      ) : (
        <>
          <div className="text-xl font-medium text-pretty mb-3">
            {brief?.verdict || cta?.headline}
          </div>
          {visibleFindings.length > 0 && (
            <div className="grid md:grid-cols-2 gap-3 mb-5">
              {visibleFindings.map((finding) => (
                <div key={finding.id} className="square-card p-3">
                  <div className={finding.severity === "high" ? "text-red-400" : "text-yellow-300"}>
                    {finding.title}
                  </div>
                  <div className="text-neutral-300 text-pretty">{finding.detail}</div>
                </div>
              ))}
            </div>
          )}
          {brief?.sections.overview.actions?.length ? (
            <ol className="list-decimal pl-5 mb-5 text-neutral-200 flex flex-col gap-1">
              {brief.sections.overview.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          ) : null}
          {showMeta ? (
            <div className="square-card p-3 mb-5 text-neutral-300">
              <div className="text-neutral-200 mb-1">Suggested meta</div>
              <div className="font-medium text-neutral-50">{suggestedTitle}</div>
              <div>{suggestedDescription}</div>
            </div>
          ) : null}
          <div className="flex md:flex-row flex-col gap-2 mb-5">
            <a href={auditHref} className="primary-cta p-2 text-center" onClick={() => window.posthog?.capture?.("audit_cta_clicked", { url, source: "brief" })}>
              {research ? "Get a free hero redesign" : "I own this site — fix it"}
            </a>
            <a href="/lookup" className="secondary-cta p-2 text-center">
              Scan my own site
            </a>
          </div>
          <form onSubmit={sendEmail} className="flex md:flex-row flex-col gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Work email"
              className="square-card rounded-none p-2 text-neutral-300 w-full"
            />
            <button type="submit" className="secondary-cta p-2 text-nowrap" disabled={emailState === "sending" || emailState === "sent"}>
              {emailState === "sent" ? "Sent" : emailState === "sending" ? "Sending…" : "Email this brief"}
            </button>
          </form>
          {emailState === "error" ? <div className="text-red-400 mt-2">Couldn’t send. Try again.</div> : null}
        </>
      )}
    </div>
  );
}
