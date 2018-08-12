<template lang="pug">
  section.header(
    v-styler="$sectionData.classes"
    :class="$sectionData.classes"
    )
    .container
      .grid
        .column.is-desktop-6.is-offset-screen-3.add-center-horizontal.add-padding.add-text-center
          h3.header-title(
            v-html="$sectionData.title"
            v-styler="$sectionData.title"
            )
          p.header-content(
            v-html="$sectionData.content"
            v-styler="$sectionData.content"
            )
          a.button(
            :class="$sectionData.button.classes"
            :href="$sectionData.button.href"
            v-html="$sectionData.button.text"
            v-styler="$sectionData.button"
            )
        .column.is-desktop-8.is-offset-screen-2
          uploader(
            class="header-image"
            path="$sectionData.images[0]"
          )
</template>

<script>
import * as types from '../../../src/types';

export default {
  name: 'Hero2',
  cover: 'img/covers/hero2.png',
  group: 'hero',
  $schema: {
    title: types.Title,
    content: types.Text,
    images: [types.Image],
    button: types.Button,
    classes: types.ClassList
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  }
};
</script>
