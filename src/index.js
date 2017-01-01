const config = require('./config' + (__DEV__ ? '-dev' : '')).default;

console.dir(config);

require.ensure([], function (require) {
    const a = require('./deps/module-a.js').a;
    a();
});

require.ensure([], function (require) {
    const b = require('./deps/module-b.js').b;
    b();
});

require.ensure([], function (require) {
    const c = require('./deps/module-c.js').c;
    c();
});

if (config.debug) {    
    require.ensure([], function (require) {
        const debug = require('./deps/always-debug.js').debug;
        debug("i'm accessible by runtime config");
    }, 'always-debug');
}

if (__DEV__) {
    require.ensure([], function (require) {
        const debug = require('./deps/dev-debug.js').debug;
        debug("i'm accessible in dev build");
    }, 'dev-debug');
}
