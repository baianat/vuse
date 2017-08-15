<template lang="pug">
  include ../../pug/mixin/icon.pug
  .controller
    .controller-intro(v-if="showIntro")
      h1 Hello, start your project
      .grid.is-center
        .column.is-screen-6
          .input.is-rounded
            input(placeholder="project name" v-model="title")

    ul.controller-list.is-hidden(ref="list")
      li(v-for="section in sections")
        a.controller-element(@click="addElement(section)")
          |{{ section }}

    .container
      .controller-buttons.grid.is-center
        .column.is-screen-3
          a.controller-add.button.is-blue.is-block(
            @click="toggleListVisiabilty"
            ref="addButton"
            :disabled="!title.length"
          )
            +icon('plus', 'is-large')
        .column.is-screen-3
          a.controller-submit.button.is-green.is-block(@click="submit")
            +icon('tic', 'is-large')
</template>

<script>
import JSZip from 'jszip';
import saveAs from 'save-as'
import elementProps from '../elementsProps';
import { getImageBlob } from '../util';

export default {
  name: 'Controller',
  props: {
    showIntro: Boolean
  },
  data: () => ({
    sections: [
      'header1',
      'header2',
      'section1',
      'section2',
      'social1',
      'social2'
    ],
    title: ''
  }),
  watch: {
    title: function () {
      document.title = this.title;
    }
  },
  methods: {
    addElement (name) {
      this.$builder.add({
        name: name,
        data: elementProps()[name]
      });
      this.toggleListVisiabilty();
    },
    toggleListVisiabilty () {
      this.$refs.list.classList.toggle('is-hidden');
    },
    toogleEditableState () {
      this.$bus.$emit('editable');
    },
    submit () {
      const printPreview = window.open('about:blank', 'print_preview');
      const printDocument = printPreview.document;
      printDocument.open();
      printDocument.write(
        `<!DOCTYPE html>
        <html>
          ${document.documentElement.innerHTML}
        </html>`);
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
  }
};
</script>

<style lang="stylus">
@import '~dolober/src/stylus/color.styl'

$floatHover
  cursor: pointer
  box-shadow: 0 14px 28px alpha($dark, 0.125), 0 10px 10px alpha($dark, 0.11)
  transform: translate(0, -1px)
  z-index: 2
.controller
  &-buttons
    padding: 50px
  &-submit
  &-add
    transition: 0.5s
    &:hover
      @extends $floatHover
  &-intro
    text-align: center
    font-size: 30px
    color: $dark
    font-weight: normal
  &-list
    background: $gray
    margin: 0
    padding: 20px
    display: flex
    justify-content: center
    align-items: center
    list-style: none
  &-element
    display: flex
    justify-content: center
    align-items: center
    width: 150px
    height: 150px
    margin: 5px
    border-radius: 10px
    background: darken($gray, 10%)
    transition: 0.5s
    cursor: pointer
    color: $white
    &:hover
      @extends $floatHover

.is-hidden
  display: none
</style>
