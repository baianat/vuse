<template lang="pug">
  section.social(
    v-styler:section="$sectionData.classes"
    :class="$sectionData.classes"
  )
    .container
      .grid
        .row.is-center
          .column.is-desktop-6
            p.social-quote(
              v-html="$sectionData.content"
              v-styler="$sectionData.content"
            )
        .row.is-center
          .column.is-desktop-2
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
import * as types from '../../../src/types';

export default {
  name: 'Social2',
  cover: 'img/covers/social2.png',
  group: 'social',
  $schema: {
    classes: types.ClassList,
    content: types.Text,
    images: [types.Avatar]
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  }
};
</script>
