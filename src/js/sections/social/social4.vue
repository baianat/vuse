<template lang="pug">
  section.social(
    v-styler:section="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
  )
    .container
      .grid
        .row.is-center
          .column.is-12
            h3.social-title(
              :class="{'is-editable': $builder.isEditing}"
              v-html="$sectionData.title"
              v-styler="$sectionData.title"
            )
        .row.is-center
          .column.is-12.is-screen-4
            p(
              :class="{'is-editable': $builder.isEditing}"
              v-html="$sectionData.columns[0].content"
              v-styler="$sectionData.columns[0].content"
            )
            .user
              uploader(
                class="user-avatar"
                path="$sectionData.images[0]"
              )
              .user-data
                h4.user-name Ahmed
                span.user-caption SEO at Baianat

          .column.is-12.is-screen-4
              p(
                :class="{'is-editable': $builder.isEditing}"
                v-html="$sectionData.columns[1].content"
                v-styler:text="$sectionData.columns[1].content"
              )
              .user
                uploader(
                  class="user-avatar"
                  path="$sectionData.images[1]"
                )
                .user-data
                  h4.user-name Ahmed
                  span.user-caption SEO at Baianat

          .column.is-12.is-screen-4
            p(
              :class="{'is-editable': $builder.isEditing}"
              v-html="$sectionData.columns[2].content"
              v-styler:text="$sectionData.columns[2].content"
            )
            .user
              uploader(
                class="user-avatar"
                path="$sectionData.images[2]"
              )
              .user-data
                h4.user-name Ahmed
                span.user-caption SEO at Baianat
</template>

<script>
import * as types from '../../types';

export default {
  name: 'social4',
  cover: 'img/covers/social4.png',
  group: 'social',
  $schema: {
    classes: [types.ClassList],
    title: types.Title,
    columns: [
      { content: types.Text },
      { content: types.Text },
      { content: types.Text }
    ],
    images: [
      types.Avatar,
      types.Avatar,
      types.Avatar
    ]
  },
  props: {
    id: Number
  }
};
</script>
