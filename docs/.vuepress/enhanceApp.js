// Vuse scripts
import Vuse from '../../src';

// demo scripts
import '../../demo/style/_demo.styl';
import Uploader from '../../demo/Uploader.vue'
import hero1 from '../../demo/sections/hero/hero1';
import hero2 from '../../demo/sections/hero/hero2';
import section1 from '../../demo/sections/section/section1';
import section2 from '../../demo/sections/section/section2';
import social1 from '../../demo/sections/social/social1';
import social2 from '../../demo/sections/social/social2';
import social3 from '../../demo/sections/social/social3';
import social4 from '../../demo/sections/social/social4';
import newsletter from '../../demo/sections/forms/newsletter';

// add the uploader to the list of sub-components.
Vuse.mix({
  components: {
    Uploader
  }
});

// register components.
Vuse.component(hero1);
Vuse.component(hero2);
Vuse.component(section1);
Vuse.component(section2);
Vuse.component(social1);
Vuse.component(social2);
Vuse.component(social3);
Vuse.component(social4);
Vuse.component(newsletter);

export default ({ Vue }) => {
  // install the builder
  Vue.use(Vuse, {
    // main css file
    assets: {
      css: 'style.css'
    },
    // builder default themes
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