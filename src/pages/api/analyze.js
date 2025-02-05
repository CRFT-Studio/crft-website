// commonjs import, that only works locally:
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const Wappalyzer = require('wappalyzer-rm');

export const prerender = false;

export const config = {
  runtime: 'nodejs',
};

import chromium from '@sparticuz/chromium';
import Wappalyzer from 'wappalyzer-rm';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WappalyzerDriver = require('wappalyzer-rm/driver.js');

class CustomDriver {
  constructor(options) {
    this.options = options;
    this.pages = [];
  }

  async init() {
    console.log("CustomDriver init called");
    const puppeteer = await import('puppeteer');

    console.log("Launching browser with chromium config");
    this.browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    });

    console.log("Browser launched successfully");
  }

  async goto(url) {
    const page = await this.browser.newPage();
    this.pages.push(page);
    await page.goto(url);
    return page;
  }

  async destroy() {
    console.log("Cleaning up CustomDriver resources");
    for (const page of this.pages) {
      await page.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }

  // Implement other required methods from WappalyzerDriver
  async waitForElement() { /* ... */ }
  async wait() { /* ... */ }
}

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
    debug: true,
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
    Driver: CustomDriver
  };

  try {
    console.log("Initializing Wappalyzer with custom driver");
    const wappalyzer = new Wappalyzer(options);

    console.log("Calling wappalyzer.init()");
    await wappalyzer.init();

    console.log("Opening site:", targetUrl);
    const site = await wappalyzer.open(targetUrl);

    console.log("Analyzing site");
    const results = await site.analyze();

    console.log("Analysis complete. Results:", results);

    await wappalyzer.destroy();

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    console.error("Error stack:", error.stack);
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack,
      details: 'Check server logs for more information'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
