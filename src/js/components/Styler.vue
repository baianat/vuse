<template lang="pug">
  include ../../pug/mixin/icon

  .styler(
    ref="styler"
    id="styler"
    v-if="$builder.isEditing"
    :class="{ 'is-visible': isVisible }"
    @click.stop=""
  )
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
      template(v-if="type === 'grid'")
        li: button.styler-button(@click="selectDevice('mobile')")
            +icon('mobile')
        //- li: button.styler-button(@click="selectDevice('tablet')")
        //-     +icon('tablet')
        li: button.styler-button(@click="selectDevice('screen')")
            +icon('laptop')
        //- li: button.styler-button(@click="selectDevice('widescreen')")
        //-     +icon('monitor')

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
          li: button.styler-button(@click="gridValue--")
            +icon('arrowLeft')
          li: input(type="number" min="0" max="12" v-model="gridValue").styler-input
          li: button.styler-button(@click="gridValue++")
            +icon('arrowRight')

</template>

<script>
import Popper from 'popper.js';
import { isParentTo } from './../util';

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
    url: '',
    gridValue: 0,
    isVisible: false
  }),
  watch: {
    colorerColor () {
      this.changeColor();
    },
    textColor () {
      this.execute('forecolor', this.textColor)
    },
    gridValue () {
      if (this.gridValue < 0) this.gridValue = 0;
      if (this.gridValue > 12) this.gridValue = 12;
      this.section.set(this.name, (grid) => {
        if (this.gridValue === 0) {
          grid[this.device] = '';
          return;
        }
        grid[this.device] = (`is-${this.device}-${this.gridValue}`);
      });
    }
  },
  methods: {
    updateOption (option) {
      this.currentOption = option;
      this.$nextTick(() => {
        this.popper.update();
      })
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
      this.section.set(this.name, (value) => {
        if (value && value.classes && Array.isArray(value.classes)) {
          value = value.classes;
        }

        value.push(className);
      });
    },
    selectDevice (device) {
      const grid = this.section.get(this.name)[device];
      const gridValue = grid.split('-').pop() || 0;
      this.updateOption('columnWidth');
      this.device = device;
      this.gridValue = gridValue;
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
      this.$builder.remove(this.section);
    },
    execute (command, value = null) {
      this.el.focus();
      document.execCommand(command, false, value);
    },
    showStyler (event) {
      event.stopPropagation();
      if (this.isVisible) return;
      this.isVisible = true;

      // exute popper element
      if (!this.popper) {
        const position = this.$props.type === 'section' ? 'left-start' : 'top';
        this.popper = new Popper(this.el, this.$refs.styler, {
          placement: position
        });
      }
      document.addEventListener('click', this.hideStyler, true);
      this.currentOption = '';
    },
    hideStyler (event) {
      if (
        event && isParentTo(event.target, this.$el) ||
        event && isParentTo(event.target, this.el)
      ) {
        return
      }
      this.isVisible = false;
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
      document.removeEventListener('click', this.hideStyler, true);

      if (this.type === 'section' || this.type === 'grid') {
        return;
      }
      if (this.type === 'button') {
        this.section.set(`${this.name}.text`, this.el.innerHTML);
        return;
      }

      this.section.set(this.name, this.el.innerHTML);
    }
  },
  created () {
    if (this.type === 'button') {
      this.url = this.section.get(`${this.name}.href`);
    }
  },
  mounted () {
    if (!this.$builder.isEditing) return;

    // add listeners to show/hide styler
    this.el.addEventListener('click', this.showStyler);
  },
  beforeDestroy () {
    this.hideStyler();
    this.$refs.styler.remove();
  }
};
</script>

<style lang="stylus">
@import '../../../node_modules/dolober/src/stylus/color'

.styler
  position: relative
  z-index: 200
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
  &-input
    background: $white
    color: $dark
    border: 0
    outline: 0
    width: 40px
    height: 40px
    border-radius: 42px
    margin: 0 5px 0 0
    text-align: center
    -webkit-appearance: none
    -moz-appearance: textfield
    appearance: none
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
    -moz-appearance: textfield
    appearance: none
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

input[type=number]::-webkit-inner-spin-button
input[type=number]::-webkit-outer-spin-button
  -webkit-appearance: none
  margin: 0
</style>
