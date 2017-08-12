import temp from './temp';

const elementsProps = {
  header1: {
    title: {
      text: temp.title
    },
    content: {
      text: temp.content
    },
    button: {
      text: temp.button,
      href: '',
      class: []
    },
    section: {
      class: []
    },
    images: [temp.images[0]]
  },

  header2: {
    title: {
      text: temp.title
    },
    content: {
      text: temp.content
    },
    button: {
      text: temp.button,
      href: '',
      class: []
    },
    section: {
      class: []
    },
    images: [temp.images[0]]
  },

  section1: {
    section: {
      class: []
    },
    columns: [
      {
        title: temp.title,
        content: temp.content,
      }, {
        title: temp.title,
        content: temp.content,
      }
    ]
  },

  section2: {
    section: {
      class: []
    },
    columns: [
      {
        title: temp.title,
        content: temp.content,
      }, {
        title: temp.title,
        content: temp.content,
      }, {
        title: temp.title,
        content: temp.content,
      }
    ]
  },

  social1: {
    section: {
      class: []
    },
    columns: [
      {
        title: temp.caption,
        content: temp.number
      }, {
        title: temp.caption,
        content: temp.number
      }, {
        title: temp.caption,
        content: temp.number
      }
    ]
  },

  social2: {
    section: {
      class: []
    },
    content: {
      text: temp.content
    },
    images: temp.logos
  },
}

export default elementsProps;