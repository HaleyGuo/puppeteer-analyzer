const puppeteer = require('puppeteer');
const getPerformance = require('./getPerformance');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(await getPerformance(page));
    console.timeStamp('listLinksSpa');
    await browser.close();
})();