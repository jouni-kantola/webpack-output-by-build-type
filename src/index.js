import page from './deps/page';
import { foo } from './deps/module-tree-shaking.js';

const config = require('./config' + (__DEV__ ? '-dev' : '')).default;

console.dir(config);

// using babel polyfill adds quite a lot of overhead
async function bootstrap() {
    const { a } = await import('./deps/module-a.js');
    a();

    const { b } = await import('./deps/module-b.js');
    b();

    const { c } = await import('./deps/module-c.js');
    c();

    if (config.debug) {
        const { debug } = await import('./deps/always-debug.js');
        debug('i\'m accessible by runtime config');
    } else {
        console.log('no debugging enabled');
    }
}

// if used in async function, __DEV__ code not removed from output
if (__DEV__) {
    import('./deps/dev-debug.js').then(module => {
        const { debug } = module;
        debug('i\'m accessible in dev build');
    });
} else {
    console.log("here goes production debugging");
}
// an option would be
// const bootstrap = require('./app' + (__DEV__ ? '-dev' : '')).bootstrap;

bootstrap();

foo();
// bar() not imported, and therefor removed in optimization
