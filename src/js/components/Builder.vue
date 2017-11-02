<template lang="pug">
  include ../../pug/mixin/icon

  div
    main.artboard(ref="artboard" :class="{ 'is-sorting': $builder.isSorting }")
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
        li(v-for="(section, index) in sections")
          a.controller-element(@click="addSection(section)")
            img(v-if="covers[index]" :src="covers[index]")
            span(v-else) {{ section }}

      .controller-buttons
        button.controller-submit.button.is-green.is-rounded(@click="submit")
          +icon('tic')
        button.controller-sort.button.is-blue.is-rounded(
          :class="{ 'is-red': $builder.isSorting }"
          @click="toogleState"
        )
          +icon('sort')
        button.controller-add.button.is-blue.is-rounded(
          :class="{ 'is-red': listShown }"
          :disabled="$builder.isSorting"
          @click="newSection"
        )
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
      sections: Object.keys(this.$builder.components),
      covers: (() => {
        return Object.keys(this.$builder.components).map((key) => {
          return this.$builder.components[key].options.cover;
        })
      })()
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
    toogleState () {
      this.$builder.isEditing = !this.$builder.isEditing;
      this.$builder.isSorting = !this.$builder.isSorting;
      this.$builder.sort();
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
@import '../../../node_modules/dolober/src/stylus/color'

$floatHover
  cursor: pointer
  box-shadow: 0 14px 28px alpha($dark, 0.125), 0 10px 10px alpha($dark, 0.11)

button:focus
  outline: 0
.artboard
  transform-origin: top center
.controller
  &-buttons
    position: fixed
    z-index: 200
    bottom: 30px
    right: 30px
    button:not(:last-child)
      margin-right: 20px
  &-submit
    transition: 0.3s
    &:hover
      @extends $floatHover
  &-add
    transition: 0.3s
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
    width: 250px
    margin-left: (- @width)
    padding: 20px 10px
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
    min-height: 100px
    margin: 5px
    border-radius: 5px
    background: darken($gray, 10%)
    transition: 0.3s
    cursor: pointer
    color: $white
    overflow: hidden
    img
      max-width: 100%
    &:hover
      @extends $floatHover

.is-hidden
  display: none
.sortable-ghost
  border: 2px solid $blue
  opacity: 0.3

</style>
