(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{244:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("p",[t._v("A section is the building block of the page, below is an example of a header section.")]),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("Examples use "),a("a",{attrs:{href:"https://pugjs.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("pug"),a("OutboundLink")],1),t._v(" template language to make it easier to work with templates.")])]),t._v(" "),t._m(1),t._m(2),t._v(" "),t._m(3),t._v(" "),a("ol",[t._m(4),t._v(" "),a("li",[t._v("Add "),a("a",{attrs:{href:"https://github.com/baianat/builder#v-styler",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("v-styler")]),a("OutboundLink")],1),t._v(" directive to the element")]),t._v(" "),t._m(5),t._v(" "),t._m(6)]),t._v(" "),a("p",[t._v("Putting it all together")]),t._v(" "),t._m(7),a("p",[t._v("After creating the HTML structure, you should configure the section schema to use the built-in seeder to provide you with initial/fake values when the component is instantiated in build/edit mode. Or you can set the initial values yourself instead of seeding them.")]),t._v(" "),t._m(8),t._m(9),t._v(" "),a("p",[t._v("Until now, we have only been creating our section component, we now need to introduce it to our builder so it can use it:")]),t._v(" "),t._m(10),t._m(11),t._m(12)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"section"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#section","aria-hidden":"true"}},[this._v("#")]),this._v(" Section")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-pug extra-class"},[a("pre",{pre:!0,attrs:{class:"language-pug"}},[a("code",[a("span",{attrs:{class:"token markup"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("lang")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("pug"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[t._v("section.header"),a("span",{attrs:{class:"token attributes"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{attrs:{class:"token attr-name"}},[t._v("v-styler")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"$sectionData.classes"')])]),t._v("\n    :"),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[t._v('"'),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token string"}},[t._v("'is-editable'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $builder"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isEditing"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(' $sectionData.classes]"\n  '),a("span",{attrs:{class:"token punctuation"}},[t._v(")")])])]),t._v("\n    "),a("span",{attrs:{class:"token tag"}},[t._v(".container")]),t._v("\n      "),a("span",{attrs:{class:"token tag"}},[t._v(".grid")]),t._v("\n        "),a("span",{attrs:{class:"token tag"}},[t._v(".column.is-desktop-6.add-center-vertical")]),t._v("\n          "),a("span",{attrs:{class:"token tag"}},[t._v("h3.header-title"),a("span",{attrs:{class:"token attributes"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n            :"),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v("\"{'is-editable': $builder.isEditing}\"")])]),t._v("\n            "),a("span",{attrs:{class:"token attr-name"}},[t._v("v-html")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"$sectionData.title"')])]),t._v("\n            "),a("span",{attrs:{class:"token attr-name"}},[t._v("v-styler")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"$sectionData.title"')])]),t._v("\n          "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")])])]),t._v("\n          "),a("span",{attrs:{class:"token tag"}},[t._v("p.header-content"),a("span",{attrs:{class:"token attributes"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n            :"),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v("\"{'is-editable': $builder.isEditing}\"")])]),t._v("\n            "),a("span",{attrs:{class:"token attr-name"}},[t._v("v-html")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"$sectionData.content"')])]),t._v("\n            "),a("span",{attrs:{class:"token attr-name"}},[t._v("v-styler")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"$sectionData.content"')])]),t._v("\n          "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")])])]),t._v("\n          "),a("span",{attrs:{class:"token tag"}},[t._v("a.button"),a("span",{attrs:{class:"token attributes"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n            :"),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[t._v('"'),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token string"}},[t._v("'is-editable'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $builder"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isEditing"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(' $sectionData.button.classes]"\n            :'),a("span",{attrs:{class:"token attr-name"}},[t._v("href")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"$sectionData.button.href"')])]),t._v("\n            "),a("span",{attrs:{class:"token attr-name"}},[t._v("v-html")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"$sectionData.button.text"')])]),t._v("\n            "),a("span",{attrs:{class:"token attr-name"}},[t._v("v-styler")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"$sectionData.button"')])]),t._v("\n          "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")])])]),t._v("\n        "),a("span",{attrs:{class:"token tag"}},[t._v(".column.is-desktop-6")]),t._v("\n          "),a("span",{attrs:{class:"token tag"}},[t._v("uploader"),a("span",{attrs:{class:"token attributes"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n            "),a("span",{attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"header-image"')])]),t._v("\n            "),a("span",{attrs:{class:"token attr-name"}},[t._v("path")]),a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token string"}},[t._v('"$sectionData.images[0]"')])]),t._v("\n          "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")])])]),t._v("\n"),a("span",{attrs:{class:"token markup"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])])]),t._v("\n\n"),a("span",{attrs:{class:"token markup"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token plain-text"}},[t._v("{ types } from 'vuse';")]),t._v("\n\n  "),a("span",{attrs:{class:"token tag"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token plain-text"}},[t._v("default {")]),t._v("\n    "),a("span",{attrs:{class:"token tag"}},[t._v("name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" 'hero1',\n    "),a("span",{attrs:{class:"token tag"}},[t._v("cover"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" '"),a("span",{attrs:{class:"token punctuation"}},[t._v("..")]),t._v("/covers/hero1"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("png',\n    $schema: {\n      "),a("span",{attrs:{class:"token tag"}},[t._v("title"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" "),a("span",{attrs:{class:"token tag"}},[t._v("types.Title")]),t._v(",\n      "),a("span",{attrs:{class:"token tag"}},[t._v("content"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" "),a("span",{attrs:{class:"token tag"}},[t._v("types.Text")]),t._v(",\n      "),a("span",{attrs:{class:"token tag"}},[t._v("images"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" [types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Image],\n      "),a("span",{attrs:{class:"token tag"}},[t._v("button"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" "),a("span",{attrs:{class:"token tag"}},[t._v("types.Button")]),t._v(",\n      "),a("span",{attrs:{class:"token tag"}},[t._v("classes"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" "),a("span",{attrs:{class:"token tag"}},[t._v("types.ClassList")]),t._v("\n    },\n    "),a("span",{attrs:{class:"token tag"}},[t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" {\n      "),a("span",{attrs:{class:"token tag"}},[t._v("id"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" {\n        "),a("span",{attrs:{class:"token tag"}},[t._v("type"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" "),a("span",{attrs:{class:"token tag"}},[t._v("Number")]),t._v(",\n        "),a("span",{attrs:{class:"token tag"}},[t._v("required"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")])]),t._v(" "),a("span",{attrs:{class:"token tag"}},[t._v("true")]),t._v("\n      }\n    }\n  };\n"),a("span",{attrs:{class:"token markup"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Each section has several elements that can be edited. Section data are stored in "),s("code",[this._v("$sectionData")]),this._v(" object which is reactive.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"adding-the-ability-to-edit-elements-in-a-section"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#adding-the-ability-to-edit-elements-in-a-section","aria-hidden":"true"}},[this._v("#")]),this._v(" Adding the ability to edit elements in a section")])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[this._v("Add "),s("code",[this._v("is-editable")]),this._v(" class to it. Since editable state can be toggled off/on, it's always good to bind "),s("code",[this._v("is-editable")]),this._v(" class to change when editing mode changes. e.g. "),s("code",[this._v(":class=\"{'is-editable': $builder.isEditing}\"")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[this._v("Bind the element’s innerHTML with its equivalent data e.g. "),s("code",[this._v('v-html="$sectionData.button.text"')])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[this._v("If you have any other data that "),s("code",[this._v("v-styler")]),this._v(" changes, you have to bind it too. e.g. "),s("code",[this._v(':href="$sectionData.button.href"')])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[t._v("  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("a")]),t._v("\n    "),a("span",{attrs:{class:"token attr-name"}},[t._v(":class")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("[{"),a("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("button"),a("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", "),a("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v("is-editable"),a("span",{attrs:{class:"token punctuation"}},[t._v("'")]),t._v(": $builder.isEditing}, $sectionData.button.classes]"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{attrs:{class:"token attr-name"}},[t._v(":href")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("$sectionData.button.href"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{attrs:{class:"token attr-name"}},[t._v("v-html")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("$sectionData.button.text"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{attrs:{class:"token attr-name"}},[t._v("v-styler")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("$sectionData.button"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("a")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token script language-javascript"}},[t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" types "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'vuse'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// section name")]),t._v("\n    name"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'hero1'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// section cover image")]),t._v("\n    cover"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'../cover-hero1.png'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// group multiple sections")]),t._v("\n    group"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'heros'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// section data schema")]),t._v("\n    $schema"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// main title")]),t._v("\n      title"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Text"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// main content")]),t._v("\n      content"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Text"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// section classes")]),t._v("\n      classes"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ClassList"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// array of section's images")]),t._v("\n      images"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Image"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Image\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// object holds button data, href etc..")]),t._v("\n      button"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Button"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// if section has many columns you can use")]),t._v("\n      "),a("span",{attrs:{class:"token comment"}},[t._v("// a columns array to separate each column's data")]),t._v("\n      columns"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        title"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Title"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        content"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Text"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        group"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("group\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        title"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Title"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        group"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" types"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("group\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    props"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         id"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("       type"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Number"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("       required"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),t._v("     "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// it is required to have an id prop.")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"using-the-section"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#using-the-section","aria-hidden":"true"}},[this._v("#")]),this._v(" Using the section")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Builder "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'vuse'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" section "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'./components/sections/section'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// Builder has Vue-like API when registering components.")]),t._v("\nBuilder"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("component")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("section"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nVue"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("use")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Builder"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  el"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'#app'")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("app"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("b-builder")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("b-builder")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("You only have to register the component on the Builder plugin, which has a Vue-like API. This ensures your Vue global scope isn't polluted by the builder and keeps everything contained within the "),s("code",[this._v("b-builder")]),this._v(" component.")])}],!1,null,null,null);s.default=e.exports}}]);