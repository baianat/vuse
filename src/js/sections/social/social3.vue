<template lang="pug">
  section.social(
    v-styler:section="$sectionData.classes"
    :class="$sectionData.classes"
  )
    .container
      .grid
        .row.is-center
          .column.is-12.is-desktop-7
            h3.social-title(
              v-html="$sectionData.title"
              v-styler="$sectionData.title"
            )
          .column.is-12.is-desktop-7
            p.social-content(
              v-html="$sectionData.content"
              v-styler="$sectionData.content"
            )
        .row.is-center
          .column.is-desktop-2(v-for="(logo, index) in $sectionData.images")
            uploader(
              class="social-logo"
              :path="`$sectionData.images[${index}]`"
            )
</template>

<script>
import * as types from '../../types';

export default {
  name: 'social3',
  cover: 'img/covers/social3.png',
  group: 'social',
  $schema: {
    classes: types.ClassList,
    title: types.Title,
    content: types.Text,
    images: [
      types.Logo,
      types.Logo,
      types.Logo
    ]
  },
  props: {
    id: Number
  }
};
</script>
