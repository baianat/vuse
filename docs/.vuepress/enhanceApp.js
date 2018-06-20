import Builder from '../../src/js/builder';
import Uploader from '../../src/js/components/Uploader.vue'
// import pwa from '../../src/js/plugins/pwa';
import '../../src/stylus/app.styl';

import hero1 from '../../src/js/sections/hero/hero1';
import hero2 from '../../src/js/sections/hero/hero2';
import section1 from '../../src/js/sections/section/section1';
import section2 from '../../src/js/sections/section/section2';
import social1 from '../../src/js/sections/social/social1';
import social2 from '../../src/js/sections/social/social2';
import social3 from '../../src/js/sections/social/social3';
import social4 from '../../src/js/sections/social/social4';
import newsletter from '../../src/js/sections/forms/newsletter';

const sections = [
  hero1,
  hero2,
  section1,
  section2,
  social1,
  social2,
  social3,
  social4,
  newsletter
]

// add the uploader to the list of sub-components.
Builder.mix({
  components: {
    Uploader
  }
});

// register components.
sections.forEach(section => {
  normalize(section);
  Builder.component(section);
})



// // install pwa plugin.
// Builder.use(pwa);

// new Vue({
//   el: '#app',
//   methods: {
//     onSave (builder) {
//       builder.export('preview');
//       builder.export('pwa');
//     }
//   }
// });


export default ({ Vue }) => {
  // install the builder
  Vue.use(Builder, {
    themes: [{
      name: 'Theme 1',
      sections: [hero1, section1, social1, social3, newsletter]
    }, {
      name: 'Theme 2',
      sections: [hero2, section2, social3, social4, newsletter]
    }]
  });
}


function normalize (component) {
  component.cover = component.cover.replace('static', '.');
}