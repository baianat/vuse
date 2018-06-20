module.exports = {
  title: 'Vuse',
  description: 'Advanced page builder based on Vue.js',
  base: '/vuse/',
  themeConfig: {
    lastUpdated: 'Last Updated',
    repo: 'baianat/vuse',
    docsRepo: 'baianat/vuse',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    sidebar: [
      '/',
      '/getting-started',
      '/section',
      '/styler',
      '/exporting',
      '/API',
    ],
    nav: [
      { text: 'API', link: '/API' },
      { text: 'Example', link: '/example' },
    ]
  }
}