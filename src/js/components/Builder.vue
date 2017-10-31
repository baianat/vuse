<template lang="pug">
  include ../../pug/mixin/icon

  div
    #artboard.artboard(ref="artboard")
      component(v-for='section in $builder.sections'
        :is='section.name'
        :key='section.id'
        :id='section.id'
      )

    .controller
      .controller-intro(v-if="showIntro && !this.$builder.sections.length")
        h1 Hello, start your project
        .container
          .grid.is-center
            .column.is-screen-6
              .input.is-rounded
                input(placeholder="project name" v-model="title")

      ul.controller-list(:class="{ 'is-visiable': listShown }")
        li(v-for="section in sections")
          a.controller-element(@click="addSection(section)")
            |{{ section }}

      .controller-buttons
        button.controller-submit.button.is-green.is-rounded(@click="submit")
          +icon('tic')
        button.controller-add.button.is-blue.is-rounded(:class="{ 'is-red': listShown }" @click="newSection" ref="addButton")
          +icon('plus')

</template>

<script>
export default {
  name: 'b-builder',
  props: {
    showIntro: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => ({
        title: '',
        sections: []
      })
    }
  },
  data () {
    return {
      title: null,
      listShown: false,
      sections: Object.keys(this.$builder.components)
    }
  },
  watch: {
    title (value) {
      this.$builder.title = value;
    }
  },
  methods: {
    newSection () {
      // add the section immediatly if none are present.
      if (this.sections.length === 1) {
        this.addSection(this.sections[0]);
        return;
      }
      this.toogleListVisiableity();
    },
    addSection (name) {
      this.$builder.create({
        name: name,
        schema: this.$builder.components[name].options.$schema
      });
      this.listShown = false;
    },
    toogleEditableState () {
      this.$builder.isEditing = !this.$builder.isEditing;
    },
    toogleListVisiableity () {
      this.listShown = !this.listShown;
    },
    submit () {
      this.$emit('saved', this.$builder);
    }
  },
  created () {
    // sets the initial data.
    this.$builder.set(this.data);
    this.title = this.$builder.title;
  },
  mounted () {
    this.$builder.rootEl = this.$refs.artboard;
  }
};
</script>

<style lang="stylus">
@import '~dolober/src/stylus/color'

$floatHover
  cursor: pointer
  box-shadow: 0 14px 28px alpha($dark, 0.125), 0 10px 10px alpha($dark, 0.11)
  transform: translate(0, -1px)
  z-index: 2

button:focus
  outline: 0

.controller
  &-buttons
    position: fixed
    bottom: 30px
    right: 30px
    button:not(:last-child)
      margin-right: 20px
  &-submit
    transition: 0.5s
    &:hover
      @extends $floatHover
  &-add
    transition: 0.5s
    &.is-red
      transform: rotate(45deg)
    &:hover
      @extends $floatHover
  &-intro
    text-align: center
    font-size: 30px
    color: $dark
    font-weight: normal
  &-list
    background: $white
    position: fixed
    top: 0
    left: 0
    bottom: 0
    margin: 0
    width: 300px
    margin-left: (- @width)
    padding: 20px
    display: flex
    flex-direction: column
    overflow: auto
    list-style: none
    transition: 0.4s
    &.is-visiable
      margin-left: 0

  &-element
    display: flex
    justify-content: center
    align-items: center
    width: 100%
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
