import configDev from 'config-dev';

console.log('hello world');

require.ensure([], () => {
    require('module-a.js');
});
