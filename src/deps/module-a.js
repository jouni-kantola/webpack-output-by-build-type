const is = require('is-thirteen');

module.exports = function() {
    console.log('module a says 12 + 1 === 13', is(12 + 1).thirteen());
}