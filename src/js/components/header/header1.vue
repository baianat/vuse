<template lang="pug">
  header.header(
    v-styler:section="section"
    :data-v-id="id"
    :class="[{'is-editable': editable}, section.class]"
    )
    .container
      .grid
        .column.is-screen-6.add-center-vertical
          h3.header-title(
            :class="{'is-editable': editable}"
            data-v-prop="title"
            v-html="title.text"
            v-styler:text="title"
            )
          p.header-content(
            :class="{'is-editable': editable}"
            data-v-prop="content"
            v-html="content.text"
            v-styler:text="content"
            )
          a.button(
            :class="[{'is-editable': editable}, button.class]"
            :href="button.href"
            data-v-prop="button"
            v-styler:button="button"
            v-html="button.text "
            )
        .column.is-screen-6
          uploader(
            class="header-image"
            :editable="editable"
            :imgURL="images[0]"
            :parentId="id"
            :imageId="0"
          )
</template>

<script>
import uploader from '../Uploader.vue';
import { exciteEditable } from '../../util';

export default {
  name: 'header1',
  props: {
    id: Number,
    editable: Boolean,
    title: Object,
    content: Object,
    button: Object,
    section: Object,
    images: Array
  },
  components: {
    uploader: uploader
  },
  mounted () {
    exciteEditable(this.$el);
  }
};
</script>
