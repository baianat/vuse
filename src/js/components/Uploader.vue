<template lang="pug">
  div(:class="[{ 'is-editable': $builder.isEditing }, 'uploader']")
    img(:src="src")
    input.uploader-input(
      type="file"
      ref="uploader"
      @change="updateImage"
      v-if="$builder.isEditing"
    )
</template>

<script>
export default {
  name: 'uploader',
  inject: ['$builder', '$section'],
  props: {
    imgURL: String,
    imageId: Number
  },
  data: () => ({
    src: ''
  }),
  methods: {
    updateImage () {
      const file = this.$refs.uploader.files[0];
      if (!file) {
        return;
      }
      const imageURL = URL.createObjectURL(file);
      this.src = imageURL;
      this.$section.data.images[this.imageId] = imageURL;
    }
  },
  created () {
    this.src = this.imgURL;
  }
}
</script>

<style lang="stylus">
  .uploader
    position: relative
    &-input
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      width: 100%
      opacity: 0
      z-index: 999
    >img
      width: 100%
</style>
