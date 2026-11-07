export const SITE_ORIGIN = "https://www.crft.studio";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/open-graph-img.png`;

/** Absolute canonical on the www host, without a query string. Root keeps its slash. */
export function canonicalUrl(pathname: string): string {
  const path = !pathname || pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return new URL(path, `${SITE_ORIGIN}/`).href;
}

export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
