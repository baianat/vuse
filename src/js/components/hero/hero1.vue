<template lang="pug">
  section.header(
    v-styler="section"
    :class="[{'is-editable': $builder.isEditing}, section.class]"
    )
    .container
      .grid
        .column.is-screen-6.add-center-vertical
          h3.header-title(
            :class="{'is-editable': $builder.isEditing}"
            data-v-prop="title"
            v-html="title.text"
            v-styler="title"
          )
          p.header-content(
            :class="{'is-editable': $builder.isEditing}"
            data-v-prop="content"
            v-html="content.text"
            v-styler="content"
          )
          a.button(
            :class="[{'is-editable': $builder.isEditing}, button.class]"
            :href="button.href"
            data-v-prop="button"
            v-styler="button"
            v-html="button.text "
          )
        .column.is-screen-6
          uploader(
            class="header-image"
            :imgURL="images[0]"
            :imageId="0"
          )
</template>

<script>
export default {
  name: 'hero1',
  props: {
    id: Number,
    editable: Boolean,
    title: Object,
    content: Object,
    button: Object,
    section: Object,
    images: Array
  }
};
</script>
