import page from './deps/page';

const config = require('./config' + (__DEV__ ? '-dev' : '')).default;

console.dir(config);

import('./deps/module-a.js').then(module => module());
import('./deps/module-b.js').then(module => module());
import('./deps/module-c.js').then(module => module());
if (config.debug) {
    import('./deps/always-debug.js').then(module => {
        const { debug } = module;
        debug('i\'m accessible by runtime config');
    });
} else {
    console.log('no debugging enabled');
}

if (__DEV__) {
    import('./deps/dev-debug.js').then(debug => {
        debug('i\'m accessible in dev build');
    });
} else {
    console.log("here goes production debugging");
}
