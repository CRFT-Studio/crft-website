const MODELS = ["google/gemini-2.5-flash", "openai/gpt-4o-mini"];

export async function completeJson(prompt: string): Promise<unknown> {
  const apiKey = process.env.OPENROUTER_API || import.meta.env.OPENROUTER_API;
  if (!apiKey) return null;

  let lastError: unknown = null;

  for (const model of MODELS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://www.crft.studio",
          "X-Title": "CRFT Lookup",
        },
        body: JSON.stringify({
          model,
          temperature: 0.3,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a senior designer-developer at CRFT Studio. CRFT rebuilds marketing sites in Astro/Next with a real CMS. Never recommend WordPress plugins. Cite only numbers in the user packet. Reply with JSON only.",
            },
            { role: "user", content: prompt },
          ],
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        lastError = new Error(`OpenRouter ${model} failed (${response.status})`);
        continue;
      }

      const payload = await response.json();
      const content = payload?.choices?.[0]?.message?.content;
      if (typeof content !== "string" || !content.trim()) {
        lastError = new Error("Empty OpenRouter response");
        continue;
      }

      return JSON.parse(content);
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError) console.error("OpenRouter brief failed:", lastError);
  return null;
}
