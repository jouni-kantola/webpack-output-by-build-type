const config = require('./config' + (__DEV__ ? '-dev' : ''));

console.dir(config);
console.log(globalConfig);