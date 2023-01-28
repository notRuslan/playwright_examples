import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Import the Chromium browser into our scraper.
import { chromium } from 'playwright';

const URL = 'https://bot.sannysoft.com/';
// const url = 'https://github.com/topics/javascript';

// Open a Chromium browser. We use headless: false
// to be able to watch the browser window.
const browser = await chromium.launch({
    headless: true
});

// Open a new page / tab in the browser.
const page = await browser.newPage({
    bypassCSP: true,
});

// Tell the tab to navigate to the JavaScript topic page.
await page.goto(URL);

await page.screenshot({path: __dirname + '/testSteths.png'});

// Pause for 10 seconds, to see what's going on.
// await page.waitForTimeout(10000);

// Turn off the browser to clean up after ourselves.
await browser.close();
