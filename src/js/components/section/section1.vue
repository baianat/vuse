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
            data-v-prop="title-0"
            v-html="columns[0].title"
            v-styler:text="title-0"
            )
          p.section-paragraph(
            :class="{'is-editable': $builder.isEditing}"
            data-v-prop="content-0"
            v-html="columns[0].content"
            v-styler:text="content-0"
            )
        .column.is-screen-5.is-offset-screen-1
          h2.section-title(
            :class="{'is-editable': $builder.isEditing}"
            data-v-prop="title-1"
            v-html="columns[1].title"
            v-styler:text="title-1"
            )
          p.section-paragraph(
            :class="{'is-editable': $builder.isEditing}"
            data-v-prop="content-1"
            v-html="columns[1].content"
            v-styler:text="content-1"
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
