<template lang="pug">
  section.social(
    v-styler:section="section"
    :class="[{'is-editable': $builder.isEditing}, section.class]"
  )
    .grid.is-center
      .column.is-screen-2.social-item
        h6.social-number(
          :class="{'is-editable': $builder.isEditing}"
          v-html="column.content"
          v-styler="columns[0].content"
        )
        b.social-keyword(
          :class="{'is-editable': $builder.isEditing}"
          v-html="column.title"
          v-styler="columns[0].title"
        )
      .column.is-screen-2.social-item
        h6.social-number(
          :class="{'is-editable': $builder.isEditing}"
          v-html="column.content"
          v-styler="columns[1].content"
        )
        b.social-keyword(
          :class="{'is-editable': $builder.isEditing}"
          v-html="column.title"
          v-styler="columns[1].title"
        )
      .column.is-screen-2.social-item
        h6.social-number(
          :class="{'is-editable': $builder.isEditing}"
          v-html="column.content"
          v-styler="columns[2].content"
        )
        b.social-keyword(
          :class="{'is-editable': $builder.isEditing}"
          v-html="column.title"
          v-styler="columns[2].title"
        )
</template>

<script>
import styler from '../Styler';

export default {
  name: 'social1',
  props: {
    id: Number,
    title: Object,
    content: Object,
    editable: Boolean,
    section: Object,
    columns: Array
  },
  methods: {
    updateImage () {
      const file = this.$refs.uploader.files[0];
      this.$refs.image.src = URL.createObjectURL(file);
    }
  },
  components: {
    styler: styler
  }
};
</script>
