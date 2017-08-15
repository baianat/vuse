import Section from './section';

const BUILDER_OPTIONS = {
  docTitle: '',
  sections: []
};

// To tell if it is installed or not
let _Vue = null;
let _builder = null;

export default class Builder {
  constructor (options) {
    options = Object.assign({}, BUILDER_OPTIONS, options);
    this.isEditing = true;
    this.sections = options.sections || [];
  }

  add (options) {
    this.sections.push(new Section(options));
  }

  find (id) {
    return this.sections.find(s => s.id === id);
  }

  remove (id) {
    const idx = this.sections.findIndex(s => s.id === id);
    this.sections.splice(idx, 1);
  }

  static install (Vue, options = {}) {
    // already installed
    if (_Vue) {
      return;
    }

    _builder = new Builder(options);
    Vue.util.defineReactive(_builder, 'sections', _builder.sections);
    Vue.util.defineReactive(_builder, 'isEditing', _builder.isEditing);

    Vue.mixin({
      beforeCreate () {
        this.$builder = _builder;
        if (this.$options.propsData && this.$options.propsData.id !== undefined) {
          this.$section = this.$builder.find(this.$options.propsData.id);
        }
      },
      mounted () {
        Array.from(this.$el.querySelectorAll('.is-editable')).forEach((el) => {
          el.contentEditable = 'true';
        });
      }
    });
    _Vue = Vue;
  }
};
