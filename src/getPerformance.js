const { 
  getTimeFromPerformanceMetrics,
  extractDataFromPerformanceMetrics,
 } = require('./parseData');

async function getPerformance(page) {
  let listLinksSpa;
  page.on('metrics', ({ title, metrics }) => {
    if (title === 'listLinksSpa') {
      listLinksSpa = metrics.Timestamp * 1000;
      // debugger;
    }
  });

  await page.goto('https://note.youdao.com/web/#/file/recent/note/0538AC4396B3481AA3C276AF73425736/');
  const performanceMetrics = await page._client.send('Performance.getMetrics');

  const navigationStart = getTimeFromPerformanceMetrics(
    performanceMetrics,
    'NavigationStart'
  );
  await page.waitFor(1000);

  return {
    listLinksSpa: listLinksSpa - navigationStart,
  };
  // 第一版
  // const performanceTiming = JSON.parse(
  //   await page.evaluate(() => JSON.stringify(window.performance.timing))
  // );
  // return extractDataFromPerformanceTiming(
  //   performanceTiming,
  //   'responseEnd',
  //   'domInteractive',
  //   'domContentLoadedEventEnd',
  //   'loadEventEnd'
  // );

  // 第二版
  // return extractDataFromPerformanceMetrics(
  //   performanceMetrics,
  //   'FirstMeaningfulPaint'
  // );
}
  
module.exports = getPerformance;