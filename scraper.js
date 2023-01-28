// Import the Chromium browser into our scraper.
import { chromium } from 'playwright';

const url = 'https://github.com/topics/javascript';

// Open a Chromium browser. We use headless: false
// to be able to watch the browser window.
const browser = await chromium.launch({
    headless: false
});

// Open a new page / tab in the browser.
const page = await browser.newPage();

// Tell the tab to navigate to the JavaScript topic page.
await page.goto(url);


await page.click('text=Load more');

//Content Security Policy not allowed this function
/*await page.waitForFunction(() => {
    const repoCards = document.querySelectorAll('article.border');
    // GitHub displays 20 repositories per page.
    // We wait until there's more than 20.
    return repoCards.length > 20;
});*/

// Pause for 10 seconds, to see what's going on.
await page.waitForTimeout(15000);

// Turn off the browser to clean up after ourselves.
await browser.close();
