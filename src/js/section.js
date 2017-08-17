const SECTION_OPTIONS = {
  name: null,
  data: {
    title: 'Awesome title',
    content: 'We\'re creating the best place to go when starting a new business or company.With Baianat you can instantly search domain names, social media handles, and see your logo in beautiful logotypes.',
    button: 'click me!',
    images: ['static/img/baianat.png'],
    quote: 'When you were made a leader, you weren\'t given a crown; you were given the responsibility to bring out the best in others.',
    logos: [
      'static/img/google.svg',
      'static/img/atlassian.svg',
      'static/img/airbnb.svg',
      'static/img/facebook.svg'
    ],
    caption: 'Client',
    number: '12,920'
  }
};

let counter = 0;

export default class Section {
  constructor (options) {
    this.id = counter++;
    options = Object.assign({}, SECTION_OPTIONS, options);
    this.name = options.name;
    this.data = options.data;
  }

  update (name, value) {
    this.data[name] = value;
  }
};
