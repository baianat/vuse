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
    this.data = Seeder.seed(options.schema);
  }

  update (name, value) {
    if (this.data[name] === undefined) {
      const splited = name.split('.');
      const matched = splited[0].match(/^(.+)\[([0-9]+)\]/);
      this.data[matched[1]][Number(matched[2])][splited[1]] = value;
      return;
    }
    this.data[name].text = value;
  }
};
