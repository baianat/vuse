<template lang="pug">
  section.social(
    v-styler:section="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
  )
    .container
      .grid
        .row.is-center
          .column.is-screen-6
            p.social-quote(
              :class="{'is-editable': $builder.isEditing}"
              v-html="$sectionData.content"
              v-styler="$sectionData.content"
            )
        .row.is-center
          .column.is-screen-2
            .user.is-alt
              uploader(
                class="user-avatar"
                path="$sectionData.images[0]"
              )
              .user-data
                h4.user-name Ahmed
                span.user-caption SEO at Baianat

</template>

<script>
import * as types from '../../types';

export default {
  name: 'social2',
  cover: 'img/covers/social2.png',
  group: 'social',
  $schema: {
    classes: types.ClassList,
    content: types.Text,
    images: [types.Avatar]
  },
  props: {
    id: Number
  }
};
</script>
