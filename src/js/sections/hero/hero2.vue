<template lang="pug">
  section.header(
    v-styler="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
    )
    .container
      .grid
        .column.is-screen-6.is-offset-screen-3.add-center-horizontal.add-padding.add-text-center
          h3.header-title(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.title"
            v-styler="$sectionData.title"
            )
          p.header-content(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.content"
            v-styler="$sectionData.content"
            )
          a.button(
            :class="[{'is-editable': $builder.isEditing}, $sectionData.button.classes]"
            :href="$sectionData.button.href"
            v-html="$sectionData.button.text"
            v-styler="$sectionData.button"
            )
        .column.is-screen-8.is-offset-screen-2
          uploader(
            class="header-image"
            path="$sectionData.images[0]"
          )
</template>

<script>
import * as types from '../../types';

export default {
  name: 'hero2',
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
    id: Number
  }
};
</script>
