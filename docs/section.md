# Section

A section is the building block of the page, below is an example of a header section.
::: tip
  Examples use [pug](https://pugjs.org) template language to make it easier to work with templates.
:::

```pug
<template lang="pug">
  section.header(
    v-styler="$sectionData.classes"
    :class="[{'is-editable': $builder.isEditing}, $sectionData.classes]"
  )
    .container
      .grid
        .column.is-screen-6.add-center-vertical
          h3.header-title(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.title"
            v-styler="$sectionData.title"
          )
          p.header-content(
            :class="{'is-editable': $builder.isEditing}"
            v-html="$sectionData.content"
            v-styler="$sectionData.content"
          )
          a.button(
            :class="[{'is-editable': $builder.isEditing}, $sectionData.button.classes]"
            :href="$sectionData.button.href"
            v-html="$sectionData.button.text"
            v-styler="$sectionData.button"
          )
        .column.is-screen-6
          uploader(
            class="header-image"
            path="$sectionData.images[0]"
          )
</template>

<script>
  import { types } from 'vuse';

  export default {
    name: 'hero1',
    cover: '../covers/hero1.png',
    $schema: {
      title: types.Title,
      content: types.Text,
      images: [types.Image],
      button: types.Button,
      classes: types.ClassList
    },
    props: {
      id: Number
    }
  };
</script>
```

Each section has several elements that can be edited. Section data are stored in `$sectionData` object which is reactive.

## Adding the ability to edit elements in a section

1. Add `is-editable` class to it. Since editable state can be toggled off/on, it's always good to bind `is-editable` class to change when editing mode changes. e.g. `:class="{'is-editable': $builder.isEditing}"`
1. Add [`v-styler`](https://github.com/baianat/builder#v-styler) directive to the element
1. Bind the element’s innerHTML with its equivalent data e.g. `v-html="$sectionData.button.text"`
1. If you have any other data that `v-styler` changes, you have to bind it too. e.g. `:href="$sectionData.button.href"`

Putting it all together

```html
  <a
    :class="[{'button', 'is-editable': $builder.isEditing}, $sectionData.button.classes]"
    :href="$sectionData.button.href"
    v-html="$sectionData.button.text"
    v-styler="$sectionData.button"
  ></a>
```

After creating the HTML structure, you should configure the section schema to use the built-in seeder to provide you with initial/fake values when the component is instantiated in build/edit mode. Or you can set the initial values yourself instead of seeding them.

```html
<script>
  import { types } from 'vuse';

  export default {
    // section name
    name: 'hero1',
    // section cover image
    cover: '../cover-hero1.png',
    // group multiple sections
    group: 'heros',
    // section data schema
    $schema: {
      // main title
      title: types.Text,
      // main content
      content: types.Text,
      // section classes
      classes: types.ClassList,
      // array of section's images
      images: [
        types.Image,
        types.Image
      ],
      // object holds button data, href etc..
      button: types.Button,
      // if section has many columns you can use
      // a columns array to separate each column's data
      columns: [
      {
        title: types.Title,
        content: types.Text,
        group: types.group
      },
      {
        title: types.Title,
        group: types.group
      }
    ]
    },
    props: {
      id: Number // it is required to have an id prop.
    }
  };
</script>
```

## Using the section

Until now, we have only been creating our section component, we now need to introduce it to our builder so it can use it:

```js
import Builder from 'vuse';
import section from './components/sections/section';

// Builder has Vue-like API when registering components.
Builder.component(section);
Vue.use(Builder);

new Vue({
  el: '#app'
});
```

```html
<div id="app">
  <b-builder></b-builder>
</div>
```

You only have to register the component on the Builder plugin, which has a Vue-like API. This ensures your Vue global scope isn't polluted by the builder and keeps everything contained within the `b-builder` component.