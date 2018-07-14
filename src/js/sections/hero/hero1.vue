<template lang="pug">
  section.header(
    v-styler="$sectionData.classes"
    :class="$sectionData.classes"
    )
    .container
      .grid
        .column.is-desktop-6.add-center-vertical
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
        .column.is-desktop-6
          uploader(
            class="header-image"
            path="$sectionData.images[0]"
          )
</template>

<script>
import * as types from '../../types';

export default {
  name: 'hero1',
  cover: 'img/covers/hero1.png',
  group: 'hero',
  $schema: {
    title: types.Title,
    content: types.Text,
    images: [types.Image],
    button: types.Button,
    classes: types.ClassList
  },
  props: {
    id: Number
  }
};
</script>
