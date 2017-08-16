<template lang="pug">
  #artboard.artboard
    component(
      v-for='section in $builder.sections'
      :is='section.name'
      :key='section.id'
      :id='section.id'
      :content='section.data.content'
      :title='section.data.title'
      :button='section.data.button'
      :images='section.data.images'
      :section='section.data.section'
      :columns='section.data.columns'
    )
</template>

<script>
export default {
  name: 'renderer',
  props: {
    renderData: {
      type: Object,
      required: true
    }
  },
  beforeCreate () {
    this.$builder = {
      isEditable: false,
      title: this.$options.propsData.renderData.title,
      sections: this.$options.propsData.renderData.sections
    };
  }
};
</script>
