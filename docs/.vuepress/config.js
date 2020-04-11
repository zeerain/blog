const pluginConf = require('./config/pluginConf')
const navConf = require('./config/navConf')
const sidebarConf = require('./config/sidebarConf')

module.exports = {
  title: 'zeerain',
  description: 'zeerain博客，笔记，vue，源码分析，小程序',
  head: [
    ['link', {
      rel: 'icon',
      href: '/R.ico'
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }]
  ],
  plugins: pluginConf,
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  markdown: {
    lineNumbers: true // 代码行号
  },
  // base: '/blogs/',
  themeConfig: {
    repo: 'zeerain/blogs',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '点击改善此页面！',
    lastUpdated: '上次更新',
    nav: navConf,
    sidebar: sidebarConf
  },
}