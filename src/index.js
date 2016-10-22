const config = require('./config' + (__DEV__ ? '-dev' : ''));

console.dir(config);
console.log(globalConfig);

require.ensure([], function (require) {
    const a = require('./deps/module-a.js');
    console.log(a());
});


require.ensure([], function (require) {
    const b = require('./deps/module-b.js');
    console.log(b());
});

require.ensure([], function (require) {
    const c = require('./deps/module-c.js');
    console.log(c());
});

if (config.debug) {
    require.ensure([], function (require) {
        const debug = require('./deps/always-debug.js');
        console.log(debug("i'm accessible by runtime config"));
    }, 'always-debug');
}

if (__DEV__) {
    require.ensure([], function (require) {
        const debug = require('./deps/dev-debug.js');
        console.log(debug("i'm accessible in dev build"));
    }, 'dev-debug');
}
