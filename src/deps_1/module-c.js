import is from 'is-thirteen';

import c1 from './module-c-1';
import c2 from './module-c-2';

export const c = () => {
    c1();
    c2();
    console.log('module c says 12 + 1 === 13', is(12 + 1).thirteen());
};
