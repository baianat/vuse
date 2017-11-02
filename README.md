# builder

**This is still a work-in-progress and not ready for production**

Advanced page builder based on [Vue.js](https://vuejs.org/).

## What is this?

This builder (sections builder) reuses your Vue components which we will can **editable sections** to produce an interactive page builder to the end user, you can use it as a prototyping tool as well as it is sort-of a block builder.

The user/developer can then export the builder for usability in the following formats:

- `zip` produces a zip file which contains all the page files and images neatly packed, this is probably what will your end users will use.
- `preview` opens a new page without the editable logic in new tap to see the end result.
- `json` A json object which can be later used to re-render built page, particualry useful if you plan to have dynamic pages or want to store them in a Database.


All this functionality is exposed as a Vue.js plugin, which means you can integrate it in your own projects that may need this functionality.

## Installation

### Package managers
First step is to install it using `yarn` or `npm`:

```bash
npm install @baianat/builder

# or use yarn
yarn add @baianat/builder
```

### CDNs

Or add it as a script tag in your projects.

- [unpkg](https://unpkg.com/@baianat/builder@latest)

```html
<script src="https://unpkg.com/vue@2.4.2"></script>
<script src="https://unpkg.com/@baianat/builder@latest"></script>
```

### Usage

**If you added it using a script tag, you can skip this section. as it will be auto-installed for you**

```js
import Builder from '@baianat/builder';

Vue.use(Builder);
```

And you are done, the builder is installed, you can start using the `b-builder` component to build things now.

But that does not accomplish much, you can't build sections without having any. This repository only contains the core package, **we will be adding a huge number of sections soon to be used with this one**. You can use the included examples after reading the API to build your own for now.

## API

### Section

complete example for working section
> here we are using [NARX](https://github.com/baianat/NARX) patterns library for grid and UI elements.

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
  import * as types from '../../types';

  export default {
    name: 'hero1',
    cover: 'static/covers/hero1.png',
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

Each section has several elements that can be edit
we store elements data in `$sectionData` object to be able to track them and update Vue data
So, how to make any element editable

1. You have to give it `is-editable` class. because editable state can be toggled off/on it always good to bind is-editable class to change when editing mode changes `:class="{'is-editable': $builder.isEditing}"`
1. Add `v-styler` to the element it's the responsable for editing data and spicify which data to be edited  `v-styler="$sectionData.button"`
1. Updates the element’s innerHTML `v-html="$sectionData.button.text"`
1. If you have any other data that `v-styler` changes you have to update it too e.g. `:href="$sectionData.button.href"`

Put all toghter

```pug
  a(
    :class="[{'button', 'is-editable': $builder.isEditing}, $sectionData.button.classes]"
    :href="$sectionData.button.href"
    v-html="$sectionData.button.text"
    v-styler="$sectionData.button"
  )
```

After create HTML structure you have to config the section schema for instance

```html
<script>
  import * as types from '../../types';

  export default {
    // section name
    name: 'hero1',
    // section cover image
    cover: '../cover-hero1.png',
    // section data schema
    $schema: {
      // main title
      title: types.Text,
      // main content
      content: types.Text,
      // section classese
      classes: types.ClassList,
      // array of section's images
      images: [
        types.Image,
        types.Image
      ],
      // object holds button data, href etc..
      button: types.Button,
      // if section has many columns you can
      // columns to sperate each column date
      columns: [
      {
        title: types.Title,
        content: types.Text
      },
      {
        title: types.Title,
        content: types.Text
      }
    ]
    },
    // you have to allow id prop in section
    props: {
      id: Number
    }
  };
</script>
```

![hero section](https://baianat.github.io/builder/static/examples/hero1.png)
## License

MIT
