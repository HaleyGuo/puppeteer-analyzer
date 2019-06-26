const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://note.youdao.com/web/#/file/recent/note/0538AC4396B3481AA3C276AF73425736/');

    const performanceTiming = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    console.log(performanceTiming);

    await browser.close();
})();