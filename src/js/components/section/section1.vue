<template lang="pug">
  section.section(
    v-styler:section="section"
    :class="[{'is-editable': $builder.isEditing}, section.class]"
  )
    .container
      .grid.is-center
        .column.is-screen-5
          h2.section-title(
            :class="{'is-editable': $builder.isEditing}"
            v-html="columns[0].title"
            v-styler="columns[0].title"
          )
          p.section-paragraph(
            :class="{'is-editable': $builder.isEditing}"
            v-html="columns[0].content"
            v-styler="columns[0].content"
          )
        .column.is-screen-5.is-offset-screen-1
          h2.section-title(
            :class="{'is-editable': $builder.isEditing}"
            v-html="columns[1].title"
            v-styler="columns[1].title"
          )
          p.section-paragraph(
            :class="{'is-editable': $builder.isEditing}"
            v-html="columns[1].content"
            v-styler="columns[1].content"
          )
</template>

<script>
export default {
  name: 'section1',
  props: {
    id: Number,
    title: Object,
    content: Object,
    editable: Boolean,
    section: Object,
    columns: Array
  }
};
</script>
