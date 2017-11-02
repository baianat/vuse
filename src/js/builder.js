import merge from 'lodash-es/merge';
import Section from './section';
import BuilderComponent from './components/Builder';
import Renderer from './components/Renderer';
import styler from './styler';
import mixin from './mixin';
import Sortable from 'sortablejs';
import * as types from './types';

let PLUGINS = [];
let mixier = {};
const BUILDER_OPTIONS = {
  title: '',
  intro: true,
  sections: [],
  plugins: []
};

// To tell if it is installed or not
let _Vue = null;

class Builder {
  constructor (options) {
    this.title = options.title;
    this.isEditing = true;
    this.isSorting = false;
    this.intro = options.intro;
    this.sections = options.sections;
    this.components = {};
    this.installPlugins();
  }

  /**
   * Creates and adds a new section to the list of sections.
   * @param {*} options
   */
  create (options) {
    this.sections.push(new Section(options));
  }

  /**
   * Constructs a document fragment.
   */
  outputFragment () {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.head.cloneNode(true));
    frag.appendChild(this.rootEl.cloneNode(true));

    return frag;
  }

  /**
   * Finds a section with the specified id.
   *
   * @param {String|Number} id 
   */
  find (id) {
    return this.sections.find(s => s.id === id);
  }

  /**
   * Removes a section with the specified id.
   * @param {String|Number} id 
   */
  remove (id) {
    const idx = this.sections.findIndex(s => s.id === id);
    this.sections.splice(idx, 1);
  }

  /**
   * Static helper for components registration pre-installation.
   * 
   * @param {String} name 
   * @param {Object} definition 
   */
  static component (name, definition) {
    // Just make a plugin that installs a component.
    Builder.use((ctx) => {
      ctx.builder.component(name, definition);
    });
  }

  /**
   * Acts as a mixin for subcomponents.
   * @param {Object} mixinObj 
   */
  static mix (mixinObj) {
    mixier = merge(mixier, mixinObj);
  }

  /**
   * Adds a component section to the builder and augments it with the styler.
   * @param {*} name 
   * @param {*} definition 
   */
  component (name, definition) {
    // reoslve the component name automatically.
    if (typeof name === 'object') {
      definition = name;
      name = definition.name;
    }

    // if passed a plain object.
    if (!definition.extend) {
      definition = _Vue.extend(definition);
    }

    this.components[name] = definition.extend({
      directives: { styler: this.styler },
      mixins: [this.mixin],
      components: mixier.components
    });
  }

  /**
   * clears the builder sections.
  */
  clear () {
    this.sections = [];
  }

  /**
   * Installs added plugins.
   */
  installPlugins () {
    PLUGINS.forEach((ctx) => {
      ctx.plugin({ builder: this, Vue: _Vue }, ctx.options);
    });
    // reset to prevent duplications.
    PLUGINS = [];
  }

  static install (Vue, options = {}) {
    // already installed
    if (_Vue) {
      return;
    }

    _Vue = Vue;
    const builder = new Builder(Object.assign({}, BUILDER_OPTIONS, options));
    Vue.util.defineReactive(builder, 'sections', builder.sections);
    Vue.util.defineReactive(builder, 'isEditing', builder.isEditing);
    Vue.util.defineReactive(builder, 'isSorting', builder.isSorting);
    const extension = {
      components: builder.components,
      beforeCreate () {
        this.$builder = builder;
      }
    };
    // register the main components.
    Vue.component('b-builder', Vue.extend(BuilderComponent).extend(extension));
    Vue.component('b-renderer', Vue.extend(Renderer).extend(extension));
  }

  /**
   * The plugin to be installed with the builder. The function receives the installation context which
   * contains the builder instance and the Vue prototype.
   *
   * @param {Function} plugin 
   * @param {Object} options 
   */
  static use (plugin, options = {}) {
    if (typeof plugin !== 'function') {
      return console.warn('Plugins must be a function');
    }

    // append to the list of to-be installed plugins.
    PLUGINS.push({ plugin, options });
  }

  set (data) {
    this.title = data.title !== undefined ? data.title : this.title;
    if (data.sections && Array.isArray(data.sections)) {
      this.sections = data.sections.map(section => {
        if (!section.schema) {
          section.schema = this.components[section.name].options.$schema
        }

        return new Section(section);
      });
    }
  }

  /**
   * Controll arrange sections state
   */
  sort (state) {
    if (!this.isSorting && this.sortable) {
      this.sortable.destroy();
      return;
    }
    this.sortable = Sortable.create(this.rootEl, {
      animation: 150,
      scroll: true,
      scrollSpeed: 10
    });
  }
  /**
   * Outputs a JSON representation of the builder that can be used for rendering with the renderer component.
   */
  toJSON () {
    return {
      title: this.title,
      sections: this.sections.map(s => ({
        name: s.name,
        data: s.data
      }))
    };
  }

  /**
   * Previews the created page in a seperate tap/window.
   */
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

  /**
   * Exports the builder instance to a specified output. default is json.
   *
   * @param {String} method 
   */
  export (method = 'json') {
    if (method === 'zip') {
      if (typeof this.download === 'function') {
        return this.download();
      }

      return console.warn('You do not have the zip plugin installed.');
    }

    if (method === 'preview') {
      return this.preview();
    }

    return this.toJSON();
  }
};

// use the plugin API to add the styler and mixin functionalities.
Builder.use(styler);
Builder.use(mixin);

// Auto install if Vue is defined globally.
if (typeof Vue !== 'undefined') {
  // eslint-disable-next-line
  Vue.use(Builder);
}

Builder.version = '__VERSION__';
Builder.types = types;

export default Builder;
