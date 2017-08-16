<template lang="pug">
  div
    #artboard.artboard
      component(v-for='section in $builder.sections'
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

    controller(:show-intro='!$builder.sections.length')
</template>

<script>
import Controller from './Controller';

export default {
  name: 'builder',
  components: { Controller }
};
</script>
