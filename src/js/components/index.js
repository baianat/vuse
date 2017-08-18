import hero1 from './hero/hero1';
import hero2 from './hero/hero2';
import section1 from './section/section1';
import section2 from './section/section2';
import social1 from './social/social1';
import social2 from './social/social2';
import social3 from './social/social3';
import social4 from './social/social4';

const install = (Builder) => {
  Builder.component(hero1.name, hero1);
  Builder.component(hero2.name, hero2);
  Builder.component(section1.name, section1);
  Builder.component(section2.name, section2);
  Builder.component(social1.name, social1);
  Builder.component(social2.name, social2);
  Builder.component(social3.name, social3);
  Builder.component(social4.name, social4);
};

export default install;
