import * as types from './types';
import { isObject } from './util';
const ASSETS_DIR = '.';
const data = new Map([
  [types.Title, 'Awesome title'],
  [types.Text, 'We\'re creating the best place to go when starting a new business or company.With Baianat you can instantly search domain names, social media handles, and see your logo in beautiful logotypes.'],
  [types.Avatar, `${ASSETS_DIR}/img/avatar.png`],
  [types.Logo, `${ASSETS_DIR}/img/google.svg`],
  [types.Link, 'http://example.com'],
  [types.Image, `${ASSETS_DIR}/img/baianat.png`],
  [types.ClassList, () => []],
  [types.Button, () => ({ text: 'Click Me!', classes: [], href: 'http://example.com' })],
  [types.Quote, 'When you were made a leader, you weren\'t given a crown; you were given the responsibility to bring out the best in others.'],
  [types.Grid, () => ({mobile: '', tablet: '', screen: '', widescreen: ''})],
  [Number, 100],
  [String, 'This is pretty neat']
]);

export default class Seeder {
  // Seeds values using a schema.
  static seed (schema) {
    if (isObject(schema)) {
      return Object.keys(schema).reduce((values, key) => {
        values[key] = Seeder.seed(schema[key]);
        return values;
      }, {});
    } else if (Array.isArray(schema)) {
      return schema.map(s => {
        return Seeder.seed(s)
      });
    }

    let value = data.get(schema);
    if (value === undefined) {
      value = schema;
    }
    return typeof value === 'function' ? value() : value;
  }
};
