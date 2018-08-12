<template lang="pug">
  section.header(
    v-styler:section="$sectionData.classes"
    :class="$sectionData.classes"
  )
    .container
      .grid.is-center
        .row
          h3.header-title Sign up for our newsletter

        form.row(@submit.prevent="onSubmit")
          .column.is-desktop-4
            .input-group.has-itemAfter
              input.input(type="text" name="email" placeholder="Email address" v-model="$sectionData.form.email")
              a.button(
                @click.prevent="onSubmit"
                :class="$sectionData.action.classes"
                :href="$sectionData.action.href"
                v-html="$sectionData.action.text"
                v-styler="$sectionData.action"
                )
</template>

<script>
import * as types from '../../../src/types';

export default {
  name: 'Newsletter',
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
    id: {
      type: Number,
      required: true
    }
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
