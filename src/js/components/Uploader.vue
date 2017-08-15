<template lang="pug">
  div(:class="[{ 'is-editable': editable }, 'uploader']")
    img(:src="imgURL" :data-v-id="imageId" ref="image")
    input.uploader-input(
      type="file"
      ref="uploader"
      @change="updateImage"
      v-if="editable"
    )
</template>

<script>
export default {
  name: 'ploader',
  props: {
    imgURL: String,
    editable: Boolean,
    parentId: Number,
    imageId: Number
  },
  methods: {
    updateImage () {
      const file = this.$refs.uploader.files[0];
      const imageURL = URL.createObjectURL(file);
      this.$refs.image.src = imageURL;
      this.$bus.$emit('updateImage', this.$props.parentId, this.$refs.image.dataset.vId, imageURL);
    }
  }
}
</script>

<style lang="stylus">
  .uploader
    position: relative
    padding: 0 10px
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
