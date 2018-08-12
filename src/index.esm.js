import Vuse from './vuse';
import * as types from './types';

const version = '__VERSION__';

// Auto install if Vue is defined globally.
if (typeof Vue !== 'undefined') {
  // eslint-disable-next-line
  Vue.use(Builder);
}

export {
  Vuse,
  types,
  version
};

export default Vuse;
