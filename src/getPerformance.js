const { 
  getTimeFromPerformanceMetrics,
  extractDataFromPerformanceMetrics,
 } = require('./parseData');

async function getPerformance(page) {
    await page.goto('https://note.youdao.com/web/#/file/recent/note/0538AC4396B3481AA3C276AF73425736/');
    await page.waitFor(1000);
    const performanceMetrics = await page._client.send('Performance.getMetrics');

  
    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
  
    // return extractDataFromPerformanceTiming(
    //   performanceTiming,
    //   'responseEnd',
    //   'domInteractive',
    //   'domContentLoadedEventEnd',
    //   'loadEventEnd'
    // );
    return extractDataFromPerformanceMetrics(
      performanceMetrics,
      'FirstMeaningfulPaint'
    );
  }
  
  module.exports = getPerformance;