/**
 * import all components
 */
import Vue from 'vue';
import Styler from './Styler.vue';
import Controller from './Controller.vue';

import header1 from './header/header1.vue';
import header2 from './header/header2.vue';
import section1 from './section/section1.vue';
import section2 from './section/section2.vue';
import social1 from './social/social1.vue';
import social2 from './social/social2.vue';

const StylerInstance = Vue.extend(Styler);

/**
 * creat Vue styler directive
 */
Vue.directive('styler', {
  inserted (el, binding, vnode) {
    const newNode = document.createElement('div');
    newNode.id = 'newNode'
    el.parentNode.appendChild(newNode);
    const styler = new StylerInstance({
      propsData: {
        el: el,
        type: binding.arg,
        name: binding.expression,
        editable: el.classList.contains('is-editable')
      }
    }).$mount('#newNode');
    styler.$section = vnode.context.$section;
  }
});

/**
 * bind all builder elements to Vue components
 */
Vue.component(Controller.name, Controller);

Vue.component(header1.name, header1);
Vue.component(header2.name, header2);
Vue.component(section1.name, section1);
Vue.component(section2.name, section2);
Vue.component(social1.name, social1);
Vue.component(social2.name, social2);
