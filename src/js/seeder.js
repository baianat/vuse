import * as types from './types';
import { isObject } from './util';

const data = new Map([
  [types.Title, 'Awesome title'],
  [types.Text, 'We\'re creating the best place to go when starting a new business or company.With Baianat you can instantly search domain names, social media handles, and see your logo in beautiful logotypes.'],
  [types.Avatar, 'static/img/avatar.png'],
  [types.Logo, 'static/img/google.svg'],
  [types.Link, 'http://example.com'],
  [types.Image, 'static/img/baianat.png'],
  [types.ClassList, () => []],
  [types.Button, () => ({ text: 'Click Me!', classes: [], href: 'http://example.com' })],
  [types.Quote, 'When you were made a leader, you weren\'t given a crown; you were given the responsibility to bring out the best in others.'],
  [Number, 100],
  [String, 'This is pretty neat']
]);

export default class Seeder {
  // Seeds values using a schema.
  static seed (schema) {
    if (isObject(schema)) {
      return Object.keys(schema).reduce((values, key) => {
        values[key] = Seeder.seed(schema[key]);
        if (values[key] === undefined) {
          values[key] = schema[key];
        }
        return values;
      }, {});
    } else if (Array.isArray(schema)) {
      return schema.map(s => Seeder.seed(s));
    }

    const value = data.get(schema);
    return typeof value === 'function' ? value() : value;
  }
};
