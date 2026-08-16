function waitForVisible() {
  if (document.visibilityState === "visible") return Promise.resolve();
  return new Promise<void>((resolve) => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        document.removeEventListener("visibilitychange", onVisible);
        resolve();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
  });
}

export async function fetchLookupSection<T>(section: string, targetUrl: string): Promise<T> {
  const datetime = new URLSearchParams(location.search).get("datetime") || "";
  const qs = new URLSearchParams({ url: targetUrl, datetime });
  const path = `/api/lookup/${section}?${qs}`;

  const request = async () => {
    const response = await fetch(path);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
    return data as T;
  };

  try {
    return await request();
  } catch {
    try {
      return await request();
    } catch {
      await waitForVisible();
      return await request();
    }
  }
}
