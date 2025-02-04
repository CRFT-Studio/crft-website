export const prerender = false;

export const config = {
  runtime: 'nodejs',
};

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Wappalyzer = require('wappalyzer-rm');

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

  const options = {
    debug: false,
    delay: 500,
    headers: {},
    maxDepth: 3,
    maxUrls: 10,
    maxWait: 5000,
    recursive: true,
    probe: true,
    proxy: false,
    userAgent: 'Wappalyzer',
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
  };

  try {
    const wappalyzer = new Wappalyzer(options);
    await wappalyzer.init();

    const site = await wappalyzer.open(targetUrl);
    const results = await site.analyze();

    console.log("Wappalyzer results:", results);

    await wappalyzer.destroy();

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
