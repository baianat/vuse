<template lang="pug">
  section.social(
    v-styler:section="section"
    :class="[{'is-editable': $builder.isEditing}, section.class]"
  )
    .grid.is-center
      .column.is-screen-2.social-item(v-for="(column, index) in columns")
        h6.social-number(
          :class="{'is-editable': $builder.isEditing}"
          :data-v-prop="`content-${index}`"
          v-html="column.content"
          v-styler:text="content"
        )
        b.social-keyword(
          :class="{'is-editable': $builder.isEditing}"
          :data-v-prop="`title-${index}`"
          v-html="column.title"
          v-styler:text="title"
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
