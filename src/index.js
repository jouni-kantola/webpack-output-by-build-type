const config = require('./config' + (__DEV__ ? '-dev' : ''));

console.dir(config);

require.ensure([], function (require) {
    const a = require('./deps/module-a.js');
    a();
});

require.ensure([], function (require) {
    const b = require('./deps/module-b.js');
    b();
});

require.ensure([], function (require) {
    const c = require('./deps/module-c.js');
    c();
});


if (config.debug) {    
    require.ensure([], function (require) {
        const debug = require('./deps/always-debug.js');
        debug("i'm accessible by runtime config");
    }, 'always-debug');
}

if (__DEV__) {
    require.ensure([], function (require) {
        const debug = require('./deps/dev-debug.js');
        debug("i'm accessible in dev build");
    }, 'dev-debug');
}
