// playwright-extra is a drop-in replacement for playwright,
// it augments the installed playwright with plugin functionality
const { chromium } = require('playwright-extra')

// Load the stealth plugin and use defaults (all tricks to hide playwright usage)
// Note: playwright-extra is compatible with most puppeteer-extra plugins
const stealth = require('puppeteer-extra-plugin-stealth')()

// Add the plugin to playwright (any number of plugins can be added)
chromium.use(stealth)

const URL = 'https://www.pexels.com/search/chicago/';


// That's it, the rest is playwright usage as normal 😊
chromium.launch({ headless: true }).then(async browser => {

// Open a new page / tab in the browser.
    const page = await browser.newPage({
        bypassCSP: true,
    });

// Tell the tab to navigate to the JavaScript topic page.
    await page.goto(URL);
    await page.waitForTimeout(5000);
    await page.screenshot({path: __dirname + '/scrin1.png'});
    await page.locator('div > div:nth-child(1) > div:nth-child(1) > article > a.Link_link__mTUkz').click();

// Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');

//Click download
    await page.locator('body > div:nth-child(19) > div > div > div.Modal_contentWrapper__0LjCd > div > div.spacing_noMargin__Q_PsJ.spacing_margin-right-30__Q_0xW.spacing_margin-left-30__6raoi > div.DisplayNone_desktop-oversized__OPqkZ.Flex_flex__wNlof.spacing_noMargin__Q_PsJ.spacing_margin-bottom-15__dfflj.spacing_padding-top-30__IsGB9.spacing_padding-bottom-15__f6v3t > div.spacing_noMargin__Q_PsJ.SpacingGroup_wrapper__HXthG > div > div.dropdown_wrapper__0W_Kf > a').click();

    console.log('Clicked');

    const download = await downloadPromise;

// Wait for the download process to complete
    console.log(await download.path());
    const filename = __dirname + '/pic.jpg';
// Save downloaded file somewhere
    await download.saveAs(filename);
    console.log(filename);

// await page.getByRole('a', {name: /Free download/i}).click();
// Pause for 10 seconds, to see what's going on.
    await page.waitForTimeout(15000);

// Turn off the browser to clean up after ourselves.
    await browser.close();
})



