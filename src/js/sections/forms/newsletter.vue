<template lang="pug">
  section.header(
    v-styler:section="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
  )
    .grid.is-center
      .row
        h3.header-title Sign up for our newsletter

      form.row(@submit.prevent="onSubmit")
        .column.is-screen-4
          .input.is-button
            input.input(type="text" name="email" placeholder="Email address" v-model="$sectionData.form.email")
            a.button(
              @click.prevent="onSubmit"
              :class="[{'is-editable': $builder.isEditing}, $sectionData.action.classes]"
              :href="$sectionData.action.href"
              v-html="$sectionData.action.text"
              v-styler="$sectionData.action"
              )
</template>

<script>
import * as types from '../../types';

export default {
  name: 'newsletter',
  cover: 'img/covers/newsletter.png',
  group: 'forms',
  $schema: {
    classes: types.ClassList,
    action: types.Button,
    form: {
      email: ''
    }
  },
  props: {
    id: Number
  },
  methods: {
    onSubmit () {
      if (this.$builder.isEditing) return;

      const endpoint = this.$sectionData.action.href;
      console.log(`Pinging ${endpoint} with ${this.$sectionData.form.email}`);
      // SEND DATA TO ENDPOINT
    }
  }
};
</script>
