export function parseLookupUrl(value: string | null | undefined): URL | null {
  if (!value) return null;

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;

    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".localhost")) return null;
    if (host === "0.0.0.0" || host === "[::1]" || host === "::1") return null;
    if (/^(127|10|192\.168|169\.254)\./.test(host)) return null;
    if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function displayPath(parsed: URL): string {
  return parsed.origin + parsed.pathname;
}
