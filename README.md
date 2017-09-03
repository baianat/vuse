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

TODO

## License

MIT
