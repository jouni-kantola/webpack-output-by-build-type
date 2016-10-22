const c1 = require('./module-c-1');
const c2 = require('./module-c-2');

const is = require('is-thirteen');

module.exports = function() {
    c1();
    c2();
    console.log('module c says 12 + 1 === 13', is(12 + 1).thirteen());
}