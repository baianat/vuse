<template lang="pug">
  #artboard.artboard
    component(v-for='section in $builder.sections'
      :is='section.name'
      :key='section.id'
      :id='section.id'
    )
</template>

<script>
export default {
  name: 'b-renderer',
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
