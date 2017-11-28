<template lang="pug">
  include ../../pug/mixin/icon

  .styler(ref="styler" v-if="$builder.isEditing")
    ul.styler-list
      li(v-if="type === 'button' || type === 'section'")
        button.styler-button(@click="updateOption('colorer')")
          +icon('palettes')
      li(v-if="type === 'button'")
        button.styler-button(@click="updateOption('link')")
          +icon('link')
      li(v-if="type === 'header' || type === 'section'")
        button.styler-button(@click="removeSection")
          +icon('trash')
      template(v-if="type === 'text'")
        li: button.styler-button(@click="updateOption('textColor')")
            +icon('palettes')
        li: button.styler-button(@click="updateOption('align')")
            +icon('align')
        li: button.styler-button(@click="updateOption('textStyle')")
            +icon('textStyle')
      template(v-if="type === 'column'")
        li: button.styler-button(@click="selectDevice('mobile')")
            +icon('mobile')
        li: button.styler-button(@click="selectDevice('tablet')")
            +icon('tablet')
        li: button.styler-button(@click="selectDevice('screen')")
            +icon('laptop')
        li: button.styler-button(@click="selectDevice('widescreen')")
            +icon('monitor')

    ul.styler-list
      li(v-if="currentOption === 'colorer'")
        ul.colorer
          li(v-for="color in colors")
            input(
              type="radio"
              :id="`color${color.charAt(0).toUpperCase() + color.slice(1)}`"
              name="colorer"
              :value="color"
              v-model="colorerColor"
              )
      li(v-if="currentOption === 'textColor'")
          ul.colorer
            li(v-for="(color, index) in colors")
              input(
                type="radio"
                :id="`color${color.charAt(0).toUpperCase() + color.slice(1)}`"
                name="colorer"
                :value="textColors[index]"
                v-model="textColor"
                @click="execute('forecolor', textColor)"
                )
      li(v-if="currentOption === 'link'")
        .input.is-rounded.is-button
          input(type="text" placeholder="type your link" v-model="url")
          button.button.is-green(@click="addLink")
            +icon('link')

      li(v-if="currentOption === 'align'")
        ul.align
          li: button.styler-button(@click="execute('justifyleft')")
            +icon('left')
          li: button.styler-button(@click="execute('justifycenter')")
            +icon('center')
          li: button.styler-button(@click="execute('justifyright')")
            +icon('right')

      li(v-if="currentOption === 'textStyle'")
        ul.align
          li: button.styler-button(@click="execute('bold')")
            +icon('bold')
          li: button.styler-button(@click="execute('italic')")
            +icon('italic')
          li: button.styler-button(@click="execute('underline')")
            +icon('underline')

      li(v-if="currentOption === 'columnWidth'")
        ul.align
          li(v-for="$n in 12")
            button.styler-button(@click="columnWidth($n)")
              span {{ $n }}

</template>

<script>
import Popper from 'popper.js';
import { isParentTo } from '../util';

export default {
  name: 'styler',
  props: ['el', 'type', 'name', 'section'],
  data: () => ({
    colors: ['blue', 'green', 'red', 'black', 'white'],
    textColors: ['#4da1ff', '#38E4B7', '#EA4F52', '#000000', '#FFFFFF'],
    textColor: '',
    oldColorerColor: '',
    colorerColor: '',
    mouseTarget: '',
    currentOption: '',
    url: ''
  }),
  watch: {
    colorerColor () {
      this.changeColor();
    }
  },
  methods: {
    updateOption (option) {
      this.currentOption = option;
      this.popper.update();
    },
    addLink () {
      this.section.set(`${this.name}.href`, this.url);
    },
    changeColor () {
      this.removeClass(`is-${this.oldColorerColor}`);
      this.oldColorerColor = this.colorerColor;
      this.addClass(`is-${this.colorerColor}`);
    },
    addClass (className) {
      this.section.set(this.name, value => {
        if (value && value.classes && Array.isArray(value.classes)) {
          value = value.classes;
        }

        value.push(className);
      });
    },
    selectDevice (device) {
      this.updateOption('columnWidth');
      this.device = device;
    },
    columnWidth (width) {
      console.log(this.device, width);
    },
    removeClass (className) {
      if (Array.isArray(className)) {
        return className.forEach(c => {
          this.removeClass(c);
        });
      }
      this.section.set(this.name, value => {
        if (value && value.classes && Array.isArray(value.classes)) {
          value = value.classes;
        }
        const idx = value.indexOf(className);
        value.splice(idx, 1);
      });
    },
    removeSection () {
      document.removeEventListener('click', this.hideStyler);
      // TODO: destroy all popperjs instances
      this.popper.destroy();
      this.styler.remove();
      this.$builder.remove(this.id);
    },
    execute (command, value = null) {
      document.execCommand(command, false, value);
    },
    showStyler () {
      this.styler.classList.add('is-visible');
      this.currentOption = '';
      this.popper.update();
    },
    hideStyler (evnt) {
      const mouseTarget = evnt.target;
      if (!isParentTo(mouseTarget, this.styler) && !isParentTo(mouseTarget, this.el)) {
        this.styler.classList.remove('is-visible');
        document.removeEventListener('click', this.hideStyler);
        if (this.type === 'section') return;
        if (this.type === 'button') {
          this.section.set(`${this.name}.text`, this.el.innerHTML);
          return;
        }

        this.section.set(this.name, this.el.innerHTML);
      }
    }
  },
  created () {
    if (this.type === 'button') {
      this.url = this.section.get(`${this.name}.href`);
    }
  },
  mounted () {
    if (!this.$builder.isEditing) return;
    // get nessesry data
    this.styler = this.$refs.styler;
    this.id = Number(this.section.id);

    // exute popper element
    const position = this.$props.type === 'section' ? 'left-start' : 'top';
    this.popper = new Popper(this.el, this.styler, {
      placement: position
    });

    // add listeners to show/hide styler
    this.el.addEventListener('click', () => {
      this.showStyler();
      document.addEventListener('click', this.hideStyler, false);
    }, false);
  },
  updated () {
    if (!this.$builder.isEditing) return;

    // update styler and popper
    this.styler = this.$refs.styler;
    const position = this.$props.type === 'section' ? 'left-start' : 'top';
    this.popper = new Popper(this.el, this.styler, {
      placement: position
    });
  }
};
</script>

<style lang="stylus">
@import '../../../node_modules/dolober/src/stylus/color'

.styler
  position: relative
  z-index: 100
  visibility: hidden
  opacity: 0
  margin: 10px 0
  padding: 5px
  background: $dark
  border-radius: 26px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  &-list
    display: flex
    justify-content: center
    align-items: center
    list-style: none
    margin: 0
    padding: 0
  &-button
    display: flex
    justify-content: center
    align-items: center
    outline: 0
    background: $dark
    border: 0
    fill: $white
    color: $white
    width: 42px
    height: 42px
    border-radius: 42px
    margin: 0 5px 0 0
    &:hover
      background: darken($dark, 20%)
    &:first-child
      margin-left: 5px
  &-selector
    margin: 0 5px
  &.is-visible
    visibility: visible
    opacity: 1
  .input
    margin: 0

.align
  @extend .styler-list
  height: 42px

.colorer
  @extend .styler-list
  height: 42px
  li >input
    -webkit-appearance: none
    width: 30px
    height: 30px
    border-radius: 40px
    border: 4px solid darken($dark, 20%)
    margin: 0 5px
    outline: none
    &:checked
      border-color: lighten($dark, 20%)
    &:hover
      border-color: lighten($dark, 20%)
    &#colorRed
      background $red
    &#colorBlue
      background $blue
    &#colorGreen
      background $green
    &#colorBlack
      background $black
    &#colorWhite
      background $white

.is-hidden
  display: none
</style>
