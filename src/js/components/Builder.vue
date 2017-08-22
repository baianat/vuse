<template lang="pug">
  div
    #artboard.artboard
      component(v-for='section in $builder.sections'
        :is='section.name'
        :key='section.id'
        :id='section.id'
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
