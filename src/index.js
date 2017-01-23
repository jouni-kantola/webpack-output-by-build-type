import page from 'page';
import { foo } from 'module-tree-shaking.js';


// using babel polyfill adds quite a lot of overhead
async function bootstrap() {

    const { a } = await import('module-a.js');
    a();

    const { config } = await import('./config-dev');
    console.dir(config);

    const { b } = await import('module-b.js');
    b();

    // sync require (mixing import/require)
    const { c } = await import('module-c.js');
    c();

    console.log('yeah right');

    if (config.debug) {
        const { debug } = await import('always-debug.js');
        debug('i\'m accessible by runtime config');
    } else {
        console.log('no debugging enabled');
    }
}

// if used in async function, __DEV__ code not removed from output
if (__DEV__) {
    import('dev-debug.js').then(module => {
        const { debug } = module;
        debug('i\'m accessible in dev build');
    });
} else {
    console.log('here goes production debugging');
}
// an option would be
// const bootstrap = require('./app' + (__DEV__ ? '-dev' : '')).bootstrap;

bootstrap();

foo();
// bar() not imported, and therefor removed in optimization
