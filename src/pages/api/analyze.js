export const prerender = false;

export const config = {
  runtime: 'nodejs',
};

// Replace the direct Wappalyzer-RM import with a fetch-based API call
export async function GET({ request }) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');

  console.log("Received request URL:", request.url);
  console.log("Target URL to analyze:", targetUrl);

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'No URL provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Define your API settings
  const WAPPALYZER_URL = process.env.WAPPALYZER_URL || 'https://wappalyzer-rm.fly.dev/analyze';
  const WAPPALYZER_API = process.env.WAPPALYZER_API || 'your-secret-api-key';

  // Options to pass to the API (most of these will be handled server-side now)
  const options = {
    recursive: true,
    probe: true,
    maxUrls: 10
  };

  try {
    console.log(`Sending request to Wappalyzer API at ${WAPPALYZER_URL}`);

    // Make request to your Wappalyzer-RM API service
    const response = await fetch(WAPPALYZER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': WAPPALYZER_API
      },
      body: JSON.stringify({
        url: targetUrl,
        options
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API returned status ${response.status}`);
    }

    const results = await response.json();
    console.log("Wappalyzer API results received");

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
