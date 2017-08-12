<template lang="pug">
  section.social(
    v-styler:section="section" 
    :data-v-id="id"
    :class="[{'is-editable': editable}, section.class]"
  )
    .container
      .grid
        .row.is-center
          .column.is-screen-6
            p.social-quote(
              :class="{'is-editable': editable}"
              data-v-prop="content"
              v-html="content.text"
              v-styler:text="content"
            )
        .row.is-center
          .column.is-screen-2(v-for="(logo, index) in images")
            uploader(
              classes="social-logo"
              :imgURL="logo"
              :parentId="id"
              :imageId="index"
              :editable="editable"
            )
</template>

<script>
  import uploader from '../Uploader.vue';
  import { exciteEditable } from '../../util';

  export default {
    name: 'social2',
    props: {
      id: Number,
      editable: Boolean,
      content: Object,
      section: Object,
      images: Array
    },
    methods: {
      updateImage() {
        const file = this.$refs.uploader.files[0];
        this.$refs.image.src = URL.createObjectURL(file);
      }
    },
    components: {
      uploader: uploader
    },
    mounted() {
      exciteEditable(this.$el);
    }
  };
</script>
