<template lang="pug">
  include ../../pug/mixin/icon
  .controller
    .controller-intro(v-if="showIntro")
      h1 Hello, start your project
      .grid.is-center
        .column.is-screen-6
          .input.is-rounded
            input(placeholder="project name" v-model="title")

    ul.controller-list(:class="{ 'is-hidden': !listShown }")
      li(v-for="section in sections")
        a.controller-element(@click="addElement(section)")
          |{{ section }}

    .container
      .controller-buttons.grid.is-center
        .column.is-screen-3
          a.controller-add.button.is-blue.is-block(
            @click="listShown = true"
            ref="addButton"
            :disabled="!title.length"
          )
            +icon('plus', 'is-large')
        .column.is-screen-3
          a.controller-submit.button.is-green.is-block(@click="submit")
            +icon('tic', 'is-large')
</template>

<script>
export default {
  name: 'Controller',
  inject: ['$builder'],
  props: {
    showIntro: Boolean
  },
  data () {
    return {
      title: '',
      listShown: false,
      sections: Object.keys(this.$builder.components)
    }
  },
  watch: {
    title (value) {
      document.title = value;
      this.$builder.title = value;
    }
  },
  methods: {
    addElement (name) {
      this.$builder.add({
        name: name,
        schema: this.$builder.components[name].options.$schema
      });
      this.listShown = false;
    },
    toogleEditableState () {
      this.$builder.isEditing = !this.$builder.isEditing;
    },
    submit () {
      this.$builder.export('zip');
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
