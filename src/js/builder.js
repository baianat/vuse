import Vue from 'vue';
import './bootstrap';
import Builder from './builderManager';
import { getSectionById, removeFromArray } from './util';

Vue.use(Builder);
const bus = new Vue();
Vue.prototype.$bus = bus;

new Vue({
  el: '#app',
  data: {
    docTitle: '',
    editable: true,
    elements: []
  },
  methods: {
    module () {
    }
  },
  created () {
    this.$bus.$on('addElement', (el) => {
      this.elements.push(el);
    });
    this.$bus.$on('editable', () => {
      this.editable = !this.editable;
      this.elements.forEach((el) => {
        el.editable = this.editable;
      })
    });
    this.$bus.$on('updateImage', (id, imgId, src) => {
      const section = getSectionById(this.elements, id);
      const imageId = Number(imgId);
      section.images[imageId] = src;
    });
    this.$bus.$on('updateHref', (id, newHref) => {
      const section = getSectionById(this.elements, id);
      section.button.href = newHref;
    });
    this.$bus.$on('removeSection', (id) => {
      const section = getSectionById(this.elements, id);
      const index = this.elements.indexOf(section);
      this.elements.splice(index, 1);
    });
    this.$bus.$on('addClass', (id, el, className) => {
      const section = getSectionById(this.elements, id);
      section[el].class.push(className);
    });
    this.$bus.$on('removeClass', (id, el, className) => {
      const section = getSectionById(this.elements, id);
      className.forEach((currentClass) => {
        removeFromArray(section[el].class, currentClass);
      });
    });
  },
  mounted () {
  }
});
