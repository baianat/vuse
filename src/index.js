import Vuse from './vuse';
import * as types from './types';

// Auto install if Vue is defined globally.
if (typeof Vue !== 'undefined') {
  // eslint-disable-next-line
  Vue.use(Builder);
}

Vuse.version = '__VERSION__';
Vuse.types = types;

export default Vuse;
