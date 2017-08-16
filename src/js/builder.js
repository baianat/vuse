import JSZip from 'jszip';
import saveAs from 'save-as'
import { getImageBlob } from './util';
import Section from './section';
import installComponents from './components';

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
    this.title = options.docTitle;
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
        }
      },
      mounted () {
        Array.from(this.$el.querySelectorAll('.is-editable')).forEach((el) => {
          el.contentEditable = 'true';
        });
      }
    });

    installComponents(Vue);
    _Vue = Vue;
  }

  _exportZip () {
    const printPreview = window.open('about:blank', 'print_preview');
    const printDocument = printPreview.document;
    printDocument.write(
      `<!DOCTYPE html>
        <html>
          ${document.documentElement.innerHTML}
        </html>`
    );
    printDocument.open();
    const editable = Array.from(printDocument.querySelectorAll('.is-editable'));
    const uploder = Array.from(printDocument.querySelectorAll('.is-uploader'));
    const stylers = Array.from(printDocument.querySelectorAll('.styler'));
    const images = Array.from(printDocument.querySelectorAll('img'));
    const artboadrd = printDocument.querySelector('#artboard');
    const head = printDocument.querySelector('head');
    const imagePromises = [];
    const zip = new JSZip();
    const output = zip.folder('project');
    const imgFolder = output.folder('assets/img');

    images.forEach((image) => {
      const imageLoader = getImageBlob(image.src);
      imagePromises.push(imageLoader);
      imageLoader.then((img) => {
        imgFolder.file(img.name, img.blob, { base64: true });
        image.setAttribute('src', `assets/img/${img.name}`);
      })
    });

    Promise.all(imagePromises).then(() => {
      editable.forEach((el) => {
        el.contentEditable = 'false';
        el.classList.remove('is-editable');
      });
      uploder.forEach((el) => {
        const input = el.querySelector(':scope > input');
        input.remove();
        el.classList.remove('is-uploader');
      });
      stylers.forEach((styler) => {
        styler.remove();
      });

      output.file('index.html',
        `<html>
          <head>
            ${head.innerHTML}
          </head>
          <body>
            ${artboadrd.innerHTML}
          </body>
        </html>`);

      zip.generateAsync({ type: 'blob' })
        .then((blob) => {
          saveAs(blob, 'project.zip');
          printPreview.close();
        });
    });
  }

  toJSON () {
    return {
      title: this.docTitle,
      sections: this.sections
    }
  }

  preview () {
    const printPreview = window.open('about:blank', 'print_preview');
    const printDocument = printPreview.document;
    printDocument.write(
      `<!DOCTYPE html>
        <html>
          ${document.documentElement.innerHTML}
        </html>`
    );
    printDocument.open();
  }

  export (method = 'zip') {
    if (method === 'zip') {
      return this._exportZip();
    }

    if (method === 'json') {
      return this.toJSON();
    }
  }
};
