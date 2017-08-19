<template lang="pug">
  section.social(
    v-styler:section="section"
    :class="[{'is-editable': $builder.isEditing}, section.class]"
  )
    .container
      .grid
        .row.is-center
          .column.is-screen-6
            p.social-quote(
              :class="{'is-editable': $builder.isEditing}"
              v-html="content.text"
              v-styler="content"
            )
        .row.is-center
          .column.is-screen-2
            .user.is-alt
              uploader(
                class="user-avatar"
                :imgURL="images[0]"
                :parentId="id"
                :imageId="0"
                :editable="editable"
              )
              .user-data
                h4.user-name Ahmed
                span.user-caption SEO at Baianat

</template>

<script>
export default {
  name: 'social2',
  props: {
    id: Number,
    editable: Boolean,
    content: Object,
    section: Object,
    images: Array
  }
};
</script>
