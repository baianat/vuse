<template lang="pug">
  section.section(
    v-styler="$sectionData.classes"
    :class="[{ 'is-editable': $builder.isEditing }, $sectionData.classes]"
  )
    .container
      .grid.is-center
        .column(
          :class="[{'is-editable': $builder.isEditing}, gridClasses[0]]"
          v-styler:grid="$sectionData.columns[0].grid"
        )
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
        .column.is-offset-screen-1(
          :class="[{ 'is-editable': $builder.isEditing }, gridClasses[1]]"
          v-styler:grid="$sectionData.columns[1].grid"
        )
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
</template>

<script>
import * as types from '../../types';

export default {
  name: 'section1',
  cover: 'img/covers/section1.png',
  group: 'section',
  $schema: {
    classes: types.ClassList,
    columns: [
      {
        title: types.Title,
        content: types.Text,
        grid: {
          mobile: '',
          screen: 'is-screen-5'
        }
      },
      {
        title: types.Title,
        content: types.Text,
        grid: {
          mobile: '',
          screen: 'is-screen-5'
        }
      }
    ]
  },
  props: {
    id: Number
  }
};
</script>
