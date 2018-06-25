<template lang="pug">
  section.social(
    v-styler:section="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
  )
    .grid.is-center
      .column.is-screen-2.social-item
        h6.social-number(
          :class="{'is-editable': $builder.isEditing}"
          v-html="$sectionData.columns[0].content"
          v-styler="$sectionData.columns[0].content"
        )
        b.social-keyword(
          :class="{'is-editable': $builder.isEditing}"
          v-html="$sectionData.columns[0].title"
          v-styler="$sectionData.columns[0].title"
        )
      .column.is-screen-2.social-item
        h6.social-number(
          :class="{'is-editable': $builder.isEditing}"
          v-html="$sectionData.columns[1].content"
          v-styler="$sectionData.columns[1].content"
        )
        b.social-keyword(
          :class="{'is-editable': $builder.isEditing}"
          v-html="$sectionData.columns[1].title"
          v-styler="$sectionData.columns[1].title"
        )
      .column.is-screen-2.social-item
        h6.social-number(
          :class="{'is-editable': $builder.isEditing}"
          v-html="$sectionData.columns[2].content"
          v-styler="$sectionData.columns[2].content"
        )
        b.social-keyword(
          :class="{'is-editable': $builder.isEditing}"
          v-html="$sectionData.columns[2].title"
          v-styler="$sectionData.columns[2].title"
        )
</template>

<script>
import * as types from '../../types';

export default {
  name: 'social1',
  cover: 'img/covers/social1.png',
  group: 'social',
  $schema: {
    classes: types.ClassList,
    columns: [
      {
        title: types.Title,
        content: Number
      }, {
        title: types.Title,
        content: Number
      }, {
        title: types.Title,
        content: Number
      }
    ]
  },
  props: {
    id: Number
  }
};
</script>
