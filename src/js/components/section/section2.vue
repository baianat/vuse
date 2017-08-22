<template lang="pug">
  section.section(
    v-styler:section="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
  )
    .container
      .grid.is-center
        .column.is-screen-4
          h2.section-title(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.columns[0].title"
            v-styler="$sectionData.columns[0].title"
          )
          p.section-paragraph(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.columns[0].content"
            v-styler="$sectionData.columns[0].content"
          )
        .column.is-screen-4
          h2.section-title(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.columns[1].title"
            v-styler="$sectionData.columns[1].title"
          )
          p.section-paragraph(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.columns[1].content"
            v-styler="$sectionData.columns[1].content"
          )
        .column.is-screen-4
          h2.section-title(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.columns[2].title"
            v-styler="$sectionData.columns[2].title"
          )
          p.section-paragraph(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.columns[2].content"
            v-styler="$sectionData.columns[2].content"
          )
</template>

<script>
import * as types from '../../types';

export default {
  name: 'section2',
  $schema: {
    classes: types.ClassList,
    columns: [
      {
        title: types.Title,
        content: types.Text
      }, {
        title: types.Title,
        content: types.Text
      }, {
        title: types.Title,
        content: types.Text
      }
    ]
  },
  props: {
    id: Number
  }
};
</script>
