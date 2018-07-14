import Styler from './components/Styler';
import { getTypeFromTagName, getTypeFromSchema } from './util';

function installStyler ({ builder, Vue }) {
  const StylerInstance = Vue.extend(Styler).extend({
    beforeCreate () {
      this.$builder = builder;
    }
  });

  builder.styler = {
    inserted (el, binding, vnode) {
      const newNode = document.createElement('div');
      const section = vnode.context.$section;
      const rootApp = vnode.context.$root.$el;
      rootApp.appendChild(newNode);
      el.classList.add('is-editable');
      section.stylers.push(new StylerInstance({
        propsData: {
          el,
          section: section,
          type: binding.arg || getTypeFromSchema(binding.expression, section.schema) || getTypeFromTagName(el.tagName),
          name: binding.expression
        }
      }).$mount(newNode));
    }
  };
};

export default installStyler;
