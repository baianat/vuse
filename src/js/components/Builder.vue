<template lang="pug">
  include ../../pug/mixin/icon

  div
    div#artboard.artboard(
      ref="artboard"
      :class="{ 'is-sorting': $builder.isSorting }"
    )
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
            .column.is-screen-12(v-if="themes")
              .row.is-center
                .column.is-mobile-6.is-screen-3(v-for="theme in themes")
                  button.controller-theme(
                    @click="addTheme(theme)"
                  )
                    | {{ theme.name }}

      ul.controller-list(:class="{ 'is-visiable': listShown }" ref="controllerList")
        li(v-for="(group, name) in groups"  v-if="group.length" :id="`group-${name}`")
          .controller-header(@click="toggleGroupVisibility(`#group-${name}`)")
            span.controller-title {{ name }}
            span.controller-icon
              +icon('arrowDown')
          .controller-group
            template(v-for="section in group")
              a.controller-element(
                @click="addSection(section)"
                @drag="currentSection = section"
              )
                img(v-if="section.cover" :src="section.cover")
                span(:class="{ 'add-center-bottom': section.cover}") {{ section.name }}

      .controller-buttons
        button.button.is-green.is-rounded(
          tooltip-position="top"
          tooltip="export"
          @click="submit"
        )
          +icon('download')
        button.button.is-blue.is-rounded(
          v-if="!tempSections"
          tooltip-position="top"
          tooltip="clear sections"
          @click="clearSections"
        )
          +icon('trash')
        button.button.is-red.is-rounded(
          v-if="tempSections"
          tooltip-position="top"
          tooltip="undo"
          @click="undo"
        )
          +icon('undo')
        button.button.is-blue.is-rounded(
          tooltip-position="top"
          tooltip="sorting"
          :class="{ 'is-red': $builder.isSorting }"
          @click="toggleSort"
        )
          +icon('sort')
        button.button.is-blue.is-rounded(
          tooltip-position="top"
          tooltip="add section"
          :class="{ 'is-red': listShown, 'is-rotated': listShown }"
          :disabled="!$builder.isEditing"
          @click="newSection"
        )
          +icon('plus')

</template>

<script>
import Sortable from 'sortablejs';

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
      tempSections: null,
      sections: this.getSections(),
      currentSection: '',
      groups: {}
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
    addSection (section, position) {
      this.$builder.add(section, position);
    },
    clearSections () {
      this.tempSections = this.$builder.clear();
      setTimeout(() => {
        this.tempSections = null;
      }, 5000);
    },
    undo () {
      this.$builder.sections = this.tempSections;
      this.tempSections = null;
    },
    addTheme (theme) {
      this.$builder.set(theme);
    },
    toggleSort () {
      this.$builder.isSorting = !this.$builder.isSorting;
      this.$builder.isEditing = !this.$builder.isSorting;
      if (!this.$builder.isSorting && this.sortable) {
        this.sortable.option('sort', false);
        this.sortable.option('disabled', true);
        return;
      }
      this.sortable.option('disabled', false);
      this.sortable.option('sort', true);
    },
    toggleListVisibility () {
      this.listShown = !this.listShown;
      this.sortable.option('disabled', !this.listShown);
    },
    showList () {
      this.listShown = true;
      this.sortable.option('disabled', false);
    },
    hideList () {
      this.listShown = false;
      this.sortable.option('disabled', true);
    },
    toggleGroupVisibility (group) {
      group = this.$refs.controllerList.querySelector(group);
      group.classList.toggle('is-visiable');
    },
    submit () {
      this.$emit('saved', this.$builder);
    },
    generateGroups () {
      let groups = { random: [] };

      // group sections together
      this.sections.forEach((section) => {
        let sectionGroup = section.group;
        if (!sectionGroup) {
          groups.random.push(section);
          return;
        }
        if (!groups[sectionGroup]) {
          groups[sectionGroup] = [section];
          return;
        }
        groups[sectionGroup].push(section);
      })
      this.groups = groups;
    },
    getSections () {
      let sections = [];

      // get sections data
      sections = Object.keys(this.$builder.components).map((sec) => {
        return {
          name: sec,
          group: this.$builder.components[sec].options.group,
          cover: this.$builder.components[sec].options.cover,
          schema: this.$builder.components[sec].options.$schema
        }
      });
      return sections;
    }
  },

  created () {
    // sets the initial data.
    this.$builder.set(this.data);
    this.title = this.$builder.title;
    this.themes = this.$builder.themes;
    this.generateGroups();
  },

  mounted () {
    this.$builder.rootEl = this.$refs.artboard;
    const groups = this.$refs.controllerList.querySelectorAll('.controller-group');
    const _self = this;
    groups.forEach((group) => {
      Sortable.create(group, {
        group: {
          name: 'sections-group',
          put: false,
          pull: 'clone'
        },
        sort: false
      });
    });
    this.sortable = Sortable.create(this.$refs.artboard, {
      group: {
        name: 'artboard',
        put: 'sections-group'
      },
      animation: 150,
      scroll: true,
      scrollSpeed: 10,
      sort: false,
      disabled: true,
      preventOnFilter: false,
      onAdd (evt) {
        _self.addSection(_self.currentSection, evt.newIndex);
        evt.item.remove();
      },
      onUpdate (evt) {
        _self.$builder.sort(evt.oldIndex, evt.newIndex);
      }
    });
  },

  updated () {
    if (this.$builder.scrolling) {
      this.$builder.scrolling(this.$refs.artboard);
    }
  },

  beforeDestroy () {
    this.$builder.clear();
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
    right: 40px
    svg
      transition: 0.4s
    button
      transition: 0.4s
      &:not(:last-child)
        margin-right: 20px
      &.is-rotated >svg
        transform: rotate(45deg)
      &:hover
        @extends $floatHover
  &-intro
    text-align: center
    font-size: 30px
    color: $dark
    font-weight: normal
  &-list
    user-select: none
    -moz-user-select: none
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
    overflow: scroll
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
      margin: 10px auto
    li.is-visiable &
      display: block
  &-icon
    width: 24px
    height: 24px
    fill: $gray
    transition: 0.4s
    li.is-visiable &
     transform: rotate(180deg)

  &-theme
    width: 100%
    padding: 10px
    border: 1px solid $gray
    background-color: $white
    border-radius: 4px
    cursor: pointer
    font-size: 12px

  &-element
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    min-height: 50px
    border-radius: 5px
    background: darken($gray, 10%)
    transition: 0.3s
    cursor: pointer
    color: $white
    overflow: hidden
    user-select: none
    -moz-user-select: none
    &:not(:last-child)
      margin-bottom: 10px
    img
      max-width: 100%
      pointer-events: none
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
.add-center-bottom
  position: absolute
  right: 0
  bottom: 0
  left: 0
  text-shadow: 1px 1px 2px alpha($black, 80%)
  text-align: center
  padding: 5px

.is-editable:not(section):not(header)
.uploader
  position: relative
  border: 1px solid alpha($black, 0%)
  &:focus
    outline: 0
  &:hover
    border: 1px solid alpha($black, 10%)

section.is-editable
  position: relative
  border: 1px solid transparent
  &:hover
    border: 1px solid alpha($black, 10%)

.column
  transition: 0.4s
</style>
