/** URL-safe scan timestamp: 2026-08-16T14-30-45 (UTC, second precision). */
export function formatLookupDatetime(date = new Date()) {
  return date.toISOString().substring(0, 19).replaceAll(":", "-");
}

/** Parse URL-safe lookup datetime (with or without seconds) into a Date. */
export function parseLookupDatetime(datetime: string) {
  const match = datetime.match(/^(\d{4}-\d{2}-\d{2})T(\d{2})-(\d{2})(?:-(\d{2}))?/);
  if (!match) return new Date(datetime);
  const [, day, hour, minute, second = "00"] = match;
  return new Date(`${day}T${hour}:${minute}:${second}Z`);
}
