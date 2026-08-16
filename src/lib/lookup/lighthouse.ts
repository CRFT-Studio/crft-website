const CATEGORIES = "category=performance&category=best-practices&category=seo&category=accessibility";

async function fetchStrategy(url: string, strategy: "desktop" | "mobile") {
  const key = import.meta.env.PAGESPEED_API;
  if (!key) throw new Error("PageSpeed API key is not configured");

  const encodedUrl = encodeURIComponent(url);
  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&${CATEGORIES}&strategy=${strategy}&locale=en&key=${key}`
  );

  if (!response.ok) {
    throw new Error(`PageSpeed ${strategy} failed (${response.status})`);
  }

  const payload = await response.json();
  if (!payload.lighthouseResult) {
    throw new Error(`PageSpeed ${strategy} returned no lighthouse result`);
  }

  return payload.lighthouseResult;
}

export async function fetchLighthouseReports(url: string) {
  const [desktop, mobile] = await Promise.allSettled([
    fetchStrategy(url, "desktop"),
    fetchStrategy(url, "mobile"),
  ]);

  return {
    desktop: desktop.status === "fulfilled" ? desktop.value : null,
    mobile: mobile.status === "fulfilled" ? mobile.value : null,
    errors: {
      desktop: desktop.status === "rejected" ? String(desktop.reason?.message || desktop.reason) : null,
      mobile: mobile.status === "rejected" ? String(mobile.reason?.message || mobile.reason) : null,
    },
  };
}
