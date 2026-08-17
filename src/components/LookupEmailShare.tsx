import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildAuditHref,
  buildCta,
  buildFindings,
  extractFailedAudits,
  extractScores,
  flattenStack,
  type ActionBrief as ActionBriefData,
  type BriefPacket,
  type Finding,
} from "@/lib/lookup/brief";
import { fetchLookupSection } from "@/lib/lookup/client";
import type { EmailReportPayload } from "@/lib/lookup/email-report";

type Props = {
  url: string;
  hostname: string;
  hasTitle: boolean;
  hasDesc: boolean;
  hasOgImage: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
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

function applyBriefAndLinks(packet: BriefPacket, findings: Finding[], brief?: ActionBriefData | null) {
  const cta = brief?.cta || buildCta(packet, findings);
  const auditHref = buildAuditHref(packet, findings, brief?.verdict);

  setText("sidebar-audit-label", cta.headline);
  setText("mobile-audit-label", cta.offer === "rebuild" ? "Get a rebuild plan" : "Get Free Design Audit");
  setHref("sidebar-audit-cta", auditHref);
  setHref("owner-card-audit", auditHref);
  setHref("mobile-audit-cta", auditHref);

  if (brief) {
    const stackNote = brief.sections.stack.rebuildAngle || brief.sections.stack.summary;
    setNote("lighthouse-note", brief.sections.lighthouse.summary);
    setNote("tech-stack-note", stackNote);
    setNote("sitemap-note", brief.sections.sitemap.summary);
    setNote("meta-tags-note", brief.sections.meta.summary);
  }
}

export default function LookupEmailShare({
  url,
  hostname,
  hasTitle,
  hasDesc,
  hasOgImage,
  ogTitle,
  ogDescription,
  ogImageUrl,
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

  const emailPayload = useMemo<EmailReportPayload | null>(() => {
    if (!packet || typeof window === "undefined") return null;
    const origin = window.location.origin;
    return {
      hostname: packet.hostname,
      pageUrl: packet.url,
      reportUrl: window.location.href,
      auditUrl: `${origin}${buildAuditHref(packet, findings, brief?.verdict)}`,
      contactUrl: `${origin}/contact-us`,
      ogTitle: ogTitle || packet.hostname,
      ogDescription: ogDescription || "",
      ogImageUrl: ogImageUrl || "",
      hasTitle,
      hasDesc,
      hasOgImage,
      stack: packet.stack,
      sitemap: packet.sitemap,
      scores: packet.scores,
    };
  }, [packet, findings, brief, ogTitle, ogDescription, ogImageUrl, hasTitle, hasDesc, hasOgImage]);

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
    applyBriefAndLinks(packet, findings, brief);
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
    if (!emailPayload || emailState === "sending") return;
    setEmailState("sending");
    try {
      const response = await fetch("/api/lookup/email-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...emailPayload }),
      });
      if (!response.ok) throw new Error("send failed");
      setEmailState("sent");
      window.posthog?.capture?.("lookup_email_sent", { url });
    } catch {
      setEmailState("error");
    }
  }

  return (
    <div className="square-card bg-transparent max-w-[882px] p-5 mt-10" id="email-report">
      <div className="text-neutral-400 mb-2">Email this report</div>
      <div className="text-xl font-medium text-pretty mb-2">Send the overview to your inbox</div>
      <p className="text-neutral-300 text-pretty mb-5 max-w-[640px]">
        Get a styled summary of this lookup — lighthouse scores, stack, sitemap, and meta — plus links to the full report, a free redesign, and contact.
      </p>
      {!ready ? (
        <div className="text-lg text-neutral-300">Waiting for scan data…</div>
      ) : (
        <>
          <form onSubmit={sendEmail} className="flex md:flex-row flex-col gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Work email"
              className="square-card rounded-none p-2 text-neutral-300 w-full"
            />
            <button
              type="submit"
              className="primary-cta p-2 text-nowrap"
              disabled={emailState === "sending" || emailState === "sent"}
            >
              {emailState === "sent" ? "Sent" : emailState === "sending" ? "Sending…" : "Send email"}
            </button>
          </form>
          {emailState === "error" ? <div className="text-red-400 mt-2">Couldn’t send. Try again.</div> : null}
        </>
      )}
    </div>
  );
}
