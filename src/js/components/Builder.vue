<template lang="pug">
  include ../../pug/mixin/icon

  div
    div#artboard.artboard(ref="artboard" :class="{ 'is-sorting': $builder.isSorting }")
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

      ul.controller-list(:class="{ 'is-visiable': listShown }" ref="controllerList")
        li(v-for="(group, name) in sections"  v-if="group.length" :id="`group-${name}`")
          .controller-header(@click="toggleGroupVisibility(`#group-${name}`)")
            span.controller-title {{ name }}
            span.controller-icon
              +icon('arrowDown')
          ul.controller-group
            li(v-for="section in group")
              a.controller-element(@click="addSection(section)")
                img(v-if="section.cover" :src="section.cover")
                span(v-else) {{ section.name }}

      .controller-buttons
        button.controller-submit.button.is-green.is-rounded(@click="submit")
          +icon('tic')
        button.controller-sort.button.is-blue.is-rounded(
          :class="{ 'is-red': $builder.isSorting }"
          @click="toggleState"
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
      sections: this.getSections()
    }
  },
  watch: {
    title (value) {
      this.$builder.title = value;
      document.title = value;
    }
  },
  methods: {
    newSection () {
      // add the section immediatly if none are present.
      if (this.sections.length === 1) {
        this.addSection(this.sections[0]);
        return;
      }
      this.toggleListVisibility();
    },
    addSection (name) {
      this.$builder.create(name);
      this.listShown = false;
    },
    toggleState () {
      this.$builder.isEditing = !this.$builder.isEditing;
      this.$builder.isSorting = !this.$builder.isSorting;
      this.$builder.toggleSort();
    },
    toggleListVisibility () {
      this.listShown = !this.listShown;
    },
    toggleGroupVisibility (group) {
      group = this.$refs.controllerList.querySelector(group);
      group.classList.toggle('is-visiable');
    },
    submit () {
      this.$emit('saved', this.$builder);
    },
    getSections () {
      let sections = [];
      let groups = { root: [] };

      // get sections data
      sections = Object.keys(this.$builder.components).map((sec) => {
        return {
          name: sec,
          group: this.$builder.components[sec].options.group,
          cover: this.$builder.components[sec].options.cover,
          schema: this.$builder.components[sec].options.$schema
        }
      });

      // group sections toghter
      sections.forEach((section) => {
        let sectionGroup = section.group;
        if (!sectionGroup) {
          groups.root.push(section);
          return;
        }
        if (!groups[sectionGroup]) {
          groups[sectionGroup] = [section];
          return;
        }
        groups[sectionGroup].push(section);
      })
      return groups;
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
  box-sizing: border-box
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
    position: fixed
    z-index 300
    top: 0
    left: 0
    bottom: 0
    margin: 0
    width: 250px
    background: $white
    margin-left: (- @width - 10)
    padding: 20px 10px
    display: flex
    flex-direction: column
    overflow: auto
    list-style: none
    transition: 0.4s
    box-shadow: 1px 0 10px alpha($dark, 20%)
    &.is-visiable
      margin-left: 0
  &-group
    display: none
    padding: 0
    margin: 0
    list-style: none
    li
      width: 90%
      margin: 5px auto
    li.is-visiable &
      display: block
  &-icon
    width: 24px
    height: 24px
    fill: $gray
    transition: 0.4s
    li.is-visiable &
     transform: rotate(180deg)

  &-element
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    min-height: 100px
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

  &-header
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px 5px
    border-bottom: 1px solid alpha($black, 5%)

.is-hidden
  display: none
.sortable-ghost
  border: 2px solid $blue
  opacity: 0.3

.is-editable:not(section):not(header)
.uploader
  position: relative
  &:focus
    outline: 0
  &:hover
    &:before
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      display: block
      margin: -10px
      border: 1px solid alpha($black, 10%)
      content: ''

section.is-editable
  position: relative
  &:hover
    &:before
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      display: block
      margin: 1px
      border: 1px solid alpha($black, 10%)
      content: ''

</style>
