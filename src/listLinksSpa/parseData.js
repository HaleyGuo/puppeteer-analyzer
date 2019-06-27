const extractDataFromPerformanceTiming = (timing, ...dataNames) => {
    const navigationStart = timing.navigationStart;
  
    const extractedData = {};
    dataNames.forEach(name => {
      extractedData[name] = timing[name] - navigationStart;
    });
  
    return extractedData;
  };
  
  module.exports = {
    extractDataFromPerformanceTiming,
  };

const getTimeFromPerformanceMetrics = (metrics, name) =>
  metrics.metrics.find(x => x.name === name).value * 1000;

// 第三版
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

const extractDataFromPerformanceMetrics = (metrics, ...dataNames) => {
  const navigationStart = getTimeFromPerformanceMetrics(
    metrics,
    'NavigationStart'
  );

  const extractedData = {};
  dataNames.forEach(name => {
    extractedData[name] =
      getTimeFromPerformanceMetrics(metrics, name) - navigationStart;
  });

  return extractedData;
};

module.exports = {
  getTimeFromPerformanceMetrics,
  extractDataFromPerformanceMetrics,
  getCustomMetric,
};