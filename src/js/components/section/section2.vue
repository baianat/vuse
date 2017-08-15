<template lang="pug">
  section.section(
    v-styler:section="section"
    :data-v-id="id"
    :class="[{'is-editable': editable}, section.class]"
  )
    .container
      .grid.is-center
        .column.is-screen-4(v-for="(column, index) in columns")
          h2.section-title(
            :class="{'is-editable': editable}"
            :data-v-prop="`title-${index}`"
            v-html="column.title"
            v-styler:text="title"
            )
          p.section-paragraph(
            :class="{'is-editable': editable}"
            :data-v-prop="`content-${index}`"
            v-html="column.content"
            v-styler:text="content"
            )
</template>

<script>
import { exciteEditable } from '../../util';

export default {
  name: 'section2',
  props: {
    id: Number,
    title: Object,
    content: Object,
    editable: Boolean,
    section: Object,
    columns: Array
  },
  mounted () {
    exciteEditable(this.$el);
  }
};
</script>
