import header1 from './header/header1';
import header2 from './header/header2';
import section1 from './section/section1';
import section2 from './section/section2';
import social1 from './social/social1';
import social2 from './social/social2';

const install = (Builder) => {
  Builder.component(header1.name, header1);
  Builder.component(header2.name, header2);
  Builder.component(section1.name, section1);
  Builder.component(section2.name, section2);
  Builder.component(social1.name, social1);
  Builder.component(social2.name, social2);
};

export default install;
