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
      li(v-for="el in elements")
        a.controller-element(@click="addElement(el)")
          |{{ el }}

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
  import { getElementProps } from '../util';

  export default {
    name: 'Controller',
    props: {
      showIntro: Boolean,
      editable: Boolean
    },
    data() {
      return {
        elements: [
          'header1',
          'header2',
          'section1',
          'section2',
          'social1',
          'social2'
        ],
      title: "",
      id: 0,
      }
    },
    watch: {
      title: function () {
        document.title = this.title;
      }
    },
    methods: {
      addElement(el) {
        const elementProps = getElementProps(el, this.id++, this.$props.editable);
        this.$bus.$emit('addElement', elementProps);
        this.toggleListVisiabilty();
      },
      toggleListVisiabilty() {
        this.$refs.list.classList.toggle('is-hidden');
      },
      toogleEditableState() {
        this.$bus.$emit('editable');
      },
      submit() {
        const editable = Array.from(document.querySelectorAll('.is-editable'));
        const uploder = Array.from(document.querySelectorAll('.is-uploader'));
        const stylers = Array.from(document.querySelectorAll('.styler'));
        const artboadrd = document.querySelector('#artboard');
        const head = document.querySelector('head');

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

        const newWindow = window.open('');
        newWindow.document.write(`
        <html>
          <head>
            ${head.innerHTML}
          </head>
          <body>
            ${artboadrd.innerHTML}
          </body>
        </html>`);
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

