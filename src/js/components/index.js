import Styler from './Styler';
import Controller from './Controller';
import header1 from './header/header1';
import header2 from './header/header2';
import section1 from './section/section1';
import section2 from './section/section2';
import social1 from './social/social1';
import social2 from './social/social2';
import Uploader from './Uploader'

const install = (Vue) => {
  Vue.component(Uploader.name, Uploader);
  Vue.component(Controller.name, Controller);
  Vue.component(header1.name, header1);
  Vue.component(header2.name, header2);
  Vue.component(section1.name, section1);
  Vue.component(section2.name, section2);
  Vue.component(social1.name, social1);
  Vue.component(social2.name, social2);

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
};

export default install;
