interface LookupLighthouseReports {
  desktop?: unknown;
  mobile?: unknown;
}

interface Window {
  posthog?: { capture?: (event: string, properties?: Record<string, unknown>) => void };
  __lookupLighthouse?: LookupLighthouseReports;
  __lookupWappalyzer?: Record<string, { name: string }[]>;
  __lookupSitemap?: { urlCount: number; hasSitemap: boolean };
}
