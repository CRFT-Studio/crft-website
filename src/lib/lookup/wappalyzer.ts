export type TechItem = {
  name: string;
  description?: string;
  website?: string;
  icon?: string;
};

export type TechByCategory = Record<string, TechItem[]>;

export async function fetchWappalyzer(url: string): Promise<TechByCategory> {
  const serviceUrl = process.env.WAPPALYZER_URL || import.meta.env.WAPPALYZER_URL;
  const apiKey = process.env.WAPPALYZER_API || import.meta.env.WAPPALYZER_API;

  if (!serviceUrl) throw new Error("Wappalyzer service URL is not configured");
  if (!apiKey) throw new Error("Wappalyzer API key is not configured");

  const response = await fetch(serviceUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({ url, options: {} }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Wappalyzer failed (${response.status}): ${errorText}`);
  }

  const results = await response.json();
  if (!results?.technologies) return {};

  return results.technologies.reduce((acc: TechByCategory, tech: any) => {
    if (!tech.categories) return acc;

    for (const cat of tech.categories) {
      if (!acc[cat.name]) acc[cat.name] = [];
      acc[cat.name].push({
        name: tech.name,
        description: tech.description,
        website: tech.website,
        icon: tech.icon,
      });
    }

    return acc;
  }, {});
}
