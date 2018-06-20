# Styler

This directive is automatically injected in your section components, and can be used to facilitate editing elements greatly, since it has support for multiple element types like `div`, `a`, `button` and `p` tags as well.

To tell styler which variable to update, you pass it as directive expression e.g. `v-styler="$sectionData.button"`

The styler directive has four types `text`, `button`, `section` or `grid`. By default, the directive can know the type implicitly, from the element tag or from the provided schema. 

If you want to explicitly specify the type, you can pass it as a directive modifier e.g. `v-styler.button="$sectionData.button"`.

## How to use

coming soon...
