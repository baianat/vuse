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
      newNode.id = 'newNode'
      document.body.appendChild(newNode);
      new StylerInstance({
        propsData: {
          el,
          section: vnode.context.$section,
          type: binding.arg || getTypeFromSchema(binding.expression, vnode.context.$section.schema) || getTypeFromTagName(el.tagName),
          name: binding.expression,
          editable: el.classList.contains('is-editable')
        }
      }).$mount('#newNode');
    }
  };
};

export default installStyler;
