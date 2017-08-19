<template lang="pug">
  section.social(
    v-styler:section="section"
    :class="[{'is-editable': $builder.isEditing}, section.class]"
  )
    .container
      .grid
        .row.is-center
          .column.is-12.is-screen-7
            h3.social-title(
              :class="{'is-editable': $builder.isEditing}"
              v-html="title.text"
              v-styler="title"
            )
          .column.is-12.is-screen-7
            p.social-content(
              :class="{'is-editable': $builder.isEditing}"
              v-html="content.text"
              v-styler="content"
            )
        .row.is-center
          .column.is-screen-2(v-for="(logo, index) in images")
            uploader(
              class="social-logo"
              :imgURL="logo"
              :parentId="id"
              :imageId="index"
              :editable="editable"
            )
</template>

<script>
export default {
  name: 'social3',
  props: {
    id: Number,
    editable: Boolean,
    title: Object,
    content: Object,
    section: Object,
    images: Array
  }
};
</script>
