const { join } = require('path');

if (process.env.VERCEL) {
  module.exports = {
    cacheDirectory: join(__dirname, 'node_modules', '.puppeteer_cache'),
    browserRevision: '123.0.6312.122' // This revision will only be used on Vercel
  };
} else {
  // For local development, export an empty or different config as needed
  module.exports = {};
}
