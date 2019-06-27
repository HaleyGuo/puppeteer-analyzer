const { 
  getTimeFromPerformanceMetrics,
  extractDataFromPerformanceMetrics,
  getCustomMetric,
 } = require('./parseData');

async function getPerformance(page) {
  // 第三版
  // let listLinksSpa;
  // const listLinksSpa =await page.metrics();
  // getCustomMetric(page, 'listLinksSpa');

  const getCustomMetric = (page, name) =>{  
    new Promise(resolve =>{
      let result = page.on('metrics');
      if(result.title === name){
        resolve(result.metrics * 1000);
      }   
      // page.on('metrics', ({ title, metrics }) => {
      //     if (title === name) {
      //       resolve(metrics * 1000);
      //     }
      //   })
      }
    );
  }

  // await page.on('metrics', ({ title, metrics }) => {
  //   if (title === 'listLinksSpa') {
  //     listLinksSpa = metrics.Timestamp * 1000;
  //   }
  // });

  await page.goto('https://note.youdao.com/web/#/file/recent/note/0538AC4396B3481AA3C276AF73425736/');
  const performanceMetrics = await page._client.send('Performance.getMetrics');

  const navigationStart = getTimeFromPerformanceMetrics(
    performanceMetrics,
    'NavigationStart'
  );
  // await page.waitFor(1000);
  const listLinksSpa =await page.metrics();
  return {
    listLinksSpa: (listLinksSpa.Timestamp *1000) - navigationStart,
  };
}
  
module.exports = getPerformance;