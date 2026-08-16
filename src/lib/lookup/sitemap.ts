import { parseStringPromise } from "xml2js";

const MAX_URLS_PER_SITEMAP = 1000;
const MAX_TOTAL_URLS = 5000;

const COMMON_SITEMAP_PATHS = [
  "/sitemap.xml",
  "/sitemap_index.xml",
  "/sitemap-index.xml",
  "/sitemap/sitemap.xml",
  "/sitemap-0.xml",
  "/sitemap.php",
  "/sitemap/index.xml",
];

const CRAWLER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; SitemapCrawler/1.0)",
};

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: CRAWLER_HEADERS,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

function toErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return "Request timed out - The site took too long to respond";
    }
    if (error.message.includes("CORS")) {
      return "Cannot access sitemap due to CORS restrictions";
    }
    if (error.message.includes("NetworkError")) {
      return "Site is blocking automated access - try visiting the site directly";
    }
    return error.message || fallback;
  }
  return fallback;
}

async function processSitemap(url: string, currentTotal = 0): Promise<[string[], number]> {
  const response = await fetchWithTimeout(url, 10000);

  if (!response.ok) {
    if (response.status === 403) throw new Error("Access forbidden - This site may block automated access");
    if (response.status === 404) throw new Error("No sitemap found at this location");
    if (response.status === 429) throw new Error("Too many requests - Please try again later");
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  let result: any;

  try {
    result = await parseStringPromise(text);
  } catch {
    throw new Error("Error parsing sitemap XML");
  }

  if (result.sitemapindex) {
    const sitemaps = result.sitemapindex.sitemap || [];
    const allUrls = new Set<string>();
    let totalUrls = currentTotal;

    for (const sitemap of sitemaps) {
      if (totalUrls >= MAX_TOTAL_URLS) break;
      if (!sitemap.loc?.[0]) continue;

      try {
        const [subSitemapUrls, newTotal] = await processSitemap(sitemap.loc[0], totalUrls);
        totalUrls = newTotal;
        subSitemapUrls.forEach((entry) => allUrls.add(entry));
      } catch {
        continue;
      }
    }

    return [Array.from(allUrls), totalUrls];
  }

  if (result.urlset) {
    const urlElements = result.urlset.url || [];
    const urls = new Set<string>();
    let count = 0;

    for (const urlElement of urlElements) {
      if (currentTotal + count >= MAX_TOTAL_URLS) break;
      if (count >= MAX_URLS_PER_SITEMAP) break;
      if (urlElement.loc?.[0]) {
        urls.add(urlElement.loc[0]);
        count++;
      }
    }

    return [Array.from(urls), currentTotal + count];
  }

  return [[], currentTotal];
}

export async function fetchSitemapUrls(url: string): Promise<{ urls: string[]; error: string | null }> {
  const baseUrl = new URL(url).origin;
  let sitemapUrls: string[] = [];

  try {
    const robotsResponse = await fetchWithTimeout(`${baseUrl}/robots.txt`, 5000);

    if (robotsResponse.ok) {
      const robotsText = await robotsResponse.text();
      const sitemapMatches = robotsText.matchAll(/Sitemap:\s*(.+)/gi);
      const allUrls = new Set<string>();
      let totalUrls = 0;

      for (const match of sitemapMatches) {
        if (totalUrls >= MAX_TOTAL_URLS) break;
        const sitemapUrl = match[1].trim();
        try {
          const [urls, newTotal] = await processSitemap(sitemapUrl, totalUrls);
          totalUrls = newTotal;
          urls.forEach((entry) => allUrls.add(entry));
        } catch {
          continue;
        }
      }

      if (allUrls.size > 0) sitemapUrls = Array.from(allUrls);
    }

    if (sitemapUrls.length === 0) {
      let lastError: unknown = null;

      for (const path of COMMON_SITEMAP_PATHS) {
        try {
          const [urls] = await processSitemap(`${baseUrl}${path}`);
          if (urls.length > 0) {
            sitemapUrls = urls;
            break;
          }
        } catch (error) {
          lastError = error;
        }
      }

      if (sitemapUrls.length === 0 && lastError) {
        throw lastError;
      }
    }

    if (sitemapUrls.length === 0) {
      return { urls: [], error: "No sitemap found or sitemap is empty" };
    }

    return { urls: sitemapUrls, error: null };
  } catch (error) {
    return { urls: [], error: toErrorMessage(error, "Failed to access site") };
  }
}
