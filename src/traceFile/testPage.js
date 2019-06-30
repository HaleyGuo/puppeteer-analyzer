const {
    getTimeFromPerformanceMetrics,
    extractDataFromTracing,
  } = require('./helpers');
  
  async function testPage(page) {
    await page.tracing.start({ path: './trace.json' });
  
    await page.goto('http://test.note.youdao.com/mobileVIP/');
  
    await page.tracing.stop();
    const cssTracing = await extractDataFromTracing(
      './trace.json',
      'index.js'
    );
  
    const performanceMetrics = await page._client.send('Performance.getMetrics');
    const navigationStart = getTimeFromPerformanceMetrics(
      performanceMetrics,
      'NavigationStart'
    );
  
    return {
      cssStart: cssTracing.start - navigationStart,
      cssEnd: cssTracing.end - navigationStart,
    };
  }
  
  module.exports = testPage;