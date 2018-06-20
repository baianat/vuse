# getting-started

## What is this

This builder (sections builder) reuses your Vue components as **editable sections** to produce an interactive page builder to the end user, you can use it as a prototyping tool as well as it is sort-of a block builder.

The user/developer can then export the builder for usability in multiple formats, the following are the officially supported ones:

- `json` A json object which can be later used to re-render a page, particularly useful if you plan to have dynamic pages or want to store them in a Database.
- `preview` opens a new page without the editable logic in new tab to see the end result.
- `pwa` produces a zip file which contains all the page files and images neatly packed, this is probably the format you will use for page/prototype landing page builder, The project is augmented by default with service workers to support offline viewing.

The builder is just a Vue plugin, so you can integrate this into your own projects without needing to create separate bundles for it.

## Installation

### Package managers

First step is to install it using `yarn` or `npm`:

```bash
npm install vuse

# or use yarn
yarn add vuse
```

### CDNs

Or add it as a script tag in your projects.

- [unpkg](https://unpkg.com/vuse)

```html
<script src="https://unpkg.com/vue@2.4.2"></script>
<script src="https://unpkg.com/vuse"></script>
```

### Usage

::: tip
  If you added it using a script tag, you can skip this section. as it will be auto-installed for you
:::

```js
import Builder from 'vuse';

Vue.use(Builder);
```

You can start using the `b-builder` component to build things now.

This package does not include any sections. The builder is just a system of helpers for managing customizable sections, seeding fake data, exporting views and re-rendering them. The logic for your components/sections is written by you eventually. **we will be adding a huge number of sections soon to be used with this one**. You can use the included examples after reading the API to build your own for now.