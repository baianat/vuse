import { getTypeFromTagName, getTypeFromSchema } from './util';
import Section from './section';
import BuilderComponent from './components/Builder';
import Styler from './components/Styler';
import Uploader from './components/Uploader'
import installComponents from './components';

const BUILDER_OPTIONS = {
  docTitle: '',
  sections: []
};

// To tell if it is installed or not
let _Vue = null;

// Singleton objects.
let _builder = null;
let mixin = null;
let styler = null;

export default class Builder {
  constructor (options) {
    options = Object.assign({}, BUILDER_OPTIONS, options);
    this.title = options.docTitle;
    this.isEditing = true;
    this.sections = options.sections || [];
    this.components = {};
  }

  create (options) {
    this.sections.push(new Section(options));
  }

  outputFragment () {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.head.cloneNode(true));
    frag.appendChild(this.rootEl.cloneNode(true));

    return frag;
  }

  find (id) {
    return this.sections.find(s => s.id === id);
  }

  remove (id) {
    const idx = this.sections.findIndex(s => s.id === id);
    this.sections.splice(idx, 1);
  }

  component (name, definition) {
    // if passed a plain object.
    if (!definition.extend) {
      definition = _Vue.extend(definition);
    }

    this.components[name] = definition.extend({
      directives: { styler },
      components: { Uploader },
      mixins: [mixin]
    });
  }

  static install (Vue, options = {}) {
    // already installed
    if (_Vue) {
      return;
    }

    _Vue = Vue;

    _builder = new Builder(options);
    Vue.util.defineReactive(_builder, 'sections', _builder.sections);
    Vue.util.defineReactive(_builder, 'isEditing', _builder.isEditing);

    const StylerInstance = Vue.extend(Styler).extend({
      beforeCreate () {
        this.$builder = _builder;
      }
    });
    styler = {
      inserted (el, binding, vnode) {
        const newNode = document.createElement('div');
        newNode.id = 'newNode'
        el.parentNode.appendChild(newNode);
        new StylerInstance({
          propsData: {
            el,
            section: vnode.context.$section,
            type: binding.arg || getTypeFromSchema(binding.expression, vnode.context.$section.schema) || getTypeFromTagName(el.tagName),
            name: binding.expression,
            editable: el.classList.contains('is-editable')
          }
        }).$mount('#newNode');
      }
    };

    mixin = {
      provide: function providesBuilder () {
        const provides = {};
        if (this.$builder) {
          provides.$builder = this.$builder;
        }

        if (this.$section) {
          provides.$section = this.$section;
        }

        return provides;
      },
      beforeCreate () {
        this.$builder = _builder;
        if (this.$options.propsData && this.$options.propsData.id !== undefined) {
          this.$section = this.$builder.find(this.$options.propsData.id);
          if (!this.$options.computed) {
            this.$options.computed = {};
          }

          this.$options.computed.$sectionData = function getSectionData () {
            return this.$section.data;
          };
        }
      },
      mounted () {
        Array.from(this.$el.querySelectorAll('.is-editable')).forEach((el) => {
          el.contentEditable = 'true';
        });
      }
    };

    installComponents(_builder);
    const BuilderInstance = Vue.extend(BuilderComponent);
    Vue.component('builder', BuilderInstance.extend({
      components: _builder.components,
      provide () {
        return {
          $builder: this.$builder
        }
      },
      beforeCreate () {
        this.$builder = _builder;
      }
    }));
  }

  static use (plugin, options = {}) {
    if (typeof plugin !== 'function') {
      return console.warn('Plugins must be a function');
    }

    plugin({ Builder }, options);
  }

  toJSON () {
    return {
      title: this.title,
      sections: this.sections
    }
  }

  preview () {
    const printPreview = window.open('about:blank', 'print_preview');
    const printDocument = printPreview.document;
    printDocument.open();
    printDocument.write(
      `<!DOCTYPE html>
        <html>
          ${document.documentElement.innerHTML}
        </html>`
    );
  }

  export (method = 'zip') {
    if (method === 'zip') {
      return this.download();
    }

    if (method === 'json') {
      return this.toJSON();
    }
  }
};
