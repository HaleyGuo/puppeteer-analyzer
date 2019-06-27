const {
    getTimeFromPerformanceMetrics,
    extractDataFromTracing,
  } = require('./helpers');
  
  async function testPage(page) {
    await page.tracing.start({ path: './trace.json' });
  
    await page.goto('https://note.youdao.com/web/#/file/recent/note/0538AC4396B3481AA3C276AF73425736/');
  
    await page.tracing.stop();
    const cssTracing = await extractDataFromTracing(
      './trace.json',
      'common.3a2d55439989ceade22e.css'
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