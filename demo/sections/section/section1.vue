<template lang="pug">
  section.section(
    v-styler="$sectionData.classes"
    :class="$sectionData.classes"
  )
    .container
      .grid.is-center
        .column(
          :class="gridClasses[0]"
          v-styler:grid="$sectionData.columns[0].grid"
        )
          h2.section-title(
            v-html="$sectionData.columns[0].title"
            v-styler="$sectionData.columns[0].title"
          )
          p.section-paragraph(
            v-html="$sectionData.columns[0].content"
            v-styler="$sectionData.columns[0].content"
          )
        .column.is-offset-screen-1(
          :class="gridClasses[1]"
          v-styler:grid="$sectionData.columns[1].grid"
        )
          h2.section-title(
            v-html="$sectionData.columns[1].title"
            v-styler="$sectionData.columns[1].title"
          )
          p.section-paragraph(
            v-html="$sectionData.columns[1].content"
            v-styler="$sectionData.columns[1].content"
          )
</template>

<script>
import * as types from '../../../src/types';

export default {
  name: 'Section1',
  cover: 'img/covers/section1.png',
  group: 'section',
  $schema: {
    classes: types.ClassList,
    columns: [
      {
        title: types.Title,
        content: types.Text,
        grid: {
          mobile: 0,
          desktop: 5
        }
      },
      {
        title: types.Title,
        content: types.Text,
        grid: {
          mobile: 0,
          desktop: 5
        }
      }
    ]
  },
  props: {
    id: {
      type: Number, required: true
    }
  }
};
</script>
