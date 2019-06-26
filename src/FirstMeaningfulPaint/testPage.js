const {
    getTimeFromPerformanceMetrics,
    extractDataFromPerformanceMetrics,
  } = require('./helpers');
  
  async function testPage(page) {
    await page.goto('https://note.youdao.com/web/#/file/recent/note/0538AC4396B3481AA3C276AF73425736/');
  
    await page.waitFor(1000);
    const performanceMetrics = await page._client.send('Performance.getMetrics');
  
    return extractDataFromPerformanceMetrics(
      performanceMetrics,
      'FirstMeaningfulPaint'
    );
  }
  
  module.exports = testPage;