// Import the Chromium browser into our scraper.
import { chromium } from 'playwright';

const url = 'https://github.com/topics/javascript';

// Open a Chromium browser. We use headless: false
// to be able to watch the browser window.
const browser = await chromium.launch({
    headless: false
});

// Open a new page / tab in the browser.
const page = await browser.newPage({
    bypassCSP: true,
});

// Tell the tab to navigate to the JavaScript topic page.
await page.goto(url);


await page.click('text=Load more');

//Content Security Policy not allowed this function
await page.waitForFunction(() => {
    const repoCards = document.querySelectorAll('article.border');
    // GitHub displays 20 repositories per page.
    // We wait until there's more than 20.
    return repoCards.length > 20;
});

// Extract data from the page. Selecting all 'article' elements
// will return all the repository cards we're looking for.
const repos = await page.$$eval('article.border', (repoCards) => {
    return repoCards.map(card => {
        const [user, repo] = card.querySelectorAll('h3 a');
        const stars = card.querySelector('#repo-stars-counter-star')
            .getAttribute('title');
        const description = card.querySelector('div.px-3 > p');
        const topics = card.querySelectorAll('a.topic-tag');

        const toText = (element) => element && element.innerText.trim();
        const parseNumber = (text) => Number(text.replace(/,/g, ''));

        return {
            user: toText(user),
            repo: toText(repo),
            url: repo.href,
            stars: parseNumber(stars),
            description: toText(description),
            topics: Array.from(topics).map((t) => toText(t)),
        };
    });
});


// Print the results 🚀
console.log(`We extracted ${repos.length} repositories.`);
console.dir(repos);






// Pause for 10 seconds, to see what's going on.
await page.waitForTimeout(15000);

// Turn off the browser to clean up after ourselves.
await browser.close();
