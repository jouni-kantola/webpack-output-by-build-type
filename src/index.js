import a from './deps/a';
//const a = require('./deps/a');  // if `require()` everything works again
console.log('a is undefined', a === undefined);
console.log(a.hello());