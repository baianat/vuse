import Vue from 'vue';
import Uploader from './components/Uploader'
import '../stylus/app.styl';
import Builder from './builder';
import hero1 from './components/hero/hero1';
import hero2 from './components/hero/hero2';
import section1 from './components/section/section1';
import section2 from './components/section/section2';
import social1 from './components/social/social1';
import social2 from './components/social/social2';
import social3 from './components/social/social3';
import social4 from './components/social/social4';
import zip from './plugins/zip';

// add the uploader to the list of sub-components.
Builder.mix({
  components: {
    Uploader
  }
});

// register components.
Builder.component(hero1);
Builder.component(hero2);
Builder.component(section1);
Builder.component(section2);
Builder.component(social1);
Builder.component(social2);
Builder.component(social3);
Builder.component(social4);

// install zip plugin.
Builder.use(zip);

// install the builder
Vue.use(Builder);

new Vue({
  el: '#app',
  mounted () {
    this.$on('saved', () => {
      // the way to export the site
      this.$builder.export('preview');
    })
  }
});
