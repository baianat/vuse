import merge from 'lodash-es/merge';
import Section from './section';
import BuilderComponent from './components/Builder';
import Renderer from './components/Renderer';
import styler from './styler';
import mixin from './mixin';
import * as types from './types';
import { cleanDOM } from './util';

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
    this.isRendered = false;
    this.intro = options.intro;
    this.sections = options.sections;
    this.components = {};
    this.installPlugins();
  }

  /**
   * Creates and adds a new section to the list of sections.
   * @param {*} options
   */
  add (options, position) {
    if (position !== undefined) {
      this.sections.splice(position, 0, new Section(options));
      return;
    }
    this.sections.push(new Section(options));
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
  remove (section) {
    console.log(this.sections[0]);
    const id = this.sections.findIndex(s => s.id === section.id);
    this.sections.splice(id, 1);
    section.destroy();
  }

  /**
   * Removes a section with the specified id.
   * @param {String|Number} oldIndex
   * @param {String|Number} newIndex
   */
  sort (oldIndex, newIndex) {
    const section = this.sections[oldIndex];
    this.sections.splice(oldIndex, 1);
    this.sections.splice(newIndex, 0, section);
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
  * clears the builder sections.
  */
  clear () {
    const tempSections = this.sections;
    this.sections.forEach(section => section.destroy());
    this.sections = [];
    return tempSections;
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

    // if passed a plain object
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
    if (_Vue) return;

    _Vue = Vue;
    const builder = new Builder(Object.assign({}, BUILDER_OPTIONS, options));
    // configer assets output location
    builder.assets = {
      css: options.css || 'dist/css/app.css'
    }
    builder.themes = options.themes || [];
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
        const sectionData = {
          name: section.name,
          schema: section.schema,
          data: section.data
        };
        if (!sectionData.schema) {
          sectionData.schema = this.components[sectionData.name].options.$schema
        }

        return new Section(sectionData);
      });
    }
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
    const frag = this.outputFragment();
    const artboard = frag.querySelector('#artboard');
    const printPreview = window.open('about:blank', 'print_preview');
    const printDocument = printPreview.document;
    cleanDOM(frag);
    printDocument.open();
    printDocument.write(
      `<!DOCTYPE html>
        <html>
          <head>
            <title>${this.title}</title>
            <link href="${this.assets.css}" rel="stylesheet">
          </head>
          <body>
            ${artboard.innerHTML}
          <body>
        </html>`
    );
  }

  /**
   * Exports the builder instance to a specified output. default is json.
   *
   * @param {String} method
   */
  export (method = 'json') {
    if (method === 'pwa' || method === 'zip') {
      if (typeof this.download === 'function') {
        return this.download(this.assets);
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
