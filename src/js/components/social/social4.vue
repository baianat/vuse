<template lang="pug">
  section.social(
    v-styler:section="section"
    :class="[{'is-editable': $builder.isEditing}, section.class]"
  )
    .container
      .grid
        .row.is-center
          .column.is-12
            h3.social-title(
              :class="{'is-editable': $builder.isEditing}"
              data-v-prop="title"
              v-html="title.text"
              v-styler:text="title"
            )
        .row.is-center
          .column.is-12.is-screen-4
            p(
              :class="{'is-editable': $builder.isEditing}"
              data-v-prop="content-0"
              v-html="columns[0].content"
              v-styler:text="content-0"
            )
            .user
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

          .column.is-12.is-screen-4
              p(
                :class="{'is-editable': $builder.isEditing}"
                data-v-prop="content-1"
                v-html="columns[1].content"
                v-styler:text="content-1"
              )
              .user
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

          .column.is-12.is-screen-4
            p(
              :class="{'is-editable': $builder.isEditing}"
              data-v-prop="content-2"
              v-html="columns[2].content"
              v-styler:text="content-2"
            )
            .user
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
  name: 'social4',
  props: {
    id: Number,
    editable: Boolean,
    title: Object,
    content: Object,
    columns: Array,
    section: Object,
    images: Array
  }
};
</script>
