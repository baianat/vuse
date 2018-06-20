# API

Your section components will have some properties injected to help you customize their behavior in building phase and production/render phase.

## $section

An instance of the [section class](https://github.com/baianat/vuse/blob/master/src/js/section.js) that represents this component.

## $builder

An instance of the singleton [builder class](https://github.com/baianat/vuse/blob/master/src/js/builder.js)

## $sectionData

Is a computed property that mirrors `$section.data` which contains the current values (text, images, etc...) for the section.
