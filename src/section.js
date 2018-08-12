import getPath from 'lodash-es/get';
import toPath from 'lodash-es/toPath';
import Seeder from './seeder';

const SECTION_OPTIONS = {
  name: null,
  schema: {}
};

let counter = 0;

export default class Section {
  constructor (options) {
    this.id = counter++;
    options = Object.assign({}, SECTION_OPTIONS, options);
    this.name = options.name;
    this.schema = options.schema;
    this.data = options.data || Seeder.seed(options.schema);
    this.stylers = [];
  }

  set (name, value) {
    const path = toPath(name);
    const prop = path.pop();

    path.shift();
    const obj = path.length === 0 ? this.data : getPath(this.data, path);
    if (typeof value === 'function') {
      value(obj[prop]);
      return;
    }

    obj[prop] = value;
  }

  get (name) {
    const path = toPath(name);
    const prop = path.pop();
    path.shift();
    const obj = path.length === 0 ? this.data : getPath(this.data, path);

    return obj[prop];
  }

  destroy () {
    this.stylers.forEach(styler => styler.$destroy())
  }
};
